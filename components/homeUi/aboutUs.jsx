import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import NewsResources from "./newsResources";

export default function AboutUs() {
  return (
    <section
      id="about"
      className="py-16 px-4 sm:px-6 lg:px-8 bg-[#8DC63F]/5 dark:bg-[#231F20]"
    >
      <div className="max-w-7xl mx-auto space-y-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-[#006838] to-[#8DC63F] rounded-lg flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-[#FFFFFF]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M5.5 15.5c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5c.3 0 .6.1.9.2C6.8 9.1 8.3 8 10 8c2.2 0 4 1.8 4 4 0 .4-.1.8-.2 1.2.9.5 1.5 1.4 1.5 2.5 0 1.7-1.3 3-3 3H5.5z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-[#231F20]/80 dark:text-[#FFFFFF]/80">
                OneDrive
              </span>
            </div>

            {/* Dropbox */}
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-[#8DC63F] to-[#006838] rounded-lg flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-[#FFFFFF]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M7.71 2.51L2.84 5.77l4.87 3.26 4.87-3.26L7.71 2.51zM2.84 12.29l4.87-3.26 4.87 3.26-4.87 3.26L2.84 12.29zM16.29 2.51l-4.87 3.26 4.87 3.26 4.87-3.26L16.29 2.51zM21.16 12.29l-4.87-3.26-4.87 3.26 4.87 3.26L21.16 12.29zM12 10.03l-4.87 3.26L12 16.55l4.87-3.26L12 10.03z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-[#231F20]/80 dark:text-[#FFFFFF]/80">
                Dropbox
              </span>
            </div>

            {/* Google Drive */}
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-[#FFFFFF] rounded-lg flex items-center justify-center shadow-md dark:bg-[#231F20]">
                <svg className="w-10 h-10" viewBox="0 0 24 24">
                  <path fill="#006838" d="M8.5 2L2 12h5l6.5-10z" />
                  <path fill="#8DC63F" d="M15.5 2L22 12h-5L10.5 2z" />
                  <path fill="#231F20" d="M2 12l3.25 5.5h13.5L22 12z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-[#231F20]/80 dark:text-[#FFFFFF]/80">
                Google Drive
              </span>
            </div>

            {/* Microsoft Teams */}
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-[#006838] to-[#8DC63F] rounded-lg flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-[#FFFFFF]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.25 4.5H12c-.83 0-1.5.67-1.5 1.5v3h-3c-.83 0-1.5.67-1.5 1.5v6c0 .83.67 1.5 1.5 1.5h6c.83 0 1.5-.67 1.5-1.5v-3h3c.83 0 1.5-.67 1.5-1.5V6c0-.83-.67-1.5-1.5-1.5zM9 15H7.5v-1.5H9V15zm0-3H7.5V10.5H9V12zm3 3h-1.5v-1.5H12V15zm0-3h-1.5V10.5H12V12zm6-3h-1.5V7.5H18V9zm0-3h-1.5V4.5H18V6z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-[#231F20]/80 dark:text-[#FFFFFF]/80">
                Microsoft Teams
              </span>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-[#231F20]/60 dark:text-[#FFFFFF]/60 uppercase tracking-wide">
                INTEGRATIONS
              </p>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#231F20] dark:text-[#FFFFFF]">
                <span className="text-[#006838]">200+</span> educational tools
                and platform{" "}
                <span className="text-[#8DC63F]">integrations</span>
              </h3>
            </div>

            <p className="text-[#231F20]/80 dark:text-[#FFFFFF]/80 text-base sm:text-lg leading-relaxed">
              GREEN PILL has every tool your classroom needs and comes
              pre-integrated with more than 200+ tools, student information
              systems, LMS, and education platforms.
            </p>

            <Button
              variant="outline"
              className="text-[#006838] border-[#006838] hover:bg-[#8DC63F]/10 dark:hover:bg-[#006838]/20"
            >
              See All Integrations
            </Button>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-[#231F20]/60 dark:text-[#FFFFFF]/60 uppercase tracking-wide">
                TESTIMONIAL
              </p>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#231F20] dark:text-[#FFFFFF]">
                What They Say?
              </h3>
            </div>

            <div className="space-y-4">
              <p className="text-[#231F20]/80 dark:text-[#FFFFFF]/80 text-base sm:text-lg">
                GREEN PILL has got more than 100k positive ratings from our
                users around the world.
              </p>
              <p className="text-[#231F20]/80 dark:text-[#FFFFFF]/80 text-base sm:text-lg">
                Some of the students and teachers were greatly helped by the
                GREEN PILL.
              </p>
              <p className="text-[#231F20]/80 dark:text-[#FFFFFF]/80 text-base sm:text-lg">
                Are you too? Please give your assessment
              </p>
            </div>

            <Button
              variant="outline"
              className="text-[#006838] border-[#006838] hover:bg-[#8DC63F]/10 dark:hover:bg-[#006838]/20"
            >
              Write your assessment <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Right - Testimonial Card */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-[#006838] to-[#8DC63F] rounded-2xl p-8 text-[#FFFFFF]">
              <Image
                src="/image15.png"
                alt="Happy student with books"
                width={200}
                height={300}
                className="absolute right-4 top-4 w-32 h-40 object-cover rounded-lg"
              />

              <div className="max-w-xs">
                <Card className="bg-[#FFFFFF] dark:bg-[#231F20] text-[#231F20] dark:text-[#FFFFFF] shadow-lg border-0">
                  <CardContent className="p-4 space-y-3">
                    <p className="text-sm leading-relaxed">
                      "Thank you so much for your help. It's exactly what I've
                      been looking for. You won't regret it. It really saves me
                      time and effort. GREEN PILL is exactly what our business
                      has been lacking."
                    </p>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-sm">Gloria Rose</p>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3 fill-[#8DC63F] text-[#8DC63F]"
                            />
                          ))}
                        </div>
                        <p className="text-xs text-[#231F20]/60 dark:text-[#FFFFFF]/60">
                          12 reviews in total
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Navigation Arrows */}
            <Button
              size="icon"
              variant="outline"
              className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-[#FFFFFF] dark:bg-[#231F20] shadow-lg border-[#006838] text-[#006838] hover:bg-[#8DC63F]/10 dark:hover:bg-[#006838]/20"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-[#FFFFFF] dark:bg-[#231F20] shadow-lg border-[#006838] text-[#006838] hover:bg-[#8DC63F]/10 dark:hover:bg-[#006838]/20"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      <NewsResources />
    </section>
  );
}
