"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
          {/*  Logo  */}
          <motion.div
            className="flex items-center space-x-3 cursor-pointer"
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
              className="relative w-48 h-9 mb-2"
            >
              <Image
                src="/Green Pill-10.png"
                alt="GREEN PILL Logo"
                // fill
                className="object-contain"
                priority
                width={100}
                height={50}
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

            {/* <motion.div className="flex flex-col">
              <motion.h1
                className="text-2xl font-bold text-[#006838] dark:text-[#8DC63F]"
                variants={{
                  rest: { x: 0 },
                  hover: { x: 1 },
                }}
              >
                GREEN PILL
              </motion.h1>
            </motion.div> */}
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map(({ text, href }, index) => (
              <a
                key={index}
                href={href}
                className="text-[#231F20]/80 dark:text-[#FFFFFF]/80 hover:text-[#006838] dark:hover:text-[#8DC63F] transition-colors relative group"
              >
                {text}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#8DC63F] transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#231F20] dark:text-[#FFFFFF]"
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
                className="w-full bg-gradient-to-r from-[#006838] to-[#8DC63F] hover:from-[#006838]/90 hover:to-[#8DC63F]/90 text-[#FFFFFF] shadow-md hover:shadow-[#8DC63F]/20 transition-all"
              >
                Login
              </Button>
            </Link>
            {/* <Link href="/signup">
              <Button className="bg-gradient-to-r from-[#006838] to-[#8DC63F] hover:from-[#006838]/90 hover:to-[#8DC63F]/90 text-[#FFFFFF] px-6 shadow-lg hover:shadow-[#8DC63F]/20 transition-all">
                Sign Up
              </Button>
            </Link> */}
          </div>
        </div>
        {/* Mobile Nav Menu */}
        {isOpen && (
          <div className="md:hidden bg-white/80 dark:bg-[#231F20]/90 backdrop-blur-lg px-6 pb-4 space-y-4 shadow-md">
            {navItems.map(({ text, href }, index) => (
              <a
                key={index}
                href={href}
                onClick={() => setIsOpen(false)}
                className="block text-[#231F20] dark:text-[#FFFFFF] font-medium hover:text-[#006838] dark:hover:text-[#8DC63F]"
              >
                {text}
              </a>
            ))}
            <div className="flex flex-col gap-2 mt-4">
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="w-full bg-gradient-to-r from-[#006838] to-[#8DC63F] hover:from-[#006838]/90 hover:to-[#8DC63F]/90 text-[#FFFFFF] shadow-md hover:shadow-[#8DC63F]/20 transition-all"
                >
                  Login
                </Button>
              </Link>
              {/* <Link href="/signup">
                <Button className="w-full bg-gradient-to-r from-[#006838] to-[#8DC63F] hover:from-[#006838]/90 hover:to-[#8DC63F]/90 text-[#FFFFFF] shadow-md hover:shadow-[#8DC63F]/20 transition-all">
                  Sign Up
                </Button>
              </Link> */}
            </div>
          </div>
        )}
      </header>

      {/* Theme Toggle Switch */}
      {mounted && (
        <div className="fixed bottom-8 right-8 z-50 bg-[#FFFFFF] dark:bg-[#231F20] border dark:border-[#231F20] rounded-full p-2 shadow-md">
          <Switch
            checked={resolvedTheme === "dark"}
            onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
          />
        </div>
      )}
    </>
  );
}
