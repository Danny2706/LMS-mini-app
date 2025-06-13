"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Loader2,
  ChevronRight,
  Check,
  X,
  ArrowLeft,
  FileText,
} from "lucide-react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { customToast } from "@/lib/Toast"
import axios from "axios"

const PreAssessmentPage = () => {
  const router = useRouter()
  const [assessment, setAssessment] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [answers, setAnswers] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)

  const searchParams = useSearchParams()
  const courseId = searchParams.get("courseId")

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const assessmentRes = await axios.get(
          `/api/courses/${courseId}/assessment?type=POST`
        )
        setAssessment(assessmentRes.data.assessment)
      } catch (error) {
        customToast.error("Error fetching assessment data")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [courseId])

  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex)
  }

  const handleNextQuestion = () => {
    const newAnswers = [...answers]
    newAnswers[currentQuestionIndex] = {
      questionId: assessment.questions[currentQuestionIndex].id,
      selectedOption,
      isCorrect:
        selectedOption ===
        parseInt(assessment.questions[currentQuestionIndex].correct),
    }
    setAnswers(newAnswers)

    if (currentQuestionIndex < assessment.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedOption(null)
    } else {
      calculateScore(newAnswers)
      setShowResult(true)
    }
  }

  const calculateScore = async (answerList) => {
    const correctAnswers = answerList.filter(
      (answer) => answer.isCorrect
    ).length
    const totalQuestions = answerList.length
    const calculatedScore = Math.round((correctAnswers / totalQuestions) * 100)
    setScore(calculatedScore)

    try {
      const res = await axios.post(`/api/assessments/${assessment.id}/score`, {
        score: calculatedScore,
      })
      customToast.success("Score submitted successfully")
      console.log("Score submitted:", res.data)
    } catch (err) {
      customToast.error("Failed to submit score")
    }
  }

  const handleCompleteAssessment = () => {
    router.push(`/user/issuecertificate?courseId=${courseId}`)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <Loader2 className="w-12 h-12 text-primary" />
        </motion.div>
      </div>
    )
  }

  if (!assessment) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="w-full max-w-md p-8 text-center border border-muted">
          <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <CardTitle className="mb-2 text-2xl">No Assessment Found</CardTitle>
          <CardDescription>
            There are currently no assessments available for this course
          </CardDescription>
          <Button className="mt-6" onClick={() => router.push("/user")}>
            Back to Dashboard
          </Button>
        </Card>
      </div>
    )
  }

  if (showResult) {
    return (
      <div className="container py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl">Post Assessment Results</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className={`inline-flex items-center justify-center w-32 h-32 rounded-full text-3xl font-bold mb-6 ${
                score >= 70
                  ? "bg-green-100 text-green-600"
                  : score >= 50
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
              }`}
            >
              {score}%
            </motion.div>

            <h2 className="mb-2 text-2xl font-bold">
              {score >= 70
                ? "Excellent Work!"
                : score >= 50
                  ? "Good Effort!"
                  : "Keep Practicing!"}
            </h2>
            <p className="mb-6 text-muted-foreground">
              You scored {score}% on your post-assessment
            </p>

            <div className="mb-8 space-y-4">
              {assessment.questions.map((question, index) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 text-left border rounded-lg"
                >
                  <p className="mb-2 font-medium">
                    {index + 1}. {question.text}
                  </p>
                  <div className="space-y-2">
                    {question.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className={`flex items-center p-2 rounded ${
                          answers[index]?.selectedOption === optIndex
                            ? answers[index]?.isCorrect
                              ? "bg-green-50 border border-green-200"
                              : "bg-red-50 border border-red-200"
                            : optIndex === question.correct
                              ? "bg-green-50 border border-green-200"
                              : "bg-muted"
                        }`}
                      >
                        {answers[index]?.selectedOption === optIndex ? (
                          answers[index]?.isCorrect ? (
                            <Check className="w-5 h-5 mr-2 text-green-500" />
                          ) : (
                            <X className="w-5 h-5 mr-2 text-red-500" />
                          )
                        ) : optIndex === question.correct ? (
                          <Check className="w-5 h-5 mr-2 text-green-500" />
                        ) : null}
                        <span>{option}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <Button onClick={handleCompleteAssessment} className="gap-2">
              Finish Assessment
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentQuestion = assessment?.questions?.at(currentQuestionIndex)
  const progressValue =
    ((currentQuestionIndex + 1) / assessment.questions.length) * 100

  return (
    <div className="container py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">Post Assessment</CardTitle>
          <CardDescription>
            This assessment will help us understand your current knowledge level
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <Badge variant="secondary">
                Question {currentQuestionIndex + 1} of{" "}
                {assessment.questions.length}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {Math.round(progressValue)}% Complete
              </span>
            </div>
            <Progress value={progressValue} className="h-2" />
          </div>

          <h2 className="mb-6 text-xl font-bold">{currentQuestion.text}</h2>

          <div className="mb-8 space-y-3">
            {currentQuestion.options.map((option, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Button
                  variant="outline"
                  onClick={() => handleOptionSelect(index)}
                  className={`w-full justify-start h-auto py-4 text-left ${
                    selectedOption === index ? "border-primary bg-accent" : ""
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-6 h-6 rounded-full mr-3 ${
                        selectedOption === index
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{option}</span>
                  </div>
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleNextQuestion}
              disabled={selectedOption === null}
              className="gap-1"
            >
              {currentQuestionIndex < assessment.questions.length - 1
                ? "Next Question"
                : "Submit Assessment"}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PreAssessmentPage
