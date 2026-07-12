/* =============================================================================
 * tabs.js — Bascule entre les deux vues de TrouveTaVoie
 *   #vue-pro  : l'assistant conversationnel (voie professionnelle)
 *   #vue-2gt  : le comparateur de lycées (2nde générale et technologique)
 * ========================================================================== */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    const onglets = Array.prototype.slice.call(document.querySelectorAll(".tab[data-vue]"));
    const vues    = Array.prototype.slice.call(document.querySelectorAll(".vue"));
    if (!onglets.length) return;

    function activer(cible) {
      onglets.forEach(function (t) {
        const on = t.dataset.vue === cible;
        t.classList.toggle("is-active", on);
        t.setAttribute("aria-selected", on ? "true" : "false");
      });
      vues.forEach(function (v) {
        v.classList.toggle("is-active", v.id === cible);
      });

      // Pas de statistique ici : un simple clic d'onglet n'est pas un usage.
      // La voie 2GT compte au moment où l'élève valide sa liste de vœux.
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    onglets.forEach(function (t) {
      t.addEventListener("click", function () { activer(t.dataset.vue); });
    });

    // Le logo remet l'application à son état de départ : c'est le geste attendu
    // quand on veut « recommencer », et c'est plus simple qu'un bouton de reset
    // qui devrait vider le chat, la carte, les cases cochées et les onglets.
    const logo = document.querySelector(".app-logo");
    if (logo) {
      logo.style.cursor = "pointer";
      logo.setAttribute("role", "button");
      logo.setAttribute("tabindex", "0");
      logo.setAttribute("title", "Revenir au début");
      const recommencer = function () { window.location.reload(); };
      logo.addEventListener("click", recommencer);
      logo.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); recommencer(); }
      });
    }
  });
})();
