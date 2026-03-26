import { Router } from "express";
import { authMiddleware } from "../middlewares/clerkAuth.js";
import { getMeeting,createMeeting } from "../controllers/meetingController.js";

const router = Router();

router.post("/create",authMiddleware,createMeeting);
router.get("/:meetingId",authMiddleware,getMeeting);


export default router;