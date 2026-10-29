import imageParDefaut from "@assets/images/lieu/entree.jpg";

export const nomDuSite = "Jeannelle";

export const descriptionParDefaut =
  "Jeannelle, centre de thérapeutes au cœur du village de Millas (66) : naturopathie, réflexologie, yin yoga, massage amma, accompagnement psychocorporel.";

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
