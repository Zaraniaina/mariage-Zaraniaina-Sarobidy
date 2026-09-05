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
    <div className={`flex flex-col md:flex-row${reverse ? '-reverse' : ''} items-center justify-between mb-20 w-full relative`}>
      <div className={`hidden md:block md:w-5/12 ${reverse ? 'text-left md:pl-8' : 'text-right md:pr-8'}`}>
        <h3 className="font-serif text-xl md:text-2xl text-wedding-dark mb-2">{title}</h3>
        <p className="text-sm text-gray-500 uppercase tracking-widest">{subtitle}</p>
      </div>
      <div className="hidden md:flex md:w-2/12 justify-center relative">
        <div className={`absolute ${reverse ? 'left-1/2' : 'right-1/2'} top-1/2 w-full h-0.5 bg-wedding-gold opacity-50`}></div>
        <div className="w-4 h-4 bg-wedding-bg border-2 border-wedding-gold rounded-full z-10"></div>
      </div>
      <div className={`w-full md:w-5/12 ${reverse ? 'md:pr-8' : 'md:pl-8'} flex justify-center ${reverse ? 'md:justify-end' : 'md:justify-start'}`}>
        <div className="w-48 h-48 md:w-56 md:h-56 rounded-full border-4 border-white shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-500 relative z-10">
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
      <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
        <img alt="" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAP3KwHDRsgQJ3xX9zTeE6jK80GlYlJf-KgpBbF6-vmg_Dhkgau-EpLzcZLnnk8C9fjWEQvShl7jNbGI5wrES9Ur8kVpFZVhTq8GbobxsgcxIT9iAfaLngT7kRoxj36WpfSx_gyWH6rY9mv7adhwQE6Kd7nNVlFMckeW5rjPGiOltqCcWuOnPXTecgS1pa7g0xTXsqI7VdMYXxXzq2322lM8vt8v-kZ7e748VYppgXVqH2kiHfj52_ODbLLgYDsglgwcLs" />
      </div>
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
        <div className="relative mt-12 pb-24">
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
              <div className="w-full md:w-5/12 md:pl-8 flex justify-center md:justify-start">
                <div className="w-56 h-56 md:w-64 md:h-64 rounded-full border-4 border-wedding-gold p-1 bg-white shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500 relative z-10">
                  <img
                    alt="Famille"
                    className="w-full h-full object-cover rounded-full"
                    src={basePath('/images/famiiles.jpg')}
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Racines de l'arbre - décoration fidèle au design */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-32 h-16 opacity-40" aria-hidden="true">
            <svg className="w-full h-full text-wedding-gold" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={2} viewBox="0 0 100 50">
              <path d="M50 0 C50 20, 20 30, 10 50 M50 0 C50 20, 80 30, 90 50 M50 0 C50 30, 40 40, 30 50 M50 0 C50 30, 60 40, 70 50" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GalerieArbreDeVie
