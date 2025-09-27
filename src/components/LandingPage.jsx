import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import logoSrc from "../assets/logo.png";

export default function Home({ isDarkMode }) {
  const logoRef = useRef(null);
  const xpFillRef = useRef(null);
  const rankCardRef = useRef(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("username");
    if (stored) setUsername(stored);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      logoRef.current,
      { opacity: 0, y: 24, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power2.out" }
    )
    .fromTo(
      ".welcome-text",
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.45"
    )
    .fromTo(
      xpFillRef.current,
      { width: "0%" },
      { width: "76%", duration: 1.6, ease: "power2.out" },
      "-=0.3"
    )
    .fromTo(
        rankCardRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "elastic.out(1,0.6)" },
        "-=1.1"
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center py-12 bg-gray-50 dark:bg-[#07121f] transition-colors duration-500">
      <div className="max-w-5xl w-[96%] mx-auto text-center">
        {/* Logo / hero */}
        <div ref={logoRef} className="mx-auto mb-4">
          {logoSrc ? (
            <img src={logoSrc} alt="Grindline" className="w-20 h-20 mx-auto" />
          ) : (
            <div className="text-4xl font-extrabold">Grindline</div>
          )}
        </div>

        <h1 className="welcome-text text-3xl sm:text-4xl font-bold mb-2">
          {username ? `Welcome back, ${username}` : "Welcome to Grindline"}
        </h1>

        <p className="text-sm opacity-80 mb-6 italic">"Grind today, shine tomorrow."</p>

        {/* Rank Card */}
        <div
          ref={rankCardRef}
          className={`mx-auto bg-white/5 dark:bg-gray-800 p-6 rounded-2xl shadow-md max-w-xl w-full ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm opacity-80">Rank</div>
              <div className="text-xl font-semibold">#3</div>
            </div>

            <div className="text-right">
              <div className="text-sm opacity-80">Streak</div>
              <div className="text-lg font-semibold flex items-center gap-2 justify-end">
                6 days <span className="text-yellow-400">🔥</span>
              </div>
            </div>
          </div>

          <div className="text-sm opacity-70 mb-2">XP: 1,240 / 1,650</div>

          {/* XP bar */}
          <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
            <div ref={xpFillRef} className="h-full rounded-full bg-gradient-to-r from-pink-500 to-cyan-400" style={{ width: "0%" }} />
          </div>

          <div className="mt-4 flex justify-end">
            <a href="/rank" className="px-4 py-2 rounded-full bg-violet-600 hover:bg-violet-700 text-white text-sm">
              View Full Leaderboard
            </a>
          </div>
        </div>

        {/* spacing and small footer */}
        <div className="mt-8 text-xs opacity-70">Focus • Grind • Achieve</div>
      </div>
    </div>
  );
}