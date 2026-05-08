

import { Server, Socket } from 'socket.io';

interface SignalingPayload {
  to: string;
  roomId: string;
  offer?: RTCSessionDescriptionInit;
  answer?: RTCSessionDescriptionInit;
  candidate?: RTCIceCandidateInit;
}

export function registerSignalingHandlers(io: Server, socket: Socket) {
  const userId = socket.data.userId; // Set by auth middleware

  // Forward offer to target peer
  socket.on('webrtc:offer', ({ to, offer, roomId }: SignalingPayload) => {
    console.log(`[Signaling] Offer from ${userId} to ${to}`);
    io.to(to).emit('webrtc:offer', {
      from: socket.id,
      offer,
      roomId,
    });
  });

  // Forward answer to target peer
  socket.on('webrtc:answer', ({ to, answer, roomId }: SignalingPayload) => {
    console.log(`[Signaling] Answer from ${userId} to ${to}`);
    io.to(to).emit('webrtc:answer', {
      from: socket.id,
      answer,
      roomId,
    });
  });

  // Forward ICE candidates
  socket.on('webrtc:ice-candidate', ({ to, candidate, roomId }: SignalingPayload) => {
    io.to(to).emit('webrtc:ice-candidate', {
      from: socket.id,
      candidate,
      roomId,
    });
  });
}