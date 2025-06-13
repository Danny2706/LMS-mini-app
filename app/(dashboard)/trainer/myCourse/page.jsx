"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Plus,
  Users,
  Clock,
  BookOpen,
  Upload,
  FileText,
  Video,
  Eye,
  Settings,
  Loader,
} from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function MyCoursesPage() {
  const { user } = useSelector((state) => state.auth);

  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  const { data: trainerCourses, isLoading } = useQuery({
    queryKey: ["trainerCourses", user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error("Trainer ID is missing");

      const response = await axios.get(
        `/api/stats/trainer?trainerId=${user?.id}`
      );
      console.log(response.data);
      return response.data;
    },
    enabled: !!user?.id,
  });

  const filteredCourses = trainerCourses?.filter((course) =>
    course?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateCourse = () => {
    // Create course logic here
    setIsCreateDialogOpen(false);
  };

  const handleUploadContent = () => {
    // Upload content logic here
    setIsUploadDialogOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loader className="w-6 h-6 text-gray-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pb-8 mt-6 ">
      <div className="bg-gradient-to-r from-[#006838] to-[#8dc63f] rounded-lg p-4 sm:p-6 text-white mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">My Courses</h1>
            <p className="text-blue-100 text-sm sm:text-base">
              Manage your courses, content, and student progress
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardContent>
      </Card>

      {/* Courses Grid */}
      <div className="grid gap-6 px-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {filteredCourses?.map((course) => (
          <Card
            key={course.id}
            className="pt-0 overflow-hidden transition-shadow hover:shadow-lg"
          >
            {course.thumbnail ? (
              <>
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  width={200}
                  height={50}
                  className="w-full h-[215px] object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300"
                />
              </>
            ) : (
              <div className="aspect-video bg-gradient-to-r from-[#006838] to-[#8dc63f] flex items-center justify-center rounded-t-xl">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
            )}
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription className="mt-1">
                    {course.description}
                  </CardDescription>
                </div>
                <Badge
                  variant={course.status === "Active" ? "default" : "secondary"}
                >
                  {course.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  {course.students} students
                </div>
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {course.duration}
                </div>
                <div className="flex items-center">
                  <Video className="w-3 h-3 mr-1" />
                  {course.lectures} modules
                </div>
                <div className="flex items-center">
                  <FileText className="w-3 h-3 mr-1" />
                  {course.quizzes} quizzes
                </div>
              </div>

              <div className="flex pt-4 space-x-2">
                <Button size="sm" className="flex-1" asChild>
                  <Link href={`/trainer/courses/${course.id}`}>
                    <Eye className="w-3 h-3 mr-1" />
                    View Details
                  </Link>
                </Button>
                <Button size="sm" variant="outline">
                  <Settings className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Course Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Course Statistics</CardTitle>
          <CardDescription>
            Overview of your teaching performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {filteredCourses?.length}
              </div>
              <div className="text-sm text-gray-600">Active Courses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {filteredCourses?.reduce(
                  (sum, course) => sum + course.students,
                  0
                )}
              </div>
              <div className="text-sm text-gray-600">Total Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {Math.round(
                  filteredCourses?.reduce(
                    (sum, course) => sum + course.progress,
                    0
                  ) / filteredCourses?.length
                )}
                %
              </div>
              <div className="text-sm text-gray-600">Avg. Completion</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
