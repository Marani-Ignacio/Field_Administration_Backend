import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI environment variable is not defined");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected...");
  } catch (error) {
    console.error("MongoDB connection error...", error);
    process.exit(1);
  }
};

export default connectDB;