'use client'

/**
 * Invitación web interactiva de XV años · Bosque encantado.
 * Ensambla todas las secciones y controla la música compartida.
 */
import { useRef, useState } from 'react'
import { BasicAttendance } from '@/components/invitation/basic-attendance'
import { BasicCountdown } from '@/components/invitation/basic-countdown'
import { BasicCTA } from '@/components/invitation/basic-cta'
import { BasicEventDetails } from '@/components/invitation/basic-event-details'
import { BasicGiftOptions } from '@/components/invitation/basic-gift-options'
import { BasicHero } from '@/components/invitation/basic-hero'
import { DressCode } from '@/components/invitation/dress-code'
import { EnchantedBackground } from '@/components/invitation/enchanted-background'
import { EntryPortal } from '@/components/invitation/entry-portal'
import { Footer } from '@/components/invitation/footer'
import { MusicPlayer } from '@/components/invitation/music-player'
import { PremiumInvitation } from '@/components/invitation/premium-invitation'

export default function Page() {
  const [entered, setEntered] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Al entrar al bosque: revelar contenido + activar música
  function handleEnter() {
    setEntered(true)
    const audio = audioRef.current
    if (audio) {
      audio.volume = 0.5 // Volumen inicial moderado
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false)) // Si no hay archivo, falla en silencio
    }
  }

  function toggleMusic() {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false))
    }
  }

  return (
    <main className="relative min-h-svh">
      <EnchantedBackground />

      {/* Audio de fondo (placeholder /music.mp3) */}
      <audio ref={audioRef} src="/music.mp3" loop preload="none" />

      <EntryPortal visible={!entered} onEnter={handleEnter} />

      {entered && <MusicPlayer isPlaying={isPlaying} onToggle={toggleMusic} />}

      <BasicHero />
      <BasicCountdown />
      <PremiumInvitation />
      <BasicEventDetails />
      <DressCode />
      <BasicAttendance />
      <BasicGiftOptions />
      <BasicCTA />
      <Footer />
    </main>
  )
}
