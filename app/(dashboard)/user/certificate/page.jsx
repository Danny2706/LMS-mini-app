"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Download, Printer, Share2, BookOpen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import img from "@/public/image2.png"

export default function CertificationPage() {
  const router = useRouter()

  // Mock certification data
  const certifications = [
    {
      id: "1",
      title: "Advanced React Development",
      issuedAt: "2023-10-15",
      certLink: "https://example.com/cert/1",
      certImage: "@/public/image1.png",
      course: {
        id: "101",
        title: "React Masterclass",
        thumbnail: "/images/react-course.jpg",
      },
    },
    {
      id: "2",
      title: "Node.js Fundamentals",
      issuedAt: "2023-08-22",
      certLink: "https://example.com/cert/2",
      certImage: "/images/node-cert.jpg",
      course: {
        id: "102",
        title: "Backend with Node.js",
        thumbnail: "/images/node-course.jpg",
      },
    },
    {
      id: "3",
      title: "UI/UX Design Principles",
      issuedAt: "2023-05-10",
      certLink: "https://example.com/cert/3",
      certImage: "/images/design-cert.jpg",
      course: {
        id: "103",
        title: "Design Fundamentals",
        thumbnail: "/images/design-course.jpg",
      },
    },
  ]

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const handleShare = async (certLink) => {
    try {
      await navigator.share({
        title: "My Certification",
        text: "Check out my certification!",
        url: certLink,
      })
    } catch (err) {
      console.error("Error sharing:", err)
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(certLink)
      alert("Link copied to clipboard!")
    }
  }

  return (
    <div className="space-y-6 p-4 pt-7">
      <h1 className="text-2xl font-bold text-[#006838] dark:text-[#8dc63f]">
        My Certifications
      </h1>

      {/* Cards View */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert) => (
          <Card
            key={cert.id}
            className="border-[#e0e0e0] dark:border-[#333] hover:shadow-lg transition-shadow py-0"
          >
            <CardHeader className="p-0">
              {cert.certImage ? (
                <Image
                  src={img}
                  alt={cert.title}
                  width={400}
                  height={225}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              ) : (
                <div className="w-full h-48 bg-gradient-to-r from-[#006838] to-[#8dc63f] flex items-center justify-center rounded-t-lg">
                  <BookOpen className="h-12 w-12 text-white" />
                </div>
              )}
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg text-[#006838] dark:text-[#8dc63f] mb-2">
                {cert.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                Course: {cert.course.title}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Issued: {formatDate(cert.issuedAt)}
              </p>
            </CardContent>
            <div className="p-4 pt-0 flex justify-between">
              <Button
                variant="outline"
                className="border-[#006838] cursor-pointer text-[#006838] hover:bg-[#006838]/10 dark:border-[#8dc63f] dark:text-[#8dc63f] dark:hover:bg-[#8dc63f]/10"
                onClick={() => handleShare(cert.certLink)}
              >
                <Share2 className="h-4 w-4 mr-2" /> Share
              </Button>
              <Button
                className="bg-gradient-to-r from-[#006838] to-[#8dc63f] text-white hover:from-[#006838]/90 hover:to-[#8dc63f]/90"
                asChild
              >
                <Link href={cert.certLink} target="_blank">
                  <Download className="h-4 w-4 mr-2" /> Download
                </Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Table View */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-[#006838] dark:text-[#8dc63f] mb-4">
          Certification History
        </h2>
        <div className="rounded-lg border border-[#e0e0e0] dark:border-[#333]">
          <Table>
            <TableHeader className="bg-[#e8f5e9] dark:bg-[#006838]/20">
              <TableRow>
                <TableHead className="text-[#006838] dark:text-[#8dc63f]">
                  Course
                </TableHead>
                <TableHead className="text-[#006838] dark:text-[#8dc63f]">
                  Certificate
                </TableHead>
                <TableHead className="text-[#006838] dark:text-[#8dc63f]">
                  Date Earned
                </TableHead>
                <TableHead className="text-right text-[#006838] dark:text-[#8dc63f]">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {certifications.map((cert) => (
                <TableRow key={cert.id}>
                  <TableCell>
                    <div className="flex items-center">
                      {cert.course.thumbnail ? (
                        <Image
                          src={img}
                          //   src={cert.course.thumbnail}
                          alt={cert.course.title}
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-md object-cover mr-3"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gradient-to-r from-[#006838] to-[#8dc63f] rounded-md flex items-center justify-center mr-3">
                          <BookOpen className="h-5 w-5 text-white" />
                        </div>
                      )}
                      {cert.course.title}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{cert.title}</TableCell>
                  <TableCell>{formatDate(cert.issuedAt)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-[#006838] hover:bg-[#006838]/10 dark:text-[#8dc63f] dark:hover:bg-[#8dc63f]/10"
                        onClick={() => handleShare(cert.certLink)}
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-[#006838] hover:bg-[#006838]/10 dark:text-[#8dc63f] dark:hover:bg-[#8dc63f]/10"
                        asChild
                      >
                        <Link href={cert.certLink} target="_blank">
                          <Download className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
