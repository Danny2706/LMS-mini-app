"use client";

import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  Medal,
  Star,
  Plus,
  Search,
  FileEdit,
  Trash2,
  BarChart2,
  Award,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const GamificationPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Dummy data for demonstration
  const badges = [
    {
      id: 1,
      name: "Quick Learner",
      description: "Complete 5 courses within a month",
      points: 100,
      icon: "🚀",
      awarded: 156,
    },
    {
      id: 2,
      name: "Perfect Score",
      description: "Get 100% in any assessment",
      points: 150,
      icon: "⭐",
      awarded: 89,
    },
    {
      id: 3,
      name: "Helper",
      description: "Answer 10 questions in the community",
      points: 75,
      icon: "🤝",
      awarded: 234,
    },
  ];

  const leaderboard = [
    {
      rank: 1,
      name: "John Doe",
      points: 2500,
      badges: 12,
      level: "Gold",
    },
    {
      rank: 2,
      name: "Jane Smith",
      points: 2350,
      badges: 10,
      level: "Gold",
    },
    {
      rank: 3,
      name: "Mike Johnson",
      points: 2100,
      badges: 8,
      level: "Silver",
    },
  ];

  const stats = [
    {
      title: "Total Badges",
      value: "24",
      description: "Active badges",
      icon: Medal,
    },
    {
      title: "Total Points",
      value: "45.2K",
      description: "Awarded points",
      icon: Star,
    },
    {
      title: "Active Users",
      value: "82%",
      description: "Participating in gamification",
      icon: Trophy,
    },
  ];

  return (
    <div className="space-y-6 p-4 pt-7">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#006838] dark:text-[#8dc63f]">
            Gamification
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage badges, points, and achievements
          </p>
        </div>
        <Button className="bg-gradient-to-r from-[#006838] to-[#8dc63f] text-white hover:from-[#006838]/90 hover:to-[#8dc63f]/90">
          <Plus className="mr-2 h-4 w-4" /> Create Badge
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index} className="border-[#e0e0e0] dark:border-[#333] hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#006838] dark:text-[#8dc63f]">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-[#006838] dark:text-[#8dc63f]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#006838] dark:text-[#8dc63f]">
                {stat.value}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs defaultValue="badges" className="space-y-4">
        <TabsList className="bg-[#e8f5e9] dark:bg-[#006838]/20 border border-[#e0e0e0] dark:border-[#333]">
          <TabsTrigger
            value="badges"
            className="data-[state=active]:bg-[#006838] data-[state=active]:text-white text-[#006838] dark:text-[#8dc63f]"
          >
            Badges
          </TabsTrigger>
          <TabsTrigger
            value="leaderboard"
            className="data-[state=active]:bg-[#006838] data-[state=active]:text-white text-[#006838] dark:text-[#8dc63f]"
          >
            Leaderboard
          </TabsTrigger>
        </TabsList>

        <TabsContent value="badges" className="space-y-4">
          <Card className="border-[#e0e0e0] dark:border-[#333] hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-[#006838] dark:text-[#8dc63f]">
                Badge Management
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Create and manage achievement badges
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative mb-6">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <Input
                  placeholder="Search badges..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 border-[#e0e0e0] dark:border-[#333] focus:border-[#006838] focus:ring-[#006838]"
                />
              </div>

              <div className="rounded-lg border border-[#e0e0e0] dark:border-[#333]">
                <Table>
                  <TableHeader className="bg-[#e8f5e9] dark:bg-[#006838]/20">
                    <TableRow>
                      <TableHead className="text-[#006838] dark:text-[#8dc63f]">
                        Badge
                      </TableHead>
                      <TableHead className="text-[#006838] dark:text-[#8dc63f]">
                        Description
                      </TableHead>
                      <TableHead className="text-[#006838] dark:text-[#8dc63f]">
                        Points
                      </TableHead>
                      <TableHead className="text-[#006838] dark:text-[#8dc63f]">
                        Times Awarded
                      </TableHead>
                      <TableHead className="text-right text-[#006838] dark:text-[#8dc63f]">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {badges.map((badge) => (
                      <TableRow key={badge.id} className="border-[#e0e0e0] dark:border-[#333]">
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{badge.icon}</span>
                            {badge.name}
                          </div>
                        </TableCell>
                        <TableCell>{badge.description}</TableCell>
                        <TableCell>{badge.points}</TableCell>
                        <TableCell>{badge.awarded}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-[#006838] text-[#006838] hover:bg-[#006838]/10 dark:border-[#8dc63f] dark:text-[#8dc63f] dark:hover:bg-[#8dc63f]/10"
                          >
                            <FileEdit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-4">
          <Card className="border-[#e0e0e0] dark:border-[#333] hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-[#006838] dark:text-[#8dc63f]">
                Global Leaderboard
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Top performing users across the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-[#e0e0e0] dark:border-[#333]">
                <Table>
                  <TableHeader className="bg-[#e8f5e9] dark:bg-[#006838]/20">
                    <TableRow>
                      <TableHead className="text-[#006838] dark:text-[#8dc63f]">
                        Rank
                      </TableHead>
                      <TableHead className="text-[#006838] dark:text-[#8dc63f]">
                        User
                      </TableHead>
                      <TableHead className="text-[#006838] dark:text-[#8dc63f]">
                        Points
                      </TableHead>
                      <TableHead className="text-[#006838] dark:text-[#8dc63f]">
                        Badges
                      </TableHead>
                      <TableHead className="text-[#006838] dark:text-[#8dc63f]">
                        Level
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaderboard.map((user) => (
                      <TableRow key={user.rank} className="border-[#e0e0e0] dark:border-[#333]">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {user.rank === 1 && (
                              <Trophy className="h-4 w-4 text-[#006838] dark:text-[#8dc63f]" />
                            )}
                            {user.rank === 2 && (
                              <Medal className="h-4 w-4 text-[#006838] dark:text-[#8dc63f]" />
                            )}
                            {user.rank === 3 && (
                              <Award className="h-4 w-4 text-[#006838] dark:text-[#8dc63f]" />
                            )}
                            #{user.rank}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {user.name}
                        </TableCell>
                        <TableCell>{user.points}</TableCell>
                        <TableCell>{user.badges}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              user.level === "Gold"
                                ? "bg-gradient-to-r from-[#006838] to-[#8dc63f] text-white"
                                : "bg-[#e8f5e9] text-[#006838] dark:bg-[#006838]/20 dark:text-[#8dc63f]"
                            }
                          >
                            {user.level}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GamificationPage;