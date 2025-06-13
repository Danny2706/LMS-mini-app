"use client";

import { Button } from "@/components/ui/button";

export function PatternPuzzle({ quiz, onAnswer }) {
  const { pattern, options } = quiz.data;

  return (
    <div className="space-y-8">
      <div className="flex justify-center items-center gap-6 p-8 bg-green-50 rounded-xl border border-green-200 dark:bg-green-900 dark:border-green-700">
        {pattern.map((item, index) => (
          <div
            key={index}
            className="text-5xl animate-pulse dark:text-green-400"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            {item}
          </div>
        ))}
        <div className="text-5xl font-bold text-green-400 dark:text-green-500">
          ?
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
        {options.map((option, index) => (
          <Button
            key={index}
            onClick={() => onAnswer(option)}
            variant="outline"
            className="p-8 text-5xl hover:bg-green-50 hover:border-green-300 transition-all duration-200 hover:scale-105 border-2 dark:hover:bg-green-800 dark:hover:border-green-500"
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
}
