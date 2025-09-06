import React, { useState } from "react";
import { FaSun, FaMoon, FaCog } from "react-icons/fa";

const ProjectDetailForm = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [form, setForm] = useState({
    projectName: "",
    name: "",
    tags: "",
    manager: "",
    deadline: "",
    priority: "",
    image: null,
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
          {/* Logo / Company */}
          <div className="text-2xl font-semibold mb-6">SynergySphere</div>

          {/* Navigation */}
          <nav className="flex flex-col gap-3 mb-6">
            <button className="text-left hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded transition">
              Projects
            </button>
            <button className="text-left hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded transition">
              My Tasks
            </button>
          </nav>
        </div>

        {/* Settings + User Info */}
        <div className="flex flex-col gap-4">
          {/* Settings + Theme */}
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

          {/* User Info */}
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
      <main className="flex-1 p-6 overflow-y-auto flex flex-col">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-2xl font-semibold">{form.projectName || "Admirable Stork"}</div>
          <input
            type="text"
            placeholder="Search..."
            className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>

        {/* Project Form */}
        <div className="p-6 rounded-lg border border-gray-300 dark:border-gray-700 flex flex-col gap-4">
          <div className="flex justify-end gap-2 mb-4">
            <button className="px-4 py-1 rounded border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              Discard
            </button>
            <button className="px-4 py-1 rounded bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition">
              Save
            </button>
          </div>

          {/* Form Fields */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-400">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
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

            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-400">Project Manager</label>
              <input
                type="text"
                name="manager"
                value={form.manager}
                onChange={handleChange}
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-400">Deadline</label>
              <input
                type="date"
                name="deadline"
                value={form.deadline}
                onChange={handleChange}
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

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
                    {p}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-400">Image</label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="text-gray-700 dark:text-gray-400"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-400">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="4"
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-gray-400"
              ></textarea>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetailForm;
