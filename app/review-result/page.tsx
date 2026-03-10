"use client";

import { Navbar } from "@/components/navigation/navbar";
import { motion } from "framer-motion";
import { CheckCircle, Download, FileText, Award, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { Suspense } from "react";

const mockResult = {
  studentName: "John Leo",
  studentId: "2025401",
  totalScore: 72,
  grade: "B",
  scoreText: "4/5",
  completionRate: 72,
  remark: "Very good performance! Keep up the excellent work.",
  skills: [
    { name: "Project Management", percentage: 80, color: "teal-500" },
    { name: "Agile Methods", percentage: 60, color: "yellow-400" },
    { name: "Leadership Skills", percentage: 90, color: "purple-500" },
  ],
};

export default function ReviewResultPage() {
  return (
    <Suspense fallback={null}>
      <ReviewResultContent />
    </Suspense>
  );
}

function ReviewResultContent() {
  const searchParams = useSearchParams();
  const examId = searchParams.get("examId");

  const renderCircularProgress = (percentage: number, color: string = "#6A0F1C") => {
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative w-32 h-32 mx-auto">
        <svg className="transform -rotate-90 w-32 h-32">
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-gray-200 dark:text-gray-700"
          />
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-300"
            style={{ color }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl font-bold" style={{ color }}>
              {percentage}%
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background-dark">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Panel - Main Content */}
          <div className="xl:col-span-2 space-y-8">
            {/* Submission Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card-light dark:bg-card-dark rounded-xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg"
            >
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-success/20 rounded-full mb-4"
                >
                  <CheckCircle className="w-8 h-8 text-success" />
                </motion.div>
                <h1 className="text-3xl font-bold mb-2">Submission Received</h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Your answers were submitted successfully. Here are your instant results.
                </p>
              </div>

              {/* Student Info */}
              <div className="bg-background-light dark:bg-background-dark rounded-lg p-4 mb-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                      Student Name
                    </p>
                    <p className="font-semibold">{mockResult.studentName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                      Student ID
                    </p>
                    <p className="font-semibold">{mockResult.studentId}</p>
                  </div>
                </div>
              </div>

              {/* Total Score */}
              <div className="text-center mb-6">
                <div className="inline-block bg-primary/10 rounded-full px-8 py-4 mb-4">
                  <p className="text-5xl font-bold text-primary mb-1">
                    {mockResult.totalScore}%
                  </p>
                  <p className="text-2xl font-semibold text-primary">
                    Grade: {mockResult.grade}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    Score: {mockResult.scoreText}
                  </p>
                </div>
              </div>

              {/* Progress Overview */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 dark:text-gray-300">
                    Completion Rate
                  </span>
                  <span className="font-semibold">{mockResult.completionRate}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${mockResult.completionRate}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="bg-primary h-3 rounded-full"
                  />
                </div>
              </div>

              {/* Remark */}
              <div className="bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-500 dark:border-yellow-700 rounded-lg p-4 mb-6">
                <p className="text-gray-800 dark:text-gray-200 font-medium">
                  {mockResult.remark}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/exam/results/${examId || "1"}`}
                  className={cn(
                    "flex-1 flex items-center justify-center px-6 py-3",
                    "bg-primary text-white rounded-lg font-semibold",
                    "hover:bg-primary-dark transition-colors"
                  )}
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Review Answers
                </Link>
                <Link
                  href={`/certificate-exam2`}
                  className={cn(
                    "flex-1 flex items-center justify-center px-6 py-3",
                    "border-2 border-primary text-primary rounded-lg font-semibold",
                    "hover:bg-primary hover:text-white transition-colors"
                  )}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Certificate
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right Panel - Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            {/* Performance Overview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card-light dark:bg-card-dark rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-4 text-center">
                Performance Overview
              </h3>
              {renderCircularProgress(mockResult.totalScore, "#6A0F1C")}
              <p className="text-center mt-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                COMPLETED
              </p>
            </motion.div>

            {/* Skills Breakdown */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card-light dark:bg-card-dark rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-4">Skills Breakdown</h3>
              <div className="space-y-4">
                {mockResult.skills.map((skill, index) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {skill.name}
                      </span>
                      <span className="font-semibold">{skill.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.percentage}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        className={cn("h-2 rounded-full", {
                          "bg-teal-500": skill.color === "teal-500",
                          "bg-yellow-400": skill.color === "yellow-400",
                          "bg-purple-500": skill.color === "purple-500",
                        })}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-card-light dark:bg-card-dark rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Questions Answered
                  </span>
                  <span className="font-semibold">4/5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Time Taken
                  </span>
                  <span className="font-semibold">45:30</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Passing Grade
                  </span>
                  <span className="font-semibold text-success">70%</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
