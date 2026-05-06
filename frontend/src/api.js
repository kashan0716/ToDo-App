import axios from "axios";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000/api"
    : "/api";

const API = axios.create({
  baseURL: BASE_URL,
});

// Task API functions
export const addTask = (task) => API.post("/tasks", { task });

export const getTasks = () => API.get("/tasks");

export const deleteTask = (id) => API.delete(`/tasks/${id}`);

export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);

export default API;
