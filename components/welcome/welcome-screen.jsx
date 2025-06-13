"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function WelcomeScreen({ onContinue, progress }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-900 dark:via-emerald-900 dark:to-teal-900 flex flex-col overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-200 dark:text-green-800 text-4xl"
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              rotate: Math.random() * 360,
              opacity: 0.3,
            }}
            animate={{
              y: [0, Math.random() * 30 - 15, 0],
              rotate: 360,
              transition: {
                duration: 15 + Math.random() * 15,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {["🌿", "✨", "🌟", "💡", "📚"][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="w-full px-6 pt-6 z-10">
        <Progress
          value={progress}
          className="h-3 bg-green-100 dark:bg-green-800"
          indicatorClassName="bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-400 dark:to-emerald-400 transition-all duration-500"
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 z-10">
        <motion.div
          className="relative w-full max-w-2xl aspect-square"
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
          className="text-center mb-8"
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-200 mb-4"
            animate={{
              scale: [1, 1.02, 1],
              transition: { duration: 3, repeat: Infinity },
            }}
          >
            Welcome to your learning adventure!{" "}
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              🚀
            </motion.span>
          </motion.h1>
          <motion.p
            className="text-gray-600 dark:text-gray-400 text-xl mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Let's warm up your brain with some fun puzzles!
          </motion.p>
          <motion.div
            className="flex justify-center gap-4 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            {["Complete challenges", "Earn rewards", "Level up skills"].map(
              (text, i) => (
                <motion.div
                  key={i}
                  className="px-4 py-2 bg-green-100 dark:bg-green-900 rounded-full text-green-600 dark:text-green-400 font-medium flex items-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  >
                    {["🎯", "🏆", "📈"][i]}
                  </motion.span>
                  <span className="ml-2">{text}</span>
                </motion.div>
              )
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Continue button */}
      <div className="flex justify-center pb-12 z-10">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
        >
          <Button
            onClick={onContinue}
            className="relative bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 dark:from-green-600 dark:to-emerald-600 dark:hover:from-green-700 dark:hover:to-emerald-700 text-white rounded-full px-12 py-6 text-xl font-medium shadow-2xl overflow-hidden"
          >
            <motion.span className="relative z-10 flex items-center">
              Start Brain Challenge
              <motion.div
                animate={{ x: isHovering ? [0, 5, 0] : 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="ml-2 w-6 h-6" />
              </motion.div>
            </motion.span>

            <AnimatePresence>
              {isHovering && (
                <>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 opacity-0"
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
                fromNode.completed && toNode.completed ? "#10b981" : "#d1fae5"
              }
              strokeWidth="3"
              strokeOpacity={0.8}
              className="transition-all duration-1000 dark:stroke-green-400 dark:stroke-opacity-60"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: index * 0.1 }}
            />
          );
        })}
      </svg>

      {nodes.map((node) => (
        <motion.div
          key={node.id}
          className={`absolute w-8 h-8 rounded-full transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center ${
            node.completed
              ? "bg-green-500 shadow-lg shadow-green-200 dark:bg-green-400 dark:shadow-green-700"
              : "bg-green-200 border-2 border-green-300 dark:bg-green-900 dark:border-green-700"
          }`}
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: node.delay / 1000,
            duration: 0.5,
            type: "spring",
          }}
          whileHover={{ scale: 1.2 }}
        >
          {node.completed && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white border-opacity-50"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.8, 0, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          )}
          <motion.span
            animate={{
              scale: node.completed ? [1, 1.1, 1] : 1,
              transition: { duration: 2, repeat: Infinity },
            }}
          >
            {node.completed ? "✓" : node.id}
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
}

function CharacterAvatar() {
  return (
    <motion.div
      className="relative"
      animate={{
        y: [0, -10, 0],
        transition: { duration: 3, repeat: Infinity },
      }}
    >
      <motion.div
        className="absolute inset-0 bg-green-200 rounded-full filter blur-xl opacity-40 dark:bg-green-800"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="relative z-10 w-32 h-32 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center shadow-xl dark:from-green-700 dark:to-emerald-700"
        whileHover={{ scale: 1.1 }}
      >
        <motion.span
          className="text-5xl"
          animate={{
            rotate: [0, 10, -10, 0],
            y: [0, -10, 0],
            transition: { duration: 4, repeat: Infinity },
          }}
        >
          🎓
        </motion.span>
        <motion.div
          className="absolute -inset-2 rounded-full border-4 border-green-300 border-opacity-50 pointer-events-none"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );
}

function FloatingElements() {
  const elements = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 4 + Math.random() * 3,
    emoji: ["✨", "🌟", "💡", "🎯", "🚀", "🧠", "📚", "🏆"][
      Math.floor(Math.random() * 8)
    ],
    size: 0.5 + Math.random() * 1.5,
  }));

  return (
    <>
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute text-xl opacity-80"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            fontSize: `${element.size}rem`,
          }}
          animate={{
            y: [0, -20, 0, 20, 0],
            x: [0, 10, 0, -10, 0],
            rotate: [0, 180, 360],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {element.emoji}
        </motion.div>
      ))}
    </>
  );
}
