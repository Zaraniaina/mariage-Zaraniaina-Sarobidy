import React from 'react'

const Lieu: React.FC = () => {
  return (
    <section id="lieu" className="py-16 md:py-20 bg-wedding-bg relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="section-title">Lieu de Réception</h2>
        <div className="heart-separator"><span className="heart-icon">♡</span></div>
        <div className="text-center mb-8 md:mb-10">
          <p className="font-serif text-xl md:text-2xl text-wedding-dark mb-2">Tsik'hotel Tanambao I</p>
          <p className="uppercase tracking-widest text-sm text-gray-600">Toamasina, Madagascar</p>
        </div>
        <div className="gold-border-box p-2 bg-white shadow-lg overflow-hidden">
          <div className="aspect-video w-full">
            <iframe
              allowFullScreen
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3764.345678901234!2d49.4000000!3d-18.1500000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDA5JzAwLjAiUyA0OcKwMjQnMDAuMCJF!5e0!3m2!1sfr!2smg!4v1234567890123"
              style={{ border: 0, filter: 'sepia(20%) contrast(90%) brightness(95%)' }}
              width="100%"
            ></iframe>
          </div>
        </div>
        <div className="mt-6 md:mt-8 text-center">
          <a
            className="btn-outline inline-block"
            href="https://www.google.com/maps/search/?api=1&query=Tsik'hotel+Tanambao+I+Toamasina"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ouvrir dans Google Maps
          </a>
        </div>
      </div>
    </section>
  )
}

export default Lieu
