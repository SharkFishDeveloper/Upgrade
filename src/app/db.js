const mongoose = require("mongoose")

const dbConnect = async () => {
  console.log("Attempting to connect to the database...",process.env.MONGODB_URI);
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

dbConnect();
