"use client";

import { Button } from "@/components/ui/button";

export function ColorPuzzle({ quiz, onAnswer }) {
  const { colors, options } = quiz.data;

  return (
    <div className="space-y-8">
      <div className="flex justify-center items-center gap-3 p-8 bg-green-50 rounded-xl border border-green-200 dark:bg-green-900 dark:border-green-700">
        {colors.map((color, index) => (
          <div
            key={index}
            className="w-20 h-20 rounded-full border-4 border-white shadow-lg transition-transform hover:scale-110"
            style={{
              backgroundColor: color,
              animationDelay: `${index * 100}ms`,
            }}
          />
        ))}
        <div className="w-20 h-20 rounded-full border-4 border-dashed border-green-300 flex items-center justify-center bg-white dark:bg-gray-800">
          <span className="text-3xl text-green-500 dark:text-green-400">?</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
        {options.map((color, index) => (
          <Button
            key={index}
            onClick={() => onAnswer(color)}
            variant="outline"
            className="p-6 hover:scale-105 transition-all duration-200 border-2 hover:border-green-300 dark:hover:border-green-500"
            style={{ backgroundColor: color }}
          >
            <div className="w-10 h-10 rounded-full bg-white/30 border-2 border-white/50 dark:bg-gray-700 dark:border-gray-600" />
          </Button>
        ))}
      </div>
    </div>
  );
}
