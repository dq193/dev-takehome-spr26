import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/nonprofit";

export async function connectDB(): Promise<mongoose.Mongoose> {
  return mongoose.connect(MONGODB_URI);
}
