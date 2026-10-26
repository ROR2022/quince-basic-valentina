'use client'

/**
 * Invitación web interactiva de XV años.
 * Ensambla las secciones y controla la música compartida.
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
import { PunctualityNotice } from '@/components/invitation/punctuality-notice'

export interface GuestInvitation {
  name: string
  quantity: string
}

interface InvitationExperienceProps {
  guest: GuestInvitation | null
}

export function InvitationExperience({ guest }: InvitationExperienceProps) {
  const [entered, setEntered] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  function handleEnter() {
    setEntered(true)
    const audio = audioRef.current
    if (audio) {
      audio.volume = 0.5
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false))
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

      <audio ref={audioRef} src="/music.mp3" loop preload="none" />

      <EntryPortal
        visible={!entered}
        onEnter={handleEnter}
        guest={guest}
      />

      {entered && <MusicPlayer isPlaying={isPlaying} onToggle={toggleMusic} />}

      <BasicHero />
      <BasicCountdown />
      <PremiumInvitation />
      <BasicEventDetails />
      <PunctualityNotice />
      <DressCode />
      <BasicAttendance />
      <BasicGiftOptions />
      <BasicCTA />
      <Footer />
    </main>
  )
}
