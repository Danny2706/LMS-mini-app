import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function NewsResources() {
  const newsItems = [
    {
      id: 1,
      title:
        "Class Technologies Inc. Closes $30 Million Series A Financing to Meet High Demand",
      description:
        "Class Technologies Inc., the company that created Class,...",
      image: "/image17.png",
      tag: "PRESS RELEASE",
      tagColor: "bg-gradient-to-r from-[#006838] to-[#8DC63F]",
    },
    {
      id: 2,
      title:
        "Zoom's earliest investors are betting millions on a better Zoom for schools",
      description:
        "Zoom was never created to be a consumer product. Nonetheless, the...",
      image: "/image18.png",
      tag: "NEWS",
      tagColor: "bg-gradient-to-r from-[#8DC63F] to-[#006838]",
    },
    {
      id: 3,
      title:
        "Former Blackboard CEO Raises $16M to Bring LMS Features to Zoom Classrooms",
      description:
        "This year, investors have reaped big financial returns from betting on Zoom...",
      image: "/image19.png",
      tag: "NEWS",
      tagColor: "bg-gradient-to-r from-[#006838] to-[#8DC63F]",
    },
  ];

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto bg-[#FFFFFF] dark:bg-[#231F20] transition-colors duration-300">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#231F20] dark:text-[#FFFFFF] mb-6">
          Latest <span className="text-[#006838]">News</span> and{" "}
          <span className="text-[#8DC63F]">Resources</span>
        </h2>
        <p className="text-[#231F20]/80 dark:text-[#FFFFFF]/80 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          See the developments that have occurred to GREEN PILL in the world
        </p>
      </div>

      {/* News Grid */}
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Featured Article */}
        <div className="lg:row-span-2">
          <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-[#FFFFFF] dark:bg-[#231F20]">
            <div className="relative">
              <Image
                src="/image16.png"
                alt="Class adds $30 million to its balance sheet"
                width={600}
                height={400}
                className="w-full h-64 md:h-80 lg:h-96 object-cover"
              />
              <Badge className="absolute top-4 left-4 bg-gradient-to-r from-[#006838] to-[#8DC63F] hover:opacity-90 text-[#FFFFFF] font-semibold px-3 py-1">
                NEWS
              </Badge>
            </div>
            <CardContent className="p-6 lg:p-8">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#231F20] dark:text-[#FFFFFF] mb-4 leading-tight hover:text-[#006838] dark:hover:text-[#8DC63F] transition-colors duration-300">
                Class adds $30 million to its balance sheet for a Zoom-friendly
                edtech solution
              </h3>
              <p className="text-[#231F20]/80 dark:text-[#FFFFFF]/80 mb-6 leading-relaxed text-base md:text-lg">
                Class, launched less than a year ago by Blackboard co-founder
                Michael Chasen, integrates exclusively...
              </p>
              <Link
                href="#"
                className="text-[#006838] dark:text-[#8DC63F] hover:text-[#8DC63F] dark:hover:text-[#006838] font-medium inline-flex items-center gap-2 group"
              >
                Read more
                <svg
                  className="w-4 h-4 transform transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* News Items */}
        <div className="space-y-6">
          {newsItems.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow duration-300 bg-[#FFFFFF] dark:bg-[#231F20]"
            >
              <div className="flex flex-col sm:flex-row h-full">
                <div className="relative sm:w-48 lg:w-56 flex-shrink-0">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={300}
                    height={200}
                    className="w-full h-48 sm:h-full object-cover"
                  />
                  <Badge
                    className={`absolute top-3 left-3 ${item.tagColor} hover:opacity-90 text-[#FFFFFF] font-semibold text-xs px-2 py-1`}
                  >
                    {item.tag}
                  </Badge>
                </div>
                <CardContent className="p-4 lg:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-[#231F20] dark:text-[#FFFFFF] mb-3 text-base lg:text-lg leading-tight hover:text-[#006838] dark:hover:text-[#8DC63F] transition-colors duration-300">
                      {item.title}
                    </h4>
                    <p className="text-[#231F20]/80 dark:text-[#FFFFFF]/80 text-sm lg:text-base leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
