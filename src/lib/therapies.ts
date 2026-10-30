import type { CollectionEntry } from "astro:content";

type Therapie = CollectionEntry<"therapies">;

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
