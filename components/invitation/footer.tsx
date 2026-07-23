'use client'

/**
 * Footer
 * Mensaje de agradecimiento, firma, fecha del evento y crédito discreto.
 */
import { Moon } from 'lucide-react'
import { invitationConfig } from '@/lib/config'
import { FloatingBlossoms } from './floating-blossoms'
import { SectionReveal } from './section-reveal'

const MONTHS = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
]

export function Footer() {
  const { quinceanera, event, familyMessage } = invitationConfig
  const d = new Date(event.date)
  const dateLabel = `${d.getDate()} de ${MONTHS[d.getMonth()]} de ${d.getFullYear()}`

  return (
    <SectionReveal as="div" className="relative px-6 pb-16 pt-10 text-center">
      <FloatingBlossoms count={5} />
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4">
        {/* Corona / luna decorativa */}
        <div className="flex items-center gap-2 text-gold-light">
          <span className="h-px w-10 bg-gold/50" />
          <Moon className="h-5 w-5" aria-hidden="true" />
          <span className="h-px w-10 bg-gold/50" />
        </div>

        <p className="font-serif text-lg leading-relaxed text-champagne/90">
          Gracias por ser parte de esta historia encantada.
        </p>

        <p className="font-script text-4xl text-gold-light">
          {quinceanera.name} y familia
        </p>

        <p className="text-sm text-quince-rose">{familyMessage}</p>

        <p className="mt-2 text-xs uppercase tracking-[0.25em] text-champagne/70">
          {dateLabel}
        </p>

        <p className="mt-6 text-[11px] text-sage/70">
          Invitación digital creada con cariño 💝
        </p>
      </div>
    </SectionReveal>
  )
}
