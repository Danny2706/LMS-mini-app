"use client";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  User,
  BookOpen,
  LogOut,
  Moon,
  Sun,
  Bookmark,
  Menu,
  X,
  Award,
  BarChart2,
} from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/globalStates/features/auth/authSlice";
import { customToast } from "@/lib/Toast";
import axios from "axios";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  const router = useRouter();
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });

      dispatch(logout()); // Clear Redux
      router.push("/login");
      customToast.success("Logout successfully");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navItems = [
    { icon: <Home size={20} />, label: "Home", href: "/user" },
    {
      icon: <BookOpen size={20} />,
      label: "My Course",
      href: "/user/myCourse",
    },
    {
      icon: <Bookmark size={20} />,
      label: "Saved Course",
      href: "/user/savedCourse",
    },
    {
      icon: <Award size={20} />,
      label: "Certificate",
      href: "/user/certificate",
    },

    {
      icon: <BarChart2 size={20} />,
      label: "Analytics",
      href: "/user/analytics",
    },
    { icon: <User size={20} />, label: "Profile", href: "/user/profile" },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#8dc63f] text-[#006838] shadow-md"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Sidebar/Navbar */}
      <AnimatePresence>
        {(!isMobile || isOpen) && (
          <motion.div
            initial={isMobile ? { x: -300 } : {}}
            animate={isMobile ? { x: 0 } : {}}
            exit={isMobile ? { x: -300 } : {}}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed z-40 w-64 h-screen bg-[#f8f8f8] dark:bg-[#1a1a1a] flex flex-col justify-between border-r border-[#e0e0e0] dark:border-[#333] py-7 ${
              isMobile ? "shadow-xl" : ""
            }`}
          >
            <div className="flex flex-col items-center">
              {/*  Logo  */}
              <motion.div
                className="flex items-center space-x-3 pb-6 cursor-pointer"
                whileHover="hover"
                initial="rest"
              >
                <motion.div
                  variants={{
                    rest: { scale: 1 },
                    hover: { scale: 1.05 },
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                  }}
                  className="relative w-10 h-10"
                >
                  <Image
                    src="/Green Pill-04.png"
                    alt="GREEN PILL Logo"
                    fill
                    className="object-contain"
                    priority
                  />

                  {/* Subtle glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-full opacity-0"
                    variants={{
                      hover: {
                        opacity: 0.1,
                        boxShadow: "0 0 20px 5px rgba(141, 198, 63, 0.5)",
                      },
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                <motion.div className="flex flex-col">
                  <motion.h1
                    className="text-2xl font-bold text-[#006838] dark:text-[#8DC63F]"
                    variants={{
                      rest: { x: 0 },
                      hover: { x: 1 },
                    }}
                  >
                    GREEN PILL
                    <motion.span
                      className="block h-0.5 bg-gradient-to-r from-[#006838] to-[#8DC63F] rounded-full mt-1"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        delay: 0.4,
                        duration: 0.8,
                        ease: "backOut",
                      }}
                    />
                  </motion.h1>
                  <motion.p
                    className="text-xs text-gray-500 dark:text-gray-400 mt-1"
                    variants={{
                      rest: { opacity: 0.8 },
                      hover: { opacity: 1 },
                    }}
                  >
                    Guide • Teach • Inspire
                  </motion.p>
                </motion.div>
              </motion.div>

              {/* Navigation Links */}
              <div className="w-full px-4 space-y-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div key={item.label} whileTap={{ scale: 0.95 }}>
                      <Link
                        href={item.href}
                        onClick={() => isMobile && setIsOpen(false)}
                        className={`flex items-center space-x-3 p-3 rounded-lg transition-colors relative ${
                          isActive
                            ? "bg-[#e8f5e9] dark:bg-[#006838]/30 text-[#006838] dark:text-[#8dc63f]"
                            : "text-[#333] dark:text-[#f8f8f8] hover:bg-[#e8f5e9] dark:hover:bg-[#006838]/20"
                        }`}
                      >
                        {isActive && (
                          <div className="absolute left-0 top-0 h-full w-1 bg-[#006838] dark:bg-[#8dc63f] rounded-r-md" />
                        )}
                        {item.icon}
                        <span className="text-base">{item.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Section */}
            <div className="w-full px-4 space-y-4">
              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="w-full flex items-center space-x-3 p-3 rounded-lg text-[#333] dark:text-[#f8f8f8] hover:bg-[#e8f5e9] dark:hover:bg-[#006838]/20 transition-colors"
              >
                {mounted && (
                  <>
                    {theme === "dark" ? (
                      <>
                        <Sun size={20} className="text-[#8dc63f]" />
                        <span>Light Mode</span>
                      </>
                    ) : (
                      <>
                        <Moon size={20} className="text-[#006838]" />
                        <span>Dark Mode</span>
                      </>
                    )}
                  </>
                )}
              </motion.button>

              {/* Logout */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={handleLogout}
                whileTap={{ scale: 0.95 }}
                className="w-full flex items-center space-x-3 p-3 rounded-lg text-[#d32f2f] dark:text-[#ff6659] hover:bg-[#ffebee] dark:hover:bg-[#d32f2f]/20 transition-colors"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
