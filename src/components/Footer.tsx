import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-wedding-footer text-white py-10 md:py-12 relative overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="font-serif text-3xl text-wedding-gold mb-2">Z<span className="text-xl">&amp;</span>S</div>
        <div className="text-wedding-gold mb-4 text-sm">♡</div>
        <p className="uppercase tracking-widest text-sm mb-2">Zaraniaina &amp; Sarobidy</p>
        <p className="text-xs text-gray-400 tracking-wider">17 OCTOBRE 2026</p>
      </div>
    </footer>
  )
}

export default Footer
