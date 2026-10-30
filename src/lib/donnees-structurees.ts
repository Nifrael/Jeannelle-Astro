import { getImage } from "astro:assets";
import type { CollectionEntry } from "astro:content";
import {
  adresse,
  ficheGoogle,
  nom,
  telephone,
  zoneDesservie,
} from "@data/coordonnees";
import { formatPartage } from "@data/seo";
import { dateIso } from "@lib/date";

// Données structurées (schema.org, JSON-LD) : ce que Google lit pour comprendre la page
// et enrichir son résultat (fiche établissement, tarifs, dates d'événement, fil de navigation).

export type JsonLd = Record<string, unknown>;

/** Sérialise sans permettre de fermer la balise <script> depuis le contenu. */
export function versJsonLd(donnees: JsonLd): string {
  return JSON.stringify(donnees).replaceAll("<", "\\u003c");
}

/** Plusieurs blocs dans une seule balise <script>. */
export function graphe(...noeuds: JsonLd[]): JsonLd {
  return { "@context": "https://schema.org", "@graph": noeuds };
}

/** Adresse absolue de l'image de partage (1200 × 630, JPEG), générée au build. */
export async function urlImage(src: ImageMetadata, site: URL): Promise<string> {
  const image = await getImage({ src, ...formatPartage });
  return new URL(image.src, site).href;
}

// Identifiant commun : les services, la personne et les événements renvoient tous au même
// établissement, que Google relie à la fiche Google Business (sameAs).
const idEtablissement = (site: URL) => new URL("/#etablissement", site).href;

const adressePostale = {
  "@type": "PostalAddress",
  streetAddress: adresse.rue,
  postalCode: adresse.codePostal,
  addressLocality: adresse.ville,
  addressRegion: "Pyrénées-Orientales",
  addressCountry: "FR",
};

/** Référence courte à l'établissement, à placer dans les autres blocs. */
const etablissement = (site: URL) => ({
  "@type": "HealthAndBeautyBusiness",
  "@id": idEtablissement(site),
  name: nom,
  url: site.href,
});

/** Fiche « établissement local » : aide Google à afficher Jeannelle dans les recherches à Millas. */
export function etablissementLocal(site: URL, image: string): JsonLd {
  return {
    ...etablissement(site),
    image,
    telephone: telephone.lien.replace("tel:", ""),
    address: adressePostale,
    geo: {
      "@type": "GeoCoordinates",
      latitude: adresse.latitude,
      longitude: adresse.longitude,
    },
    areaServed: zoneDesservie,
    sameAs: [ficheGoogle],
  };
}

/** « 65€ » ou « 65,50 € » → « 65.50 » : schema.org attend un nombre. */
function montant(prix: string): string {
  return prix.replace(/[^\d,.]/g, "").replace(",", ".");
}

/** Une thérapie : service proposé par l'établissement, avec son tarif. */
export function service(
  { data }: CollectionEntry<"therapies">,
  url: URL,
  site: URL,
): JsonLd {
  return {
    "@type": "Service",
    name: data.title,
    description: data.excerpt,
    url: url.href,
    provider: etablissement(site),
    areaServed: zoneDesservie,
    ...(data.price && {
      offers: {
        "@type": "Offer",
        price: montant(data.price),
        priceCurrency: "EUR",
      },
    }),
  };
}

/** Fondatrice (page À propos) : sur un sujet de santé, Google valorise qui exerce. */
export function personne(
  { data }: CollectionEntry<"praticiennes">,
  description: string,
  url: URL,
  image: string,
  site: URL,
): JsonLd {
  return {
    "@type": "Person",
    name: data.name,
    jobTitle: data.role,
    description,
    url: url.href,
    image,
    worksFor: etablissement(site),
  };
}

/** Événement daté organisé chez Jeannelle (actualité avec une date). */
export function evenement(
  { data }: CollectionEntry<"actualites">,
  url: URL,
  image: string,
  site: URL,
): JsonLd | undefined {
  if (!data.date) return undefined;
  return {
    "@type": "Event",
    name: data.title,
    description: data.excerpt,
    url: url.href,
    image,
    startDate: dateIso(data.date),
    ...(data.endDate && { endDate: dateIso(data.endDate) }),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: { "@type": "Place", name: nom, address: adressePostale },
    organizer: etablissement(site),
  };
}

/** Chemin de la page (Accueil › Thérapies › Naturopathie), affiché par Google sous le titre. */
export function filAriane(
  etapes: { nom: string; chemin: string }[],
  site: URL,
): JsonLd {
  return {
    "@type": "BreadcrumbList",
    itemListElement: etapes.map((etape, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: etape.nom,
      item: new URL(etape.chemin, site).href,
    })),
  };
}
