import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { Sparkles, ShieldCheck, ShieldAlert, SendHorizonal } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useLocalStorage from "../hooks/useLocalStorage";

export default function ChatbotPage() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState(() => {
    const saved = localStorage.getItem("chatHistory");
    return saved
      ? JSON.parse(saved)
      : [
          {
            role: "assistant",
            content: "Hey! I’m your Grindline study buddy. How can I help today? 📚⚡",
          },
        ];
  });
  const [loading, setLoading] = useState(false);
  const [guarded, setGuarded] = useState(false);
  const [backendAvailable, setBackendAvailable] = useState(true);

  const purpleRef = useRef(null);
  const blueRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chat));
  }, [chat]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(purpleRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" });
      gsap.fromTo(blueRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2, delay: 0.25, ease: "power3.out" });
      gsap.to(purpleRef.current, { y: 30, x: -20, scale: 1.06, duration: 6, repeat: -1, yoyo: true, ease: "power1.inOut" });
      gsap.to(blueRef.current, { y: -30, x: 20, scale: 1.04, duration: 7, repeat: -1, yoyo: true, ease: "power1.inOut" });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, loading]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const newChat = [...chat, { role: "user", content: trimmed }];
    setChat(newChat);
    setInput("");
    setLoading(true);
    setGuarded(false);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newChat,
          model: "gpt-4.1-mini",
          temperature: 0.7,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setGuarded(Boolean(data.guarded));
      setChat((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "…" },
      ]);
      setBackendAvailable(true);
    } catch (err) {
      console.error(err);
      setBackendAvailable(false);
      setChat((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "🤖 The AI backend is not active. You can still use Grindline for planning and tracking your tasks!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gray-50 dark:bg-[#07121f] transition-colors duration-500">
      {/* Neon gradient blobs */}
      <div ref={purpleRef} className="pointer-events-none absolute w-[520px] h-[520px] bg-pink-300/50 dark:bg-pink-600/50 rounded-full blur-3xl top-24 left-10" />
      <div ref={blueRef} className="pointer-events-none absolute w-[420px] h-[420px] bg-blue-300/50 dark:bg-blue-600/50 rounded-full blur-3xl bottom-24 right-10" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center pt-24 pb-36 px-4">
        {/* Header */}
        <div className="w-full max-w-4xl mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-pink-500" />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Grindline Chatbot
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Guard indicator */}
            <div
              title={
                guarded
                  ? "Prompt-injection protection was activated for the last message."
                  : "All clear."
              }
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium
                ${
                  guarded
                    ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                    : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                }`}
            >
              {guarded ? <ShieldAlert className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
              {guarded ? "Guarded" : "Protected"}
            </div>

            {/* Clear Chat Button */}
            <button
              onClick={() => {
                gsap.to(".chat-message", {
                  opacity: 0,
                  y: -10,
                  duration: 0.4,
                  onComplete: () => {
                    setChat([
                      {
                        role: "assistant",
                        content: "Hey! I'm your Grindline study buddy. How can I help today? 📚⚡",
                      },
                    ]);
                    localStorage.removeItem("chatHistory");
                  },
                });
              }}
              className="px-3 py-1 text-xs rounded-lg font-medium bg-gradient-to-r from-pink-500 to-purple-600 
          text-white hover:from-pink-600 hover:to-purple-700 shadow-md transition"
            >
              Clear Chat
            </button>
          </div>
        </div>

        {/* Chat window */}
        <div className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-xl">
          <div className="backdrop-blur-md bg-white/70 dark:bg-gray-900/60 border border-white/40 dark:border-white/10 rounded-2xl p-4 md:p-6 max-h-[62vh] overflow-y-auto">
            <div className="space-y-4">
              <AnimatePresence initial={false}>
                {chat.map((m, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`
                        max-w-[85%] md:max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed
                        border shadow-sm prose prose-sm dark:prose-invert
                        ${m.role === "user"
                          ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white border-white/10 prose-p:!text-white prose-strong:!text-white prose-code:!text-white"
                          : "bg-white/90 dark:bg-gray-800/80 text-gray-800 dark:text-gray-100 border-black/5 dark:border-white/10"
                        }`}
                    >
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {m.content}
                      </ReactMarkdown>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/90 dark:bg-gray-800/80 text-gray-800 dark:text-gray-100 border border-black/5 dark:border-white/10 px-4 py-3 rounded-2xl">
                    <div className="flex items-center gap-2">
                      <span>Thinking</span>
                      <span className="inline-flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" />
                        <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce [animation-delay:120ms]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce [animation-delay:240ms]" />
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>
          </div>

          {/* Composer */}
          <div className="mt-4 flex items-end gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything… study tips, summaries, planning help!"
              rows={1}
              className="flex-1 resize-none rounded-xl px-4 py-3 border bg-white/80 dark:bg-gray-900/70 dark:text-white dark:border-gray-700 focus:outline-none shadow-md"
            />

            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className={`h-12 px-5 rounded-xl inline-flex items-center justify-center gap-2 font-semibold shadow-lg transition
                ${loading || !input.trim()
                  ? "bg-gray-300 text-gray-600 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700"
                }`}
            >
              <SendHorizonal className="w-5 h-5" />
              Send
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-xs text-gray-500 dark:text-gray-400">
          Your messages are protected by basic prompt-injection guards. Keep it kind & productive ✨
        </p>
      </div>
    </div>
  );
}

