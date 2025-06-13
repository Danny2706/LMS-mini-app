import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  Star,
  Download,
  MessageCircle,
  Video,
  Phone,
} from "lucide-react";

export default function ClassManagementSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF] dark:bg-[#231F20]">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Class Management Tools Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div className="space-y-6">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#231F20] dark:text-[#FFFFFF]">
              <span className="text-[#006838]">Class Management</span>
              <br />
              Tools for Educators
            </h3>
            <p className="text-[#231F20]/80 dark:text-[#FFFFFF]/80 text-base sm:text-lg leading-relaxed">
              Class provides tools to help you run and manage the class such as
              Class Roster, Attendance, and more. With the Gradebook, teachers
              can review and add grade tests and quizzes in real-time.
            </p>
          </div>

          {/* Right - Gradebook Interface */}
          <div className="relative">
            <Card className="bg-[#FFFFFF] dark:bg-[#231F20] shadow-xl border-0 rounded-2xl overflow-hidden">
              <CardContent className="p-0">
                {/* Gradebook Header */}
                <div className="bg-gradient-to-r from-[#006838] to-[#8DC63F] text-[#FFFFFF] p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-[#FFFFFF]" />
                    <span className="font-semibold">Gradebook</span>
                  </div>
                  <Button
                    size="sm"
                    className="bg-[#FFFFFF]/20 hover:bg-[#FFFFFF]/30 text-[#FFFFFF]"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>

                {/* Student Grades List */}
                <div className="p-6 space-y-4">
                  {[
                    {
                      name: "Samuel Esubalew",
                      grade: "A",
                      color: "bg-[#006838]",
                      avatar: "SE",
                    },
                    {
                      name: "Samuel Tale",
                      grade: "B+",
                      color: "bg-[#8DC63F]",
                      avatar: "ST",
                    },
                    {
                      name: "Abreham belay",
                      grade: "A-",
                      color: "bg-[#006838]",
                      avatar: "AB",
                    },
                    {
                      name: "Daniel Kumilachew",
                      grade: "B",
                      color: "bg-[#8DC63F]",
                      avatar: "DK",
                    },
                  ].map((student, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-[#231F20]/5 dark:bg-[#FFFFFF]/5 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage
                            src={`/placeholder.svg?height=40&width=40`}
                          />
                          <AvatarFallback className="bg-[#8DC63F]/20 dark:bg-[#006838]/20 text-[#231F20] dark:text-[#FFFFFF] text-sm">
                            {student.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-[#231F20] dark:text-[#FFFFFF]">
                          {student.name}
                        </span>
                      </div>
                      <Badge
                        className={`${student.color} text-[#FFFFFF] hover:opacity-90`}
                      >
                        {student.grade}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Floating Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#8DC63F]/20 dark:bg-[#8DC63F]/10 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-[#006838] dark:text-[#FFFFFF]" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-[#006838]/20 dark:bg-[#006838]/10 rounded-lg rotate-12"></div>
          </div>
        </div>

        {/* One-on-One Discussions Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Discussion Interface */}
          <div className="relative order-2 lg:order-1">
            <Card className="bg-[#FFFFFF] dark:bg-[#231F20] shadow-xl border-0 rounded-2xl overflow-hidden">
              <CardContent className="p-0">
                {/* Discussion Header */}
                <div className="p-4 border-b border-[#231F20]/10 dark:border-[#FFFFFF]/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#006838]" />
                    <span className="font-semibold text-[#231F20] dark:text-[#FFFFFF]">
                      Private Discussion
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#8DC63F] rounded-full"></div>
                    <span className="text-sm text-[#231F20]/60 dark:text-[#FFFFFF]/60">
                      Active
                    </span>
                  </div>
                </div>

                {/* Participants */}
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {/* Teacher */}
                    <div className="text-center space-y-3">
                      <div className="relative">
                        <Avatar className="w-20 h-20 mx-auto">
                          <AvatarImage src="/image11.png" />
                          <AvatarFallback className="bg-[#006838]/20 dark:bg-[#006838]/30 text-[#006838] dark:text-[#FFFFFF] text-lg">
                            TC
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#8DC63F] rounded-full border-2 border-[#FFFFFF] dark:border-[#231F20] flex items-center justify-center">
                          <Video className="w-3 h-3 text-[#FFFFFF]" />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-[#231F20] dark:text-[#FFFFFF]">
                          Ms. Teacher
                        </p>
                        <p className="text-sm text-[#231F20]/60 dark:text-[#FFFFFF]/60">
                          Instructor
                        </p>
                      </div>
                    </div>

                    {/* Student */}
                    <div className="text-center space-y-3">
                      <div className="relative">
                        <Avatar className="w-20 h-20 mx-auto">
                          <AvatarImage src="/image 13.png" />
                          <AvatarFallback className="bg-[#8DC63F]/20 dark:bg-[#8DC63F]/30 text-[#8DC63F] dark:text-[#FFFFFF] text-lg">
                            ST
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#006838] rounded-full border-2 border-[#FFFFFF] dark:border-[#231F20] flex items-center justify-center">
                          <MessageCircle className="w-3 h-3 text-[#FFFFFF]" />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-[#231F20] dark:text-[#FFFFFF]">
                          Student Name
                        </p>
                        <p className="text-sm text-[#231F20]/60 dark:text-[#FFFFFF]/60">
                          Participant
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-[#006838] text-[#006838] hover:bg-[#006838]/10 dark:border-[#8DC63F] dark:text-[#8DC63F] dark:hover:bg-[#8DC63F]/10"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Chat
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="bg-[#231F20] hover:bg-[#231F20]/90 text-[#FFFFFF]"
                    >
                      <Phone className="w-4 h-4" />
                      End Discussion
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="absolute -top-4 -left-4 w-10 h-10 bg-[#8DC63F]/20 dark:bg-[#8DC63F]/10 rounded-full"></div>
            <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-[#006838]/20 dark:bg-[#006838]/10 rounded-lg rotate-45"></div>
          </div>

          <div className="space-y-6 order-1 lg:order-2">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#231F20] dark:text-[#FFFFFF]">
              <span className="text-[#006838]">One-on-One</span>
              <br />
              Discussions
            </h3>
            <p className="text-[#231F20]/80 dark:text-[#FFFFFF]/80 text-base sm:text-lg leading-relaxed">
              Teachers and teacher assistants can talk with students privately
              without leaving the Zoom environment.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            className="text-[#006838] border-[#006838] hover:bg-[#8DC63F]/10 dark:hover:bg-[#006838]/20 px-8 py-3 text-lg"
          >
            See more features
          </Button>
        </div>
      </div>
    </section>
  );
}
