"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Award, Download, Eye, Plus, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const certificates = [
  {
    id: 1,
    student: "Alice Johnson",
    course: "Web Development Fundamentals",
    issueDate: "2024-02-15",
    status: "Issued",
    grade: "A",
    completionDate: "2024-02-10",
  },
  {
    id: 2,
    student: "Bob Wilson",
    course: "Advanced React Development",
    issueDate: "2024-02-20",
    status: "Pending",
    grade: "B+",
    completionDate: "2024-02-18",
  },
  {
    id: 3,
    student: "Carol Martinez",
    course: "UI/UX Design Basics",
    issueDate: "2024-02-25",
    status: "Issued",
    grade: "A-",
    completionDate: "2024-02-20",
  },
  {
    id: 4,
    student: "David Thompson",
    course: "Node.js Advanced",
    issueDate: null,
    status: "Pending",
    grade: "A",
    completionDate: "2024-02-23",
  },
];

const templates = [
  {
    id: 1,
    title: "Course Completion",
    description: "Standard template for course completion certificates.",
    lastModified: "2024-02-01",
    usageCount: 45,
  },
  {
    id: 2,
    title: "Achievement",
    description: "Template for special achievements and excellence.",
    lastModified: "2024-01-15",
    usageCount: 12,
  },
  {
    id: 3,
    title: "Workshop",
    description: "Template for workshop participation certificates.",
    lastModified: "2024-02-10",
    usageCount: 28,
  },
];

export default function CertificatesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("table");

  const filteredCertificates = certificates.filter(
    (cert) =>
      cert.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 pb-8 mt-6 ">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#006838] to-[#8dc63f] rounded-lg p-6 text-white mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Certificates Management</h1>
            <p className="text-blue-100">
              Issue and manage course completion certificates
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="secondary" className="whitespace-nowrap">
              <Plus className="h-4 w-4 mr-2" />
              Issue Certificate
            </Button>
            <Button variant="secondary">
              <FileText className="h-4 w-4 mr-2" />
              Templates
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-base font-medium">
              Total Issued
            </CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {certificates.filter((c) => c.status === "Issued").length}
            </div>
            <p className="text-xs text-muted-foreground">
              This month:{" "}
              {
                certificates.filter(
                  (c) =>
                    c.status === "Issued" &&
                    new Date(c.issueDate) >
                      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                ).length
              }
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-base font-medium">Pending</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {certificates.filter((c) => c.status === "Pending").length}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting issuance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-base font-medium">Templates</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{templates.length}</div>
            <p className="text-xs text-muted-foreground">Active templates</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-base font-medium">
              Average Grade
            </CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">A-</div>
            <p className="text-xs text-muted-foreground">Across all courses</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and View Toggle */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full sm:w-[300px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search certificates..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setView("table")}
            className={view === "table" ? "bg-muted" : ""}
          >
            Table View
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setView("grid")}
            className={view === "grid" ? "bg-muted" : ""}
          >
            Grid View
          </Button>
        </div>
      </div>

      {/* Certificates List */}
      {view === "table" ? (
        <Card>
          <CardHeader>
            <CardTitle>Issue Certificates</CardTitle>
            <CardDescription>
              Manage and issue course completion certificates to students.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Course
                    </TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Grade
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Issue Date
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCertificates.map((cert) => (
                    <TableRow key={cert.id}>
                      <TableCell className="font-medium">
                        {cert.student}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {cert.course}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {cert.grade}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            cert.status === "Issued"
                              ? "bg-green-500 text-white"
                              : "bg-yellow-500 text-white"
                          }
                        >
                          {cert.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {cert.issueDate || "Not issued"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                          {cert.status === "Issued" && (
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
                          )}
                          {cert.status === "Pending" && (
                            <Button variant="ghost" size="sm">
                              Issue
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map((cert) => (
            <Card key={cert.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-base font-medium">
                  {cert.student}
                </CardTitle>
                <Badge
                  className={
                    cert.status === "Issued"
                      ? "bg-green-500 text-white"
                      : "bg-yellow-500 text-white"
                  }
                >
                  {cert.status}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Course</div>
                  <div className="font-medium">{cert.course}</div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Grade</p>
                    <p className="font-medium">{cert.grade}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Completion Date</p>
                    <p className="font-medium">{cert.completionDate}</p>
                  </div>
                </div>

                {cert.issueDate && (
                  <div className="text-sm">
                    <span className="text-muted-foreground">Issued on: </span>
                    <span>{cert.issueDate}</span>
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  {cert.status === "Issued" ? (
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm">
                      Issue Now
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Certificate Templates */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Certificate Templates</CardTitle>
            <CardDescription>
              Manage and customize certificate templates for different courses.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {templates.map((template) => (
                <Card key={template.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{template.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {template.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Used {template.usageCount} times
                      </span>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
