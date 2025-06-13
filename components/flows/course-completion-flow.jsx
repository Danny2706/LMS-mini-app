"use client";

import { useState } from "react";
import { CourseCompletionCelebration } from "@/components/course-completion/celebration";
import { RewardWheelSystem } from "@/components/rewards/reward-wheel";
import { NavigationHeader } from "@/components/ui/navigation-header";

export function CourseCompletionFlow({ onComplete, onBack }) {
  const [currentStep, setCurrentStep] = useState("celebration");

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      {currentStep === "celebration" ? (
        <>
          <NavigationHeader title="Course Complete!" onBack={onBack} />
          <CourseCompletionCelebration
            onContinue={() => setCurrentStep("rewards")}
            courseName="React Mastery Course"
            userName="Alex"
          />
        </>
      ) : (
        <>
          <NavigationHeader title="Claim Your Reward" onBack={onBack} />
          <RewardWheelSystem onComplete={onComplete} />
        </>
      )}
    </div>
  );
}
