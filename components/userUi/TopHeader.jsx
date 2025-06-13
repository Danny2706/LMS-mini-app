"use client"
import { useEffect, useState } from "react"
import { Bell, Menu, Search, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { customToast } from "@/lib/Toast"
import { logout } from "@/globalStates/features/auth/authSlice"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function TopHeader() {
  const { user } = useSelector((store) => store.auth)
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    if (user?.id) {
      fetchNotifications()
    }
  }, [user])

  async function fetchNotifications() {
    const response = await fetch(`/api/notifications?userId=${user.id}`)
    const data = await response.json()
    setNotifications(data.notifications || [])
    setUnreadCount(data.notifications.filter((n) => !n.read).length)
  }

  async function handleDeleteNotification(notificationId) {
    console.log(notificationId)
    const res = await fetch(`/api/notifications/${notificationId}`, {
      method: "DELETE",
    })
    if (res.ok) {
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== notificationId)
      )

      customToast.success("Notification deleted successfully")
      setUnreadCount((prev) => prev - 1)
    }
  }

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true })

      dispatch(logout())
      router.push("/login")
      customToast.success("Logout successfully")
    } catch (err) {
      console.error("Logout error:", err)
    }
  }

  return (
    <div className="sticky top-0 z-10 bg-background flex h-16 shrink-0 items-center gap-x-4 mt-2 px-4 border-b border-muted sm:gap-x-6 sm:px-6 lg:px-8">
      <div className="flex flex-1 gap-x-4 justify-end self-stretch lg:gap-x-6">
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-80 max-h-96 overflow-y-auto"
            >
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className={`flex justify-between items-start gap-2 ${
                      notification.read ? "opacity-75" : ""
                    }`}
                    onSelect={(e) => e.preventDefault()} // Prevent default menu item behavior
                  >
                    <div className="flex flex-col space-y-1 w-full">
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-medium">
                          {notification.message}
                        </p>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            notification.type === "SUCCESS"
                              ? "bg-green-100 text-green-800"
                              : notification.type === "WARNING"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {notification.type.toLowerCase()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-red-500 hover:bg-red-50"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteNotification(notification.id)
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </DropdownMenuItem>
                ))
              ) : (
                <DropdownMenuItem className="text-sm text-gray-500">
                  No new notifications
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-sm text-center justify-center text-blue-600">
                Mark all as read
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full border border-[#006838]"
              >
                <Avatar className="h-8 w-8 ">
                  <AvatarImage src={user?.profilePic} alt="Student" />
                  <AvatarFallback className={"capitalize"}>
                    {user?.name || "ST"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/user/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
