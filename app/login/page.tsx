"use client";

import { Navbar } from "@/components/navigation/navbar";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils/cn";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setLoginError(null);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    const { email, password } = data;

    // Admin login
    if (email === "admin@knowledgejudge.com" && password === "Admin123!") {
      router.push("/admin/profile");
      setIsLoading(false);
      return;
    }

    // Student login
    if (email === "gana@example.com" && password === "Student123!") {
      localStorage.setItem("currentStudentEmail", email);
      router.push("/profile");
      setIsLoading(false);
      return;
    }

    // Instructor login
    if (email === "prof.aya@example.com" && password === "Instructor123!") {
      localStorage.setItem("currentInstructorEmail", email);
      router.push("/instructor/Dashboard");
      setIsLoading(false);
      return;
    }

    // Invalid credentials
    setLoginError("Invalid email or password. Please try again.");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="bg-card-light dark:bg-card-dark rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <GraduationCap className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
              <p className="text-gray-600 dark:text-gray-300">
                Sign in to your IntelliLearn account
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                <input
                  {...register("email")}
                  type="email"
                  id="email"
                  className={cn(
                    "w-full px-4 py-3 rounded-lg border",
                    "bg-background-light dark:bg-background-dark",
                    "border-gray-300 dark:border-gray-600",
                    "focus:ring-2 focus:ring-primary focus:border-transparent",
                    errors.email && "border-error"
                  )}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-error">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
                <input
                  {...register("password")}
                  type="password"
                  id="password"
                  className={cn(
                    "w-full px-4 py-3 rounded-lg border",
                    "bg-background-light dark:bg-background-dark",
                    "border-gray-300 dark:border-gray-600",
                    "focus:ring-2 focus:ring-primary focus:border-transparent",
                    errors.password && "border-error"
                  )}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-error">{errors.password.message}</p>
                )}
              </div>

              {loginError && (
                <p className="text-sm text-error mt-1">{loginError}</p>
              )}

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">Forgot password?</Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={cn(
                  "w-full py-3 px-4 rounded-lg font-semibold",
                  "bg-primary text-white",
                  "hover:bg-primary-dark transition-colors",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "shadow-lg hover:shadow-xl"
                )}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-primary font-semibold hover:underline">Sign up</Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}