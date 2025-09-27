import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Flame, Star, Trophy, Clock } from "lucide-react";

export default function StreakCard() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gradient-to-br from-purple-900/70 to-indigo-900/70 backdrop-blur-lg rounded-2xl shadow-2xl p-6 w-full max-w-2xl mx-auto cursor-pointer hover:scale-[1.02] transition-transform"
    >
      {/* Main header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Your Grind Stats</h2>
        <Flame className="text-orange-400 w-8 h-8" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {/* Streak */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          onClick={() => navigate("/stats")}
          className="flex flex-col items-center space-y-2 cursor-pointer"
        >
          <Flame className="text-orange-400 w-8 h-8" />
          <p className="text-xl font-semibold text-white">12</p>
          <span className="text-sm text-gray-300">Day Streak</span>
        </motion.div>

        {/* XP */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          onClick={() => navigate("/xp")}
          className="flex flex-col items-center space-y-2 cursor-pointer"
        >
          <Star className="text-yellow-400 w-8 h-8" />
          <p className="text-xl font-semibold text-white">2,450</p>
          <span className="text-sm text-gray-300">Total XP</span>
        </motion.div>

        {/* Rank */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          onClick={() => navigate("/rank")}
          className="flex flex-col items-center space-y-2 cursor-pointer"
        >
          <Trophy className="text-emerald-400 w-8 h-8" />
          <p className="text-xl font-semibold text-white">#5</p>
          <span className="text-sm text-gray-300">Leaderboard</span>
        </motion.div>

        {/* Record */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          onClick={() => navigate("/record")}
          className="flex flex-col items-center space-y-2 cursor-pointer"
        >
          <Clock className="text-blue-400 w-8 h-8" />
          <p className="text-xl font-semibold text-white">27</p>
          <span className="text-sm text-gray-300">Best Streak</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
