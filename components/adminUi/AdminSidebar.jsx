"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { selectSidebar } from "@/globalStates/features/leftSidbar/sidbarSlice"
import { motion } from "framer-motion"
import {
  LogOut,
  Users,
  User,
  BookOpen,
  FileText,
  BarChart2,
  Award,
  Bell,
  AwardIcon,
  HouseIcon,
  Settings,
} from "lucide-react"
import axios from "axios"
import { logout } from "@/globalStates/features/auth/authSlice"
import { customToast } from "@/lib/Toast"

const navItems = [
  {
    name: "Home",
    icon: HouseIcon,
    path: "/",
    visible: ["admin", "trainer", "user"],
  },
  { name: "Users", icon: Users, path: "/admin/users", visible: ["admin"] },
  {
    name: "Courses",
    icon: BookOpen,
    path: "/admin/courses",
    visible: ["admin", "trainer"],
  },
  {
    name: "Assessments",
    icon: FileText,
    path: "/admin/assessments",
    visible: ["admin"],
  },
  {
    name: "Analytics",
    icon: BarChart2,
    path: "/admin/analytics",
    visible: ["admin"],
  },
  {
    name: "Notifications",
    icon: Bell,
    path: "/admin/notifications",
    visible: ["admin", "trainer"],
  },
  { name: "Profile", icon: User, path: "/admin/profile", visible: ["admin"] },
  {
    name: "Settings",
    icon: Settings,
    path: "/admin/settings",
    visible: ["admin"],
  },
  {
    name: "Gamefication",
    icon: AwardIcon,
    path: "/admin/gamefication",
    visible: ["admin"],
  },
  {
    name: "Students",
    icon: Users,
    path: "/trainer/students",
    visible: ["trainer"],
  },
  {
    name: "Assigned Courses",
    icon: BookOpen,
    path: "/trainer/courses",
    visible: ["trainer"],
  },
  {
    name: "Certifications",
    icon: Award,
    path: "/trainer/certifications",
    visible: ["trainer"],
  },
  {
    name: "Quize",
    icon: FileText,
    path: "/trainer/quizes",
    visible: ["trainer"],
  },
]

const role = "admin" // or 'trainer' dynamically

export const AdminSidebar = () => {
  const pathname = usePathname()
  const { collapsed } = useSelector(selectSidebar)

  const router = useRouter()
  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true })

      dispatch(logout()) // Clear Redux
      router.push("/login")
      customToast.success("Logout successfully")
    } catch (err) {
      console.error("Logout error:", err)
    }
  }
  return (
    <div
      className={`transition-all duration-300 h-full border-r flex flex-col shadow-xl
      ${collapsed ? "w-16" : "w-64"}`}
    >
      <div
        className={`flex flex-col ml-3  ${
          collapsed ? "justify-center" : "px-4 space-x-2"
        } py-4 mb-3 mt-5`}
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center"
        >
          <div className="w-4 h-4 bg-white rounded-sm rotate-45" />
        </motion.div>
      </div>
      <hr />
      <nav className="flex-1 px-2 space-y-1">
        {navItems
          .filter((item) => item.visible.includes(role))
          .map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center px-2 py-3 text-sm font-medium rounded-md
                ${
                  pathname === item.path
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
            >
              <item.icon
                className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-3"}`}
              />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
      </nav>
      <div className="border-t p-4">
        <button
          className="flex items-center text-sm text-red-600 hover:bg-gray-100 w-full"
          onClick={handleLogout}
        >
          <LogOut className={`h-4 w-4 ${collapsed ? "mx-auto" : "mr-2"}`} />
          {!collapsed && <span>Log out</span>}
        </button>
      </div>
    </div>
  )
}
