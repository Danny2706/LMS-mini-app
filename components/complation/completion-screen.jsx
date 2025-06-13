"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Zap, Brain, Sparkles, ArrowRight, Star } from "lucide-react";

export function CompletionScreen({
  score,
  totalQuestions,
  onNavigateToDashboard,
  type,
  answers,
}) {
  const percentage = Math.round((score / totalQuestions) * 100);

  const getPerformanceMessage = () => {
    if (percentage >= 90)
      return {
        message: "Puzzle Master! 🧩",
        color: "text-green-600 dark:text-green-400",
        badge: "🏆 Genius",
      };
    if (percentage >= 70)
      return {
        message: "Great Problem Solver! 🎯",
        color: "text-emerald-600 dark:text-emerald-400",
        badge: "⭐ Smart",
      };
    if (percentage >= 50)
      return {
        message: "Good Thinking! 🤔",
        color: "text-teal-600 dark:text-teal-400",
        badge: "💡 Clever",
      };
    return {
      message: "Keep Practicing! 💪",
      color: "text-green-600 dark:text-green-400",
      badge: "🌟 Learner",
    };
  };

  const performance = getPerformanceMessage();

  const getTitle = () => {
    switch (type) {
      case "puzzle":
        return "Puzzle Challenge Complete! 🎊";
      case "habits":
        return "Learning Style Discovered! 🎯";
      default:
        return "Challenge Complete! 🎉";
    }
  };

  const getDescription = () => {
    switch (type) {
      case "puzzle":
        return "Your brain is warmed up and ready! Time to explore your learning style.";
      case "habits":
        return "Now we know how you learn best! Ready for the next adventure?";
      default:
        return "Great job completing this challenge!";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
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
            {
              ["🎉", "⭐", "🎯", "🧩", "💡", "🌟", "✨"][
                Math.floor(Math.random() * 7)
              ]
            }
          </div>
        ))}
      </div>

      <Card className="w-full max-w-2xl shadow-2xl border-0 bg-white/95 dark:bg-gray-900/90 backdrop-blur-sm relative z-10">
        <CardContent className="p-12 text-center">
          <div className="mb-8">
            <Trophy className="w-24 h-24 mx-auto text-green-500 dark:text-green-400 animate-bounce" />
            <div className="flex justify-center gap-2 mt-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${i < Math.ceil((score / totalQuestions) * 5) ? "text-green-400 dark:text-green-300 fill-current" : "text-gray-300 dark:text-gray-600"} animate-pulse`}
                  style={{ animationDelay: `${i * 200}ms` }}
                />
              ))}
            </div>
          </div>

          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            {getTitle()}
          </h2>
          <p className={`text-2xl font-semibold mb-6 ${performance.color}`}>
            {performance.message}
          </p>

          <div className="mb-8">
            <div className="text-6xl font-bold text-green-600 dark:text-green-400 mb-2">
              {score}/{totalQuestions}
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-xl">
              {type === "puzzle"
                ? `You solved ${percentage}% of the puzzles!`
                : `You completed ${percentage}% of the questions!`}
            </p>
          </div>

          <div className="mb-8">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 text-white px-6 py-3 text-lg">
              {performance.badge}
            </Badge>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg border border-green-200 dark:border-green-600">
              <Brain className="w-8 h-8 mx-auto text-green-500 mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Brain Power
              </p>
              <p className="font-bold text-green-600 dark:text-green-400">
                +{score * 10} XP
              </p>
            </div>
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900 rounded-lg border border-emerald-200 dark:border-emerald-600">
              <Zap className="w-8 h-8 mx-auto text-emerald-500 mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Speed Bonus
              </p>
              <p className="font-bold text-emerald-600 dark:text-emerald-400">
                +{score * 5} pts
              </p>
            </div>
            <div className="p-4 bg-teal-50 dark:bg-teal-900 rounded-lg border border-teal-200 dark:border-teal-600">
              <Sparkles className="w-8 h-8 mx-auto text-teal-500 mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-300">Streak</p>
              <p className="font-bold text-teal-600 dark:text-teal-400">
                {score} in a row
              </p>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
            {getDescription()}
          </p>

          <Button
            onClick={onNavigateToDashboard}
            className="w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 dark:from-green-600 dark:via-emerald-600 dark:to-teal-600 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white py-6 text-xl font-medium rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Continue Journey
            <ArrowRight className="ml-3 w-6 h-6" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
