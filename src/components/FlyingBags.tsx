import React, { useCallback, useEffect, useRef, useState } from 'react'
import { basePath } from '../utils/basePath'

const ARC_HEIGHT = 90
const SCALE_START = 1.15
const ROTATE_START = -6
const FALLBACK_SIZE = 180
const HALO_MAX = 0.35
const FLIGHT_MS = 1400
const TRIGGER_RATIO = 0.5
const SPARK_COUNT = 4

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

// Vérifie qu'un élément et tous ses ancêtres sont effectivement visibles
// (les ancêtres en opacité 0 rendent l'élément invisible, ex: ScrollReveal).
const isEffectivelyVisible = (el: HTMLElement): boolean => {
  let node: HTMLElement | null = el
  while (node) {
    const style = window.getComputedStyle(node)
    if (style.display === 'none' || style.visibility === 'hidden') return false
    const opacity = Number.parseFloat(style.opacity || '1')
    if (opacity < 0.05) return false
    node = node.parentElement
  }
  return true
}

type Phase = 'idle' | 'flying' | 'done'

const FlyingBags: React.FC = () => {
  const imgRef = useRef<HTMLImageElement | null>(null)
  const sparkRefs = useRef<(HTMLSpanElement | null)[]>([])
  const reducedRef = useRef(false)
  const phaseRef = useRef<Phase>('idle')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  const getStartRect = useCallback(() => {
    const el = document.getElementById('hero-bags')
    if (!el) return { left: window.innerWidth / 2, top: window.innerHeight * 0.3, size: FALLBACK_SIZE }
    const r = el.getBoundingClientRect()
    return { left: r.left + r.width / 2, top: r.top + r.height / 2, size: r.width }
  }, [])

  const getEndRect = useCallback(() => {
    const target = document.getElementById('alliances-bag')
    if (!target) return null
    const r = target.getBoundingClientRect()
    return { left: r.left + r.width / 2, top: r.top + r.height / 2, size: r.width }
  }, [])

  // Ratio de la position du cercle d'arrivée dans le viewport (top / vh).
  const getTargetTopRatio = useCallback(() => {
    const target = document.getElementById('alliances-bag')
    if (!target) return 2
    return target.getBoundingClientRect().top / window.innerHeight
  }, [])

  useEffect(() => {
    if (!isLoaded) return
    const img = imgRef.current
    if (!img) return

    if (reducedRef.current) {
      img.style.opacity = '0'
      return
    }

    let rafId = 0
    let flightStart = 0

    const setSparks = (value: string) => {
      sparkRefs.current.forEach(spark => {
        if (spark) spark.style.opacity = value
      })
    }

    const settle = () => {
      const heroImg = document.getElementById('hero-bags') as HTMLImageElement | null
      const target = document.getElementById('alliances-bag') as HTMLElement | null
      if (target) {
        const settled = document.createElement('img')
        settled.src = img.src
        settled.alt = 'Alliances'
        settled.className = 'w-full h-full object-cover rounded-full'
        target.appendChild(settled)
      }
      if (heroImg) heroImg.style.display = 'none'
      img.style.opacity = '0'
      setSparks('0')
    }

    const loop = (now: number) => {
      const ratio = getTargetTopRatio()
      const phase = phaseRef.current
      const heroImg = document.getElementById('hero-bags') as HTMLImageElement | null
      const target = document.getElementById('alliances-bag') as HTMLElement | null

      if (phase === 'idle') {
        img.style.opacity = '0'
        setSparks('0')
        if (ratio <= TRIGGER_RATIO && target && isEffectivelyVisible(target)) {
          phaseRef.current = 'flying'
          flightStart = now
        }
        rafId = requestAnimationFrame(loop)
        return
      }

      if (phase === 'flying') {
        const raw = Math.min(1, (now - flightStart) / FLIGHT_MS)
        const t = easeInOutCubic(raw)
        const start = getStartRect()
        const end = getEndRect()
        if (!end) {
          phaseRef.current = 'done'
          settle()
          return
        }
        const x = lerp(start.left, end.left, t)
        const y = lerp(start.top, end.top, t) - ARC_HEIGHT * Math.sin(Math.PI * t)
        const size = lerp(start.size || FALLBACK_SIZE, end.size, t)
        const scale = lerp(SCALE_START, 1, t)
        const rotate = lerp(ROTATE_START, 0, t)
        const halo = HALO_MAX * (1 - t)
        img.style.width = `${size}px`
        img.style.height = `${size}px`
        img.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale}) rotate(${rotate}deg)`
        img.style.filter = 'brightness(1.08) saturate(1.15)'
        img.style.boxShadow = `0 0 ${halo * 90}px ${halo * 25}px rgba(197, 160, 89, ${halo})`
        img.style.opacity = '1'
        if (heroImg) heroImg.style.opacity = String(Math.max(0, 1 - raw * 5))
        sparkRefs.current.forEach((spark, i) => {
          if (!spark) return
          const angle = (i / SPARK_COUNT) * Math.PI * 2 + t * 3 + now / 800
          const radius = 60 * (1 - t * 0.5)
          spark.style.transform = `translate3d(${x + Math.cos(angle) * radius}px, ${y + Math.sin(angle) * radius}px, 0) translate(-50%, -50%) scale(${1 - t})`
          spark.style.opacity = String(halo * (0.4 + 0.6 * Math.abs(Math.sin(now / 220 + i))))
        })
        if (raw >= 1) {
          phaseRef.current = 'done'
          settle()
          return
        }
        rafId = requestAnimationFrame(loop)
        return
      }

      // phase 'done' : terminal, la boucle ne se relance pas.
    }

    rafId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafId)
  }, [isLoaded, getStartRect, getEndRect, getTargetTopRatio])

  return (
    <div aria-hidden="true" className="fixed inset-0 z-20 pointer-events-none">
      <img
        ref={imgRef}
        alt=""
        src={basePath('/images/bags.png')}
        onLoad={() => setIsLoaded(true)}
        className="absolute top-0 left-0 will-change-transform rounded-full object-cover border-4 border-white shadow-2xl"
        style={{ opacity: 0 }}
      />
      {isLoaded &&
        Array.from({ length: SPARK_COUNT }).map((_, i) => (
          <span
            key={i}
            ref={el => { sparkRefs.current[i] = el }}
            className="absolute top-0 left-0 block w-2 h-2 rounded-full bg-wedding-gold will-change-transform"
            style={{ opacity: 0 }}
          />
        ))}
    </div>
  )
}

export default FlyingBags