import React, { useCallback, useEffect, useRef, useState } from 'react'
import { basePath } from '../utils/basePath'

const TARGET_VOLUME = 0.35
const FADE_STEP = 0.01
const FADE_INTERVAL_MS = 50

const MusicToggle: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const fadeIntervalRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isBlocked, setIsBlocked] = useState(false)

  const stopFade = useCallback(() => {
    if (fadeIntervalRef.current !== null) {
      window.clearInterval(fadeIntervalRef.current)
      fadeIntervalRef.current = null
    }
  }, [])

  const fadeIn = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    stopFade()
    fadeIntervalRef.current = window.setInterval(() => {
      if (audio.volume < TARGET_VOLUME) {
        audio.volume = Math.min(TARGET_VOLUME, audio.volume + FADE_STEP)
      } else {
        stopFade()
      }
    }, FADE_INTERVAL_MS)
  }, [stopFade])

  const attemptPlay = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return false
    try {
      await audio.play()
      setIsBlocked(false)
      fadeIn()
      return true
    } catch {
      setIsBlocked(true)
      return false
    }
  }, [fadeIn])

  useEffect(() => {
    const audio = new Audio(basePath('/audio/Ed-Sheeran-Perfect.mp3'))
    audio.loop = true
    audio.preload = 'auto'
    audio.volume = 0
    audioRef.current = audio

    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)

    // Démarrage à la première intention de scroll ou interaction de l'utilisateur.
    // Sur mobile, touchend (fin du geste de scroll) compte comme une interaction valide.
    // Sur desktop, wheel ne compte pas pour l'autoplay : le repli pointerdown/keydown (clic) prend le relais.
    const startEvents: (keyof WindowEventMap)[] = [
      'scroll',
      'wheel',
      'touchmove',
      'touchend',
      'pointerdown',
      'keydown',
    ]

    const handleStart = () => {
      void attemptPlay().then(success => {
        if (success) {
          startEvents.forEach(event => window.removeEventListener(event, handleStart))
        }
      })
    }

    startEvents.forEach(event => window.addEventListener(event, handleStart, { passive: true }))

    return () => {
      startEvents.forEach(event => window.removeEventListener(event, handleStart))
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      stopFade()
      audio.pause()
      audio.removeAttribute('src')
      audio.load()
      audioRef.current = null
    }
  }, [attemptPlay, stopFade])

  const handleToggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      void attemptPlay()
    } else {
      stopFade()
      audio.pause()
    }
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isPlaying ? 'Couper la musique' : 'Activer la musique'}
      title={isPlaying ? 'Couper la musique' : 'Activer la musique'}
      className={`fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full border border-wedding-gold/60 bg-white/80 backdrop-blur-md shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl ${
        isBlocked && !isPlaying ? 'animate-pulse-gold' : ''
      }`}
    >
      {isPlaying ? (
        <span className="flex items-center justify-center gap-[3px] h-4" aria-hidden="true">
          {[0, 1, 2, 3].map(index => (
            <span
              key={index}
              className="eq-bar block w-[3px] h-full bg-wedding-gold rounded-full"
              style={{ animationDelay: `${index * 0.18}s` }}
            />
          ))}
        </span>
      ) : (
        <svg
          className="w-5 h-5 text-wedding-gold"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 18V5l12-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zm12-2a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      )}
    </button>
  )
}

export default MusicToggle
