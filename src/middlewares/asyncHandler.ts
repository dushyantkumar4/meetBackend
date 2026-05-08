import type { Request, Response, NextFunction, RequestHandler } from "express";
import type { AuthRequest } from "./clerkAuth.js";

export const asyncHandler =
  (
    fn: (
      req: AuthRequest,
      res: Response,
      next: NextFunction,
    ) => Promise<unknown>,
  ): RequestHandler =>
  (req, res, next) => {
    Promise.resolve(fn(req as AuthRequest, res, next)).catch(next);
  };
