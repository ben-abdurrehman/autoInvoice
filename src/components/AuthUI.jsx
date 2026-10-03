'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiArrowRight, FiLock, FiMail } from 'react-icons/fi'

export default function AuthUI({ action, type, message }) {
  const isLogin = type === 'login'

  return (
    <div className="min-h-screen w-full flex bg-slate-50 text-slate-900 font-sans">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-slate-100"
        >
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
              {isLogin ? 'Welcome back' : 'Create an account'}
            </h1>
            <p className="text-slate-500">
              {isLogin ? 'Enter your details to access your dashboard' : 'Start your free trial today. No credit card required.'}
            </p>
          </div>

          {message && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-600 text-sm border border-red-100 flex items-center gap-2">
              <FiLock className="shrink-0" />
              {message}
            </div>
          )}

          <form action={action} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <FiMail />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <FiLock />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors active:scale-[0.98]"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
              <FiArrowRight />
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500">
            {isLogin ? (
              <p>
                Don't have an account?{' '}
                <Link href="/signup" className="text-blue-600 font-semibold hover:underline">
                  Sign up
                </Link>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <Link href="/login" className="text-blue-600 font-semibold hover:underline">
                  Sign in
                </Link>
              </p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Right side - Visuals */}
      <div className="hidden lg:flex w-1/2 bg-blue-600 relative overflow-hidden items-center justify-center">
        {/* Abstract background elements */}
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-blue-700 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative z-10 p-12 text-white max-w-lg"
        >
          <div className="mb-6 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl">
             <div className="flex items-center gap-4 border-b border-white/20 pb-4 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shadow-inner">
                  <span className="font-bold text-xl">AI</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">AutoInvoice Pro</h3>
                  <p className="text-blue-200 text-sm">Enterprise Billing</p>
                </div>
             </div>
             <div className="space-y-3">
               <div className="h-2 w-3/4 bg-white/20 rounded-full"></div>
               <div className="h-2 w-1/2 bg-white/20 rounded-full"></div>
               <div className="h-2 w-5/6 bg-white/20 rounded-full"></div>
             </div>
          </div>

          <h2 className="text-4xl font-bold mb-4 leading-tight">
            The modern way to manage your business invoices.
          </h2>
          <p className="text-blue-100 text-lg">
            Join thousands of professionals using AutoInvoice to get paid faster, track finances, and look professional.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
