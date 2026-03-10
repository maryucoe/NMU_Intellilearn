"use client";

import { Navbar } from "@/components/navigation/navbar";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Award, Share2, Download } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

// Mock results data
const resultsData = {
  examId: "1",
  examName: "JavaScript Fundamentals Exam",
  score: 85,
  totalQuestions: 10,
  correctAnswers: 8,
  incorrectAnswers: 2,
  passed: true,
  passMark: 70,
  timeSpent: "45 minutes",
  completedAt: "March 15, 2024 at 10:30 AM",
  questions: [
    { id: 1, correct: true, userAnswer: "object", correctAnswer: "object" },
    { id: 2, correct: true, userAnswer: "push()", correctAnswer: "push()" },
    { id: 3, correct: false, userAnswer: "Nothing", correctAnswer: "Enables strict mode" },
  ],
};

export default function ExamResultsPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Success Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-success/20 rounded-full mb-4"
            >
              <Award className="w-10 h-10 text-success" />
            </motion.div>
            <h1 className="text-4xl font-bold mb-2">Exam Completed!</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {resultsData.examName}
            </p>
          </div>

          {/* Score Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={cn(
              "bg-card-light dark:bg-card-dark rounded-2xl p-8 border-2",
              resultsData.passed
                ? "border-success shadow-xl"
                : "border-error shadow-xl",
              "mb-8"
            )}
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-primary/10 mb-6">
                <span className="text-5xl font-bold text-primary">
                  {resultsData.score}%
                </span>
              </div>
              <h2
                className={cn(
                  "text-2xl font-bold mb-2",
                  resultsData.passed ? "text-success" : "text-error"
                )}
              >
                {resultsData.passed ? "Congratulations! You Passed" : "You Did Not Pass"}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Pass Mark: {resultsData.passMark}%
              </p>

              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-success">
                    {resultsData.correctAnswers}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Correct
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-error">
                    {resultsData.incorrectAnswers}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Incorrect
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">
                    {resultsData.totalQuestions}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Total
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-card-light dark:bg-card-dark rounded-xl p-6 border border-gray-200 dark:border-gray-700 mb-8"
          >
            <h3 className="text-xl font-semibold mb-4">Exam Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">
                  Time Spent
                </span>
                <span className="font-semibold">{resultsData.timeSpent}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">
                  Completed At
                </span>
                <span className="font-semibold">
                  {resultsData.completedAt}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Question Review */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-card-light dark:bg-card-dark rounded-xl p-6 border border-gray-200 dark:border-gray-700 mb-8"
          >
            <h3 className="text-xl font-semibold mb-4">Question Review</h3>
            <div className="space-y-4">
              {resultsData.questions.map((q, index) => (
                <div
                  key={q.id}
                  className={cn(
                    "p-4 rounded-lg border-2",
                    q.correct
                      ? "border-success/50 bg-success/5"
                      : "border-error/50 bg-error/5"
                  )}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-semibold">Question {index + 1}</span>
                    {q.correct ? (
                      <CheckCircle className="w-5 h-5 text-success" />
                    ) : (
                      <XCircle className="w-5 h-5 text-error" />
                    )}
                  </div>
                  <div className="space-y-1 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-300">
                        Your Answer:{" "}
                      </span>
                      <span className="font-semibold">{q.userAnswer}</span>
                    </div>
                    {!q.correct && (
                      <div>
                        <span className="text-gray-600 dark:text-gray-300">
                          Correct Answer:{" "}
                        </span>
                        <span className="font-semibold text-success">
                          {q.correctAnswer}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            {resultsData.passed && (
              <>
                <Link
                  href={`/certificates/${resultsData.examId}`}
                  className={cn(
                    "flex-1 flex items-center justify-center px-6 py-3",
                    "bg-primary text-white rounded-lg font-semibold",
                    "hover:bg-primary-dark transition-colors"
                  )}
                >
                  <Award className="w-5 h-5 mr-2" />
                  View Certificate
                </Link>
                <button
                  className={cn(
                    "flex-1 flex items-center justify-center px-6 py-3",
                    "bg-card-light dark:bg-card-dark border border-gray-200 dark:border-gray-700",
                    "text-primary rounded-lg font-semibold",
                    "hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  )}
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Share Result
                </button>
              </>
            )}
            <Link
              href="/dashboard"
              className={cn(
                "flex-1 flex items-center justify-center px-6 py-3",
                "bg-card-light dark:bg-card-dark border border-gray-200 dark:border-gray-700",
                "rounded-lg font-semibold",
                "hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              )}
            >
              Back to Dashboard
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
