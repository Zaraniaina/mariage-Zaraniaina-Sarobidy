import React, { useEffect, useRef, useState } from 'react'
import { basePath } from '../utils/basePath'

const FALLBACK_SIZE = 180
const SPARK_COUNT = 4
const MOTION_SMOOTHING_MS = 280

const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const quadraticBezier = (start: number, control: number, end: number, t: number) =>
  (1 - t) * (1 - t) * start + 2 * (1 - t) * t * control + t * t * end

type Position = {
  left: number
  top: number
  size: number
}

const FlyingBags: React.FC = () => {
  const imgRef = useRef<HTMLImageElement | null>(null)
  const sparkRefs = useRef<(HTMLSpanElement | null)[]>([])
  const hasArrivedRef = useRef(false)
  const displayedProgressRef = useRef(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!isLoaded) return

    const img = imgRef.current
    if (!img) return

    let rafId = 0
    let lastFrame = performance.now()
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const setSparksOpacity = (value: string) => {
      sparkRefs.current.forEach(spark => {
        if (spark) spark.style.opacity = value
      })
    }

    const getPosition = (id: string): Position | null => {
      const element = document.getElementById(id)
      if (!element) return null

      const rect = element.getBoundingClientRect()
      return {
        left: rect.left + rect.width / 2,
        top: rect.top + rect.height / 2 + window.scrollY,
        size: rect.width || FALLBACK_SIZE,
      }
    }

    const settle = () => {
      const heroImg = document.getElementById('hero-bags') as HTMLImageElement | null
      const target = document.getElementById('alliances-bag') as HTMLElement | null

      if (target) {
        target.replaceChildren()
        const settled = document.createElement('img')
        settled.src = img.src
        settled.alt = 'Alliances'
        settled.className = 'w-full h-full object-cover rounded-full'
        target.appendChild(settled)
      }

      if (heroImg) heroImg.style.display = 'none'
      img.style.opacity = '0'
      setSparksOpacity('0')
    }

    const update = (now: number) => {
      if (hasArrivedRef.current) return

      const heroImg = document.getElementById('hero-bags') as HTMLImageElement | null
      const start = getPosition('hero-bags')
      const end = getPosition('alliances-bag')

      if (!start || !end) {
        rafId = requestAnimationFrame(update)
        return
      }

      const startScroll = Math.max(0, start.top - window.innerHeight / 2)
      const endScroll = Math.max(startScroll + 1, end.top - window.innerHeight / 2)
      const rawProgress = (window.scrollY - startScroll) / (endScroll - startScroll)
      const targetProgress = Math.min(1, Math.max(0, rawProgress))

      if (prefersReducedMotion) {
        img.style.opacity = '0'
        setSparksOpacity('0')
        if (targetProgress === 1) {
          hasArrivedRef.current = true
          settle()
          return
        }
        rafId = requestAnimationFrame(update)
        return
      }

      const elapsed = Math.min(64, now - lastFrame)
      lastFrame = now
      const smoothing = 1 - Math.exp(-elapsed / MOTION_SMOOTHING_MS)
      const difference = targetProgress - displayedProgressRef.current
      displayedProgressRef.current += difference * smoothing
      if (Math.abs(difference) < 0.001) displayedProgressRef.current = targetProgress
      const progress = displayedProgressRef.current

      if (progress === 0) {
        img.style.opacity = '0'
        if (heroImg) heroImg.style.removeProperty('opacity')
        setSparksOpacity('0')
        rafId = requestAnimationFrame(update)
        return
      }

      const sideLane = Math.max(window.innerWidth * 1.2, start.left, end.left)
      const x = quadraticBezier(start.left, sideLane, end.left, progress)
      const documentY = lerp(start.top, end.top, progress)
      const y = documentY - window.scrollY - 36 * Math.sin(Math.PI * progress)
      const size = lerp(start.size, end.size, progress) * (1 - 0.35 * Math.sin(Math.PI * progress))
      const halo = 0.28 * (1 - progress)

      img.style.width = `${size}px`
      img.style.height = `${size}px`
      img.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${lerp(1.08, 1, progress)})`
      img.style.filter = 'brightness(1.08) saturate(1.15)'
      img.style.boxShadow = `0 0 ${halo * 90}px ${halo * 25}px rgba(197, 160, 89, ${halo})`
      img.style.opacity = String(1 - 0.32 * Math.sin(Math.PI * progress))
      if (heroImg) heroImg.style.opacity = '0'

      sparkRefs.current.forEach((spark, index) => {
        if (!spark) return

        const angle = (index / SPARK_COUNT) * Math.PI * 2 + progress * 4
        const radius = 40 * (1 - progress * 0.5)
        spark.style.transform = `translate3d(${x + Math.cos(angle) * radius}px, ${y + Math.sin(angle) * radius}px, 0) translate(-50%, -50%)`
        spark.style.opacity = String(halo)
      })

      if (targetProgress === 1 && progress === 1) {
        hasArrivedRef.current = true
        settle()
        return
      }

      rafId = requestAnimationFrame(update)
    }

    rafId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(rafId)
  }, [isLoaded])

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
        Array.from({ length: SPARK_COUNT }).map((_, index) => (
          <span
            key={index}
            ref={element => { sparkRefs.current[index] = element }}
            className="absolute top-0 left-0 block w-2 h-2 rounded-full bg-wedding-gold will-change-transform"
            style={{ opacity: 0 }}
          />
        ))}
    </div>
  )
}

export default FlyingBags
