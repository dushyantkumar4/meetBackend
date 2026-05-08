
import { Server, Socket } from 'socket.io';

interface RoomState {
  [roomId: string]: Set<string>; // roomId -> Set of socketIds
}

// In production, this would be in Redis
const rooms: RoomState = {};

export function registerRoomHandlers(io: Server, socket: Socket) {
  socket.on('room:join', ({ roomId }: { roomId: string }) => {
    socket.join(roomId);

    if (!rooms[roomId]) {
      rooms[roomId] = new Set();
    }

    // Notify existing peers that a new peer joined
    // This triggers the "isInitiator" flow in the frontend
    const existingPeers = [...rooms[roomId]];
    existingPeers.forEach(peerId => {
      io.to(peerId).emit('webrtc:peer-joined', { peerId: socket.id });
    });

    // Send existing peers list to the new joiner
    socket.emit('room:peers', { peers: existingPeers });

    rooms[roomId].add(socket.id);

    console.log(`[Room] ${socket.id} joined room ${roomId}. Peers: ${rooms[roomId].size}`);
  });

  socket.on('room:leave', ({ roomId }: { roomId: string }) => {
    handleLeave(io, socket, roomId);
  });

  socket.on('disconnect', () => {
    // Clean up all rooms this socket was in
    Object.keys(rooms).forEach(roomId => {
      if (rooms[roomId].has(socket.id)) {
        handleLeave(io, socket, roomId);
      }
    });
  });
}

function handleLeave(io: Server, socket: Socket, roomId: string) {
  socket.leave(roomId);
  rooms[roomId]?.delete(socket.id);

  // Notify all peers in room
  io.to(roomId).emit('webrtc:peer-left', { peerId: socket.id });

  if (rooms[roomId]?.size === 0) {
    delete rooms[roomId];
  }

  console.log(`[Room] ${socket.id} left room ${roomId}`);
}