"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Target,
  Brain,
  Sparkles,
  ArrowRight,
  Star,
  BookOpen,
} from "lucide-react";

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
        message: "Learning Style Expert! 🎯",
        color: "text-[#006838]",
        badge: "🏆 Complete",
      };
    if (percentage >= 70)
      return {
        message: "Great Self-Awareness! 🌟",
        color: "text-[#8DC63F]",
        badge: "⭐ Insightful",
      };
    if (percentage >= 50)
      return {
        message: "Good Progress! 💡",
        color: "text-[#006838]",
        badge: "💡 Aware",
      };
    return {
      message: "Keep Exploring! 🚀",
      color: "text-[#8DC63F]",
      badge: "🌟 Curious",
    };
  };

  const performance = getPerformanceMessage();

  const getLearningInsights = () => {
    if (!answers) return [];

    const insights = [];
    Object.values(answers).forEach((answer) => {
      switch (answer) {
        case "morning":
          insights.push("🌅 You're most productive in the morning");
          break;
        case "visual":
          insights.push("👀 Visual learning works best for you");
          break;
        case "solo":
          insights.push("🧘 You prefer focused solo study sessions");
          break;
        case "mastery":
          insights.push("🎯 You're driven by achieving expertise");
          break;
        case "slow":
          insights.push("🐌 You learn best with a steady, thorough pace");
          break;
      }
    });
    return insights.slice(0, 3);
  };

  const insights = getLearningInsights();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8DC63F]/10 to-[#006838]/10 flex flex-col items-center justify-center px-4">
      {/* Floating celebration elements */}
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
              ["🎉", "⭐", "🎯", "💡", "🌟", "✨", "🧠"][
                Math.floor(Math.random() * 7)
              ]
            }
          </div>
        ))}
      </div>

      <Card className="w-full max-w-3xl shadow-2xl border-0 bg-white/95 backdrop-blur-sm relative z-10">
        <CardContent className="p-12 text-center">
          {/* Trophy Animation */}
          <div className="mb-8">
            <Target className="w-24 h-24 mx-auto text-[#8DC63F] animate-bounce" />
            <div className="flex justify-center gap-2 mt-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${i < Math.ceil((score / totalQuestions) * 5) ? "text-[#8DC63F] fill-current" : "text-gray-300"} animate-pulse`}
                  style={{ animationDelay: `${i * 200}ms` }}
                />
              ))}
            </div>
          </div>

          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Learning Style Discovered! 🎯
          </h2>
          <p className={`text-2xl font-semibold mb-6 ${performance.color}`}>
            {performance.message}
          </p>

          {/* Score Display */}
          <div className="mb-8">
            <div className="text-6xl font-bold text-[#006838] mb-2">
              {score}/{totalQuestions}
            </div>
            <p className="text-gray-600 text-xl">
              You completed {percentage}% of the learning style assessment!
            </p>
          </div>

          {/* Performance Badge */}
          <div className="mb-8">
            <Badge className="bg-gradient-to-r from-[#8DC63F] to-[#006838] text-white px-6 py-3 text-lg">
              {performance.badge}
            </Badge>
          </div>

          {/* Learning Insights */}
          {insights.length > 0 && (
            <div className="mb-8 p-6 bg-gradient-to-r from-[#8DC63F]/10 to-[#006838]/10 rounded-xl border border-[#8DC63F]/20">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                🧠 Your Learning Profile
              </h3>
              <div className="space-y-2">
                {insights.map((insight, index) => (
                  <p key={index} className="text-gray-700 text-left">
                    {insight}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Achievement Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-[#8DC63F]/10 rounded-lg border border-[#8DC63F]/20">
              <Brain className="w-8 h-8 mx-auto text-[#8DC63F] mb-2" />
              <p className="text-sm text-gray-600">Self-Awareness</p>
              <p className="font-bold text-[#006838]">+{score * 20} XP</p>
            </div>
            <div className="p-4 bg-[#8DC63F]/10 rounded-lg border border-[#8DC63F]/20">
              <BookOpen className="w-8 h-8 mx-auto text-[#006838] mb-2" />
              <p className="text-sm text-gray-600">Learning Insights</p>
              <p className="font-bold text-[#8DC63F]">
                +{insights.length} tips
              </p>
            </div>
            <div className="p-4 bg-[#8DC63F]/10 rounded-lg border border-[#8DC63F]/20">
              <Sparkles className="w-8 h-8 mx-auto text-[#006838] mb-2" />
              <p className="text-sm text-gray-600">Personalization</p>
              <p className="font-bold text-[#8DC63F]">Unlocked</p>
            </div>
          </div>

          <p className="text-gray-600 mb-8 text-lg">
            Excellent work! Now let's explore the courses available for you to
            start your learning journey.
          </p>

          <Button
            onClick={onNavigateToDashboard}
            className="w-full bg-gradient-to-r from-[#8DC63F] to-[#006838] hover:from-[#7AB82F] hover:to-[#005530] text-white py-6 text-xl font-medium rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Explore Available Courses
            <ArrowRight className="ml-3 w-6 h-6" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
