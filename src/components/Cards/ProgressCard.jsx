import { Card, CardContent } from "./Card";
import { motion } from "framer-motion";

export default function ProgressCard() {
  // Example progress values (you’ll later replace with real state)
  const xpProgress = 70; // %
  const streakProgress = 40; // %

  return (
    <Card className="bg-gradient-to-br from-purple-700 to-indigo-800 text-white rounded-2xl shadow-lg p-5 cursor-pointer hover:scale-[1.02] transition-transform">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">Progress</h2>

        {/* XP Progress */}
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-sm">XP Level</span>
            <span className="text-sm">{xpProgress}%</span>
          </div>
          <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden">
            <motion.div
              className="h-3 bg-green-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${xpProgress}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>

        {/* Streak Progress */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm">Streak</span>
            <span className="text-sm">{streakProgress}%</span>
          </div>
          <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden">
            <motion.div
              className="h-3 bg-orange-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${streakProgress}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
