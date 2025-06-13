"use client";

import { useState } from "react";
import { WelcomeRewardIntro } from "@/components/welcome-reward/welcome-reward-intro";
import { WelcomeRewardWheel } from "@/components/welcome-reward/welcome-reward-wheel";
import { NavigationHeader } from "@/components/ui/navigation-header";

export function WelcomeRewardFlow({ onComplete, onBack }) {
  const [currentStep, setCurrentStep] = useState("intro");

  if (currentStep === "intro") {
    return (
      <div>
        <NavigationHeader title="Welcome Gift!" onBack={onBack} />
        <WelcomeRewardIntro onContinue={() => setCurrentStep("wheel")} />
      </div>
    );
  }

  return (
    <div>
      <NavigationHeader title="Spin for Your Welcome Gift" onBack={onBack} />
      <WelcomeRewardWheel onComplete={onComplete} />
    </div>
  );
}
