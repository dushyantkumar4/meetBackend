import { Router } from "express";
import { authMiddleware } from "../middlewares/clerkAuth.js";
import { getUser, updateUser } from "../controllers/userController.js";

const router = Router();
router.post("/me", authMiddleware, updateUser);
router.get("/me", authMiddleware, getUser);

export default router;
