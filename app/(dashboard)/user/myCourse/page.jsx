"use client"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  CheckCircle,
  Clock,
  ArrowRight,
  Loader,
  Ban,
} from "lucide-react"
import TopHeader from "@/components/userUi/TopHeader"
import { useEffect, useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"

export default function CourseDashboard() {
  const router = useRouter()
  const { user } = useSelector((store) => store.auth)
  const {
    enrolledCourses,
    completedCourses,
    isEnrollLoading,
    isCompletedLoading,
  } = useSelector((store) => store.courses)

  return (
    <div className="container px-4 pt-4 mx-auto">
      <div className="mb-8 mt-7">
        <h1 className="text-3xl font-bold mb-2 text-[#006838]">
          My Learning Dashboard
        </h1>
        <p className="text-muted-foreground">
          Track your progress and continue learning
        </p>
      </div>

      {/* Enrolled Courses Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="flex items-center gap-2 text-2xl font-semibold">
            <BookOpen className="h-5 w-5 text-[#006838]" />
            Enrolled Courses
          </h2>
        </div>
        {isEnrollLoading && (
          <div className="w-full h-[20vh] flex items-center justify-center">
            <Loader className="w-5 h-5 animate-spin" />
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {enrolledCourses && enrolledCourses.length > 0 ? (
            enrolledCourses.map((course) => (
              <Card
                key={course.id}
                className="hover:shadow-md transition-shadow border-[#8dc63f]/50 dark:border-[#8dc63f]/5"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{course.course.title}</CardTitle>
                      <CardDescription className="mt-1 text-[#8dc63f]">
                        {course.user.name} • {course.duration}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className={"dark:text-[#f9f9f9]"}>
                      {course.course.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between mb-1 text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress
                      value={course.progress}
                      className="h-2 [&>div]:bg-[#006838]"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    onClick={() => {
                      router.push(`/user/course/${course.id}`)
                    }}
                    variant="outline"
                    className={
                      "cursor-pointer bg-gradient-to-r from-[#006838] to-[#8dc63f] text-white hover:bg-gradient-to-r hover:from-[#006838] hover:to-[#8dc63f] hover:text-white"
                    }
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Continue Learning
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-6 bg-[#f8f8f8] rounded-xl shadow-sm text-center">
              <Ban className="w-10 h-10 text-[#006838] mb-4" />
              <h3 className="mb-1 text-lg font-semibold text-charcoal">
                No Enrolled Courses Found
              </h3>
              <p className="text-sm text-gray-500">
                You haven't enrolled to any courses yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Completed Courses Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="flex items-center gap-2 text-2xl font-semibold">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Completed Courses
          </h2>
        </div>

        {isCompletedLoading && (
          <div className="w-full h-[20vh] flex items-center justify-center">
            <Loader className="w-5 h-5 animate-spin" />
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {completedCourses && completedCourses.length > 0 ? (
            completedCourses.map((course) => (
              <Card
                key={course.id}
                className="transition-shadow hover:shadow-md"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{course.course.title}</CardTitle>
                      <CardDescription className="mt-1 text-[#8dc63f]">
                        {course.user.name} • {course.duration}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">{course.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-4 text-sm text-green-600">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Completed on {course.completedDate}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" className={"cursor-pointer"}>
                    View Certificate
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-6 bg-[#f8f8f8] rounded-xl shadow-sm text-center">
              <Ban className="w-10 h-10 text-[#006838] mb-4" />
              <h3 className="mb-1 text-lg font-semibold text-charcoal">
                No Completed Courses Found
              </h3>
              <p className="text-sm text-gray-500">
                You haven't completed any courses yet. Keep learning and they’ll
                show up here!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
