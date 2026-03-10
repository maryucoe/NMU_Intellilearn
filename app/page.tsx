"use client";

import { Navbar } from "@/components/navigation/navbar";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Award, Users } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Text Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Advanced{" "}
                <span className="text-primary">AI-Powered</span> Learning Platform
              </h1>

              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
                Transform your professional development with our comprehensive
                learning, examination, and digital certification system.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/login"
                  className={cn(
                    "inline-flex items-center justify-center px-6 py-3",
                    "bg-primary text-white rounded-lg font-semibold",
                    "hover:bg-primary-dark transition-colors",
                    "shadow-lg hover:shadow-xl"
                  )}
                >
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>

                <Link
                  href="/courses"
                  className={cn(
                    "inline-flex items-center justify-center px-6 py-3",
                    "bg-card-light dark:bg-card-dark border-2 border-primary text-primary rounded-lg font-semibold",
                    "hover:bg-primary hover:text-white transition-colors"
                  )}
                >
                  Browse Courses
                </Link>
              </div>
            </motion.div>

            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 bg-card-light dark:bg-card-dark rounded-2xl shadow-2xl overflow-hidden h-[500px]">
                <div className="relative w-full h-full">
                  <Image
                    src="/images/undraw_online-learning_tgmv.png"
                    alt="Learning Platform"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card-light dark:bg-card-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose IntelliLearn?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Everything you need for professional certification
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Comprehensive Courses",
                description:
                  "Access a wide range of professional courses designed by experts",
              },
              {
                icon: Award,
                title: "Digital Certificates",
                description:
                  "Earn verifiable digital certificates upon course completion",
              },
              {
                icon: Users,
                title: "Expert Support",
                description:
                  "Learn from industry professionals and get dedicated support",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-background-light dark:bg-background-dark p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card-light dark:bg-card-dark border-t border-gray-200 dark:border-gray-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            © 2024 NMU IntelliLearn Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
