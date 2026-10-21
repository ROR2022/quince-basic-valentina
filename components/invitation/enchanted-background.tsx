'use client'

/**
 * EnchantedBackground
 * Fondo global fijo en tonos rosa: gradientes, siluetas de árboles,
 * niebla translúcida, luna creciente, estrellas y luciérnagas.
 * Permanece durante el scroll sin afectar la legibilidad.
 */
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FloatingFireflies } from './floating-fireflies'

function TreeLine({ className = '', opacity = 1 }: { className?: string; opacity?: number }) {
  return (
    <svg
      viewBox="0 0 1200 300"
      preserveAspectRatio="none"
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      <path
        d="M0,300 L0,180 Q30,120 50,170 Q70,90 100,160 Q130,70 160,150 L180,300 Z
           M220,300 L230,140 Q260,80 280,150 Q300,60 330,140 Q360,90 380,160 L400,300 Z
           M470,300 L480,160 Q510,100 530,150 Q560,50 590,140 Q620,100 640,170 L660,300 Z
           M720,300 L740,150 Q770,90 790,150 Q820,60 850,140 Q880,100 900,160 L910,300 Z
           M980,300 L990,170 Q1020,100 1050,160 Q1080,70 1110,150 Q1140,110 1160,170 L1200,300 Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function EnchantedBackground() {
  const [stars, setStars] = useState<
    Array<{ id: number; left: number; top: number; size: number; delay: number }>
  >([])

  useEffect(() => {
    setStars(
      Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 55,
        size: 1 + Math.random() * 2,
        delay: Math.random() * 5,
      })),
    )
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Gradiente base crema y rosa pétalo */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, var(--rose-petal) 0%, var(--cream) 48%, var(--rose-baby) 100%)',
        }}
      />

      {/* Velos de luz cálidos y rosados */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(ellipse 60% 45% at 30% 0%, rgba(234,218,245,0.55), transparent 70%)',
        }}
      />

      {/* Acento de rosa pastel, bien visible, en la esquina opuesta */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(ellipse 65% 50% at 80% 15%, rgba(232,157,181,0.38), transparent 72%)',
        }}
      />

      {/* Luna creciente */}
      <div className="absolute right-[12%] top-[8%]">
        <div
          className="h-20 w-20 rounded-full"
          style={{
            boxShadow: '14px 8px 0 0 var(--cream), 0 0 60px 10px rgba(255,248,244,0.4)',
            background: 'transparent',
          }}
        />
      </div>

      {/* Estrellas sutiles */}
      {stars.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full bg-rose-bordeaux"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
          }}
          animate={{ opacity: [0.2, 0.9, 0.2] }}
          transition={{
            duration: 3 + s.delay,
            delay: s.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Niebla rosa animada */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background:
            'linear-gradient(0deg, rgba(214,122,161,0.14), transparent)',
          animation: 'drift 18s ease-in-out infinite',
        }}
      />

      {/* Siluetas de árboles (capas para profundidad) */}
      <TreeLine
        className="absolute inset-x-0 bottom-0 h-[38vh] w-full text-rose-bordeaux"
        opacity={0.1}
      />
      <TreeLine
        className="absolute inset-x-0 bottom-0 h-[28vh] w-full text-rose-dark"
        opacity={0.08}
      />

      {/* Luciérnagas globales */}
      <FloatingFireflies count={14} />

      {/* Viñeta suave para conservar profundidad sin oscurecer el lienzo */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 55%, rgba(214,122,161,0.12) 100%)',
        }}
      />
    </div>
  )
}
