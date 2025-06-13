"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export function RewardWheelSystem({ onComplete }) {
  const [currentView, setCurrentView] = useState("intro");
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonReward, setWonReward] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const rewards = [
    {
      id: 1,
      name: "50% Off Next Course",
      icon: "🎓",
      color: "#10b981",
      rarity: "common",
    },
    {
      id: 2,
      name: "Premium Badge",
      icon: "🏆",
      color: "#059669",
      rarity: "rare",
    },
    {
      id: 3,
      name: "1000 XP Bonus",
      icon: "⚡",
      color: "#047857",
      rarity: "common",
    },
    {
      id: 4,
      name: "Free Certification",
      icon: "📜",
      color: "#065f46",
      rarity: "epic",
    },
    {
      id: 5,
      name: "Mentor Session",
      icon: "👨‍🏫",
      color: "#064e3b",
      rarity: "legendary",
    },
    {
      id: 6,
      name: "Course Bundle",
      icon: "📚",
      color: "#022c22",
      rarity: "rare",
    },
    {
      id: 7,
      name: "Study Credits",
      icon: "💰",
      color: "#15803d",
      rarity: "common",
    },
    {
      id: 8,
      name: "VIP Access",
      icon: "👑",
      color: "#166534",
      rarity: "legendary",
    },
  ];

  const spinWheel = () => {
    setCurrentView("spinning");
    setIsSpinning(true);
    const randomRotation = 1440 + Math.random() * 720;
    setRotation(randomRotation);
    const normalizedRotation = randomRotation % 360;
    const segmentSize = 360 / rewards.length;
    const wonIndex =
      Math.floor((360 - normalizedRotation) / segmentSize) % rewards.length;

    setTimeout(() => {
      setIsSpinning(false);
      setWonReward(rewards[wonIndex]);
      setCurrentView("result");
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }, 5000);
  };

  if (currentView === "intro")
    return <RewardIntro rewards={rewards} onSpin={spinWheel} />;
  if (currentView === "spinning")
    return <SpinningWheel rewards={rewards} rotation={rotation} />;
  return (
    <RewardResult
      reward={wonReward}
      showConfetti={showConfetti}
      onComplete={onComplete}
    />
  );
}

function RewardIntro({ rewards, onSpin }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center justify-center px-4">
      <div className="text-center mb-12">
        <div className="w-24 h-24 mx-auto mb-6 animate-bounce">
          <div className="w-full h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-4xl shadow-xl dark:shadow-green-900">
            🎁
          </div>
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4 dark:from-green-300 dark:to-emerald-300">
          🎉 Course Completion Reward! 🎉
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl">
          Congratulations on completing the{" "}
          <span className="font-bold text-green-600 dark:text-green-300">
            React Mastery Course
          </span>
          ! Spin the wheel to claim your special reward!
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-4xl">
          {rewards.slice(0, 4).map((reward) => (
            <div
              key={reward.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 border border-green-100 dark:border-green-900"
            >
              <div className="text-3xl mb-2">{reward.icon}</div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                {reward.name}
              </p>
              <Badge
                className={`text-xs mt-2 ${
                  reward.rarity === "legendary"
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                    : reward.rarity === "epic"
                      ? "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100"
                      : reward.rarity === "rare"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                        : "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                }`}
              >
                {reward.rarity}
              </Badge>
            </div>
          ))}
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          ...and 4 more amazing rewards!
        </p>
      </div>

      <Button
        onClick={onSpin}
        className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 animate-pulse"
      >
        🎰 Spin the Reward Wheel
        <ArrowRight className="ml-3 w-6 h-6" />
      </Button>
    </div>
  );
}

function SpinningWheel({ rewards, rotation }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center justify-center px-4">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          🎰 Spinning for Your Reward...
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Good luck! 🍀
        </p>
      </div>

      <div className="relative mb-8">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 z-20">
          <div className="w-8 h-8 bg-green-500 clip-triangle shadow-lg dark:shadow-green-900"></div>
        </div>

        <div
          className="w-80 h-80 rounded-full border-8 border-white shadow-2xl relative overflow-hidden dark:border-gray-700"
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

      <div className="flex items-center gap-2 text-lg text-gray-600 dark:text-gray-300">
        <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        Determining your reward...
      </div>

      <style jsx>{`
        .clip-triangle {
          clip-path: polygon(50% 100%, 0 0, 100% 0);
        }
      `}</style>
    </div>
  );
}

function RewardResult({ reward, showConfetti, onComplete }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {showConfetti && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              {
                ["🎉", "🎊", "⭐", "🌟", "✨", "🎈", "🎁"][
                  Math.floor(Math.random() * 7)
                ]
              }
            </div>
          ))}
        </div>
      )}

      <Card className="w-full max-w-2xl shadow-2xl border-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm relative z-20">
        <CardContent className="p-12 text-center">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 animate-bounce">
              <div
                className="w-full h-full rounded-full flex items-center justify-center text-6xl shadow-2xl"
                style={{ backgroundColor: reward.color }}
              >
                {reward.icon}
              </div>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              You Won: {reward.name}
            </h2>
            <Badge className="text-sm capitalize">
              🎖 {reward.rarity} reward
            </Badge>
          </div>
          <Button
            onClick={onComplete}
            className="mt-6 text-white bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
          >
            Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
