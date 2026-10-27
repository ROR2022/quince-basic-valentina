'use client'

/**
 * BasicAttendance
 * Formulario RSVP con validación básica. Al enviar arma un mensaje con los
 * datos y abre WhatsApp (contact.whatsapp en config.ts) para que el invitado
 * lo envíe; luego lanza confeti rosa/lavanda/champagne y
 * muestra mensaje de agradecimiento.
 */
import confetti from 'canvas-confetti'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Sparkles } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import { invitationConfig } from '@/lib/config'
import { MagicalButterflies } from './magical-butterflies'
import { SectionReveal } from './section-reveal'

interface RSVPData {
  name: string
  attending: 'yes' | 'no' | ''
  guests: number
  phone: string
  message: string
  dietary: string
}

interface BasicAttendanceProps {
  companionLimit: number
}

function buildRSVPMessage(data: RSVPData): string {
  const lines = [
    `Confirmación de asistencia - ${invitationConfig.quinceanera.name}`,
    `Nombre: ${data.name}`,
    `Asistencia: ${data.attending === 'yes' ? 'Sí, asistiré' : 'No podré asistir'}`,
  ]
  if (data.attending === 'yes') lines.push(`Acompañantes: ${data.guests}`)
  if (data.phone) lines.push(`Teléfono: ${data.phone}`)
  if (data.dietary) lines.push(`Restricciones alimenticias: ${data.dietary}`)
  if (data.message) lines.push(`Mensaje: ${data.message}`)
  return lines.join('\n')
}

// Abre WhatsApp con el RSVP prellenado. El invitado debe presionar "Enviar" en la app.
function sendRSVPByWhatsApp(data: RSVPData): void {
  const number1 = invitationConfig.confirmationWhatsappNumber;
  const text = encodeURIComponent(buildRSVPMessage(data))
  window.open(`https://wa.me/${number1}?text=${text}`, '_blank')
}

// Confeti rosa y lavanda con un acento champagne discreto.
function launchConfetti() {
  const colors = ['#a84e72', '#e89db5', '#d7c3e8', '#eadaf5', '#d4af7a', '#f8d7e4']
  confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 }, colors })
  setTimeout(
    () => confetti({ particleCount: 60, angle: 60, spread: 55, origin: { x: 0 }, colors }),
    200,
  )
  setTimeout(
    () => confetti({ particleCount: 60, angle: 120, spread: 55, origin: { x: 1 }, colors }),
    400,
  )
}

const inputClass =
  'w-full rounded-xl border border-input bg-cream/80 px-4 py-3 text-rose-ink placeholder:text-grape-gray outline-none backdrop-blur-sm transition-colors focus:border-rose-dark focus:ring-2 focus:ring-rose-dark/20'

