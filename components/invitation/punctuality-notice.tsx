'use client'

import { Clock3 } from 'lucide-react'
import { SectionReveal } from './section-reveal'

export function PunctualityNotice() {
  return (
    <SectionReveal className="relative px-6 py-12">
      <div className="mx-auto max-w-3xl rounded-2xl border border-rose-vintage/60 bg-rose-blush/35 px-6 py-8 text-center shadow-md backdrop-blur-md sm:px-10">
        <div className="flex items-center justify-center gap-2 text-rose-dark">
          <Clock3 className="h-5 w-5" aria-hidden="true" />
          <h2 className="font-display text-xl uppercase tracking-[0.15em] sm:text-2xl">
            Tu puntualidad es importante
          </h2>
        </div>
        <p className="mx-auto mt-4 max-w-2xl text-pretty font-serif text-lg leading-relaxed text-rose-ink">
          Te esperamos a partir de las 7:00 p. m. El evento dará inicio a las
          8:00 p. m. y concluirá a las 2:00 a. m. Agradecemos mucho tu
          puntualidad y comprensión para ayudarnos a respetar los horarios
          establecidos.
        </p>
      </div>
    </SectionReveal>
  )
}
