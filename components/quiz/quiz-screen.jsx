"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain } from "lucide-react";
import { PatternPuzzle } from "./puzzle-types/pattern-puzzle";
import { ColorPuzzle } from "./puzzle-types/color-puzzle";
import { MathPuzzle } from "./puzzle-types/math-puzzle";
import { SequencePuzzle } from "./puzzle-types/sequence-puzzle";
import { VisualPuzzle } from "./puzzle-types/visual-puzzle";
import { QuizResult } from "./quiz-result";

export function QuizScreen({
  quiz,
  onAnswerSelect,
  selectedAnswer,
  showResult,
  progress,
  questionNumber,
  totalQuestions,
}) {
  const getGradient = (type) => {
    switch (type) {
      case "pattern":
        return "from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900";
      case "color":
        return "from-emerald-50 to-teal-50 dark:from-emerald-900 dark:to-teal-900";
      case "math":
        return "from-teal-50 to-green-50 dark:from-teal-900 dark:to-green-900";
      case "sequence":
        return "from-green-50 to-lime-50 dark:from-green-900 dark:to-lime-900";
      case "visual":
        return "from-lime-50 to-green-50 dark:from-lime-900 dark:to-green-900";
      default:
        return "from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900";
    }
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${getGradient(quiz.type)} flex flex-col dark:text-gray-200`}
    >
      {/* Progress bar */}
      <div className="w-full px-6 pt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            Puzzle {questionNumber} of {totalQuestions}
          </span>
          <Badge
            variant="outline"
            className="bg-white border-green-200 dark:bg-gray-800 dark:border-green-700"
          >
            <Brain className="w-4 h-4 mr-1 text-green-600 dark:text-green-400" />
            <span className="capitalize text-green-700 dark:text-green-300">
              {quiz.type} Puzzle
            </span>
          </Badge>
        </div>
        <Progress
          value={progress}
          className="h-3 bg-green-100 dark:bg-green-900"
          indicatorClassName="bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-400 dark:to-emerald-400 transition-all duration-500"
        />
      </div>

      {/* Quiz content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <Card className="w-full max-w-4xl shadow-2xl border-0 bg-white/95 backdrop-blur-sm dark:bg-gray-900/95">
          <CardContent className="p-8">
            {!showResult ? (
              <div className="text-center">
                <div className="text-7xl mb-6 animate-bounce">{quiz.emoji}</div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                  {quiz.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8 text-xl">
                  {quiz.instruction}
                </p>

                {/* Render different quiz types */}
                {quiz.type === "pattern" && (
                  <PatternPuzzle quiz={quiz} onAnswer={onAnswerSelect} />
                )}
                {quiz.type === "color" && (
                  <ColorPuzzle quiz={quiz} onAnswer={onAnswerSelect} />
                )}
                {quiz.type === "math" && (
                  <MathPuzzle quiz={quiz} onAnswer={onAnswerSelect} />
                )}
                {quiz.type === "sequence" && (
                  <SequencePuzzle quiz={quiz} onAnswer={onAnswerSelect} />
                )}
                {quiz.type === "visual" && (
                  <VisualPuzzle quiz={quiz} onAnswer={onAnswerSelect} />
                )}
              </div>
            ) : (
              <QuizResult quiz={quiz} selectedAnswer={selectedAnswer} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
