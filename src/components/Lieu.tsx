import React from 'react'
import ScrollReveal from '../components/ScrollReveal'

const Lieu: React.FC = () => {
  return (
    <section id="lieu" className="py-16 md:py-24 lg:py-32 bg-wedding-bg relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <ScrollReveal direction="up" delay={100}>
          <h2 className="section-title">Lieu de Réception</h2>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={200}>
          <div className="heart-separator"><span className="heart-icon">♡</span></div>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={300}>
          <div className="text-center mb-8 md:mb-10">
            <p className="font-serif text-xl md:text-2xl text-wedding-dark mb-2">Tsik'hotel Tanambao I</p>
            <p className="uppercase tracking-widest text-sm text-gray-600">Toamasina, Madagascar</p>
          </div>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={400}>
          <div className="gold-border-box p-2 md:p-3 bg-white shadow-lg overflow-hidden">
            <div className="aspect-video w-full">
              <iframe
                allowFullScreen
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=Tsik'hotel+Lot+0170+Parcelle+31/21+Tanambao+1+Boulevard+de+la+Fidelite+Toamasina+Madagascar&output=embed"
                style={{ border: 0, filter: 'sepia(20%) contrast(90%) brightness(95%)' }}
                width="100%"
                title="Carte Tsik'hotel Tanambao 1 Toamasina"
              ></iframe>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={500}>
          <div className="mt-6 md:mt-8 text-center">
            <a
              className="btn-outline inline-block"
              href="https://www.google.com/maps/search/?api=1&query=Tsik'hotel+Lot+0170+Parcelle+31/21+Tanambao+1+Boulevard+de+la+Fidelite+Toamasina+Madagascar"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ouvrir dans Google Maps
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default Lieu
