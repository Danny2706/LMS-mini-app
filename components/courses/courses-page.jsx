"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Users,
  Star,
  Play,
  Search,
  Heart,
  Bookmark,
  Share2,
  BarChart2,
  Award,
  CheckCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { setCourses } from "@/globalStates/features/courses/courseSlices"
import { useDispatch, useSelector } from "react-redux"
// import { Progress } from "@/components/ui/progress"
// import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function CoursesPage({ onBack }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [expandedCourse, setExpandedCourse] = useState(null)
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false)
  const [bookmarkedCourses, setBookmarkedCourses] = useState([])
  const [sortOption, setSortOption] = useState("popular")
  const router = useRouter()

  const { courses } = useSelector((store) => store.courses)
  const dispatch = useDispatch()

  const { isLoading: loading } = useQuery({
    queryKey: ["userCourses"],
    queryFn: async () => {
      const res = await axios.get("/api/courses", {
        withCredentials: true,
      })
      if (res.data.success) {
        dispatch(setCourses(res.data.courses))
      }
      return res.data
    },
    onError: (error) => {
      console.error("Failed to fetch courses", error)
      console.error("React Query Error:", error.response?.data || error.message)
    },
  })

  const categories = [
    "all",
    "Frontend",
    "Backend",
    "Design",
    "Programming",
    "Data Science",
    "Mobile",
    "DevOps",
    "AI/ML",
  ]

  const toggleExpand = (courseId) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId)
  }

  const toggleBookmark = (courseId) => {
    setBookmarkedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    )
  }

  const filteredCourses = courses
    .filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory =
        selectedCategory === "all" || course.category === selectedCategory

      const matchesBookmark =
        !showBookmarkedOnly || bookmarkedCourses.includes(course.id)

      return matchesSearch && matchesCategory && matchesBookmark
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "popular":
          return (b.enrollments?.length || 0) - (a.enrollments?.length || 0)
        case "rating":
          return (b.rating || 0) - (a.rating || 0)
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt)
        case "duration":
          return (
            b.modules.reduce((sum, mod) => sum + mod.duration, 0) -
            a.modules.reduce((sum, mod) => sum + mod.duration, 0)
          )
        default:
          return 0
      }
    })

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#8DC63F]/10 to-[#006838]/10 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#8DC63F] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="mb-2 text-2xl font-bold text-gray-800">
            Loading Courses...
          </h2>
          <p className="text-gray-600">
            Fetching the latest courses from our database
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8DC63F]/10 to-[#006838]/10 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl">
              Available Courses 📚
            </h1>
            <p className="text-lg text-gray-600">
              Discover and enroll in courses that match your learning style
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={onBack}
              variant="outline"
              className="border-[#8DC63F] text-[#006838] hover:bg-[#8DC63F]/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <Card className="mb-8 border-[#8DC63F]/20">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                <Input
                  placeholder="Search courses, topics, or technologies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-[#8DC63F]/30 focus:border-[#8DC63F]"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 md:flex md:gap-4">
                <div className="w-full md:w-auto">
                  <Select
                    value={selectedCategory}
                    onValueChange={(value) => setSelectedCategory(value)}
                  >
                    <SelectTrigger className="border-[#8DC63F]/30 text-[#006838] hover:bg-[#8DC63F]/10 focus:border-[#8DC63F]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category}
                          value={category}
                          className="text-[#006838] hover:bg-[#8DC63F]/10 focus:bg-[#8DC63F]/20"
                        >
                          {category === "all" ? "All Categories" : category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full md:w-auto">
                  <Select
                    value={sortOption}
                    onValueChange={(value) => setSortOption(value)}
                  >
                    <SelectTrigger className="border-[#8DC63F]/30 text-[#006838] hover:bg-[#8DC63F]/10 focus:border-[#8DC63F]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="duration">Duration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center col-span-2 gap-2 p-2 md:col-span-1">
                  <Switch
                    id="bookmark-filter"
                    checked={showBookmarkedOnly}
                    onCheckedChange={setShowBookmarkedOnly}
                  />
                  <Label htmlFor="bookmark-filter">Bookmarked Only</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Banner */}
        <div className="grid grid-cols-2 gap-4 mb-8 md:grid-cols-4">
          <Card className="border-[#8DC63F]/20">
            <CardContent className="flex items-center p-4">
              <div className="p-3 mr-4 rounded-full bg-[#8DC63F]/10">
                <BookOpen className="text-[#006838]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Courses</p>
                <p className="text-2xl font-bold">{courses.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#8DC63F]/20">
            <CardContent className="flex items-center p-4">
              <div className="p-3 mr-4 rounded-full bg-[#8DC63F]/10">
                <Users className="text-[#006838]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Students</p>
                <p className="text-2xl font-bold">
                  {courses.reduce(
                    (sum, course) => sum + (course.enrollments?.length || 0),
                    0
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#8DC63F]/20">
            <CardContent className="flex items-center p-4">
              <div className="p-3 mr-4 rounded-full bg-[#8DC63F]/10">
                <BarChart2 className="text-[#006838]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg. Rating</p>
                <p className="text-2xl font-bold">
                  {courses.length > 0
                    ? (
                        courses.reduce(
                          (sum, course) => sum + (course.rating || 0),
                          0
                        ) / courses.length
                      ).toFixed(1)
                    : "0.0"}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#8DC63F]/20">
            <CardContent className="flex items-center p-4">
              <div className="p-3 mr-4 rounded-full bg-[#8DC63F]/10">
                <Clock className="text-[#006838]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg. Duration</p>
                <p className="text-2xl font-bold">
                  {courses.length > 0
                    ? Math.round(
                        courses.reduce(
                          (sum, course) =>
                            sum +
                            course.modules.reduce(
                              (moduleSum, module) =>
                                moduleSum + module.duration,
                              0
                            ),
                          0
                        ) / courses.length
                      )
                    : 0}{" "}
                  mins
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => {
            const totalDuration = course.modules.reduce(
              (sum, module) => sum + module.duration,
              0
            )
            const hours = Math.floor(totalDuration / 60)
            const minutes = totalDuration % 60
            const formattedDuration =
              hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
            const isBookmarked = bookmarkedCourses.includes(course.id)
            const isExpanded = expandedCourse === course.id

            return (
              <Card
                key={course.id}
                className="hover:shadow-xl py-0 transition-all duration-300 transform hover:scale-[1.02] border-[#8DC63F]/20 overflow-hidden"
              >
                <div className="relative h-72  aspect-video bg-gradient-to-br from-[#8DC63F]/20 to-[#006838]/20">
                  {course.thumbnail ? (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <BookOpen className="absolute w-16 h-16 transform -translate-x-1/2 -translate-y-1/2 text-[#006838]/50 left-1/2 top-1/2" />
                  )}
                  <div className="absolute flex gap-2 top-2 right-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`w-8 h-8 rounded-full ${isBookmarked ? "bg-[#8DC63F]/20 text-[#006838]" : "bg-white/80"}`}
                            onClick={() => toggleBookmark(course.id)}
                          >
                            <Bookmark
                              className={`w-4 h-4 ${isBookmarked ? "fill-[#006838]" : ""}`}
                            />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {isBookmarked
                            ? "Remove bookmark"
                            : "Bookmark this course"}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-2 text-xs text-white bg-gradient-to-t from-black/80 to-transparent">
                    {course.status === "published" ? (
                      <span className="flex items-center">
                        <CheckCircle className="w-3 h-3 mr-1 text-green-400" />
                        Published
                      </span>
                    ) : (
                      <span className="text-yellow-400">Draft</span>
                    )}
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <Badge className="bg-[#8DC63F]/20 text-[#006838] hover:bg-[#8DC63F]/30">
                      {course.category.replace(/_/g, " ")}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">
                        {course.rating || "4.5"}
                      </span>
                    </div>
                  </div>

                  <h3 className="mb-2 text-xl font-bold text-gray-800">
                    {course.title}
                  </h3>
                  <p className="mb-4 text-sm text-gray-600 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="mb-4 space-y-3">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formattedDuration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {course.enrollments?.length?.toLocaleString() || 0}{" "}
                        students
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>
                        By: {course.trainer?.name || "Unknown Trainer"}
                      </span>
                      <span>{course.modules?.length || 0} modules</span>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="mb-4">
                      <h4 className="mb-2 font-semibold">Course Modules:</h4>
                      <ul className="space-y-2">
                        {course.modules.map((module, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">
                              {index + 1}.
                            </span>
                            <span className="text-sm">{module.title}</span>
                            <span className="ml-auto text-xs text-gray-500">
                              {module.duration} min
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-2">
                      <Button
                        onClick={() => router.push(`/login`)}
                        className="flex-1 bg-gradient-to-r from-[#8DC63F] to-[#006838] hover:from-[#7AB82F] hover:to-[#005530] text-white"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Enroll Now
                      </Button>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className="border-[#8DC63F]/30"
                              onClick={() => toggleExpand(course.id)}
                            >
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {isExpanded ? "Show less" : "Show modules"}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredCourses.length === 0 && (
          <div className="py-12 text-center">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="mb-2 text-xl font-semibold text-gray-600">
              No courses found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
            <Button
              variant="ghost"
              className="mt-4 text-[#006838]"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
                setShowBookmarkedOnly(false)
              }}
            >
              Reset filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
