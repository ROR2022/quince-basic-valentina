'use client'

/**
 * BasicAttendance
 * Formulario RSVP con validación básica. Al enviar arma un mensaje con los
 * datos y abre WhatsApp (contact.whatsapp en config.ts) para que el invitado
 * lo envíe; luego lanza confeti dorado/lavanda/verde/marfil (sin rosa) y
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

// Confeti dorado, lavanda, verde, marfil y un acento de rosa pastel.
function launchConfetti() {
  const colors = ['#e8cf8b', '#c89b3c', '#c8b9db', '#9caf88', '#fff9ed', '#f6c5d5']
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
  'w-full rounded-xl border border-input bg-forest/40 px-4 py-3 text-ivory placeholder:text-champagne/40 outline-none backdrop-blur-sm transition-colors focus:border-gold/70'

export function BasicAttendance() {
  const { event, quinceanera } = invitationConfig
  const deadline = new Date(event.rsvpDeadline).toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
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
        <h2 className="text-center font-display text-2xl uppercase tracking-[0.2em] text-quince-rose sm:text-3xl">
          Confirma tu asistencia
        </h2>
        <p className="mt-3 text-center font-serif text-lg text-champagne/90">
          Fecha límite para confirmar: {deadline}
        </p>

        <div className="relative mt-10 overflow-hidden rounded-2xl border border-quince-rose/40 bg-quince-pink/5 p-6 backdrop-blur-md sm:p-8">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key="thanks"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative flex flex-col items-center py-8 text-center"
              >
                <MagicalButterflies count={4} />
                <CheckCircle2 className="h-14 w-14 text-sage" aria-hidden="true" />
                <p className="mt-4 font-script text-4xl text-gold-light">
                  ¡Gracias!
                </p>
                <p className="mt-2 font-serif text-lg text-champagne/90">
                  {form.attending === 'yes'
                    ? `Nos encantará celebrar contigo, ${form.name.split(' ')[0]}.`
                    : 'Gracias por avisarnos. Te extrañaremos.'}
                </p>
                <p className="mt-2 text-sm text-quince-rose">
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
                  <label htmlFor="rsvp-name" className="mb-1 block text-sm text-quince-rose">
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
                  <legend className="mb-2 text-sm text-quince-rose">¿Podrás asistir?</legend>
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
                            ? 'border-gold bg-gold/20 text-gold-light'
                            : 'border-input bg-forest/40 text-champagne/80 hover:border-gold/50'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {form.attending === 'yes' && (
                  <div>
                    <label htmlFor="rsvp-guests" className="mb-1 block text-sm text-quince-rose">
                      Número de acompañantes
                    </label>
                    <input
                      id="rsvp-guests"
                      type="number"
                      min={0}
                      max={10}
                      className={inputClass}
                      value={form.guests}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          guests: Math.min(10, Math.max(0, Number(e.target.value) || 0)),
                        })
                      }
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="rsvp-phone" className="mb-1 block text-sm text-quince-rose">
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

                <div>
                  <label htmlFor="rsvp-dietary" className="mb-1 block text-sm text-quince-rose">
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
                  <label htmlFor="rsvp-message" className="mb-1 block text-sm text-quince-rose">
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
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-quince-rose px-6 py-3 font-display text-sm uppercase tracking-[0.15em] text-forest-deep transition-transform hover:scale-[1.02] disabled:opacity-60"
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
