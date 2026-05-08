import { Router } from "express";
import { authMiddleware } from "../middlewares/clerkAuth.js";
import {
  getMeeting,
  createMeeting,
  endMeeting,
} from "../controllers/meetingController.js";

const router = Router();

router.post("/create", authMiddleware, createMeeting);
router.get("/:meetingId", authMiddleware, getMeeting);
router.patch("/:meetingId/end", authMiddleware, endMeeting);

export default router;
