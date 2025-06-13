"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, Trash2 } from "lucide-react";

export function CreateQuizDialog({ open, onOpenChange }) {
  const [questions, setQuestions] = useState([
    {
      question: "",
      type: "multiple-choice",
      options: ["", "", "", ""],
      correctAnswer: 0,
    },
  ]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        type: "multiple-choice",
        options: ["", "", "", ""],
        correctAnswer: 0,
      },
    ]);
  };

  const handleRemoveQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Quiz</DialogTitle>
          <DialogDescription>
            Create a new quiz for your students. Add questions and set the
            correct answers.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Quiz Title</Label>
            <Input id="title" placeholder="Enter quiz title" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter quiz description"
              className="h-20"
            />
          </div>

          <div className="grid gap-2">
            <Label>Time Limit (minutes)</Label>
            <Input type="number" min="1" defaultValue="30" />
          </div>

          <div className="border-t pt-4">
            <Label className="text-lg font-semibold">Questions</Label>
            {questions.map((question, questionIndex) => (
              <div
                key={questionIndex}
                className="mt-4 p-4 border rounded-lg space-y-4"
              >
                <div className="flex items-center justify-between">
                  <Label>Question {questionIndex + 1}</Label>
                  {questions.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveQuestion(questionIndex)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  )}
                </div>

                <div className="space-y-4">
                  <Textarea
                    value={question.question}
                    onChange={(e) =>
                      handleQuestionChange(
                        questionIndex,
                        "question",
                        e.target.value
                      )
                    }
                    placeholder="Enter your question"
                  />

                  <div className="grid gap-2">
                    <Label>Question Type</Label>
                    <Select
                      value={question.type}
                      onValueChange={(value) =>
                        handleQuestionChange(questionIndex, "type", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="multiple-choice">
                          Multiple Choice
                        </SelectItem>
                        <SelectItem value="true-false">True/False</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {question.type === "multiple-choice" && (
                    <div className="space-y-2">
                      <Label>Options</Label>
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex gap-2">
                          <Input
                            value={option}
                            onChange={(e) =>
                              handleOptionChange(
                                questionIndex,
                                optionIndex,
                                e.target.value
                              )
                            }
                            placeholder={`Option ${optionIndex + 1}`}
                          />
                          <Select
                            value={
                              question.correctAnswer === optionIndex
                                ? "correct"
                                : "incorrect"
                            }
                            onValueChange={(value) =>
                              handleQuestionChange(
                                questionIndex,
                                "correctAnswer",
                                value === "correct"
                                  ? optionIndex
                                  : question.correctAnswer
                              )
                            }
                          >
                            <SelectTrigger className="w-[120px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="correct">Correct</SelectItem>
                              <SelectItem value="incorrect">
                                Incorrect
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      ))}
                    </div>
                  )}

                  {question.type === "true-false" && (
                    <div className="space-y-2">
                      <Label>Correct Answer</Label>
                      <Select
                        value={question.correctAnswer ? "true" : "false"}
                        onValueChange={(value) =>
                          handleQuestionChange(
                            questionIndex,
                            "correctAnswer",
                            value === "true"
                          )
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">True</SelectItem>
                          <SelectItem value="false">False</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              className="mt-4 w-full"
              onClick={handleAddQuestion}
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Question
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit">Create Quiz</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
