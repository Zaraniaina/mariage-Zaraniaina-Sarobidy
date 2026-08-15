import React from 'react'
import ScrollReveal from '../components/ScrollReveal'

const NotreHistoire: React.FC = () => {
  return (
    <section id="notre-histoire" className="py-16 md:py-24 lg:py-32 relative overflow-hidden bg-white/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center justify-center gap-10 md:gap-12 lg:gap-16">
        <ScrollReveal direction="left" delay={200}>
          <div className="md:w-1/2 text-center flex flex-col items-center">
            <h2 className="section-title">Notre Histoire</h2>
            <div className="heart-separator"><span className="heart-icon">♡</span></div>
            <div className="font-serif leading-loose text-gray-700 max-w-lg mx-auto mb-8 space-y-4 text-sm md:text-base lg:text-lg">
              <p>
                Deux chemins différents, mais un même destin. C'est sous la douce lumière de la paroisse FJKM Betela Tanambao V que nos regards se sont croisés pour la première fois. Ce qui a commencé par un timide sourire est vite devenu une belle évidence.
              </p>
              <p>
                Au fil de nos échanges et de nos moments partagés au sein de notre communauté, notre amitié s'est muée en une complicité précieuse, puis en un amour profond et sincère.
              </p>
              <p>
                Aujourd'hui, unis par nos valeurs et guidés par notre foi, nous sommes impatients de sceller cet amour pour l'éternité et de commencer ce nouveau chapitre de notre vie ensemble.
              </p>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal direction="right" delay={400}>
          <div className="md:w-1/2 flex justify-center relative">
            <div className="circle-img-container w-64 h-64 sm:w-72 sm:h-72 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem]">
              <img
                alt="Couple Silhouette"
                className="w-full h-full object-cover rounded-full shadow-lg"
                  src="/images/couples.png"
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default NotreHistoire
