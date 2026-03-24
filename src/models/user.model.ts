import { Schema, model, Document } from "mongoose";
import type { IUser } from "../types/user.type.js";
export interface IUserDoc extends IUser, Document {}

const userSchema = new Schema<IUserDoc>(
  {
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    userName: { type: String, required: true },
    avatar: { type: String },
  },
  { timestamps: true },
);

export default model("User", userSchema);
