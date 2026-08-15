import React from 'react'

const NotreHistoire: React.FC = () => {
  return (
    <section id="notre-histoire" className="py-16 md:py-20 relative overflow-hidden bg-white/50">
      <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-center gap-8 md:gap-12">
        <div className="md:w-1/2 text-center flex flex-col items-center">
          <h2 className="section-title">Notre Histoire</h2>
          <div className="heart-separator"><span className="heart-icon">♡</span></div>
          <div className="font-serif leading-loose text-gray-700 max-w-lg mx-auto mb-8 space-y-4 text-sm md:text-base">
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
        <div className="md:w-1/2 flex justify-center relative">
          <div className="circle-img-container w-48 h-48 md:w-64 md:h-64 lg:w-96 lg:h-96">
            <img
              alt="Couple Silhouette"
              className="w-full h-full object-cover rounded-full shadow-lg"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuANRWYrpEvzuKoHO1-4QK93xPylhawc14Zsm0G5GY4HyJXvsXCaD4sQj0o3ARVdiIY4B7u36Buw3HxWUOZxKY2e0TrgNB15iyIFqzdmfsrF7PZTp1ZZGwtYgyQcjXNzBZg3n9Eupfdm9PQRvndWwOK4HfX2iJmpDwIPPfwRC86AtbGBv103VG5L8s57IVTW0ycR3IoJwKBNSun0KcaPxcb9dFNcsY50JRN6cyZNqzlGXMr8uFEn7J0iRYxNqG1toujOy5k"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default NotreHistoire
