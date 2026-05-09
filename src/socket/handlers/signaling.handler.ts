import type { Server, Socket } from "socket.io";

interface OfferPayload  { to: string; offer: RTCSessionDescriptionInit;  roomId: string; }
interface AnswerPayload { to: string; answer: RTCSessionDescriptionInit; roomId: string; }
interface IcePayload    { to: string; candidate: RTCIceCandidateInit;    roomId: string; }

export const registerSignalingHandlers = (io: Server, socket: Socket) => {

  // Forward SDP offer to target peer
  socket.on("webrtc:offer", ({ to, offer, roomId }: OfferPayload) => {
    io.to(to).emit("webrtc:offer", { from: socket.id, offer, roomId });
  });

  // Forward SDP answer to target peer
  socket.on("webrtc:answer", ({ to, answer, roomId }: AnswerPayload) => {
    io.to(to).emit("webrtc:answer", { from: socket.id, answer, roomId });
  });

  // Forward ICE candidate to target peer
  socket.on("webrtc:ice-candidate", ({ to, candidate, roomId }: IcePayload) => {
    io.to(to).emit("webrtc:ice-candidate", { from: socket.id, candidate, roomId });
  });
};