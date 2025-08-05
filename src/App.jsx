import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ComingSoon from './components/ComingSoon';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }

    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-[#1e2235]" : "bg-white"} transition-colors`}>
      <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/planner" element={<ComingSoon />} />
        <Route path="/rank" element={<ComingSoon />} />
        <Route path="/stats" element={<ComingSoon />} />
        <Route path="/pomodoro" element={<ComingSoon />} />
        <Route path="/xp" element={<ComingSoon />} />
        <Route path="/motivation" element={<ComingSoon />} />
        <Route path="*" element={<ComingSoon />} />
      </Routes>
    </div>
  );
}

export default App;
