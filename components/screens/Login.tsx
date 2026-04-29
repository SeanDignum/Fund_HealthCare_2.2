"use client"

import { useState } from "react"
import { AILogo } from "@/components/Logo"

interface LoginProps {
  onLogin: () => void
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin()
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col items-center justify-center p-4 font-sans relative">
      <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-8 sm:p-10 w-full max-w-[480px]">
        <div className="text-center mb-8 flex flex-col items-center">
          <AILogo className="w-16 h-16 mb-4" />
          <p className="text-[11px] font-bold tracking-[0.2em] text-[#00cfa1] uppercase mb-4">
            AI Patient Health Assistant
          </p>
          <h1 className="text-[28px] font-bold text-[#111827] mb-3">Secure Patient Portal</h1>
          <p className="text-[#6B7280] text-sm leading-relaxed px-4">
            Sign in with your patient account to continue your clinical intake and review your health data.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[13px] font-bold text-[#111827] mb-1.5">Email</label>
            <input
              type="email"
              placeholder="patient@demo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] transition-all placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="block text-[13px] font-bold text-[#111827] mb-1.5">Password</label>
            <input
              type="password"
              placeholder="health2026"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] transition-all placeholder:text-gray-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#0066FF] hover:bg-blue-700 text-white font-semibold rounded-lg text-sm transition-colors mt-2"
          >
            Log in to Portal
          </button>
        </form>

        <div className="flex items-center gap-3 my-7">
          <div className="h-px bg-gray-200 flex-1" />
          <span className="text-xs text-gray-400 font-medium">or continue with</span>
          <div className="h-px bg-gray-200 flex-1" />
        </div>

        <div className="space-y-3">
          <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold text-[#111827]">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>
          <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#0F1419] rounded-lg hover:bg-black transition-colors text-sm font-semibold text-white">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.126 3.822 3.08 1.53-.046 2.13-.986 3.978-.986 1.848 0 2.404.986 3.996.94 1.637-.046 2.664-1.545 3.656-3.015 1.15-1.68 1.623-3.308 1.644-3.393-.037-.015-3.175-1.22-3.21-4.854-.031-3.042 2.483-4.507 2.595-4.577-1.428-2.093-3.633-2.368-4.417-2.407-2.08-.266-4.086 1.148-5.12 1.148-.567 0-1.53-.61-2.542-.61M15.438 4.25c.84-.99 1.41-2.367 1.255-3.75-1.196.046-2.628.784-3.488 1.776-.77.88-1.408 2.29-1.233 3.642 1.332.102 2.628-.68 3.466-1.668" />
            </svg>
            Sign in with Apple
          </button>
          <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-black rounded-lg hover:bg-gray-900 transition-colors text-sm font-semibold text-white">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            Sign in with X
          </button>
        </div>
      </div>
      
      <p className="mt-8 text-sm text-[#475569] font-medium text-center">
        Demo credentials: patient@demo.com / health2026
      </p>
    </div>
  )
}
