"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  Sparkles,
  Rocket,
  Target,
  BookOpen,
  ArrowRight,
  Crown,
  Gift,
} from "lucide-react";

export function CourseCompletionCelebration({
  onContinue,
  courseName,
  userName,
}) {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [showConfetti, setShowConfetti] = useState(true);

  const inspiringQuotes = [
    {
      text: "The expert in anything was once a beginner who refused to give up.",
      author: "Helen Hayes",
      icon: "🚀",
    },
    {
      text: "Learning never exhausts the mind.",
      author: "Leonardo da Vinci",
      icon: "🧠",
    },
    {
      text: "The future belongs to those who learn more skills.",
      author: "Future You",
      icon: "⭐",
    },
  ];

  const achievements = [
    {
      title: "Course Completed!",
      description: "You've mastered all the concepts",
      icon: <BookOpen className="w-6 h-6" />,
      color: "bg-green-500",
      delay: 0,
    },
    {
      title: "Knowledge Gained",
      description: "New skills added to your toolkit",
      icon: <Target className="w-6 h-6" />,
      color: "bg-emerald-500",
      delay: 500,
    },
    {
      title: "Achievement Unlocked",
      description: "React Master certification earned",
      icon: <Trophy className="w-6 h-6" />,
      color: "bg-teal-500",
      delay: 1000,
    },
    {
      title: "Ready for More",
      description: "Your learning journey continues",
      icon: <Rocket className="w-6 h-6" />,
      color: "bg-green-600",
      delay: 1500,
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const quoteTimer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % inspiringQuotes.length);
    }, 4000);
    return () => clearInterval(quoteTimer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center justify-center px-4 relative overflow-hidden text-gray-900 dark:text-white transition-colors duration-500">
      {/* Animated Confetti */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {showConfetti &&
          Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              {
                ["🎉", "🎊", "⭐", "🌟", "✨", "🎈", "🏆"][
                  Math.floor(Math.random() * 7)
                ]
              }
            </div>
          ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="mb-6 relative">
            <Crown className="w-20 h-20 mx-auto text-green-500 dark:text-emerald-400 animate-bounce" />
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-8 h-8 text-emerald-500 animate-spin" />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent dark:from-emerald-400 dark:via-teal-400 dark:to-green-400 mb-4 animate-fade-in">
            🎉 Congratulations, {userName}! 🎉
          </h1>

          <p className="text-2xl text-gray-700 dark:text-gray-300 mb-6 animate-slide-up">
            You've successfully completed{" "}
            <span className="font-bold text-green-600 dark:text-emerald-400">
              {courseName}
            </span>
          </p>

          <div className="flex justify-center mb-8">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white dark:from-emerald-600 dark:to-green-500 px-6 py-3 text-lg animate-pulse">
              <Gift className="w-5 h-5 mr-2" />
              Course Complete!
            </Badge>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {achievements.map((achievement, index) => (
            <Card
              key={index}
              className="transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl animate-slide-in border border-green-200 dark:border-emerald-700 bg-white dark:bg-gray-800"
              style={{ animationDelay: `${achievement.delay}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div
                    className={`${achievement.color} text-white p-3 rounded-full`}
                  >
                    {achievement.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 dark:text-white">
                      {achievement.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quote Card */}
        <Card className="mb-12 bg-gradient-to-r from-green-500 to-emerald-500 dark:from-emerald-600 dark:to-teal-600 text-white shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="text-4xl mb-4 animate-bounce">
              {inspiringQuotes[currentQuote].icon}
            </div>
            <blockquote className="text-xl md:text-2xl font-medium mb-4 italic">
              "{inspiringQuotes[currentQuote].text}"
            </blockquote>
            <p className="text-green-100 dark:text-green-200">
              — {inspiringQuotes[currentQuote].author}
            </p>
          </CardContent>
        </Card>

        {/* Button CTA */}
        <div className="text-center">
          <Button
            onClick={onContinue}
            className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 animate-pulse"
          >
            <Rocket className="mr-3 w-6 h-6" />
            Claim Your Reward
            <ArrowRight className="ml-3 w-6 h-6" />
          </Button>

          <p className="mt-4 text-gray-600 dark:text-gray-300">
            You've earned something special! Let's see what you've won! 🎁
          </p>
        </div>
      </div>
    </div>
  );
}
