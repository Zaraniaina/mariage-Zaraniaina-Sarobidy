import React, { useState, useEffect } from 'react'

const BackgroundMusic: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio] = useState(() => new Audio('/audio/Ed-Sheeran-Perfect.mp3'))

  useEffect(() => {
    audio.loop = true
    audio.volume = 0.3

    const handleEnded = () => {
      setIsPlaying(false)
    }

    audio.addEventListener('ended', handleEnded)
    return () => {
      audio.removeEventListener('ended', handleEnded)
      audio.pause()
    }
  }, [audio])

  useEffect(() => {
    const attemptPlay = async () => {
      try {
        await audio.play()
        setIsPlaying(true)
      } catch {
        setIsPlaying(false)
      }
    }

    attemptPlay()

    const handleInteraction = () => {
      if (!isPlaying) {
        attemptPlay()
      }
    }

    window.addEventListener('click', handleInteraction, { once: true })
    window.addEventListener('touchstart', handleInteraction, { once: true })
    window.addEventListener('scroll', handleInteraction, { once: true })

    return () => {
      window.removeEventListener('click', handleInteraction)
      window.removeEventListener('touchstart', handleInteraction)
      window.removeEventListener('scroll', handleInteraction)
    }
  }, [audio, isPlaying])

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
    }
  }

  return (
    <button
      onClick={togglePlay}
      className="fixed bottom-4 right-4 z-50 w-12 h-12 bg-wedding-gold/90 hover:bg-wedding-gold text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
      aria-label={isPlaying ? 'Pause la musique' : 'Lire la musique'}
      title={isPlaying ? 'Pause la musique' : 'Lire la musique'}
    >
      {isPlaying ? (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
        </svg>
      ) : (
        <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </button>
  )
}

export default BackgroundMusic
