'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Bell } from 'lucide-react'

export default function NotificationBell() {
  const [unreadCount, setUnreadCount] = useState(0)

  const fetchUnread = () => {
    fetch('/api/notifications')
      .then(res => res.json())
      .then(data => {
        const count = data.filter(n => !n.read).length
        setUnreadCount(count)
      })
  }

  useEffect(() => {
    fetchUnread()
    const handleStorageChange = (e) => {
      if (e.key === 'notif-update') {
        fetchUnread()
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return (
    <Link href="/admin/notifications" className="relative flex items-center justify-center w-10 h-10">
      <Bell className="w-7 h-7 text-black" />
      {unreadCount > 0 && (
        <span className="absolute top-0 right-0  bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-white shadow-sm">
          {unreadCount}
        </span>
      )}
    </Link>
  )
}
