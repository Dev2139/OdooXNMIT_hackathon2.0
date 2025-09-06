import React, { useState } from "react";
import { FaSun, FaMoon, FaCog, FaUserCircle, FaTasks } from "react-icons/fa";
import { FolderKanban } from "lucide-react";
import TextField from "@mui/material/TextField";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const TaskDetailView = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [task, setTask] = useState({
    title: "Design Landing Page",
    description: "Create a responsive landing page for the new product.",
    assignedTo: "Alice Johnson",
    dueDate: new Date(),
    status: "In Progress",
  });

  const statusOptions = [
    { label: "To Do", color: "bg-gray-400" },
    { label: "In Progress", color: "bg-blue-500" },
    { label: "Done", color: "bg-green-500" },
  ];

  const projects = ["Landing Page", "Marketing Campaign"];

  return (
    <div className={`${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"} flex min-h-screen font-sans`}>
      
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
          {[
            { label: "Projects", icon: <FaTasks /> },
            { label: "My Tasks", icon: <FaUserCircle /> },
          ].map((item, idx) => (
            <button
              key={idx}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                darkMode ? "text-gray-200 hover:bg-gray-700" : "text-gray-800 hover:bg-gray-100"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}

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
        <div className="p-4 flex flex-col gap-4 border-t transition-colors duration-300" style={{ borderColor: darkMode ? "#444" : "#E5E7EB" }}>
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
              <p className={`text-xs transition-colors duration-300 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>user@mail</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto flex flex-col gap-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center text-gray-400 text-sm gap-2">
          <span>Projects</span> &gt; <span>Landing Page</span> &gt; <span className="text-white">{task.title}</span>
        </div>

        {/* Task Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">{task.title}</h1>
          <button className="px-6 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 shadow-lg transition text-white font-semibold">
            Save Changes
          </button>
        </div>

        {/* Task Card */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-gray-800 to-gray-700 shadow-2xl flex flex-col gap-8">
          
          {/* Status Badge */}
          <div className="flex gap-2">
            {statusOptions.map(opt => (
              <span
                key={opt.label}
                className={`px-4 py-1 rounded-full text-sm font-semibold ${task.status === opt.label ? opt.color + " text-white" : "bg-gray-600 text-gray-300"} transition`}
              >
                {opt.label}
              </span>
            ))}
          </div>

          {/* Task Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Description */}
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-400">Description</label>
              <textarea
                value={task.description}
                onChange={e => setTask({ ...task, description: e.target.value })}
                rows="4"
                className="w-full p-4 rounded-2xl border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition shadow-lg placeholder-gray-400"
                placeholder="Write the task description..."
              />
            </div>

            {/* Assigned To */}
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-400">Assigned To</label>
              <div className="relative">
                <FaUserCircle className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="text"
                  value={task.assignedTo}
                  onChange={e => setTask({ ...task, assignedTo: e.target.value })}
                  className="w-full p-3 pl-10 rounded-2xl border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition shadow-lg placeholder-gray-400"
                  placeholder="Assign to..."
                />
              </div>
            </div>

            {/* Due Date */}
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-400">Due Date</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={dayjs(task.dueDate)}
                  onChange={newDate => setTask({ ...task, dueDate: newDate?.toDate() })}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      className="w-full rounded-2xl bg-gray-900 text-white"
                      InputProps={{
                        ...params.InputProps,
                        className: "text-white",
                      }}
                      placeholder="Select a due date"
                    />
                  )}
                />
              </LocalizationProvider>
            </div>

            {/* Status */}
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-400">Status</label>
              <select
                value={task.status}
                onChange={e => setTask({ ...task, status: e.target.value })}
                className="w-full p-3 rounded-2xl border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition shadow-lg"
              >
                {statusOptions.map(opt => (
                  <option key={opt.label} value={opt.label}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default TaskDetailView;
