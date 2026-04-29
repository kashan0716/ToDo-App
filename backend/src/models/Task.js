import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    taskStatus: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Task = mongoose.model("Task", taskSchema);
