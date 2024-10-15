'use client'

import { useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <header className="bg-primary-800 text-surface-0 px-4 py-4 flex items-center justify-between">
      <div className="text-2xl font-bold">Douq</div>
      <nav className="hidden md:flex space-x-6">
        <a href="#" className="hover:text-success-300">Home</a>
        <a href="#" className="hover:text-success-300">Services</a>
        <a href="#" className="hover:text-success-300">Contact</a>
        <a href="#" className="hover:text-success-300">Home</a>
      </nav>
      <div className="flex items-center space-x-4">
        <button className="bg-success-500 text-primary-900 px-4 py-2 rounded-2xl font-semibold hover:bg-success-400 transition-colors">
          Sign In
        </button>
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-full bg-primary-600 hover:bg-primary-500 transition-colors"
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  )
}