"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, UserCog, GraduationCap } from "lucide-react";

const UserCard = ({ type, date, Number }) => {
  const getIcon = () => {
    switch (type) {
      case "Student":
        return <GraduationCap className="h-6 w-6 text-blue-600" />;
      case "Trainer":
        return <Users className="h-6 w-6 text-green-600" />;
      case "Courses":
        return <BookOpen className="h-6 w-6 text-purple-600" />;
      case "Admin":
        return <UserCog className="h-6 w-6 text-red-600" />;
      default:
        return null;
    }
  };

  const getColor = () => {
    switch (type) {
      case "Student":
        return "bg-blue-50 dark:bg-blue-900/20";
      case "Trainer":
        return "bg-green-50 dark:bg-green-900/20";
      case "Courses":
        return "bg-purple-50 dark:bg-purple-900/20";
      case "Admin":
        return "bg-red-50 dark:bg-red-900/20";
      default:
        return "bg-gray-50";
    }
  };

  return (
    <Card className={`${getColor()} border-none shadow-md`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{type}s</CardTitle>
        {getIcon()}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{Number}</div>
        <p className="text-xs text-muted-foreground">Target {date}</p>
      </CardContent>
    </Card>
  );
};

export default UserCard;
