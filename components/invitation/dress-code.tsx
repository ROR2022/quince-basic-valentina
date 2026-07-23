'use client'

/**
 * DressCode
 * Código de vestimenta + paleta sugerida para invitados (sin rosa).
 * Muestra de forma destacada que el rosa está reservado a la quinceañera.
 */
import { Sparkles } from 'lucide-react'
import { guestColorPalette, invitationConfig } from '@/lib/config'
import { SectionReveal } from './section-reveal'

export function DressCode() {
  const { event } = invitationConfig

  return (
    <SectionReveal className="relative px-6 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-2xl uppercase tracking-[0.2em] text-gold-light sm:text-3xl">
          Código de vestimenta
        </h2>
        <p className="mt-4 font-serif text-2xl text-ivory">
          {event.dressCode}
        </p>

        {/* Aviso destacado: rosa reservado a la quinceañera */}
        <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-quince-pink/50 bg-quince-pink/10 px-6 py-5">
          <div className="flex items-center justify-center gap-2 text-quince-pink">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]">
              Nota importante
            </span>
          </div>
          <p className="mt-3 text-pretty font-serif text-lg leading-relaxed text-quince-glow">
            {event.reservedColorMessage}
          </p>
        </div>

        {/* Paleta sugerida para invitados */}
        <p className="mt-12 text-sm uppercase tracking-[0.2em] text-lavender">
          Colores sugeridos para invitados
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          {guestColorPalette.map((color) => (
            <div key={color.name} className="flex w-20 flex-col items-center gap-2">
              <span
                className="h-12 w-12 rounded-full border border-ivory/20 shadow-lg"
                style={{ backgroundColor: color.hex }}
                aria-hidden="true"
              />
              <span className="text-center text-[11px] leading-tight text-champagne/80">
                {color.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SectionReveal>
  )
}
