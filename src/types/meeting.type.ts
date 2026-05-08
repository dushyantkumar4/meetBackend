import type { Types } from "mongoose";

export interface IMeeting {
  meetingId: string;
  hostId: Types.ObjectId;
  title?: string;
  isActive: boolean;
}

export interface IParticipant {
  meeting: Types.ObjectId;
  user: Types.ObjectId;
  isMuted: boolean;
  isVideoOn: boolean;
  joinedAt: Date;
  leftAt?: Date;
}
