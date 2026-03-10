"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Clock, CheckCircle, Circle, AlertTriangle, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

// Mock exam data
const examData = {
  id: "1",
  title: "JavaScript Fundamentals Exam",
  duration: 60, // minutes
  questions: [
    {
      id: 1,
      question: "What is the output of typeof null in JavaScript?",
      options: ["object", "null", "undefined", "boolean"],
      type: "multiple-choice",
    },
    {
      id: 2,
      question: "Which method is used to add an element to the end of an array?",
      options: ["push()", "pop()", "shift()", "unshift()"],
      type: "multiple-choice",
    },
    {
      id: 3,
      question: "What does 'use strict' do in JavaScript?",
      options: [
        "Enables strict mode",
        "Disables strict mode",
        "Nothing",
        "Throws an error",
      ],
      type: "multiple-choice",
    },
    {
      id: 4,
      question: "Explain the difference between var, let, and const.",
      type: "essay",
    },
    {
      id: 5,
      question: "What is a closure in JavaScript?",
      options: [
        "A function inside another function",
        "A way to access outer scope from inner function",
        "A JavaScript error",
        "A data type",
      ],
      type: "multiple-choice",
    },
  ],
};

export default function ExamPage({ params }: { params: { id: string } }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(examData.duration * 60);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Handle exam submission on timeout
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setShowWarning(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    if (confirm("Are you sure you want to submit the exam?")) {
      // Handle submission
      console.log("Exam submitted", answers);
    }
  };

  const question = examData.questions[currentQuestion];
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-card-light dark:bg-card-dark border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">{examData.title}</h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Question {currentQuestion + 1} of {examData.questions.length}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-red-500/10 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg">
                <Clock className="w-5 h-5" />
                <span className="font-mono font-semibold">
                  {formatTime(timeRemaining)}
                </span>
              </div>
              <button
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="p-2 rounded-lg bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Question Area */}
          <div className="lg:col-span-3">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-card-light dark:bg-card-dark rounded-xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg"
            >
              <div className="mb-6">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Question {currentQuestion + 1}
                </span>
                <h2 className="text-2xl font-semibold mt-2">{question.question}</h2>
              </div>

              {question.type === "multiple-choice" ? (
                <div className="space-y-3">
                  {question.options?.map((option, index) => (
                    <label
                      key={index}
                      className={cn(
                        "flex items-center p-4 rounded-lg border-2 cursor-pointer transition-colors",
                        "bg-background-light dark:bg-background-dark",
                        answers[question.id] === option
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 dark:border-gray-700 hover:border-primary/50"
                      )}
                    >
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option}
                        checked={answers[question.id] === option}
                        onChange={(e) =>
                          handleAnswerChange(question.id, e.target.value)
                        }
                        className="mr-3 w-4 h-4 text-primary"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <textarea
                  value={answers[question.id] || ""}
                  onChange={(e) =>
                    handleAnswerChange(question.id, e.target.value)
                  }
                  className={cn(
                    "w-full h-64 p-4 rounded-lg border",
                    "bg-background-light dark:bg-background-dark",
                    "border-gray-200 dark:border-gray-700",
                    "focus:ring-2 focus:ring-primary focus:border-transparent"
                  )}
                  placeholder="Type your answer here..."
                />
              )}
            </motion.div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <button
                onClick={() =>
                  setCurrentQuestion((prev) => Math.max(0, prev - 1))
                }
                disabled={currentQuestion === 0}
                className={cn(
                  "px-6 py-3 rounded-lg font-semibold",
                  "bg-card-light dark:bg-card-dark border border-gray-200 dark:border-gray-700",
                  "hover:bg-gray-100 dark:hover:bg-gray-800",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                Previous
              </button>
              {currentQuestion < examData.questions.length - 1 ? (
                <button
                  onClick={() =>
                    setCurrentQuestion((prev) =>
                      Math.min(examData.questions.length - 1, prev + 1)
                    )
                  }
                  className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-3 bg-success text-white rounded-lg font-semibold hover:bg-success/90"
                >
                  Submit Exam
                </button>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card-light dark:bg-card-dark rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg sticky top-24">
              <h3 className="font-semibold mb-4">Question Navigation</h3>
              <div className="grid grid-cols-5 gap-2 mb-6">
                {examData.questions.map((q, index) => (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestion(index)}
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold transition-colors",
                      currentQuestion === index
                        ? "bg-primary text-white"
                        : answers[q.id]
                        ? "bg-success text-white"
                        : "bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700"
                    )}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-success mr-2" />
                  <span>Answered ({answeredCount})</span>
                </div>
                <div className="flex items-center">
                  <Circle className="w-4 h-4 text-gray-400 mr-2" />
                  <span>
                    Unanswered ({examData.questions.length - answeredCount})
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Warning Modal */}
      <AnimatePresence>
        {showWarning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowWarning(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card-light dark:bg-card-dark rounded-xl p-8 max-w-md mx-4 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-6 h-6 text-error mr-3" />
                <h3 className="text-xl font-semibold">Warning</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                You have left the exam page. Please return to continue your exam.
              </p>
              <button
                onClick={() => setShowWarning(false)}
                className="w-full px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark"
              >
                Continue Exam
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
