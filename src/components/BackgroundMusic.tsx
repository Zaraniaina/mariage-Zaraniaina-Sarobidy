import React, { useState, useEffect } from 'react'

const BackgroundMusic: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
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
    const playAudio = async () => {
      try {
        await audio.play()
        setIsPlaying(true)
      } catch {
        setIsPlaying(false)
      }
    }

    if (!hasInteracted) {
      const timer = setTimeout(() => {
        playAudio()
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [audio, hasInteracted])

  const togglePlay = () => {
    setHasInteracted(true)
    setIsPlaying(!isPlaying)
  }

  const handlePlay = async () => {
    setHasInteracted(true)
    try {
      await audio.play()
      setIsPlaying(true)
    } catch {
      setIsPlaying(false)
    }
  }

  return (
    <>
      {!isPlaying && (
        <button
          onClick={handlePlay}
          className="fixed bottom-4 right-4 z-50 px-4 py-2 bg-wedding-gold/90 hover:bg-wedding-gold text-white rounded-full shadow-lg flex items-center gap-2 transition-all duration-300 backdrop-blur-sm text-sm"
          aria-label="Lire la musique de fond"
          title="Lire la musique de fond"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
          <span>Musique</span>
        </button>
      )}

      {isPlaying && (
        <button
          onClick={togglePlay}
          className="fixed bottom-4 right-4 z-50 w-12 h-12 bg-wedding-gold/90 hover:bg-wedding-gold text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
          aria-label="Pause la musique"
          title="Pause la musique"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        </button>
      )}
    </>
  )
}

export default BackgroundMusic
