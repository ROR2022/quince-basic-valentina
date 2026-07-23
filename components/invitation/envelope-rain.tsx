'use client'

/**
 * EnvelopeRain
 * Sobres decorativos que descienden suavemente. Sello en salvia o rosa pastel.
 */
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const SEAL_COLORS = ['#9caf88', '#dfa6b8']

function EnvelopeIcon({ size, sealColor }: { size: number; sealColor: string }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 40 28" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="38" height="26" rx="2" fill="#fff9ed" stroke="#c89b3c" strokeWidth="1" />
      <path d="M1 3 L20 16 L39 3" fill="none" stroke="#c89b3c" strokeWidth="1" />
      <circle cx="20" cy="17" r="3" fill={sealColor} />
    </svg>
  )
}

interface EnvelopeRainProps {
  count?: number
  className?: string
}

export function EnvelopeRain({ count = 10, className = '' }: EnvelopeRainProps) {
  const [envelopes, setEnvelopes] = useState<
    Array<{
      id: number
      left: number
      size: number
      duration: number
      delay: number
      sway: number
      sealColor: string
    }>
  >([])

  useEffect(() => {
    setEnvelopes(
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 22 + Math.random() * 16,
        duration: 8 + Math.random() * 7,
        delay: Math.random() * 8,
        sway: 15 + Math.random() * 25,
        sealColor: SEAL_COLORS[Math.floor(Math.random() * SEAL_COLORS.length)],
      })),
    )
  }, [count])

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {envelopes.map((e) => (
        <motion.div
          key={e.id}
          className="absolute"
          style={{ left: `${e.left}%` }}
          initial={{ top: '-10%', opacity: 0, rotate: -8 }}
          animate={{
            top: ['-10%', '120%'],
            x: [0, e.sway, -e.sway, 0],
            opacity: [0, 0.9, 0.9, 0],
            rotate: [-8, 8, -6, 6],
          }}
          transition={{
            duration: e.duration,
            delay: e.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        >
          <EnvelopeIcon size={e.size} sealColor={e.sealColor} />
        </motion.div>
      ))}
    </div>
  )
}
