// Textes de la page d'accueil. Repris de l'ancien site ; les ajouts sont marqués [À VALIDER].
import type { NomIcone } from "@components/UI/Icone.astro";

export const presentation = {
  surtitre: "Bienvenue chez Jeannelle",
  titre: "Un centre pour vous accompagner",
  paragraphes: [
    "Jeannelle est un centre de thérapeutes à votre écoute, au cœur du village de Millas.",
    "Un endroit cosy et authentique, entre pierre, brique et bois, où l'on prend le temps : de vous recevoir, de vous écouter, de comprendre ce que le corps et l'esprit cherchent à dire.",
  ],
  // [À VALIDER] les trois piliers, tirés de la page À propos (« le corps, le mental et l'énergie »).
  piliers: [
    {
      icone: "feuille",
      titre: "Le corps",
      texte: "Hygiène de vie, nutrition, réflexologie et massage.",
    },
    {
      icone: "esprit",
      titre: "Le mental",
      texte: "Une écoute sans jugement pour remettre du sens.",
    },
    {
      icone: "yoga",
      titre: "L'énergie",
      texte: "Yin yoga et énergétique chinoise pour retrouver l'équilibre.",
    },
  ] satisfies { icone: NomIcone; titre: string; texte: string }[],
};

export const therapies = {
  surtitre: "Nos thérapies",
  titre: "Prendre soin de son corps, de son esprit et de son énergie",
};

export const equipe = {
  titre: "Nos thérapeutes",
};

export const actualites = {
  surtitre: "Actualités",
  titre: "Rendez-vous, ateliers et rencontres",
};

export const appel = {
  titre: "Envie de prendre rendez-vous ?",
  texte:
    "Un simple appel suffit : nous trouverons ensemble l'accompagnement qui vous convient.",
};
