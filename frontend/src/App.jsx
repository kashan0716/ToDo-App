import Home from "./components/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 p-3 md:p-6">
      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={900}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="colored"
        limit={2}
        // MAIN FIXES
        toastClassName="!min-h-0 !p-3 !text-sm !rounded-xl shadow-md"
        bodyClassName="!p-0 !m-0"
        style={{ width: "auto", maxWidth: "320px" }}
      />

      <Home />
    </div>
  );
}
