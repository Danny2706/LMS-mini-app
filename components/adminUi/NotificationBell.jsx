"use client";

import { useEffect, useState } from "react";
import { Bell, Trash2, Info, Clock, Book } from "lucide-react";
import axios from "axios";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const typeIcons = {
  announcement: <Info className="text-blue-500 w-4 h-4" />,
  deadline: <Clock className="text-orange-500 w-4 h-4" />,
  course: <Book className="text-green-500 w-4 h-4" />,
};

export default function NotificationBellDropdown() {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = () => {
    axios
      .get("/api/notifications")
      .then((res) => setNotifications(res.data))
      .catch((err) => console.error("Failed to fetch notifications:", err));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const deleteNotification = async (id) => {
    await axios.patch("/api/notifications", {
      id,
      action: "delete",
    });
    setNotifications(notifications.filter((n) => n.id !== id));
    localStorage.setItem("notif-update", Date.now().toString());
  };

  const clearAllNotifications = async () => {
    await Promise.all(notifications.map((n) => deleteNotification(n.id)));
  };

  const markAsReadAndView = async (id) => {
    await axios.patch("/api/notifications", {
      id,
      action: "read",
    });
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    localStorage.setItem("notif-update", Date.now().toString());
    window.location.href = `/admin/notifications/${id}`;
  };

  useEffect(() => {
    fetchNotifications();

    const handleStorage = (e) => {
      if (e.key === "notif-update") {
        fetchNotifications();
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative w-8 h-8 rounded-full  flex items-center justify-center transition">
          <Bell size={34} className="text-stone-950 dark:text-stone-50" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-10 bg-red-600 text-white  text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-red-600 shadow">
              {unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-96 p-0 overflow-hidden">
        <div className="bg-gray-400 dark:bg-stone-900 text-white flex justify-between items-center px-4 py-2">
          <span className="text-sm font-medium">Notifications</span>
          <button
            onClick={clearAllNotifications}
            className="text-xs underline  hover:text-red-100"
          >
            Clear All
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto">
          {notifications.filter((n) => !n.read).length === 0 ? (
            <div className="px-4 py-4 text-sm text-gray-500 text-center">
              No unread notifications.
            </div>
          ) : (
            notifications
              .filter((n) => !n.read)
              .map((n) => (
                <DropdownMenuItem
                  key={n.id}
                  asChild
                  className="flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-gray-100"
                >
                  <div
                    onClick={() => markAsReadAndView(n.id)}
                    className="flex-1 flex gap-2 items-start"
                  >
                    <div>
                      {typeIcons[n.type] || (
                        <Info className="text-gray-400 dark:text-gray-500 w-4 h-4" /> 
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{n.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(n.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(n.id);
                    }}
                    className="text-red-500 hover:text-red-700"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </DropdownMenuItem>
              ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
