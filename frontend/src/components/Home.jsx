import { useEffect, useState } from "react";
import Form from "../components/Form";
import UpdateTask from "../components/UpdateTask";
import { toast } from "react-toastify";
import { ImCross } from "react-icons/im";
import { MdEdit } from "react-icons/md";
import { getTasks, deleteTask } from "../api";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [taskId, setTaskId] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const res = await getTasks();
      setTodos(res.data || []);
    } catch (error) {
      toast.error("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
      toast.success("Task deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete task.");
    }
  };

  const handleUpdatePopup = (id) => {
    setTaskId(id);
    setOpenPopUp(true);
  };

  // Get selected task (IMPORTANT FIX)
  const selectedTask = todos.find((t) => t._id === taskId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col items-center py-8 px-4 sm:px-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 text-center mb-8 tracking-tight">
          My Tasks
        </h2>

        {/* Form */}
        <Form setTodos={setTodos} loadTasks={loadTasks} />

        {/* Task List */}
        <div className="mt-6 space-y-4">
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="text-gray-600 text-lg animate-pulse">
                Loading tasks...
              </div>
            </div>
          ) : todos.length === 0 ? (
            <div className="text-center p-8 bg-white rounded-2xl shadow-md">
              <p className="text-lg font-semibold text-gray-700">
                No tasks yet
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Add your first task above
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {todos.map((todo) => (
                <li
                  key={todo._id}
                  className="bg-white border border-gray-200 shadow-md rounded-2xl p-4 flex items-center justify-between hover:shadow-xl transition-all duration-300"
                >
                  {/* Task Text */}
                  <span
                    className={`flex-1 text-base sm:text-lg font-medium break-words ${
                      todo.taskStatus
                        ? "line-through text-gray-400"
                        : "text-gray-800"
                    }`}
                  >
                    {todo.task}
                  </span>

                  {/* Buttons */}
                  <div className="flex gap-3 ml-4">
                    <button
                      onClick={() => handleDelete(todo._id)}
                      aria-label="Delete task"
                      className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition active:scale-90 cursor-pointer"
                    >
                      <ImCross size={16} />
                    </button>

                    <button
                      onClick={() => handleUpdatePopup(todo._id)}
                      aria-label="Update task"
                      className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 transition active:scale-90 cursor-pointer"
                    >
                      <MdEdit size={18} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Update Modal (FIXED PROPS) */}
      {openPopUp && selectedTask && (
        <UpdateTask
          id={taskId}
          task={selectedTask.task}
          taskStatus={selectedTask.taskStatus}
          setOpenPopUp={setOpenPopUp}
          setTodos={setTodos}
        />
      )}
    </div>
  );
}
