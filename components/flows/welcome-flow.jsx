"use client";

import { useState } from "react";
import { WelcomeScreen } from "@/components/welcome/welcome-screen";
import { QuizScreen } from "@/components/quiz/quiz-screen";
import { CompletionScreen } from "@/components/complation/completion-screen";
import { puzzleQuizzes } from "@/data/quiz-data";
import { NavigationHeader } from "@/components/ui/navigation-header";

export function WelcomeFlow({ onComplete, onBack }) {
  const [currentStep, setCurrentStep] = useState("welcome");
  const [progress, setProgress] = useState(10);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setShowResult(true);

    const isCorrect =
      JSON.stringify(answer) ===
      JSON.stringify(puzzleQuizzes[currentQuizIndex].correct);
    if (isCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuizIndex < puzzleQuizzes.length - 1) {
        setCurrentQuizIndex(currentQuizIndex + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setProgress(progress + 18);
      } else {
        setCurrentStep("completed");
        setProgress(100);
      }
    }, 2500);
  };

  if (currentStep === "welcome") {
    return (
      <div>
        <NavigationHeader title="Brain Warm-up" onBack={onBack} />
        <WelcomeScreen
          onContinue={() => setCurrentStep("quiz")}
          progress={progress}
        />
      </div>
    );
  }

  if (currentStep === "quiz") {
    return (
      <div>
        <NavigationHeader title="Puzzle Challenge" onBack={onBack} />
        <QuizScreen
          quiz={puzzleQuizzes[currentQuizIndex]}
          onAnswerSelect={handleAnswerSelect}
          selectedAnswer={selectedAnswer}
          showResult={showResult}
          progress={progress}
          questionNumber={currentQuizIndex + 1}
          totalQuestions={puzzleQuizzes.length}
        />
      </div>
    );
  }

  return (
    <div>
      <NavigationHeader title="Challenge Complete" onBack={onBack} />
      <CompletionScreen
        score={score}
        totalQuestions={puzzleQuizzes.length}
        onNavigateToDashboard={onComplete}
        type="puzzle"
      />
    </div>
  );
}
