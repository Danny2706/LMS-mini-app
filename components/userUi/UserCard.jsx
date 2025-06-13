"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import {
  ArrowRight,
  Clock,
  Bookmark,
  User,
  Loader,
  BookOpen,
  CheckCircle,
} from "lucide-react"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import axios from "axios"
import { customToast } from "@/lib/Toast"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useQueryClient } from "@tanstack/react-query"

export default function CourseCard({ course, onEnroll, onSave }) {
  const router = useRouter()
  const queryClient = useQueryClient()

  const [isSaved, setIsSaved] = useState(false)
  const [isEnrolling, setIsEnrolling] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { user } = useSelector((store) => store.auth)
  const { enrolledCourses, completedCourses } = useSelector(
    (store) => store.courses
  )

  const isEnrolled = enrolledCourses.some(
    (item) => item.courseId === course.id && item.user?.id === user?.id
  )

  const isCompleted = completedCourses.some(
    (item) => item.courseId === course.id && item.user?.id === user?.id
  )

  const handleEnroll = async () => {
    try {
      setIsEnrolling(true)
      const res = await axios.post(
        `/api/enrollments`,
        { userId: user?.id, courseId: course.id },
        { withCredentials: true }
      )

      if (res.data.success) {
        customToast.success(
          "You have been successfully enrolled into " + course.title
        )
        setIsDialogOpen(false)
        router.push(`/user/assessment?courseId=${course.id}`)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsEnrolling(false)
    }
  }

  const handleSaveClick = async () => {
    try {
      const res = await axios.post(
        "/api/favorites",
        { userId: user?.id, courseId: course?.id },
        { withCredentials: true }
      )
      if (res.data.success) {
        customToast.success(course.title + " added to favorites!")
        setIsSaved(true)
        onSave?.(course.id)
        queryClient.invalidateQueries({ queryKey: ["savedCourses"] })
      }
    } catch (error) {
      console.error("Error adding favorite:", error)
    }
  }

  const totalMinutes = course?.modules?.reduce(
    (sum, module) => sum + (module.duration || 0),
    0
  )
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  const durationText =
    hours > 0 ? `${hours}h ${minutes > 0 ? `${minutes}m` : ""}` : `${minutes}m`

  return (
    <>
      <Card className="w-full md:w-96 min-h-96 shadow-lg hover:shadow-xl transition-shadow py-0 pb-9 relative flex flex-col border-[#e0e0e0] dark:border-[#333] group overflow-hidden">
        {/* Save */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 z-10 rounded-full bg-white/90 hover:bg-white dark:bg-[#1a1a1a]/90 dark:hover:bg-[#1a1a1a]"
          onClick={handleSaveClick}
        >
          <Bookmark
            className={`h-5 w-5 ${isSaved ? "fill-[#8dc63f] text-[#006838] dark:text-[#8dc63f]" : "text-gray-400"}`}
          />
        </Button>

        {/* Category */}
        <Badge className="absolute z-10 top-2 left-2 bg-[#006838] hover:bg-[#006838]/90 text-white dark:bg-[#8dc63f] dark:hover:bg-[#8dc63f]/90 dark:text-[#1a1a1a]">
          {course.category?.replace(/_/g, " ") || "General"}
        </Badge>

        {/* Thumbnail */}
        <CardContent className="px-0 py-0 flex-shrink-0 relative">
          {course.thumbnail ? (
            <>
              <Image
                src={course.thumbnail}
                alt={course.title}
                width={200}
                height={50}
                className="w-full h-[215px] object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#006838]/30 to-transparent rounded-t-xl" />
            </>
          ) : (
            <div className="aspect-video bg-gradient-to-r from-[#006838] to-[#8dc63f] flex items-center justify-center rounded-t-xl">
              <BookOpen className="h-12 w-12 text-white" />
            </div>
          )}
        </CardContent>

        {/* Info */}
        <CardHeader className="flex-shrink">
          <CardTitle className="text-xl font-bold line-clamp-2 text-primary">
            {course.title}
          </CardTitle>
          <div className="flex items-center text-sm text-[#006838]/80 dark:text-[#8dc63f]/80 mt-1 gap-2">
            <Clock className="w-4 h-4" />
            <span>{durationText}</span>
          </div>
          <div className="flex items-center text-sm text-[#006838]/80 dark:text-[#8dc63f]/80 gap-2">
            <User className="w-4 h-4" />
            <span>By {course.trainer?.name || "Unknown"}</span>
          </div>
        </CardHeader>

        {/* Description */}
        <CardContent className="flex-grow">
          <p className="text-[#333] dark:text-[#e0e0e0] line-clamp-3 text-base">
            {course.description.length > 50
              ? course.description.slice(0, 50) + "..."
              : course.description}
          </p>
        </CardContent>

        {/* Footer Actions */}
        <CardFooter className="flex justify-between items-center">
          {isCompleted ? (
            <Button
              disabled
              className="bg-[#006838] hover:bg-[#006838]/90 text-white dark:bg-[#8dc63f] dark:hover:bg-[#8dc63f]/90 dark:text-[#1a1a1a]"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Completed
            </Button>
          ) : isEnrolled ? (
            <Button
              onClick={() => router.push(`/user/course/${course.id}`)}
              className="bg-gradient-to-r from-[#006838] to-[#8dc63f] text-white hover:from-[#006838]/90 hover:to-[#8dc63f]/90"
            >
              Continue Learning <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="bg-gradient-to-r from-[#006838] to-[#8dc63f] text-white hover:from-[#006838]/90 hover:to-[#8dc63f]/90"
            >
              Enroll <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Confirm Enroll Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-[#006838] dark:text-[#8dc63f]">
              Confirm Enrollment
            </DialogTitle>
            <DialogDescription className="text-[#333] dark:text-[#e0e0e0]">
              Do you want to enroll in{" "}
              <strong className="text-[#006838] dark:text-[#8dc63f]">
                {course.title}
              </strong>
              ?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="border-[#006838] text-[#006838] hover:bg-[#006838]/10 dark:border-[#8dc63f] dark:text-[#8dc63f] dark:hover:bg-[#8dc63f]/10"
            >
              Cancel
            </Button>
            {isEnrolling ? (
              <Button
                disabled
                className="bg-[#006838] cursor-not-allowed text-white dark:bg-[#8dc63f] dark:text-[#1a1a1a]"
              >
                <Loader className="animate-spin w-5 h-5 mr-2" />
                Enrolling...
              </Button>
            ) : (
              <Button
                onClick={handleEnroll}
                className="bg-gradient-to-r from-[#006838] to-[#8dc63f] text-white hover:from-[#006838]/90 hover:to-[#8dc63f]/90"
              >
                Confirm
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
