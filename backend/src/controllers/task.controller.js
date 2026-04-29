import { Task } from "../models/Task.js";

export const getTask = async (req, res) => {
  try {
    const response = await Task.find({});

    if (response.length === 0) {
      return res.status(404).json({
        message: "Tasks not found",
      });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const addTask = async (req, res) => {
  const { task } = req.body;

  if (!task || typeof task !== "string" || task.trim() === "") {
    return res.status(400).json({
      message: "task is required",
    });
  }

  try {
    const newTask = await Task.create({
      task: task.trim(),
    });

    return res.status(201).json({
      message: "task created successfully",
      data: newTask,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateTask = async (req, res) => {
  const { task, taskStatus } = req.body;
  const { id } = req.params;

  if (!task || typeof task !== "string" || task.trim() === "") {
    return res.status(400).json({
      message: "task is required",
    });
  }

  try {
    const updated = await Task.findOneAndUpdate(
      { _id: id },
      {
        task: task.trim(),
        ...(taskStatus !== undefined && { taskStatus }),
      },
      { new: true, runValidators: true },
    );

    if (!updated) {
      return res.status(404).json({
        message: "task not found",
      });
    }

    return res.status(200).json({
      message: "task updated successfully",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await Task.findByIdAndDelete(id);

    if (!response) {
      return res.status(404).json({
        message: "task not found",
      });
    }

    return res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
