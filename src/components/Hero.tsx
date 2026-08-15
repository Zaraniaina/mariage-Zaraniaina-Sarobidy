import React from 'react'
import ScrollReveal from '../components/ScrollReveal'

const Hero: React.FC = () => {
  return (
    <header id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-wedding-dark">
      <div className="absolute inset-0 z-0">
        <img
          alt="Zaraniaina & Sarobidy"
          className="w-full h-full object-cover animate-fade-in"
          style={{ animation: 'fadeIn 1.5s ease-out' }}
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuARGO1s8NT-eiiL063rl_KFf0cb7meL5DW_7WKHbLbrG05jhouoKBDqbN6C4Dv0YfhoxpxoSKPVGNvYFtHgkdA4VDFg28eU5EigZf2UaajvQCi-1or9DykCm7UBWz-k_W0kMxPE7K29pJDhs3vUjQhjiDdnPqnymcPlOpQFFTAtccWe5_ULku3Le7N0NQhTgi17zw2lwXF1K-rgNCFgyMNLnjmL9hlY1b1cndVA5sntOf4Euxp_FfyM_MuzFWrw78S7P8A"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black/40 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-wedding-bg to-transparent pointer-events-none"></div>
      </div>

      <ScrollReveal direction="fade" delay={300}>
        <div className="relative z-10 text-center text-white px-4">
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
