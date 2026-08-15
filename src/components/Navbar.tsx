import React, { useState, useEffect } from 'react'

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-wedding-dark/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-4 md:py-6'
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          <a href="#accueil" className="flex flex-col items-center" onClick={handleLinkClick}>
            <div className="font-serif text-2xl md:text-3xl text-wedding-gold normal-case drop-shadow-md">Z<span className="text-base md:text-xl">&amp;</span>S</div>
            <div className="text-wedding-gold text-xs md:text-sm drop-shadow-md">♡</div>
          </a>

          <button
            className="md:hidden relative z-50 w-10 h-10 flex flex-col justify-center items-center gap-1.5 group"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <span
              className={`block w-7 h-0.5 bg-wedding-gold transition-all duration-300 ${
                isOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-7 h-0.5 bg-wedding-gold transition-all duration-300 ${
                isOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-7 h-0.5 bg-wedding-gold transition-all duration-300 ${
                isOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>

          <ul className="hidden md:flex space-x-6 lg:space-x-8 items-center text-xs tracking-widest uppercase text-white">
            <li><a className="hover:text-wedding-gold transition-colors duration-300" href="#notre-histoire">Notre Histoire</a></li>
            <li><a className="hover:text-wedding-gold transition-colors duration-300" href="#le-grand-jour">Le Jour J</a></li>
            <li><a className="hover:text-wedding-gold transition-colors duration-300" href="#programme">Programme</a></li>
            <li><a className="hover:text-wedding-gold transition-colors duration-300" href="#galerie">Galerie</a></li>
            <li>
              <a
                className="border border-wedding-gold text-wedding-gold px-4 py-2 hover:bg-wedding-gold hover:text-white transition-all duration-300"
                href="#rsvp"
              >
                RSVP
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-wedding-dark/98 backdrop-blur-lg transition-all duration-500 md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          <a
            href="#accueil"
            className="text-2xl font-serif text-wedding-gold hover:text-white transition-colors duration-300"
            onClick={handleLinkClick}
          >
            Accueil
          </a>
          <a
            href="#notre-histoire"
            className="text-2xl font-serif text-wedding-gold hover:text-white transition-colors duration-300"
            onClick={handleLinkClick}
          >
            Notre Histoire
          </a>
          <a
            href="#le-grand-jour"
            className="text-2xl font-serif text-wedding-gold hover:text-white transition-colors duration-300"
            onClick={handleLinkClick}
          >
            Le Jour J
          </a>
          <a
            href="#programme"
            className="text-2xl font-serif text-wedding-gold hover:text-white transition-colors duration-300"
            onClick={handleLinkClick}
          >
            Programme
          </a>
          <a
            href="#galerie"
            className="text-2xl font-serif text-wedding-gold hover:text-white transition-colors duration-300"
            onClick={handleLinkClick}
          >
            Galerie
          </a>
          <a
            href="#rsvp"
            className="text-2xl font-serif text-wedding-gold hover:text-white transition-colors duration-300"
            onClick={handleLinkClick}
          >
            Confirmer votre présence
          </a>
        </div>
      </div>
    </>
  )
}

export default Navbar
