"use client";

import { Navbar } from "@/components/navigation/navbar";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

const courses = [
  {
    id: 1,
    title: "Advanced JavaScript Mastery",
    description:
      "Master modern JavaScript features, async programming, and advanced patterns",
    duration: "8 weeks",
    students: 1250,
    rating: 4.8,
    level: "Advanced",
  },
  {
    id: 2,
    title: "React & Next.js Complete Guide",
    description:
      "Build scalable web applications with React and Next.js framework",
    duration: "10 weeks",
    students: 2100,
    rating: 4.9,
    level: "Intermediate",
  },
  {
    id: 3,
    title: "Node.js Backend Development",
    description:
      "Learn server-side development with Node.js, Express, and MongoDB",
    duration: "6 weeks",
    students: 980,
    rating: 4.7,
    level: "Intermediate",
  },
  {
    id: 4,
    title: "Full Stack Web Development",
    description:
      "Complete full-stack development course covering frontend and backend",
    duration: "12 weeks",
    students: 3400,
    rating: 4.9,
    level: "Beginner",
  },
];

export default function CoursesPage() {
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
            <h1 className="text-3xl font-bold mb-2">All Courses</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Explore our comprehensive course catalog
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
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
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-semibold",
                        course.level === "Beginner"
                          ? "bg-green-500/20 text-green-600 dark:text-green-400"
                          : course.level === "Intermediate"
                          ? "bg-blue-500/20 text-blue-600 dark:text-blue-400"
                          : "bg-purple-500/20 text-purple-600 dark:text-purple-400"
                      )}
                    >
                      {course.level}
                    </span>
                    <span className="text-sm font-semibold">{course.rating}</span>
                  </div>
                  <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-4">
                    <span>{course.duration}</span>
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                  <Link
                    href={`/courses/${course.id}`}
                    className={cn(
                      "w-full inline-flex items-center justify-center",
                      "px-4 py-2 bg-primary text-white rounded-lg",
                      "hover:bg-primary-dark transition-colors",
                      "font-semibold"
                    )}
                  >
                    View Course
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}