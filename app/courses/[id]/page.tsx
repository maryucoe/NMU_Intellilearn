"use client";

import { Navbar } from "@/components/navigation/navbar";
import { motion } from "framer-motion";
import { Clock, Users, Star, BookOpen, Play, CheckCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { useEffect, useState } from "react";

type Module = {
  id: number;
  title: string;
  duration: string | null;
};

type CourseDetail = {
  id: number;
  title: string;
  description: string;
  longDescription: string | null;
  duration: string | null;
  students: number;
  rating: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  instructor: string;
  modules: Module[];
};

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(
          `http://localhost/nmu-api/courses.php?id=${encodeURIComponent(
            params.id
          )}`
        );
        const data = await res.json();
        if (data.success && data.course) {
          setCourse(data.course);
        } else {
          setError("Course not found.");
        }
      } catch {
        setError("Unable to reach course details API.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [params.id]);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && (
          <p className="text-gray-600 dark:text-gray-300">Loading course...</p>
        )}

        {error && !loading && (
          <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
        )}

        {!loading && !error && course && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <span
                className={cn(
                  "inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4",
                  course.level === "Beginner"
                    ? "bg-green-500/20 text-green-600 dark:text-green-400"
                    : course.level === "Intermediate"
                    ? "bg-blue-500/20 text-blue-600 dark:text-blue-400"
                    : "bg-purple-500/20 text-purple-600 dark:text-purple-400"
                )}
              >
                {course.level}
              </span>
              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                {course.description}
              </p>
              <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-300">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  {course.duration ?? "Self-paced"}
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  {course.students.toLocaleString()} students
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 fill-accent text-accent mr-2" />
                  {course.rating.toFixed(1)}
                </div>
                <div className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Instructor: {course.instructor}
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-card-light dark:bg-card-dark rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg mb-6"
                >
                  <h2 className="text-2xl font-semibold mb-4">About This Course</h2>
                  <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                    {course.longDescription || course.description}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-card-light dark:bg-card-dark rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg"
                >
                  <h2 className="text-2xl font-semibold mb-4">Course Modules</h2>
                  {course.modules.length === 0 && (
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Modules will be available soon.
                    </p>
                  )}
                  <div className="space-y-4">
                    {course.modules.map((module) => (
                      <Link
                        key={module.id}
                        href="/video"
                        className={cn(
                          "flex items-center justify-between p-4 rounded-lg border",
                          "bg-background-light dark:bg-background-dark border-gray-200 dark:border-gray-700"
                        )}
                      >
                        <div className="flex items-center flex-1">
                          <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded-full mr-4" />
                          <div>
                            <h3 className="font-semibold">{module.title}</h3>
                            {module.duration && (
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                {module.duration}
                              </p>
                            )}
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
                    href={`/exam/${course.id}`}
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
        )}
      </div>
    </div>
  );
}

