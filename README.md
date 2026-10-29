# Jeannelle

Site vitrine de Jeannelle, centre de thérapeutes à Millas (66).
Astro 7, TypeScript strict, SCSS, contenu en Markdown (content collections), 100 % statique.

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # génère dist/
npm run check    # vérification TypeScript
```

## Modifier le contenu

| Quoi                         | Où                                   |
| ---------------------------- | ------------------------------------ |
| Thérapies                    | `src/content/therapies/*.md`         |
| Actualités                   | `src/content/actualites/*.md`        |
| Praticiennes                 | `src/content/praticiennes/*.md`      |
| À propos, pages légales      | `src/content/pages/*.md`             |
| Adresse, téléphone, horaires | `src/data/coordonnees.ts`            |
| Textes de l'accueil          | `src/data/accueil.ts`                |
| Location des salles          | `src/data/espaces.ts`                |

Le build échoue si un fichier de contenu ne respecte pas son schéma (`src/content.config.ts`).
