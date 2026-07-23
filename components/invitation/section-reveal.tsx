'use client'

/**
 * SectionReveal
 * Envuelve cualquier sección para animarla con fade + slide-up
 * cuando entra en el viewport (scroll reveal).
 */
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface SectionRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'section' | 'div' | 'article'
}

export function SectionReveal({
  children,
  className,
  delay = 0,
  as = 'section',
}: SectionRevealProps) {
  const MotionTag = motion[as]
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}
