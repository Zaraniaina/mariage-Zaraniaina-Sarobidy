import React, { useEffect, useState } from 'react'

const MIN_DISPLAY_MS = 900
const MAX_WAIT_MS = 6000
const FADE_OUT_MS = 700

const Preloader: React.FC = () => {
  const [isFading, setIsFading] = useState(false)
  const [isRemoved, setIsRemoved] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const startedAt = Date.now()
    let revealed = false
    let revealTimer: number | undefined
    let removeTimer: number | undefined
    let maxWaitTimer: number | undefined

    const reveal = () => {
      if (revealed) return
      revealed = true
      const remaining = Math.max(0, MIN_DISPLAY_MS - (Date.now() - startedAt))
      revealTimer = window.setTimeout(() => {
        setIsFading(true)
        document.body.style.overflow = ''
        removeTimer = window.setTimeout(() => setIsRemoved(true), FADE_OUT_MS)
      }, remaining)
    }

    const onPageLoaded = () => {
      if (maxWaitTimer) window.clearTimeout(maxWaitTimer)
      reveal()
    }

    if (document.readyState === 'complete') {
      onPageLoaded()
    } else {
      window.addEventListener('load', onPageLoaded, { once: true })
      maxWaitTimer = window.setTimeout(onPageLoaded, MAX_WAIT_MS)
    }

    return () => {
      if (maxWaitTimer) window.clearTimeout(maxWaitTimer)
      if (revealTimer) window.clearTimeout(revealTimer)
      if (removeTimer) window.clearTimeout(removeTimer)
      window.removeEventListener('load', onPageLoaded)
      document.body.style.overflow = ''
    }
  }, [])

  if (isRemoved) return null

  return (
    <div className={`preloader ${isFading ? 'preloader--hidden' : ''}`} aria-hidden="true">
      <div className="font-serif text-4xl md:text-5xl text-wedding-gold mb-1">
        Z<span className="text-2xl md:text-3xl">&amp;</span>S
      </div>
      <div className="text-wedding-gold mb-8">♡</div>
      <div className="preloader-ring"></div>
      <p className="uppercase tracking-[0.3em] text-[10px] md:text-xs text-wedding-dark/60 mt-8">
        17 Octobre 2026
      </p>
    </div>
  )
}

export default Preloader
