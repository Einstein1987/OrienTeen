/* =============================================================================
 * export.js — Un seul geste : télécharger le PDF.
 *
 * L'élève enregistre le fichier, puis l'imprime, l'envoie par mail ou le dépose
 * sur l'ENT comme il veut. L'application ne collecte aucune donnée, et ne dépend
 * d'aucun client mail installé sur le poste.
 *
 * Le branchement se fait par DÉLÉGATION : la carte 2GT est reconstruite à chaque
 * clic de l'élève, un écouteur posé directement sur le bouton serait détruit.
 *
 * CHARGEMENT À LA DEMANDE DE jsPDF
 * --------------------------------
 * jsPDF pèse 420 Ko. La plupart des élèves consultent l'appli sans jamais
 * télécharger de PDF : leur faire transférer cette bibliothèque au démarrage
 * ralentit la page pour rien, surtout sur un téléphone en 4G. On ne la charge
 * donc qu'au PREMIER clic sur « Télécharger le PDF », une seule fois. jsPDF
 * s'expose sur window.jspdf : c'est ce que pdf.js attend, chargé statiquement ou
 * non. En contexte de test (jsdom), window.jspdf est déjà présent — le
 * chargement est alors court-circuité et telechargerPDF() reste synchrone.
 * ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  // Mémorise la promesse de chargement pour ne jamais injecter deux fois le
  // script, même si l'élève clique plusieurs fois de suite.
  var chargement = null;

  function chargerJsPDF() {
    if (window.jspdf && window.jspdf.jsPDF) return Promise.resolve();
    if (chargement) return chargement;
    chargement = new Promise(function (resoudre, rejeter) {
      var script = document.createElement("script");
      script.src = "scripts/vendor/jspdf.umd.min.js";
      script.onload = function () { resoudre(); };
      script.onerror = function () {
        // On oublie la promesse échouée : un clic suivant pourra réessayer
        // (utile si le premier échec venait d'une coupure réseau passagère).
        chargement = null;
        rejeter(new Error("jsPDF n'a pas pu être chargé."));
      };
      document.head.appendChild(script);
    });
    return chargement;
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest('[data-export="pdf"]');
    if (!btn) return;
    if (typeof window.telechargerPDF !== "function") return;

    // Retour visuel : le tout premier téléchargement peut demander une fraction
    // de seconde, le temps de récupérer la bibliothèque.
    var libelle = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Préparation du PDF…";

    var reactiver = function () {
      btn.disabled = false;
      btn.textContent = libelle;
    };

    chargerJsPDF().then(function () {
      window.telechargerPDF();
      reactiver();
    }).catch(function () {
      reactiver();
      // nouveauDoc() (pdf.js) gère déjà l'absence de jsPDF au moment de générer ;
      // ici on couvre l'échec du chargement lui-même (réseau du collège, etc.).
      window.alert(
        "Le téléchargement du PDF n'a pas pu démarrer : la bibliothèque n'a pas pu être chargée.\n\n" +
        "Tu peux utiliser Ctrl+P (ou Cmd+P) puis « Enregistrer au format PDF »."
      );
    });
  });
});
