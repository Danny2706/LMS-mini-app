// app/courses/[id]/edit/page.js
"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import ReactMarkdown from "react-markdown"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Plus, Trash, ChevronUp, ChevronDown, Loader2 } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { customToast } from "@/lib/Toast"
import axios from "axios"
import { useSelector } from "react-redux"
import remarkGfm from "remark-gfm"
// import { toast } from "@/components/ui/use-toast"

const defaultCourseData = {
  title: "",
  description: "",
  thumbnail: "",
  status: "draft",
  category: "",
  trainerId: "",
  modules: [
    {
      title: "",
      description: "",
      contentType: "",
      content: "",
      order: 1,
      duration: "",
      resources: "",
      quiz: {
        title: "",
        questions: [
          {
            text: "",
            options: ["", "", "", ""],
            correct: "",
          },
        ],
      },
    },
  ],
}

export default function EditCoursePage({ params }) {
  const [course, setCourse] = useState(defaultCourseData)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [thumbnailPreview, setThumbnailPreview] = useState(null)

  const { user } = useSelector((store) => store.auth)

  const router = useRouter()
  const { courseId } = useParams()

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(`/api/courses/${courseId}`)

        console.log(JSON.stringify(response.data.course))
        setCourse(response.data.course)

        if (response.data.course.thumbnail) {
          setThumbnailPreview(response.data.course.thumbnail)
        }
      } catch (error) {
        console.error("Failed to fetch course:", error)
        customToast.error("Failed to fetch course")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourse()
  }, [courseId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append("title", course.title)
      formData.append("description", course.description)
      formData.append("status", course.status)
      formData.append("category", course.category)
      formData.append("trainerId", course.trainerId)
      formData.append("userId", user?.id)

      if (course.thumbnail instanceof File) {
        formData.append("thumbnail", course.thumbnail)
      }

      formData.append("modules", JSON.stringify(course.modules))

      const response = await fetch(`/api/courses/${courseId}`, {
        method: "PUT",
        body: formData,
      })

      if (response.ok) {
        customToast.success("Course updated successfully!")
        router.push("/admin/courses")
      } else {
        throw new Error("Failed to update course")
      }
    } catch (error) {
      console.error("Failed to update course:", error)
      customToast.error("Failed to update course")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setCourse((prev) => ({ ...prev, [name]: value }))
  }

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const previewUrl = URL.createObjectURL(file)
      setThumbnailPreview(previewUrl)
      setCourse((prev) => ({ ...prev, thumbnail: file }))
    }
  }

  // Module handlers
  const addModule = () => {
    setCourse((prev) => ({
      ...prev,
      modules: [
        ...prev.modules,
        {
          title: "",
          description: "",
          contentType: "",
          content: "",
          order: prev.modules.length + 1,
          duration: "",
          resources: "",
          quiz: {
            title: "",
            questions: [
              {
                text: "",
                options: ["", "", "", ""],
                correct: "",
              },
            ],
          },
        },
      ],
    }))
  }

  const removeModule = (index) => {
    if (course.modules.length > 1) {
      setCourse((prev) => ({
        ...prev,
        modules: prev.modules.filter((_, i) => i !== index),
      }))
    } else {
      // toast({
      //   title: "Error",
      //   description: "Course must have at least one module",
      //   variant: "destructive",
      // })
    }
  }

  const handleModuleChange = (index, field, value) => {
    setCourse((prev) => {
      const updatedModules = [...prev.modules]
      updatedModules[index][field] = value
      return { ...prev, modules: updatedModules }
    })
  }

  // Quiz handlers
  const addQuestion = (moduleIndex) => {
    setCourse((prev) => {
      const updatedModules = [...prev.modules]
      updatedModules[moduleIndex].quiz.questions.push({
        text: "",
        options: ["", "", "", ""],
        correct: "",
      })
      return { ...prev, modules: updatedModules }
    })
  }

  const removeQuestion = (moduleIndex, questionIndex) => {
    if (course.modules[moduleIndex].quiz.questions.length > 1) {
      setCourse((prev) => {
        const updatedModules = [...prev.modules]
        updatedModules[moduleIndex].quiz.questions.splice(questionIndex, 1)
        return { ...prev, modules: updatedModules }
      })
    } else {
      // toast({
      //   title: "Error",
      //   description: "Quiz must have at least one question",
      //   variant: "destructive",
      // })
    }
  }

  const handleQuestionChange = (moduleIndex, questionIndex, field, value) => {
    setCourse((prev) => {
      const updatedModules = [...prev.modules]
      updatedModules[moduleIndex].quiz.questions[questionIndex][field] = value
      return { ...prev, modules: updatedModules }
    })
  }

  const handleOptionChange = (
    moduleIndex,
    questionIndex,
    optionIndex,
    value
  ) => {
    setCourse((prev) => {
      const updatedModules = [...prev.modules]
      updatedModules[moduleIndex].quiz.questions[questionIndex].options[
        optionIndex
      ] = value
      return { ...prev, modules: updatedModules }
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Edit Course</h1>
        <Badge variant="outline" className="text-sm">
          {course.status || "Draft"}
        </Badge>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Course Basic Info Section */}
        <Card className="w-[70vw]">
          <CardHeader>
            <CardTitle>Course Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Course Title *</Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  value={course.title}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={course.description}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="status">Status *</Label>
                <Select
                  value={course.status}
                  onValueChange={(value) =>
                    setCourse((prev) => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={course.category}
                  onValueChange={(value) =>
                    setCourse((prev) => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="WEB_DEVELOPMENT">
                      Web Development
                    </SelectItem>
                    <SelectItem value="MOBILE_DEVELOPMENT">
                      Mobile Development
                    </SelectItem>
                    <SelectItem value="DATA_SCIENCE">Data Science</SelectItem>
                    <SelectItem value="CLOUD_COMPUTING">
                      Cloud Computing
                    </SelectItem>
                    <SelectItem value="CYBERSECURITY">
                      Cyber Security
                    </SelectItem>
                    <SelectItem value="GAME_DEVELOPMENT">
                      Game Development
                    </SelectItem>
                    <SelectItem value="DIGITAL_MARKETING">
                      Digital Marketing
                    </SelectItem>
                    <SelectItem value="ENTREPRENEURSHIP">
                      Entrepreneurship
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="trainerId">Trainer ID</Label>
                <Input
                  id="trainerId"
                  name="trainerId"
                  type="text"
                  value={course.trainerId}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="thumbnail">Thumbnail</Label>
                <div className="mt-1 flex items-center gap-4">
                  <Input
                    id="thumbnail"
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="cursor-pointer"
                  />
                  {thumbnailPreview && (
                    <div className="w-16 h-16 rounded-md overflow-hidden border">
                      <img
                        src={thumbnailPreview}
                        alt="Thumbnail preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Modules Section */}
        <Card className="w-[70vw]">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Course Modules</CardTitle>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addModule}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Module
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {course?.modules?.map((module, moduleIndex) => (
              <Card key={moduleIndex} className="relative">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">
                      Module {moduleIndex + 1}
                    </CardTitle>
                    {course.modules.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => removeModule(moduleIndex)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <Label>Module Title *</Label>
                      <Input
                        value={module.title}
                        onChange={(e) =>
                          handleModuleChange(
                            moduleIndex,
                            "title",
                            e.target.value
                          )
                        }
                        required
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label>Order *</Label>
                      <Input
                        type="number"
                        value={module.order}
                        onChange={(e) =>
                          handleModuleChange(
                            moduleIndex,
                            "order",
                            parseInt(e.target.value)
                          )
                        }
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={module.description}
                      onChange={(e) =>
                        handleModuleChange(
                          moduleIndex,
                          "description",
                          e.target.value
                        )
                      }
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <Label>Content Type *</Label>
                      <Select
                        value={module.contentType}
                        onValueChange={(value) =>
                          handleModuleChange(moduleIndex, "contentType", value)
                        }
                      >
                        <SelectTrigger className="w-full mt-1">
                          <SelectValue placeholder="Select content type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="markdown">Markdown</SelectItem>
                          <SelectItem value="html">HTML</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Duration (minutes)</Label>
                      <Input
                        type="number"
                        value={module.duration}
                        onChange={(e) =>
                          handleModuleChange(
                            moduleIndex,
                            "duration",
                            e.target.value
                          )
                        }
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>
                      {module.contentType === "video" ? "Video URL" : "Content"}{" "}
                      *
                    </Label>
                    {module.contentType === "video" ? (
                      <Input
                        type="url"
                        value={module.content}
                        onChange={(e) =>
                          handleModuleChange(
                            moduleIndex,
                            "content",
                            e.target.value
                          )
                        }
                        required
                        className="mt-1"
                        placeholder="https://example.com/video.mp4"
                      />
                    ) : (
                      <>
                        <Textarea
                          rows={4}
                          value={module.content}
                          onChange={(e) =>
                            handleModuleChange(
                              moduleIndex,
                              "content",
                              e.target.value
                            )
                          }
                          required
                          className="mt-1"
                        />

                        <div className="mt-4">
                          <label className="font-bold">Preview</label>
                          <div className="prose prose-lg">
                            <ReactMarkdown
                              breaks
                              remarkPlugins={[remarkGfm]}
                              // className="prose"
                            >
                              {`# Heading 1\n\n## Heading 2\n\n### Heading 3`}
                            </ReactMarkdown>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div>
                    <Label>Resources (comma separated URLs)</Label>
                    <Input
                      value={module.resources}
                      onChange={(e) =>
                        handleModuleChange(
                          moduleIndex,
                          "resources",
                          e.target.value
                        )
                      }
                      className="mt-1"
                    />
                  </div>

                  {/* Quiz Section for Module */}
                  <div className="mt-8 pt-6">
                    <Separator className="mb-6" />
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Module Quiz</h3>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newQuestion = {
                            text: "",
                            options: ["", "", "", ""],
                            correct: "",
                          }
                          const updatedModules = [...course.modules]
                          updatedModules[moduleIndex].quizzes[0].questions.push(
                            newQuestion
                          )
                          setCourse({ ...course, modules: updatedModules })
                        }}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Question
                      </Button>
                    </div>

                    {module.quizzes && module.quizzes.length > 0 && (
                      <>
                        <div>
                          <Label>Quiz Title</Label>
                          <Input
                            value={module.quizzes[0].title}
                            onChange={(e) => {
                              const updatedModules = [...course.modules]
                              updatedModules[moduleIndex].quizzes[0].title =
                                e.target.value
                              setCourse({ ...course, modules: updatedModules })
                            }}
                            className="mt-1"
                            placeholder="Quiz title"
                          />
                        </div>

                        <div className="space-y-4 mt-4">
                          {module.quizzes[0].questions.map(
                            (question, questionIndex) => (
                              <Card key={questionIndex} className="bg-muted/50">
                                <CardHeader className="pb-3">
                                  <div className="flex justify-between items-center">
                                    <CardTitle className="text-base">
                                      Question {questionIndex + 1}
                                    </CardTitle>
                                    {module.quizzes[0].questions.length > 1 && (
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="text-destructive hover:text-destructive"
                                        onClick={() => {
                                          const updatedModules = [
                                            ...course.modules,
                                          ]
                                          updatedModules[
                                            moduleIndex
                                          ].quizzes[0].questions.splice(
                                            questionIndex,
                                            1
                                          )
                                          setCourse({
                                            ...course,
                                            modules: updatedModules,
                                          })
                                        }}
                                      >
                                        <Trash className="h-4 w-4" />
                                      </Button>
                                    )}
                                  </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                  <div>
                                    <Label>Question Text *</Label>
                                    <Input
                                      value={question.text}
                                      onChange={(e) => {
                                        const updatedModules = [
                                          ...course.modules,
                                        ]
                                        updatedModules[
                                          moduleIndex
                                        ].quizzes[0].questions[
                                          questionIndex
                                        ].text = e.target.value
                                        setCourse({
                                          ...course,
                                          modules: updatedModules,
                                        })
                                      }}
                                      required
                                      className="mt-1"
                                    />
                                  </div>

                                  <div className="space-y-3">
                                    <Label>Options *</Label>
                                    {question.options.map(
                                      (option, optionIndex) => (
                                        <div
                                          key={optionIndex}
                                          className="flex items-center gap-3"
                                        >
                                          <input
                                            type="radio"
                                            name={`module-${moduleIndex}-question-${questionIndex}-correct`}
                                            checked={
                                              question.correct ===
                                              optionIndex.toString()
                                            }
                                            onChange={() => {
                                              const updatedModules = [
                                                ...course.modules,
                                              ]
                                              updatedModules[
                                                moduleIndex
                                              ].quizzes[0].questions[
                                                questionIndex
                                              ].correct = optionIndex.toString()
                                              setCourse({
                                                ...course,
                                                modules: updatedModules,
                                              })
                                            }}
                                            className="h-4 w-4 text-primary"
                                          />
                                          <Input
                                            type="text"
                                            value={option}
                                            onChange={(e) => {
                                              const updatedModules = [
                                                ...course.modules,
                                              ]
                                              updatedModules[
                                                moduleIndex
                                              ].quizzes[0].questions[
                                                questionIndex
                                              ].options[optionIndex] =
                                                e.target.value
                                              setCourse({
                                                ...course,
                                                modules: updatedModules,
                                              })
                                            }}
                                            required
                                            placeholder={`Option ${optionIndex + 1}`}
                                          />
                                        </div>
                                      )
                                    )}
                                  </div>
                                </CardContent>
                              </Card>
                            )
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/courses")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Course"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
