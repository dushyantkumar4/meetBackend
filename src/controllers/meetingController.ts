import type { Response } from "express";
import Meeting from "../models/meeting.model.js";
import User from "../models/user.model.js";
import type { AuthRequest } from "../middlewares/clerkAuth.js";
import { v4 as uuidv4 } from "uuid";
import { asyncHandler } from "../middlewares/asyncHandler.js";

export const createMeeting = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const user = await User.findOne({ clerkId: req.userId! });

    if (!user) return res.status(404).json({ message: "User not found" });

    const meeting = await Meeting.create({
      meetingId: uuidv4(),
      hostId: user._id,
      title: req.body.title || "Instant Meeting",
    });

    res.status(201).json(meeting);
  },
);

export const getMeeting = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const meeting = await Meeting.findOne({
      meetingId: req.params.meetingId!,
    }).populate("hostId", "userName email avatar");

    if (!meeting) {
      res.status(404).json({ message: "Meeting not found" });
      return;
    }
    res.json(meeting);
  },
);

export const endMeeting = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const user = await User.findOne({ clerkId: req.userId! });
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }
    const meeting = await Meeting.findOneAndUpdate(
      { meetingId: req.params.meetingId!, hostId: user._id },
      { isActive: false },
      { new: true },
    );

    if (!meeting) {
      res.status(403).json({ message: "Not found or not authorized" });
      return;
    }

    res.json(meeting);
  },
);
