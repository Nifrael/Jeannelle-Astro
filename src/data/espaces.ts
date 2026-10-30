// Location aux thérapeutes. Textes repris de l'ancien site ; ajouts marqués [À VALIDER].
import type { ImageMetadata } from "astro";
import cabinetPierre from "@assets/images/lieu/cabinet-pierre.jpg";
import cabinetClair from "@assets/images/lieu/cabinet-clair.jpg";
import salleFormation from "@assets/images/lieu/salle-formation.jpg";
import salleYoga from "@assets/images/lieu/salle-yoga.jpg";

type Photo = { src: ImageMetadata; alt: string };

export type Espace = {
  id: string;
  titre: string;
  // Une ligne : à quoi sert la salle (carte de l'accueil).
  usage: string;
  texte: string;
  // [À VALIDER] équipements et tarifs à demander à Karine.
  details: string[];
  photos: Photo[];
};

export const introduction = {
  surtitre: "Vous êtes thérapeute ?",
  titre: "Partageons ce lieu",
  texte: [
    "J'ai à cœur de partager ce lieu avec vous.",
    "Soyons nombreux à accueillir celles et ceux qui sont en demande. Soyons nombreux pour échanger et partager. Offrez vos pratiques, vos connaissances, votre sensibilité…",
  ],
};

export const espaces: Espace[] = [
  {
    id: "cabinets",
    titre: "Cabinets de consultation",
    usage: "Consultations individuelles",
    texte:
      "Deux cabinets lumineux, au calme, pour vos consultations individuelles.",
    details: [
      "Location à discuter, ponctuelle, régulière, hebdomadaire, etc...",
      "Salle d'attente partagée",
    ],
    photos: [
      {
        src: cabinetPierre,
        alt: "Cabinet au parquet de chêne et au mur de pierre apparente, éclairé par une fenêtre",
      },
      {
        src: cabinetClair,
        alt: "Cabinet clair et épuré, en enfilade, au sol beige",
      },
    ],
  },
  {
    id: "formation",
    titre: "Salle de formation",
    usage: "Formations, conférences, ateliers",
    texte:
      "Il vous est possible de réserver le local pour vos formations, vos conférences, vos évènements…",
    details: [
      "Mezzanine lumineuse sous suspensions en rotin",
      "Idéale pour les petits groupes",
    ],
    photos: [
      {
        src: salleFormation,
        alt: "Vue plongeante sur la mezzanine, fauteuils, plantes et suspensions en rotin",
      },
    ],
  },
  {
    id: "yoga",
    titre: "Espace yoga et yin-yoga",
    usage: "Cours de yoga et yin-yoga",
    texte:
      "Si vous êtes professeur de yoga, cet espace peut être mis à votre disposition.",
    details: ["Matériel sur place", "Grande salle aux murs de pierre"],
    photos: [
      {
        src: salleYoga,
        alt: "Grande salle de yoga aux murs de pierre, tapis et coussins rouges disposés au sol",
      },
    ],
  },
];
