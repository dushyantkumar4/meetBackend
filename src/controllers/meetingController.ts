import type { Response } from "express";
import Meeting from "../models/meeting.model.js";
import User from "../models/user.model.js";
import type { AuthRequest } from "../middlewares/clerkAuth.js";
import { v4 as uuidv4 } from "uuid";

export const createMeeting = async (req: AuthRequest, res: Response) => {
  const user = await User.findOne({ clerkId: req.userId! });

  if (!user) return res.status(404).json({ message: "User not found" });

  const meeting = await Meeting.create({
    meetingId: uuidv4(),
    hostId: user._id.toString(),
    title: req.body.title,
  });

  res.json(meeting);
};

export const getMeeting = async (req: AuthRequest, res: Response) => {
  const meeting = await Meeting.findOne({
    meetingId: req.params.meetingId!,
  }).populate("host");

  res.json(meeting);
};
