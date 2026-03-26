import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "@clerk/backend";

export interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY!,
    });

    req.userId = payload.sub;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
