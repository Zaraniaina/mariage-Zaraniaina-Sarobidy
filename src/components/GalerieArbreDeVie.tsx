import React from 'react'
import ScrollReveal from '../components/ScrollReveal'
import { basePath } from '../utils/basePath'

interface TimelineBranchProps {
  imageSrc: string
  imageAlt: string
  title: string
  subtitle: string
  reverse?: boolean
}

const TimelineBranch: React.FC<TimelineBranchProps> = ({ imageSrc, imageAlt, title, subtitle, reverse }) => {
  return (
    <div className={`flex flex-col md:flex-row${reverse ? '-reverse' : ''} items-center justify-between mb-16 md:mb-20 w-full relative`}>
      <div className="hidden md:block md:w-5/12 text-right md:pr-8">
        <h3 className="font-serif text-xl md:text-2xl text-wedding-dark mb-2">{title}</h3>
        <p className="text-sm text-gray-500 uppercase tracking-widest">{subtitle}</p>
      </div>
      <div className="hidden md:flex md:w-2/12 justify-center relative">
        <div className={`absolute ${reverse ? 'left-1/2' : 'right-1/2'} top-1/2 w-full h-0.5 bg-wedding-gold opacity-50`}></div>
        <div className="w-4 h-4 bg-wedding-bg border-2 border-wedding-gold rounded-full z-10"></div>
      </div>
      <div className={`w-full md:w-5/12 ${reverse ? 'md:pr-8' : 'md:pl-8'} flex justify-center md:justify-start`}>
        <div className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full border-4 border-white shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-500 relative z-10">
          <img alt={imageAlt} className="w-full h-full object-cover" src={imageSrc} />
        </div>
      </div>
      <div className="md:hidden mt-4 text-center">
        <h3 className="font-serif text-xl text-wedding-dark mb-1">{title}</h3>
        <p className="text-sm text-gray-500 uppercase tracking-widest">{subtitle}</p>
      </div>
    </div>
  )
}

const GalerieArbreDeVie: React.FC = () => {
  return (
    <section id="galerie" className="py-16 md:py-24 lg:py-32 relative bg-white/60 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl">
        <ScrollReveal direction="up" delay={100}>
          <h2 className="section-title">Notre Parcours</h2>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={200}>
          <div className="heart-separator"><span className="heart-icon">♡</span></div>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={300}>
          <p className="text-center text-gray-600 mb-12 md:mb-16 italic font-serif max-w-lg mx-auto text-sm md:text-base">
            Comme un arbre majestueux, notre amour a pris racine dans la famille et déploie ses branches vers l'avenir...
          </p>
        </ScrollReveal>
        <div className="relative mt-8 md:mt-12 pb-20 md:pb-24">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1.5 h-full bg-gradient-to-b from-wedding-gold/30 via-wedding-gold to-wedding-gold/80 rounded-full"></div>

          <ScrollReveal direction="left" effect="zoom-blur" delay={400}>
            <TimelineBranch
              imageSrc={basePath('/images/bae.PNG')}
              imageAlt="Galerie 1"
              title="Notre Amour"
              subtitle="Une belle promesse"
            />
          </ScrollReveal>

          <ScrollReveal direction="right" effect="zoom-blur" delay={500}>
            <TimelineBranch
              imageSrc={basePath('/images/nous.PNG')}
              imageAlt="Galerie 2"
              title="Complicité"
              subtitle="Des moments précieux"
              reverse
            />
          </ScrollReveal>

          <ScrollReveal direction="up" effect="zoom-blur" delay={600}>
            <div className="flex flex-col md:flex-row items-center justify-between w-full relative">
              <div className="hidden md:block md:w-5/12 text-right md:pr-8">
                <h3 className="font-serif text-xl md:text-2xl text-wedding-dark mb-2">Nos Racines</h3>
                <p className="text-sm text-gray-500 uppercase tracking-widest">La fondation familiale</p>
              </div>
              <div className="hidden md:flex md:w-2/12 justify-center relative">
                <div className="absolute right-1/2 top-1/2 w-full h-0.5 bg-wedding-gold opacity-50"></div>
                <div className="w-4 h-4 bg-wedding-gold border-4 border-white rounded-full z-10 shadow-sm"></div>
              </div>
              <div className="w-full md:w-5/11 md:pl-8 flex justify-center md:justify-start">
                <div className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full border-4 border-wedding-gold p-1 bg-white shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500 relative z-10">
                  <img
                    alt="Famille"
                    className="w-full h-full object-cover rounded-full"
                    src={basePath('/images/famiiles.jpg')}
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

export default GalerieArbreDeVie
