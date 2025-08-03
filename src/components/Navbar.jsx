import { useEffect, useRef } from "react";
import gsap from "gsap";

const Navbar = ({ toggleDarkMode, isDarkMode }) => {
  const navRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
    );
  }, []);

  return (
    <nav
      ref={navRef}
      className={`w-[96%] mx-auto top-6 fixed px-6 py-3 rounded-2xl shadow-xl top-4 left-1/2 transform -translate-x-1/2 z-50 border transition-colors duration-300
        ${isDarkMode 
          ? 'bg-gray-900 text-white border-white/10'
          : 'bg-white text-gray-800 border-gray-200'
        }`}
    >
      <div className="flex justify-between items-center">
        {/* Brand */}
        <div
          className={`text-xl font-bold px-4 py-2 rounded-full transition-colors duration-300
            ${isDarkMode 
              ? 'bg-gray-800 text-white' 
              : 'bg-gray-200 text-gray-900'
            }`}
        >
          <a href="/" className="hover:underline">Grindline</a>
        </div>

        {/* Navigation Links */}
        <div
          className={`flex gap-6 font-medium transition-colors duration-300
            ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}
          `}
        >
          <a href="/planner" className="hover:underline">Planner</a>
          <a href="/rank" className="hover:underline">Rank</a>
          <a href="/stats" className="hover:underline">Stats</a>
          <a href="/pomodoro" className="hover:underline">Pomodoro</a>
          <a href="/xp" className="hover:underline">XP</a>
          <a href="/motivation" className="hover:underline">Motivation</a>
        </div>

        {/* Dark Mode Toggle */}
        <div className="flex items-center">
          <label className="inline-flex relative items-center cursor-pointer">
            <button
              onClick={toggleDarkMode}
              className={`w-14 h-7 flex items-center rounded-full p-1 duration-300 ${
                isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
              }`}
            >
              <div
                className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ${
                  isDarkMode ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>
          </label>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
