import type { CollectionEntry } from "astro:content";
import { formaterDate, formaterPeriode } from "@lib/date";

type Actualite = CollectionEntry<"actualites">;

export const libellesCategorie: Record<Actualite["data"]["category"], string> =
  {
    evenement: "Événement",
    conference: "Conférence",
    partenaire: "Partenaire",
    cours: "Cours",
  };

/** Un événement est passé quand sa date de fin (ou de début) est derrière nous. */
export function estPassee(
  actualite: Actualite,
  maintenant = new Date(),
): boolean {
  const fin = actualite.data.endDate ?? actualite.data.date;
  return fin !== undefined && fin < maintenant;
}

export function dateAffichee(actualite: Actualite): string | undefined {
  const { date, endDate } = actualite.data;
  if (!date) return undefined;
  return endDate ? formaterPeriode(date, endDate) : formaterDate(date);
}

/** Lien de la carte : le site du partenaire si l'actualité est externe, sinon sa page. */
export function lienActualite(actualite: Actualite): string {
  return actualite.data.externalUrl ?? `/actualites/${actualite.id}/`;
}

// Ordre d'affichage : à venir (la plus proche d'abord), puis permanentes (sans date),
// puis passées (la plus récente d'abord).
function rang(actualite: Actualite, maintenant: Date): number {
  if (!actualite.data.date) return 1;
  return estPassee(actualite, maintenant) ? 2 : 0;
}

export function trierActualites(
  actualites: Actualite[],
  maintenant = new Date(),
): Actualite[] {
  return actualites
    .filter((actualite) => !actualite.data.draft)
    .toSorted((a, b) => {
      const ecart = rang(a, maintenant) - rang(b, maintenant);
      if (ecart !== 0) return ecart;
      const da = a.data.date?.getTime() ?? 0;
      const db = b.data.date?.getTime() ?? 0;
      return rang(a, maintenant) === 0 ? da - db : db - da;
    });
}
