import express from "express";
import cors from "cors";
import "dotenv/config";
import { taskRouter } from "./src/routes/task.route.js";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
  }),
);
app.use(express.json());

// health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

// check env
if (!process.env.MONGO_URL) {
  console.error("MONGO_URL is missing");
  process.exit(1);
}

// DB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB connected`);

    // start server after DB connection
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

connectDB();

// routes
app.use("/api/tasks", taskRouter);

// global error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});
