"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Users, Target } from "lucide-react";

export function LearningHabitsQuiz({
  question,
  onAnswerSelect,
  progress,
  questionNumber,
  totalQuestions,
  selectedAnswer,
}) {
  const getIcon = (type) => {
    switch (type) {
      case "time":
        return <Clock className="w-6 h-6" />;
      case "style":
        return <BookOpen className="w-6 h-6" />;
      case "social":
        return <Users className="w-6 h-6" />;
      case "goal":
        return <Target className="w-6 h-6" />;
      default:
        return <BookOpen className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-950 dark:to-black flex flex-col transition-colors duration-300">
      {/* Progress bar */}
      <div className="w-full px-6 pt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
            Question {questionNumber} of {totalQuestions}
          </span>
          <Badge
            variant="outline"
            className="bg-white dark:bg-gray-800 border-green-200 dark:border-green-700"
          >
            {getIcon(question.type)}
            <span className="ml-1 capitalize text-green-700 dark:text-green-400">
              {question.category}
            </span>
          </Badge>
        </div>
        <Progress
          value={progress}
          className="h-3 bg-green-100 dark:bg-gray-700"
          indicatorClassName="bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
        />
      </div>

      {/* Question content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <Card className="w-full max-w-4xl shadow-2xl border-0 bg-white/95 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-6 animate-bounce">
                {question.emoji}
              </div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                {question.question}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                {question.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => onAnswerSelect(question.id, option.value)}
                  variant="outline"
                  className={`p-6 h-auto text-left transition-all duration-200 hover:scale-105 hover:bg-green-50 dark:hover:bg-green-900 hover:border-green-300 dark:hover:border-green-500 ${
                    selectedAnswer === option.value
                      ? "bg-green-100 dark:bg-green-800 border-green-400 dark:border-green-500"
                      : ""
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">{option.emoji}</div>
                    <div>
                      <div className="font-semibold text-gray-800 dark:text-white mb-1">
                        {option.text}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {option.description}
                      </div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
