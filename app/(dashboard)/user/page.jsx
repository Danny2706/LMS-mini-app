"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UserCard from "@/components/userUi/UserCard";
import CourseFilters from "@/components/userUi/CourseFilter";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Loader,
  Rocket,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import TopHeader from "@/components/userUi/TopHeader";
import {
  fetchCompletedCourses,
  fetchEnrolledCourses,
  setCourses,
} from "@/globalStates/features/courses/courseSlices";
import { customToast } from "@/lib/Toast";
import Link from "next/link";

export default function UserHome() {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((store) => store.auth);
  const { courses } = useSelector((store) => store.courses);

  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [courseType, setCourseType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [unfinishedCourses, setUnfinishedCourses] = useState([]);

  const coursesPerPage = 6;
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses?.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(courses?.length / coursesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const { isLoading: isCoursesLoading } = useQuery({
    queryKey: ["userCourses", session?.user?.id],
    queryFn: async () => {
      const res = await axios.get("/api/courses", {
        withCredentials: true,
      });
      if (res.data.success) {
        console.log(res.data.courses);
        dispatch(setCourses(res.data.courses));
      }
      return res.data;
    },
    enabled: !!(session?.user?.id || isAuthenticated),
    onSuccess: (data) => {
      // dispatch(setCourses(data.courses));
      console.log(data.courses);
    },
    onError: (error) => {
      console.error("Failed to fetch courses", error);
      console.error(
        "React Query Error:",
        error.response?.data || error.message
      );
    },
  });

  async function checkUnfinishedCourses() {
    try {
      const res = await fetch("/api/courses/unfinished");
      const data = await res.json();

      if (data.unfinishedCourses?.length > 0) {
        customToast.success(
          `You have unfinished courses like "${data.unfinishedCourses[0].title}". Continue now!`
        );
        setUnfinishedCourses(data.unfinishedCourses);
      }
    } catch (err) {
      console.error("Error checking courses", err);
    }
  }

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchEnrolledCourses(user.id));
      dispatch(fetchCompletedCourses(user.id));
      checkUnfinishedCourses();
    }
  }, [dispatch, user?.id]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loader className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!session && !isAuthenticated) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Alert className="w-full max-w-md mx-auto text-center border-none shadow-lg bg-background">
          <Rocket className="w-6 h-6 mx-auto mb-2" />
          <AlertTitle className="text-2xl font-bold">
            You must be logged in
          </AlertTitle>
          <AlertDescription className="mt-2 text-gray-600 dark:text-gray-400">
            Please sign in to view your courses.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-4">
      {/* Enhanced Unfinished Courses Banner */}
      {unfinishedCourses.length > 0 && (
        <div className="relative w-full p-4 mb-6 overflow-hidden text-white rounded-lg shadow-lg bg-gradient-to-r from-yellow-500 via-orange-500 to-amber-500">
          <div className="absolute top-0 left-0 w-full h-1 bg-white/30"></div>
          <div className="relative z-10">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div className="flex-1">
                <h2 className="text-xl font-bold">
                  Continue Your Learning Journey!
                </h2>
                <p className="mt-1 text-sm text-white/90">
                  You have {unfinishedCourses.length} unfinished course
                  {unfinishedCourses.length > 1 ? "s" : ""}:
                </p>

                <div className="mt-3 space-y-2">
                  {unfinishedCourses.slice(0, 3).map((course) => (
                    <div
                      key={course.id}
                      className="flex items-center gap-3 group"
                    >
                      <div className="w-[70%]">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{course.title}</span>
                          <span className="text-xs font-bold">
                            {Math.round(course.progress)}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 mt-1 bg-white/20 rounded-full overflow-hidden">
                          <div
                            className="h-full transition-all duration-300 bg-white rounded-full"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <Link
                        href={`/user/course/${course.id}`}
                        className="p-1.5 text-white  transition-all rounded-full opacity-0 group-hover:opacity-100 hover:bg-white/20"
                        title={`Continue ${course.title}`}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  ))}
                </div>

                {unfinishedCourses.length > 3 && (
                  <p className="mt-2 text-xs text-white/80">
                    + {unfinishedCourses.length - 3} more course
                    {unfinishedCourses.length - 3 > 1 ? "s" : ""} to complete
                  </p>
                )}
              </div>

              <div className="flex flex-col items-center gap-2 mt-4 md:mt-0 md:ml-4">
                {unfinishedCourses.length > 1 && (
                  <Link
                    href="/dashboard?tab=in-progress"
                    className="px-4 py-1.5 text-xs font-medium text-white transition-all border border-white/50 rounded-full hover:bg-white/20 hover:border-white/80"
                  >
                    View All Unfinished
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-16 h-16 -mb-4 -mr-4 rounded-full bg-white/10"></div>
          <div className="absolute top-0 right-0 w-8 h-8 -mt-2 -mr-2 rounded-full bg-white/20"></div>
        </div>
      )}

      <div className="bg-gradient-to-r from-[#006838] to-[#8dc63f] rounded-lg p-6 text-white my-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-2xl font-bold">Welcome, {user?.name}!</h1>
            <p className="text-[#e8f5e9]">
              Continue your learning journey. You're doing great!
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">45%</div>
            <div className="text-sm text-[#e8f5e9]">Average Progress</div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <CourseFilters
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          courseType={courseType}
          setCourseType={setCourseType}
        />

        {activeTab === "all" && (
          <div className="w-full h-fit">
            <h2 className="py-5 text-[16px]">See all courses</h2>

            <section className="w-full px-1 py-3 h-fit">
              {isCoursesLoading ? (
                <div className="flex items-center justify-center w-full h-[50vh]">
                  <Loader className="w-10 h-10 text-blue-600 animate-spin" />
                </div>
              ) : (
                <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                  {currentCourses?.length > 0 ? (
                    currentCourses.map((course, i) => (
                      <UserCard key={i} course={course} />
                    ))
                  ) : (
                    <div className="flex items-center justify-center w-full h-[50vh]">
                      <Alert className="w-full mx-auto border-none shadow-lg bg-background">
                        <Rocket className="w-5 h-5" />
                        <AlertTitle className="text-2xl font-bold">
                          Course Not Found
                        </AlertTitle>
                        <AlertDescription className="mt-2 text-gray-600 dark:text-gray-400">
                          We couldn't find any courses.
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center justify-center gap-2 mt-7">
                <Button
                  variant="outline"
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 text-base"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (number) => (
                    <Button
                      key={number}
                      variant={currentPage === number ? "default" : "outline"}
                      onClick={() => paginate(number)}
                      className="w-10 h-10 p-0 text-base"
                    >
                      {number}
                    </Button>
                  )
                )}

                <Button
                  variant="outline"
                  onClick={() =>
                    paginate(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 text-base"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
