"use client";

import { useParams } from "next/navigation";
import { dummyUsers, dummyUserDetails } from "@/utility/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, BookOpen, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function UserDetailPage() {
  const { userId } = useParams();
  if (!userId) return <div className="text-red-500 p-6">User ID is required</div>;

  const idParam = Array.isArray(userId) ? userId[0] : userId;
  const parsedId = Number(idParam);

  const user = dummyUsers.find((u) => u.id === parsedId);
  const details = dummyUserDetails[parsedId];

  if (!user) return <div className="text-red-500 p-6">User not found</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 bg-stone-100 dark:bg-stone-950 min-h-screen">
      {/* Header Info */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-stone-100">{user.name}</CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-300">{user.email}</p>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="capitalize border-blue-500 text-blue-600 dark:border-blue-300 dark:text-blue-300">
                {user.role}
              </Badge>
              <Badge className={`capitalize ${user.status === "active" ? "text-green-500 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}`}>
                {user.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 dark:text-gray-400">Member since: {details?.joined ?? "N/A"}</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Registered Courses */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-gray-800 dark:text-gray-100">
              <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-300" /> Registered Courses
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {details?.registeredCourses?.length ? (
              details.registeredCourses.map((course, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-stone-700 transition-all"
                >
                  <span className="font-medium text-gray-700 dark:text-gray-300">{course.name}</span>
                  <Progress value={course.progress} className="w-1/2 h-2 rounded-full" />
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">No courses registered.</p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Certifications */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-gray-800 dark:text-gray-100">
              <Award className="w-5 h-5 text-yellow-600 dark:text-yellow-800" /> Certifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {details?.certificates?.length ? (
              details.certificates.map((cert, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3 bg-white dark:bg-stone-800"
                >
                  <div>
                    <p className="font-semibold text-gray-700 dark:text-gray-300">{cert.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{cert.issuedDate}</p>
                  </div>
                  <Badge className="bg-emerald-500 text-white">Earned</Badge>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">No certificates yet.</p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Course Completion Summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-gray-800 dark:text-gray-100">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" /> Course Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">Courses Completed</p>
              <span className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">
                {details?.completedCourses?.length || 0}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">Certificates Earned</p>
              <span className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">
                {details?.certificates?.length || 0}
              </span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="text-center pt-4">
        <Link
          href="/admin/users"
          className="text-blue-600 hover:underline hover:text-blue-800 dark:text-blue-400 transition text-sm"
        >
          ← Back to Users List
        </Link>
      </div>
    </div>
  );
}
