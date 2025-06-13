"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Star, Search } from "lucide-react"
import { useSelector } from "react-redux"

export default function CourseFilter({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  courseType,
  setCourseType,
}) {
  const { courses } = useSelector((store) => store.courses)

  const courseCategories = useMemo(() => {
    const types = courses?.map((course) => course.category).filter(Boolean)
    const unique = Array.from(new Set(types))
    return ["all", ...unique]
  }, [courses])

  return (
    <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
      <div className="flex w-full items-center justify-between gap-2 md:w-auto">
        {/* Favorites/All toggle */}
        <div className="flex bg-muted p-1 rounded-lg">
          {["all"].map((tab) => (
            <Button
              key={tab}
              variant="ghost"
              size="sm"
              className={`px-6 rounded-md ${
                activeTab === tab
                  ? "bg-background shadow-sm"
                  : "hover:bg-transparent"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "favorites" ? <Star className="h-4 w-4 mr-2" /> : null}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 w-full">
        {/* Search input */}
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search courses..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Course type filter */}
        <Select value={courseType} onValueChange={setCourseType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            {courseCategories?.map((type) => (
              <SelectItem key={type} value={type}>
                {type === "all" ? "All Types" : formatEnumText(type)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
function formatEnumText(enumValue) {
  return enumValue
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}
