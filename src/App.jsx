import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import MarketingLandingPage from "./components/MarketingLandingPage";
import SignUpPage from "./components/SignUpPage";
import SignInPage from "./components/SignInPage";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import PlannerPage from "./components/PlannerPage";
import LeaderboardCard from "./components/Cards/LeaderboardCard";
import LeaderboardPage from "./components/LeaderboardPage";
import StatsPage from "./components/StatsPage";
import PomodoroPage from "./components/PomodoroPage";
import ChatbotPage from "./components/ChatbotPage";

function App() {
  // Dark mode state with localStorage persistence
  const [isDarkMode, setIsDarkMode] = useLocalStorage("darkMode", false);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const WithNavbar = ({ children }) => (
    <>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      {children}
    </>
  );

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <Routes>
        <Route path="/" element={<MarketingLandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />

        <Route 
          path="/planner" 
          element={ 
          <WithNavbar>
            <PlannerPage isDarkMode={isDarkMode} />
          </WithNavbar>
          }
        />

        <Route 
          path="/rank"
          element={
            <WithNavbar>
              <LeaderboardPage isDarkMode={isDarkMode}></LeaderboardPage>
            </WithNavbar>
          } />
        
        <Route 
          path="/pomodoro"
          element={
            <WithNavbar>
              <PomodoroPage isDarkMode={isDarkMode}></PomodoroPage>
            </WithNavbar>
          } />

        <Route 
          path="/stats"
          element={
            <WithNavbar>
              <StatsPage isDarkMode={isDarkMode}></StatsPage>
            </WithNavbar>
          } />

        <Route
          path="/dashboard"
          element={
            <WithNavbar>
              <Dashboard isDarkMode={isDarkMode} />
            </WithNavbar>
          }
        />

        <Route
          path="/ai"
          element={
            <WithNavbar>
              <ChatbotPage isDarkMode={isDarkMode} />
            </WithNavbar>
          }
        />

      </Routes>
    </div>
  );
}

export default App;
