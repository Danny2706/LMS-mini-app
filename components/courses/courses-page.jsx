"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Users,
  Star,
  Play,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";

export default function CoursesPage({ onBack }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const router = useRouter();


  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const mockCourses = [
        {
          id: 1,
          title: "React Fundamentals",
          description:
            "Learn the basics of React including components, props, and state management",
          instructor: "Sarah Johnson",
          duration: "8 weeks",
          level: "Beginner",
          students: 12450,
          rating: 4.9,
          price: 99,
          category: "Frontend",
          image: "/placeholder.svg?height=200&width=300",
          tags: ["React", "JavaScript", "Frontend"],
          lessons: 24,
        },
        {
          id: 2,
          title: "Advanced JavaScript",
          description:
            "Master advanced JavaScript concepts including closures, promises, and async/await",
          instructor: "Mike Chen",
          duration: "10 weeks",
          level: "Advanced",
          students: 8920,
          rating: 4.8,
          price: 149,
          category: "Programming",
          image: "/placeholder.svg?height=200&width=300",
          tags: ["JavaScript", "ES6+", "Async"],
          lessons: 32,
        },
        {
          id: 3,
          title: "UI/UX Design Principles",
          description:
            "Learn design thinking, user research, and create beautiful user interfaces",
          instructor: "Emma Davis",
          duration: "6 weeks",
          level: "Intermediate",
          students: 15670,
          rating: 4.7,
          price: 79,
          category: "Design",
          image: "/placeholder.svg?height=200&width=300",
          tags: ["Design", "UI", "UX"],
          lessons: 18,
        },
        {
          id: 4,
          title: "Node.js Backend Development",
          description:
            "Build scalable backend applications with Node.js, Express, and MongoDB",
          instructor: "David Wilson",
          duration: "12 weeks",
          level: "Intermediate",
          students: 9340,
          rating: 4.6,
          price: 129,
          category: "Backend",
          image: "/placeholder.svg?height=200&width=300",
          tags: ["Node.js", "Express", "MongoDB"],
          lessons: 36,
        },
        {
          id: 5,
          title: "Python for Data Science",
          description:
            "Analyze data and build machine learning models using Python and popular libraries",
          instructor: "Dr. Lisa Park",
          duration: "14 weeks",
          level: "Intermediate",
          students: 11200,
          rating: 4.8,
          price: 159,
          category: "Data Science",
          image: "/placeholder.svg?height=200&width=300",
          tags: ["Python", "Data Science", "ML"],
          lessons: 42,
        },
        {
          id: 6,
          title: "Mobile App Development",
          description:
            "Create cross-platform mobile apps using React Native and modern development practices",
          instructor: "Alex Rodriguez",
          duration: "10 weeks",
          level: "Intermediate",
          students: 7890,
          rating: 4.5,
          price: 139,
          category: "Mobile",
          image: "/placeholder.svg?height=200&width=300",
          tags: ["React Native", "Mobile", "Cross-platform"],
          lessons: 30,
        },
      ];

      setCourses(mockCourses);
      setLoading(false);
    };

    fetchCourses();
  }, []);

  const categories = [
    "all",
    "Frontend",
    "Backend",
    "Design",
    "Programming",
    "Data Science",
    "Mobile",
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "all" || course.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#8DC63F]/10 to-[#006838]/10 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#8DC63F] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Loading Courses...
          </h2>
          <p className="text-gray-600">
            Fetching the latest courses from our database
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8DC63F]/10 to-[#006838]/10 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Available Courses 📚
            </h1>
            <p className="text-gray-600 text-lg">
              Discover and enroll in courses that match your learning style
            </p>
          </div>
          <Button
            onClick={onBack}
            variant="outline"
            className="border-[#8DC63F] text-[#006838] hover:bg-[#8DC63F]/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        {/* Search and Filter */}
        <Card className="mb-8 border-[#8DC63F]/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search courses, topics, or technologies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-[#8DC63F]/30 focus:border-[#8DC63F]"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={
                      selectedCategory === category ? "default" : "outline"
                    }
                    onClick={() => setSelectedCategory(category)}
                    className={
                      selectedCategory === category
                        ? "bg-[#8DC63F] hover:bg-[#006838] text-white"
                        : "border-[#8DC63F]/30 text-[#006838] hover:bg-[#8DC63F]/10"
                    }
                  >
                    {category === "all" ? "All Categories" : category}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-[#8DC63F]/20">
            <CardContent className="p-6 text-center">
              <BookOpen className="w-8 h-8 mx-auto text-[#8DC63F] mb-2" />
              <div className="text-2xl font-bold text-gray-800">
                {filteredCourses.length}
              </div>
              <div className="text-sm text-gray-600">Available Courses</div>
            </CardContent>
          </Card>
          <Card className="border-[#8DC63F]/20">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 mx-auto text-[#006838] mb-2" />
              <div className="text-2xl font-bold text-gray-800">
                {filteredCourses
                  .reduce((acc, course) => acc + course.students, 0)
                  .toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Students</div>
            </CardContent>
          </Card>
          <Card className="border-[#8DC63F]/20">
            <CardContent className="p-6 text-center">
              <Star className="w-8 h-8 mx-auto text-yellow-500 mb-2" />
              <div className="text-2xl font-bold text-gray-800">
                {filteredCourses.length > 0
                  ? (
                      filteredCourses.reduce(
                        (acc, course) => acc + course.rating,
                        0
                      ) / filteredCourses.length
                    ).toFixed(1)
                  : "0"}
              </div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </CardContent>
          </Card>
          <Card className="border-[#8DC63F]/20">
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 mx-auto text-blue-500 mb-2" />
              <div className="text-2xl font-bold text-gray-800">
                {filteredCourses.reduce(
                  (acc, course) => acc + course.lessons,
                  0
                )}
              </div>
              <div className="text-sm text-gray-600">Total Lessons</div>
            </CardContent>
          </Card>
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card
              key={course.id}
              className="hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-[#8DC63F]/20 overflow-hidden"
            >
              <div className="aspect-video bg-gradient-to-br from-[#8DC63F]/20 to-[#006838]/20 flex items-center justify-center">
                <BookOpen className="w-16 h-16 text-[#006838]/50" />
              </div>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <Badge className="bg-[#8DC63F]/20 text-[#006838] hover:bg-[#8DC63F]/30">
                    {course.category}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current text-yellow-500" />
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {course.students.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Level: {course.level}</span>
                    <span>{course.lessons} lessons</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {course.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs border-[#8DC63F]/30"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-[#006838]">
                    ${course.price}
                  </div>
                  <Button
                    onClick={() => router.push("/login")}
                    className="bg-gradient-to-r from-[#8DC63F] to-[#006838] hover:from-[#7AB82F] hover:to-[#005530] text-white"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Enroll Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No courses found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
