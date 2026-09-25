# PROJET.md - Documentation de référence

Site web d'invitation de mariage (Zaraniaina & Sarobidy, 17 octobre 2026, Toamasina).
Point d'entrée rapide, installation et commandes : voir [README.md](README.md).

Dernière mise à jour : 25 septembre 2026.

## 1. Structure du projet

```
mariage_2/
├── index.html                  Point d'entrée Vite (titre, favicon, préchargement audio)
├── public/
│   ├── audio/Amir-Longtemps.mp3  Musique de fond
│   ├── images/                   Photos (bae, bags, couples, famiiles, invitations, nous)
│   └── videos/Mariage.mp4        Vidéo du hero
├── src/
│   ├── main.tsx                  Montage React (StrictMode)
│   ├── App.tsx                   Routeur, préchargeur, navbar, musique, ambiance
│   ├── index.css                 Tailwind, keyframes, ambiance musicale
│   ├── pages/Home.tsx            Enchaînement des sections
│   ├── components/               16 composants (tableau ci-dessous)
│   ├── hooks/useScrollReveal.ts  Apparition au scroll (IntersectionObserver)
│   ├── audio/musicEngine.ts      Moteur musique + analyse du signal
│   └── utils/basePath.ts         Préfixe de base (GitHub Pages)
├── tailwind.config.js            Jetons (couleurs or/crème, Playfair Display, Montserrat)
├── postcss.config.js, tsconfig*.json, vite.config.ts
├── AGENT.md                      Règles de comportement de l'agent
├── README.md, PROJET.md          Documentation
└── dist/                         Build de production (ignoré par git)
```

Composants : `Preloader`, `Navbar`, `Hero`, `NotreHistoire`, `Countdown`, `LeGrandJour`,
`Programme`, `Lieu`, `GalerieArbreDeVie`, `RSVP`, `Footer`, `ScrollReveal`, `FlyingBags`,
`MusicToggle`, `MusicAmbiance`.

## 2. Fonctionnalités

### Contenu et sections
- Préchargeur d'accueil (Z&S, date), navbar fixe avec menu mobile plein écran.
- Hero vidéo plein écran, Notre Histoire, compte à rebours en temps réel (17/10/2026),
  Le Grand Jour (mariage civil, église, bal), Programme horaire, Lieu de réception,
  galerie « arbre de vie », RSVP (2 numéros de téléphone + SMS), footer.
- RSVP sans formulaire : les invités appellent ou envoient un SMS.

### Animations
- `ScrollReveal` : apparition au scroll (direction, flou, zoom, délai).
- `FlyingBags` : les alliances volent du hero jusqu'à la section « Le Grand Jour »
  (courbe de Bézier, pilotée par le scroll, suivi lissé).
- Halos dorés, soulignés, survols `hover-lift`, clé `pulse-gold` d'invitation musique.

### Musique et ambiance synchronisée
- Démarrage automatique de la musique dès que la page est chargée ; si le navigateur
  bloque l'autoplay, affichage de l'invite « Touchez pour lancer la musique » puis
  reprise au premier geste (clic, touche, scroll, tactile).
- `musicEngine` analyse le signal (Web Audio, FFT 1024) et publie deux variables CSS
  sur `:root` : `--music-level` (niveau global) et `--music-beat` (battement décroissant).
- Consommateurs : halo du hero, halo des titres de section, battement des cœurs
  des séparateurs, auréole du bouton musique, équaliseur réel du bouton
  (4 bandes : graves, bas-medium, medium, aigus), particules dorées du canvas
  (`MusicAmbiance`, 44 maximum, non cliquables).
- Contrôle : bouton fixe en bas à droite (lecture/pause), fade d'entrée à 35 % du volume,
  boucle infinie.

### Confort et accessibilité
- `aria-label` / `title` sur le bouton musique, `aria-hidden` sur les éléments décoratifs,
  focus visible, état `:active`.
- `prefers-reduced-motion` : déplacement des particules et pulsations désactivés,
  seuls opacité et halo doux sont conservés.
- Responsive mobile (testé à 375 px, pas de débordement horizontal).

## 3. Rôles

Aucun. Site public statique : pas d'authentification, pas de compte, pas de back-office,
pas de stockage de données. Les réponses de présence (RSVP) transitent par téléphone/SMS.

## 4. Architecture générale

- SPA React servie statiquement, aucun backend ni API : le contenu est écrit en dur
  dans les composants.
- Base d'URL `/mariage-Zaraniaina-Sarobidy/` (Vite `base`) ; les assets passent par
  `basePath()` pour rester valides en production GitHub Pages.
- Déploiement : `npm run deploy` (build via `predeploy`, publication `gh-pages -d dist`).

Flux de la musique :

```
musicEngine (singleton)
  └── HTMLAudioElement (boucle, preload, fade 0 -> 0.35)
        ├── tentative de lecture au chargement + repli au premier geste
        └── AudioContext + AnalyserNode (branché seulement si le contexte est "running")
              └── boucle requestAnimationFrame (arrêtée si l'onglet est caché)
                    ├── variables CSS --music-level / --music-beat  -> styles (index.css)
                    ├── niveaux par bande                            -> équaliseur (MusicToggle)
                    └── niveaux + battement                          -> particules (MusicAmbiance)
```

## 5. Décisions techniques importantes

1. **Moteur en singleton plutôt que contexte React** : un élément multimédia ne peut être
   branché qu'une fois à Web Audio, et cela reste correct avec le double montage de
   `React.StrictMode` en développement.
2. **Graphe d'analyse créé seulement quand le contexte est « running »** : si l'autoplay
   est refusé, la musique sort directement par l'élément et n'est jamais coupée ;
   l'analyse se branche au premier geste autorisé.
3. **Variables CSS plutôt qu'état React à 60 images/s** : aucun re-render ; le canvas et
   l'équaliseur lisent les valeurs en continu, le CSS réagit sans JavaScript.
4. **Détection de battement** : moyenne glissante lente des graves, seuil 0.08,
   220 ms minimum entre deux battements, décroissance exponentielle de 240 ms.
5. **Zéro dépendance ajoutée** : Web Audio natif, canvas 2D et CSS suffisent ; aucune
   librairie d'animation ou d'audio.
6. **Dégradé maîtrisé** : sans JavaScript ou sans analyse, la page garde son rendu d'origine
   (valeurs par défaut des variables à 0) et l'équaliseur retombe sur son animation CSS.

## 6. État actuel du projet

- Livré : la page complète, ses animations, la musique de fond et l'ambiance réactive
  (démarrage au chargement, invite si bloqué, équaliseur réel, particules, halos).
- En cours : rien de signalé.
- Prévu : rien de signalé.

## 7. Problèmes à venir / points de vigilance

- Autoplay : Chrome et Safari peuvent refuser le démarrage automatique ; le repli
  (invite + premier geste) est en place et testé, mais il reste invisible sans geste.
- `index.html` précharge `audio/Ed-Sheeran-Perfect.mp3`, fichier absent de `public/audio/`
  (seul `Amir-Longtemps.mp3` existe) : requête 404 et warning de préchargement.
- `tsconfig.tsbuildinfo` versionné alors que c'est un artefact de build.
- Aucun test automatisé ni linter/formatter configuré ; la vérification repose sur
  `npm run build` (TypeScript strict) et des contrôles manuels en navigateur.
- `GalerieArbreDeVie` charge une image depuis un domaine externe
  (`lh3.googleusercontent.com`) : ressource tierce non maîtrisée (expiration, hors ligne).
- L'accessibilité (contrastes, lecteurs d'écran) n'a pas fait l'objet d'un audit formel.
