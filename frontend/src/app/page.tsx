import React from 'react';
import {
  CheckCircle,
  Clock,
  BarChart3,
  ArrowRight,
  Zap,
  Shield,
  Layers,
} from 'lucide-react';

export default function Homepage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-cyan-900 to-emerald-950">
      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-8 w-8 text-cyan-400" />
            <span className="text-2xl font-bold text-white">TaskFlow</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#about"
              className="text-gray-300 hover:text-white transition-colors"
            >
              About
            </a>
            <a
              href="/auth/login"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Login
            </a>
            <a
              href="/auth/signup"
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Organize Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-400 block">
                Tasks Effortlessly
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              A powerful task management platform that helps you stay organized,
              track progress, and gain insights into your productivity. Built
              for modern teams and individuals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/auth/register"
                className="bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-700 hover:to-emerald-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all transform hover:scale-105"
              >
                <span>Start Managing Tasks</span>
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="border border-gray-600 hover:border-cyan-400 text-white px-8 py-4 rounded-lg font-semibold transition-all hover:bg-cyan-900/20"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-cyan-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-emerald-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-16 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-cyan-400">10K+</div>
              <div className="text-gray-300">Tasks Completed</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-emerald-400">500+</div>
              <div className="text-gray-300">Active Users</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-teal-400">99.9%</div>
              <div className="text-gray-300">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to manage tasks efficiently and gain valuable
              insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-cyan-500 transition-all hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-cyan-600 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Task Management
              </h3>
              <p className="text-gray-300">
                Create, edit, and delete tasks with rich descriptions, status
                tracking, and custom metadata support.
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-emerald-500 transition-all hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Smart Insights
              </h3>
              <p className="text-gray-300">
                Get detailed analytics about your task completion rates,
                productivity patterns, and progress trends.
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-teal-500 transition-all hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Status Tracking
              </h3>
              <p className="text-gray-300">
                Track tasks through pending, in-progress, and completed states
                with advanced filtering options.
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-sky-500 transition-all hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-sky-600 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Secure Authentication
              </h3>
              <p className="text-gray-300">
                Authentication ensures your tasks remain private and secure to
                your account only.
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-violet-500 transition-all hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-violet-600 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Lightning Fast
              </h3>
              <p className="text-gray-300">
                Built with modern technologies including Node.js and Express for
                optimal performance and reliability.
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-indigo-500 transition-all hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <Layers className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Flexible Data
              </h3>
              <p className="text-gray-300">
                Store custom metadata including tags, due dates, priority
                levels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-cyan-800/30 to-emerald-800/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Organized?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of users who have transformed their productivity with
            TaskFlow
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/auth/signup"
              className="bg-white text-cyan-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Create Free Account
            </a>
            <a
              href="/auth/login"
              className="border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-cyan-900 transition-colors"
            >
              Sign In
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-black/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <CheckCircle className="h-6 w-6 text-cyan-400" />
              <span className="text-xl font-bold text-white">TaskFlow</span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p>&copy; 2025 TaskFlow. Built with modern web technologies.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
