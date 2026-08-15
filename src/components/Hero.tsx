import React from 'react'

const Hero: React.FC = () => {
  return (
    <header id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-wedding-dark">
      <div className="absolute inset-0 z-0">
        <img
          alt="Zaraniaina & Sarobidy"
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuARGO1s8NT-eiiL063rl_KFf0cb7meL5DW_7WKHbLbrG05jhouoKBDqbN6C4Dv0YfhoxpxoSKPVGNvYFtHgkdA4VDFg28eU5EigZf2UaajvQCi-1or9DykCm7UBWz-k_W0kMxPE7K29pJDhs3vUjQhjiDdnPqnymcPlOpQFFTAtccWe5_ULku3Le7N0NQhTgi17zw2lwXF1K-rgNCFgyMNLnjmL9hlY1b1cndVA5sntOf4Euxp_FfyM_MuzFWrw78S7P8A"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black/40 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-wedding-bg to-transparent pointer-events-none"></div>
      </div>
    </header>
  )
}

export default Hero
