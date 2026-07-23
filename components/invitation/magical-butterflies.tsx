'use client'

/**
 * MagicalButterflies
 * Mariposas luminosas que flotan por la pantalla.
 * Colores: lavanda, dorado, salvia y un acento de rosa pastel.
 */
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface MagicalButterfliesProps {
  count?: number
  className?: string
}

const WING_COLORS = ['#c8b9db', '#e8cf8b', '#9caf88', '#f6c5d5', '#dfa6b8']

function Butterfly({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      {/* Ala izquierda */}
      <motion.path
        d="M16 16C10 4 2 6 4 14c1.5 6 8 4 12 2Z"
        fill={color}
        opacity={0.85}
        animate={{ scaleX: [1, 0.55, 1] }}
        transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
        style={{ transformOrigin: '16px 16px' }}
      />
      {/* Ala derecha */}
      <motion.path
        d="M16 16C22 4 30 6 28 14c-1.5 6-8 4-12 2Z"
        fill={color}
        opacity={0.85}
        animate={{ scaleX: [1, 0.55, 1] }}
        transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
        style={{ transformOrigin: '16px 16px' }}
      />
      {/* Cuerpo */}
      <rect x="15.2" y="10" width="1.6" height="12" rx="0.8" fill="#5a4032" />
    </svg>
  )
}

export function MagicalButterflies({
  count = 6,
  className = '',
}: MagicalButterfliesProps) {
  const [butterflies, setButterflies] = useState<
    Array<{
      id: number
      color: string
      size: number
      startX: number
      startY: number
      duration: number
      delay: number
    }>
  >([])

  useEffect(() => {
    setButterflies(
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        color: WING_COLORS[i % WING_COLORS.length],
        size: 20 + Math.random() * 18,
        startX: Math.random() * 100,
        startY: 20 + Math.random() * 60,
        duration: 14 + Math.random() * 12,
        delay: Math.random() * 8,
      })),
    )
  }, [count])

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {butterflies.map((b) => (
        <motion.div
          key={b.id}
          className="absolute"
          style={{ left: `${b.startX}%`, top: `${b.startY}%` }}
          animate={{
            x: [0, 120, -80, 60, 0],
            y: [0, -70, 40, -50, 0],
            rotate: [0, 12, -10, 8, 0],
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        >
          <Butterfly color={b.color} size={b.size} />
        </motion.div>
      ))}
    </div>
  )
}
