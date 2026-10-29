// Menu mobile : ouverture/fermeture, Échap, page inerte derrière le menu.

export function initNavbar(): void {
  const bascule = document.getElementById("bascule-menu");
  const panneau = document.getElementById("menu-principal");
  if (!bascule || !panneau) return;

  // Même valeur que $breakpoint-desktop : au-delà, le menu est affiché en ligne.
  const ecranMobile = window.matchMedia("(width < 1024px)");

  const definirOuvert = (ouvert: boolean) => {
    bascule.setAttribute("aria-expanded", String(ouvert));
    panneau.classList.toggle("ouvert", ouvert);
    document.documentElement.classList.toggle("menu-ouvert", ouvert);
    // La page derrière le menu devient inerte : ni clic ni tabulation,
    // le focus reste dans l'en-tête sans piège à coder.
    document
      .querySelectorAll("body > :not(header)")
      .forEach((element) => element.toggleAttribute("inert", ouvert));
  };

  bascule.addEventListener("click", () => {
    definirOuvert(bascule.getAttribute("aria-expanded") !== "true");
  });

  document.addEventListener("keydown", (evenement) => {
    if (evenement.key === "Escape" && panneau.classList.contains("ouvert")) {
      definirOuvert(false);
      bascule.focus();
    }
  });

  // Passage en grand écran menu ouvert (rotation de tablette) : on referme,
  // sinon la page resterait inerte alors que le bouton a disparu.
  ecranMobile.addEventListener("change", (evenement) => {
    if (!evenement.matches) definirOuvert(false);
  });

  // Bouton « retour » : la page revient du cache telle qu'on l'a quittée, menu ouvert compris.
  window.addEventListener("pageshow", () => definirOuvert(false));
}
