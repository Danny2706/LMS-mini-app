"use client";

import { Button } from "@/components/ui/button";

export function MathPuzzle({ quiz, onAnswer }) {
  const { equation, options } = quiz.data;

  return (
    <div className="space-y-8">
      <div className="p-10 bg-green-50 rounded-xl border border-green-200 dark:bg-green-900 dark:border-green-700">
        <div className="text-7xl font-bold text-center text-green-600 dark:text-green-400 mb-4">
          {equation}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
        {options.map((option, index) => (
          <Button
            key={index}
            onClick={() => onAnswer(option)}
            variant="outline"
            className="p-8 text-4xl font-bold hover:bg-green-50 hover:border-green-300 transition-all duration-200 hover:scale-105 border-2 dark:hover:bg-green-800 dark:hover:border-green-500"
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
}
