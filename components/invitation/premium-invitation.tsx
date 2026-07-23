'use client'

/**
 * PremiumInvitation
 * Invitación formal tipo carta / pergamino mágico con corona SVG original,
 * bordes de ramas doradas, textura de papel marfil y brillos en las esquinas.
 */
import { motion } from 'framer-motion'
import { invitationConfig } from '@/lib/config'
import { SectionReveal } from './section-reveal'

/** Corona / tiara original en SVG. */
function Tiara() {
  return (
    <svg width="88" height="56" viewBox="0 0 88 56" fill="none" aria-hidden="true">
      <path
        d="M6 46 L14 18 L28 34 L44 10 L60 34 L74 18 L82 46 Z"
        fill="#e8cf8b"
        stroke="#c89b3c"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M6 46 H82" stroke="#c89b3c" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="14" cy="16" r="3.5" fill="#f6c5d5" stroke="#c89b3c" strokeWidth="1" />
      <circle cx="44" cy="8" r="4" fill="#f6c5d5" stroke="#c89b3c" strokeWidth="1" />
      <circle cx="74" cy="16" r="3.5" fill="#f6c5d5" stroke="#c89b3c" strokeWidth="1" />
      <circle cx="28" cy="36" r="2.5" fill="#fff9ed" />
      <circle cx="60" cy="36" r="2.5" fill="#fff9ed" />
    </svg>
  )
}

function CornerFlourish({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 60 60"
      className={`absolute h-14 w-14 text-gold ${className}`}
      aria-hidden="true"
    >
      <path
        d="M2,2 Q30,6 30,30 Q6,30 2,2 Z M2,2 q20,-1 34,10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  )
}

export function PremiumInvitation() {
  const { parents, quinceanera, godparents } = invitationConfig

  return (
    <SectionReveal className="relative px-6 py-20">
      <motion.article
        initial={{ opacity: 0, rotateX: -12, y: 40 }}
        whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-xl overflow-hidden rounded-2xl border-2 border-gold/50 px-8 py-12 text-center sm:px-14"
        style={{
          background:
            'radial-gradient(circle at 50% 0%, #fffdf6 0%, #fff4dc 55%, #f3e4c2 100%)',
          boxShadow: '0 20px 60px -20px rgba(0,0,0,0.5)',
        }}
      >
        {/* Brillos dorados en las esquinas */}
        <CornerFlourish className="left-3 top-3" />
        <CornerFlourish className="right-3 top-3 rotate-90" />
        <CornerFlourish className="bottom-3 left-3 -rotate-90" />
        <CornerFlourish className="bottom-3 right-3 rotate-180" />

        <div className="flex justify-center">
          <Tiara />
        </div>

        {/* Iniciales decorativas */}
        <div className="mt-4 font-script text-5xl text-[#c89b3c]">
          {quinceanera.shortName.charAt(0)}
        </div>

        <p className="mt-6 font-serif text-lg leading-relaxed text-[#4a3a22]">
          Con la bendición de Dios y el amor de:
        </p>
        <h4 className="mt-4 font-script text-3xl text-[#c89b3c]">
          Mis Padres
        </h4>
        <div className="my-5 space-y-1 font-display text-lg uppercase tracking-wider text-[#5a4032]">
          <p>{parents.mother}</p>
          <p className="text-sm text-[#c89b3c]">y</p>
          <p>{parents.father}</p>
        </div>

        <h4 className="mt-4 font-script text-3xl text-[#c89b3c]">
          Mis Padrinos
        </h4>
        <div className="my-5 space-y-1 font-display text-lg uppercase tracking-wider text-[#5a4032]">
          <p>{godparents.godmother}</p>
          <p className="text-sm text-[#c89b3c]">y</p>
          <p>{godparents.godfather}</p>
        </div>

        <p className="mx-auto max-w-md text-pretty font-serif text-lg leading-relaxed text-[#4a3a22]">
          Tengo el honor de invitarte a celebrar conmigo uno de los momentos más
          importantes de mi vida: mis XV años. Tu presencia hará que esta noche
          sea todavía más especial.
        </p>

        <div className="mx-auto mt-8 h-px w-32 bg-[#c89b3c]/50" />
        <p className="mt-4 font-script text-4xl text-[#c89b3c]">
          {quinceanera.name}
        </p>
      </motion.article>
    </SectionReveal>
  )
}
