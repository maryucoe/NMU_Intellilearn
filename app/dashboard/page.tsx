"use client";

import { Navbar } from "@/components/navigation/navbar";
import { motion } from "framer-motion";
import {
  BookOpen,
  Award,
  Calendar,
  TrendingUp,
  CheckCircle,
  Clock,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils/cn";

const performanceData = [
  { month: "Jan", score: 85 },
  { month: "Feb", score: 88 },
  { month: "Mar", score: 92 },
  { month: "Apr", score: 90 },
  { month: "May", score: 95 },
  { month: "Jun", score: 93 },
];

const courseProgress = [
  { name: "Advanced JavaScript", progress: 75 },
  { name: "React Mastery", progress: 60 },
  { name: "Node.js Essentials", progress: 45 },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Welcome back! Here&apos;s your learning overview
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                title: "Active Courses",
                value: "12",
                icon: BookOpen,
                color: "text-blue-500",
                bgColor: "bg-blue-500/10",
              },
              {
                title: "Certificates",
                value: "8",
                icon: Award,
                color: "text-accent",
                bgColor: "bg-accent/10",
              },
              {
                title: "Upcoming Exams",
                value: "3",
                icon: Calendar,
                color: "text-primary",
                bgColor: "bg-primary/10",
              },
              {
                title: "Avg. Score",
                value: "92%",
                icon: TrendingUp,
                color: "text-success",
                bgColor: "bg-success/10",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={cn(
                  "bg-card-light dark:bg-card-dark rounded-xl p-6",
                  "border border-gray-200 dark:border-gray-700",
                  "shadow-lg hover:shadow-xl transition-shadow"
                )}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div
                    className={cn(
                      "w-12 h-12 rounded-lg flex items-center justify-center",
                      stat.bgColor
                    )}
                  >
                    <stat.icon className={cn("w-6 h-6", stat.color)} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Performance Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-2 bg-card-light dark:bg-card-dark rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg"
            >
              <h2 className="text-xl font-semibold mb-4">Performance Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#6A0F1C"
                    strokeWidth={2}
                    name="Score"
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Upcoming Exams */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-card-light dark:bg-card-dark rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg"
            >
              <h2 className="text-xl font-semibold mb-4">Upcoming Exams</h2>
              <div className="space-y-4">
                {[
                  { name: "JavaScript Basics", date: "Mar 15, 2024", time: "10:00 AM" },
                  { name: "React Advanced", date: "Mar 20, 2024", time: "2:00 PM" },
                  { name: "Node.js Final", date: "Mar 25, 2024", time: "11:00 AM" },
                ].map((exam, index) => (
                  <div
                    key={exam.name}
                    className="p-4 bg-background-light dark:bg-background-dark rounded-lg"
                  >
                    <h3 className="font-semibold mb-1">{exam.name}</h3>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <Calendar className="w-4 h-4 mr-2" />
                      {exam.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mt-1">
                      <Clock className="w-4 h-4 mr-2" />
                      {exam.time}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Course Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-card-light dark:bg-card-dark rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-4">Course Progress</h2>
            <div className="space-y-4">
              {courseProgress.map((course) => (
                <div key={course.name}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{course.name}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {course.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${course.progress}%` }}
                      transition={{ duration: 1, delay: 0.7 }}
                      className="bg-primary h-2.5 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
