import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoute.js";
import meetingRoutes from "./routes/meetingRoute.js";
import messageRoutes from "./routes/messageRoute.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.use("/api/users", userRoutes);
app.use("/api/meetings", meetingRoutes);
app.use("/api/messages", messageRoutes);

app.use(errorMiddleware);

export default app;
