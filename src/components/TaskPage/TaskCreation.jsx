import React, { useState } from "react";
import { FaSun, FaMoon, FaCog, FaUserCircle, FaTasks } from "react-icons/fa";
import { FolderKanban } from "lucide-react";

const TaskDetailForm = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [form, setForm] = useState({
    taskName: "",
    assignedTo: "",
    tags: "",
    deadline: "",
    priority: "",
    status: "",
    attachment: null,
    description: "",
  });

  const projects = ["Landing Page", "Marketing Campaign"];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"} flex h-screen font-sans`}>
      {/* Sidebar */}
      <aside
        className={`w-64 flex flex-col transition-colors duration-300 ${
          darkMode ? "bg-gray-800 border-r border-gray-700" : "bg-white border-r border-gray-200"
        }`}
      >
        {/* Branding */}
        <div className="p-6 font-bold text-2xl tracking-tight">
          <span
            className={`px-3 py-1 rounded-lg shadow-sm ${
              darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"
            }`}
          >
            SynergySphere
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 px-4">
          {[{ label: "Projects", icon: <FaTasks /> }, { label: "My Tasks", icon: <FaUserCircle /> }].map(
            (item, idx) => (
              <button
                key={idx}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  darkMode ? "text-gray-200 hover:bg-gray-700" : "text-gray-800 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            )
          )}

          <div className={`mt-6 text-xs uppercase ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Projects</div>

          {projects.map((project, idx) => (
            <button
              key={idx}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                darkMode ? "text-gray-200 hover:bg-gray-700" : "text-gray-800 hover:bg-gray-100"
              }`}
            >
              <FolderKanban size={18} />
              {project}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div
          className="p-4 flex flex-col gap-4 border-t transition-colors duration-300"
          style={{ borderColor: darkMode ? "#444" : "#E5E7EB" }}
        >
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              <FaCog />
              Settings
            </div>
            <button onClick={() => setDarkMode(!darkMode)} className="hover:text-orange-400">
              {darkMode ? "☀" : "🌙"}
            </button>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <img
              src="https://i.pravatar.cc/40"
              alt="avatar"
              className={`w-10 h-10 rounded-full border transition-colors duration-300 ${
                darkMode ? "border-gray-500" : "border-gray-400"
              }`}
            />
            <div>
              <p className="text-sm font-semibold">Test User</p>
              <p className={`text-xs transition-colors duration-300 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                user@mail
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto flex flex-col gap-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-2xl font-semibold">{form.taskName || "New Task"}</div>
          <input
            type="text"
            placeholder="Search tasks..."
            className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-transparent text-black dark:text-white focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>

        <div className="p-6 rounded-lg border border-gray-300 dark:border-gray-700 flex flex-col gap-6">
          {/* Action Buttons */}
          <div className="flex justify-end gap-2 mb-4">
            <button className="px-4 py-1 rounded border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              Discard
            </button>
            <button className="px-4 py-1 rounded bg-orange-500 text-white hover:bg-orange-600 transition">
              Save
            </button>
          </div>

          {/* Task Form Fields */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block mb-1">Task Name</label>
              <input
                type="text"
                name="taskName"
                value={form.taskName}
                onChange={handleChange}
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            <div>
              <label className="block mb-1">Assigned To</label>
              <input
                type="text"
                name="assignedTo"
                value={form.assignedTo}
                onChange={handleChange}
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            <div>
              <label className="block mb-1">Tags</label>
              <input
                type="text"
                name="tags"
                value={form.tags}
                onChange={handleChange}
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            <div>
              <label className="block mb-1 flex items-center gap-1">Deadline</label>
              <input
                type="date"
                name="deadline"
                value={form.deadline}
                onChange={handleChange}
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block mb-1">Priority</label>
              <div className="flex gap-4">
                {["Low", "Medium", "High"].map((p) => (
                  <label key={p} className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="priority"
                      value={p}
                      checked={form.priority === p}
                      onChange={handleChange}
                      className="accent-black dark:accent-white"
                    />
                    <span
                      className={`px-2 py-0.5 rounded text-white ${
                        p === "Low" ? "bg-green-500" : p === "Medium" ? "bg-yellow-500" : "bg-red-500"
                      }`}
                    >
                      {p}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-1">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Status</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 flex items-center gap-1">Attachment</label>
              <label className="flex items-center gap-2 px-4 py-2 border-2 border-dashed rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                <span>{form.attachment ? form.attachment.name : "Click to upload file"}</span>
                <input type="file" name="attachment" onChange={handleChange} className="hidden" />
              </label>
            </div>

            <div>
              <label className="block mb-1">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="4"
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TaskDetailForm;
