import { useState } from "react";
import { motion } from "framer-motion";
import ComicButton from "./ComicButton";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    const username = e.target.username.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    if (!username || !email || !password) {
      setMessage("⚠️ Please fill all required fields.");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some((user) => user.username === username)) {
      setMessage("Username already taken.");
      return;
    }

    if (users.some((user) => user.email === email)) {
      setMessage("An account already exists with that email.");
      return;
    }

    const newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setMessage("Signup successful!");
    e.target.reset(); // clear form
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden text-white animate-gradient"
      style={{
        background:
          "linear-gradient(135deg, #0b0b1f 0%, #251049 40%, #0b1a3a 80%)",
        backgroundSize: "300% 300%",
      }}
    >
      {/* ---- Floating Blobs (same as MarketingLandingPage) ---- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute -top-24 -left-24 w-[28rem] h-[28rem] rounded-full opacity-40 blur-3xl animate-blob"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, #6d28d9, transparent 65%)",
          }}
        />
        <div
          className="absolute -bottom-40 -right-24 w-[26rem] h-[26rem] rounded-full opacity-40 blur-3xl animate-blob delay-2000"
          style={{
            background:
              "radial-gradient(circle at 70% 70%, #2563eb, transparent 65%)",
          }}
        />
        <div
          className="absolute bottom-10 left-1/4 w-[22rem] h-[22rem] rounded-full opacity-30 blur-3xl animate-blob delay-4000"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, #ec4899, transparent 65%)",
          }}
        />
      </div>

      {/* ---- Signup Card ---- */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 bg-black/40 backdrop-blur-lg p-10 rounded-2xl shadow-xl max-w-md w-full border border-white/10"
      >
        <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
          Join Grindline
        </h1>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />

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

          <ComicButton
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 15px rgba(255,255,255,0.4)",
            }}
            text="Sign Up"
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 py-3 rounded-lg font-semibold"
          />
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-200">{message}</p>
        )}
      </motion.div>
    </div>
  );
}
