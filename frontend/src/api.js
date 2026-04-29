import axios from "axios";

<<<<<<< HEAD
const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000/api"
    : "/api";
=======
// 🔹 Centralized backend URL
export const BACKEND_URL = "https://todo-app-backend-zz4a.onrender.com/api";
>>>>>>> 9b632f3e6282b9cd6e75a4fa07d01ef513a2be05

const API = axios.create({
  baseURL: BASE_URL,
});

// Task API functions
export const addTask = (task) => API.post("/tasks", { task });

export const getTasks = () => API.get("/tasks");

export const deleteTask = (id) => API.delete(`/tasks/${id}`);

export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);

export default API;
