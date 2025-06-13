"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useSelector } from "react-redux";
import {
  Play,
  FileText,
  Link as LinkIcon,
  Clock,
  User,
  Tag,
  BarChart2,
  Award,
  Trash2,
  Calendar,
  Edit,
  Settings,
  Users,
  FileBarChart,
  CheckCircle,
} from "lucide-react";
import Modal from "@/components/adminUi/Modal";

import { selectCourseById } from "@/globalStates/features/courses/courseSlices";

const AdminCourseDetail = () => {
  const router = useRouter();
  const params = useParams();
  const courseId = params.courseId;

  const course = useSelector((state) =>
    selectCourseById(state, Number(courseId))
  );

  const [activeTab, setActiveTab] = useState("content");
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  // Delete handlers
  const handleDeleteClick = (courseId) => {
    setCourseToDelete(courseId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (courseToDelete) {
      dispatch(deleteCourse(courseToDelete));
      setIsDeleteModalOpen(false);
      setCourseToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setCourseToDelete(null);
  };

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Course Not Found
          </h2>
          <button
            onClick={() => router.push("/admin/courses")}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  const renderLessonContent = (lesson) => {
    switch (lesson.contentType) {
      case "text":
        return (
          <div className="prose max-w-none bg-gray-50 p-6 rounded-lg">
            <p className="whitespace-pre-line">{lesson.content}</p>
          </div>
        );
      case "video":
        return (
          <div className="bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
            {lesson.content.startsWith("blob:") ? (
              <video
                src={lesson.content}
                controls
                className="w-full aspect-video"
              />
            ) : (
              <div className="aspect-video flex items-center justify-center bg-gray-200 text-gray-600">
                <div className="text-center">
                  <Play size={48} className="mx-auto mb-4" />
                  <p className="text-xl font-medium">Video Content</p>
                  <p className="text-gray-500">{lesson.content}</p>
                </div>
              </div>
            )}
          </div>
        );
      case "pdf":
        return (
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <FileText size={24} className="text-gray-600 mr-3" />
              <div>
                <p className="text-lg font-medium">{lesson.content}</p>
                <p className="text-sm text-gray-500">PDF Document</p>
              </div>
            </div>
          </div>
        );
      case "link":
        return (
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <LinkIcon size={24} className="text-gray-600 mr-3" />
              <a
                href={lesson.content}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all"
              >
                {lesson.content}
              </a>
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <p>Content type not recognized</p>
          </div>
        );
    }
  };

  const stats = [
    {
      name: "Total Enrollments",
      value: course.completedBy?.length || 0,
      icon: Users,
    },
    { name: "Completion Rate", value: "72%", icon: FileBarChart },
    { name: "Avg. Rating", value: "4.8/5", icon: Award },
    {
      name: "Certificates Issued",
      value: course.certificates?.length || 0,
      icon: CheckCircle,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Course Header with Actions */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <span>{course.title}</span>
          <span className="ml-3 text-sm font-normal bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full">
            {course.status === "active" ? "Active" : "Inactive"}
          </span>
        </h1>
        <div className="flex space-x-3">
          <button
            onClick={() => router.push(`/admin/courses/editCourse/${courseId}`)}
            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Edit size={16} className="mr-2" />
            Edit Course
          </button>
          <button
            onClick={() => handleDeleteClick(course.id)}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors text-white"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, statIdx) => (
          <div
            key={statIdx}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {stat.name}
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </div>
                  </dd>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {["content", "analytics", "students", "settings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Course Metadata */}
        <div className="px-6 py-5 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Image
                  className="rounded-md object-cover"
                  src={course.thumbnail || "https://via.placeholder.com/150"}
                  alt="Course thumbnail"
                  width={64}
                  height={64}
                />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {course.title}
                </h3>
                <div className="flex flex-wrap items-center text-sm text-gray-500 space-x-4 mt-1">
                  <div className="flex items-center">
                    <User size={14} className="mr-1.5" />
                    <span>{course.trainer}</span>
                  </div>
                  <div className="flex items-center">
                    <Tag size={14} className="mr-1.5" />
                    <span>{course.category}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1.5" />
                    <span>{course.duration}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                Last updated: {new Date(course.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "content" && (
          <div className="divide-y divide-gray-200">
            {/* Course Description */}
            <div className="px-6 py-5">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Description
              </h3>
              <div className="prose max-w-none text-gray-700">
                <p>{course.description}</p>
              </div>
            </div>

            {/* Course Content */}
            <div className="px-6 py-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Course Content
                </h3>
                <span className="text-sm text-gray-500">
                  {course.chapters?.length || 0} chapters •{" "}
                  {course.chapters?.reduce(
                    (acc, chapter) => acc + (chapter.lessons?.length || 0),
                    0
                  )}{" "}
                  lessons
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Chapters List */}
                <div className="lg:col-span-1">
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                      <h4 className="text-sm font-medium text-gray-900">
                        Chapters
                      </h4>
                    </div>
                    <div className="divide-y divide-gray-200 max-h-[500px] overflow-y-auto">
                      {course.chapters?.map((chapter, cIndex) => (
                        <div key={cIndex} className="p-4">
                          <button
                            onClick={() => setActiveChapterIndex(cIndex)}
                            className={`w-full text-left font-medium flex justify-between items-center ${
                              activeChapterIndex === cIndex
                                ? "text-indigo-600"
                                : "text-gray-800 hover:text-indigo-600"
                            }`}
                          >
                            <span>
                              {chapter.title || `Chapter ${cIndex + 1}`}
                            </span>
                            <span className="text-xs text-gray-500">
                              {chapter.lessons?.length || 0} lessons
                            </span>
                          </button>
                          {activeChapterIndex === cIndex && (
                            <div className="mt-2 ml-4 space-y-1">
                              {chapter.lessons?.map((lesson, lIndex) => (
                                <button
                                  key={lIndex}
                                  onClick={() => setActiveLessonIndex(lIndex)}
                                  className={`w-full text-left text-sm flex items-center px-2 py-1.5 rounded ${
                                    activeLessonIndex === lIndex
                                      ? "bg-indigo-50 text-indigo-700"
                                      : "text-gray-600 hover:bg-gray-100"
                                  }`}
                                >
                                  <span className="w-5 h-5 flex items-center justify-center mr-2">
                                    {lesson.contentType === "video" && (
                                      <Play size={12} />
                                    )}
                                    {(lesson.contentType === "pdf" ||
                                      lesson.contentType === "text") && (
                                      <FileText size={12} />
                                    )}
                                    {lesson.contentType === "link" && (
                                      <LinkIcon size={12} />
                                    )}
                                  </span>
                                  {lesson.title || `Lesson ${lIndex + 1}`}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Lesson Content */}
                <div className="lg:col-span-3">
                  {course.chapters?.length > 0 &&
                    course.chapters[activeChapterIndex]?.lessons?.length >
                      0 && (
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">
                              {
                                course.chapters[activeChapterIndex].lessons[
                                  activeLessonIndex
                                ].title
                              }
                            </h4>
                          </div>
                        </div>
                        {/* You may want to render lesson content here */}
                        <div className="p-6">
                          {renderLessonContent(
                            course.chapters[activeChapterIndex].lessons[
                              activeLessonIndex
                            ]
                          )}
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        )}
        {/* You can add other tab content here */}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Confirm Delete"
        message="Are you sure you want to delete this course? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor="red"
      />
    </div>
  );
};

export default AdminCourseDetail;
