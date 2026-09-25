import React, { useEffect, useRef } from 'react'
import music from '../audio/musicEngine'

const GOLD = '197, 160, 89'
const SPRITE_SIZE = 64

interface Particle {
  x: number
  y: number
  radius: number
  speed: number
  phase: number
  alpha: number
  depth: number
}

const createParticle = (width: number, height: number): Particle => ({
  x: Math.random() * width,
  y: Math.random() * height,
  radius: 2 + Math.random() * 5,
  speed: 6 + Math.random() * 14,
  phase: Math.random() * Math.PI * 2,
  alpha: 0.05 + Math.random() * 0.1,
  depth: 0.5 + Math.random() * 0.5,
})

const createSprite = (): HTMLCanvasElement => {
  const sprite = document.createElement('canvas')
  sprite.width = SPRITE_SIZE
  sprite.height = SPRITE_SIZE
  const context = sprite.getContext('2d')
  if (context) {
    const gradient = context.createRadialGradient(
      SPRITE_SIZE / 2,
      SPRITE_SIZE / 2,
      0,
      SPRITE_SIZE / 2,
      SPRITE_SIZE / 2,
      SPRITE_SIZE / 2
    )
    gradient.addColorStop(0, `rgba(${GOLD}, 1)`)
    gradient.addColorStop(0.35, `rgba(${GOLD}, 0.55)`)
    gradient.addColorStop(1, `rgba(${GOLD}, 0)`)
    context.fillStyle = gradient
    context.fillRect(0, 0, SPRITE_SIZE, SPRITE_SIZE)
  }
  return sprite
}

// Voile de particules dorées : derive lente en continu, intensite et battement
// pilotés par la musique (variables publiees par le moteur audio).
const MusicAmbiance: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    music.init()

    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const sprite = createSprite()
    let particles: Particle[] = []
    let width = 0
    let height = 0
    let rafId = 0
    let lastAt = performance.now()

    const resize = () => {
      const ratio = Math.min(2, window.devicePixelRatio || 1)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)

      const count = Math.max(16, Math.min(44, Math.round(width / 34)))
      particles = Array.from({ length: count }, () => createParticle(width, height))
    }

    const draw = (now: number) => {
      rafId = requestAnimationFrame(draw)
      const dt = Math.min(64, Math.max(0, now - lastAt)) / 1000
      lastAt = now

      const levels = music.getLevels()
      const energy = levels.active ? Math.min(1, levels.level * 1.6) : 0
      const beat = levels.beat

      context.clearRect(0, 0, width, height)

      particles.forEach(particle => {
        if (!reducedMotion) {
          particle.y -= particle.speed * dt * (0.6 + 2.2 * energy) * particle.depth
          if (particle.y < -20) {
            particle.y = height + 20
            particle.x = Math.random() * width
          }
        }

        const sway = reducedMotion ? 0 : Math.sin(now * 0.0006 + particle.phase) * 14 * particle.depth
        const alpha = Math.min(
          0.7,
          particle.alpha * (0.5 + 1.8 * energy) + beat * 0.2 * particle.depth
        )
        const radius = particle.radius * (1 + 0.4 * energy + 0.45 * beat * particle.depth) * 3

        context.globalAlpha = alpha
        context.drawImage(sprite, particle.x + sway - radius, particle.y - radius, radius * 2, radius * 2)
      })

      context.globalAlpha = 1
    }

    resize()
    window.addEventListener('resize', resize, { passive: true })
    rafId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-30 pointer-events-none"
    />
  )
}

export default MusicAmbiance
