"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BookOpen,
  Award,
  Target,
  TrendingUp,
  Calendar,
  Clock,
  CheckCircle,
  BarChart3,
  Download,
} from "lucide-react"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"

const chartConfig = {
  completed: {
    label: "Completed",
    color: "#006838",
    darkColor: "#8dc63f",
  },
  inProgress: {
    label: "In Progress",
    color: "#8dc63f",
    darkColor: "#006838",
  },
  score: {
    label: "Score",
    color: "#006838",
    darkColor: "#8dc63f",
  },
}

// Mock student data
const studentProfile = {
  name: "Alex Johnson",
  email: "alex.johnson@student.edu",
  profilePic: "/placeholder.svg?height=80&width=80",
  joinDate: "2023-09-15",
  totalCourses: 12,
  completedCourses: 8,
  totalCertifications: 5,
  averageScore: 87.5,
  studyStreak: 23,
  totalStudyHours: 156,
}

const learningProgress = [
  { month: "Sep", completed: 2, inProgress: 1 },
  { month: "Oct", completed: 3, inProgress: 2 },
  { month: "Nov", completed: 5, inProgress: 1 },
  { month: "Dec", completed: 6, inProgress: 2 },
  { month: "Jan", completed: 8, inProgress: 3 },
  { month: "Feb", completed: 8, inProgress: 4 },
]

const quizPerformance = [
  { subject: "Mathematics", score: 92, attempts: 3 },
  { subject: "Science", score: 85, attempts: 2 },
  { subject: "History", score: 78, attempts: 4 },
  { subject: "Literature", score: 94, attempts: 1 },
  { subject: "Geography", score: 88, attempts: 2 },
]

const courseProgress = [
  {
    name: "Advanced Mathematics",
    progress: 100,
    status: "completed",
    grade: "A",
  },
  {
    name: "Physics Fundamentals",
    progress: 85,
    status: "in-progress",
    grade: "B+",
  },
  { name: "World History", progress: 100, status: "completed", grade: "A-" },
  { name: "Creative Writing", progress: 60, status: "in-progress", grade: "B" },
  { name: "Computer Science", progress: 100, status: "completed", grade: "A+" },
]

const studyTimeData = [
  { day: "Mon", hours: 3.5 },
  { day: "Tue", hours: 2.8 },
  { day: "Wed", hours: 4.2 },
  { day: "Thu", hours: 3.1 },
  { day: "Fri", hours: 2.5 },
  { day: "Sat", hours: 5.0 },
  { day: "Sun", hours: 3.8 },
]

const achievements = [
  {
    title: "Perfect Score",
    description: "Achieved 100% on Mathematics Quiz",
    date: "2024-01-15",
    icon: "🏆",
  },
  {
    title: "Study Streak",
    description: "20 consecutive days of learning",
    date: "2024-01-10",
    icon: "🔥",
  },
  {
    title: "Course Master",
    description: "Completed Advanced Mathematics",
    date: "2024-01-05",
    icon: "🎓",
  },
  {
    title: "Quick Learner",
    description: "Finished course in record time",
    date: "2023-12-28",
    icon: "⚡",
  },
]

