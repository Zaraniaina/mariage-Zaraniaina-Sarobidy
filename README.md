# Mariage Zaraniaina & Sarobidy - Site web

Site web d'invitation du mariage du 17 octobre 2026 (Toamasina, Madagascar).
Une seule page : présentation du couple, compte à rebours, programme, lieu, galerie,
confirmation de présence par appel ou SMS, avec musique de fond et ambiance visuelle
synchronisée sur la musique.

Ce dépôt ne contient que le frontend (aucun backend) : un unique README suffit ici.
La documentation de référence (structure, architecture, décisions techniques) est dans
[PROJET.md](PROJET.md).

## Stack technique

| Domaine | Technologies |
|---|---|
| Langage | TypeScript 5.6 (strict) |
| Frontend | React 18.3 + react-router-dom 6.26 |
| Build | Vite 6 (base `/mariage-Zaraniaina-Sarobidy/`) |
| Styles | Tailwind CSS 3.4 + PostCSS + Autoprefixer |
| Audio / animations | Web Audio API, canvas 2D, CSS (aucune dépendance externe) |
| Paquets | npm (`package-lock.json`) |
| Déploiement | gh-pages sur GitHub Pages |

## Installation et lancement

```bash
npm install        # dépendances
npm run dev        # serveur de développement (http://localhost:5173/mariage-Zaraniaina-Sarobidy/)
npm run build      # vérification TypeScript + build de production dans dist/
npm run preview    # prévisualisation du build
npm run deploy     # build + publication gh-pages (predeploy exécute le build)
```

Variables d'environnement : aucune nécessaire.

## État actuel du projet

- Livré : page unique complète (préchargeur, navbar + menu mobile, hero vidéo,
  Notre Histoire, compte à rebours, Le Grand Jour, Programme, Lieu, galerie arbre de vie,
  RSVP, footer), apparitions au scroll, animation des alliances, musique de fond
  (Amir - Longtemps) avec démarrage automatique au chargement, bouton de contrôle,
  invite si l'autoplay est bloqué, et ambiance réactive (particules, halos, équaliseur).
- En cours : rien de signalé.
- Prévu : rien de signalé.

## Problèmes à venir / points de vigilance

- Autoplay bloqué par Chrome/Safari : la musique ne peut démarrer qu'après un geste
  utilisateur. Le site affiche alors « Touchez pour lancer la musique » et relance la
  lecture au premier clic/scroll. Ce n'est pas une régression.
- `index.html` précharge encore `audio/Ed-Sheeran-Perfect.mp3`, absent de `public/audio/`
  (seul `Amir-Longtemps.mp3` est présent) : requête 404 et warning navigateur
  (`<link rel=preload> uses an unsupported as value`). À corriger ou à supprimer.
- `tsconfig.tsbuildinfo` est suivi par git alors que c'est un artefact de build.
- `GalerieArbreDeVie` hotlinke une image de `lh3.googleusercontent.com` (ressource tierce).
- Aucun test automatisé, aucun linter/formatter configuré.
- Dossier `resources/` vide ; `dist/`, `node_modules/` et `.stitch/` sont ignorés.

Dernière mise à jour : 25 septembre 2026.
