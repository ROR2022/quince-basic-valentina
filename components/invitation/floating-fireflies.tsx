'use client'

/**
 * FloatingFireflies
 * Luciérnagas doradas que flotan con movimientos aleatorios.
 */
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface FloatingFirefliesProps {
  count?: number
  className?: string
}

export function FloatingFireflies({
  count = 18,
  className = '',
}: FloatingFirefliesProps) {
  const [fireflies, setFireflies] = useState<
    Array<{
      id: number
      left: number
      top: number
      size: number
      duration: number
      delay: number
      drift: number
    }>
  >([])

  useEffect(() => {
    setFireflies(
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 4,
        duration: 6 + Math.random() * 8,
        delay: Math.random() * 6,
        drift: 20 + Math.random() * 60,
      })),
    )
  }, [count])

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {fireflies.map((f) => (
        <motion.span
          key={f.id}
          className="absolute rounded-full bg-gold-light"
          style={{
            left: `${f.left}%`,
            top: `${f.top}%`,
            width: f.size,
            height: f.size,
            boxShadow: '0 0 8px 2px rgba(232, 207, 139, 0.8)',
          }}
          animate={{
            x: [0, f.drift, -f.drift / 2, 0],
            y: [0, -f.drift, f.drift / 3, 0],
            opacity: [0, 1, 0.4, 1, 0],
          }}
          transition={{
            duration: f.duration,
            delay: f.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
