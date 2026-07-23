'use client'

/**
 * BasicHero
 * Portada a pantalla completa: nombre, "Mis XV años", fotografía enmarcada
 * con ramas y flores, resplandor rosa SOLO alrededor de la quinceañera,
 * fecha y frase configurable. Incluye respiración y parallax ligero.
 */
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'
import { invitationConfig } from '@/lib/config'
import { MagicalButterflies } from './magical-butterflies'

const MONTHS = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
]

function formatLongDate(iso: string) {
  const d = new Date(iso)
  return `${d.getDate()} de ${MONTHS[d.getMonth()]} de ${d.getFullYear()}`
}

export function BasicHero() {
  const { quinceanera, event } = invitationConfig
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  // Parallax ligero de la foto y los textos
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60])

  return (
    <section
      ref={ref}
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 py-20"
    >
      <MagicalButterflies count={5} />

      {/* Encabezado */}
      <motion.div
        style={{ y: textY }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="z-10 flex flex-col items-center text-center"
      >
        <span className="font-display text-sm uppercase tracking-[0.4em] text-champagne">
          Mis XV Años
        </span>
        <div className="my-3 h-px w-24 bg-gold/60" />
      </motion.div>

      {/* Fotografía enmarcada con resplandor rosa exclusivo */}
      <motion.div
        style={{ y: photoY }}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 my-6"
      >
        {/* Marco de ramas */}
        <svg
          viewBox="0 0 320 400"
          className="pointer-events-none absolute -inset-6 z-20 text-gold/70"
          aria-hidden="true"
        >
          <path
            d="M30,40 Q10,20 40,10 M40,10 q30,4 44,26 M290,40 Q310,20 280,10 M280,10 q-30,4 -44,26
               M30,360 Q10,380 40,390 M290,360 Q310,380 280,390"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          />
        </svg>

        {/* Resplandor rosa SOLO alrededor de la quinceañera */}
        <motion.div
          className="relative h-72 w-56 overflow-hidden rounded-[45%_45%_45%_45%/40%_40%_60%_60%] border-2 border-quince-pink/70 quince-glow sm:h-96 sm:w-72"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
        >
          <Image
            src={quinceanera.photo || '/placeholder.svg'}
            alt={`Fotografía de ${quinceanera.name}`}
            fill
            priority
            sizes="(max-width: 640px) 224px, 288px"
            className="object-cover"
          />
        </motion.div>
      </motion.div>

      {/* Nombre de la quinceañera (script con brillo rosa/dorado) */}
      <motion.div
        style={{ y: textY }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="z-10 flex flex-col items-center text-center"
      >
        <h1 className="name-shimmer font-script text-6xl leading-none sm:text-8xl">
          {quinceanera.name}
        </h1>

        <p className="mt-6 max-w-lg text-pretty font-serif text-lg leading-relaxed text-champagne/90 sm:text-xl">
          {quinceanera.phrase}
        </p>

        <div className="mt-8 flex items-center gap-3 text-gold-light">
          <span className="h-px w-8 bg-gold/50" />
          <span className="font-display text-sm uppercase tracking-[0.25em]">
            {formatLongDate(event.date)}
          </span>
          <span className="h-px w-8 bg-gold/50" />
        </div>
      </motion.div>
    </section>
  )
}
