import { useState } from "react";
import { toast } from "react-toastify";
import { updateTask } from "../api";

export default function UpdateTask({
  task,
  id,
  taskStatus,
  setTodos,
  setOpenPopUp,
}) {
  const [updatedTask, setUpdatedTask] = useState(task);
  const [status, setTaskStatus] = useState(taskStatus);
  const [loading, setLoading] = useState(false);

  const handleUpdateTask = async (e) => {
    e.preventDefault();

    const trimmedTask = updatedTask.trim();
    if (!trimmedTask) {
      return toast.warn("Task cannot be empty");
    }

    try {
      setLoading(true);

      await updateTask(id, {
        task: trimmedTask,
        taskStatus: status,
      });

      setTodos((prev) =>
        prev.map((todo) =>
          todo._id === id
            ? { ...todo, task: trimmedTask, taskStatus: status }
            : todo,
        ),
      );

      toast.success("Task updated successfully!");
      setOpenPopUp(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update task.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <form
        onSubmit={handleUpdateTask}
        className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col gap-5"
      >
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
          Update Task
        </h2>

        {/* Input */}
        <input
          type="text"
          value={updatedTask}
          onChange={(e) => setUpdatedTask(e.target.value)}
          placeholder="Update your task..."
          autoFocus
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-400 transition-all"
        />

        {/* Checkbox */}
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={status}
            onChange={(e) => setTaskStatus(e.target.checked)}
            className="w-5 h-5 accent-blue-600"
          />
          <span className="text-gray-700 text-sm sm:text-base">
            Mark as completed
          </span>
        </label>

        {/* Buttons */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? "Updating..." : "Save Changes"}
        </button>

        <button
          type="button"
          onClick={() => setOpenPopUp(false)}
          className="text-sm text-gray-500 hover:text-red-500 transition text-center cursor-pointer"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
