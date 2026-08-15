import React from 'react'
import ScrollReveal from '../components/ScrollReveal'

const GalerieHorizontale: React.FC = () => {
  return (
    <section id="galerie-horizontal" className="py-16 md:py-24 lg:py-32 bg-wedding-bg relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" delay={100}>
          <h2 className="section-title">Galerie</h2>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={200}>
          <div className="heart-separator"><span className="heart-icon">♡</span></div>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={300}>
          <p className="text-center text-gray-600 mt-8 text-sm md:text-base">Galerie photos à venir...</p>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default GalerieHorizontale
