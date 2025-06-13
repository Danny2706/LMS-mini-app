"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreateQuizDialog } from "@/components/trainerUi/create-quiz-dialog";
import AssessmentForm from "@/components/trainerUi/create-assessment-dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Plus,
  FileText,
  CheckCircle,
  Clock,
  Filter,
  MoreVertical,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const assessments = [
  {
    id: 1,
    title: "JavaScript Basics Quiz",
    type: "Quiz",
    dueDate: "2024-03-20",
    submissions: 15,
    pending: 5,
    status: "Active",
    totalQuestions: 20,
    timeLimit: "30 minutes",
    avgScore: 78,
  },
  {
    id: 2,
    title: "React Project Assessment",
    type: "Assignment",
    dueDate: "2024-03-25",
    submissions: 10,
    pending: 8,
    status: "Active",
    totalQuestions: null,
    timeLimit: "1 week",
    avgScore: 82,
  },
  {
    id: 3,
    title: "CSS Grid Quiz",
    type: "Quiz",
    dueDate: "2024-03-15",
    submissions: 20,
    pending: 0,
    status: "Completed",
    totalQuestions: 15,
    timeLimit: "25 minutes",
    avgScore: 85,
  },
  {
    id: 4,
    title: "Final Project",
    type: "Assignment",
    dueDate: "2024-04-01",
    submissions: 0,
    pending: 0,
    status: "Draft",
    totalQuestions: null,
    timeLimit: "2 weeks",
    avgScore: null,
  },
];

