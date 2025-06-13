"use client"

import axios from "axios"
import { motion } from "framer-motion"
import { CheckCircle2, Download, Share2, ArrowLeft } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function CertificateCelebration() {
  const { user } = useSelector((state) => state.auth)
  const searchParams = useSearchParams()
  const router = useRouter()

  const [showConfetti, setShowConfetti] = useState(true)
  const [course, setCourse] = useState(null)
  const [certificateData, setCertificateData] = useState(null)
  const [loadingCertificate, setLoadingCertificate] = useState(false)

  const courseId = searchParams.get("courseId")
  const userName = user?.name || "Samuel"
  const courseName = course?.title || "Web Development"

  useEffect(() => {
    if (!courseId) return

    const fetchCourse = async () => {
      try {
        const res = await axios.get(`/api/courses/${courseId}`)
        setCourse(res.data.course)
      } catch (error) {
        console.error("Error fetching course:", error)
      }
    }

    fetchCourse()
  }, [courseId])

  useEffect(() => {
    if (!course || !userName || !courseName) return

    const generateCertificate = async () => {
      setLoadingCertificate(true)
      try {
        const res = await axios.post("/api/certifications", {
          userName,
          courseTitle: courseName,
          courseId,
          userId: user?.id,
        })

        setCertificateData(res.data.data) // Get nested `data`
      } catch (error) {
        console.error("Error generating certificate:", error)
      } finally {
        setLoadingCertificate(false)
      }
    }

    generateCertificate()
  }, [course, user?.id, courseId])

  const handleDownload = useCallback(() => {
    if (!certificateData?.certLink) return

    const newTab = window.open(certificateData.certLink, "_blank")

    if (newTab) {
      newTab.focus()
    } else {
      alert("Please allow popups for this website to view the certificate.")
    }
  }, [certificateData])

  const handleShare = useCallback(() => {
    alert("Share functionality coming soon!")
  }, [])

  const handleBack = useCallback(() => {
    router.push("/user")
  }, [router])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-50">
      {showConfetti && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 4, duration: 1 }}
          className="fixed inset-0 flex flex-wrap justify-center overflow-hidden pointer-events-none"
          style={{ zIndex: 100 }}
        >
          {Array.from({ length: 100 }).map((_, i) => (
            <motion.span
              key={i}
              initial={{ y: -100, x: Math.random() * 200 - 100, opacity: 1 }}
              animate={{
                y: window.innerHeight,
                rotate: Math.random() * 360,
                opacity: 0,
              }}
              transition={{
                duration: 3 + Math.random() * 3,
                delay: Math.random() * 0.5,
              }}
              className="fixed text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
              }}
            >
              🎉
            </motion.span>
          ))}
        </motion.div>
      )}

      <div className="w-full max-w-4xl px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="overflow-hidden bg-white shadow-lg rounded-xl"
        >
          {/* Header */}
          <div className="p-8 text-center bg-gradient-to-r from-blue-600 to-indigo-700">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="inline-block p-3 mb-4 bg-white rounded-full"
            >
              <CheckCircle2 className="w-12 h-12 text-blue-600" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mb-2 text-3xl font-bold text-white"
            >
              Congratulations, {userName}!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-blue-100"
            >
              You've successfully completed the course and earned your
              certificate
            </motion.p>
          </div>

          {/* Main content */}
          <div className="p-8">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Details */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Your Achievement
                </h2>

                <div className="p-5 rounded-lg bg-gray-50">
                  <div className="flex items-start mb-4">
                    <CheckCircle2 className="w-5 h-5 mt-1 mr-3 text-green-500" />
                    <div>
                      <h3 className="font-medium text-gray-800">
                        Course Completed
                      </h3>
                      <p className="text-gray-600">
                        {course?.title || courseName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start mb-4">
                    <CheckCircle2 className="w-5 h-5 mt-1 mr-3 text-green-500" />
                    <div>
                      <h3 className="font-medium text-gray-800">Instructor</h3>
                      <p className="text-gray-600">
                        {course?.trainer?.name || "Unknown"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 mt-1 mr-3 text-green-500" />
                    <div>
                      <h3 className="font-medium text-gray-800">Issued On</h3>
                      <p className="text-gray-600">
                        {certificateData
                          ? new Date(
                              certificateData.issuedAt
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : "..."}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-lg bg-gray-50">
                  <h3 className="mb-2 font-medium text-gray-800">
                    Certificate ID
                  </h3>
                  <p className="font-mono text-sm text-gray-600">
                    {certificateData?.id || "Generating..."}
                  </p>
                </div>
              </div>

              {/* Certificate Preview */}
              <div>
                <h2 className="mb-4 text-xl font-semibold text-gray-800">
                  Your Certificate
                </h2>

                {loadingCertificate ? (
                  <div className="flex flex-col items-center justify-center w-full bg-gray-100 rounded-lg h-96">
                    <div className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                    <p className="mt-4 text-gray-500">
                      Generating your certificate...
                    </p>
                  </div>
                ) : certificateData?.certLink ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="overflow-hidden border border-gray-200 rounded-lg"
                  >
                    <img
                      src={certificateData.certLink}
                      alt="Certificate of Completion"
                      className="object-cover w-full h-full max-h-[600px]"
                    />
                  </motion.div>
                ) : (
                  <p className="text-red-500">Failed to load certificate.</p>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleDownload}
                disabled={loadingCertificate || !certificateData?.certLink}
                className="flex items-center px-6 py-3 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Certificate
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleShare}
                className="flex items-center px-6 py-3 text-blue-600 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Share Achievement
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleBack}
                className="flex items-center px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Return to Dashboard
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
