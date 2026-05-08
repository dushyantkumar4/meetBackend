import type { Response } from "express";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import type { AuthRequest } from "../middlewares/clerkAuth.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";

export const sendMessage = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const user = await User.findOne({ clerkId: req.userId! });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const message = await Message.create({
      meeting: req.body.meetingId,
      sender: user?._id!,
      message: req.body.message,
    });

    res.status(201).json(message);
  },
);

export const getMessages = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const messages = await Message.find({
      meeting: req.params.meetingId!,
    })
      .populate("sender", "userName avatar")
      .sort({ createdAt: 1 });
    res.json(messages);
  },
);
