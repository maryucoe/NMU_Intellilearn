"use client";

import { Navbar } from "@/components/navigation/navbar";
import { motion } from "framer-motion";
import { Award, Download, Share2, QrCode } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

const certificates = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    course: "Advanced JavaScript Mastery",
    score: 85,
    date: "March 15, 2024",
    certificateNumber: "INT-2024-001234",
  },
  {
    id: 2,
    title: "React Advanced",
    course: "React & Next.js Complete Guide",
    score: 92,
    date: "February 20, 2024",
    certificateNumber: "INT-2024-001235",
  },
  {
    id: 3,
    title: "Node.js Essentials",
    course: "Node.js Backend Development",
    score: 88,
    date: "January 10, 2024",
    certificateNumber: "INT-2024-001236",
  },
];

export default function CertificatesPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Certificates</h1>
            <p className="text-gray-600 dark:text-gray-300">
              View and manage all your digital certificates
            </p>
          </div>

          {/* Certificates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={cn(
                  "bg-card-light dark:bg-card-dark rounded-xl overflow-hidden",
                  "border border-gray-200 dark:border-gray-700",
                  "shadow-lg hover:shadow-xl transition-shadow"
                )}
              >
                {/* Certificate Preview */}
                <div className="h-48 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10 flex items-center justify-center relative">
                  <Award className="w-24 h-24 text-primary/50" />
                  <div className="absolute top-4 right-4">
                    <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      <QrCode className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                </div>

                {/* Certificate Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold line-clamp-1">
                      {cert.title}
                    </h3>
                    <span className="px-3 py-1 bg-success/20 text-success rounded-full text-xs font-semibold">
                      Verified
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    {cert.course}
                  </p>
                  <div className="flex items-center justify-between text-sm mb-4">
                    <span className="text-gray-600 dark:text-gray-300">
                      Score: <span className="font-semibold text-success">{cert.score}%</span>
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">{cert.date}</span>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/certificates/${cert.id}`}
                      className={cn(
                        "flex-1 flex items-center justify-center px-4 py-2",
                        "bg-primary text-white rounded-lg font-semibold text-sm",
                        "hover:bg-primary-dark transition-colors"
                      )}
                    >
                      View
                    </Link>
                    <button
                      className={cn(
                        "px-4 py-2",
                        "bg-card-light dark:bg-card-dark border border-gray-200 dark:border-gray-700",
                        "text-primary rounded-lg font-semibold text-sm",
                        "hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      )}
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      className={cn(
                        "px-4 py-2",
                        "bg-card-light dark:bg-card-dark border border-gray-200 dark:border-gray-700",
                        "text-primary rounded-lg font-semibold text-sm",
                        "hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      )}
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {certificates.length === 0 && (
            <div className="text-center py-12">
              <Award className="w-24 h-24 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Certificates Yet</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Complete exams to earn your first certificate
              </p>
              <Link
                href="/courses"
                className={cn(
                  "inline-flex items-center px-6 py-3",
                  "bg-primary text-white rounded-lg font-semibold",
                  "hover:bg-primary-dark transition-colors"
                )}
              >
                Browse Courses
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
