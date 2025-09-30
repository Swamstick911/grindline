import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BottomNav from "./BottomNav";
import useLocalStorage from "../hooks/useLocalStorage";
import gsap from "gsap";

export default function Navbar({ isDarkMode, toggleDarkMode }) {
  const navWrapperRef = useRef(null);
  const navRef = useRef(null);
  const [hovering, setHovering] = useState(false);

  // Detect cursor near top for showing navbar
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (e.clientY <= 60) {
        setHovering(true);
      } else if (e.clientY > 100) {
        setHovering(false);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animate navbar up/down on hover
  useEffect(() => {
    if (!navRef.current) return;
    gsap.to(navRef.current, {
      y: hovering ? 0 : -100, // slides up when not hovering
      duration: 0.4,
      ease: "power2.out",
    });
  }, [hovering]);

  // BottomNav items
  const navItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Planner", path: "/planner" },
    { label: "Rank", path: "/rank" },
    { label: "Stats", path: "/stats" },
    { label: "Pomodoro", path: "/pomodoro" },
    { label: "Chatbot", path: "/ai" },
  ];

  return (
    <>
      <div
        ref={navWrapperRef}
        className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[100px] z-50 flex justify-center items-start pointer-events-auto"
      >
        <div ref={navRef} className="w-full flex justify-center">
          <BottomNav
            items={navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                {item.label}
              </Link>
            ))}
            className=""
          />
        </div>
      </div>

      {/* Dark/Light mode toggle inside navbar */}
      <div className="fixed top-4 right-6 z-50">
        <button
          onClick={toggleDarkMode}
          className={`w-14 h-7 flex items-center rounded-full p-1 duration-300 ${
            isDarkMode ? "bg-gray-600" : "bg-gray-300"
          }`}
        >
          <div
            className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ${
              isDarkMode ? "translate-x-7" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    </>
  );
}



