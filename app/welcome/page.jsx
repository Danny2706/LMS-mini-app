"use client";

import { useState } from "react";
import  WelcomeScreen  from "@/components/welcome/welcome-screen";
import { LearningHabitsFlow } from "@/components/flows/learning-habits-flow";
import  CoursesPage from "@/components/courses/courses-page";

export default function HomePage() {
  const [currentView, setCurrentView] = useState("welcome");

  const handleComplete = (nextView) => {
    setCurrentView(nextView || "welcome");
  };

  switch (currentView) {
    case "welcome":
      return (
        <WelcomeScreen
          onContinue={() => handleComplete("learning-habits")}
          progress={10}
        />
      );
    case "learning-habits":
      return (
        <LearningHabitsFlow
          onComplete={() => handleComplete("courses")}
          onBack={() => handleComplete("welcome")}
        />
      );
    case "courses":
      return <CoursesPage onBack={() => handleComplete("learning-habits")} />;
    default:
      return (
        <WelcomeScreen
          onContinue={() => handleComplete("learning-habits")}
          progress={10}
        />
      );
  }
}
