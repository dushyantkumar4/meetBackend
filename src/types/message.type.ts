import mongoose from "mongoose";
export interface IMessage {
  meeting: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  message: string;
  createdAt: Date;
}
