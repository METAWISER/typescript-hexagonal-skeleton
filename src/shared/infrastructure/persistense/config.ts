/* eslint-disable no-console */
import mongoose from "mongoose";

const mongoConnect = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log(`✅ Connected to: ${mongoose.connection.name}\n`);
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error);
  }
};

export default mongoConnect;
