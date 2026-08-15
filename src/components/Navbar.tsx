import React from 'react'

const Navbar: React.FC = () => {
  return (
    <nav className="absolute top-0 w-full z-50 py-4 md:py-6 px-4 md:px-8 flex justify-center items-center text-xs tracking-widest uppercase text-white drop-shadow-md">
      <ul className="flex flex-wrap md:flex-nowrap space-x-4 md:space-x-8 items-center justify-center gap-y-2">
        <li><a className="hover:text-wedding-gold transition" href="#accueil">Accueil</a></li>
        <li><a className="hover:text-wedding-gold transition" href="#notre-histoire">Notre Histoire</a></li>
        <li><a className="hover:text-wedding-gold transition" href="#le-grand-jour">Le Jour J</a></li>
        <li><a className="hover:text-wedding-gold transition" href="#programme">Programme</a></li>
        <li className="mx-4 md:mx-6 text-center">
          <div className="font-serif text-2xl md:text-3xl text-wedding-gold normal-case drop-shadow-md">Z<span className="text-base md:text-xl">&</span>S</div>
          <div className="text-wedding-gold mt-1 drop-shadow-md">♡</div>
        </li>
        <li><a className="hover:text-wedding-gold transition" href="#galerie">Galerie</a></li>
        <li><a className="hover:text-wedding-gold transition" href="#rsvp">CONFIRMER VOTRE PRÉSENCE</a></li>
      </ul>
    </nav>
  )
}

export default Navbar
