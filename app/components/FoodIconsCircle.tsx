'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Coffee, Soup, Pizza, Sandwich, Salad } from 'lucide-react'
import React from 'react'

// Sample data - replace with real data from your API
const sampleDishes = [
  { id: 1, name: 'Moroccan Tagine', restaurant: 'Riad Fes', icon: Coffee },
  { id: 2, name: 'Couscous Royale', restaurant: 'La Maison Arabe', icon: Soup },
  { id: 3, name: 'Pastilla', restaurant: 'Dar Moha', icon: Pizza },
  { id: 4, name: 'Harira Soup', restaurant: 'Cafe Clock', icon: Sandwich },
  { id: 5, name: 'Mint Tea', restaurant: 'Riad Yacout', icon: Salad },
]

export default function DishShowcase() {
  const [dishes, setDishes] = useState(sampleDishes)
  const [activeDish, setActiveDish] = useState(0)
  const [hoveredDish, setHoveredDish] = useState<number | null>(null)

  useEffect(() => {
    // Rotate dishes every 2 seconds
    const interval = setInterval(() => {
      setActiveDish((prev) => (prev + 1) % dishes.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [dishes.length])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  }

  const dishVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  return (
    <motion.div
      className="w-2/4 min-h-64 relative bg-transparent"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {dishes.map((dish, index) => (
          <motion.div
            key={dish.id}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: index === activeDish ? 1 : 0.5,
              scale: index === activeDish ? 1 : 0.8,
              rotate: `${index * (360 / dishes.length)}deg`,
              x: `${Math.cos(index * (2 * Math.PI / dishes.length)) * 100}px`,
              y: `${Math.sin(index * (2 * Math.PI / dishes.length)) * 100}px`,
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            onHoverStart={() => setHoveredDish(index)}
            onHoverEnd={() => setHoveredDish(null)}
          >
            <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center shadow-lg">
              {React.createElement(dish.icon, { size: 32, className: "text-primary-600" })}
            </div>
            <AnimatePresence>
              {hoveredDish === index && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-center"
                >
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}