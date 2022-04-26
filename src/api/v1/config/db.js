import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

export const connectToDB = async () => {
  try {
    const { connection } = await mongoose.connect(MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`Connected with the database: ${connection.host}`.cyan.bold);
  } catch (err) {
    console.error("Failed to connect with database".red.bold);
    console.error(`Error: ${err.message}`.red);
    process.exit(1);
  }
};
