"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Moon, Sun } from "lucide-react";
import { useRouter } from "next/navigation";

export function WelcomeRewardWheel({ onComplete }) {
  const [currentView, setCurrentView] = useState("ready");
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonReward, setWonReward] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const router = useRouter();

  const welcomeRewards = [
    {
      id: 1,
      name: "Free Mentor Session",
      icon: "👨‍🏫",
      color: "#10b981",
      rarity: "legendary",
      description: "30-min 1-on-1 with expert",
    },
    {
      id: 2,
      name: "Premium Course Access",
      icon: "🎓",
      color: "#059669",
      rarity: "epic",
      description: "Unlock advanced courses",
    },
    {
      id: 3,
      name: "1000 XP Bonus",
      icon: "⚡",
      color: "#047857",
      rarity: "rare",
      description: "Instant experience boost",
    },
    {
      id: 4,
      name: "Study Credits",
      icon: "💰",
      color: "#065f46",
      rarity: "common",
      description: "$50 learning credits",
    },
    {
      id: 5,
      name: "VIP Community Access",
      icon: "👑",
      color: "#064e3b",
      rarity: "legendary",
      description: "Exclusive learner community",
    },
    {
      id: 6,
      name: "Course Bundle",
      icon: "📚",
      color: "#022c22",
      rarity: "epic",
      description: "3 premium courses",
    },
    {
      id: 7,
      name: "Learning Streak Boost",
      icon: "🔥",
      color: "#15803d",
      rarity: "rare",
      description: "7-day streak multiplier",
    },
    {
      id: 8,
      name: "Certificate Fast Track",
      icon: "📜",
      color: "#166534",
      rarity: "common",
      description: "Skip prerequisites",
    },
  ];

  const spinWheel = () => {
    setCurrentView("spinning");
    setIsSpinning(true);

    const randomRotation = 1440 + Math.random() * 720;
    setRotation(randomRotation);

    const normalizedRotation = randomRotation % 360;
    const segmentSize = 360 / welcomeRewards.length;
    const wonIndex =
      Math.floor((360 - normalizedRotation) / segmentSize) %
      welcomeRewards.length;

    setTimeout(() => {
      setIsSpinning(false);
      setWonReward(welcomeRewards[wonIndex]);
      setCurrentView("result");
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }, 5000);
  };

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div
        className={`min-h-screen flex flex-col items-center justify-center px-4 ${
          isDarkMode
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100"
            : "bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 text-gray-900"
        }`}
      >
        {/* Dark mode toggle */}
        <div className="absolute top-4 right-4">
          <Button
            variant="outline"
            onClick={toggleDarkMode}
            className="flex items-center gap-2"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </Button>
        </div>

        {currentView === "ready" && (
          <WheelReady
            rewards={welcomeRewards}
            onSpin={spinWheel}
            isDarkMode={isDarkMode}
          />
        )}

        {currentView === "spinning" && (
          <WheelSpinning
            rewards={welcomeRewards}
            rotation={rotation}
            isDarkMode={isDarkMode}
          />
        )}

        {currentView === "result" && (
          <WelcomeRewardResult
            reward={wonReward}
            showConfetti={showConfetti}
            isDarkMode={isDarkMode}
          />
        )}
      </div>
    </div>
  );
}

function WheelReady({ rewards, onSpin, isDarkMode }) {
  return (
    <>
      <div className="text-center mb-8">
        <h2
          className={`${isDarkMode ? "text-green-400" : "text-gray-800"} text-4xl font-bold mb-4`}
        >
          🎰 Welcome Gift Wheel
        </h2>
        <p
          className={`${isDarkMode ? "text-green-300" : "text-gray-600"} text-xl`}
        >
          Spin to discover your special welcome bonus!
        </p>
      </div>

      <div className="relative mb-8">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 z-20">
          <div
            className={`w-8 h-8 clip-triangle shadow-lg ${
              isDarkMode ? "bg-green-700" : "bg-green-500"
            }`}
          />
        </div>

        <div
          className={`w-80 h-80 rounded-full border-8 border-white shadow-2xl relative overflow-hidden ${
            isDarkMode ? "border-gray-700 shadow-black/50" : ""
          }`}
        >
          {rewards.map((reward, index) => {
            const angle = (360 / rewards.length) * index;
            return (
              <div
                key={reward.id}
                className="absolute w-full h-full"
                style={{
                  transform: `rotate(${angle}deg)`,
                  transformOrigin: "50% 50%",
                  clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((angle + 45) * (Math.PI / 180))}% ${
                    50 - 50 * Math.sin((angle + 45) * (Math.PI / 180))
                  }%)`,
                  backgroundColor: reward.color,
                }}
              >
                <div
                  className="absolute text-2xl font-bold text-white"
                  style={{
                    left: "50%",
                    top: "25%",
                    transform: "translateX(-50%) rotate(-90deg)",
                  }}
                >
                  {reward.icon}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Button
        onClick={onSpin}
        className={`bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 animate-pulse ${
          isDarkMode ? "ring-2 ring-green-400" : ""
        }`}
      >
        🎁 Spin for Welcome Gift <ArrowRight className="ml-3 w-6 h-6" />
      </Button>

      <style jsx>{`
        .clip-triangle {
          clip-path: polygon(50% 100%, 0 0, 100% 0);
        }
      `}</style>
    </>
  );
}

function WheelSpinning({ rewards, rotation, isDarkMode }) {
  return (
    <>
      <div className="text-center mb-8">
        <h2
          className={`${isDarkMode ? "text-green-400" : "text-gray-800"} text-4xl font-bold mb-4`}
        >
          🎰 Spinning for Your Welcome Gift...
        </h2>
        <p
          className={`${isDarkMode ? "text-green-300" : "text-gray-600"} text-xl`}
        >
          Good luck! 🍀
        </p>
      </div>

      <div className="relative mb-8">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 z-20">
          <div
            className={`w-8 h-8 clip-triangle shadow-lg ${
              isDarkMode ? "bg-green-700" : "bg-green-500"
            }`}
          />
        </div>

        <div
          className={`w-80 h-80 rounded-full border-8 border-white shadow-2xl relative overflow-hidden ${
            isDarkMode ? "border-gray-700 shadow-black/50" : ""
          }`}
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: "transform 5s cubic-bezier(0.2, 0.8, 0.2, 1)",
          }}
        >
          {rewards.map((reward, index) => {
            const angle = (360 / rewards.length) * index;
            return (
              <div
                key={reward.id}
                className="absolute w-full h-full"
                style={{
                  transform: `rotate(${angle}deg)`,
                  transformOrigin: "50% 50%",
                  clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((angle + 45) * (Math.PI / 180))}% ${
                    50 - 50 * Math.sin((angle + 45) * (Math.PI / 180))
                  }%)`,
                  backgroundColor: reward.color,
                }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

function WelcomeRewardResult({ reward, showConfetti, isDarkMode }) {
  const router = useRouter();

  return (
    <div className="text-center space-y-6">
      <h2
        className={`${isDarkMode ? "text-green-400" : "text-gray-800"} text-4xl font-bold`}
      >
        🎉 You won: {reward?.icon} {reward?.name}
      </h2>
      <p
        className={`${isDarkMode ? "text-green-300" : "text-gray-600"} text-lg`}
      >
        {reward?.description}
      </p>

      <Button
        onClick={() => router.push("/signup")}
        className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold rounded-xl"
      >
        Continue to Sign Up
      </Button>

      {showConfetti && (
        <div className="text-6xl animate-bounce mt-8">🎊🎉🎊</div>
      )}
    </div>
  );
}
