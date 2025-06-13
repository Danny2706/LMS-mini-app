import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, Users } from "lucide-react";
import Image from "next/image";

export default function Careers() {
  return (
    <>
      {/* Section 1: Cloud Software Features */}
      <section
        id="careers"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-[#8DC63F]/5 dark:bg-[#231F20]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#231F20] dark:text-[#FFFFFF] leading-tight">
              All-In-One <span className="text-[#006838]">Cloud Software.</span>
            </h2>
            <p className="text-[#231F20]/80 dark:text-[#FFFFFF]/80 text-base sm:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed px-4">
              GREEN PILL is one powerful online software suite that combines all
              the tools needed to run a successful school or office.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Online Billing */}
            <Card className="bg-[#FFFFFF] dark:bg-[#231F20] border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-8 text-center space-y-6">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-[#006838] to-[#8DC63F] rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                  <FileText
                    className="w-10 h-10 text-[#FFFFFF]"
                    strokeWidth={1.5}
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#231F20] dark:text-[#FFFFFF] leading-tight">
                    Online Billing,
                    <br />
                    Invoicing, & Contracts
                  </h3>
                  <p className="text-[#231F20]/70 dark:text-[#FFFFFF]/70 text-sm sm:text-base leading-relaxed">
                    Simple and secure control of your organization's financial
                    and legal transactions. Send customized invoices and
                    contracts.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Easy Scheduling */}
            <Card className="bg-[#FFFFFF] dark:bg-[#231F20] border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-8 text-center space-y-6">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-[#8DC63F] to-[#006838] rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                  <Calendar
                    className="w-10 h-10 text-[#FFFFFF]"
                    strokeWidth={1.5}
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#231F20] dark:text-[#FFFFFF] leading-tight">
                    Easy Scheduling &<br />
                    Attendance Tracking
                  </h3>
                  <p className="text-[#231F20]/70 dark:text-[#FFFFFF]/70 text-sm sm:text-base leading-relaxed">
                    Schedule and reserve classrooms at one campus or multiple
                    campuses. Keep detailed records of student attendance.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Customer Tracking */}
            <Card className="bg-[#FFFFFF] dark:bg-[#231F20] border-0 shadow-lg hover:shadow-xl transition-all duration-300 group md:col-span-2 lg:col-span-1">
              <CardContent className="p-8 text-center space-y-6">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-[#006838] to-[#8DC63F] rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                  <Users
                    className="w-10 h-10 text-[#FFFFFF]"
                    strokeWidth={1.5}
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#231F20] dark:text-[#FFFFFF] leading-tight">
                    Customer Tracking
                  </h3>
                  <p className="text-[#231F20]/70 dark:text-[#FFFFFF]/70 text-sm sm:text-base leading-relaxed">
                    Automate and track emails to individuals or groups.
                    Skilline's built-in system helps organize your organization.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 2: What is GREEN PILL? */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF] dark:bg-[#231F20]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#231F20] dark:text-[#FFFFFF]">
              What is <span className="text-[#006838]">GREEN PILL?</span>
            </h2>
            <p className="text-[#231F20]/80 dark:text-[#FFFFFF]/80 text-base sm:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed">
              GREEN PILL is a platform that allows educators to create online
              classes whereby they can store the course materials online; manage
              assignments, quizzes and exams; monitor due dates; grade results
              and provide students with feedback all in one place.
            </p>
          </div>

          {/* Instructor & Student Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-20">
            <Card className="relative overflow-hidden rounded-2xl border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 group bg-[#231F20]">
              <CardContent className="p-0 relative h-80 sm:h-96">
                <div className="absolute inset-0 bg-gradient-to-br from-[#006838]/80 to-[#231F20]/60 z-10"></div>
                <Image
                  src="/image1.png"
                  alt="Professional instructor in classroom"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center p-8">
                  <h3 className="text-[#FFFFFF] text-2xl sm:text-3xl font-bold mb-8">
                    FOR INSTRUCTORS
                  </h3>
                  <Button
                    variant="outline"
                    className="bg-transparent border-2 border-[#FFFFFF] text-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#231F20] px-8 py-3 text-lg rounded-full transition-all duration-300"
                  >
                    Start a class today
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden rounded-2xl border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 group bg-[#231F20]">
              <CardContent className="p-0 relative h-80 sm:h-96">
                <div className="absolute inset-0 bg-gradient-to-br from-[#8DC63F]/80 to-[#231F20]/60 z-10"></div>
                <Image
                  src="/image2.png"
                  alt="Students studying together"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center p-8">
                  <h3 className="text-[#FFFFFF] text-2xl sm:text-3xl font-bold mb-8">
                    FOR STUDENTS
                  </h3>
                  <Button className="bg-gradient-to-r from-[#006838] to-[#8DC63F] hover:from-[#006838]/90 hover:to-[#8DC63F]/90 text-[#FFFFFF] px-8 py-3 text-lg rounded-full shadow-lg transition-all duration-300">
                    Enter access code
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom GREEN PILL Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#8DC63F]/20 dark:bg-[#8DC63F]/10 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-[#006838] rounded-full"></div>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#231F20] dark:text-[#FFFFFF] leading-tight pl-8">
                  Everything you can do in a physical classroom,{" "}
                  <span className="text-[#006838]">
                    you can do with GREEN PILL
                  </span>
                </h3>
              </div>

              <p className="text-[#231F20]/80 dark:text-[#FFFFFF]/80 text-base sm:text-lg leading-relaxed">
                GREEN PILL's school management software helps traditional and
                online schools manage scheduling, attendance, payments and
                virtual classrooms all in one secure cloud-based system.
              </p>

              <Button
                variant="link"
                className="text-[#006838] hover:text-[#8DC63F] p-0 text-lg font-medium"
              >
                Learn more →
              </Button>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/image3.png"
                  alt="Modern classroom with students and instructor"
                  width={700}
                  height={500}
                  className="w-full h-auto"
                />
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#8DC63F]/20 dark:bg-[#8DC63F]/10 rounded-lg rotate-12"></div>
                <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-[#006838]/20 dark:bg-[#006838]/10 rounded-full"></div>
              </div>
              <div className="absolute top-8 -left-8 w-16 h-16 bg-[#8DC63F]/20 dark:bg-[#8DC63F]/10 rounded-full opacity-60"></div>
              <div className="absolute bottom-8 -right-8 w-12 h-12 bg-[#006838]/20 dark:bg-[#006838]/10 rounded-lg rotate-45 opacity-60"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
