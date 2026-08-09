import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const iconEnum = z.enum([
  "nature",
  "yin",
  "reflexology",
  "chair",
  "brain",
  "hour",
]);

const therapies = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/therapies" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      excerpt: z.string(),
      icon: iconEnum,
      duration: z.string().optional(),
      price: z.string().optional(),
      secondPrice: z.string().optional(),
      pack: z.string().optional(),
      image: image().optional(),
      order: z.number().default(0),
      draft: z.boolean().default(false),
    }),
});

const actualites = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/actualites" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      excerpt: z.string(),
      category: z.enum(["evenement", "conference", "partenaire", "cours"]),
      date: z.coerce.date().optional(),
      endDate: z.coerce.date().optional(),
      location: z.string().optional(),
      image: image(),
      externalUrl: z.string().url().optional(),
      ctaLabel: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { therapies, actualites };
