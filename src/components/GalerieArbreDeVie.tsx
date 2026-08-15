import React from 'react'
import ScrollReveal from '../components/ScrollReveal'

interface TimelineBranchProps {
  imageSrc: string
  imageAlt: string
  title: string
  subtitle: string
  reverse?: boolean
}

const TimelineBranch: React.FC<TimelineBranchProps> = ({ imageSrc, imageAlt, title, subtitle, reverse }) => {
  return (
    <div className={`flex flex-col md:flex-row${reverse ? '-reverse' : ''} items-center justify-between mb-16 md:mb-20 w-full relative`}>
      <div className="hidden md:block md:w-5/12 text-right md:pr-8">
        <h3 className="font-serif text-xl md:text-2xl text-wedding-dark mb-2">{title}</h3>
        <p className="text-sm text-gray-500 uppercase tracking-widest">{subtitle}</p>
      </div>
      <div className="hidden md:flex md:w-2/12 justify-center relative">
        <div className={`absolute ${reverse ? 'left-1/2' : 'right-1/2'} top-1/2 w-full h-0.5 bg-wedding-gold opacity-50`}></div>
        <div className="w-4 h-4 bg-wedding-bg border-2 border-wedding-gold rounded-full z-10"></div>
      </div>
      <div className={`w-full md:w-5/12 ${reverse ? 'md:pr-8' : 'md:pl-8'} flex justify-center md:justify-start`}>
        <div className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full border-4 border-white shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-500 relative z-10">
          <img alt={imageAlt} className="w-full h-full object-cover" src={imageSrc} />
        </div>
      </div>
      <div className="md:hidden mt-4 text-center">
        <h3 className="font-serif text-xl text-wedding-dark mb-1">{title}</h3>
        <p className="text-sm text-gray-500 uppercase tracking-widest">{subtitle}</p>
      </div>
    </div>
  )
}

const GalerieArbreDeVie: React.FC = () => {
  return (
    <section id="galerie" className="py-16 md:py-24 lg:py-32 relative bg-white/60 overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <img
          alt="Floral decor"
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAP3KwHDRsgQJ3xX9zTeE6jK80GlYlJf-KgpBbF6-vmg_Dhkgau-EpLzcZLnnk8C9fjWEQvShl7jNbGI5wrES9Ur8kVpFZVhTq8GbobxsgcxIT9iAfaLngT7kRoxj36WpfSx_gyWH6rY9mv7adhwQE6Kd7nNVlFMckeW5rjPGiOltqCcWuOnPXTecgS1pa7g0xTXsqI7VdMYXxXzq2322lM8vt8v-kZ7e748VYppgXVqH2kiHfj52_ODbLLgYDsglgwcLs"
        />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl">
        <ScrollReveal direction="up" delay={100}>
          <h2 className="section-title">Notre Parcours</h2>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={200}>
          <div className="heart-separator"><span className="heart-icon">♡</span></div>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={300}>
          <p className="text-center text-gray-600 mb-12 md:mb-16 italic font-serif max-w-lg mx-auto text-sm md:text-base">
            Comme un arbre majestueux, notre amour a pris racine dans la famille et déploie ses branches vers l'avenir...
          </p>
        </ScrollReveal>
        <div className="relative mt-8 md:mt-12 pb-20 md:pb-24">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1.5 h-full bg-gradient-to-b from-wedding-gold/30 via-wedding-gold to-wedding-gold/80 rounded-full"></div>

          <ScrollReveal direction="left" delay={400}>
            <TimelineBranch
              imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBY09GtSz3VCRpSc-1UDFrOJS6BIwa46JhmBdC4jGIlpjNdl-c3WP6E2S-uTEwEpQykdpE2fe4F85Mv_wns9tHwZgNRHWY6iPrxEDPXS92fkh2ShZk6nAPbIwj4RbT-7JlQTz8s5gMz8BazbxsAB9cI-2a0lvyml5W2sAMnbXwCU9y3NF0KXh257xmORfqyTGWx8jyyIul0LH-Cf9TuQbFc8DZnE-eH2EnNbNkZrPgvBkJDImunkFVZWgU0ZknoUTB67gM"
              imageAlt="Galerie 1"
              title="Notre Amour"
              subtitle="Une belle promesse"
            />
          </ScrollReveal>

          <ScrollReveal direction="right" delay={500}>
            <TimelineBranch
              imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuArOpCcI23jAbuOPVl85DPmHaz_VfHqEmHNgbIEJ79LYMgKULHSvRnaRoQd2YlO-Y9INZQRIa26rCRvca_x5LCu7RkH95TAQySgJuCB7WdpvI3xfbRmI-9fsgLIhaU3LpcFViZsdpViQDiX_B07yHelw1OokUtz5CUWSi1H9Pa602dVzmY81JgPvwAXDWFn01BS_S2wDT8lKYGDwe-rSLqiG6m3k4YJjyIP8RoNJenuhYvw_qGTq-V8dq-5oBKk5IkbnDg"
              imageAlt="Galerie 2"
              title="Complicité"
              subtitle="Des moments précieux"
              reverse
            />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={600}>
            <div className="flex flex-col md:flex-row items-center justify-between w-full relative">
              <div className="hidden md:block md:w-5/12 text-right md:pr-8">
                <h3 className="font-serif text-xl md:text-2xl text-wedding-dark mb-2">Nos Racines</h3>
                <p className="text-sm text-gray-500 uppercase tracking-widest">La fondation familiale</p>
              </div>
              <div className="hidden md:flex md:w-2/12 justify-center relative">
                <div className="absolute right-1/2 top-1/2 w-full h-0.5 bg-wedding-gold opacity-50"></div>
                <div className="w-4 h-4 bg-wedding-gold border-4 border-white rounded-full z-10 shadow-sm"></div>
              </div>
              <div className="w-full md:w-5/12 md:pl-8 flex justify-center md:justify-start">
                <div className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full border-4 border-wedding-gold p-1 bg-white shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500 relative z-10">
                  <img
                    alt="Famille"
                    className="w-full h-full object-cover rounded-full"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXHAWdWWP03a8pAx0UNQX_iIUii6_TYnnD8ITMfERV0lhnTKn8LRdlm0aKnUS0bZfcsxTaROLvFHOdAnYoOZIV4uFBVdpJZoqqy8MCVDock5xq52iwNgTvRzMOoKEXNkxdKrUbGKPtcDOsRMz3YbBQFWO9VZfTd9Yc5jaRGh1Ct6s4OhiP55-V_23GbQClmTnZBpd5U8hGOCvvbdGJp6EhsTfnmvY7Nf1tUVQf6urkve5FfMFplwLSZWZtBoV-4tQqcwQ"
                  />
                </div>
              </div>
              <div className="md:hidden mt-4 text-center">
                <h3 className="font-serif text-xl text-wedding-dark mb-1">Nos Racines</h3>
                <p className="text-sm text-gray-500 uppercase tracking-widest">La fondation familiale</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

export default GalerieArbreDeVie
