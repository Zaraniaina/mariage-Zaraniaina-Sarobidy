import React, { useEffect, useRef, useState } from 'react'
import music from '../audio/musicEngine'
import type { MusicState } from '../audio/musicEngine'

const BAR_COUNT = 4

const MusicToggle: React.FC = () => {
  const [state, setState] = useState<MusicState>({ isPlaying: false, isBlocked: false })
  const barRefs = useRef<Array<HTMLSpanElement | null>>([])

  useEffect(() => {
    music.init()
    return music.subscribe(setState)
  }, [])

  // Equaliseur pilote par le signal reel, avec repli sur l'animation CSS
  // tant que le contexte audio n'est pas autorise.
  useEffect(() => {
    if (!state.isPlaying) return
    let rafId = 0
    let live = false

    const tick = () => {
      rafId = requestAnimationFrame(tick)
      const levels = music.getLevels()
      const bars = barRefs.current

      if (!levels.active) {
        if (!live) return
        live = false
        bars.forEach(bar => {
          if (!bar) return
          bar.style.animation = ''
          bar.style.transform = ''
        })
        return
      }

      if (!live) {
        live = true
        bars.forEach(bar => {
          if (bar) bar.style.animation = 'none'
        })
      }

      const values = levels.bands
      bars.forEach((bar, index) => {
        if (!bar) return
        const raw = Math.min(1, Math.max(0, values[index] ?? 0))
        const value = 0.25 + 0.75 * Math.pow(raw, 1.6)
        bar.style.transform = `scaleY(${value.toFixed(3)})`
      })
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [state.isPlaying])

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {state.isBlocked && !state.isPlaying && (
        <p className="music-hint pointer-events-none max-w-[210px] rounded border border-wedding-gold/40 bg-white/90 px-3 py-2 text-right text-[10px] uppercase tracking-widest leading-relaxed text-wedding-dark/80 shadow-md backdrop-blur-md md:text-xs">
          Touchez pour lancer la musique
        </p>
      )}
      <button
        type="button"
        data-music-toggle
        onClick={music.toggle}
        aria-label={state.isPlaying ? 'Couper la musique' : 'Activer la musique'}
        title={state.isPlaying ? 'Couper la musique' : 'Activer la musique'}
        className={`music-toggle w-12 h-12 rounded-full border border-wedding-gold/60 bg-white/80 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wedding-gold ${
          state.isBlocked && !state.isPlaying ? 'animate-pulse-gold' : ''
        }`}
      >
        {state.isPlaying ? (
          <span className="flex items-center justify-center gap-[3px] h-4" aria-hidden="true">
            {Array.from({ length: BAR_COUNT }).map((_, index) => (
              <span
                key={index}
                ref={element => {
                  barRefs.current[index] = element
                }}
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
    </div>
  )
}

export default MusicToggle
