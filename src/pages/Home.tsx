import React from 'react'
import Hero from '../components/Hero'
import NotreHistoire from '../components/NotreHistoire'
import Countdown from '../components/Countdown'
import LeGrandJour from '../components/LeGrandJour'
import Programme from '../components/Programme'
import Lieu from '../components/Lieu'
import GalerieArbreDeVie from '../components/GalerieArbreDeVie'
import RSVP from '../components/RSVP'
import Footer from '../components/Footer'

const Home: React.FC = () => {
  return (
    <main className="pt-16 md:pt-20">
      <Hero />
      <NotreHistoire />
      <Countdown />
      <LeGrandJour />
      <Programme />
      <Lieu />
      <GalerieArbreDeVie />
      <RSVP />
      <Footer />
    </main>
  )
}

export default Home
