import { Schema, model, Document } from "mongoose";
import type { IMeeting } from "../types/meeting.type.js";
export interface IMeetingDoc extends IMeeting, Document {}

const meetingSchema = new Schema<IMeetingDoc>(
  {
    meetingId: {
      type: String,
      required: true,
      unique: true,
    },
    hostId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export default model<IMeetingDoc>("Meeting", meetingSchema);
