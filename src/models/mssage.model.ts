import { Schema, model, Document } from "mongoose";
import type { IMessage } from "../types/message.type.js";
export interface IMessageDoc extends IMessage, Document {}

const messageSchema = new Schema<IMessageDoc>(
  {
    meeting: {
      type: String,
      ref: "Meeting",
      required: true,
    },
    sender: {
      type: String,
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
