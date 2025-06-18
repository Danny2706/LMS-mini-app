"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  BookOpen,
  Users,
  Calendar,
  ClipboardList,
  TrendingUp,
  Bell,
  ChevronRight,
  CheckCircle,
  Loader,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BarChart, PieChart, LineChart } from "@/components/adminUi/Charts";
import CountChart from "@/components/adminUi/CountChart";
import UserCard from "@/components/adminUi/UserCard";
import {
  enrollmentData,
  performanceData,
  completionData,
} from "@/utility/data";
import AdminHeader from "@/components/adminUi/AdminHeader";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const { user, isAuthenticated } = useSelector((store) => store.auth);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/stats");
        const data = await res.json();

        if (res.ok) {
          setStats(data.stats);
        } else {
          throw new Error(data.error || "Failed to load statistics");
        }
        console.log(data);
      } catch (err) {
        console.error("Stats fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="space-y-2 p-4 pt-3">
      <AdminHeader />
      <div className="bg-gradient-to-r from-[#006838] to-[#8dc63f] rounded-lg p-6 text-white my-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Welcome, Admin {user?.name}!
            </h1>
            <p className="text-[#e8f5e9]">
              Manage your learning platform efficiently. Here's your dashboard
              overview.
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">65%</div>
            <div className="text-sm text-[#e8f5e9]">Active Users Today</div>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <UserCard
              type="Student"
              date="2025"
              Number={stats?.users?.studentCount}
              iconColor="text-[#006838] dark:text-[#8dc63f]"
            />
            <UserCard
              type="Trainer"
              date="2025"
              Number={stats?.users?.trainerCount}
              iconColor="text-[#006838] dark:text-[#8dc63f]"
            />
            <UserCard
              type="Courses"
              date="2025"
              Number={stats?.users?.adminCount}
              iconColor="text-[#006838] dark:text-[#8dc63f]"
            />
            <UserCard
              type="Admin"
              date="2025"
              Number={stats?.courseCount}
              iconColor="text-[#006838] dark:text-[#8dc63f]"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gender Distribution */}
            <Card className="border-[#e0e0e0] dark:border-[#333] hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-[#006838] dark:text-[#8dc63f]">
                  Gender Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <CountChart
                  data={[
                    { name: "Male", value: stats?.gender?.maleCount || 60 },
                    { name: "Female", value: stats?.gender?.femaleCount || 40 },
                  ]}
                  colors={["#006838", "#8dc63f"]}
                />
              </CardContent>
            </Card>

            {/* Course Completion */}
            <Card className="border-[#e0e0e0] dark:border-[#333] hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-[#006838] dark:text-[#8dc63f]">
                  Course Completion Rates
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <PieChart
                  data={completionData}
                  colors={["#006838", "#8dc63f", "#e8f5e9"]}
                />
              </CardContent>
            </Card>

            {/* Monthly Enrollments */}
            <Card className="border-[#e0e0e0] dark:border-[#333] hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-[#006838] dark:text-[#8dc63f]">
                  Monthly Enrollments
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <BarChart
                  data={enrollmentData}
                  colors={["#006838", "#8dc63f"]}
                />
              </CardContent>
            </Card>

            {/* Performance Trends */}
            <Card className="border-[#e0e0e0] dark:border-[#333] hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-[#006838] dark:text-[#8dc63f]">
                  Performance Trends
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <LineChart
                  data={performanceData}
                  colors={["#006838", "#8dc63f"]}
                />
              </CardContent>
            </Card>
          </div>

          <Card className="border-[#e0e0e0] dark:border-[#333] hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-[#006838] dark:text-[#8dc63f]">
                Top Performers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader className="bg-[#e8f5e9] dark:bg-[#006838]/20">
                  <TableRow>
                    <TableHead className="text-[#006838] dark:text-[#8dc63f]">
                      Rank
                    </TableHead>
                    <TableHead className="text-[#006838] dark:text-[#8dc63f]">
                      Name
                    </TableHead>
                    <TableHead className="text-[#006838] dark:text-[#8dc63f]">
                      Course
                    </TableHead>
                    <TableHead className="text-right text-[#006838] dark:text-[#8dc63f]">
                      Score
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      id: 1,
                      name: "John Doe",
                      course: "Web Development",
                      score: "98%",
                      rank: 1,
                    },
                    {
                      id: 2,
                      name: "Jane Smith",
                      course: "Data Science",
                      score: "95%",
                      rank: 2,
                    },
                    {
                      id: 3,
                      name: "Mike Johnson",
                      course: "UI/UX Design",
                      score: "93%",
                      rank: 3,
                    },
                    {
                      id: 4,
                      name: "Sarah Williams",
                      course: "Mobile Development",
                      score: "91%",
                      rank: 4,
                    },
                  ].map((performer) => (
                    <TableRow
                      key={performer.id}
                      className="border-[#e0e0e0] dark:border-[#333]"
                    >
                      <TableCell>
                        <Badge
                          className={
                            performer.rank === 1
                              ? "bg-gradient-to-r from-[#006838] to-[#8dc63f] text-white"
                              : "bg-[#e8f5e9] text-[#006838] dark:bg-[#006838]/20 dark:text-[#8dc63f]"
                          }
                        >
                          #{performer.rank}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {performer.name}
                      </TableCell>
                      <TableCell>{performer.course}</TableCell>
                      <TableCell className="text-right">
                        <span className="font-bold text-[#006838] dark:text-[#8dc63f]">
                          {performer.score}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