export default function AssessmentsPage() {
  const [showQuizDialog, setShowQuizDialog] = useState(false);
  const [showAssessmentDialog, setShowAssessmentDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("table");
  const [filter, setFilter] = useState("all");

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-500 hover:bg-green-600";
      case "Completed":
        return "bg-blue-500 hover:bg-blue-600";
      case "Draft":
        return "bg-gray-500 hover:bg-gray-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  const filterAssessments = (tab) => {
    let filtered = assessments;

    // First filter by status
    switch (tab) {
      case "active":
        filtered = filtered.filter((a) => a.status === "Active");
        break;
      case "past":
        filtered = filtered.filter((a) => a.status === "Completed");
        break;
      case "drafts":
        filtered = filtered.filter((a) => a.status === "Draft");
        break;
    }

    // Then filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (a) =>
          a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          a.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  return (
    <div className="container mx-auto px-4 pb-8 mt-6 ">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#006838] to-[#8dc63f] rounded-lg p-4 sm:p-6 text-white mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">
              Assessment & Grading
            </h1>
            <p className="text-blue-100 text-sm sm:text-base">
              Create and manage your course assessments
            </p>
          </div>
          <div className="flex flex-col xs:flex-row gap-2 sm:gap-4">
            <Button
              variant="secondary"
              className="text-sm"
              onClick={() => setShowAssessmentDialog(true)}
            >
              Create Assignment
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 mb-6 sm:mb-8">
        <Card className="p-2 sm:p-4">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-2">
            <CardTitle className="text-sm sm:text-base font-medium">
              Total Assessments
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-2">
            <div className="text-lg sm:text-2xl font-bold">
              {assessments.length}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {assessments.filter((a) => a.status === "Active").length} active
            </p>
          </CardContent>
        </Card>

        <Card className="p-2 sm:p-4">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-2">
            <CardTitle className="text-sm sm:text-base font-medium">
              Completion Rate
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-2">
            <div className="text-lg sm:text-2xl font-bold">78%</div>
            <Progress value={78} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="p-2 sm:p-4">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-2">
            <CardTitle className="text-sm sm:text-base font-medium">
              Average Score
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-2">
            <div className="text-lg sm:text-2xl font-bold">82/100</div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              +5% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="p-2 sm:p-4">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-2">
            <CardTitle className="text-sm sm:text-base font-medium">
              Pending Reviews
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-2">
            <div className="text-lg sm:text-2xl font-bold">13</div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              From 3 assessments
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and View Toggle */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="w-full sm:w-[300px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search assessments..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setView("table")}
            className={`flex-1 sm:flex-none ${view === "table" ? "bg-muted" : ""}`}
          >
            Table View
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setView("grid")}
            className={`flex-1 sm:flex-none ${view === "grid" ? "bg-muted" : ""}`}
          >
            Grid View
          </Button>
        </div>
      </div>

      {/* Assessment Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setFilter("all")}
          className={filter === "all" ? "bg-muted" : ""}
        >
          All
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setFilter("active")}
          className={filter === "active" ? "bg-muted" : ""}
        >
          Active
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setFilter("past")}
          className={filter === "past" ? "bg-muted" : ""}
        >
          Past
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setFilter("drafts")}
          className={filter === "drafts" ? "bg-muted" : ""}
        >
          Drafts
        </Button>
      </div>

      {/* Table View */}
      {view === "table" ? (
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="hidden md:table-cell">Due Date</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Submissions
                </TableHead>
                <TableHead className="hidden lg:table-cell">Pending</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filterAssessments(filter).map((assessment) => (
                <TableRow key={assessment.id}>
                  <TableCell className="font-medium min-w-[200px]">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <span>{assessment.title}</span>
                      <Badge
                        variant="secondary"
                        className={
                          assessment.type === "Quiz"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 w-fit"
                            : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 w-fit"
                        }
                      >
                        {assessment.type}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground sm:hidden mt-1">
                      Due: {assessment.dueDate}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge
                      variant="secondary"
                      className={
                        assessment.type === "Quiz"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                          : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                      }
                    >
                      {assessment.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {assessment.dueDate}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {assessment.submissions}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {assessment.pending}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`${getStatusColor(assessment.status)} text-white whitespace-nowrap`}
                    >
                      {assessment.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {assessment.status === "Active" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hidden sm:inline-flex"
                        >
                          Grade
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hidden sm:inline-flex"
                      >
                        Edit
                      </Button>
                      {assessment.status === "Draft" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hidden sm:inline-flex"
                        >
                          Publish
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" className="sm:hidden">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filterAssessments(filter).map((assessment) => (
            <Card
              key={assessment.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader className="flex flex-row items-start justify-between pb-2 space-y-0">
                <div className="space-y-2">
                  <CardTitle className="text-base font-medium line-clamp-2">
                    {assessment.title}
                  </CardTitle>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge
                      variant="secondary"
                      className={
                        assessment.type === "Quiz"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-purple-100 text-purple-800"
                      }
                    >
                      {assessment.type}
                    </Badge>
                    <Badge
                      className={`${getStatusColor(assessment.status)} text-white`}
                    >
                      {assessment.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Time Limit</p>
                    <p className="font-medium">{assessment.timeLimit}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Questions</p>
                    <p className="font-medium">
                      {assessment.totalQuestions || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Submissions</span>
                    <span>
                      {assessment.submissions}/
                      {assessment.submissions + assessment.pending}
                    </span>
                  </div>
                  <Progress
                    value={
                      assessment.submissions > 0
                        ? (assessment.submissions /
                            (assessment.submissions + assessment.pending)) *
                          100
                        : 0
                    }
                    className="h-2"
                  />
                </div>

                {assessment.avgScore && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Average Score</span>
                    <span className="font-medium">{assessment.avgScore}%</span>
                  </div>
                )}

                <div className="flex flex-wrap justify-end gap-2 pt-2">
                  {assessment.status === "Active" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 sm:flex-none"
                    >
                      Grade
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 sm:flex-none"
                  >
                    Edit
                  </Button>
                  {assessment.status === "Draft" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 sm:flex-none"
                    >
                      Publish
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <CreateQuizDialog
        open={showQuizDialog}
        onOpenChange={setShowQuizDialog}
      />
      <AssessmentForm
        open={showAssessmentDialog}
        onOpenChange={setShowAssessmentDialog}
      />
    </div>
  );
}
