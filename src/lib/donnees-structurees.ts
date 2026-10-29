import { adresse, nom, telephone } from "@data/coordonnees";

export type JsonLd = Record<string, unknown>;

/** Sérialise sans permettre de fermer la balise <script> depuis le contenu. */
export function versJsonLd(donnees: JsonLd): string {
  return JSON.stringify(donnees).replaceAll("<", "\\u003c");
}

/** Fiche « établissement local » : aide Google à afficher Jeannelle dans les recherches à Millas. */
export function etablissementLocal(site: URL, image: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: nom,
    url: site.href,
    image,
    telephone: telephone.lien.replace("tel:", ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: adresse.rue,
      postalCode: adresse.codePostal,
      addressLocality: adresse.ville,
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: adresse.latitude,
      longitude: adresse.longitude,
    },
  };
}
