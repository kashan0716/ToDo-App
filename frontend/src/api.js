import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Task API functions
export const addTask = (task) => API.post("/tasks", { task });

export const getTasks = () => API.get("/tasks");

export const deleteTask = (id) => API.delete(`/tasks/${id}`);

export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);

export default API;