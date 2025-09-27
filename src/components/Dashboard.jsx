import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import logoSrc from "../assets/logo.png";
import StreakCard from "./Cards/StreakCard";
import LeaderboardCard from "./Cards/LeaderboardCard";
import ProgressCard from "./Cards/ProgressCard";

export default function Dashboard({ isDarkMode }) {
  const logoRef = useRef(null);
  const shapesRef = useRef([]);
  const [username, setUsername] = useState("");

  // color/opacity of background shapes per mode
  useEffect(() => {
    shapesRef.current.forEach((shape) => {
      if (!shape) return;
      if (isDarkMode) {
        shape.style.background =
          "linear-gradient(135deg, #5b6a82, #6c5d7a, #4b6675)";
        shape.style.opacity = (0.22 + Math.random() * 0.08).toString();
      } else {
        shape.style.background =
          "linear-gradient(135deg, #fcd34d, #fbb6ce, #fb923c)";
        shape.style.opacity = (0.32 + Math.random() * 0.12).toString();
      }
    });
  }, [isDarkMode]);

  // set body class for global theme styles
  useEffect(() => {
    if (isDarkMode) document.body.classList.add("dark-mode");
    else document.body.classList.remove("dark-mode");
  }, [isDarkMode]);

  // username
  useEffect(() => {
    const stored = localStorage.getItem("username");
    if (stored) setUsername(stored);
  }, []);

  // entrance anim
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      logoRef.current,
      { opacity: 0, y: 24, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power2.out" }
    ).fromTo(
      ".welcome-text",
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.45"
    );
    return () => tl.kill();
  }, []);

  // randomize shapes once
  useEffect(() => {
    shapesRef.current.forEach((shape) => {
      if (!shape) return;
      const top = Math.random() * window.innerHeight * 0.8;
      const left = Math.random() * window.innerWidth * 0.9;
      shape.style.top = `${top}px`;
      shape.style.left = `${left}px`;
    });
  }, []);

  // cursor trail (lightweight)
  useEffect(() => {
    const trailContainer = document.createElement("div");
    Object.assign(trailContainer.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: "9",
    });
    document.body.appendChild(trailContainer);

    const createTrail = (x, y) => {
      const dot = document.createElement("span");
      Object.assign(dot.style, {
        position: "absolute",
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        background: isDarkMode
          ? "rgba(255,255,255,0.22)"
          : "rgba(250,200,150,0.22)",
        left: `${x}px`,
        top: `${y}px`,
        pointerEvents: "none",
      });
      trailContainer.appendChild(dot);
      gsap.to(dot, {
        opacity: 0,
        scale: 0,
        duration: 0.6,
        onComplete: () => dot.remove(),
      });
    };

    const moveHandler = (e) => createTrail(e.clientX, e.clientY);
    window.addEventListener("mousemove", moveHandler);

    return () => {
      window.removeEventListener("mousemove", moveHandler);
      trailContainer.remove();
    };
  }, [isDarkMode]);

  return (
    <div
      className={`min-h-screen w-full relative flex items-center justify-center py-12 transition-colors duration-500
        ${
          isDarkMode
            ? "bg-[#07121f] text-white"
            : "bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 text-black"
        }`}
    >
      {/* Background shapes */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => {
          const shapeType = ["circle", "triangle", "hexagon"][i % 3];
          const style = {
            width: `${40 + Math.random() * 40}px`,
            height: `${40 + Math.random() * 40}px`,
            top: `${Math.random() * window.innerHeight * 0.9}px`,
            left: `${Math.random() * window.innerWidth * 0.9}px`,
            opacity: 0.25 + Math.random() * 0.15,
          };
          return (
            <div
              key={i}
              ref={(el) => (shapesRef.current[i] = el)}
              className={`absolute animate-blob ${
                shapeType === "circle"
                  ? "rounded-full"
                  : shapeType === "triangle"
                  ? "clip-triangle"
                  : "clip-hexagon"
              } ${isDarkMode ? "dark-shape" : "light-shape"}`}
              style={style}
            />
          );
        })}
      </div>

      {/* Content */}
      <div className="max-w-5xl w-[96%] mx-auto text-center relative z-10">
        {/* Logo */}
        <div ref={logoRef} className="mx-auto mb-4">
          {logoSrc ? (
            <img
              src={logoSrc}
              alt="Grindline"
              className="w-24 h-24 mx-auto animate-bounce-slow"
            />
          ) : (
            <div className="text-5xl font-extrabold">Grindline</div>
          )}
        </div>

        <h1 className="welcome-text text-3xl sm:text-4xl font-bold mb-2">
          {username ? `Welcome back, ${username}` : "Welcome to Grindline"}
        </h1>

        <p className="text-sm opacity-80 mb-8 italic">
          "Grind today, shine tomorrow."
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StreakCard />
          <LeaderboardCard />
          <ProgressCard />
        </div>

        <div className="mt-10 text-xs opacity-70">Focus • Grind • Achieve</div>
      </div>
    </div>
  );
}
