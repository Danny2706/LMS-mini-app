"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Sparkles, Leaf, Lightbulb, BookOpen } from "lucide-react";

export default function WelcomeScreen({ onContinue, progress }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Personalized Courses",
      description: "Tailored to your unique learning style",
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Smart Recommendations",
      description: "Discover content that matches your preferences",
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Progress Tracking",
      description: "Watch your skills grow over time",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8DC63F]/10 via-[#c1e3a0]/5 to-[#006838]/10 dark:from-[#8DC63F]/5 dark:via-[#2a4d3a]/5 dark:to-[#006838]/5 flex flex-col overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 25 }).map((_, i) => {
          const size = Math.random() * 40 + 20;
          const delay = Math.random() * 5;
          return (
            <motion.div
              key={i}
              className="absolute text-[#8DC63F]/30 dark:text-[#006838]/50"
              style={{
                fontSize: `${size}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{
                rotate: Math.random() * 360,
                opacity: 0,
                scale: 0.5,
              }}
              animate={{
                y: [0, Math.random() * 50 - 25, 0],
                rotate: 360,
                opacity: [0.3, 0.5, 0.3],
                transition: {
                  duration: 15 + Math.random() * 15,
                  repeat: Infinity,
                  ease: "linear",
                  delay,
                },
              }}
            >
              {
                ["🌿", "✨", "🌟", "💡", "📚", "🧠", "🚀"][
                  Math.floor(Math.random() * 7)
                ]
              }
            </motion.div>
          );
        })}

        {/* Floating gradient blobs */}
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-[#8DC63F]/20 to-[#006838]/20 blur-3xl -left-32 -top-32"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            transition: {
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-[#8DC63F]/15 to-[#006838]/15 blur-3xl -right-48 bottom-0"
          animate={{
            x: [0, -40, 0],
            y: [0, -40, 0],
            transition: {
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5,
            },
          }}
        />
      </div>

      {/* Progress bar */}
      <div className="w-full px-6 pt-6 z-10">
        <Progress
          value={progress}
          className="h-3 bg-[#8DC63F]/20 dark:bg-[#006838]/30"
          indicatorClassName="bg-gradient-to-r from-[#8DC63F] to-[#006838] transition-all duration-500"
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 z-10">
        <motion.div
          className="relative w-full max-w-2xl aspect-square mb-8"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <LearningPathVisualization isLoaded={isLoaded} />
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <CharacterAvatar />
          </div>
          <FloatingElements />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mb-8 max-w-4xl"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-gray-200 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#8DC63F] to-[#006838]"
            animate={{
              scale: [1, 1.02, 1],
              transition: { duration: 3, repeat: Infinity },
            }}
          >
            Welcome to Your Learning Journey!{" "}
            <motion.span
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              🚀
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-gray-600 dark:text-gray-400 text-xl md:text-2xl mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Let's discover your unique learning style and unlock your potential!
          </motion.p>

          {/* Animated feature highlights */}
          <div className="relative h-40 mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="p-4 bg-[#8DC63F]/20 dark:bg-[#006838]/30 rounded-full"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                >
                  {features[activeFeature].icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-[#006838] dark:text-[#8DC63F]">
                  {features[activeFeature].title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {features[activeFeature].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Animated feature pills */}
          <motion.div
            className="flex justify-center gap-4 mt-6 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            {[
              "Discover your style",
              "Get personalized courses",
              "Track your progress",
              "Learn at your pace",
              "Engage with interactive content",
            ].map((text, i) => (
              <motion.div
                key={i}
                className="px-4 py-2 bg-[#8DC63F]/20 dark:bg-[#006838]/30 rounded-full text-[#006838] dark:text-[#8DC63F] font-medium flex items-center shadow-sm"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  y: [0, -5, 0],
                  transition: {
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.3,
                  },
                }}
              >
                <motion.span
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                >
                  {["🎯", "📚", "📈", "⏱️", "🖥️"][i % 5]}
                </motion.span>
                <span className="ml-2">{text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* CTA Button */}
      <div className="flex justify-center pb-12 z-10 px-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
        >
          <Button
            onClick={onContinue}
            className="relative bg-gradient-to-r from-[#8DC63F] to-[#006838] hover:from-[#7AB82F] hover:to-[#005530] text-white rounded-full px-12 py-6 text-lg md:text-xl font-medium shadow-xl hover:shadow-2xl overflow-hidden transition-all duration-300"
          >
            <motion.span className="relative z-10 flex items-center">
              Discover Your Learning Style
              <motion.div
                animate={{
                  x: isHovering ? [0, 5, 0] : 0,
                  rotate: isHovering ? [0, 20, 0] : 0,
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="ml-2 w-6 h-6" />
              </motion.div>
            </motion.span>

            <AnimatePresence>
              {isHovering && (
                <>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#7AB82F] to-[#005530] opacity-0"
                    initial={{ opacity: 0, x: "-100%" }}
                    animate={{ opacity: 1, x: "0%" }}
                    exit={{ opacity: 0, x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.div
                    className="absolute -inset-2 rounded-full border-2 border-white border-opacity-30"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </>
              )}
            </AnimatePresence>

            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                background: [
                  "radial-gradient(circle at 25% 50%, rgba(255,255,255,0.8) 0%, transparent 40%)",
                  "radial-gradient(circle at 75% 50%, rgba(255,255,255,0.8) 0%, transparent 40%)",
                  "radial-gradient(circle at 50% 25%, rgba(255,255,255,0.8) 0%, transparent 40%)",
                  "radial-gradient(circle at 25% 50%, rgba(255,255,255,0.8) 0%, transparent 40%)",
                ],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />

            {/* Sparkle effect */}
            {isHovering && (
              <motion.div
                className="absolute inset-0 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-white"
                    initial={{
                      x: Math.random() * 100,
                      y: Math.random() * 100,
                      opacity: 0,
                      scale: 0,
                    }}
                    animate={{
                      y: ["100%", "-50%"],
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                      rotate: Math.random() * 360,
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.1,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  >
                    <Sparkles className="w-4 h-4" />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

function LearningPathVisualization({ isLoaded }) {
  const nodes = [
    { id: 1, x: 50, y: 20, completed: true, delay: 0 },
    { id: 2, x: 30, y: 35, completed: true, delay: 200 },
    { id: 3, x: 70, y: 35, completed: true, delay: 400 },
    { id: 4, x: 50, y: 50, completed: false, delay: 600 },
    { id: 5, x: 25, y: 65, completed: false, delay: 800 },
    { id: 6, x: 75, y: 65, completed: false, delay: 1000 },
    { id: 7, x: 50, y: 80, completed: false, delay: 1200 },
  ];

  const connections = [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 3, to: 4 },
    { from: 4, to: 5 },
    { from: 4, to: 6 },
    { from: 5, to: 7 },
    { from: 6, to: 7 },
  ];

  return (
    <div className="absolute inset-0">
      <svg className="w-full h-full">
        {connections.map((connection, index) => {
          const fromNode = nodes.find((n) => n.id === connection.from);
          const toNode = nodes.find((n) => n.id === connection.to);
          if (!fromNode || !toNode) return null;

          return (
            <motion.line
              key={index}
              x1={`${fromNode.x}%`}
              y1={`${fromNode.y}%`}
              x2={`${toNode.x}%`}
              y2={`${toNode.y}%`}
              stroke={
                fromNode.completed && toNode.completed ? "#8DC63F" : "#8DC63F40"
              }
              strokeWidth="3"
              strokeOpacity={0.8}
              strokeDasharray={
                fromNode.completed && toNode.completed ? "0" : "5,5"
              }
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            />
          );
        })}
      </svg>
    </div>
  );
}

function CharacterAvatar() {
  return (
    <motion.div
      className="w-32 h-32 rounded-full bg-gradient-to-br from-[#8DC63F] to-[#006838] flex items-center justify-center shadow-xl"
      animate={{
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <motion.div
        className="text-5xl"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        🧑‍🎓
      </motion.div>
    </motion.div>
  );
}

function FloatingElements() {
  const elements = [
    { id: 1, emoji: "📚", size: "text-2xl", x: 20, y: 30 },
    { id: 2, emoji: "💡", size: "text-3xl", x: 80, y: 25 },
    { id: 3, emoji: "📝", size: "text-xl", x: 15, y: 70 },
    { id: 4, emoji: "🎧", size: "text-2xl", x: 85, y: 75 },
  ];

  return (
    <>
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className={`absolute ${element.size} z-0`}
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: element.id * 0.5,
          }}
        >
          {element.emoji}
        </motion.div>
      ))}
    </>
  );
}
