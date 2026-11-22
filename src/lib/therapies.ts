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

type Praticienne = CollectionEntry<"praticiennes">;

export type GroupeCreneaux = { praticienne: Praticienne; slots: string[] };

// Créneaux d'un cours collectif avec la fiche de leur enseignante (qui porte la façon de
// s'inscrire). La référence est déjà vérifiée au build ; l'erreur ne sert qu'à TypeScript.
export function creneauxParEnseignante(
  therapie: Therapie,
  praticiennes: Praticienne[],
): GroupeCreneaux[] {
  return (therapie.data.schedule ?? []).map(({ teacher, slots }) => {
    const praticienne = praticiennes.find(({ id }) => id === teacher.id);
    if (!praticienne)
      throw new Error(`Praticienne introuvable : ${teacher.id}`);
    return { praticienne, slots };
  });
}

// Nom court d'un cours, sans le suffixe du titre (« Yin Yoga — Cours Collectif » → « Yin Yoga »).
export function nomCours({ data }: Therapie): string {
  return data.title.replace(/\s+—\s+Cours Collectif$/, "");
}

// Tarif commun à tous les cours, s'il y en a un (sinon chaque fiche donne le sien).
export function tarifCommun(cours: Therapie[]): string | undefined {
  const tarifs = new Set(cours.map(({ data }) => data.price));
  const [tarif] = tarifs;
  return tarifs.size === 1 ? tarif : undefined;
}
