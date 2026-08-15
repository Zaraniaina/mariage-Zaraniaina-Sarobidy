import React from 'react'

const RSVP: React.FC = () => {
  return (
    <section id="rsvp" className="py-20 md:py-24 bg-wedding-bg relative">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center relative z-10">
        <h2 className="section-title">CONFIRMER VOTRE PRÉSENCE</h2>
        <div className="heart-separator"><span className="heart-icon">♡</span></div>
        <div className="flex items-center justify-center gap-2 mb-8 md:mb-10 text-gray-600">
          <svg className="w-5 h-5 text-wedding-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <p>Veuillez appeler ou envoyer un SMS aux numéros :</p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 md:gap-12 w-full max-w-3xl mb-6 md:mb-8">
          <div className="flex flex-col items-center p-4 md:p-6 bg-white/50 backdrop-blur-md rounded-lg shadow-md border border-wedding-gold/20 flex-1">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-wedding-gold bg-wedding-bg flex items-center justify-center text-wedding-gold mb-3 md:mb-4">
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <p className="font-serif text-base md:text-lg text-wedding-gold">034 xx xxx xx</p>
          </div>
          <div className="flex flex-col items-center p-4 md:p-6 bg-white/50 backdrop-blur-md rounded-lg shadow-md border border-wedding-gold/20 flex-1">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-wedding-gold bg-wedding-bg flex items-center justify-center text-wedding-gold mb-3 md:mb-4">
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <p className="font-serif text-base md:text-lg text-wedding-gold">033 xx xxx xx</p>
          </div>
          <div className="flex flex-col items-center p-4 md:p-6 bg-white/50 backdrop-blur-md rounded-lg shadow-md border border-wedding-gold/20 flex-1">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-wedding-gold bg-wedding-bg flex items-center justify-center text-wedding-gold mb-3 md:mb-4">
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <p className="font-serif text-base md:text-lg text-wedding-gold">032 xx xxx xx</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 uppercase tracking-widest mt-6 md:mt-8">MERCI DE RÉPONDRE AVANT LE 15 SEPTEMBRE 2026</p>
      </div>
    </section>
  )
}

export default RSVP
