"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Gift, Star, Sparkles } from "lucide-react";

export function WelcomeRewardIntro({ onContinue }) {
  const welcomeRewards = [
    {
      id: 1,
      name: "Free Mentor Session",
      icon: "👨‍🏫",
      description: "1-on-1 guidance from expert",
      rarity: "legendary",
    },
    {
      id: 2,
      name: "Premium Course Access",
      icon: "🎓",
      description: "Unlock advanced courses",
      rarity: "epic",
    },
    {
      id: 3,
      name: "1000 XP Bonus",
      icon: "⚡",
      description: "Boost your learning points",
      rarity: "rare",
    },
    {
      id: 4,
      name: "Study Credits",
      icon: "💰",
      description: "$50 learning credits",
      rarity: "common",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-900 dark:via-emerald-900 dark:to-teal-900 flex flex-col items-center justify-center px-4">
      {/* Floating celebration elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            {["🎁", "⭐", "🌟", "✨", "🎉"][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>

      <div className="text-center mb-12 relative z-10">
        <div className="w-24 h-24 mx-auto mb-6 animate-bounce">
          <div className="w-full h-full bg-gradient-to-r from-green-400 to-emerald-500 dark:from-green-600 dark:to-emerald-700 rounded-full flex items-center justify-center text-4xl shadow-xl dark:shadow-green-900 relative">
            🎁
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-8 h-8 text-yellow-400 dark:text-yellow-300 animate-spin" />
            </div>
          </div>
        </div>

        <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent mb-4">
          🎉 Welcome Gift Time! 🎉
        </h1>

        <p className="text-xl text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          Congratulations on completing your brain warm-up and learning style
          quiz!
          <br />
          <span className="font-bold text-green-600 dark:text-green-400">
            You've earned a special welcome gift!
          </span>
        </p>

        <div className="flex justify-center mb-8">
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-700 dark:to-emerald-700 text-white px-6 py-3 text-lg animate-pulse">
            <Gift className="w-5 h-5 mr-2" />
            Welcome Bonus Ready!
          </Badge>
        </div>
      </div>

      {/* Preview of possible rewards */}
      <Card className="w-full max-w-4xl mb-8 shadow-2xl border-0 bg-white/95 dark:bg-gray-900/90 backdrop-blur-sm relative z-10">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
            🎯 What Could You Win?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {welcomeRewards.map((reward) => (
              <div
                key={reward.id}
                className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-800 dark:to-emerald-800 p-4 rounded-xl shadow-md transform hover:scale-105 transition-all duration-300 border border-green-200 dark:border-green-700"
              >
                <div className="text-3xl mb-2 text-center">{reward.icon}</div>
                <h4 className="font-bold text-sm text-gray-800 dark:text-gray-200 mb-1 text-center">
                  {reward.name}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 text-center mb-2">
                  {reward.description}
                </p>
                <Badge
                  className={`text-xs w-full justify-center ${
                    reward.rarity === "legendary"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-300"
                      : reward.rarity === "epic"
                        ? "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-300"
                        : reward.rarity === "rare"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-300"
                          : "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-300"
                  }`}
                >
                  {reward.rarity}
                </Badge>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              ...and many more amazing welcome gifts!
            </p>

            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-6">
              <div className="text-center p-3 bg-green-50 dark:bg-green-800 rounded-lg border border-green-200 dark:border-green-700">
                <Star className="w-6 h-6 mx-auto text-green-500 dark:text-green-400 mb-1" />
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Brain Training
                </p>
                <p className="font-bold text-green-600 dark:text-green-400 text-sm">
                  Complete ✓
                </p>
              </div>
              <div className="text-center p-3 bg-emerald-50 dark:bg-emerald-800 rounded-lg border border-emerald-200 dark:border-emerald-700">
                <Star className="w-6 h-6 mx-auto text-emerald-500 dark:text-emerald-400 mb-1" />
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Learning Style
                </p>
                <p className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                  Complete ✓
                </p>
              </div>
              <div className="text-center p-3 bg-teal-50 dark:bg-teal-800 rounded-lg border border-teal-200 dark:border-teal-700">
                <Gift className="w-6 h-6 mx-auto text-teal-500 dark:text-teal-400 mb-1" />
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Welcome Gift
                </p>
                <p className="font-bold text-teal-600 dark:text-teal-400 text-sm">
                  Ready!
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center relative z-10">
        <Button
          onClick={onContinue}
          className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 dark:from-green-600 dark:via-emerald-600 dark:to-teal-600 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl dark:shadow-black transform hover:scale-105 transition-all duration-300 animate-pulse"
        >
          🎰 Spin for Your Welcome Gift
          <ArrowRight className="ml-3 w-6 h-6" />
        </Button>

        <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">
          Ready to discover your welcome bonus? Let's spin! 🍀
        </p>
      </div>
    </div>
  );
}
