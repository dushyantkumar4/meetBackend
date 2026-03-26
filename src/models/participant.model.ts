import { Schema, model, Document } from "mongoose";
import type { IParticipant } from "../types/meeting.type.js";
export interface IParticipantDoc extends IParticipant, Document {}

const participantSchema = new Schema<IParticipantDoc>({
  meeting: {
    type: Schema.Types.ObjectId,
    ref: "Meeting",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isMuted: {
    type: Boolean,
    default: false,
  },
  isVideoOn: {
    type: Boolean,
    default: true,
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
  leftAt: {
    type: Date,
  },
});

export default model<IParticipant>("Participant", participantSchema);
