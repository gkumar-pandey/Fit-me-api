import mongoose from "mongoose";

export const connectDb = async (): Promise<void> => {
  const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
  const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
  const DB_URL: string = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.puddurq.mongodb.net/?retryWrites=true&w=majority`;
  if (!DB_URL) {
    console.error("Database connection url not provided.");
    return;
  }
  try {
    const connect = await mongoose.connect(DB_URL);
    console.log("Database connected successfully...");
  } catch (error) {
    console.error(error);
  }
};
