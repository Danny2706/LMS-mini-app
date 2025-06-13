"use client";

import { Button } from "@/components/ui/button";

export function SequencePuzzle({ quiz, onAnswer }) {
  const { sequence, options } = quiz.data;

  return (
    <div className="space-y-8">
      <div className="flex justify-center items-center gap-4 p-8 bg-green-50 rounded-xl border border-green-200 dark:bg-green-900 dark:border-green-700">
        {sequence.map((num, index) => (
          <div
            key={index}
            className="w-20 h-20 bg-green-500 text-white rounded-lg flex items-center justify-center text-3xl font-bold shadow-lg animate-pulse border-2 border-green-400 dark:bg-green-700 dark:border-green-600"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            {num}
          </div>
        ))}
        <div className="w-20 h-20 bg-green-100 rounded-lg flex items-center justify-center text-3xl font-bold border-2 border-dashed border-green-400 dark:bg-green-800">
          ?
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
