'use client'

/**
 * FloatingBlossoms
 * Florecillas pastel rosa que caen suavemente, con un leve vaivén y giro.
 */
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const PETAL_COLORS = ['#f6c5d5', '#dfa6b8', '#f8dce6']

function Blossom({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse
          key={angle}
          cx={12}
          cy={6.5}
          rx={3.4}
          ry={5.4}
          fill={color}
          opacity={0.85}
          transform={`rotate(${angle} 12 12)`}
        />
      ))}
      <circle cx={12} cy={12} r={2} fill="#e8cf8b" />
    </svg>
  )
}

interface FloatingBlossomsProps {
  count?: number
  className?: string
}

export function FloatingBlossoms({ count = 6, className = '' }: FloatingBlossomsProps) {
  const [blossoms, setBlossoms] = useState<
    Array<{
      id: number
      left: number
      size: number
      duration: number
      delay: number
      sway: number
      color: string
    }>
  >([])

  useEffect(() => {
    setBlossoms(
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 12 + Math.random() * 10,
        duration: 12 + Math.random() * 10,
        delay: Math.random() * 10,
        sway: 20 + Math.random() * 30,
        color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
      })),
    )
  }, [count])

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {blossoms.map((b) => (
        <motion.div
          key={b.id}
          className="absolute"
          style={{ left: `${b.left}%` }}
          initial={{ top: '-10%', opacity: 0, rotate: 0 }}
          animate={{
            top: ['-10%', '110%'],
            x: [0, b.sway, -b.sway, 0],
            rotate: [0, 140, 280, 360],
            opacity: [0, 0.9, 0.9, 0],
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        >
          <Blossom size={b.size} color={b.color} />
        </motion.div>
      ))}
    </div>
  )
}
