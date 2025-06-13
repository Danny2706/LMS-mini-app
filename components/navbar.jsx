"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const navItems = [
    { text: "Home", href: "#hero" },
    { text: "Careers", href: "#careers" },
    { text: "Blog", href: "#blog" },
    { text: "About Us", href: "#about" },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <header className="fixed w-full z-50 backdrop-blur-lg bg-white/40 dark:bg-black/30 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 lg:px-12">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center"
            >
              <div className="w-4 h-4 bg-white rounded-sm transform rotate-45" />
            </motion.div>
            <span className="text-2xl font-bold text-gray-800 dark:text-white">
              Efuye
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map(({ text, href }, index) => (
              <a
                key={index}
                href={href}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors relative group"
              >
                {text}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 dark:text-white"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login">
              <Button
                variant="ghost"
                className="text-gray-600 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900"
              >
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 shadow-lg hover:shadow-orange-200 transition-all">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Nav Menu */}
        {isOpen && (
          <div className="md:hidden bg-white/80 dark:bg-black/70 backdrop-blur-lg px-6 pb-4 space-y-4 shadow-md">
            {navItems.map(({ text, href }, index) => (
              <a
                key={index}
                href={href}
                onClick={() => setIsOpen(false)} // Close menu on click
                className="block text-gray-700 dark:text-gray-200 font-medium hover:text-orange-600"
              >
                {text}
              </a>
            ))}
            <div className="flex flex-col gap-2 mt-4">
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="text-gray-600 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900 w-full"
                >
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md hover:shadow-orange-300 transition-all">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Theme Toggle Switch */}
      {mounted && (
        <div className="fixed bottom-8 right-8 z-50 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-full p-2 shadow-md">
          <Switch
            checked={resolvedTheme === "dark"}
            onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
          />
        </div>
      )}
    </>
  );
}
