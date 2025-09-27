import { useState } from "react";

export default function PlannerModule({ subject, tasks, onChange, onRemove }) {
  const [newTask, setNewTask] = useState("");

  const toggleTask = (task) => {
    let updated;
    if (tasks.includes(task)) {
      updated = tasks.filter((t) => t !== task);
    } else {
      updated = [...tasks, task];
    }
    onChange(updated);
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    const updated = [...tasks, newTask.trim()];
    onChange(updated);
    setNewTask("");
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-colors duration-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{subject}</h2>
        <button
          onClick={onRemove}
          className="text-red-500 hover:text-red-700 font-medium"
        >
          ✖ Remove
        </button>
      </div>

      <ul className="space-y-2 mb-4">
        {tasks.map((task, idx) => (
          <li key={idx} className="flex items-center">
            <input
              type="checkbox"
              checked={tasks.includes(task)}
              onChange={() => toggleTask(task)}
              className="mr-2 h-4 w-4 accent-purple-600"
            />
            <span className="text-gray-900 dark:text-gray-100">{task}</span>
          </li>
        ))}
      </ul>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none"
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          Add
        </button>
      </div>
    </div>
  );
}
