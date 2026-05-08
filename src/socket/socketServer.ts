import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";

// Data sent FROM Client TO Server
interface ClientToServerEvents {
  "join-room": (meetingId: string, userId: string) => void;
  "send-message": (data: {
    meetingId: string;
    message: string;
    user: string;
  }) => void;
}

// Data sent FROM Server TO Client
interface ServerToClientEvents {
  "user-joined": (userId: string) => void;
  "receive-message": (data: { message: string; user: string }) => void;
}

// Internal Socket Data (optional)
interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  userId: string;
}
export const initSocket = (server: HttpServer) => {
  const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(server, {
    cors: {
      origin: "*",
    },
  });

  io.on(
    "connection",
    (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
      console.log("User connected:", socket.id);

      // TypeScript now knows meetingId and userId are strings
      socket.on("join-room", (meetingId, userId) => {
        socket.join(meetingId);
        socket.to(meetingId).emit("user-joined", userId);
      });

      // TypeScript knows the shape of the data object here
      socket.on("send-message", ({ meetingId, message, user }) => {
        socket.to(meetingId).emit("receive-message", {
          message,
          user,
        });
      });

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    },
  );

  return io;
};
