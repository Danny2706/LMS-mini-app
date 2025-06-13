"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ClipboardList,
  Plus,
  Search,
  FileEdit,
  Trash2,
  BarChart2,
} from "lucide-react";

const AssessmentsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Dummy data for demonstration
  const assessments = [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      type: "Quiz",
      course: "Web Development Basics",
      questions: 15,
      timeLimit: "30 mins",
      status: "active",
    },
    {
      id: 2,
      title: "React Components",
      type: "Project",
      course: "Advanced React",
      questions: null,
      timeLimit: "1 week",
      status: "draft",
    },
    {
      id: 3,
      title: "Database Design",
      type: "Quiz",
      course: "Database Management",
      questions: 20,
      timeLimit: "45 mins",
      status: "active",
    },
  ];

  const stats = [
    {
      title: "Total Assessments",
      value: "45",
      description: "Across all courses",
      icon: ClipboardList,
    },
    {
      title: "Average Score",
      value: "76%",
      description: "Last 30 days",
      icon: BarChart2,
    },
    {
      title: "Completion Rate",
      value: "82%",
      description: "All assessments",
      icon: BarChart2,
    },
  ];

  return (
    <div className="space-y-6 p-4 pt-7">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#006838] dark:text-[#8dc63f]">
            Assessments
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage and monitor all course assessments
          </p>
        </div>
        <Button className="bg-gradient-to-r from-[#006838] to-[#8dc63f] text-white hover:from-[#006838]/90 hover:to-[#8dc63f]/90">
          <Plus className="mr-2 h-4 w-4" /> Create Assessment
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index} className="border-[#e0e0e0] dark:border-[#333] hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#006838] dark:text-[#8dc63f]">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-[#006838] dark:text-[#8dc63f]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#006838] dark:text-[#8dc63f]">
                {stat.value}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="border-[#e0e0e0] dark:border-[#333] hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-[#006838] dark:text-[#8dc63f]">
            Assessment Management
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            View and manage all course assessments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <Input
                placeholder="Search assessments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 border-[#e0e0e0] dark:border-[#333] focus:border-[#006838] focus:ring-[#006838]"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-[180px] border-[#e0e0e0] dark:border-[#333]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="quiz">Quiz</SelectItem>
                <SelectItem value="project">Project</SelectItem>
                <SelectItem value="exam">Exam</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Assessments Table */}
          <div className="rounded-md border border-[#e0e0e0] dark:border-[#333]">
            <Table>
              <TableHeader className="bg-[#e8f5e9] dark:bg-[#006838]/20">
                <TableRow>
                  <TableHead className="text-[#006838] dark:text-[#8dc63f]">
                    Title
                  </TableHead>
                  <TableHead className="text-[#006838] dark:text-[#8dc63f]">
                    Type
                  </TableHead>
                  <TableHead className="text-[#006838] dark:text-[#8dc63f]">
                    Course
                  </TableHead>
                  <TableHead className="text-[#006838] dark:text-[#8dc63f]">
                    Questions
                  </TableHead>
                  <TableHead className="text-[#006838] dark:text-[#8dc63f]">
                    Time Limit
                  </TableHead>
                  <TableHead className="text-[#006838] dark:text-[#8dc63f]">
                    Status
                  </TableHead>
                  <TableHead className="text-right text-[#006838] dark:text-[#8dc63f]">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assessments.map((assessment) => (
                  <TableRow
                    key={assessment.id}
                    className="border-[#e0e0e0] dark:border-[#333]"
                  >
                    <TableCell className="font-medium text-[#006838] dark:text-[#8dc63f]">
                      {assessment.title}
                    </TableCell>
                    <TableCell>{assessment.type}</TableCell>
                    <TableCell>{assessment.course}</TableCell>
                    <TableCell>{assessment.questions || "N/A"}</TableCell>
                    <TableCell>{assessment.timeLimit}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          assessment.status === "active"
                            ? "bg-gradient-to-r from-[#006838] to-[#8dc63f] text-white"
                            : "bg-[#e8f5e9] text-[#006838] dark:bg-[#006838]/20 dark:text-[#8dc63f]"
                        }
                      >
                        {assessment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#006838] text-[#006838] hover:bg-[#006838]/10 dark:border-[#8dc63f] dark:text-[#8dc63f] dark:hover:bg-[#8dc63f]/10"
                      >
                        <FileEdit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentsPage;