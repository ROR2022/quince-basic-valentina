'use client'

/**
 * BasicGiftOptions
 * Única modalidad de regalo: "Lluvia de sobres".
 * Sin datos bancarios, sin mesa de regalos. Acento de rosa pastel en el sello y los sobres.
 */
import { motion } from 'framer-motion'
import { Heart, Star } from 'lucide-react'
import { invitationConfig } from '@/lib/config'
import { EnvelopeRain } from './envelope-rain'
import { SectionReveal } from './section-reveal'

/** Sobre decorativo original con sello de cera. */
function DecorativeEnvelope() {
  return (
    <div className="relative mx-auto h-40 w-56">
      <svg viewBox="0 0 224 160" className="h-full w-full" aria-hidden="true">
        <rect x="4" y="4" width="216" height="152" rx="8" fill="#fff9ed" stroke="#c89b3c" strokeWidth="2" />
        <path d="M4 12 L112 92 L220 12" fill="none" stroke="#c89b3c" strokeWidth="2" />
        <path d="M4 148 L88 84 M220 148 L136 84" fill="none" stroke="#c89b3c" strokeWidth="1.5" opacity="0.6" />
      </svg>
      {/* Sello de cera con corazón */}
      <div
        className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
        style={{
          background: 'radial-gradient(circle at 35% 30%, #dfa6b8, #b97a8d)',
          boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
        }}
      >
        <Heart className="h-6 w-6 text-ivory" fill="currentColor" aria-hidden="true" />
      </div>
    </div>
  )
}

export function BasicGiftOptions() {
  const { gifts } = invitationConfig

  return (
    <SectionReveal className="relative px-6 py-20">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
          className="relative overflow-hidden rounded-3xl border-2 border-gold/40 bg-forest/50 px-6 py-12 text-center backdrop-blur-md sm:px-10"
        >
          {/* Sobres descendiendo + estrellas doradas */}
          <EnvelopeRain count={9} />
          <Star className="absolute left-6 top-6 h-4 w-4 text-gold-light" fill="currentColor" aria-hidden="true" />
          <Star className="absolute right-8 top-10 h-3 w-3 text-gold" fill="currentColor" aria-hidden="true" />
          <Star className="absolute bottom-8 left-10 h-3 w-3 text-champagne" fill="currentColor" aria-hidden="true" />

          <div className="relative z-10">
            <h2 className="font-display text-2xl uppercase tracking-[0.2em] text-gold-light sm:text-3xl">
              {gifts.title}
            </h2>

            <div className="mt-8">
              <DecorativeEnvelope />
            </div>

            <p className="mx-auto mt-8 max-w-md text-pretty font-serif text-lg leading-relaxed text-champagne/95">
              {gifts.message}
            </p>
            <p className="mx-auto mt-4 max-w-md text-pretty font-serif text-base leading-relaxed text-quince-rose">
              {gifts.instructions}
            </p>
          </div>
        </motion.div>
      </div>
    </SectionReveal>
  )
}
