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
import TopHeader from "@/components/userUi/TopHeader";

export default function TrainerDashboard() {
  return (
    <div className="container mx-auto px-4 pb-8 mt-6">
      <div className="bg-gradient-to-r from-[#006838] to-[#8dc63f] rounded-lg p-6 text-white my-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, Alex!</h1>
            <p className="text-blue-100">
              Continue your learning journey. You're doing great!
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">45%</div>
            <div className="text-sm text-blue-100">Average Progress</div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-base font-medium">
              Total Courses
            </CardTitle>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
              <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <div className="flex items-center space-x-2 mt-1">
              <TrendingUp className="h-4 w-4 text-green-500 dark:text-green-400" />
              <p className="text-sm text-muted-foreground">
                2 active this week
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-base font-medium">
              Active Students
            </CardTitle>
            <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
              <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Attendance Rate</span>
                <span>75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-base font-medium">
              Upcoming Sessions
            </CardTitle>
            <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full">
              <Calendar className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <div className="flex flex-col gap-1 mt-2">
              <Badge variant="outline" className="w-fit">
                Today at 2 PM
              </Badge>
              <p className="text-sm text-muted-foreground">
                Web Development Basics
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-base font-medium">
              Pending Tasks
            </CardTitle>
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
              <ClipboardList className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <div className="flex justify-between items-center mt-2">
              <Badge variant="secondary">8 Assignments</Badge>
              <Badge variant="secondary">4 Quizzes</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-blue-500" />
                <CardTitle className="text-2xl font-semibold">
                  Recent Activities
                </CardTitle>
              </div>
              <Button variant="ghost" className="text-blue-600">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Activity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      Assignment Graded
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                        Completed
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      2h ago
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      New Quiz Created
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">Draft</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      5h ago
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Student Progress Updated
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                        Updated
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      1d ago
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-500" />
                <CardTitle className="text-2xl font-semibold">
                  Quick Actions
                </CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button className="w-full justify-start h-auto py-4">
              <div className="flex items-center">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-3">
                  <ClipboardList className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <span>Create Quiz</span>
              </div>
            </Button>
            <Button className="w-full justify-start h-auto py-4">
              <div className="flex items-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full mr-3">
                  <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <span>View Students</span>
              </div>
            </Button>
            <Button className="w-full justify-start h-auto py-4">
              <div className="flex items-center">
                <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full mr-3">
                  <Calendar className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </div>
                <span>Schedule Class</span>
              </div>
            </Button>
            <Button className="w-full justify-start h-auto py-4">
              <div className="flex items-center">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-3">
                  <BookOpen className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <span>Course Content</span>
              </div>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
