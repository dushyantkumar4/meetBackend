import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("MongoDB Connected",process.env.MONGO_URI);
  } catch (error) {
    console.error("DB connection error", error);
    process.exit(1);
  }
};

export default connectDB;