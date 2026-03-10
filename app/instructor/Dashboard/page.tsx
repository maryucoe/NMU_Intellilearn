'use client';

import { useState, useEffect } from 'react';
import {
  Edit3,
  Plus,
  MessageCircle,
  MoreVertical,
  BarChart3,
  Users,
  Star,
  TrendingUp,
} from 'lucide-react';

export default function InstructorDashboard() {
  const [instructorProfile, setInstructorProfile] = useState<any>(null);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const instructorsDatabase: Record<string, any> = {
    "prof.aya@example.com": {
      name: 'Prof. Aya',
      email: 'prof.aya@example.com',
      specialty: 'AI & React',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aya',
      bio: 'Experienced instructor in AI and web development.',
      courses: [
        {
          id: 1,
          title: 'Advanced React Patterns',
          description: 'Master advanced React concepts and patterns',
          students: 120,
          rating: 4.9,
          videos: 20,
        },
        {
          id: 2,
          title: 'React Advanced',
          description: 'Deep dive into React hooks',
          students: 95,
          rating: 4.7,
          videos: 18,
        },
      ],
      students: [
        {
          id: 1,
          name: 'Nada',
          email: 'nada@email.com',
          course: 'Intro to AI',
          progress: 80,
        },
        {
          id: 2,
          name: 'Ahmed',
          email: 'ahmed@email.com',
          course: 'React Advanced',
          progress: 60,
        },
      ],
      quizzes: [
        {
          id: 1,
          title: 'AI Basics Quiz',
          course: 'Intro to AI',
          questions: 15,
          avgScore: 82,
        },
        {
          id: 2,
          title: 'React Hooks Quiz',
          course: 'React Advanced',
          questions: 12,
          avgScore: 78,
        },
      ],
      analytics: {
        totalStudents: 215,
        averageRating: 4.8,
        completionRate: 72,
        topCourse: 'Intro to AI',
      },
    },
  };

  useEffect(() => {
    const email = localStorage.getItem('currentInstructorEmail');
    const profile = email ? instructorsDatabase[email] : null;
    setInstructorProfile(profile);
  }, []);

  if (!instructorProfile) return null;

  const analytics = instructorProfile.analytics;
  const students = instructorProfile.students;

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}

      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <h1 className="text-3xl font-bold">Instructor Dashboard</h1>
          <p className="text-sm text-gray-500">
            Welcome back, {instructorProfile.name}
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">

        {/* PROFILE */}

        <section className="mb-8">
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="flex gap-6 p-6 items-end">
              <img
                src={instructorProfile.avatar}
                className="h-20 w-20 rounded-lg border"
              />

              <div>
                <h2 className="text-2xl font-bold">{instructorProfile.name}</h2>
                <p className="text-sm text-gray-500">
                  {instructorProfile.specialty}
                </p>
              </div>

              <button className="ml-auto flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-md hover:bg-gray-50">
                <Edit3 className="h-4 w-4" />
                Edit Profile
              </button>
            </div>

            <div className="p-6 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p>{instructorProfile.email}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Bio</p>
                <p>{instructorProfile.bio}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ANALYTICS */}

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">Quick Analytics</h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Students</p>
                  <p className="text-2xl font-bold">{analytics.totalStudents}</p>
                </div>
                <Users className="h-8 w-8 text-gray-400" />
              </div>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Avg Rating</p>
                  <p className="text-2xl font-bold">{analytics.averageRating}</p>
                </div>
                <Star className="h-8 w-8 text-yellow-400" />
              </div>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Completion Rate</p>
                  <p className="text-2xl font-bold">{analytics.completionRate}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-gray-400" />
              </div>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">Top Course</p>
              <p className="font-bold">{analytics.topCourse}</p>
            </div>

          </div>
        </section>

        {/* COURSES */}

        <section className="mb-8">

          <div className="flex justify-between mb-4">
            <h2 className="text-2xl font-bold">My Courses</h2>

            <button className="flex items-center gap-2 bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded-md transition">
              <Plus className="h-4 w-4" />
              Add Course
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-4">

            {instructorProfile.courses.map((course: any) => (

              <div key={course.id} className="border border-gray-200 rounded-lg bg-white shadow-sm">

                <div className="p-6 border-b">
                  <h3 className="font-bold">{course.title}</h3>
                  <p className="text-sm text-gray-500">{course.description}</p>
                </div>

                <div className="p-6 space-y-4">

                  <div className="flex gap-4 text-sm">
                    <span>{course.students} students</span>
                    <span>⭐ {course.rating}</span>
                  </div>

                  <div className="text-sm">
                    {course.videos} videos
                  </div>

                  <button className="w-full border px-4 py-2 rounded-md hover:bg-gray-50">
                    <Plus className="inline h-4 w-4 mr-2" />
                    Add Video
                  </button>

                </div>

              </div>

            ))}

          </div>
        </section>

        {/* STUDENTS */}

        <section className="mb-8">

          <h2 className="text-2xl font-bold mb-4">Student Tracking</h2>

          <div className="bg-white border rounded-lg shadow-sm">

            {students.map((student: any) => (

              <div key={student.id} className="flex justify-between items-center p-4 border-b">

                <div>

                  <p className="font-medium">{student.name}</p>
                  <p className="text-sm text-gray-500">{student.email}</p>
                  <p className="text-sm text-gray-500">{student.course}</p>

                  <div className="mt-2 flex items-center gap-2">

                    <div className="h-2 w-40 bg-gray-200 rounded-full">

                      <div
                        className="h-2 bg-red-800 rounded-full"
                        style={{ width: `${student.progress}%` }}
                      />

                    </div>

                    <span className="text-xs">{student.progress}%</span>

                  </div>

                </div>

                <div className="flex gap-2">

                  <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md">
                    <MessageCircle className="h-4 w-4" />
                    Message
                  </button>

                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === student.id ? null : student.id)
                    }
                    className="px-3 py-2 hover:bg-gray-100 rounded-md"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>

                </div>

              </div>

            ))}

          </div>

        </section>

        {/* QUIZ MANAGEMENT */}

        <section>

          <div className="flex justify-between mb-4">

            <h2 className="text-2xl font-bold">Quiz Management</h2>

            <button className="flex items-center gap-2 bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded-md transition">
              <Plus className="h-4 w-4" />
              Create Quiz
            </button>

          </div>

          <div className="grid lg:grid-cols-2 gap-4">

            {instructorProfile.quizzes.map((quiz: any) => (

              <div key={quiz.id} className="border border-gray-200 rounded-lg bg-white shadow-sm">

                <div className="p-6 border-b">
                  <h3 className="font-bold">{quiz.title}</h3>
                  <p className="text-sm text-gray-500">{quiz.course}</p>
                </div>

                <div className="p-6 space-y-4">

                  <div className="grid grid-cols-2">

                    <div>
                      <p className="text-sm text-gray-500">Questions</p>
                      <p className="text-xl font-bold">{quiz.questions}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Avg Score</p>
                      <p className="text-xl font-bold">{quiz.avgScore}%</p>
                    </div>

                  </div>

                  <button className="w-full border px-4 py-2 rounded-md hover:bg-gray-50">
                    <BarChart3 className="inline h-4 w-4 mr-2" />
                    View Results
                  </button>

                </div>

              </div>

            ))}

          </div>

        </section>

      </main>
    </div>
  );
}