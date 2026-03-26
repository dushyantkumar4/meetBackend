import mongoose from "mongoose";
export interface IMeeting {
  meetingId: string; 
  hostId: mongoose.Types.ObjectId; 
  title:string;
  isActive: boolean;
  endedAt?: Date;
}

export interface IParticipant {
  meeting: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  isMuted: boolean;
  isVideoOn: boolean;
  joinedAt: Date;
  leftAt?: Date;
}