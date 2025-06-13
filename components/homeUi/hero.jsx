"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Play,
  Calendar,
  Mail,
  CheckCircle,
  ChevronRight,
  BookOpen,
  Users,
  Award,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroPage() {

  const router = useRouter()

  const handleClick = () => {
    router.push("/welcome");
  };

  return (
    <div id="hero" className="min-h-screen overflow-x-hidden dark:bg-black">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#8DC63F]/10 to-[#006838]/10 dark:bg-[#231F20]">
        <main className="px-4 pt-24 sm:px-6 lg:px-12 lg:pt-32 pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left Content */}
            <div className="space-y-8">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl sm:text-5xl font-bold leading-tight text-[#231F20] dark:text-[#FFFFFF]"
              >
                <span className="text-[#006838]">Studying</span>{" "}
                <span>Online is now</span> <span>much easier</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-[#231F20]/80 dark:text-[#FFFFFF]/80 text-lg max-w-md"
              >
                GREEN PILL is an interesting platform that will teach you in a
                more interactive way.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  onClick={handleClick}
                  className="bg-gradient-to-r from-[#006838] to-[#8DC63F] hover:from-[#006838]/90 hover:to-[#8DC63F]/90 text-white px-8 py-3 text-lg shadow-lg hover:shadow-[#8DC63F]/20 transition-all"
                >
                  Get Started/Sign up
                </Button>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 text-[#231F20] dark:text-[#FFFFFF] px-8 py-3 text-lg hover:bg-[#8DC63F]/10 dark:hover:bg-[#231F20]/60"
                >
                  <Play className="w-5 h-5" />
                  Watch how it works
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="grid grid-cols-3 gap-4 pt-8"
              >
                {[
                  {
                    icon: Users,
                    color: "text-[#006838]",
                    value: "15K+",
                    label: "Active Students",
                  },
                  {
                    icon: BookOpen,
                    color: "text-[#8DC63F]",
                    value: "10K+",
                    label: "Courses",
                  },
                  {
                    icon: Award,
                    color: "text-[#006838]",
                    value: "5K+",
                    label: "Graduates",
                  },
                ].map(({ icon: Icon, color, value, label }, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div
                      className={`text-2xl font-bold flex items-center ${color}`}
                    >
                      <Icon className="w-5 h-5 mr-1" /> {value}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Content */}
            <div className="relative w-full flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-sm sm:max-w-md md:max-w-lg"
              >
                <Image
                  src="/student-hero.png"
                  alt="Happy student"
                  width={544}
                  height={892}
                  className="w-full h-auto"
                  priority
                />
              </motion.div>

              {/* Floating Cards */}
              {[
                {
                  icon: <Calendar className="w-46 h-6 text-cyan-400" />,
                  title: "250k",
                  subtitle: "Assisted Student",
                  className: "top-48 left-2",
                },
                {
                  icon: (
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="w-5 h-5 text-orange-500" />
                      <span className="font-semibold text-gray-800 dark:text-gray-200">
                        Congratulations
                      </span>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                  ),
                  title: "Your admission completed",
                  button: (
                    <Button
                      variant="link"
                      size="sm"
                      className="text-orange-500 p-0 h-auto mt-1"
                    >
                      View details <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  ),
                  className: "top-72 right-4",
                },
                {
                  icon: (
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        UX
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm">
                          User Experience Class
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Today at 12.00 PM
                        </p>
                      </div>
                    </div>
                  ),
                  button: (
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white w-full shadow-lg hover:shadow-pink-200"
                    >
                      Join Now
                    </Button>
                  ),
                  className: "bottom-32 left-4",
                },
              ].map(({ icon, title, subtitle, button, className }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.2, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  className={`absolute z-20 ${className} max-w-xs`}
                >
                  <Card className="border-0 backdrop-blur-lg bg-white/70 dark:bg-zinc-800/70 shadow-xl rounded-2xl">
                    <CardContent className="p-4 space-y-2 text-sm">
                      {icon}
                      {title && (
                        <p className="font-semibold text-gray-800 dark:text-gray-100">
                          {title}
                        </p>
                      )}
                      {subtitle && (
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {subtitle}
                        </p>
                      )}
                      {button && button}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
