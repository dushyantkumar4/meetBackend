import "dotenv/config";
import app from "./app.js"; //.js because "module": "NodeNext"
import connectDB from "./config/db.js";
import { createServer } from "node:http";
import { initSocket } from "./socket/socketServer.js";

const PORT = process.env.PORT || 3000;

const server = async () => {
  await connectDB();

  const httpServer = createServer(app);
  initSocket(httpServer);

  httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

server().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
