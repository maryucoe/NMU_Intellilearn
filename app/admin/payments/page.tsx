"use client";

import { Navbar } from "@/components/navigation/navbar";
import { motion } from "framer-motion";

export default function AdminPaymentsPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-card-light dark:bg-card-dark rounded-xl p-10 border border-gray-200 dark:border-gray-700 shadow-lg text-center"
        >
          <h1 className="text-3xl font-bold mb-4">Ready to start quiz</h1>
          <p className="text-gray-600 dark:text-gray-300">
            This section is now dedicated to quiz readiness instead of payments.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
