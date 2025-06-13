"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Loader2,
  ChevronRight,
  Check,
  X,
  BookOpen,
  ArrowLeft,
  Trophy,
  Sparkles,
  Lightbulb,
  Smile,
  Frown,
  Meh,
} from "lucide-react"
import { customToast } from "@/lib/Toast.js"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Confetti } from "@/components/ui/confetti"
import AssessmentNotFound from "@/components/userUi/AssessmentNotFound"
import axios from "axios"

const PreAssessmentPage = () => {
  const router = useRouter()
  const [assessment, setAssessment] = useState(null)
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [answers, setAnswers] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)

  const searchParams = useSearchParams()
  const courseId = searchParams.get("courseId")

  // Fetch assessment and course data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [assessmentRes, courseRes] = await Promise.all([
          axios.get(`/api/courses/${courseId}/assessment`, {
            params: { type: "PRE" },
          }),
          axios.get(`/api/courses/${courseId}`),
        ])

        if (assessmentRes.data.success) {
          // customToast.success(assessmentRes.data.message)
        } else {
          customToast.error(
            assessmentRes.data.error || "Failed to fetch assessment"
          )
        }

        const assessmentData = assessmentRes.data
        const courseData = courseRes.data

        setAssessment(assessmentData.assessment)
        setCourse(courseData.course)
      } catch (error) {
        console.log(error)
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

    if (calculatedScore >= 70) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 5000)
    }

    try {
      const res = await fetch(`/api/assessments/${assessment.id}/score`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score: calculatedScore }),
      })

      if (!res.ok) throw new Error("Failed to submit score")
    } catch (err) {
      console.log(err)
      customToast.error("Failed to submit score")
    }
  }

  const handleCompleteAssessment = () => {
    router.push(`/user/course/${courseId}`)
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4 bg-gradient-to-br from-background to-muted">
        <motion.div
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{
            rotate: 360,
            scale: 1,
            opacity: 1,
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "linear",
            scale: {
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            },
          }}
          className="relative"
        >
          <Loader2 className="w-16 h-16 text-primary" />
          <motion.span
            className="absolute border-4 rounded-full -inset-2 border-primary border-t-transparent"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex gap-1"
        >
          {["L", "o", "a", "d", "i", "n", "g", "..."].map((char, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -5, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                delay: i * 0.1,
              }}
              className="font-medium text-foreground"
            >
              {char}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          className="w-48 h-1 overflow-hidden rounded-full bg-muted-foreground/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </motion.div>
      </div>
    )
  }

  if (!assessment || !course) {
    return (
      <div className="flex items-center justify-center h-screen">
        <AssessmentNotFound />
      </div>
    )
  }

  if (showResult) {
    return (
      <div className="container relative py-8">
        {showConfetti && <Confetti />}

        <Card className="relative overflow-hidden border border-muted">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-4 right-4"
          >
            <Badge variant="outline" className="flex items-center gap-1">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span>Assessment Complete!</span>
            </Badge>
          </motion.div>

          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-3xl">
              {score >= 70 ? (
                <>
                  <Sparkles className="w-8 h-8 text-yellow-500" />
                  Amazing Results!
                </>
              ) : score >= 50 ? (
                <>
                  <Lightbulb className="w-8 h-8 text-blue-500" />
                  Good Effort!
                </>
              ) : (
                <>
                  <BookOpen className="w-8 h-8 text-purple-500" />
                  Keep Learning!
                </>
              )}
            </CardTitle>
            <CardDescription className="text-lg">
              {course.title}
            </CardDescription>
          </CardHeader>

          <CardContent className="text-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className={`inline-flex flex-col items-center justify-center w-40 h-40 rounded-full text-4xl font-bold mb-6 relative ${
                score >= 70
                  ? "bg-green-100 text-green-600"
                  : score >= 50
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
              }`}
            >
              <div className="absolute p-2 rounded-full -top-2 -right-2 bg-background">
                {score >= 70 ? (
                  <Smile className="w-6 h-6 text-green-600" />
                ) : score >= 50 ? (
                  <Meh className="w-6 h-6 text-yellow-600" />
                ) : (
                  <Frown className="w-6 h-6 text-red-600" />
                )}
              </div>
              {score}%<span className="mt-1 text-sm font-normal">Score</span>
            </motion.div>

            <h2 className="mb-2 text-2xl font-bold">
              {score >= 70
                ? "You're a Rockstar! 🎸"
                : score >= 50
                  ? "You're Getting There! 💪"
                  : "You've Got This! ✨"}
            </h2>
            <p className="mb-6 text-muted-foreground">
              {score >= 70
                ? "You're ready to take on this course with flying colors!"
                : score >= 50
                  ? "You have some knowledge to build upon - let's get started!"
                  : "This course will help you master these concepts in no time!"}
            </p>

            <div className="mb-8 space-y-4">
              {assessment.questions.map((question, index) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 text-left transition-colors border rounded-lg bg-background/50 hover:bg-background/80"
                >
                  <p className="flex items-start mb-2 font-medium">
                    <span className="inline-flex items-center justify-center w-6 h-6 mr-2 rounded-full bg-primary/10 text-primary">
                      {index + 1}
                    </span>
                    {question.text}
                  </p>
                  <div className="space-y-2">
                    {question.options.map((option, optIndex) => (
                      <motion.div
                        key={optIndex}
                        whileHover={{ scale: 1.01 }}
                        className={`flex items-center p-3 rounded-lg transition-all ${
                          answers[index]?.selectedOption === optIndex
                            ? answers[index]?.isCorrect
                              ? "bg-green-50 border border-green-200 shadow-sm"
                              : "bg-red-50 border border-red-200 shadow-sm"
                            : optIndex === question.correct
                              ? "bg-green-50 border border-green-200 shadow-sm"
                              : "bg-muted hover:bg-muted/80"
                        }`}
                      >
                        {answers[index]?.selectedOption === optIndex ? (
                          answers[index]?.isCorrect ? (
                            <Check className="flex-shrink-0 w-5 h-5 mr-3 text-green-500" />
                          ) : (
                            <X className="flex-shrink-0 w-5 h-5 mr-3 text-red-500" />
                          )
                        ) : optIndex === question.correct ? (
                          <Check className="flex-shrink-0 w-5 h-5 mr-3 text-green-500" />
                        ) : (
                          <div className="flex-shrink-0 w-5 h-5 mr-3" />
                        )}
                        <span>{option}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleCompleteAssessment}
                className="gap-2 px-8 py-4 text-lg"
                size="lg"
              >
                {score >= 70
                  ? "Start Learning Like a Pro"
                  : score >= 50
                    ? "Begin Your Learning Journey"
                    : "Let's Fill Those Knowledge Gaps"}
                <ChevronRight className="w-5 h-5" />
              </Button>
            </motion.div>
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
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-4 text-center"
      >
        <h2 className="mb-2 text-4xl font-bold text-transparent bg-gradient-to-r from-primary to-purple-600 bg-clip-text">
          Pre-Assessment Challenge
        </h2>
        <p className="mb-1 text-xl text-muted-foreground">
          Course:{" "}
          <span className="font-medium text-foreground">{course.title}</span>
        </p>
        <p className="max-w-lg text-sm text-muted-foreground">
          Let's see what you already know! This will help us personalize your
          learning experience.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="max-w-4xl mx-auto transition-shadow shadow-lg hover:shadow-xl">
          <CardContent className="p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  <span>
                    Question {currentQuestionIndex + 1} of{" "}
                    {assessment.questions.length}
                  </span>
                </Badge>
                <div className="flex items-center gap-1">
                  <span className="text-sm text-muted-foreground">
                    {Math.round(progressValue)}% Complete
                  </span>
                </div>
              </div>
              <Progress value={progressValue} className="h-2" />
            </div>

            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="flex items-start mb-6 text-xl font-bold">
                <span className="inline-flex items-center justify-center w-8 h-8 mr-3 rounded-full bg-primary/10 text-primary">
                  {currentQuestionIndex + 1}
                </span>
                {currentQuestion.text}
              </h2>

              <div className="mb-8 space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      onClick={() => handleOptionSelect(index)}
                      className={`w-full justify-start h-auto py-4 text-left transition-all ${
                        selectedOption === index
                          ? "border-primary bg-accent shadow-md"
                          : "hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center">
                        <div
                          className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 transition-colors ${
                            selectedOption === index
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="text-left">{option}</span>
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-end">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    disabled={selectedOption === null}
                    className="gap-2 px-6 py-3 text-base"
                    onClick={handleNextQuestion}
                  >
                    {currentQuestionIndex < assessment.questions.length - 1
                      ? "Next Question"
                      : "Submit Assessment"}
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        className="flex items-center justify-center gap-1 mt-6 text-sm text-center text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Lightbulb className="w-4 h-4" />
        <span>
          Answer honestly - this helps us customize your learning path!
        </span>
      </motion.div>
    </div>
  )
}

export default PreAssessmentPage
