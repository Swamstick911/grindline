import { Card, CardContent } from "./Cards/Card";
import useLocalStorage from "../hooks/useLocalStorage";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { useState, useEffect } from "react";

export default function StatsPage() {
  // 🌟 Read grindStats from localStorage
  const [weeklyData, setWeeklyData] = useState([]);
  const [totalXP, setTotalXP] = useState(0);

  useEffect(() => {
    const raw = localStorage.getItem("grindStats");
    if (raw) {
      const stats = JSON.parse(raw);
      setTotalXP(stats.totalXP || 0);

      // Convert daily XP into "Mon, Tue..." order
      const daysMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const today = new Date();
      const last7 = [];

      for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        const key = d.toISOString().slice(0, 10);
        last7.push({
          day: daysMap[d.getDay()],
          xp: stats.days?.[key] || 0,
        });
      }

      setWeeklyData(last7);
    }
  }, []);

  // Default subject distribution (you can later track per-session subjects)
  const [subjectData] = useState([
    { name: "Math", value: 400 },
    { name: "Science", value: 300 },
    { name: "English", value: 200 },
    { name: "History", value: 100 },
  ]);

  const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"];

  const cardVariants = {
    initial: { scale: 1, rotateX: 0, rotateY: 0 },
    hover: { scale: 1.03, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" },
    tap: { scale: 0.98 },
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-black p-6 transition-colors duration-500">
      {/* 🌈 Animated Background Blobs */}
      <motion.div
        className="absolute top-[-15%] left-[-10%] w-[400px] h-[400px] rounded-full bg-purple-300 dark:bg-purple-700 opacity-40 blur-3xl mix-blend-multiply"
        animate={{ x: [0, 60, 0, -60, 0], y: [0, -40, 0, 40, 0], scale: [1, 1.15, 1, 0.9, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-15%] right-[-10%] w-[450px] h-[450px] rounded-full bg-blue-300 dark:bg-blue-800 opacity-40 blur-3xl mix-blend-multiply"
        animate={{ x: [0, -50, 0, 50, 0], y: [0, 30, 0, -30, 0], scale: [1, 0.85, 1, 1.2, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/3 w-[500px] h-[500px] rounded-full bg-pink-300 dark:bg-pink-700 opacity-30 blur-3xl mix-blend-multiply -translate-x-1/2 -translate-y-1/2"
        animate={{ scale: [1, 1.2, 0.9, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 📊 Dashboard Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <motion.div variants={cardVariants} initial="initial" whileHover="hover" whileTap="tap" className="rounded-2xl">
          <Card className="p-4 backdrop-blur-xl bg-white/80 dark:bg-gray-900/70 shadow-lg transition rounded-2xl hover:shadow-purple-500/30">
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Weekly Grind Progress</h2>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                  <XAxis dataKey="day" stroke="currentColor" />
                  <YAxis stroke="currentColor" />
                  <Tooltip />
                  <Line type="monotone" dataKey="xp" stroke="#6366f1" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Pie Chart */}
        <motion.div variants={cardVariants} initial="initial" whileHover="hover" whileTap="tap" className="rounded-2xl">
          <Card className="p-4 backdrop-blur-xl bg-white/80 dark:bg-gray-900/70 shadow-lg transition rounded-2xl hover:shadow-blue-500/30">
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Subject-wise Distribution</h2>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={subjectData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                    {subjectData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Bar Chart */}
        <motion.div variants={cardVariants} initial="initial" whileHover="hover" whileTap="tap" className="lg:col-span-2 rounded-2xl">
          <Card className="p-4 backdrop-blur-xl bg-white/80 dark:bg-gray-900/70 shadow-lg transition rounded-2xl hover:shadow-green-500/30">
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">XP Gained (Last 7 Days)</h2>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                  <XAxis dataKey="day" stroke="currentColor" />
                  <YAxis stroke="currentColor" />
                  <Tooltip />
                  <Bar dataKey="xp" fill="#22c55e" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Total XP Counter */}
      <div className="absolute top-5 right-5 bg-black/60 text-white px-4 py-2 rounded-lg shadow-lg z-30 backdrop-blur-sm font-semibold">
        Total XP: {totalXP}
      </div>
    </div>
  );
}


