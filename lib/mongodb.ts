// lib/mongoose.js
import mongoose from 'mongoose';

let isConnected = false;

export const dbConnect = async () => {
  if (isConnected) return;

  const connection_uri = process.env.MONGODB_URI ;

  try {
    if(!connection_uri){
        throw new Error("No connection uri found")
    }
    await mongoose.connect(connection_uri);
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
