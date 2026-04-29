import express from "express";
import {
  getTask,
  addTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

const router = express.Router();

router.route("/").get(getTask).post(addTask);

router.route("/:id").put(updateTask).delete(deleteTask);

export const taskRouter = router;
