import type { CollectionEntry } from "astro:content";

type Therapie = CollectionEntry<"therapies">;

// Description pour Google : texte de référencement (ou accroche), puis durée et tarif,
// repris des champs de la fiche pour ne pas les écrire deux fois.
export function descriptionTherapie({ data }: Therapie): string {
  const texte = data.seoDescription ?? data.excerpt;
  const infos = [data.duration, data.price].filter(Boolean).join(", ");
  if (!infos) return texte;
  return `${texte} ${data.schedule ? "Cours" : "Séance"} : ${infos}.`;
}

export function trierTherapies(therapies: Therapie[]): Therapie[] {
  return therapies
    .filter((therapie) => !therapie.data.draft)
    .toSorted((a, b) => a.data.order - b.data.order);
}

// Thérapies proposées en cours collectif à horaires fixes (champ `schedule`).
// Elles ont leur propre encart : les listes de thérapies individuelles les excluent.
export function coursCollectifs(therapies: Therapie[]): Therapie[] {
  return therapies.filter((therapie) => therapie.data.schedule);
}

export function therapiesIndividuelles(therapies: Therapie[]): Therapie[] {
  return therapies.filter((therapie) => !therapie.data.schedule);
}
