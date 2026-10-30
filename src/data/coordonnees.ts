export const nom = "Jeannelle";

export const adresse = {
  rue: "18 rue Lieutenant Basseras",
  codePostal: "66170",
  ville: "Millas",
  // Coordonnées reprises de l'ancienne carte Google intégrée.
  latitude: 42.69303,
  longitude: 2.69733,
};

export const adresseComplete = `${adresse.rue}, ${adresse.codePostal} ${adresse.ville}`;

export const telephone = {
  affiche: "07 60 48 48 06",
  lien: "tel:+33760484806",
};

// [À COMPLÉTER] : adresse e-mail de contact (demandée aussi par les mentions légales).
export const email: string | undefined = undefined;

// [À VALIDER] avec Karine.
export const horaires = "Sur rendez-vous uniquement";

/**
 * Fiche Google Business de Jeannelle, par son identifiant permanent (kgmid) : déclarée dans
 * les données structurées pour que Google relie le site et la fiche.
 */
export const ficheGoogle = "https://www.google.com/search?kgmid=/g/11wqs9lr25";

// [À VALIDER] zone d'où viennent les clients, déclarée à Google (données structurées).
export const zoneDesservie = ["Millas", "Perpignan", "Pyrénées-Orientales"];

const destination = encodeURIComponent(adresseComplete);

/**
 * Lien d'itinéraire (pas de carte Google intégrée, donc aucun cookie tiers sur le site).
 * Un seul lien suffit : il ouvre l'application Google Maps si elle est installée
 * (Android propose de choisir l'application GPS), sinon Google Maps dans le navigateur.
 */
export const itineraire = {
  texte: "Google Maps",
  url: `https://www.google.com/maps/dir/?api=1&destination=${destination}`,
};
