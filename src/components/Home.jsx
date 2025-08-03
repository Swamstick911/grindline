import { useEffect, useRef } from "react";
import gsap from "gsap";
import Button from "./Button";
import logo from "../assets/logo.png";

export default function Home() {
  const sectionRef = useRef(null);
  const aboutRef = useRef(null);
  const howRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }
    );

    gsap.fromTo(
      [aboutRef.current, howRef.current],
      { opacity: 0, y: 40 },
      {
        opacity: 1, 
        y: 0,
        duration: 1, 
        ease: "power2.out",
        stagger: 0.3,
        delay: 1,
      }
    );
  }, []);

  return (
    <div className="min-h-screen w-full bg-white text-black dark:bg-[#1e2235] dark:text-white pt-48">
      {/*Home Section*/}
      <section ref={sectionRef} className="text-center px-4 flex flex-col items-center">
        <img src={logo} alt="GL Logo" className="w-20 h-20 mb-6" />

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
          Welcome to Your
        </h1>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
          Productivity Platform
        </h1>

        <p className="text-lg mb-6 bg-white text-black dark:bg-[#1e2235] dark:text-white">
          Stay Productive. Stay Focused.
        </p>

        <Button className="px-6 py-3 text-lg rounded-xl bg-blue-600 hover:bg-blue-700 transition">
          Sign Up!
        </Button>
      </section>

      {/*About Section */}
      <section ref={aboutRef} className="px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">About</h2>
       <p className="bg-white text-black dark:bg-[#1e2235] dark:text-white">
          Grindline is a productivity platform for your academics. It blocks
          out distractions and helps you focus on your work. It has many
          features like a to-do list to track your homeworks and tasks. A
          pomodoro timer so that you don't feel burned out during those
          assignments. A motivation page when you are demotivated but you want
          to do your part of work!
        </p>

        <p className="mt-5 bg-white text-black dark:bg-[#1e2235] dark:text-white">
          If this platform is used effectively and efficiently, it can help you
          achieve a lot more than you think.
        </p>
      </section>

      <hr className="border-gray-600"/>

      {/*How to use Section*/ }

      <section id="how-to-use" className="py-16 px-4 md:px-20 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <h2 className="text-3xl font-bold mb-8 text-center">How to Use Grindline</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">1. Set Your Goal</h3>
            <p>Define your task or objective. Be specific about what you want to focus on during the session.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">2. Choose a Timer</h3>
            <p>Select a Pomodoro or custom timer session. Break your work into focused intervals with short breaks.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">3. Track Your Progress</h3>
            <p>Monitor your session logs and review your productivity history to stay on track and improve.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-10 pb-6 font-sans bg-white text-black dark:bg-[#1e2235] dark:text-white">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-xl font-bold">Grindline</h2>
            <p className="text-sm mt-2  bg-white text-black dark:bg-[#1e2235] dark:text-white">Focus. Grind. Achieve.</p>
          </div>

          <div className="flex gap-6">
            <a href="https://github.com/Swamstick911" className="bg-white text-black hover:text-gray-700 dark:bg-[#1e2235] dark:text-white">Github</a>
          </div>

          <div className="text-xs text-gray-500 text-center md:text-right">
            © {new Date().getFullYear()} Grindline. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  )
}