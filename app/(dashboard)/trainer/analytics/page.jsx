"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Users, BookOpen, TrendingUp, Clock } from "lucide-react";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Sample data - In a real app, this would come from your API
const studentProgressData = [
  { month: "Jan", progress: 65 },
  { month: "Feb", progress: 72 },
  { month: "Mar", progress: 80 },
  { month: "Apr", progress: 75 },
  { month: "May", progress: 85 },
  { month: "Jun", progress: 90 },
];

const courseEngagementData = [
  { course: "Web Development", students: 45, completion: 75 },
  { course: "React Basics", students: 38, completion: 82 },
  { course: "Node.js Advanced", students: 29, completion: 68 },
  { course: "UI/UX Design", students: 33, completion: 70 },
];

const assessmentDistributionData = [
  { name: "Excellent", value: 35, color: "#8dc63f" },
  { name: "Good", value: 45, color: "#006838" },
  { name: "Average", value: 15, color: "#ffd700" },
  { name: "Needs Improvement", value: 5, color: "#ff6b6b" },
];

export default function AnalyticsPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("month");

  return (
    <div className="container mx-auto px-4 pb-8 mt-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#006838] to-[#8dc63f] rounded-lg p-6 text-white my-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Analytics Dashboard</h1>
            <p className="text-blue-100">
              Track your teaching performance and student progress
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">78%</div>
            <div className="text-sm text-blue-100">Overall Success Rate</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-base font-medium">
              Total Students
            </CardTitle>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
              <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145</div>
            <div className="flex items-center space-x-2 mt-1">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <p className="text-sm text-muted-foreground">+12% this month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-base font-medium">
              Active Courses
            </CardTitle>
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
              <BookOpen className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <div className="flex items-center space-x-2 mt-1">
              <Clock className="h-4 w-4 text-blue-500" />
              <p className="text-sm text-muted-foreground">2 upcoming</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-base font-medium">
              Completion Rate
            </CardTitle>
            <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
              <TrendingUp className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82%</div>
            <Progress value={82} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-base font-medium">Avg. Score</CardTitle>
            <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full">
              <Calendar className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78/100</div>
            <Badge variant="secondary" className="mt-2">
              Top 25%
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Graphs Section */}
      <div className="space-y-6">
        {/* Time Range Selector */}
        <div className="flex justify-end">
          <Tabs value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <TabsList>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Student Progress Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Student Progress Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={studentProgressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="progress"
                    stroke="#006838"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Course Engagement */}
        <Card>
          <CardHeader>
            <CardTitle>Course Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={courseEngagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="course" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="students" fill="#006838" name="Students" />
                  <Bar
                    dataKey="completion"
                    fill="#8dc63f"
                    name="Completion %"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Assessment Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Assessment Performance Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={assessmentDistributionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label
                  >
                    {assessmentDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
