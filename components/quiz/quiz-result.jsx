"use client";

import { CheckCircle2, Sparkles } from "lucide-react";

export function QuizResult({ quiz, selectedAnswer }) {
  const isCorrect =
    JSON.stringify(selectedAnswer) === JSON.stringify(quiz.correct);

  return (
    <div className="text-center">
      <div className="mb-8">
        {isCorrect ? (
          <div className="text-green-500 animate-pulse">
            <CheckCircle2 className="w-24 h-24 mx-auto mb-4" />
            <h3 className="text-4xl font-bold text-green-600 dark:text-green-400">
              Brilliant! 🎉
            </h3>
          </div>
        ) : (
          <div className="text-orange-500">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
              <span className="text-5xl">🤔</span>
            </div>
            <h3 className="text-4xl font-bold text-orange-600 dark:text-orange-400">
              Almost there!
            </h3>
          </div>
        )}
      </div>

      <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
        {quiz.explanation}
      </p>

      <div className="flex items-center justify-center">
        <Sparkles className="w-6 h-6 text-green-500 dark:text-green-400 mr-2 animate-spin" />
        <span className="text-gray-600 dark:text-gray-400 text-lg">
          Loading next puzzle...
        </span>
      </div>
    </div>
  );
}
