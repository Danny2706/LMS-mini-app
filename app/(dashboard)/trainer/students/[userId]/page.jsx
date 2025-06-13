"use client"

import { useParams, useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import {
  Loader,
  AlertCircle,
  BookOpen,
  CheckCircle,
  Clock,
  Trophy,
  BarChart2,
  User,
  FileText,
  ListChecks,
  Award,
  ArrowLeft,
} from "lucide-react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Page() {
  const { userId } = useParams()
  const router = useRouter()

  const {
    data: student,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["trainerStudentDetails", userId],
    queryFn: async () => {
      if (!userId) throw new Error("Student userId is missing")
      const response = await axios.get(
        `/api/stats/trainer/${userId}/enrollments`
      )
      return response.data
    },
    enabled: !!userId,
  })

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="w-8 h-8 animate-spin text-[#006838]" />
      </div>
    )

  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="max-w-md p-6 text-center">
          <AlertCircle className="w-10 h-10 mx-auto mb-4 text-red-500" />
          <h2 className="text-xl font-bold">Error Loading Student Data</h2>
          <p className="mt-2 text-gray-600">{error.message}</p>
          <Button className="mt-4 bg-[#006838] hover:bg-[#005530]">
            Try Again
          </Button>
        </div>
      </div>
    )

  const activeCourses =
    student?.enrollments?.filter((course) => !course.completed) || []
  const completedCourses =
    student?.enrollments?.filter((course) => course.completed) || []

  const renderModuleStatus = (module) => {
    if (!module.completedStatus) {
      return (
        <Badge variant="outline" className="text-yellow-600 bg-yellow-50">
          Pending
        </Badge>
      )
    }
    return (
      <div className="flex items-center gap-2">
        <Badge className="bg-green-600">Completed</Badge>
        {module.completedStatus.quizPassed !== null && (
          <span className="text-sm text-gray-600">
            Quiz: {module.completedStatus.quizScore}%
          </span>
        )}
      </div>
    )
  }

  const renderAssessmentCard = (assessment) => {
    const isPre = assessment.type === "PRE"
    const hasScore = assessment.score !== null

    return (
      <Card className="mb-3 border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-full ${isPre ? "bg-blue-100 text-blue-600" : "bg-purple-100 text-purple-600"}`}
            >
              {isPre ? (
                <FileText className="w-5 h-5" />
              ) : (
                <Award className="w-5 h-5" />
              )}
            </div>
            <div>
              <CardTitle className="text-sm font-medium">
                {assessment.title}
              </CardTitle>
              <CardDescription className="text-xs">
                {isPre ? "Pre-course" : "Post-course"} •{" "}
                {assessment.questionsCount} questions
              </CardDescription>
            </div>
          </div>
          {hasScore ? (
            <div
              className={`px-3 py-1 text-sm font-medium rounded-full ${isPre ? "bg-blue-50 text-blue-700" : "bg-purple-50 text-purple-700"}`}
            >
              {assessment.score}%
            </div>
          ) : (
            <Badge variant="outline">Pending</Badge>
          )}
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="p-6 mt-5 space-y-6">
      <div className="h-2">
        <span
          onClick={() => {
            router.back()
          }}
        >
          <ArrowLeft size={20} className="w-4 h-4 cursor-pointer" />
        </span>
      </div>
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600">
            Detailed progress tracking and performance analytics
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          icon={<BookOpen className="w-5 h-5" />}
          title="Active Courses"
          value={activeCourses.length}
        />
        <SummaryCard
          icon={<CheckCircle className="w-5 h-5" />}
          title="Completed Courses"
          value={completedCourses.length}
        />
        <SummaryCard
          icon={<BarChart2 className="w-5 h-5" />}
          title="Avg Progress"
          value={`${
            activeCourses.length > 0
              ? Math.round(
                  activeCourses.reduce(
                    (sum, course) => sum + course.progress,
                    0
                  ) / activeCourses.length
                )
              : 0
          }%`}
        />
        <SummaryCard
          icon={<Trophy className="w-5 h-5" />}
          title="Avg Post-Assessment"
          value={`${
            completedCourses.length > 0
              ? Math.round(
                  completedCourses.reduce((sum, course) => {
                    const post = course.assessments.find(
                      (a) => a.type === "POST"
                    )
                    return sum + (post?.score || 0)
                  }, 0) / completedCourses.length
                )
              : 0
          }%`}
        />
      </div>

      {/* Active Courses Section */}
      <Section title="Active Learning">
        {activeCourses.length > 0 ? (
          <div className="space-y-4">
            {activeCourses.map((course) => (
              <Card
                key={course.courseId}
                className="overflow-hidden border-0 shadow-sm"
              >
                <CardHeader className="bg-gradient-to-r from-[#006838]/5 to-[#8dc63f]/5">
                  <div className="flex justify-between">
                    <div>
                      <CardTitle>{course.courseTitle}</CardTitle>
                      <CardDescription className="mt-1">
                        Instructor: {course.trainer.name} •{" "}
                        {course.modules.length} modules
                      </CardDescription>
                    </div>
                    <Badge
                      variant="outline"
                      className="flex items-center border-[#006838] text-[#006838]"
                    >
                      <Clock className="w-4 h-4 mr-1" />
                      In Progress
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="mb-6">
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Course Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress
                      value={course.progress}
                      className="h-2 bg-gray-200"
                      indicatorColor="bg-[#006838]"
                    />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="mb-3 text-sm font-medium">Modules</h3>
                      <div className="space-y-3">
                        {course.modules.map((module) => (
                          <div
                            key={module.id}
                            className="flex items-center justify-between p-3 border rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <ListChecks className="w-4 h-4 text-gray-500" />
                              <span className="text-sm">{module.title}</span>
                            </div>
                            {renderModuleStatus(module)}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-3 text-sm font-medium">Assessments</h3>
                      <ScrollArea className="h-[250px]">
                        {course.assessments.map((assessment) =>
                          renderAssessmentCard(assessment)
                        )}
                      </ScrollArea>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<BookOpen className="w-10 h-10" />}
            title="No Active Courses"
            description="This student is not currently enrolled in any courses"
          />
        )}
      </Section>

      {/* Completed Courses Section */}
      <Section title="Completed Courses">
        {completedCourses.length > 0 ? (
          <Accordion type="multiple" className="space-y-4">
            {completedCourses.map((course) => (
              <AccordionItem
                key={course.courseId}
                value={course.courseId}
                className="border-0"
              >
                <Card className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-[#8dc63f]/5 to-[#006838]/5">
                    <div className="flex justify-between">
                      <div>
                        <CardTitle>{course.courseTitle}</CardTitle>
                        <CardDescription className="mt-1">
                          Instructor: {course.trainer.name} • Completed all{" "}
                          {course.modules.length} modules
                        </CardDescription>
                      </div>
                      <Badge className="flex items-center bg-[#8dc63f] text-white">
                        <Trophy className="w-4 h-4 mr-1" />
                        Completed
                      </Badge>
                    </div>
                  </CardHeader>

                  <AccordionTrigger className="p-6 hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                      <span className="text-sm font-medium">
                        View detailed results
                      </span>
                      <div className="flex items-center gap-4">
                        <div className="text-sm">
                          <span className="text-gray-600">
                            Final Assessment:{" "}
                          </span>
                          <span className="font-medium">
                            {course.assessments.find((a) => a.type === "POST")
                              ?.score || "N/A"}
                            %
                          </span>
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent>
                    <CardContent className="pt-0">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <h3 className="mb-3 text-sm font-medium">
                            Modules Completed
                          </h3>
                          <div className="space-y-3">
                            {course.modules.map((module) => (
                              <div
                                key={module.id}
                                className="p-3 border rounded-lg"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2 font-medium">
                                    <ListChecks className="w-4 h-4 text-green-600" />
                                    <span className="text-sm">
                                      {module.title}
                                    </span>
                                  </div>
                                  {module.completedStatus?.quizScore !==
                                    null && (
                                    <Badge
                                      variant="outline"
                                      className="text-green-700 bg-green-50"
                                    >
                                      Quiz: {module.completedStatus.quizScore}%
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-xs text-gray-500">
                                  Completed on:{" "}
                                  {new Date(
                                    module.completedStatus.completedAt
                                  ).toLocaleDateString()}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="mb-3 text-sm font-medium">
                            All Assessments
                          </h3>
                          <div className="space-y-3">
                            {course.assessments.map((assessment) =>
                              renderAssessmentCard(assessment)
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="flex justify-end border-t">
                      <Button
                        variant="outline"
                        className="border-[#006838] text-[#006838] hover:bg-[#006838]/10"
                      >
                        View Certificate
                      </Button>
                    </CardFooter>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <EmptyState
            icon={<CheckCircle className="w-10 h-10" />}
            title="No Completed Courses"
            description="This student hasn't completed any courses yet"
          />
        )}
      </Section>
    </div>
  )
}

// Reusable Components
function Section({ title, children }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      {children}
    </section>
  )
}

function SummaryCard({ icon, title, value }) {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <div className="p-2 rounded-full bg-[#006838]/10 text-[#006838]">
          {icon}
        </div>
        <div className="text-right">
          <CardTitle className="text-sm font-medium text-gray-600">
            {title}
          </CardTitle>
          <CardDescription className="text-2xl font-bold text-gray-800">
            {value}
          </CardDescription>
        </div>
      </CardHeader>
    </Card>
  )
}

function EmptyState({ icon, title, description }) {
  return (
    <Card className="p-8 text-center border-0 shadow-sm">
      <div className="flex items-center justify-center w-12 h-12 mx-auto text-gray-400 bg-gray-100 rounded-full">
        {icon}
      </div>
      <h3 className="mt-3 text-lg font-medium">{title}</h3>
      <p className="mt-1 text-gray-500">{description}</p>
    </Card>
  )
}
