import type { Response } from "express";
import User from "../models/user.model.js";
import type { AuthRequest } from "../middlewares/clerkAuth.js";

export const createOrGetUser = async (req: AuthRequest, res: Response) => {
  const { userName, email, avatar } = req.body;

  let user = await User.findOne({ clerkId: req.userId! });

  if (!user) {
    user = await User.create({
      clerkId: req.userId!,
      userName,
      email,
      avatar,
    });
  }
  res.json(user);
};

export const getUser = async (req: AuthRequest, res: Response) => {
  const user = await User.findOne({ clerkId: req.userId! });
  res.json(user);
};
