import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, PenTool, Award } from "lucide-react";
import Image from "next/image";
import ClassManagementSection from "./classManagementSection";

export default function Blog() {
  return (
    <section
      id="blog"
      className="py-16 px-4 sm:px-6 lg:px-8 bg-[#8DC63F]/5 dark:bg-[#231F20]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#231F20] dark:text-[#FFFFFF]">
            Our <span className="text-[#006838]">Features</span>
          </h2>
          <p className="text-[#231F20]/80 dark:text-[#FFFFFF]/80 text-base sm:text-lg max-w-2xl mx-auto">
            This very extraordinary feature, can make learning activities more
            efficient
          </p>
        </div>

        {/* User Interface Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left - Interface Mockup */}
          <div className="relative order-2 lg:order-1">
            <div className="relative bg-[#FFFFFF] dark:bg-[#231F20] rounded-2xl shadow-xl p-6">
              {/* Video Call Interface Mockup */}
              <div className="space-y-4">
                <div className="aspect-video bg-gradient-to-br from-[#8DC63F]/20 to-[#006838]/20 dark:from-[#006838]/20 dark:to-[#231F20] rounded-lg relative">
                  <Image
                    src="/image4.png"
                    alt="Main presenter"
                    width={160}
                    height={120}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute bottom-2 left-2 bg-[#231F20]/70 text-[#FFFFFF] text-xs px-2 py-1 rounded">
                    Teacher
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      img: "/image5.png",
                      label: "Student 1",
                      from: "from-[#8DC63F]/20",
                      to: "to-[#006838]/20",
                      darkFrom: "dark:from-[#8DC63F]/20",
                      darkTo: "dark:to-[#231F20]",
                    },
                    {
                      img: "/image6.png",
                      label: "Student 2",
                      from: "from-[#006838]/20",
                      to: "to-[#8DC63F]/20",
                      darkFrom: "dark:from-[#006838]/20",
                      darkTo: "dark:to-[#231F20]",
                    },
                    {
                      img: "/image8.png",
                      label: "Student 3",
                      from: "from-[#8DC63F]/20",
                      to: "to-[#006838]/20",
                      darkFrom: "dark:from-[#8DC63F]/20",
                      darkTo: "dark:to-[#231F20]",
                    },
                    {
                      img: "/image7.png",
                      label: "Student 4",
                      from: "from-[#006838]/20",
                      to: "to-[#8DC63F]/20",
                      darkFrom: "dark:from-[#006838]/20",
                      darkTo: "dark:to-[#231F20]",
                    },
                  ].map(({ img, label, from, to, darkFrom, darkTo }) => (
                    <div
                      key={label}
                      className={`aspect-video bg-gradient-to-br ${from} ${to} ${darkFrom} ${darkTo} rounded-lg relative`}
                    >
                      <Image
                        src={img}
                        alt={label}
                        width={120}
                        height={80}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute bottom-1 left-1 bg-[#231F20]/70 text-[#FFFFFF] text-xs px-1 py-0.5 rounded">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex justify-center gap-4 mt-6">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-[#006838] to-[#8DC63F] hover:from-[#006838]/90 hover:to-[#8DC63F]/90 text-[#FFFFFF]"
                >
                  Present
                </Button>
                <Button size="sm" variant="destructive">
                  Call
                </Button>
              </div>
            </div>

            {/* Floating Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#8DC63F]/20 dark:bg-[#8DC63F]/10 rounded-full"></div>
            <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-[#006838]/20 dark:bg-[#006838]/10 rounded-lg rotate-45"></div>
            <div className="absolute top-1/2 -right-8 w-6 h-6 bg-[#8DC63F]/20 dark:bg-[#8DC63F]/10 rounded-full"></div>
          </div>

          {/* Right - Content */}
          <div className="space-y-6 order-1 lg:order-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#231F20] dark:text-[#FFFFFF]">
              A <span className="text-[#006838]">user interface</span> designed
              for the classroom
            </h3>

            <div className="space-y-4">
              {[
                {
                  bgLight: "bg-[#8DC63F]/20",
                  bgDark: "dark:bg-[#8DC63F]/10",
                  dotColor: "bg-[#006838]",
                  text: "Teachers don't get lost in the grid view and have a dedicated Podium space.",
                },
                {
                  bgLight: "bg-[#006838]/20",
                  bgDark: "dark:bg-[#006838]/10",
                  dotColor: "bg-[#8DC63F]",
                  text: "TA's and presenters can be moved to the front of the class.",
                },
                {
                  bgLight: "bg-[#8DC63F]/20",
                  bgDark: "dark:bg-[#8DC63F]/10",
                  dotColor: "bg-[#006838]",
                  text: "Teachers can easily see all students and class data at one time.",
                },
              ].map(({ bgLight, bgDark, dotColor, text }, i) => (
                <div className="flex items-start gap-3" key={i}>
                  <div
                    className={`w-6 h-6 ${bgLight} ${bgDark} rounded flex items-center justify-center flex-shrink-0 mt-1`}
                  >
                    <div className={`w-3 h-3 ${dotColor} rounded`}></div>
                  </div>
                  <p className="text-[#231F20]/80 dark:text-[#FFFFFF]/80">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tools Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left - Content */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#8DC63F]/20 dark:bg-[#8DC63F]/10 rounded-lg flex items-center justify-center">
                <PenTool className="w-4 h-4 text-[#006838]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#231F20] dark:text-[#FFFFFF]">
                <span className="text-[#006838]">Tools</span> For Teachers And
                Learners
              </h3>
            </div>

            <p className="text-[#231F20]/80 dark:text-[#FFFFFF]/80 text-base sm:text-lg leading-relaxed">
              Class has a dynamic set of teaching tools built to be deployed and
              used during class. Teachers can handout assignments in real-time
              for students to complete and submit.
            </p>
          </div>

          {/* Right - Teacher Image */}
          <div className="relative">
            <div className="relative">
              <Image
                src="/image9.png"
                alt="Professional teacher with educational tools"
                width={350}
                height={400}
                className="w-full h-auto rounded-2xl"
              />

              {/* Floating UI Elements */}
              <Card className="absolute top-8 -left-4 shadow-lg border-0 bg-[#FFFFFF]/90 dark:bg-[#231F20]/90 backdrop-blur-sm">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#006838]" />
                    <span className="text-sm font-medium text-[#231F20] dark:text-[#FFFFFF]">
                      Assignment
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="absolute top-1/2 -right-4 shadow-lg border-0 bg-[#FFFFFF]/90 dark:bg-[#231F20]/90 backdrop-blur-sm">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#8DC63F]" />
                    <span className="text-sm font-medium text-[#231F20] dark:text-[#FFFFFF]">
                      Grade
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#8DC63F]/20 dark:bg-[#8DC63F]/10 rounded-full"></div>
            <div className="absolute bottom-8 -left-8 w-8 h-8 bg-[#006838]/20 dark:bg-[#006838]/10 rounded-lg rotate-12"></div>
          </div>
        </div>

        {/* More sections (Assessments, etc.) go here... */}
        <ClassManagementSection />
      </div>
    </section>
  );
}
