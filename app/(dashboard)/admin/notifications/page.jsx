"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import clsx from "clsx"

export default function Notification() {
  const [notifications, setNotifications] = useState([])

  // useEffect(() => {
  //   fetch('/api/notifications')
  //     .then(res => res.json())
  //     .then(setNotifications)
  // }, [])

  const markAsRead = async (id) => {
    await fetch("/api/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, action: "read" }),
    })

    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )

    localStorage.setItem("notif-update", Date.now().toString())
  }

  const deleteNotification = async (id) => {
    await fetch("/api/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, action: "delete" }),
    })

    setNotifications((prev) => prev.filter((n) => n.id !== id))
    localStorage.setItem("notif-update", Date.now().toString())
  }

  const handleCardClick = (n) => {
    if (!n.read) markAsRead(n.id)
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h2 className="text-xl font-bold mb-4">🔔 Recent Notifcations </h2>

      {notifications.length === 0 && (
        <p className="text-gray-500">No notifications found.</p>
      )}

      {notifications.map((n) => (
        <div
          key={n.id}
          onClick={() => handleCardClick(n)}
          className={clsx(
            "cursor-pointer flex justify-between items-start p-4 border rounded-lg transition-shadow duration-200 ease-in-out hover:shadow-lg",
            n.read ? "bg-gray-100" : "bg-yellow-50 border-yellow-300"
          )}
        >
          <div className="flex-1">
            <div className="flex items-start gap-2">
              {!n.read && (
                <span className="mt-1 w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
              )}
              <div>
                <p className={clsx("text-sm", !n.read && "font-semibold")}>
                  {n.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">{n.timestamp}</p>
              </div>
            </div>
          </div>
          <div className="flex space-x-2 ml-4">
            <Button
              onClick={(e) => {
                e.stopPropagation()
                deleteNotification(n.id)
              }}
              variant="outline"
              size="icon"
              className="hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 text-red-600" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
