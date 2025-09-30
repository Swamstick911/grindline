import { useNavigate } from "react-router-dom";
import MagneticButton from "./MagneticButton";
import useLocalStorage from "../hooks/useLocalStorage";

export default function MarketingLandingPage() {
  const navigate = useNavigate();

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden text-white animate-gradient"
      style={{
        background:
          "linear-gradient(135deg, #0b0b1f 0%, #251049 40%, #0b1a3a 80%)",
        backgroundSize: "300% 300%",
      }}
    >
      {/* ---- Floating Blobs (behind content) ---- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute -top-24 -left-24 w-[28rem] h-[28rem] rounded-full opacity-40 blur-3xl animate-blob"
          style={{ background: "radial-gradient(circle at 30% 30%, #6d28d9, transparent 65%)" }}
        />
        <div
          className="absolute -bottom-40 -right-24 w-[26rem] h-[26rem] rounded-full opacity-40 blur-3xl animate-blob delay-2000"
          style={{ background: "radial-gradient(circle at 70% 70%, #2563eb, transparent 65%)" }}
        />
        <div
          className="absolute bottom-10 left-1/4 w-[22rem] h-[22rem] rounded-full opacity-30 blur-3xl animate-blob delay-4000"
          style={{ background: "radial-gradient(circle at 50% 50%, #ec4899, transparent 65%)" }}
        />
      </div>

      {/* ---- Content ---- */}
      <div className="relative z-10 text-center px-6 space-y-8">
        <h1 className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent
                       bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-500
                       drop-shadow-[0_0_18px_rgba(200,120,255,0.55)]">
          Welcome to Grindline
        </h1>

        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto
                      drop-shadow-[0_0_12px_rgba(140,160,255,0.35)]">
          Grind smarter. Rank higher. Turn your productivity into a competitive game.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Magnetic — Primary (pink → purple) */}
          <MagneticButton
            onClick={() => navigate("/signup")}
            text="Get Started"
            textColor="#ffffff"
            background="linear-gradient(90deg, #ec4899, #8b5cf6)"
            className="text-lg font-bold"
          />

          {/* Magnetic — Secondary (cyan → blue) */}
          <MagneticButton
            onClick={() => navigate("/signin")}
            text="Already have an account?"
            textColor="#E0F2FE"
            background="linear-gradient(90deg, #22d3ee, #3b82f6)"
            className="text-base font-semibold"
          />
        </div>
      </div>
    </div>
  );
}



