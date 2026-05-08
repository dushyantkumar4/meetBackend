import type { Response } from "express";
import User from "../models/user.model.js";
import type { AuthRequest } from "../middlewares/clerkAuth.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";

export const updateUser = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { userName, email, avatar } = req.body;

    const user = await User.findOneAndUpdate(
      { clerkId: req.userId! },
      { $setOnInsert: { clerkId: req.userId!, userName, email, avatar } },
      { upsert: true, new: true },
    );
    res.json(user);
  },
);

export const getUser = asyncHandler(async (req: AuthRequest, res: Response) => {
  const user = await User.findOne({ clerkId: req.userId! });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.json(user);
});
