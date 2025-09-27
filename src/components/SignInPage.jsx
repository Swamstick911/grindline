import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ComicButton from "./ComicButton";

export default function SignInPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setError("");

    // Load users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check credentials
    const user = users.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

    if (user) {
      alert(`Welcome back, ${user.username}!`);
      // Simulate login session
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/dashboard");
    } else if (users.some((u) => u.email === formData.email)) {
      setError("Wrong password for this account.");
    } else {
      setError("No account found with this email.");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-purple-900 to-indigo-900 text-white overflow-hidden animate-gradient">
      {/* Floating blobs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"
        animate={{ y: [0, -20, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"
        animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
      />

      {/* Sign in form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md p-8 bg-black/40 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20"
      >
        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
          Welcome Back!!
        </h1>

        <form onSubmit={handleSignIn} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <ComicButton
            type="submit"
            text="Sign In"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition-transform duration-300 shadow-lg"
          />
        </form>

        <p className="mt-4 text-center text-gray-300">
          Don&apos;t have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-pink-400 hover:text-purple-400 font-semibold"
          >
            Sign Up
          </button>
        </p>
      </motion.div>
    </div>
  );
}

