// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import { fileURLToPath } from "node:url";
import sitemap from "@astrojs/sitemap";

/** @param {string} dossier */
const chemin = (dossier) => fileURLToPath(new URL(dossier, import.meta.url));

// https://astro.build/config
export default defineConfig({
  // Adresse de production : sert au sitemap, aux URL canoniques et aux images de partage.
  site: "https://www.jeannelle.me",
  integrations: [sitemap()],
  // Site 100 % statique : aucun adaptateur, Vercel sert simplement le dossier dist/.
  // Images responsives partout : chaque <Image> reçoit un srcset adapté à sa taille affichée.
  image: {
    layout: "constrained",
  },
  // CSS écrit dans chaque page : une requête bloquante de moins, le CSS du site est léger.
  build: {
    inlineStylesheets: "always",
  },
  vite: {
    resolve: {
      alias: {
        "@": chemin("./src"),
        "@assets": chemin("./src/assets"),
        "@components": chemin("./src/components"),
        "@data": chemin("./src/data"),
        "@layouts": chemin("./src/layouts"),
        "@lib": chemin("./src/lib"),
        "@scripts": chemin("./src/scripts"),
        "@styles": chemin("./src/styles"),
      },
    },
  },
  // Polices auto-hébergées : téléchargées au build, aucun appel à Google à l'exécution (RGPD).
  // Pour tester un autre duo, il suffit de changer `name` ici (voir CLAUDE.md, §5).
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Lora",
      cssVariable: "--font-title",
      weights: ["400", "500", "600"],
      styles: ["normal", "italic"],
    },
    {
      provider: fontProviders.google(),
      name: "Figtree",
      cssVariable: "--font-text",
      weights: ["400", "500", "600"],
      // Italique réel (accroches des thérapies), sinon le navigateur penche le romain.
      styles: ["normal", "italic"],
    },
  ],
});
