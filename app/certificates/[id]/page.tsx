"use client";

import { Navbar } from "@/components/navigation/navbar";
import { motion } from "framer-motion";
import { Award, Share2, Download, QrCode, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils/cn";

// Mock certificate data
const certificateData = {
  id: "1",
  certificateNumber: "INT-2024-001234",
  studentName: "John Doe",
  courseName: "JavaScript Fundamentals",
  completionDate: "March 15, 2024",
  score: 85,
  verificationUrl: "https://intellilearn.nmu.edu/verify/INT-2024-001234",
  qrCode: "INT-2024-001234", // In real app, this would be a QR code image/data URL
};

export default function CertificatePage({ params }: { params: { id: string } }) {
  const handleDownload = () => {
    // In real app, this would download the PDF certificate
    console.log("Downloading certificate...");
  };

  const handleShareLinkedIn = () => {
    // In real app, this would open LinkedIn share dialog
    const url = encodeURIComponent(certificateData.verificationUrl);
    const text = encodeURIComponent(
      `I just completed ${certificateData.courseName} on NMU IntelliLearn!`
    );
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Certificate Preview */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={cn(
                  "bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5",
                  "rounded-2xl p-12 border-4 border-primary/20",
                  "shadow-2xl"
                )}
              >
                <div className="text-center">
                  {/* Certificate Header */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mb-8"
                  >
                    <Award className="w-20 h-20 text-primary mx-auto mb-4" />
                    <h1 className="text-4xl font-bold text-primary mb-2">
                      Certificate of Completion
                    </h1>
                    <div className="w-32 h-1 bg-accent mx-auto"></div>
                  </motion.div>

                  {/* Certificate Body */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mb-8"
                  >
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                      This is to certify that
                    </p>
                    <h2 className="text-3xl font-bold text-primary mb-6">
                      {certificateData.studentName}
                    </h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
                      has successfully completed the course
                    </p>
                    <h3 className="text-2xl font-semibold text-primary mb-6">
                      {certificateData.courseName}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      with a score of {certificateData.score}%
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      Completed on {certificateData.completionDate}
                    </p>
                  </motion.div>

                  {/* Certificate Footer */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="flex justify-between items-end mt-12 pt-8 border-t-2 border-primary/20"
                  >
                    <div className="text-center">
                      <div className="w-32 h-1 bg-primary mb-2"></div>
                      <p className="text-sm font-semibold">Instructor Signature</p>
                    </div>
                    <div className="text-center">
                      <div className="w-32 h-1 bg-primary mb-2"></div>
                      <p className="text-sm font-semibold">Date</p>
                    </div>
                  </motion.div>

                  {/* Certificate Number */}
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
                    Certificate No: {certificateData.certificateNumber}
                  </p>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mt-6">
                <button
                  onClick={handleDownload}
                  className={cn(
                    "flex items-center px-6 py-3",
                    "bg-primary text-white rounded-lg font-semibold",
                    "hover:bg-primary-dark transition-colors"
                  )}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download PDF
                </button>
                <button
                  onClick={handleShareLinkedIn}
                  className={cn(
                    "flex items-center px-6 py-3",
                    "bg-[#0077b5] text-white rounded-lg font-semibold",
                    "hover:bg-[#006399] transition-colors"
                  )}
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Share on LinkedIn
                </button>
              </div>
            </div>

            {/* Verification Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-card-light dark:bg-card-dark rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg sticky top-24"
              >
                <h3 className="text-xl font-semibold mb-4">Verification</h3>

                {/* QR Code */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-4 flex items-center justify-center">
                  <div className="w-48 h-48 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <QrCode className="w-32 h-32 text-gray-400" />
                    {/* In real app, display actual QR code */}
                  </div>
                </div>

                {/* Verification Info */}
                <div className="space-y-3 mb-6">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                      Certificate Number
                    </p>
                    <p className="font-mono text-sm font-semibold">
                      {certificateData.certificateNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                      Verification URL
                    </p>
                    <a
                      href={certificateData.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline break-all"
                    >
                      {certificateData.verificationUrl}
                    </a>
                  </div>
                </div>

                {/* Verified Badge */}
                <div className="flex items-center p-4 bg-success/10 rounded-lg border border-success/20">
                  <CheckCircle className="w-5 h-5 text-success mr-2" />
                  <span className="text-sm font-semibold text-success">
                    Certificate Verified
                  </span>
                </div>

                <button
                  className={cn(
                    "w-full mt-4 px-4 py-2",
                    "bg-background-light dark:bg-background-dark",
                    "border border-gray-200 dark:border-gray-700",
                    "rounded-lg font-semibold",
                    "hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  )}
                >
                  Verify Certificate
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
