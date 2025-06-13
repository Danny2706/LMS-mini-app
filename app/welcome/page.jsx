"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpen, Users, Brain, Gift } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Import flow components (keeping your original imports)
import { WelcomeFlow } from "@/components/flows/welcome-flow";
import { LearningHabitsFlow } from "@/components/flows/learning-habits-flow";
import { WelcomeRewardFlow } from "@/components/flows/welcome-reward-flow";
import { CourseCompletionFlow } from "@/components/flows/course-completion-flow";

export default function HomePage() {
  const [currentView, setCurrentView] = useState("home");
  const [isStarting, setIsStarting] = useState(false);

  const navigationItems = [
    {
      id: "welcome",
      title: "Welcome Experience",
      description: "Brain warm-up puzzles and onboarding",
      icon: <Brain className="w-12 h-12 mx-auto text-green-500 mb-4" />,
      color: "hover:border-green-300",
      emoji: "🧠",
      bgEmoji: "🤔💡",
    },
    {
      id: "learning-habits",
      title: "Learning Habits Quiz",
      description: "Fun questions about your learning style",
      icon: <BookOpen className="w-12 h-12 mx-auto text-green-600 mb-4" />,
      color: "hover:border-green-400",
      emoji: "📚",
      bgEmoji: "✏️📝",
    },
    {
      id: "welcome-reward",
      title: "Welcome Gift Wheel",
      description: "Spin for your special welcome bonus",
      icon: <Gift className="w-12 h-12 mx-auto text-green-700 mb-4" />,
      color: "hover:border-green-500",
      emoji: "🎁",
      bgEmoji: "🎯🏆",
    },
    {
      id: "dashboard",
      title: "Learning Dashboard",
      description: "Complete learning management interface",
      icon: <Users className="w-12 h-12 mx-auto text-green-800 mb-4" />,
      color: "hover:border-green-600",
      emoji: "📊",
      bgEmoji: "📈✅",
    },
  ];

  const startJourney = () => {
    setIsStarting(true);
    setTimeout(() => {
      setCurrentView("welcome");
      setIsStarting(false);
    }, 800);
  };

  if (currentView !== "home") {
    return (
      <div className="min-h-screen">
        <AppRouter currentView={currentView} onNavigate={setCurrentView} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex flex-col items-center justify-center px-4 py-8 overflow-hidden">
      {/* Animated header section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 md:mb-12"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg relative"
        >
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="text-3xl z-10"
          >
            🌱
          </motion.span>
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-green-400 border-opacity-50"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
          GreenPill LMS
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-6 md:mb-8">
          Grow Your Knowledge Naturally
        </p>
      </motion.div>

      {/* Non-clickable animated cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl w-full mb-6 md:mb-8">
        {navigationItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{
              y: -5,
              transition: { type: "spring", stiffness: 300 },
            }}
          >
            <Card
              className={`border-2 border-transparent ${item.color} relative overflow-hidden transition-all duration-300 cursor-default`}
            >
              <CardContent className="p-4 md:p-6 text-center relative z-10">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 3 + index,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="text-4xl mb-3"
                >
                  {item.emoji}
                </motion.div>
                {item.icon}
                <h3 className="font-bold text-md md:text-lg mb-2 text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </CardContent>
              <motion.div
                className="absolute inset-0 opacity-5 text-5xl flex items-center justify-center"
                animate={{
                  opacity: [0.03, 0.08, 0.03],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 8 + index,
                  repeat: Infinity,
                }}
              >
                {item.bgEmoji}
              </motion.div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Loading overlay */}
      <AnimatePresence>
        {isStarting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 1.2 }}
              className="bg-white p-8 rounded-xl shadow-2xl text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="text-5xl mb-4"
              >
                🌟
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">
                Starting Your Journey
              </h3>
              <p className="text-gray-600">
                Preparing your learning experience...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Start Journey Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          onClick={startJourney}
          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 md:px-8 md:py-4 text-md md:text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
          disabled={isStarting}
        >
          <motion.span
            className="relative z-10 flex items-center"
            animate={isStarting ? { opacity: 0 } : { opacity: 1 }}
          >
            Start Learning Journey
            <motion.span
              animate={{
                x: [0, 5, 0],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                },
              }}
            >
              <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
            </motion.span>
          </motion.span>
          {isStarting && (
            <motion.span
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="text-xl"
              >
                ⏳
              </motion.div>
            </motion.span>
          )}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ x: "-100%" }}
            whileHover={{ x: "0%" }}
            transition={{ duration: 0.5 }}
          />
        </Button>
      </motion.div>

      {/* Floating animated emojis */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {["🌿", "📖", "🎯", "🏆", "🌱", "🧩", "💡", "✏️", "📝", "🎓"].map(
          (emoji, index) => (
            <motion.div
              key={index}
              initial={{
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
                opacity: 0.1,
                rotate: Math.random() * 360,
                scale: 0.8 + Math.random() * 0.4,
              }}
              animate={{
                y: [0, Math.random() * 40 - 20, 0],
                x: [0, Math.random() * 40 - 20, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 15 + Math.random() * 30,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              }}
              className="absolute text-2xl md:text-4xl"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
              }}
            >
              {emoji}
            </motion.div>
          )
        )}
      </div>
    </div>
  );
}

// Your original AppRouter component with all flow imports
function AppRouter({ currentView, onNavigate }) {
  const handleComplete = (nextView) => {
    onNavigate(nextView || "home");
  };

  switch (currentView) {
    case "welcome":
      return (
        <WelcomeFlow
          onComplete={() => handleComplete("learning-habits")}
          onBack={() => handleComplete("home")}
        />
      );
    case "learning-habits":
      return (
        <LearningHabitsFlow
          onComplete={() => handleComplete("welcome-reward")}
          onBack={() => handleComplete("welcome")}
        />
      );
    case "welcome-reward":
      return (
        <WelcomeRewardFlow
          onComplete={() => handleComplete("dashboard")}
          onBack={() => handleComplete("learning-habits")}
        />
      );
    case "course-completion":
      return (
        <CourseCompletionFlow
          onComplete={() => handleComplete("dashboard")}
          onBack={() => handleComplete("learning-habits")}
        />
      );
    default:
      return null;
  }
}
