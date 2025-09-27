import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";

const PomodoroPage = () => {
  const [workMinutes, setWorkMinutes] = useState(() => {
    return Number(localStorage.getItem("workMinutes")) || 25;
  });
  const [breakMinutes, setBreakMinutes] = useState(() => {
    return Number(localStorage.getItem("breakMinutes")) || 5;
  });
  const [timeLeft, setTimeLeft] = useState(() => {
    return Number(localStorage.getItem("timeLeft")) || workMinutes * 60;
  });
  const [isRunning, setIsRunning] = useState(() => {
    return localStorage.getItem("isRunning") === "true" || false;
  });
  const [isWorkSession, setIsWorkSession] = useState(() => {
    return localStorage.getItem("isWorkSession") !== "false";
  });
  const [notifications, setNotifications] = useState([]);
  const [totalXP, setTotalXP] = useLocalStorage("totalXP", 0);

  const purpleRef = useRef(null);
  const blueRef = useRef(null);
  const timerRef = useRef(null);
  const intervalRef = useRef(null);

  // Online sounds
  const workEndSound = useRef(new Audio("https://freesound.org/data/previews/523/523527_10897405-lq.mp3"));
  const breakEndSound = useRef(new Audio("https://freesound.org/data/previews/41/41527_512123-lq.mp3"));

  // Motivational quotes
  const quotes = [
    "Keep grinding! 💪",
    "Every minute counts! ⏳",
    "Stay focused, achieve more! 🌟",
    "Consistency is key! 🔑",
    "You're leveling up! 🚀"
  ];

  // Save state in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("workMinutes", workMinutes);
    localStorage.setItem("breakMinutes", breakMinutes);
    localStorage.setItem("timeLeft", timeLeft);
    localStorage.setItem("isRunning", isRunning);
    localStorage.setItem("isWorkSession", isWorkSession);
    localStorage.setItem("totalXP", totalXP);
  }, [workMinutes, breakMinutes, timeLeft, isRunning, isWorkSession, totalXP]);

  const updateGrindStats = (deltaXP) => {
    try {
      if (!deltaXP) return;
      const today = new Date();
      const dayKey = today.toISOString().slice(0, 10);

      const raw = localStorage.getItem("grindStats");
      const stats = raw ? JSON.parse(raw) : { totalXP: 0, days: {} };

      stats.totalXP = (stats.totalXP || 0) + deltaXP;
      stats.days = stats.days || {};
      stats.days[dayKey] = (stats.days[dayKey] || 0) + deltaXP;

      localStorage.setItem("grindStats", JSON.stringify(stats));
    } catch {
    
    }
  };
  
  const addNotification = (text, xp = 0) => {
    const id = Date.now();
    if (xp > 0) {
      setTotalXP((prev) => prev + xp);
      updateGrindStats(xp);
    }
    setNotifications((prev) => [...prev, { id, text }]);
    setTimeout(() => setNotifications((prev) => prev.filter((n) => n.id !== id)), 4000);
  };

  // Timer effect
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev > 0) return prev - 1;

          // Session finished → switch
          if (isWorkSession) {
            breakEndSound.current.play();
            addNotification("💥 Work Done!", 10);
            setIsWorkSession(false);
            return breakMinutes * 60;
          } else {
            workEndSound.current.play();
            addNotification("⚡ Break Over!", 5);
            setIsWorkSession(true);
            return workMinutes * 60;
          }
        });

        // Random quote XP during session
        if (Math.random() < 0.002) {
          const quote = quotes[Math.floor(Math.random() * quotes.length)];
          addNotification(`⭐ ${quote}`, 1);
        }
      }, 1000);
    } else clearInterval(intervalRef.current);

    return () => clearInterval(intervalRef.current);
  }, [isRunning, isWorkSession, workMinutes, breakMinutes]);

  // Blobs animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(purpleRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 2, ease: "power3.out" });
      gsap.fromTo(blueRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 2, delay: 0.3, ease: "power3.out" });
      gsap.to(purpleRef.current, { y: 30, x: -20, scale: 1.1, duration: 6, repeat: -1, yoyo: true, ease: "power1.inOut" });
      gsap.to(blueRef.current, { y: -30, x: 20, scale: 1.05, duration: 7, repeat: -1, yoyo: true, ease: "power1.inOut" });
      gsap.fromTo(timerRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.2, ease: "back.out(1.7)" });
    });
    return () => ctx.revert();
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleStartPause = () => setIsRunning(!isRunning);
  const handleReset = () => {
    setIsRunning(false);
    setIsWorkSession(true);
    setTimeLeft(workMinutes * 60);
  };

  const handleWorkChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setWorkMinutes(value);
    if (isWorkSession) setTimeLeft(value * 60);
  };

  const handleBreakChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setBreakMinutes(value);
    if (!isWorkSession) setTimeLeft(value * 60);
  };

  // Circle progress
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const progress = timeLeft / (isWorkSession ? workMinutes * 60 : breakMinutes * 60);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center
      bg-gray-50 dark:bg-[#07121f] transition-colors duration-500 overflow-hidden">

      {/* Background blobs */}
      <div ref={purpleRef} className="absolute w-[500px] h-[500px] bg-pink-300/50 dark:bg-pink-600/50 rounded-full blur-3xl top-20 left-10"></div>
      <div ref={blueRef} className="absolute w-[400px] h-[400px] bg-blue-300/50 dark:bg-blue-600/50 rounded-full blur-3xl bottom-20 right-10"></div>

      {/* XP counter */}
      <div className="absolute top-5 right-5 bg-black/60 text-white px-4 py-2 rounded-lg shadow-lg z-30 backdrop-blur-sm font-semibold">
        Total XP: {totalXP}
      </div>

      {/* Timer Circle */}
      <div ref={timerRef} className="relative w-72 h-72 flex items-center justify-center mb-10 z-10">
        <svg width="300" height="300" className="rotate-[-90deg]">
          <circle cx="150" cy="150" r={radius} stroke="#374151" strokeWidth="15" fill="none" />
          <motion.circle
            cx="150"
            cy="150"
            r={radius}
            stroke={isWorkSession ? "#ec4899" : "#3b82f6"}
            strokeWidth="15"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress * circumference}
            style={{ filter: `drop-shadow(0px 0px 15px ${isWorkSession ? "#ec4899" : "#3b82f6"})` }}
            animate={{ strokeDashoffset: circumference - progress * circumference }}
            transition={{ duration: 1, ease: "linear" }}
          />
        </svg>
        <span
          className={`absolute text-4xl font-bold drop-shadow-[0_0_15px_${isWorkSession ? "#ec4899" : "#3b82f6"}]`}
          style={{ color: isWorkSession ? "#ec4899" : "#3b82f6" }}
        >
          {formatTime(timeLeft)}
        </span>
      </div>

      {/* Notifications */}
      <AnimatePresence>
        <div className="absolute top-20 right-5 flex flex-col gap-3 z-30">
          {notifications.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
              className="bg-black/70 text-white px-4 py-2 rounded-lg shadow-lg backdrop-blur-sm"
            >
              {note.text}
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {/* Controls */}
      <div className="flex gap-4 mb-6 z-10">
        <MagneticButton 
            onClick={handleStartPause} 
            className="px-6 py-2 rounded-2xl text-lg font-semibold text-white transition"
            background="#DB2777"
            text={isRunning ? "Pause" : "Start"}/>
          
        <MagneticButton 
          onClick={handleReset} 
          className="px-6 py-2 rounded-2xl text-lg font-semibold text-white transition" 
          text="Reset"
          background="#1f2937"/>
      </div>

      {/* Settings */}
      <div className="grid grid-cols-2 gap-8 text-center z-10">
        <div>
          <label className="block mb-2 text-pink-600 dark:text-pink-300 font-medium">Work (min)</label>
          <input
            type="number"
            value={workMinutes}
            onChange={handleWorkChange}
            className="w-20 text-center py-1 px-2 rounded-lg border border-pink-500 bg-white text-pink-600 dark:bg-black dark:text-pink-300 shadow-[0_0_10px_#ec4899]"
          />
        </div>
        <div>
          <label className="block mb-2 text-blue-600 dark:text-blue-300 font-medium">Break (min)</label>
          <input
            type="number"
            value={breakMinutes}
            onChange={handleBreakChange}
            className="w-20 text-center py-1 px-2 rounded-lg border border-blue-500 bg-white text-blue-600 dark:bg-black dark:text-blue-300 shadow-[0_0_10px_#3b82f6]"
          />
        </div>
      </div>
    </div>
  );
};

export default PomodoroPage;


