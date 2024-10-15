'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const cities = ['Casablanca', 'Marrakech', 'Rabat', 'Fes', 'Tangier']

export default function HeroSection() {
  const [currentCityIndex, setCurrentCityIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCityIndex((prevIndex) => (prevIndex + 1) % cities.length)
    }, 3000) // Change city every 3 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="md:w-3/4 mb-8 md:mb-0">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-surface-0">
        Find your best dining experience in{' '}
        <span className="relative inline-block w-48 sm:w-56 md:w-64 h-12 sm:h-14 md:h-16">          
          <AnimatePresence mode="wait">
            <motion.span
              key={cities[currentCityIndex]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute left-0 text-success-400"
              style={{ width: '100%', height: '100%' }}
            >
              {cities[currentCityIndex]}
            </motion.span>
          </AnimatePresence>
        </span>
      </h1>
      <p className="text-xl mb-8 text-surface-100">
        Discover delightful meals near you with just a few clicks
      </p>
    </div>
  )
}