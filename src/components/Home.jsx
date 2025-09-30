import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import logo from "../assets/logo.png";
import ScrollTrigger from "gsap/ScrollTrigger";
import SignUpModal from "./SignUpModal";
import useLocalStorage from "../hooks/useLocalStorage";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const sectionRef = useRef(null);
  const aboutRef = useRef(null);
  const howRef = useRef(null);
  const cardRefs = useRef([]);
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('username');
    if (storedName) {
      setUsername(storedName);
    }
  }, []);

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

    cardRefs.current.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.2 + i * 0.2,
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
          },
        }
      );
    });
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

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-400">
          {username ? `Welcome, ${username}`: "Sign Up!"}
        </button>

        {showModal && (
          <SignUpModal
            onClose={() => setShowModal(false)}
            onSave={(name) => setUsername(name)}/>
        )}
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

      {/* How to use Section */}
      <section
        id="how-to-use"
        className="py-16 px-4 md:px-20 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">How to Use Grindline</h2>
        <div
          className="grid md:grid-cols-3 gap-8"
          ref={(el) => {
            if (el) {
              gsap.fromTo(
                el.children,
                { opacity: 0, y: 50 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  stagger: 0.2,
                  ease: 'power2.out',
                  scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                  },
                }
              );
            }
          }}
        >
          {[
            {
              title: "1. Set Your Goal",
              desc:
                "Define your task or objective. Be specific about what you want to focus on during the session.",
            },
            {
              title: "2. Choose a Timer",
              desc:
                "Select a Pomodoro or custom timer session. Break your work into focused intervals with short breaks.",
            },
            {
              title: "3. Track Your Progress",
              desc:
                "Monitor your session logs and review your productivity history to stay on track and improve.",
            },
          ].map((card, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          ))}
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
            <a href="https://github.com/Swamstick911/grindline" className="bg-white text-black hover:text-gray-700 dark:bg-[#1e2235] dark:text-white">Github</a>
          </div>

          <div className="text-xs text-gray-500 text-center md:text-right">
            © {new Date().getFullYear()} Grindline. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  )

}


