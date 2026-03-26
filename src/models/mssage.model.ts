import { Schema, model, Document } from "mongoose";
import type { IMessage } from "../types/message.type.js";
export interface IMessageDoc extends IMessage, Document {}

const messageSchema = new Schema<IMessageDoc>(
  {
    meeting: {
      type: Schema.Types.ObjectId,
      ref: "Meeting",
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default model<IMessageDoc>("Message",messageSchema);