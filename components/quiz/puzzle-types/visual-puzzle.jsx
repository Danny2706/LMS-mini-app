"use client";

import { Button } from "@/components/ui/button";

export function VisualPuzzle({ quiz, onAnswer }) {
  const { shapes, options } = quiz.data;

  return (
    <div className="space-y-8">
      <div className="flex justify-center items-center gap-6 p-8 bg-green-50 rounded-xl border border-green-200 dark:bg-green-900 dark:border-green-700">
        {shapes.map((shape, index) => (
          <div
            key={index}
            className="animate-bounce"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <ShapeRenderer shape={shape} size="large" />
          </div>
        ))}
        <div className="w-16 h-16 border-2 border-dashed border-green-400 rounded flex items-center justify-center bg-white dark:bg-green-800 dark:border-green-600">
          <span className="text-2xl text-green-500 dark:text-green-400">?</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
        {options.map((option, index) => (
          <Button
            key={index}
            onClick={() => onAnswer(option)}
            variant="outline"
            className="p-8 hover:bg-green-50 hover:border-green-300 transition-all duration-200 hover:scale-105 flex items-center justify-center border-2 dark:hover:bg-green-800 dark:hover:border-green-500"
          >
            <ShapeRenderer shape={option} size="small" />
          </Button>
        ))}
      </div>
    </div>
  );
}

function ShapeRenderer({ shape, size }) {
  const dimensions = size === "large" ? "w-16 h-16" : "w-10 h-10";
  const borderSize =
    size === "large"
      ? "border-l-[16px] border-r-[16px] border-b-[32px]"
      : "border-l-[10px] border-r-[10px] border-b-[20px]";

  if (shape.type === "circle") {
    return (
      <div
        className={`${dimensions} rounded-full`}
        style={{ backgroundColor: shape.color }}
      />
    );
  }

  if (shape.type === "square") {
    return (
      <div className={dimensions} style={{ backgroundColor: shape.color }} />
    );
  }

  if (shape.type === "triangle") {
    return (
      <div
        className={`w-0 h-0 ${borderSize} border-transparent`}
        style={{ borderBottomColor: shape.color }}
      />
    );
  }

  return null;
}
