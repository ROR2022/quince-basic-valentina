'use client'

/**
 * BasicEventDetails
 * Dos tarjetas: Ceremonia y Recepción, conectadas por una línea de tiempo
 * vertical. Botones para ver ubicación (Google Maps) y agregar al calendario.
 */
import { Bell, CalendarPlus, Church, Clock, MapPin, PartyPopper } from 'lucide-react'
import { invitationConfig } from '@/lib/config'
import { FloatingBlossoms } from './floating-blossoms'
import { SectionReveal } from './section-reveal'

/** Genera un enlace de Google Calendar. */
function calendarUrl(title: string, isoDate: string, location: string) {
  const start = new Date(isoDate)
  const end = new Date(start.getTime() + 3 * 60 * 60 * 1000) // +3h
  const fmt = (d: Date) => d.toISOString().replace(/[-:]|\.\d{3}/g, '')
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${fmt(start)}/${fmt(end)}`,
    location,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

interface EventCardProps {
  icon: React.ReactNode
  label: string
  name: string
  time: string
  address: string
  mapsUrl: string
  calendarHref: string
}

function EventCard({
  icon,
  label,
  name,
  time,
  address,
  mapsUrl,
  calendarHref,
}: EventCardProps) {
  return (
    <div className="w-full rounded-2xl border border-rose-vintage/40 bg-rose-baby/80 p-6 shadow-md backdrop-blur-md sm:p-8">
      <div className="flex items-center gap-3 text-rose-bordeaux">
        {icon}
        <h3 className="font-display text-xl uppercase tracking-[0.15em]">{label}</h3>
      </div>

      <p className="mt-4 font-serif text-xl text-rose-ink">{name}</p>

      <div className="mt-3 flex items-center gap-2 text-sm text-rose-bordeaux">
        <Clock className="h-4 w-4" aria-hidden="true" />
        <span>{time} hrs</span>
      </div>
      <div className="mt-2 flex items-start gap-2 text-sm text-rose-brown">
        <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <span>{address}</span>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-rose-dark px-4 py-2 text-sm font-medium text-cream transition-transform hover:scale-105 hover:bg-rose-bordeaux"
        >
          <MapPin className="h-4 w-4" aria-hidden="true" />
          Ver ubicación
        </a>
        <a
          href={calendarHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-rose-dark/60 px-4 py-2 text-sm font-medium text-rose-dark transition-colors hover:bg-rose-blush/30"
        >
          <CalendarPlus className="h-4 w-4" aria-hidden="true" />
          Agregar al calendario
        </a>
      </div>
    </div>
  )
}

export function BasicEventDetails() {
  const { ceremony, reception, event } = invitationConfig

  return (
    <SectionReveal className="relative px-6 py-20">
      <FloatingBlossoms count={5} />
      <div className="mx-auto max-w-4xl">
        <h2 className="hidden text-center font-display text-2xl uppercase tracking-[0.2em] text-rose-bordeaux sm:text-3xl">
          Ceremonia y recepción
        </h2>

        {/* Línea de tiempo vertical que conecta ambos momentos */}
        <div className="relative mt-12">
          <div
            className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-gold-soft/70 via-rose-vintage/70 to-gold-soft/70 md:block"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-8 md:gap-16">
            <div className="flex items-center gap-6 md:justify-start hidden">
              <div className="w-full md:w-[calc(50%-2rem)]">
                <EventCard
                  icon={<Church className="h-6 w-6" aria-hidden="true" />}
                  label="Ceremonia"
                  name={ceremony.name}
                  time={ceremony.time}
                  address={ceremony.address}
                  mapsUrl={ceremony.mapsUrl}
                  calendarHref={calendarUrl(
                    'Ceremonia religiosa de XV años',
                    event.date,
                    ceremony.address,
                  )}
                />
              </div>
              <div
                className="absolute left-1/2 hidden h-4 w-4 -translate-x-1/2 rounded-full border-2 border-rose-dark bg-rose-petal md:block"
                aria-hidden="true"
              >
                <Bell className="h-3 w-3 text-rose-dark" />
              </div>
            </div>

            <div className="flex items-center gap-6 md:justify-end">
              <div className="w-full md:w-[calc(50%-2rem)]">
                <EventCard
                  icon={<PartyPopper className="h-6 w-6" aria-hidden="true" />}
                  label="Recepción"
                  name={reception.name}
                  time={reception.time}
                  address={reception.address}
                  mapsUrl={reception.mapsUrl}
                  calendarHref={calendarUrl(
                    'Recepción de XV años',
                    event.date.replace(/T.*/, `T${reception.time}:00`),
                    reception.address,
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  )
}
