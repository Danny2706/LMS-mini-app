"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  BookOpen,
  CheckCircle,
  Play,
  FileText,
  Clock,
  ChevronRight,
  ArrowLeft,
  Loader2,
  Loader,
} from "lucide-react"
import axios from "axios"
import CourseNotFound from "@/components/userUi/CourseNotFound"
import { useSelector } from "react-redux"
import { customToast } from "@/lib/Toast"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
// import DOMPurify from "isomorphic-dompurify"

export default function CoursePage() {
  const router = useRouter()
  const { courseId } = useParams()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0)
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0)
  const [completedModules, setCompletedModules] = useState([])
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [quizScore, setQuizScore] = useState(null)
  const [learningStarted, setLearningStarted] = useState(false)
  const [currentView, setCurrentView] = useState("module") // 'module' or 'quiz'

  const { user } = useSelector((store) => store.auth)
  const [isCompletingModule, setIsCompletingModule] = useState(false)
  const [isQuizSubmitting, setIsQuizSubmitting] = useState(false)

  useEffect(() => {
    const fetchCourseAndProgress = async () => {
      try {
        setLoading(true)

        // 1. Fetch course data
        const courseRes = await fetch(`/api/courses/${courseId}`)
        const courseData = await courseRes.json()
        setCourse(courseData.course)

        // 2. Fetch user's completed modules
        const progressRes = await fetch(
          `/api/modules/complete/${user.id}?courseId=${courseId}`
        )

        if (!progressRes.ok) {
          throw new Error("Failed to fetch progress")
        }

        const { completedModules } = await progressRes.json()

        // 3. Find the first incomplete module
        const allModuleIds = courseData.course.modules.map((m) => m.id)
        const completedModuleIds = completedModules?.map((m) => m.moduleId)

        const firstIncompleteIndex = courseData.course.modules.findIndex(
          (module) => !completedModuleIds.includes(module.id)
        )

        // 4. Set the current module ( Default to last module if all completed)
        setCurrentModuleIndex(
          firstIncompleteIndex >= 0
            ? firstIncompleteIndex
            : courseData.course.modules.length - 1
        )
        setCompletedModules(completedModuleIds)
        setLearningStarted(completedModuleIds.length > 0)
      } catch (error) {
        console.error("Error loading progress:", error)
      } finally {
        setLoading(false)
      }
    }

    if (user?.id) fetchCourseAndProgress()
  }, [courseId, user?.id, user])

  const startLearning = () => {
    setLearningStarted(true)
    setCurrentModuleIndex(0)
    setCurrentView("module")
    customToast.success("Let's start learning!")
  }

  const currentModule = course?.modules?.[currentModuleIndex]
  const currentQuiz = currentModule?.quizzes?.[currentQuizIndex]

  const completeModule = async () => {
    if (!completedModules.includes(currentModule.id)) {
      setCompletedModules([...completedModules, currentModule.id])

      // console.log("Completed modules:", completedModules, currentModule.id)
      try {
        setIsCompletingModule(true)
        const res = await axios.post(
          `/api/modules/complete`,
          {
            userId: user?.id,
            moduleId: currentModule.id,
          },
          {
            withCredentials: true,
          }
        )

        if (res.data.success) {
          customToast.success(res.data.message)
        } else {
          customToast.error(res.data.error)
        }
      } catch (error) {
        console.error("Error completing module:", error)
        customToast.error("Failed to complete module")
      } finally {
        setIsCompletingModule(false)
      }
    }

    console.log(currentModule.quizzes?.length, currentModule)
    // If module has quizzes, show the first one
    if (currentModule.quizzes?.length > 0) {
      setCurrentQuizIndex(0)
      setCurrentView("quiz")
      setQuizAnswers({})
      setQuizSubmitted(false)
      setQuizScore(null)
    } else {
      // No quizzes, move to next module
      moveToNextModule()
    }
  }

  const moveToNextModule = async () => {
    if (currentModuleIndex < course.modules.length - 1) {
      setCurrentModuleIndex(currentModuleIndex + 1)
      setCurrentView("module")
    } else {
      // Course completed
      router.push(`/user/assessment/post?courseId=${courseId}`)
    }
  }

  const handleQuizAnswer = (questionId, answer) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))
  }

  const submitQuiz = async () => {
    let score = 0
    currentQuiz.questions.forEach((question) => {
      if (quizAnswers[question.id] === question.correct) {
        score++
      }
    })
    const percentage = Math.round((score / currentQuiz.questions.length) * 100)
    setQuizScore(percentage)

    try {
      setIsQuizSubmitting(true)
      const res = await axios.post(
        "/api/modules/update-quiz",
        {
          userId: user?.id,
          moduleId: currentModule.id,
          quizScore: percentage,
          quizPassed: true,
        },
        {
          withCredentials: true,
        }
      )
      setQuizSubmitted(true)
    } catch (error) {
      console.log(currentModule.id)
      console.error("Error submitting quiz:", error)
      customToast.error(error?.response?.data?.error || error.message)
    } finally {
      setIsQuizSubmitting(false)
    }
  }

  const completeQuiz = () => {
    // Move to next quiz if exists, otherwise next module
    if (currentQuizIndex < currentModule.quizzes.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1)
      setQuizAnswers({})
      setQuizSubmitted(false)
      setQuizScore(null)
    } else {
      moveToNextModule()
    }
  }

  const renderModuleContent = () => {
    const renderContent = () => {
      switch (currentModule.contentType) {
        case "video": {
          const isYouTube =
            currentModule.content.includes("youtube.com") ||
            currentModule.content.includes("youtu.be")
          const isVimeo = currentModule.content.includes("vimeo.com")
          if (isYouTube || isVimeo) {
            // YouTube/Vimeo iframe embed
            const embedUrl = convertToEmbedUrl(currentModule.content)
            return (
              <iframe
                src={embedUrl}
                className="w-full h-[56vh]"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            )
          } else {
            // Direct video file (MP4/WebM/etc)
            return (
              <video className="w-full h-full" controls autoPlay>
                <source src={currentModule.content} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )
          }
        }

        case "markdown":
          return (
            <div className="prose max-w-none prose-headings:scroll-mt-20 prose-pre:bg-gray-900 prose-pre:text-white dark:prose-invert">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {currentModule.content}
              </ReactMarkdown>
            </div>
          )

        // case "html":
        //   return (
        //     // <div
        //     //   className="prose max-w-none"
        //     //   dangerouslySetInnerHTML={{
        //     //     __html: DOMPurify.sanitize(currentModule.content),
        //     //   }}
        //     // />
        //   )

        // case "text":
        default:
          return (
            <div className="prose whitespace-pre-wrap max-w-none">
              {currentModule.content}
            </div>
          )
      }
    }

    return (
      <div className="space-y-6">
        {renderContent()}

        <div>
          <h3 className="mb-2 text-xl font-bold">{currentModule.title}</h3>
          {currentModule.description && (
            <p className="text-gray-600">{currentModule.description}</p>
          )}
        </div>

        <div className="mt-6">
          <button
            onClick={completeModule}
            className={` ${isCompletingModule ? "cursor-not-allowed bg-blue-400" : "bg-blue-600"} px-6 py-2  text-white rounded-lg hover:bg-blue-700`}
          >
            {isCompletingModule ? (
              <span className="flex items-center gap-2 ">
                <Loader className="w-5 h-5 animate-spin" /> Completing...
              </span>
            ) : (
              "Complete Module"
            )}{" "}
          </button>
        </div>
      </div>
    )
  }

  const renderQuizContent = () => {
    if (quizSubmitted) {
      return (
        <div className="py-8 text-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`inline-flex items-center justify-center w-24 h-24 rounded-full text-2xl font-bold mb-6 ${
              quizScore >= 70
                ? "bg-green-100 text-green-600"
                : quizScore >= 50
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-red-100 text-red-600"
            }`}
          >
            {quizScore}%
          </motion.div>
          <h3 className="mb-2 text-xl font-bold">
            {quizScore >= 70
              ? "Great Job!"
              : quizScore >= 50
                ? "Good Effort!"
                : "Keep Practicing!"}
          </h3>
          <button
            onClick={completeQuiz}
            className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            {currentQuizIndex < currentModule.quizzes.length - 1
              ? "Next Quiz"
              : currentModuleIndex < course?.modules?.length - 1
                ? "Continue to Next Module"
                : "Finish Course"}
          </button>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        <p className="text-gray-600">Test your knowledge from this module</p>

        {currentQuiz.questions.map((question, index) => (
          <motion.div
            key={question.id || index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-4 border border-gray-200 rounded-lg"
          >
            <h4 className="mb-3 font-medium">
              {index + 1}. {question.text} ?
            </h4>
            <div className="space-y-2">
              {question.options.map((option, i) => (
                <div key={i} className="flex items-center">
                  <input
                    type="radio"
                    id={`${question.id}-${i}`}
                    name={question.id}
                    checked={quizAnswers[question.id] === option}
                    onChange={() => handleQuizAnswer(question.id, option)}
                    className="mr-2"
                  />
                  <label
                    htmlFor={`${question.id}-${i}`}
                    className="cursor-pointer"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        <button
          onClick={submitQuiz}
          disabled={
            Object.keys(quizAnswers).length !== currentQuiz.questions.length
          }
          className={`px-6 py-2 rounded-lg cursor-pointer ${
            Object.keys(quizAnswers).length === currentQuiz.questions.length
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isQuizSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader className="w-5 h-5 animate-spin" /> Submitting...
            </span>
          ) : (
            "Submit Quiz"
          )}
        </button>
      </div>
    )
  }

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col items-center justify-center h-screen space-y-8 bg-gradient-to-br from-blue-50 to-gray-50"
      >
        {/* Animated logo/icon with floating animation */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut",
          }}
          className="mb-6"
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M12 2L3 7V17L12 22L21 17V7L12 2Z"
              stroke="#3B82F6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <motion.path
              d="M12 11V17"
              stroke="#3B82F6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.path
              d="M15 14L12 17L9 14"
              stroke="#3B82F6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0.5,
              }}
            />
          </svg>
        </motion.div>

        {/* Animated loading text with progress */}
        <div className="space-y-4 text-center">
          <motion.h2
            className="text-2xl font-bold text-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Preparing Your course
          </motion.h2>

          <motion.p
            className="text-gray-600"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            Loading questions...
          </motion.p>

          {/* Progress bar */}
          <motion.div
            className="w-64 h-2 mx-auto overflow-hidden bg-gray-200 rounded-full"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 256 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="h-full bg-blue-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: ["0%", "90%", "100%"] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>

        {/* Fun animated dots */}
        <div className="flex space-x-2">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-blue-400 rounded-full"
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Random tips */}
        <motion.div
          className="max-w-md px-4 mt-8 text-sm text-center text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            animate={{ opacity: [0.8, 1] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            Did you know? Taking short breaks during study improves retention by
            up to 30%.
          </motion.div>
        </motion.div>
      </motion.div>
    )
  }

  if (!course) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CourseNotFound />
      </div>
    )
  }

  if (!learningStarted) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-white">
        <div className="w-full max-w-2xl">
          <div className="flex items-center mb-6">
            <button
              onClick={() => router.back()}
              className="mr-4 text-blue-600 hover:text-blue-800"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-3xl font-bold">{course.title}</h1>
          </div>

          <p className="mb-8 text-gray-600">{course.description}</p>

          <div className="mb-8">
            <h2 className="mb-4 text-xl font-semibold">Course Content</h2>
            <div className="space-y-2">
              {course.modules.map((module, index) => (
                <div
                  key={module.id}
                  className="overflow-hidden border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center p-3 bg-gray-50">
                    <div className="flex items-center justify-center w-8 h-8 mr-3 text-blue-600 bg-blue-100 rounded-full">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{module.title}</h3>
                      {module.duration && (
                        <p className="text-sm text-gray-500">
                          <Clock className="inline w-3 h-3 mr-1" />
                          {module.duration} min
                        </p>
                      )}
                    </div>
                  </div>

                  {module.quizzes?.length > 0 && (
                    <div className="px-4 py-2 text-sm text-gray-600 bg-gray-100 border-t border-gray-200">
                      Includes {module.quizzes.length} quiz
                      {module.quizzes.length > 1 ? "zes" : ""} with{" "}
                      {module.quizzes[0].questions.length} question
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={startLearning}
            className="flex items-center justify-center w-full px-6 py-3 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Start Learning
            <ChevronRight className="w-5 h-5 ml-2" />
          </motion.button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Header */}
      <div className="bg-white shadow-sm">
        <div className="px-4 py-4 mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex-1 mx-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{
                    width: `${
                      ((currentModuleIndex + (currentView === "quiz" ? 1 : 0)) /
                        course.modules.length) *
                      100
                    }%`,
                  }}
                />
              </div>
              <p className="mt-1 text-sm text-center text-gray-600">
                {currentView === "quiz"
                  ? "Module Quiz"
                  : `Module ${currentModuleIndex + 1}`}
                (Module {currentModuleIndex + 1} of {course.modules.length})
              </p>
            </div>

            {currentView === "module" && currentModule?.duration && (
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                {currentModule.duration} min
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-4 py-8">
        <motion.div
          key={currentView === "module" ? currentModule.id : currentQuiz.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden bg-white rounded-xl"
        >
          <div className="p-6">
            <h2 className="mb-6 text-2xl font-bold">
              {currentView === "module"
                ? currentModule.title
                : currentQuiz.title}
              {currentView === "quiz" && (
                <span className="ml-2 text-sm font-normal text-purple-600">
                  (Module Quiz)
                </span>
              )}
            </h2>

            {currentView === "module"
              ? renderModuleContent()
              : renderQuizContent()}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

const convertToEmbedUrl = (url) => {
  if (url.includes("youtube.com")) {
    const videoId = url.split("v=")[1]
    return `https://www.youtube.com/embed/${videoId}`
  }
  if (url.includes("youtu.be")) {
    const videoId = url.split("youtu.be/")[1]
    return `https://www.youtube.com/embed/${videoId}`
  }
  if (url.includes("vimeo.com")) {
    const videoId = url.split("vimeo.com/")[1]
    return `https://player.vimeo.com/video/${videoId}`
  }
  return url
}