export default function StudentAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("6m")

  const completionRate = Math.round(
    (studentProfile.completedCourses / studentProfile.totalCourses) * 100
  )

  return (
    <div className="min-h-screen bg-background p-6 w-full">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header with Student Profile */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#006838]">
                My Learning Analytics
              </h1>
            </div>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-l-4 border-l-[#006838]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Courses Completed
              </CardTitle>
              <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {studentProfile.completedCourses}/{studentProfile.totalCourses}
              </div>
              <Progress value={completionRate} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {completionRate}% completion rate
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-[#8dc63f] dark:border-l-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Certifications Earned
              </CardTitle>
              <Award className="h-4 w-4 text-[#8dc63f] dark:text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {studentProfile.totalCertifications}
              </div>
              <p className="text-xs text-[#8dc63f] dark:text-primary mt-1">
                +2 this month
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-[#006838]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Score
              </CardTitle>
              <Target className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {studentProfile.averageScore}%
              </div>
              <p className="text-xs text-[#8dc63f] dark:text-primary mt-1">
                +3.2% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-[#8dc63f] dark:border-l-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Study Streak
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-[#8dc63f] dark:text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {studentProfile.studyStreak} days
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Keep it up! 🔥
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Analytics Tabs */}
        <Tabs defaultValue="progress" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 bg-muted">
            <TabsTrigger
              value="progress"
              className="data-[state=active]:bg-[#006838] data-[state=active]:text-primary-foreground"
            >
              Learning Progress
            </TabsTrigger>
            <TabsTrigger
              value="performance"
              className="data-[state=active]:bg-[#006838] data-[state=active]:text-primary-foreground"
            >
              Quiz Performance
            </TabsTrigger>
            <TabsTrigger
              value="courses"
              className="data-[state=active]:bg-[#006838] data-[state=active]:text-primary-foreground"
            >
              My Courses
            </TabsTrigger>
            <TabsTrigger
              value="achievements"
              className="data-[state=active]:bg-[#006838] data-[state=active]:text-primary-foreground"
            >
              Achievements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="progress" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-foreground">
                    Learning Progress Over Time
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Your course completion journey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={learningProgress}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          className="stroke-muted"
                        />
                        <XAxis dataKey="month" stroke="#888" />
                        <YAxis stroke="#888" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="completed"
                          stroke="#006838"
                          strokeWidth={3}
                          dot={{ fill: "#006838", strokeWidth: 2, r: 4 }}
                          className="dark:stroke-[#8dc63f] dark:[&>dot]:fill-[#8dc63f]"
                        />
                        <Line
                          type="monotone"
                          dataKey="inProgress"
                          stroke="#8dc63f"
                          strokeWidth={3}
                          dot={{ fill: "#8dc63f", strokeWidth: 2, r: 4 }}
                          className="dark:stroke-[#006838] dark:[&>dot]:fill-[#006838]"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-foreground">
                    Weekly Study Time
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Hours spent learning this week
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={studyTimeData}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          className="stroke-muted"
                        />
                        <XAxis dataKey="day" stroke="#888" />
                        <YAxis stroke="#888" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar
                          dataKey="hours"
                          fill="#8dc63f"
                          className="dark:fill-[#006838]"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <div className="mt-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Total this week:{" "}
                      <span className="font-bold text-primary">25.9 hours</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">
                  Quiz Performance by Subject
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Your scores across different subjects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quizPerformance.map((subject, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <BarChart3 className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {subject.subject}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {subject.attempts} attempts
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">
                            {subject.score}%
                          </p>
                        </div>
                        <div className="w-20">
                          <Progress value={subject.score} className="h-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">
                  My Enrolled Courses
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Track your progress in each course
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courseProgress.map((course, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-[#8dc63f]/10 dark:bg-primary/10 flex items-center justify-center">
                          {course.status === "completed" ? (
                            <CheckCircle className="h-5 w-5 text-primary" />
                          ) : (
                            <Clock className="h-5 w-5 text-[#8dc63f] dark:text-primary" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {course.name}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Progress
                              value={course.progress}
                              className="w-32 h-2"
                            />
                            <span className="text-sm text-muted-foreground">
                              {course.progress}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={
                            course.status === "completed"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            course.status === "completed"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }
                        >
                          {course.status === "completed"
                            ? "Completed"
                            : "In Progress"}
                        </Badge>
                        <div className="text-right">
                          <p className="font-bold text-primary">
                            {course.grade}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-foreground">
                    Recent Achievements
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Your latest accomplishments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">
                            {achievement.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {achievement.description}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {achievement.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-foreground">
                    Learning Stats
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Your learning journey by the numbers
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Total Study Hours
                    </span>
                    <span className="font-bold text-primary">
                      {studentProfile.totalStudyHours}h
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Modules Completed
                    </span>
                    <span className="font-bold text-[#8dc63f] dark:text-primary">
                      127
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Quizzes Taken
                    </span>
                    <span className="font-bold text-primary">45</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Assessments Passed
                    </span>
                    <span className="font-bold text-[#8dc63f] dark:text-primary">
                      38
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Favorite Courses
                    </span>
                    <span className="font-bold text-primary">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Member Since
                    </span>
                    <span className="font-bold text-foreground">
                      {studentProfile.joinDate}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
