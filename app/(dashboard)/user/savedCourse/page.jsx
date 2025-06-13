"use client"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bookmark } from "lucide-react"
import { useSelector } from "react-redux"
import Image from "next/image"
import useSavedCourses from "@/lib/useSavedCourse"

export default function SavedCourse() {
  const { user } = useSelector((store) => store.auth)
  const { data: savedCourses, isLoading: loading } = useSavedCourses(user?.id)

  return (
    <section className="mb-12 py-4">
      <div className="px-6 mt-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Bookmark className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            Saved For Later
          </h2>
          <Button variant="ghost" className="text-blue-600">
            View All
          </Button>
        </div>

        {loading ? (
          <p className="">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedCourses.map((course) => (
              <Card
                key={course.id}
                className="hover:shadow-md transition-shadow group min-h-64 py-0 pb-2"
              >
                {/* Course thumbnail */}
                <CardContent className="px-0 py-0 flex-shrink-0">
                  <div className="w-full h-40 relative">
                    <Image
                      src={
                        // course.thumbnail ||
                        "https://picsum.photos/400/300"
                      }
                      alt={course.title}
                      fill
                      className="object-cover rounded-t-lg"
                      sizes="(max-width: 768px) 100vw, 384px"
                    />
                  </div>
                </CardContent>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{course.course.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {course.instructor} • {course.duration}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">
                      {formatEnumText(course.course.category)}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-gray-600 line-clamp-3">
                      {course.course.description ||
                        " This course covers advanced TypeScript concepts and best practices."}
                    </p>
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between gap-2">
                  <Button className="flex-1">Enroll Now</Button>
                </CardFooter>
              </Card>
            ))}

            {/* Empty state example */}
            {!loading && savedCourses.length === 0 && (
              <div className="col-span-full text-center py-12">
                <Bookmark className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium mb-1">
                  No saved courses yet
                </h3>
                <p className="text-muted-foreground mb-4">
                  Save courses you're interested in to find them later
                </p>
                <Button>Browse Courses</Button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
function formatEnumText(enumValue) {
  return enumValue
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}
