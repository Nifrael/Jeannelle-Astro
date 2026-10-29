import type { CollectionEntry } from "astro:content";

type Therapie = CollectionEntry<"therapies">;

export function trierTherapies(therapies: Therapie[]): Therapie[] {
  return therapies
    .filter((therapie) => !therapie.data.draft)
    .toSorted((a, b) => a.data.order - b.data.order);
}