export function BasicAttendance({ companionLimit }: BasicAttendanceProps) {
  const { event, quinceanera } = invitationConfig
  const deadline = new Date(event.rsvpDeadline).toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })

  const [form, setForm] = useState<RSVPData>({
    name: '',
    attending: '',
    guests: 0,
    phone: '',
    message: '',
    dietary: '',
  })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')

    // Validación básica
    if (!form.name.trim()) {
      setError('Por favor escribe tu nombre completo.')
      return
    }
    if (!form.attending) {
      setError('Indica si podrás asistir.')
      return
    }
    if (form.attending === 'yes' && form.guests > companionLimit) {
      setError(`Esta invitación permite hasta ${companionLimit} acompañantes.`)
      return
    }

    setSubmitting(true)
    try {
      sendRSVPByWhatsApp(form)
      setDone(true)
      if (form.attending === 'yes') launchConfetti()
    } catch {
      setError('Ocurrió un error. Inténtalo de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <SectionReveal className="relative px-6 py-20">
      <MagicalButterflies count={3} />
      <div className="mx-auto max-w-lg">
        <h2 className="text-center font-display text-2xl uppercase tracking-[0.2em] text-rose-bordeaux sm:text-3xl">
          Confirma tu asistencia
        </h2>
        <p className="mt-3 text-center font-serif text-lg text-rose-brown">
          Fecha límite para confirmar: {deadline}
        </p>

        <div className="relative mt-10 overflow-hidden rounded-2xl border border-rose-vintage/50 bg-rose-baby/80 p-6 shadow-md backdrop-blur-md sm:p-8">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key="thanks"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative flex flex-col items-center py-8 text-center"
              >
                <MagicalButterflies count={4} />
                <CheckCircle2 className="h-14 w-14 text-rose-dark" aria-hidden="true" />
                <p className="mt-4 font-script text-4xl text-rose-dark">
                  ¡Gracias!
                </p>
                <p className="mt-2 font-serif text-lg text-rose-brown">
                  {form.attending === 'yes'
                    ? `Nos encantará celebrar contigo, ${form.name.split(' ')[0]}.`
                    : 'Gracias por avisarnos. Te extrañaremos.'}
                </p>
                <p className="mt-2 text-sm text-rose-bordeaux">
                  Se abrió WhatsApp con tu confirmación: solo falta que la envíes.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-4"
                noValidate
              >
                <div>
                  <label htmlFor="rsvp-name" className="mb-1 block text-sm text-rose-bordeaux">
                    Nombre completo
                  </label>
                  <input
                    id="rsvp-name"
                    type="text"
                    className={inputClass}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Tu nombre"
                  />
                </div>

                <fieldset>
                  <legend className="mb-2 text-sm text-rose-bordeaux">¿Podrás asistir?</legend>
                  <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="¿Podrás asistir?">
                    {[
                      { value: 'yes', label: 'Sí, asistiré' },
                      { value: 'no', label: 'No podré asistir' },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        role="radio"
                        aria-checked={form.attending === opt.value}
                        onClick={() =>
                          setForm({
                            ...form,
                            attending: opt.value as 'yes' | 'no',
                            guests: opt.value === 'yes' ? form.guests : 0,
                          })
                        }
                        className={`rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                          form.attending === opt.value
                            ? 'border-rose-dark bg-rose-blush/50 text-rose-ink'
                            : 'border-input bg-cream/80 text-rose-bordeaux hover:border-rose-dark/60'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {form.attending === 'yes' &&
                  (companionLimit > 0 ? (
                    <div>
                      <label htmlFor="rsvp-guests" className="mb-1 block text-sm text-rose-bordeaux">
                        Número de acompañantes (máximo {companionLimit})
                      </label>
                      <input
                        id="rsvp-guests"
                        type="number"
                        min={0}
                        max={companionLimit}
                        step={1}
                        className={inputClass}
                        value={form.guests}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            guests: Math.min(
                              companionLimit,
                              Math.max(
                                0,
                                Math.trunc(Number(e.target.value) || 0),
                              ),
                            ),
                          })
                        }
                      />
                    </div>
                  ) : (
                    <p className="text-sm text-rose-bordeaux">
                      Esta invitación no incluye pases adicionales.
                    </p>
                  ))}

                <div>
                  <label htmlFor="rsvp-phone" className="mb-1 block text-sm text-rose-bordeaux">
                    Teléfono (opcional)
                  </label>
                  <input
                    id="rsvp-phone"
                    type="tel"
                    className={inputClass}
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="Tu teléfono"
                  />
                </div>

                <div className="hidden">
                  <label htmlFor="rsvp-dietary" className="mb-1 block text-sm text-rose-bordeaux">
                    Restricciones alimenticias (opcional)
                  </label>
                  <input
                    id="rsvp-dietary"
                    type="text"
                    className={inputClass}
                    value={form.dietary}
                    onChange={(e) => setForm({ ...form, dietary: e.target.value })}
                    placeholder="Vegetariano, alergias, etc."
                  />
                </div>

                <div>
                  <label htmlFor="rsvp-message" className="mb-1 block text-sm text-rose-bordeaux">
                    Mensaje para {quinceanera.shortName} (opcional)
                  </label>
                  <textarea
                    id="rsvp-message"
                    rows={3}
                    className={`${inputClass} resize-none`}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Escribe tus buenos deseos"
                  />
                </div>

                {error && (
                  <p className="text-sm text-destructive" role="alert">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-rose-dark px-6 py-3 font-display text-sm uppercase tracking-[0.15em] text-cream transition-transform hover:scale-[1.02] hover:bg-rose-bordeaux disabled:opacity-60"
                >
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  {submitting ? 'Enviando...' : 'Confirmar asistencia'}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SectionReveal>
  )
}
