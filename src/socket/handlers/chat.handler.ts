import type { Server, Socket } from "socket.io";

interface ChatMessage {
  roomId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
}

export const registerChatHandlers = (io: Server, socket: Socket) => {
  // Broadcast message to everyone in the room
  socket.on("chat:message", (message: ChatMessage) => {
    // Send to all OTHER sockets in the room (sender already has it optimistically)
    socket.to(message.roomId).emit("chat:message", message);
  });

  // Broadcast typing indicator — brief, no persistence
  socket.on(
    "chat:typing",
    ({
      roomId,
      userId,
      name,
    }: {
      roomId: string;
      userId: string;
      name: string;
    }) => {
      socket.to(roomId).emit("chat:typing", { userId, name });
    },
  );
};
