import type { Response } from "express";
import Message from "../models/mssage.model.js";
import User from "../models/user.model.js";
import type { AuthRequest } from "../middlewares/clerkAuth.js";

export const sendMessage = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findOne({ clerkId: req.userId! });

    const message = await Message.create({
      meeting: req.body.meetingId,
      sender: user?._id!,
      message: req.body.message,
    });

    res.json(message);
  } catch {
    res.status(500).json({ message: "Error sending message" });
  }
};

export const getMessages = async (req: AuthRequest, res: Response) => {
  const messages = await Message.find({
    meeting: req.params.meetingId!,
  }).populate("sender");
  res.json(messages);
};
