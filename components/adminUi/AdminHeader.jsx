"use client";

import { useEffect, useState } from "react";
import { Bell, Trash2, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { customToast } from "@/lib/Toast";
import { logout } from "@/globalStates/features/auth/authSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminHeader() {
  const { user } = useSelector((store) => store.auth);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (user?.id) {
      fetchNotifications();
    }
  }, [user]);

  async function fetchNotifications() {
    const response = await fetch(`/api/notifications?userId=${user.id}`);
    const data = await response.json();
    setNotifications(data.notifications || []);
    setUnreadCount(data.notifications.filter((n) => !n.read).length);
  }

  async function handleDeleteNotification(notificationId) {
    const res = await fetch(`/api/notifications/${notificationId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== notificationId)
      );
      customToast.success("Notification deleted successfully");
      setUnreadCount((prev) => prev - 1);
    }
  }

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      dispatch(logout());
      router.push("/login");
      customToast.success("Logout successfully");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="sticky top-0 z-10 bg-background flex h-16 shrink-0 items-center gap-x-4  px-4 border-b border-[#e0e0e0] dark:border-[#333] sm:gap-x-6 sm:px-6 lg:px-8">
      <div className="flex flex-1 gap-x-4 justify-end self-stretch lg:gap-x-6">
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* Notification Bell */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="relative text-[#006838] dark:text-[#8dc63f] hover:bg-[#e8f5e9] dark:hover:bg-[#006838]/20"
              >
                <Bell className="w-24 h-24" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center bg-gradient-to-r from-[#006838] to-[#8dc63f] text-white">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-80 max-h-96 overflow-y-auto border-[#e0e0e0] dark:border-[#333]"
            >
              <DropdownMenuLabel className="text-[#006838] dark:text-[#8dc63f]">
                Notifications
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[#e0e0e0] dark:bg-[#333]" />
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className={`flex justify-between items-start gap-2 ${
                      notification.read ? "opacity-75" : ""
                    } hover:bg-[#e8f5e9] dark:hover:bg-[#006838]/20`}
                    onSelect={(e) => e.preventDefault()}
                  >
                    <div className="flex flex-col space-y-1 w-full">
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-medium text-[#006838] dark:text-[#8dc63f]">
                          {notification.message}
                        </p>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            notification.type === "SUCCESS"
                              ? "bg-[#e8f5e9] text-[#006838] dark:bg-[#006838]/20 dark:text-[#8dc63f]"
                              : notification.type === "WARNING"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {notification.type.toLowerCase()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-300">
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteNotification(notification.id);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </DropdownMenuItem>
                ))
              ) : (
                <DropdownMenuItem className="text-sm text-gray-500 dark:text-gray-300">
                  No new notifications
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator className="bg-[#e0e0e0] dark:bg-[#333]" />
              <DropdownMenuItem className="text-sm text-center justify-center text-[#006838] dark:text-[#8dc63f] hover:bg-[#e8f5e9] dark:hover:bg-[#006838]/20">
                Mark all as read
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Admin Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full border border-[#006838] dark:border-[#8dc63f] hover:bg-[#e8f5e9] dark:hover:bg-[#006838]/20"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.profilePic} alt="Admin" />
                  <AvatarFallback className="capitalize bg-[#e8f5e9] text-[#006838] dark:bg-[#006838]/20 dark:text-[#8dc63f]">
                    {user?.name?.charAt(0) || "A"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="border-[#e0e0e0] dark:border-[#333]"
            >
              <DropdownMenuLabel className="text-[#006838] dark:text-[#8dc63f]">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[#e0e0e0] dark:bg-[#333]" />
              <DropdownMenuItem
                asChild
                className="hover:bg-[#e8f5e9] dark:hover:bg-[#006838]/20 focus:bg-[#e8f5e9] dark:focus:bg-[#006838]/20"
              >
                <Link
                  href="/admin/profile"
                  className="text-[#006838] dark:text-[#8dc63f]"
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#e0e0e0] dark:bg-[#333]" />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-[#006838] dark:text-[#8dc63f] hover:bg-[#e8f5e9] dark:hover:bg-[#006838]/20 focus:bg-[#e8f5e9] dark:focus:bg-[#006838]/20"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
