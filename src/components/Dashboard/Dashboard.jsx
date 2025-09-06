import React, { useState, useEffect, createContext, useContext } from "react";
import {
  Bell,
  Plus,
  LayoutDashboard,
  CheckSquare,
  FolderKanban,
  Settings,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

// Context for global state
const DashboardContext = createContext();
export const useDashboard = () => useContext(DashboardContext);

// Colors
const LIGHT_PIE_COLORS = ["#FF6B6B", "#FFD93D", "#6BCB77"];
const DARK_PIE_COLORS = ["#FF6B6B", "#FFD93D", "#6BCB77"];

// Fake backend fetcher
const fetchProjects = () =>
  Promise.resolve([
    {
      id: "p1",
      name: "Project Alpha",
      progress: 75,
      tasks: [
        { id: "t1", title: "Review Q3 Plan", status: "in_progress", assignee: "Alice" },
        { id: "t2", title: "Budget Report", status: "overdue", assignee: "Bob" },
        { id: "t3", title: "Wireframes", status: "upcoming", assignee: "Alice" },
      ],
    },
    {
      id: "p2",
      name: "Project Beta",
      progress: 40,
      tasks: [{ id: "t4", title: "API Integration", status: "in_progress", assignee: "Unassigned" }],
    },
  ]);

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("mode") === "dark");

  useEffect(() => {
    fetchProjects().then(setProjects);
  }, []);

  useEffect(() => {
    localStorage.setItem("mode", darkMode ? "dark" : "light");
  }, [darkMode]);

  const allTasks = projects.flatMap((p) => p.tasks);
  const statusCount = allTasks.reduce((acc, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1;
    return acc;
  }, {});

  const pieData = [
    { name: "Completed", value: statusCount["completed"] || 0 },
    { name: "In Progress", value: statusCount["in_progress"] || 0 },
    { name: "Overdue", value: statusCount["overdue"] || 0 },
  ];

  const assigneeCount = allTasks.reduce((acc, t) => {
    acc[t.assignee] = (acc[t.assignee] || 0) + 1;
    return acc;
  }, {});
  const barData = Object.entries(assigneeCount).map(([name, tasks]) => ({ name, tasks }));

  return (
    <DashboardContext.Provider value={{ projects, setProjects }}>
      <div
        className={`flex min-h-screen font-sans transition-colors duration-300 ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        {/* Sidebar */}
        <aside
          className={`w-64 flex flex-col transition-colors duration-300 ${
            darkMode ? "bg-gray-800 border-r border-gray-700" : "bg-white border-r border-gray-200"
          }`}
        >
          {/* Branding */}
          <div className="p-6 font-bold text-2xl tracking-tight">
            <span className="px-3 py-1 rounded-lg shadow-sm">SynergySphere</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 px-4">
            {[
              { label: "Dashboard", icon: <LayoutDashboard size={18} /> },
              { label: "My Tasks", icon: <CheckSquare size={18} /> },
              { label: "Notifications", icon: <Bell size={18} /> },
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
            {projects.map((p) => (
              <button
                key={p.id}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  darkMode ? "text-gray-200 hover:bg-gray-700" : "text-gray-800 hover:bg-gray-100"
                }`}
              >
                <FolderKanban size={18} />
                {p.name}
              </button>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 flex flex-col gap-4 border-t transition-colors duration-300" style={{ borderColor: darkMode ? "#444" : "#E5E7EB" }}>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <Settings size={16} />
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
                <p className="text-sm font-semibold">Dev Patel</p>
                <p className={`text-xs transition-colors duration-300 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>SphereMate</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Good Morning, SphereMate 👋</h1>
              <p className={`transition-colors duration-300 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                Here’s what’s happening with your projects today.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Search..."
                className={`px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 transition-colors duration-300 ${
                  darkMode ? "border-gray-600 focus:ring-gray-500 bg-gray-800 text-white" : "border-gray-300 focus:ring-gray-500 bg-white text-black"
                }`}
              />
              <Bell className="cursor-pointer hover:text-gray-500 transition-colors duration-300" />
              <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm hover:shadow-md transition">
                <Plus size={18} /> New Project
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[{ title: "Total Tasks", value: allTasks.length },
              { title: "Completed", value: statusCount["completed"] || 0 },
              { title: "Active Projects", value: projects.length },
              { title: "Overdue", value: statusCount["overdue"] || 0 }].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`rounded-2xl shadow-sm p-6 border transition-colors duration-300 ${
                  darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                }`}
              >
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{stat.title}</p>
                <h2 className="text-2xl font-bold">{stat.value}</h2>
              </motion.div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className={`rounded-2xl shadow-sm p-6 transition-colors duration-300 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <h3 className="font-semibold mb-4">My Week Tasks</h3>
              <ul className="space-y-3 text-sm">
                {allTasks.slice(0, 5).map((t) => (
                  <li key={t.id} className="flex justify-between items-center">
                    <span>{t.title}</span>
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      t.status === "in_progress" ? (darkMode ? "bg-gray-600 text-white" : "bg-yellow-200 text-black")
                      : t.status === "overdue" ? (darkMode ? "bg-red-700 text-white" : "bg-red-200 text-black")
                      : (darkMode ? "bg-gray-500 text-white" : "bg-green-200 text-black")
                    }`}>{t.status}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`rounded-2xl shadow-sm p-6 transition-colors duration-300 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <h3 className="font-semibold mb-4">Project Health</h3>
              {projects.map((p) => (
                <div key={p.id} className="mb-4">
                  <div className="flex justify-between text-sm mb-1">{p.name}<span>{p.progress}%</span></div>
                  <div className="h-2 bg-gray-600 rounded-full">
                    <div className="h-2 bg-black rounded-full" style={{ width: `${p.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className={`rounded-2xl shadow-sm p-6 transition-colors duration-300 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <h3 className="font-semibold mb-4">Task Breakdown</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={pieData} innerRadius={60} outerRadius={80} dataKey="value">
                    {pieData.map((entry, idx) => (
                      <Cell key={idx} fill={darkMode ? DARK_PIE_COLORS[idx % DARK_PIE_COLORS.length] : LIGHT_PIE_COLORS[idx % LIGHT_PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <div className={`rounded-2xl shadow-sm p-6 transition-colors duration-300 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <h3 className="font-semibold mb-4">Open Tasks by Assignee</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barData}>
                  <XAxis dataKey="name" stroke={darkMode ? "#CCC" : "#333"} />
                  <YAxis stroke={darkMode ? "#CCC" : "#333"} />
                  <Tooltip />
                  <Bar dataKey="tasks" fill={darkMode ? "#FF6B6B" : "#000"} radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className={`rounded-2xl shadow-sm p-6 transition-colors duration-300 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <h3 className="font-semibold mb-4">Recent Activity</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <b>Sarah</b> completed <i>Content Migration</i> • 1h ago
                </li>
                <li>
                  <b>Jane</b> commented on <i>Homepage Mockup</i> • 2h ago
                </li>
                <li>
                  <b>Tom</b> created <i>Auth Flow</i> • 3h ago
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </DashboardContext.Provider>
  );
}
