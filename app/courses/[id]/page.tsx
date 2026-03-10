"use client";

import { Navbar } from "@/components/navigation/navbar";
import { motion } from "framer-motion";
import { Clock, Users, Star, BookOpen, Play, CheckCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

// Mock course data
const courseData = {
  id: 1,
  title: "Advanced JavaScript Mastery",
  description:
    "Master modern JavaScript features, async programming, and advanced patterns in this comprehensive course designed for intermediate to advanced developers.",
  longDescription: `This comprehensive course will take you from intermediate to advanced JavaScript developer. You'll learn about modern ES6+ features, asynchronous programming, design patterns, and best practices.

  Topics covered:
  - Modern JavaScript (ES6+)
  - Asynchronous Programming (Promises, Async/Await)
  - Advanced Patterns and Best Practices
  - Error Handling and Debugging
  - Performance Optimization`,
  duration: "8 weeks",
  students: 1250,
  rating: 4.8,
  level: "Advanced",
  instructor: "Dr. Alaa",
  modules: [
    { id: 1, title: "Introduction to Modern JavaScript", duration: "2h 30m", completed: true },
    { id: 2, title: "ES6+ Features", duration: "3h 15m", completed: true },
    { id: 3, title: "Asynchronous Programming", duration: "4h 20m", completed: false },
    { id: 4, title: "Advanced Patterns", duration: "3h 45m", completed: false },
  ],
};

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-8">
            <span className={cn(
              "inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4",
              courseData.level === "Beginner"
                ? "bg-green-500/20 text-green-600 dark:text-green-400"
                : courseData.level === "Intermediate"
                ? "bg-blue-500/20 text-blue-600 dark:text-blue-400"
                : "bg-purple-500/20 text-purple-600 dark:text-purple-400"
            )}>
              {courseData.level}
            </span>
            <h1 className="text-4xl font-bold mb-4">{courseData.title}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              {courseData.description}
            </p>
            <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-300">
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                {courseData.duration}
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                {courseData.students.toLocaleString()} students
              </div>
              <div className="flex items-center">
                <Star className="w-5 h-5 fill-accent text-accent mr-2" />
                {courseData.rating}
              </div>
              <div className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Instructor: {courseData.instructor}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-card-light dark:bg-card-dark rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg mb-6"
              >
                <h2 className="text-2xl font-semibold mb-4">About This Course</h2>
                <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                  {courseData.longDescription}
                </p>
              </motion.div>

              {/* Course Modules */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-card-light dark:bg-card-dark rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg"
              >
                <h2 className="text-2xl font-semibold mb-4">Course Modules</h2>
                <div className="space-y-4">
                  {courseData.modules.map((module, index) => (
                    <Link
                      key={module.id}
                      href="/video"
                      className={cn(
                        "flex items-center justify-between p-4 rounded-lg border",
                        module.completed
                          ? "bg-success/5 border-success/20"
                          : "bg-background-light dark:bg-background-dark border-gray-200 dark:border-gray-700"
                      )}
                    >
                      <div className="flex items-center flex-1">
                        {module.completed ? (
                          <CheckCircle className="w-5 h-5 text-success mr-4" />
                        ) : (
                          <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded-full mr-4" />
                        )}
                        <div>
                          <h3 className="font-semibold">{module.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {module.duration}
                          </p>
                        </div>
                      </div>
                      <span className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                        <Play className="w-5 h-5" />
                      </span>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-card-light dark:bg-card-dark rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg sticky top-24"
              >
                <div className="text-center mb-6">
                  <p className="text-2xl font-bold text-primary mb-2">
                    Ready to start quiz
                  </p>
                </div>
                <Link
                  href={`/exam/${courseData.id}`}
                  className={cn(
                    "w-full block text-center px-6 py-3 mb-4",
                    "bg-primary text-white rounded-lg font-semibold",
                    "hover:bg-primary-dark transition-colors"
                  )}
                >
                  Enroll Now
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
