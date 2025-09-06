import React, { useState } from "react";
import { FaSun, FaMoon, FaCog, FaCalendarAlt, FaPaperclip } from "react-icons/fa";

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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  return (
    <div className={`${darkMode ? "bg-black text-white" : "bg-white text-black"} flex h-screen font-sans`}>
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-300 dark:border-gray-700 flex flex-col justify-between p-4">
        <div>
          <div className="text-2xl font-semibold mb-6">SynergySphere</div>
          <nav className="flex flex-col gap-3 mb-6">
            <button className="text-left hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded transition">
              Projects
            </button>
            <button className="text-left hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded transition">
              My Tasks
            </button>
          </nav>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition">
              <FaCog /> Settings
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            >
              {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-500" />}
            </button>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <img
              src="https://i.pravatar.cc/40"
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="text-sm font-medium">Test User</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">user@mail</div>
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
            <button className="px-4 py-1 rounded bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition">
              Save
            </button>
          </div>

          {/* Task Form Fields */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-400">Task Name</label>
              <input
                type="text"
                name="taskName"
                value={form.taskName}
                onChange={handleChange}
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-400">Assigned To</label>
              <input
                type="text"
                name="assignedTo"
                value={form.assignedTo}
                onChange={handleChange}
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-400">Tags</label>
              <input
                type="text"
                name="tags"
                value={form.tags}
                onChange={handleChange}
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            {/* Improved Date Picker */}
            <div className="flex flex-col gap-1">
              <label className="block mb-1 text-gray-700 dark:text-gray-400 flex items-center gap-1">
                <FaCalendarAlt /> Deadline
              </label>
              <input
                type="date"
                name="deadline"
                value={form.deadline}
                onChange={handleChange}
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Priority */}
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-400">Priority</label>
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
                    <span className={`px-2 py-0.5 rounded text-white ${p === "Low" ? "bg-green-500" : p === "Medium" ? "bg-yellow-500" : "bg-red-500"}`}>
                      {p}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-400">Status</label>
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

            {/* Improved Attachment Section */}
            <div className="flex flex-col gap-1">
              <label className="block mb-1 text-gray-700 dark:text-gray-400 flex items-center gap-1">
                <FaPaperclip /> Attachment
              </label>
              <label className="flex items-center gap-2 px-4 py-2 border-2 border-dashed rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                <span>{form.attachment ? form.attachment.name : "Click to upload file"}</span>
                <input
                  type="file"
                  name="attachment"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Description */}
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-400">Description</label>
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
