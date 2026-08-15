import React from 'react'

const GalerieHorizontale: React.FC = () => {
  return (
    <section id="galerie-horizontal" className="py-16 md:py-20 bg-wedding-bg relative">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Galerie</h2>
        <div className="heart-separator"><span className="heart-icon">♡</span></div>
        <p className="text-center text-gray-600 mt-8">Galerie photos à venir...</p>
      </div>
    </section>
  )
}

export default GalerieHorizontale
