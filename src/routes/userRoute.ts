import { Router } from "express";
import { authMiddleware } from "../middlewares/clerkAuth.js";
import { getUser, createOrGetUser } from "../controllers/userController.js";

const router = Router();
router.post("/me", authMiddleware, createOrGetUser);
router.get("/me", authMiddleware, getUser);

export default router;
