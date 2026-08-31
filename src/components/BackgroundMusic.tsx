import React, { useEffect } from 'react'
import { basePath } from '../utils/basePath'

const BackgroundMusic: React.FC = () => {
  useEffect(() => {
    const audio = new Audio(basePath('/audio/Ed-Sheeran-Perfect.mp3'))
    audio.loop = true
    audio.volume = 0.3
    audio.preload = 'auto'

    const attemptPlay = async () => {
      try {
        await audio.play()
      } catch {
        // Autoplay may be blocked; retry silently on next interaction
      }
    }

    const play = () => {
      if (audio.paused) {
        attemptPlay()
      }
    }

    attemptPlay()

    window.addEventListener('click', play, { once: true })
    window.addEventListener('touchstart', play, { once: true })
    window.addEventListener('scroll', play, { once: true })

    return () => {
      audio.pause()
      audio.removeAttribute('src')
      audio.load()
      window.removeEventListener('click', play)
      window.removeEventListener('touchstart', play)
      window.removeEventListener('scroll', play)
    }
  }, [])

  return null
}

export default BackgroundMusic
