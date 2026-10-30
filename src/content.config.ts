import { defineCollection, reference, type SchemaContext } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const photo = (image: SchemaContext["image"]) =>
  z.object({
    src: image(),
    alt: z.string(),
  });

// Doit rester d'accord avec les icônes déclarées dans components/UI/Icone.astro.
const iconeTherapie = z.enum([
  "feuille",
  "pied",
  "yoga",
  "massage",
  "esprit",
  "horloge",
]);

const therapies = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/therapies" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      excerpt: z.string(),
      icon: iconeTherapie,
      duration: z.string().optional(),
      price: z.string().optional(),
      secondPrice: z.string().optional(),
      pack: z.string().optional(),
      // Cours collectif à horaires fixes : créneaux et règle de réservation.
      // Affiché en encart sur l'accueil et dans la carte rendez-vous de la fiche.
      schedule: z
        .object({
          slots: z.array(z.string()).min(1),
          // Condition de réservation (« jusqu'à la veille ») : les composants l'insèrent dans
          // leur phrase, avec le numéro qui vient de src/data/coordonnees.ts.
          booking: z.string(),
        })
        .optional(),
      image: photo(image).optional(),
      order: z.number().default(0),
      draft: z.boolean().default(false),
    }),
});

const actualites = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/actualites" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      excerpt: z.string(),
      category: z.enum(["evenement", "conference", "partenaire", "cours"]),
      date: z.coerce.date().optional(),
      endDate: z.coerce.date().optional(),
      location: z.string().optional(),
      image: photo(image),
      // Affiche avec du texte dans l'image : affichée en entier, jamais recadrée.
      poster: z.boolean().default(false),
      externalUrl: z.url().optional(),
      ctaLabel: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

// Le texte de présentation est le corps du fichier Markdown.
const praticiennes = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/praticiennes" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string(),
      photo: photo(image).optional(),
      therapies: z.array(reference("therapies")).default([]),
      // Page interne (« /a-propos/ ») ou site personnel de la praticienne.
      link: z.string().optional(),
      order: z.number().default(0),
    }),
});

// Pages éditoriales (à propos, pages légales) : en-tête dans le frontmatter, texte dans le corps.
const pages = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    citation: z.string().optional(),
    parcours: z.array(z.string()).optional(),
    updated: z.coerce.date().optional(),
  }),
});

export const collections = { therapies, actualites, praticiennes, pages };
