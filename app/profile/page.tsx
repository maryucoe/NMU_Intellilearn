"use client";

import { Navbar } from "@/components/navigation/navbar";
import { motion } from "framer-motion";
import { User, Mail, Phone, Calendar, Award, BookOpen, Edit, MapPin, Globe, Clock, FileText } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils/cn";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
  language: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const mockProfile = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  joinDate: "January 2023",
  bio: "Passionate learner and developer",
  location: "Riyadh, Saudi Arabia",
  language: "Arabic",
  lastLogin: "Today at 2:30 PM",
  stats: {
    coursesCompleted: 12,
    certificatesEarned: 8,
    averageScore: 92,
    examsTaken: 15,
  },
  recentCertificates: [
    { id: 1, name: "JavaScript Fundamentals", date: "2024-03-15", score: 85 },
    { id: 2, name: "React Advanced", date: "2024-02-20", score: 92 },
    { id: 3, name: "Node.js Essentials", date: "2024-01-10", score: 88 },
  ],
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: mockProfile.name,
      email: mockProfile.email,
      phone: mockProfile.phone,
      bio: mockProfile.bio,
      location: mockProfile.location,
      language: mockProfile.language,
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    console.log("Profile updated:", data);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
              <p className="text-gray-600 dark:text-gray-300">
                Manage your account information
              </p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={cn(
                "flex items-center px-4 py-2 rounded-lg font-semibold",
                "bg-primary text-white hover:bg-primary-dark transition-colors"
              )}
            >
              <Edit className="w-4 h-4 mr-2" />
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card-light dark:bg-card-dark rounded-xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg mb-8"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center space-x-6 mb-8">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-1">
                    {mockProfile.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Member since {mockProfile.joinDate}
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <>
                      <input
                        {...register("name")}
                        type="text"
                        className={cn(
                          "w-full px-4 py-3 rounded-lg border",
                          "bg-background-light dark:bg-background-dark",
                          "border-gray-300 dark:border-gray-600",
                          "focus:ring-2 focus:ring-primary focus:border-transparent",
                          errors.name && "border-error"
                        )}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-error">
                          {errors.name.message}
                        </p>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center px-4 py-3 bg-background-light dark:bg-background-dark rounded-lg">
                      <User className="w-5 h-5 text-gray-400 mr-3" />
                      <span>{mockProfile.name}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  {isEditing ? (
                    <>
                      <input
                        {...register("email")}
                        type="email"
                        className={cn(
                          "w-full px-4 py-3 rounded-lg border",
                          "bg-background-light dark:bg-background-dark",
                          "border-gray-300 dark:border-gray-600",
                          "focus:ring-2 focus:ring-primary focus:border-transparent",
                          errors.email && "border-error"
                        )}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-error">
                          {errors.email.message}
                        </p>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center px-4 py-3 bg-background-light dark:bg-background-dark rounded-lg">
                      <Mail className="w-5 h-5 text-gray-400 mr-3" />
                      <span>{mockProfile.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  {isEditing ? (
                    <input
                      {...register("phone")}
                      type="tel"
                      className={cn(
                        "w-full px-4 py-3 rounded-lg border",
                        "bg-background-light dark:bg-background-dark",
                        "border-gray-300 dark:border-gray-600",
                        "focus:ring-2 focus:ring-primary focus:border-transparent"
                      )}
                    />
                  ) : (
                    <div className="flex items-center px-4 py-3 bg-background-light dark:bg-background-dark rounded-lg">
                      <Phone className="w-5 h-5 text-gray-400 mr-3" />
                      <span>{mockProfile.phone}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Bio</label>
                  {isEditing ? (
                    <textarea
                      {...register("bio")}
                      rows={3}
                      className={cn(
                        "w-full px-4 py-3 rounded-lg border",
                        "bg-background-light dark:bg-background-dark",
                        "border-gray-300 dark:border-gray-600",
                        "focus:ring-2 focus:ring-primary focus:border-transparent"
                      )}
                    />
                  ) : (
                    <div className="px-4 py-3 bg-background-light dark:bg-background-dark rounded-lg">
                      <span>{mockProfile.bio}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  {isEditing ? (
                    <input
                      {...register("location")}
                      type="text"
                      className={cn(
                        "w-full px-4 py-3 rounded-lg border",
                        "bg-background-light dark:bg-background-dark",
                        "border-gray-300 dark:border-gray-600",
                        "focus:ring-2 focus:ring-primary focus:border-transparent"
                      )}
                    />
                  ) : (
                    <div className="flex items-center px-4 py-3 bg-background-light dark:bg-background-dark rounded-lg">
                      <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                      <span>{mockProfile.location}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Language</label>
                  {isEditing ? (
                    <select
                      {...register("language")}
                      className={cn(
                        "w-full px-4 py-3 rounded-lg border",
                        "bg-background-light dark:bg-background-dark",
                        "border-gray-300 dark:border-gray-600",
                        "focus:ring-2 focus:ring-primary focus:border-transparent"
                      )}
                    >
                      <option value="Arabic">Arabic</option>
                      <option value="English">English</option>
                      <option value="Italian">Italian</option>
                    </select>
                  ) : (
                    <div className="flex items-center px-4 py-3 bg-background-light dark:bg-background-dark rounded-lg">
                      <Globe className="w-5 h-5 text-gray-400 mr-3" />
                      <span>{mockProfile.language}</span>
                    </div>
                  )}
                </div>
              </div>

              {isEditing && (
                <button
                  type="submit"
                  className={cn(
                    "w-full md:w-auto px-6 py-3",
                    "bg-primary text-white rounded-lg font-semibold",
                    "hover:bg-primary-dark transition-colors"
                  )}
                >
                  Save Changes
                </button>
              )}
            </form>
          </motion.div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {[
              {
                icon: BookOpen,
                label: "Courses Completed",
                value: mockProfile.stats.coursesCompleted,
                color: "text-blue-500",
                bgColor: "bg-blue-500/10",
              },
              {
                icon: Award,
                label: "Certificates",
                value: mockProfile.stats.certificatesEarned,
                color: "text-accent",
                bgColor: "bg-accent/10",
              },
              {
                icon: FileText,
                label: "Exams Taken",
                value: mockProfile.stats.examsTaken,
                color: "text-primary",
                bgColor: "bg-primary/10",
              },
              {
                icon: Calendar,
                label: "Average Score",
                value: `${mockProfile.stats.averageScore}%`,
                color: "text-success",
                bgColor: "bg-success/10",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className={cn(
                  "bg-card-light dark:bg-card-dark rounded-xl p-6",
                  "border border-gray-200 dark:border-gray-700",
                  "shadow-lg"
                )}
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center mb-4",
                    stat.bgColor
                  )}
                >
                  <stat.icon className={cn("w-6 h-6", stat.color)} />
                </div>
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Recent Certificates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-card-light dark:bg-card-dark rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg mb-8"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2 text-accent" />
              Recent Certificates
            </h3>
            <div className="space-y-3">
              {mockProfile.recentCertificates.map((cert) => (
                <div
                  key={cert.id}
                  className="flex items-center justify-between p-4 bg-background-light dark:bg-background-dark rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mr-4">
                      <Award className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold">{cert.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Completed on {cert.date} • Score: {cert.score}%
                      </p>
                    </div>
                  </div>
                  <a
                    href={`/certificates/${cert.id}`}
                    className="text-primary hover:underline text-sm font-medium"
                  >
                    View
                  </a>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Account Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-card-light dark:bg-card-dark rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4">Account Information</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-background-light dark:bg-background-dark rounded-lg">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Member since
                  </span>
                </div>
                <span className="font-semibold">{mockProfile.joinDate}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-background-light dark:bg-background-dark rounded-lg">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Last login
                  </span>
                </div>
                <span className="font-semibold">{mockProfile.lastLogin}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
