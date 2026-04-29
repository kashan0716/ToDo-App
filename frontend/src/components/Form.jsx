import { useState } from "react";
import { toast } from "react-toastify";
import { IoMdAdd } from "react-icons/io";
import { addTask } from "../api";

export default function Form({ loadTasks }) {
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedTask = task.trim();
    if (!trimmedTask) return toast.warn("Please enter a task!");

    try {
      setLoading(true);

      await addTask(trimmedTask);
      await loadTasks();

      toast.success("Task added successfully!");
      setTask("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center px-2 sm:px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-stretch sm:items-center w-full max-w-2xl bg-white rounded-2xl shadow-md border border-gray-200 p-3 sm:p-5 gap-3 sm:gap-4 transition-all"
      >
        {/* Input */}
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="What do you want to do today?"
          className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-400 transition-all"
        />

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm cursor-pointer"
        >
          <IoMdAdd size={20} />
          <span>{loading ? "Adding..." : "Add Task"}</span>
        </button>
      </form>
    </div>
  );
}
