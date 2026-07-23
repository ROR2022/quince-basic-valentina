'use client'

/**
 * BasicCountdown
 * Cuenta regresiva (días, horas, minutos, segundos) hasta la fecha del evento.
 * Tarjetas glassmorphism con acento de rosa pastel.
 */
import { useEffect, useState } from 'react'
import { invitationConfig } from '@/lib/config'
import { FloatingBlossoms } from './floating-blossoms'
import { SectionReveal } from './section-reveal'

function getRemaining(target: number) {
  const diff = Math.max(0, target - Date.now())
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

const LABELS: Record<string, string> = {
  days: 'Días',
  hours: 'Horas',
  minutes: 'Minutos',
  seconds: 'Segundos',
}

const INITIAL_TIME = { days: 0, hours: 0, minutes: 0, seconds: 0 }

export function BasicCountdown() {
  const target = new Date(invitationConfig.event.date).getTime()
  const [time, setTime] = useState(INITIAL_TIME)

  useEffect(() => {
    setTime(getRemaining(target))
    const id = setInterval(() => setTime(getRemaining(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  return (
    <SectionReveal className="relative px-6 py-20">
      <FloatingBlossoms count={6} />
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-2xl uppercase tracking-[0.2em] text-quince-rose sm:text-3xl">
          Cuenta regresiva
        </h2>
        <p className="mt-3 font-serif text-lg text-champagne/90">
          Falta muy poco para una noche inolvidable
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {(['days', 'hours', 'minutes', 'seconds'] as const).map((unit) => (
            <div
              key={unit}
              className="rounded-2xl border border-quince-rose/40 bg-quince-pink/10 px-4 py-6 backdrop-blur-md"
              style={{ boxShadow: 'inset 0 1px 0 rgba(255,249,237,0.08), 0 0 24px 2px rgba(246,197,213,0.15)' }}
            >
              <div className="font-display text-4xl text-ivory tabular-nums sm:text-5xl">
                {String(time[unit]).padStart(2, '0')}
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.2em] text-quince-rose">
                {LABELS[unit]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionReveal>
  )
}
