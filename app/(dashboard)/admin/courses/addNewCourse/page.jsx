"use client"

import { useEffect, useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { useRouter } from "next/navigation"
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
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"
import { customToast } from "@/lib/Toast"
import { useSelector } from "react-redux"
import TrainerSelector from "@/components/adminUi/TrainerSelector"

export default function CreateCoursePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user } = useSelector((store) => store.auth)
  console.log(user)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
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
    },
  })

  const {
    fields: moduleFields,
    append: appendModule,
    remove: removeModule,
  } = useFieldArray({
    control,
    name: "modules",
  })

  const [thumbnailPreview, setThumbnailPreview] = useState(null)

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const previewUrl = URL.createObjectURL(file)
      setThumbnailPreview(previewUrl)
      setValue("thumbnail", file)
    }
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append("title", data.title)
      formData.append("description", data.description)
      formData.append("status", data.status)
      formData.append("thumbnail", data.thumbnail)
      formData.append("category", data.category)
      formData.append("trainerId", data.trainerId)
      formData.append("userId", user?.id)

      formData.append("modules", JSON.stringify(data.modules))

      const response = await fetch("/api/courses", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to create course")
      }

      const result = await response.json()
      customToast.success("Course created successfully!")
      reset()
    } catch (error) {
    } finally {
      setIsSubmitting(false)
      setThumbnailPreview(null)
    }
  }

  const addNewModule = () => {
    appendModule({
      title: "",
      description: "",
      contentType: "",
      order: moduleFields.length + 1,
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
    })
  }

  const removeModuleAtIndex = (index) => {
    if (moduleFields.length > 1) {
      removeModule(index)
    } else {
    }
  }

  const addQuestionToQuiz = (moduleIndex) => {
    const questions = watch(`modules.${moduleIndex}.quiz.questions`)
    setValue(`modules.${moduleIndex}.quiz.questions`, [
      ...questions,
      {
        text: "",
        options: ["", "", "", ""],
        correct: "",
      },
    ])
  }

  const removeQuestionFromQuiz = (moduleIndex, questionIndex) => {
    const questions = watch(`modules.${moduleIndex}.quiz.questions`)
    if (questions.length > 1) {
      const newQuestions = [...questions]
      newQuestions.splice(questionIndex, 1)
      setValue(`modules.${moduleIndex}.quiz.questions`, newQuestions)
    } else {
      customToast.error("Quiz must have at least one question")
    }
  }

  useEffect(() => {
    console.log(user)
  }, [])

  return (
    <div className=" p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Create New Course</h1>
        <Badge variant="outline" className="text-sm">
          {watch("status") || "Draft"}
        </Badge>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Course Basic Info Section */}
        <Card className={"w-[70vw]"}>
          <CardHeader>
            <CardTitle>Course Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Course Title *</Label>
                <Input
                  id="title"
                  type="text"
                  {...register("title", {
                    required: "Course title is required",
                  })}
                  className="mt-1"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  rows={3}
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className="mt-1"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="status">Status *</Label>
                <Select
                  onValueChange={(value) => setValue("status", value)}
                  defaultValue={watch("status")}
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
                  onValueChange={(value) => setValue("category", value)}
                  defaultValue={watch("category")}
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="WEB_DEVELOPMENT">
                      Web Development
                    </SelectItem>
                    <SelectItem value="MOBILE_DEVELOPMENT">
                      Mobile Development
                    </SelectItem>
                    <SelectItem value="DATA_SCIENCE">Date Science</SelectItem>
                    <SelectItem value="CLOUD_COMPUTING">
                      Cloud computing
                    </SelectItem>
                    <SelectItem value="CYBERSECURITY">
                      Cyber security
                    </SelectItem>
                    <SelectItem value="GAME_DEVELOPMENT">
                      Game development
                    </SelectItem>
                    <SelectItem value="DIGITAL_MARKETING">
                      Digital marketing
                    </SelectItem>
                    <SelectItem value="ENTREPRENEURSHIP">
                      Enterpernership
                    </SelectItem>
                  </SelectContent>
                </Select>

                {errors.category && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.category.message}
                  </p>
                )}
              </div>
              <div>
                <TrainerSelector
                  onSelect={(id) => {
                    setValue("trainerId", id)
                  }}
                />
              </div>

              <div>
                <Label htmlFor="thumbnail">Thumbnail *</Label>
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
                {errors.thumbnail && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.thumbnail.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Modules Section */}
        <Card className={"w-[70vw]"}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Course Modules</CardTitle>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addNewModule}
              >
                Add Module
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {moduleFields.map((module, moduleIndex) => (
              <Card key={module.id} className="relative">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">
                      Module {moduleIndex + 1}
                    </CardTitle>
                    {moduleFields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => removeModuleAtIndex(moduleIndex)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor={`modules.${moduleIndex}.title`}>
                        Module Title *
                      </Label>
                      <Input
                        id={`modules.${moduleIndex}.title`}
                        type="text"
                        {...register(`modules.${moduleIndex}.title`, {
                          required: "Module title is required",
                        })}
                        className="mt-1"
                      />
                      {errors.modules?.[moduleIndex]?.title && (
                        <p className="mt-1 text-sm text-destructive">
                          {errors.modules[moduleIndex].title.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor={`modules.${moduleIndex}.order`}>
                        Order *
                      </Label>
                      <Input
                        id={`modules.${moduleIndex}.order`}
                        type="number"
                        {...register(`modules.${moduleIndex}.order`, {
                          required: "Order is required",
                          valueAsNumber: true,
                        })}
                        className="mt-1"
                      />
                      {errors.modules?.[moduleIndex]?.order && (
                        <p className="mt-1 text-sm text-destructive">
                          {errors.modules[moduleIndex].order.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor={`modules.${moduleIndex}.description`}>
                      Description
                    </Label>
                    <Textarea
                      id={`modules.${moduleIndex}.description`}
                      rows={2}
                      {...register(`modules.${moduleIndex}.description`)}
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor={`modules.${moduleIndex}.contentType`}>
                        Content Type *
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          setValue(`modules.${moduleIndex}.contentType`, value)
                        }
                        defaultValue={watch(
                          `modules.${moduleIndex}.contentType`
                        )}
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
                      {errors.modules?.[moduleIndex]?.contentType && (
                        <p className="mt-1 text-sm text-destructive">
                          {errors.modules[moduleIndex].contentType.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor={`modules.${moduleIndex}.duration`}>
                        Duration (minutes)
                      </Label>
                      <Input
                        id={`modules.${moduleIndex}.duration`}
                        type="number"
                        {...register(`modules.${moduleIndex}.duration`, {
                          valueAsNumber: true,
                        })}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor={`modules.${moduleIndex}.content`}>
                      {watch(`modules.${moduleIndex}.contentType`) === "video"
                        ? "Video URL"
                        : "Content"}{" "}
                      *
                    </Label>
                    {watch(`modules.${moduleIndex}.contentType`) === "video" ? (
                      <Input
                        type="url"
                        {...register(`modules.${moduleIndex}.content`, {
                          required: "Video URL is required",
                          pattern: {
                            value: /^(https?:\/\/).*/,
                            message:
                              "Must be a valid URL starting with http:// or https://",
                          },
                        })}
                        className="mt-1"
                        placeholder="https://example.com/video.mp4"
                      />
                    ) : (
                      <Textarea
                        rows={4}
                        {...register(`modules.${moduleIndex}.content`, {
                          required: "Content is required",
                        })}
                        className="mt-1"
                        placeholder={
                          watch(`modules.${moduleIndex}.contentType`) ===
                          "markdown"
                            ? "Enter markdown content..."
                            : "Enter HTML content..."
                        }
                      />
                    )}
                    {errors.modules?.[moduleIndex]?.content && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.modules[moduleIndex].content.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor={`modules.${moduleIndex}.resources`}>
                      Resources (comma separated URLs)
                    </Label>
                    <Input
                      id={`modules.${moduleIndex}.resources`}
                      type="text"
                      {...register(`modules.${moduleIndex}.resources`)}
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
                        onClick={() => addQuestionToQuiz(moduleIndex)}
                      >
                        Add Question
                      </Button>
                    </div>

                    <div>
                      <Label htmlFor={`modules.${moduleIndex}.quiz.title`}>
                        Quiz Title
                      </Label>
                      <Input
                        id={`modules.${moduleIndex}.quiz.title`}
                        type="text"
                        {...register(`modules.${moduleIndex}.quiz.title`)}
                        className="mt-1"
                        placeholder="Quiz title (optional)"
                      />
                    </div>

                    <div className="space-y-4 mt-4">
                      {watch(`modules.${moduleIndex}.quiz.questions`)?.map(
                        (question, questionIndex) => (
                          <Card key={questionIndex} className="bg-muted/50">
                            <CardHeader className="pb-3">
                              <div className="flex justify-between items-center">
                                <CardTitle className="text-base">
                                  Question {questionIndex + 1}
                                </CardTitle>
                                {watch(`modules.${moduleIndex}.quiz.questions`)
                                  .length > 1 && (
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="text-destructive hover:text-destructive"
                                    onClick={() =>
                                      removeQuestionFromQuiz(
                                        moduleIndex,
                                        questionIndex
                                      )
                                    }
                                  >
                                    Remove
                                  </Button>
                                )}
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div>
                                <Label
                                  htmlFor={`modules.${moduleIndex}.quiz.questions.${questionIndex}.text`}
                                >
                                  Question Text *
                                </Label>
                                <Input
                                  id={`modules.${moduleIndex}.quiz.questions.${questionIndex}.text`}
                                  type="text"
                                  {...register(
                                    `modules.${moduleIndex}.quiz.questions.${questionIndex}.text`,
                                    {
                                      required: "Question text is required",
                                    }
                                  )}
                                  className="mt-1"
                                />
                                {errors.modules?.[moduleIndex]?.quiz
                                  ?.questions?.[questionIndex]?.text && (
                                  <p className="mt-1 text-sm text-destructive">
                                    {
                                      errors.modules[moduleIndex].quiz
                                        .questions[questionIndex].text.message
                                    }
                                  </p>
                                )}
                              </div>

                              <div className="space-y-3">
                                <Label>Options *</Label>
                                {[0, 1, 2, 3].map((optionIndex) => (
                                  <div
                                    key={optionIndex}
                                    className="flex items-center gap-3"
                                  >
                                    <input
                                      type="radio"
                                      {...register(
                                        `modules.${moduleIndex}.quiz.questions.${questionIndex}.correct`,
                                        {
                                          required:
                                            "Please select the correct answer",
                                        }
                                      )}
                                      value={optionIndex}
                                      className="h-4 w-4 text-primary"
                                    />
                                    <Input
                                      type="text"
                                      {...register(
                                        `modules.${moduleIndex}.quiz.questions.${questionIndex}.options.${optionIndex}`,
                                        {
                                          required: "Option text is required",
                                        }
                                      )}
                                      placeholder={`Option ${optionIndex + 1}`}
                                    />
                                  </div>
                                ))}
                                {errors.modules?.[moduleIndex]?.quiz
                                  ?.questions?.[questionIndex]?.correct && (
                                  <p className="mt-1 text-sm text-destructive">
                                    {
                                      errors.modules[moduleIndex].quiz
                                        .questions[questionIndex].correct
                                        .message
                                    }
                                  </p>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        )
                      )}
                    </div>
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
                Creating...
              </>
            ) : (
              "Create Course"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
