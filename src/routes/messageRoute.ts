import { Router } from "express";
import { authMiddleware } from "../middlewares/clerkAuth.js";
import { sendMessage,getMessages } from "../controllers/messageController.js";

const router = Router();
router.post("/",authMiddleware,sendMessage);
router.get("/:meetingId",authMiddleware,getMessages);


export default router