"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function NavigationHeader({ title, onBack }) {
  return (
    <div className="w-full bg-white/80 backdrop-blur-sm border-b border-green-100 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Button
          onClick={onBack}
          variant="ghost"
          className="text-green-600 hover:text-green-700 hover:bg-green-50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        <div className="w-16" /> {/* Spacer for centering */}
      </div>
    </div>
  );
}
