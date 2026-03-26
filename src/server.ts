import dotenv from "dotenv";
import app from "./app.js"; //.js because "module": "NodeNext"
import connectDB from "./config/db.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(errorHandler);

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});