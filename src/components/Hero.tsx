import React from 'react'
import ScrollReveal from '../components/ScrollReveal'
import { basePath } from '../utils/basePath'

const Hero: React.FC = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null)

  React.useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const attemptPlay = () => {
      video.play().catch(() => {
        video.setAttribute('poster', basePath('/images/invitations.png'))
      })
    }

    video.addEventListener('loadeddata', attemptPlay, { once: true })
    video.addEventListener('error', () => {
      video.setAttribute('poster', basePath('/images/invitations.png'))
    })

    attemptPlay()

    return () => {
      video.removeEventListener('loadeddata', attemptPlay)
      video.removeEventListener('error', () => {})
    }
  }, [])

  return (
    <header id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-wedding-dark">
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={basePath('/images/invitations.png')}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={basePath('/videos/Mariage.mp4')} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black/40 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-wedding-bg to-transparent pointer-events-none"></div>
      </div>

      <ScrollReveal direction="fade" effect="blur" delay={300}>
        <div id="hero-title" className="relative z-10 text-center text-white px-4">
          <img
            id="hero-bags"
            alt=""
            aria-hidden="true"
            src={basePath('/images/bags.png')}
            className="w-36 h-36 md:w-44 md:h-44 rounded-full border-4 border-white object-cover shadow-2xl mx-auto mb-6 md:mb-8"
            style={{
              boxShadow: '0 0 45px 12px rgba(197, 160, 89, 0.35)',
              filter: 'brightness(1.06) saturate(1.1)',
            }}
          />
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-4 text-wedding-gold drop-shadow-lg">
            Zaraniaina & Sarobidy
          </h1>
          <p className="text-lg md:text-xl tracking-widest uppercase mb-2">17 Octobre 2026</p>
          <p className="text-sm md:text-base tracking-wider text-gray-200">Toamasina, Madagascar</p>
        </div>
      </ScrollReveal>
    </header>
  )
}

export default Hero
