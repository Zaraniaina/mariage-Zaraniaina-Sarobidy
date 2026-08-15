import React from 'react'
import ScrollReveal from '../components/ScrollReveal'

const Countdown: React.FC = () => {
  const weddingDate = new Date('2026-10-17T00:00:00')

  const calculateTimeLeft = () => {
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

  const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft())

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="compte-a-rebours" className="py-16 md:py-24 lg:py-32 text-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" delay={100}>
          <h2 className="section-title">Compte à Rebours</h2>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={200}>
          <div className="heart-separator"><span className="heart-icon">♡</span></div>
        </ScrollReveal>
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 lg:gap-16 mt-8 md:mt-10">
          {[
            { value: timeLeft.jours, label: 'Jours' },
            { value: timeLeft.heures, label: 'Heures' },
            { value: timeLeft.minutes, label: 'Minutes' },
            { value: timeLeft.secondes, label: 'Secondes' },
          ].map((item, index) => (
            <ScrollReveal key={item.label} direction="up" delay={300 + index * 100}>
              <div className="flex flex-col items-center min-w-[70px] md:min-w-[100px]">
                <span className="font-serif text-4xl md:text-5xl lg:text-6xl text-wedding-dark mb-2 tabular-nums">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="text-xs uppercase tracking-widest text-gray-500">{item.label}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Countdown
