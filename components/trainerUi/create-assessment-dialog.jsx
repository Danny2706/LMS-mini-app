"use client"

import { useState, useEffect } from "react"
import { Loader, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { customToast } from "@/lib/Toast"
import { useSelector } from "react-redux"

export default function AssessmentForm({ open, onOpenChange }) {
  const { user } = useSelector((store) => store.auth)
  // State for form data
  const [newAssessment, setNewAssessment] = useState({
    title: "",
    courseId: "",
    description: "",
    type: "PRE",
    dueDate: "",
    questions: [],
    trainerId: user?.id,
  })

  const [isCourseCreating, setIsCreating] = useState(false)

  // State for courses
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch courses on mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          `/api/courses/trainer?trainerId=${user?.id}`
        )
        const data = await response.json()
        setCourses(data)
      } catch (error) {
        console.error("Failed to fetch courses", error)
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [user])

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewAssessment((prev) => ({ ...prev, [name]: value }))
  }

  // Handle question changes
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...newAssessment.questions]
    updatedQuestions[index][field] = value
    setNewAssessment((prev) => ({ ...prev, questions: updatedQuestions }))
  }

  // Handle option changes
  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...newAssessment.questions]
    updatedQuestions[qIndex].options[oIndex] = value
    setNewAssessment((prev) => ({ ...prev, questions: updatedQuestions }))
  }

  // Add new question
  const addQuestion = () => {
    setNewAssessment((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          text: "",
          options: ["", "", "", ""],
          correct: "0",
        },
      ],
    }))
  }

  // Remove question
  const removeQuestion = (index) => {
    const updatedQuestions = [...newAssessment.questions]
    updatedQuestions.splice(index, 1)
    setNewAssessment((prev) => ({ ...prev, questions: updatedQuestions }))
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsCreating(true)
      const response = await fetch("/api/assessments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAssessment),
      })

      if (!response.ok) throw new Error("Failed to create assessment")

      const result = await response.json()
      customToast.success("Assessment created successfully!")

      // Reset form
      setNewAssessment({
        title: "",
        courseId: "",
        description: "",
        type: "PRE",
        dueDate: "",
        questions: [],
        trainerId: user?.id,
      })
      onOpenChange(false)
    } catch (error) {
      console.error("Error:", error)
      customToast.error("Failed to create assessment")
    } finally {
      setIsCreating(true)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Assessment</DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new assessment for your course.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="title">Assessment Title *</Label>
              <Input
                id="title"
                name="title"
                value={newAssessment.title}
                onChange={handleInputChange}
                required
                placeholder="Midterm Exam"
              />
            </div>

            <div>
              <Label htmlFor="courseId">Course *</Label>
              <Select
                name="courseId"
                value={newAssessment.courseId}
                onValueChange={(value) =>
                  setNewAssessment((prev) => ({ ...prev, courseId: value }))
                }
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      loading ? "Loading courses..." : "Select a course"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {courses && courses.length > 0 ? (
                    courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.title}
                      </SelectItem>
                    ))
                  ) : (
                    <p className="text-sm px-6 py-1">
                      No course data found for you
                    </p>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="type">Assessment Type *</Label>
              <Select
                name="type"
                value={newAssessment.type}
                onValueChange={(value) =>
                  setNewAssessment((prev) => ({ ...prev, type: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PRE">Pre-Assessment</SelectItem>
                  <SelectItem value="POST">Post-Assessment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="dueDate">Due Date *</Label>
              <Input
                id="dueDate"
                type="date"
                name="dueDate"
                value={newAssessment.dueDate}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={newAssessment.description}
                onChange={handleInputChange}
                rows={4}
                placeholder="Provide instructions for this assessment..."
              />
            </div>
          </div>

          <Separator />

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Questions</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addQuestion}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Question
              </Button>
            </div>

            {newAssessment.questions.length === 0 ? (
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    No questions added yet. Click "Add Question" to get started.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {newAssessment.questions.map((question, qIndex) => (
                  <Card key={qIndex}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base">
                          Question {qIndex + 1}
                        </CardTitle>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => removeQuestion(qIndex)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Question Text *</Label>
                        <Input
                          value={question.text}
                          onChange={(e) =>
                            handleQuestionChange(qIndex, "text", e.target.value)
                          }
                          required
                          placeholder="Enter your question"
                        />
                      </div>

                      <div>
                        <Label>Options *</Label>
                        <RadioGroup
                          value={question.correct}
                          onValueChange={(value) =>
                            handleQuestionChange(qIndex, "correct", value)
                          }
                          className="space-y-2"
                        >
                          {question.options.map((option, oIndex) => (
                            <div
                              key={oIndex}
                              className="flex items-center space-x-3"
                            >
                              <RadioGroupItem
                                value={String(oIndex)}
                                id={`q${qIndex}-option${oIndex}`}
                              />
                              <Input
                                value={option}
                                onChange={(e) =>
                                  handleOptionChange(
                                    qIndex,
                                    oIndex,
                                    e.target.value
                                  )
                                }
                                required
                                placeholder={`Option ${oIndex + 1}`}
                              />
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={newAssessment.questions.length === 0}
            >
              {isCourseCreating ? (
                <span className="flex items-center gap-3">
                  <Loader className="animate-spin w-4 h-4" />
                  <span>Creating...</span>
                </span>
              ) : (
                "Publish Assessment"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
