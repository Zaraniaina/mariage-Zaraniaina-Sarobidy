import React, { useState, useEffect } from 'react'

interface TimeLeft {
  jours: number
  heures: number
  minutes: number
  secondes: number
}

const Countdown: React.FC = () => {
  const weddingDate = new Date('2026-10-17T00:00:00')

  const calculateTimeLeft = (): TimeLeft => {
    const difference = +weddingDate - +new Date()
    if (difference <= 0) {
      return { jours: 0, heures: 0, minutes: 0, secondes: 0 }
    }

    return {
      jours: Math.floor(difference / (1000 * 60 * 60 * 24)),
      heures: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      secondes: Math.floor((difference / 1000) % 60),
    }
  }

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="compte-a-rebours" className="py-16 md:py-20 text-center">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Compte à Rebours</h2>
        <div className="heart-separator"><span className="heart-icon">♡</span></div>
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 lg:gap-16 mt-8 md:mt-10">
          <div className="flex flex-col items-center min-w-[80px]">
            <span className="font-serif text-4xl md:text-5xl lg:text-6xl text-wedding-dark mb-2">{timeLeft.jours}</span>
            <span className="text-xs uppercase tracking-widest text-gray-500">Jours</span>
          </div>
          <div className="flex flex-col items-center min-w-[80px]">
            <span className="font-serif text-4xl md:text-5xl lg:text-6xl text-wedding-dark mb-2">{timeLeft.heures}</span>
            <span className="text-xs uppercase tracking-widest text-gray-500">Heures</span>
          </div>
          <div className="flex flex-col items-center min-w-[80px]">
            <span className="font-serif text-4xl md:text-5xl lg:text-6xl text-wedding-dark mb-2">{timeLeft.minutes}</span>
            <span className="text-xs uppercase tracking-widest text-gray-500">Minutes</span>
          </div>
          <div className="flex flex-col items-center min-w-[80px]">
            <span className="font-serif text-4xl md:text-5xl lg:text-6xl text-wedding-dark mb-2">{timeLeft.secondes}</span>
            <span className="text-xs uppercase tracking-widest text-gray-500">Secondes</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Countdown
