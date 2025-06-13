"use client";
import { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import {
  Search,
  Plus,
  Loader,
  Rocket,
  Edit,
  CheckCircle,
  Archive,
  Clock,
  Pencil,
  Trash2,
  MoreHorizontal,
} from "lucide-react";
import { deleteCourse } from "@/globalStates/features/courses/courseSlices";
import Modal from "@/components/adminUi/Modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { customToast } from "@/lib/Toast";
import { useRouter } from "next/navigation";

const Courses = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [modalState, setModalState] = useState({
    isOpen: false,
    courseId: null,
  });

  // Memoized filtered courses for better performance
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || course.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [courses, searchTerm, selectedCategory]);

  // Get unique categories for dropdown
  const categories = useMemo(() => {
    return [...new Set(courses.map((course) => course.category))];
  }, [courses]);

  // Delete handlers
  const handleDeleteClick = (courseId) => {
    setModalState({
      isOpen: true,
      courseId: courseId,
    });
  };

  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true);
      const res = await axios.delete(`/api/courses/${modalState.courseId}`);

      if (res.data.success) {
        setCourses((prevCourses) =>
          prevCourses.filter((course) => course.id !== modalState.courseId)
        );
        setModalState({ isOpen: false, courseId: null });
        customToast.success(res.data.message || "Course deleted successfully");
      } else {
        customToast.error(res.data.error || "Failed to delete course");
        throw new Error(res.data.error || "Failed to delete course");
      }
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setModalState({ isOpen: false, courseId: null });
  };

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch("/api/courses");
        const data = await res.json();

        if (res.ok && data.success) {
          console.log(data);
          setCourses(data.courses);
        } else {
          throw new Error(data.error || "Failed to fetch courses");
        }

        console.log(data);
      } catch (err) {
        setError(err.message);
        console.error("Course fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  const handleEditClick = (courseId) => {
    router.push(`/admin/courses/editCourse/${courseId}`);
  };

  return (
    <div className="space-y-6 p-6">
      <Card className="border-[#8DC63F]/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold text-[#231F20] dark:text-[#FFFFFF]">
            Course Management
          </CardTitle>
          <Link href="/admin/courses/addNewCourse">
            <Button className="bg-[#006838] hover:bg-[#006838]/90 text-[#FFFFFF]">
              <Plus className="mr-2 h-4 w-4" />
              Add New Course
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative w-full sm:w-64">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#231F20]/60 dark:text-[#FFFFFF]/60"
                size={16}
              />
              <Input
                type="text"
                className="pl-9 border-[#8DC63F]/20 focus:border-[#006838] focus:ring-[#006838]"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full sm:w-48 border-[#8DC63F]/20">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <div className="flex items-center justify-center w-full h-screen">
              <Loader className="h-10 w-10 animate-spin text-[#006838]" />
            </div>
          ) : (
            <div className="rounded-md border border-[#8DC63F]/20">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-[#8DC63F]/20">
                    <TableHead className="text-[#231F20] dark:text-[#FFFFFF]">
                      Title
                    </TableHead>
                    <TableHead className="text-[#231F20] dark:text-[#FFFFFF]">
                      Category
                    </TableHead>
                    <TableHead className="text-[#231F20] dark:text-[#FFFFFF]">
                      Trainer
                    </TableHead>
                    <TableHead className="text-[#231F20] dark:text-[#FFFFFF]">
                      Created At
                    </TableHead>
                    <TableHead className="text-[#231F20] dark:text-[#FFFFFF]">
                      Status
                    </TableHead>
                    <TableHead className="text-[#231F20] dark:text-[#FFFFFF]">
                      Students
                    </TableHead>
                    <TableHead className="text-right text-[#231F20] dark:text-[#FFFFFF]">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCourses.length === 0 ? (
                    <TableRow className="border-b border-[#8DC63F]/20">
                      <TableCell
                        colSpan={6}
                        className="text-center text-[#231F20]/60 dark:text-[#FFFFFF]/60"
                      >
                        No courses found matching your criteria
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCourses.map((course) => (
                      <TableRow
                        key={course.id}
                        className="border-b border-[#8DC63F]/20"
                      >
                        <TableCell>
                          <Link
                            href={`/admin/courses/${course.id}`}
                            className="font-medium text-[#006838] hover:text-[#006838]/80 hover:underline capitalize"
                          >
                            {course.title}
                          </Link>
                        </TableCell>
                        <TableCell className="text-[#231F20] dark:text-[#FFFFFF]">
                          {formatEnumText(course.category)}
                        </TableCell>
                        <TableCell className="capitalize text-[#231F20] dark:text-[#FFFFFF]">
                          {course.trainer.name}
                        </TableCell>
                        <TableCell className="text-[#231F20] dark:text-[#FFFFFF]">
                          {new Date(course.createdAt).toDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={cn(
                              "text-xs font-medium capitalize",
                              course.status === "published" &&
                                "bg-[#006838] text-[#FFFFFF]",
                              course.status === "draft" &&
                                "bg-[#8DC63F]/20 text-[#231F20] dark:text-[#FFFFFF]",
                              course.status === "active" &&
                                "bg-[#006838] text-[#FFFFFF]",
                              course.status === "archived" &&
                                "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                            )}
                          >
                            {course.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-[#231F20] dark:text-[#FFFFFF]">
                          {course.enrollments.length}{" "}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                className="h-8 w-8 p-0 text-[#231F20] dark:text-[#FFFFFF] hover:bg-[#8DC63F]/10"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                className="text-[#08aa5e] hover:bg-[#8DC63F]/10"
                                onClick={() => handleEditClick(course.id)}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600 hover:bg-red-50"
                                onClick={() => handleDeleteClick(course.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Modal
        isOpen={modalState.isOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Course"
        message="Are you sure you want to delete this course? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor="red"
        courseId={modalState.courseId}
        isDeleting={isDeleting}
      />
    </div>
  );
};

function formatEnumText(enumValue) {
  return enumValue
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default Courses;
