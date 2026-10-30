import imageParDefaut from "@assets/images/lieu/entree.jpg";

export const nomDuSite = "Jeannelle";

// [À VALIDER] titre de l'accueil dans Google (suivi de « · Jeannelle »).
export const titreAccueil = "Centre de thérapeutes à Millas, près de Perpignan";

export const descriptionParDefaut =
  "Jeannelle, centre de thérapeutes à Millas (66), près de Perpignan : naturopathie, réflexologie plantaire, yin yoga, massage amma, psychopraticienne.";

/** Image de partage quand la page n'a pas la sienne. */
export const partageParDefaut = {
  src: imageParDefaut,
  alt: "Entrée voûtée en pierre et brique du centre Jeannelle à Millas",
};

/** Format des images de partage (ratio 1,91:1 attendu par les réseaux). JPEG : WhatsApp et Facebook lisent mal le WebP. */
export const formatPartage = {
  width: 1200,
  height: 630,
  fit: "cover",
  format: "jpg",
} as const;

/** Crédit de réalisation, en bas du pied de page. */
export const realisation = "Julien Marchand — Nifradev";
