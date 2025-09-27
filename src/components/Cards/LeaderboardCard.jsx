import React from "react";
import ComicButton from "../ComicButton";

// simple emoji icons to avoid extra deps
const Crown = () => <span role="img" aria-label="crown">👑</span>;
const Flame = () => <span role="img" aria-label="flame">🔥</span>;

const players = [
  { name: "Ryan", xp: 1350, rank: 1 },
  { name: "Swastik", xp: 1200, rank: 2, highlight: true },
  { name: "Ziyan", xp: 900, rank: 3 },
];

export default function LeaderboardCard() {
  return (
    <div
      className="
        rounded-2xl border shadow-md
        bg-white/90 dark:bg-neutral-900/90
        border-neutral-200 dark:border-neutral-700
        p-6 h-full
      "
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Top 3</h3>
        <span className="text-xs px-2 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-300">
          Live
        </span>
      </div>

      <ul className="space-y-3">
        {players.map((p) => (
          <li
            key={p.rank}
            className={`
              flex items-center justify-between rounded-xl px-4 py-3
              ${p.highlight
                ? "ring-1 ring-purple-500/40 bg-purple-500/5"
                : "bg-neutral-100/60 dark:bg-neutral-800/60"}
            `}
          >
            <div className="flex items-center gap-3">
              <div className={`
                  w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold
                  ${p.rank === 1
                    ? "bg-yellow-400/90 text-black"
                    : "bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100"}
                `}
              >
                {p.rank}
              </div>
              <div className="font-medium">{p.name}</div>
              {p.rank === 1 && <div className="ml-1"><Crown /></div>}
              {p.highlight && <div className="ml-1 text-purple-500"><Flame /></div>}
            </div>
            <div className="text-sm opacity-80">XP {p.xp}</div>
          </li>
        ))}
      </ul>

      <div className="mt-5 text-right">
        <ComicButton
          href="/rank"
          className="text-sm px-3 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white"
          text="View Full Leaderboard"
          />
      </div>
    </div>
  );
}
