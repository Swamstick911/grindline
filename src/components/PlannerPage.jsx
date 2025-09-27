import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import ComicButton from "./ComicButton";
import RippleButton from "./RippleButton";
import useLocalStorage from "../hooks/useLocalStorage";

const PlannerPage = () => {
  const [tasks, setTasks] = useLocalStorage("plannerTasks", []);

  const [newTask, setNewTask] = useState("");
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");

  const purpleRef = useRef(null);
  const blueRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const tasksRef = useRef([]);
  const xpFillRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("plannerTasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // blobs entrance
      gsap.fromTo(
        purpleRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: "power3.out" }
      );

      gsap.fromTo(
        blueRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, delay: 0.3, ease: "power3.out" }
      );

      // blobs floating loop
      gsap.to(purpleRef.current, {
        y: 30,
        x: -20,
        scale: 1.1,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      gsap.to(blueRef.current, {
        y: -30,
        x: 20,
        scale: 1.05,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // title + form timeline
      const tl = gsap.timeline();
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: -40 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      ).fromTo(
        formRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" },
        "-=0.3"
      );
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      const lastTask = tasksRef.current[tasks.length - 1];
      gsap.fromTo(
        lastTask,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [tasks]);

  // XP Calculation
  const completedTasks = tasks.filter((t) => t.completed).length;
  const [plannerXP, setPlannerXP] = useLocalStorage("plannerXP", 0);
  const maxXP = tasks.length * 10 || 100; // avoid divide by 0
  const progressPercent = Math.min((plannerXP / maxXP) * 100, 100);

  useEffect(() => {
    setPlannerXP(completedTasks * 10);
  }, [completedTasks]);

  useEffect(() => {
    if (xpFillRef.current) {
      gsap.to(xpFillRef.current, {
        width: `${progressPercent}%`,
        duration: 0.8,
        ease: "power3.out",
      });
    }
  }, [progressPercent]);

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim() || !subject.trim() || !dueDate) return;

    const newEntry = {
      id: Date.now(),
      text: newTask,
      subject,
      dueDate,
      completed: false,
    };

    setTasks((prev) => [...prev, newEntry]);
    setNewTask("");
    setSubject("");
    setDueDate("");
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center px-6 py-12 
      bg-gray-50 dark:bg-[#07121f] transition-colors duration-500 overflow-hidden"
    >
      {/* Background shapes */}
      <div
        ref={purpleRef}
        className="absolute w-[500px] h-[500px] bg-purple-400/50 dark:bg-purple-600/50 
        rounded-full blur-3xl top-20 left-10"
      ></div>
      <div
        ref={blueRef}
        className="absolute w-[400px] h-[400px] bg-blue-400/50 dark:bg-blue-600/50 
        rounded-full blur-3xl bottom-20 right-10"
      ></div>

      {/* Content */}
      <h1
        ref={titleRef}
        className="text-4xl font-bold text-gray-800 dark:text-white z-10 mb-4"
      >
        Planner
      </h1>

      {/* XP Bar */}
      <div className="z-10 w-full max-w-lg mb-6">
        <div className="flex justify-between text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
          <span>XP: {plannerXP}</span>
          <span>{Math.round(progressPercent)}%</span>
        </div>
        <div className="w-full h-4 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            ref={xpFillRef}
            className="h-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
            style={{ width: "0%" }}
          ></div>
        </div>
      </div>

      {/* Task Input Form */}
      <form
        ref={formRef}
        onSubmit={addTask}
        className="z-10 w-full max-w-lg bg-white/70 dark:bg-gray-800/70 
        backdrop-blur-md p-6 rounded-2xl shadow-lg flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Task name..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="p-3 rounded-lg border dark:border-gray-600 
          dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
        />

        <input
          type="text"
          placeholder="Subject..."
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="p-3 rounded-lg border dark:border-gray-600 
          dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="p-3 rounded-lg border dark:border-gray-600 
          dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
        />

        <ComicButton
          text="+ Add Task"
          type="submit"
          className="
             bg-purple-600 hover:bg-purple-700 text-white font-bold 
            py-2 px-5 rounded-2xl border-2 
           border-purple-700 transition-transform duration-200
            hover:scale-105 active:scale-95
           dark:bg-purple-500 dark:hover:bg-purple-600 
           dark:border-purple-400"
        />
      </form>

      {/* Task List */}
      <div className="z-10 mt-8 w-full max-w-lg space-y-4">
        {tasks.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400 text-center">
            No tasks yet. Add one above!
          </p>
        ) : (
          tasks.map((task, index) => (
            <div
              key={task.id}
              ref={(el) => (tasksRef.current[index] = el)}
              className={`p-4 rounded-xl shadow-md flex justify-between items-center 
              ${
                task.completed
                  ? "bg-green-100 dark:bg-green-800"
                  : "bg-white/80 dark:bg-gray-800/80"
              }`}
            >
              <div>
                <h3
                  className={`text-lg font-semibold ${
                    task.completed
                      ? "line-through text-gray-500"
                      : "text-gray-900 dark:text-white"
                  }`}
                >
                  {task.text}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  📘 {task.subject} | 📅 {task.dueDate}
                </p>
              </div>

              <div className="flex gap-2">
                <RippleButton
                  background="#2CB610"
                  hoverFlairColor="#228D0C"
                  buttonWidth="100px"
                  borderRadius="15px"
                  text={task.completed ? "Undo" : "Done"}
                  onClick={() => toggleTask(task.id)}
                  className="px-3 py-1 rounded-lg"
                />
                <RippleButton
                  text="✕"
                  onClick={() => deleteTask(task.id)}
                  background="#F11515"
                  borderRadius="15px"
                  buttonWidth="50px"
                  hoverFlairColor="#AE0F0F"
                  className="px-2 py-1 rounded-lg"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PlannerPage;
