import { motion } from "framer-motion";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function LeaderboardPage() {
  const [totalXP] = useLocalStorage("totalXP", 0);
  const [plannerXP] = useLocalStorage("plannerXP", 0);

  const leaderboardData = [
    { name: "Ryan", xp: 1200 },
    { name: "Swastik", xp: totalXP + plannerXP }, // your live XP
    { name: "Ziyan", xp: 950 },
    { name: "Alex", xp: 800 },
    { name: "Mia", xp: 750 },
  ]

  // Styling for top 3 with glow
  const rankStyles = [
    "from-yellow-400 to-yellow-600 text-yellow-900 shadow-lg shadow-yellow-400/50", // 1st 
    "from-gray-300 to-gray-500 text-gray-900 shadow-lg shadow-gray-400/50",         // 2nd 
    "from-orange-400 to-orange-600 text-orange-900 shadow-lg shadow-orange-500/50", // 3rd 
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors duration-500">
      
      {/* Background Blobs */}
      <motion.div
        className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-purple-400 dark:bg-purple-600 opacity-40 blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{ zIndex: 0 }}
      />
      <motion.div
        className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-blue-400 dark:bg-blue-700 opacity-40 blur-3xl"
        animate={{ x: [0, -40, 0], y: [0, -20, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ zIndex: 0 }}
      />

      {/* Title */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-12 text-gray-900 dark:text-white relative z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Leaderboard
      </motion.h1>

      {/* Leaderboard Card */}
      <motion.div
        className="w-full max-w-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 space-y-4 relative z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {leaderboardData.map((user, index) => {
          const isTop3 = index < 3;
          return (
            <motion.div
              key={index}
              className={`
                flex items-center justify-between p-4 rounded-xl transition 
                ${isTop3 
                  ? `bg-gradient-to-r ${rankStyles[index]} font-bold` 
                  : "bg-gray-100 dark:bg-gray-700 hover:shadow-lg hover:scale-[1.02] transition-transform"}
              `}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <span
                className={`font-semibold ${
                  isTop3 ? "text-lg" : "text-gray-800 dark:text-gray-200"
                }`}
              >
                #{index + 1} {user.name}
              </span>

              {/* XP Bar */}
              <div className="flex flex-col items-end w-40">
                <span
                  className={`${
                    isTop3
                      ? "text-white drop-shadow-sm"
                      : "text-purple-600 dark:text-purple-400"
                  } font-bold`}
                >
                  {user.xp} XP
                </span>
                <div className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-full mt-1 overflow-hidden">
                  <motion.div
                    className="h-2 bg-gradient-to-r from-purple-500 to-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${(user.xp / 1200) * 100}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}



