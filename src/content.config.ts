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
      // Référencement (facultatif) : titre de l'onglet et texte affiché sous le lien dans
      // Google. Sans eux, la page reprend `title` et `excerpt`. Durée et tarif sont ajoutés
      // automatiquement à la description (src/lib/therapies.ts).
      seoTitle: z.string().optional(),
      seoDescription: z.string().optional(),
      icon: iconeTherapie,
      duration: z.string().optional(),
      price: z.string().optional(),
      secondPrice: z.string().optional(),
      pack: z.string().optional(),
      // Cours collectif à horaires fixes : créneaux regroupés par enseignante, car chacune
      // prend ses inscriptions à sa façon (champ `booking` de sa fiche praticienne).
      // Affiché en encart sur l'accueil et dans la carte rendez-vous de la fiche.
      schedule: z
        .array(
          z.object({
            teacher: reference("praticiennes"),
            slots: z.array(z.string()).min(1),
          }),
        )
        .min(1)
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
      // Ordre des actualités permanentes (sans date), du plus petit au plus grand.
      // Les actualités datées sont triées par date, ce champ ne les concerne pas.
      order: z.number().default(0),
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
      // Inscription aux cours collectifs. Sans `url` : téléphone du centre
      // (src/data/coordonnees.ts). Avec `url` : lien propre à l'enseignante (Instagram…).
      booking: z
        .object({
          url: z.url().optional(),
          // Texte du lien, obligatoire avec `url` (« Instagram (@cassanayoga) »).
          label: z.string().optional(),
          // Condition ajoutée à la phrase (« jusqu'à la veille »).
          condition: z.string().optional(),
        })
        .refine((booking) => !booking.url || booking.label, {
          message: "`label` est obligatoire quand `url` est renseignée",
        })
        .optional(),
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
