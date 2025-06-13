"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Menu, LogOut, Settings,UserCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import NotificationBell from "./NotificationBell";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "@/globalStates/features/leftSidbar/sidbarSlice";
import axios from "axios";
import { useTheme } from "next-themes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

export const AdminNavbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    axios.get("/api/dummyUSerProfile").then((res) => {
      setUser(res.data);
    });
  }, []);

  const handleProfileClick = () => router.push("/admin/profile");
  const handleLogout = () => router.push("/login");

  return (
    <div className="bg-stone-50 dark:bg-stone-950 dark:text-stone-50 shadow-sm">
      <div className="flex h-16 items-center px-4">
        <div className="flex text-gray-500 dark:text-stone-50 items-center space-x-4">
          <Menu size={35} onClick={() => dispatch(toggleSidebar())} />
        </div>

        {/* Right Side */}
        <div className="ml-auto flex items-center gap-6 justify-end">
          <NotificationBell />
          {mounted && (
            <div className=" z-50 bg-gray-800 dark:bg-gray-100 border dark:border-gray-100 rounded-full  shadow-md">
              <Switch   className={"w-10  h-6 p-0 bg-gray-100 dark:bg-gray-800 rounded-full relative focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200 ease-in-out"}
                aria-label="Toggle dark mode"
                checked={resolvedTheme === "dark"}
                onCheckedChange={(checked) =>
                  setTheme(checked ? "dark" : "light")
                }
              />
            </div>
          )}
          {/* Profile Section */}
          <DropdownMenu nonfocusable>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center gap-3 rounded-full  transition cursor-pointer"
                aria-label="Open profile menu"
              >
                {user ? (
                  <>
                    <div className="flex flex-col items-end text-right">
                      <span className="text-sm font-medium text-stone-900 dark:text-stone-50 truncate max-w-[120px]">
                        {user.name}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-stone-50 truncate max-w-[120px]">
                        {user.email}
                      </span>
                    </div>

                    <Image
                      src={user.avatar}
                      alt={`${user.name} avatar`}
                      width={36}
                      height={36}
                      className="object-cover rounded-full w-8 h-8 ring-2 ring-indigo-500"
                      priority
                    />
                  </>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
                )}
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-fit py-4 ml-80 mt-2 text-left mr-2 bg-white text-stone-950 dark:bg-stone-900 dark:text-stone-50 shadow-xl rounded-xl  border"
              align="end"
              asChild
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <DropdownMenuItem
                  onClick={handleProfileClick}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition"
                >
                  <UserCircle className="text-stone-950 dark:text-stone-50" size={16} />
                  my Account
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleProfileClick}
                  className="flex items-center text-left gap-2 px-3 py-2 rounded-md text-sm text-left hover:bg-gray-100 cursor-pointer transition"
                >
                  <Settings className="text-stone-950 dark:text-stone-50" size={16} />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 text-left rounded-md text-sm hover:bg-red-100 text-red-600 cursor-pointer transition"
                >
                  <LogOut className="text-stone-950 dark:text-stone-50" size={16} />
                  Logout
                </DropdownMenuItem>
              </motion.div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
