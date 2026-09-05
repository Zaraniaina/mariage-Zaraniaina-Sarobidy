import React from 'react'
import ScrollReveal from '../components/ScrollReveal'

interface ProgrammeItemProps {
  icon: React.ReactNode
  title: string
  subtitle: string
  description: string
}

const ProgrammeItem: React.FC<ProgrammeItemProps> = ({ icon, title, subtitle, description }) => {
  return (
    <div className="flex-1 flex flex-col items-center text-center relative z-10 mb-8 md:mb-0">
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-wedding-gold bg-wedding-bg flex items-center justify-center text-wedding-gold mb-4">
        {icon}
      </div>
      <p className="font-serif text-lg mb-1">{title}</p>
      <p className="uppercase tracking-widest text-xs font-semibold mb-2">{subtitle}</p>
      <p className="text-xs text-gray-500 px-4">{description}</p>
    </div>
  )
}

const Programme: React.FC = () => {
  return (
    <section id="programme" className="py-16 md:py-24 lg:py-32 bg-white/40 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <ScrollReveal direction="up" delay={100}>
          <h2 className="section-title">Programme</h2>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={200}>
          <div className="heart-separator"><span className="heart-icon">♡</span></div>
        </ScrollReveal>
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start mt-12 md:mt-16 relative">
          <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-[1px] bg-wedding-gold opacity-50 z-0"></div>

          <ScrollReveal direction="up" delay={300}>
            <ProgrammeItem
              icon={
                <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 21h16M5 21V9m14 12V9M9 21V9m6 12V9M3 9l9-6 9 6H3z" />
                </svg>
              }
              title="Heure à définir"
              subtitle="Mariage Civil"
              description="Commune Urbain de Toamasina"
            />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={400}>
            <ProgrammeItem
              icon={
                <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v4m0 0H9m3 0h3m-3 4l-7 6v6h14v-6l-7-6zm0 0v12M9 21v-4a3 3 0 016 0v4" />
                </svg>
              }
              title="Heure à définir"
              subtitle="Mariage à l'Église"
              description="FJKM BETELA Tanambao V"
            />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={500}>
            <ProgrammeItem
              icon={
                <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15c0-4.418-4.03-8-9-8s-9 3.582-9 8h18zM3 15v4a2 2 0 002 2h14a2 2 0 002-2v-4M12 3v4" />
                </svg>
              }
              title="Heure à définir"
              subtitle="Dîner"
              description="Tsik'Hotel Tanambao I"
            />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={600}>
            <ProgrammeItem
              icon={
                <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3 2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3 2 3 .895 3 2zM9 10l12-3" />
                </svg>
              }
              title="Heure à définir"
              subtitle="Bal"
              description="Tsik'Hotel Tanambao I"
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

export default Programme
