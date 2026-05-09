import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import { registerChatHandlers } from "./handlers/chat.handler.js";
import { registerRoomHandlers } from "./handlers/room.handler.js";
import { registerSignalingHandlers } from "./handlers/signaling.handler.js";

interface SocketData {
  userId: string;
}

// Data sent FROM Client TO Server
interface ClientToServerEvents {
  "join-room": (meetingId: string, userId: string) => void;
  "send-message": (data: {
    meetingId: string;
    message: string;
    user: string;
  }) => void;
}
export const initSocket = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket: Socket<any, any, any, SocketData>) => {
    console.log("[Socket] Connected:", socket.id);

    // Register all handler groups — each handles its own events
    registerRoomHandlers(io, socket);
    registerSignalingHandlers(io, socket);
    registerChatHandlers(io, socket);

    socket.on("disconnect", (reason) => {
      console.log("[Socket] Disconnected:", socket.id, reason);
    });
  });

  return io;
};
