'use client'

/**
 * EntryPortal
 * Pantalla introductoria en tonos rosa. Al pulsar el botón se abre un portal de ramas,
 * hojas y partículas, y se revela la invitación. También activa la música.
 */
import { AnimatePresence, motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { FloatingFireflies } from './floating-fireflies'

interface EntryPortalProps {
  visible: boolean
  onEnter: () => void
  guest: { name: string; quantity: string } | null
}

export function EntryPortal({ visible, onEnter, guest }: EntryPortalProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center overflow-x-hidden overflow-y-auto px-6 text-center"
          style={{
            background:
              'radial-gradient(ellipse at center, var(--cream) 0%, var(--rose-petal) 60%, var(--rose-baby) 100%)',
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.15 }}
          transition={{ duration: 1 }}
        >
          <FloatingFireflies count={22} />

          {/* Arco de ramas decorativo */}
          <svg
            viewBox="0 0 400 200"
            className="pointer-events-none absolute top-0 h-48 w-full max-w-2xl text-gold-soft/70"
            aria-hidden="true"
          >
            <path
              d="M0,10 Q120,90 200,60 Q280,90 400,10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M60,45 q-10,-18 -26,-22 M120,58 q-8,-20 -24,-26 M200,60 q0,-22 -2,-40 M280,58 q8,-20 24,-26 M340,45 q10,-18 26,-22"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              opacity="0.7"
            />
          </svg>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="relative z-10 my-auto flex flex-col items-center gap-4 py-8 sm:gap-6"
          >
            <Sparkles className="h-8 w-8 text-rose-dark" />
            <p className="max-w-md font-serif text-2xl leading-relaxed text-rose-ink sm:text-3xl">
              Una noche mágica está por comenzar
            </p>

            <motion.button
              type="button"
              onClick={onEnter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="group relative mt-2 overflow-hidden rounded-full border border-rose-dark bg-rose-dark px-8 py-4 font-display text-sm uppercase tracking-[0.2em] text-cream shadow-lg transition-colors hover:bg-rose-bordeaux"
              style={{ boxShadow: '0 0 30px 6px rgba(168,78,114,0.3)' }}
            >
              Entrar a la invitación
            </motion.button>

            {guest && (
              <div className="mt-1 w-full max-w-sm rounded-2xl border border-gold-soft/70 bg-cream/75 px-6 py-5 shadow-[0_12px_35px_rgba(122,60,82,0.14)] backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-bordeaux">
                  Tienes una invitación especial de
                </p>
                <p className="name-shimmer mt-1 font-script text-5xl leading-tight">
                  Valentina
                </p>

                <div className="mx-auto my-3 flex max-w-[14rem] items-center gap-3 text-gold-soft">
                  <span className="h-px flex-1 bg-gold-soft/70" />
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  <span className="h-px flex-1 bg-gold-soft/70" />
                </div>

                <p className="text-xs uppercase tracking-[0.2em] text-rose-brown">
                  Invitado/a
                </p>
                <p className="guest-name mt-1 text-balance font-serif text-2xl font-semibold leading-tight text-rose-ink sm:text-3xl">
                  {guest.name}
                </p>
                <span className="mt-3 inline-flex rounded-full border border-rose-vintage/50 bg-rose-blush/30 px-4 py-1 text-sm font-medium text-rose-bordeaux">
                  {guest.quantity === 'personal'
                    ? 'Pase personal'
                    : `Pase para ${guest.quantity}`}
                </span>
              </div>
            )}

            <p className="mt-2 text-xs text-rose-bordeaux">
              Al entrar se activará la música de fondo
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
