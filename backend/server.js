import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

import { taskRouter } from "./src/routes/task.route.js";

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// API routes
app.use("/api/tasks", taskRouter);

// Check environment variable
if (!process.env.MONGO_URL) {
  console.error("MONGO_URL is missing");
  process.exit(1);
}

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB connected");

    // Start server only after DB connection
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

  } catch (error) {
    console.error(
      "MongoDB connection failed:",
      error.message
    );

    process.exit(1);
  }
};

connectDB();

// Global error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    error: err.message || "Internal Server Error",
  });
});
