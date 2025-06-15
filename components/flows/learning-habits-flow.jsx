"use client";

import { useState } from "react";
import { LearningHabitsQuiz } from "@/components/learning-habit/learning-habits-quiz"
import { CompletionScreen } from "@/components/completion/completion-screen";
import { NavigationHeader } from "@/components/ui/navigation-header";
import { learningHabitsQuestions } from "@/data/learning-habit-data"

export function LearningHabitsFlow({ onComplete, onBack }) {
  const [currentStep, setCurrentStep] = useState("quiz");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [progress, setProgress] = useState(10);

  const handleAnswerSelect = (questionId, answer) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestionIndex < learningHabitsQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setProgress(
          ((currentQuestionIndex + 2) / learningHabitsQuestions.length) * 100
        );
      } else {
        setCurrentStep("completed");
        setProgress(100);
      }
    }, 1500);
  };

  if (currentStep === "quiz") {
    return (
      <div>
        <NavigationHeader title="Learning Style Discovery" onBack={onBack} />
        <LearningHabitsQuiz
          question={learningHabitsQuestions[currentQuestionIndex]}
          onAnswerSelect={handleAnswerSelect}
          progress={progress}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={learningHabitsQuestions.length}
          selectedAnswer={
            answers[learningHabitsQuestions[currentQuestionIndex]?.id]
          }
        />
      </div>
    );
  }

  return (
    <div>
      <NavigationHeader title="Learning Style Discovered!" onBack={onBack} />
      <CompletionScreen
        score={Object.keys(answers).length}
        totalQuestions={learningHabitsQuestions.length}
        onNavigateToDashboard={onComplete}
        type="habits"
        answers={answers}
      />
    </div>
  );
}
