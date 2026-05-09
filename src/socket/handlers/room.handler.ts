import type { Server, Socket } from "socket.io";

// In production this moves to Redis
const rooms = new Map<string, Set<string>>(); // roomId → Set of socketIds

export const registerRoomHandlers = (io: Server, socket: Socket) => {

  socket.on("room:join", ({ roomId }: { roomId: string }) => {
    socket.join(roomId);

    if (!rooms.has(roomId)) rooms.set(roomId, new Set());
    const room = rooms.get(roomId)!;

    // Tell the NEW joiner who is already in the room
    socket.emit("room:peers", { peers: [...room] });

    // Tell EXISTING peers that someone new joined
    room.forEach((peerId) => {
      io.to(peerId).emit("webrtc:peer-joined", { peerId: socket.id });
    });

    room.add(socket.id);
    console.log(`[Room] ${socket.id} joined ${roomId} — ${room.size} peers`);
  });

  socket.on("room:leave", ({ roomId }: { roomId: string }) => {
    leaveRoom(io, socket, roomId);
  });

  socket.on("disconnect", () => {
    // Clean up every room this socket was in
    rooms.forEach((members, roomId) => {
      if (members.has(socket.id)) leaveRoom(io, socket, roomId);
    });
  });
};

function leaveRoom(io: Server, socket: Socket, roomId: string) {
  socket.leave(roomId);
  const room = rooms.get(roomId);
  if (!room) return;

  room.delete(socket.id);
  io.to(roomId).emit("webrtc:peer-left", { peerId: socket.id });

  if (room.size === 0) rooms.delete(roomId);
  console.log(`[Room] ${socket.id} left ${roomId}`);
}