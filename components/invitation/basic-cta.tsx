'use client'

/**
 * BasicCTA
 * Sección comercial (contratación del paquete). Aparece cerca del final.
 * Botones de cotización y WhatsApp usando datos de config.ts.
 */
import { AnimatePresence, motion } from 'framer-motion'
import { Check, MessageCircle, Sparkles, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { invitationConfig } from '@/lib/config'
import { MagicalButterflies } from './magical-butterflies'
import { SectionReveal } from './section-reveal'

const FEATURES = [
  'Invitación personalizada',
  'Diseño responsive',
  'Cuenta regresiva',
  'Información del evento',
  'Confirmación de asistencia',
  'Sección de lluvia de sobres',
  'Música de fondo',
  'Enlaces a Google Maps',
  'Entrega mediante enlace web',
]

export function BasicCTA() {
  const { contact } = invitationConfig
  const waLink = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
    contact.quoteMessage,
  )}`

  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <SectionReveal className="relative px-6 py-20">
      <MagicalButterflies count={3} />
      <div className="mx-auto max-w-md text-center">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-rose-dark/50 bg-rose-petal/90 px-6 py-3 font-display text-sm uppercase tracking-[0.15em] text-rose-ink shadow-md transition-transform hover:scale-105"
        >
          <Sparkles className="h-4 w-4 text-rose-dark" aria-hidden="true" />
          ¿Te gustaría una invitación como esta?
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-70 flex items-center justify-center bg-rose-ink/45 p-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-rose-vintage/70 bg-rose-baby p-8 text-center text-rose-ink shadow-2xl sm:p-12"
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <MagicalButterflies count={3} />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
                className="absolute right-4 top-4 rounded-full p-2 text-rose-bordeaux transition-colors hover:bg-rose-blush/50 hover:text-rose-ink"
              >
                <X className="h-5 w-5" />
              </button>

              <Sparkles className="mx-auto h-7 w-7 text-rose-dark" aria-hidden="true" />
              <h2 className="mt-4 font-display text-2xl uppercase tracking-[0.15em] text-rose-ink sm:text-3xl">
                ¿Te gustaría una invitación como esta?
              </h2>
              <p className="mx-auto mt-4 max-w-md text-pretty font-serif text-lg leading-relaxed text-rose-bordeaux">
                Creamos invitaciones digitales personalizadas para XV años, bodas, baby
                showers y eventos especiales.
              </p>

              <ul className="mx-auto mt-8 grid max-w-lg grid-cols-1 gap-3 text-left sm:grid-cols-2">
                {FEATURES.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-rose-bordeaux">
                    <Check className="h-4 w-4 shrink-0 text-rose-dark" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-rose-dark px-6 py-3 font-display text-sm uppercase tracking-[0.15em] text-cream transition-transform hover:scale-105 hover:bg-rose-bordeaux"
                >
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  Cotizar mi invitación
                </a>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-rose-dark/60 px-6 py-3 font-display text-sm uppercase tracking-[0.15em] text-rose-bordeaux transition-colors hover:bg-rose-blush/30"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Contactar por WhatsApp
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionReveal>
  )
}
