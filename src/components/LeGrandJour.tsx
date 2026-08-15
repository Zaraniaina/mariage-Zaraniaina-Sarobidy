import React from 'react'
import ScrollReveal from '../components/ScrollReveal'

const LeGrandJour: React.FC = () => {
  return (
    <section id="le-grand-jour" className="py-16 md:py-24 lg:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <ScrollReveal direction="up" delay={100}>
          <h2 className="section-title">Le Grand Jour</h2>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={200}>
          <div className="heart-separator"><span className="heart-icon">♡</span></div>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={300}>
          <div className="gold-border-box mt-8 relative flex flex-col md:flex-row justify-between items-center text-center gap-6 md:gap-4 bg-white/30 backdrop-blur-sm">
            <div className="hidden md:block absolute left-[15%] right-[15%] top-1/2 h-[1px] bg-wedding-gold z-0 transform -translate-y-1/2 opacity-70"></div>
            <div className="flex-1 relative z-10 md:bg-transparent px-4 py-2">
              <div className="text-wedding-gold mb-3 flex justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="uppercase tracking-widest text-sm font-medium bg-wedding-bg/80 md:bg-transparent inline-block px-2">17 Octobre 2026</p>
            </div>
            <div className="flex-none relative z-10 flex justify-center items-center w-28 h-28 md:w-36 md:h-36 bg-white rounded-full p-1 shadow-md border border-wedding-gold/50">
              <img
                alt="Alliances"
                className="w-full h-full object-cover rounded-full"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuARGO1s8NT-eiiL063rl_KFf0cb7meL5DW_7WKHbLbrG05jhouoKBDqbN6C4Dv0YfhoxpxoSKPVGNvYFtHgkdA4VDFg28eU5EigZf2UaajvQCi-1or9DykCm7UBWz-k_W0kMxPE7K29pJDhs3vUjQhjiDdnPqnymcPlOpQFFTAtccWe5_ULku3Le7N0NQhTgi17zw2lwXF1K-rgNCFgyMNLnjmL9hlY1b1cndVA5sntOf4Euxp_FfyM_MuzFWrw78S7P8A"
              />
            </div>
            <div className="flex-1 relative z-10 md:bg-transparent px-4 py-2">
              <div className="text-wedding-gold mb-3 flex justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="uppercase tracking-widest text-sm font-medium bg-wedding-bg/80 md:bg-transparent inline-block px-2">Tsik'hotel Tanambao I,<br />Toamasina</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default LeGrandJour
