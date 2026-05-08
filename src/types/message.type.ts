import type { Types } from "mongoose";

export interface IMessage {
  meeting: Types.ObjectId;
  sender: Types.ObjectId;
  message: string;
}
