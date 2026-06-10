import axios from "axios";

// Change only these URLs when needed
const SERVER_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000/api"
    : "/api";

const API = axios.create({
  baseURL: SERVER_URL,
});

// Task APIs
export const addTask = (task) => API.post("/tasks", { task });
export const getTasks = () => API.get("/tasks");
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);

export default API;
