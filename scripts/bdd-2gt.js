/* =============================================================================
 * bdd-2gt.js — TrouveTaVoie
 * Base de données 2nde Générale et Technologique — 5 lycées de secteur
 * Collège La Nacelle (Corbeil-Essonnes)
 *
 * SOURCES OFFICIELLES :
 *  - Catalogue Affelnet "Offres de formation post 3ème", académie de Versailles
 *    (codes vœux exacts) — campagne 2026
 *  - Fiche technique n°16 (Essonne) : carte des formations GT — 16A / 16C / 16D / 16E
 *  - CIO Évry-Courcouronnes, "La voie générale et technologique dans les lycées
 *    du bassin d'Evry-Courcouronnes", MAJ 16/04/2026 (options sur place)
 *
 * TROIS NIVEAUX, À NE JAMAIS CONFONDRE :
 *  1. voeux[]           -> se DEMANDE sur Affelnet (code vœu officiel)
 *  2. horsAffelnet[]    -> dossier / liste à part, PAS un vœu Affelnet
 *  3. optionsSurPlace[] -> se choisit APRÈS l'affectation, auprès du lycée
 * ========================================================================== */

const SOURCE_2GT = {
  affelnet: "Catalogue Affelnet post-3e, académie de Versailles — campagne 2026",
  fiche16:  "Fiche technique n°16 — Carte des formations GT de l'Essonne",
  cio:      "CIO Évry-Courcouronnes — MAJ 16/04/2026",
  avertissement: "Sous réserve de modifications. Vérifie auprès de ton professeur " +
                 "principal ou de la PsyEN avant de formuler tes vœux."
};

/* -----------------------------------------------------------------------------
 * RÈGLE D'OR à afficher dans l'application
 * -------------------------------------------------------------------------- */
const REGLE_FILET_SECURITE =
  "Un vœu avec option (ex. « Doisneau Théâtre ») et le vœu simple (« Doisneau ») " +
  "sont DEUX vœux différents, avec chacun leur nombre de places. " +
  "Seule l'affectation dans ton lycée de secteur peut être garantie : pense à " +
  "ajouter aussi le vœu simple de ton lycée de secteur, en dessous de ton vœu avec option.";

/* -----------------------------------------------------------------------------
 * LES 5 LYCÉES
 * -------------------------------------------------------------------------- */
const LYCEES_2GT = {

  doisneau: {
    id: "doisneau",
    uai: "0910620E",
    nom: "Lycée Robert Doisneau",
    ville: "Corbeil-Essonnes",
    trajet: { km: null, minutes: null },   // à remplir via compute-distances.mjs
    voeux: [
      { code: "09121767", libelle: "2GT (sans option)",        categorie: "base",     procedure: null },
      { code: "09121861", libelle: "2GT Arts plastiques",      categorie: "artistique", procedure: null,
        note: "À poursuivre en spécialité Arts plastiques en 1ère générale." },
      { code: "09121862", libelle: "2GT Cinéma-audiovisuel",   categorie: "artistique", procedure: null },
      { code: "09121863", libelle: "2GT Histoire des arts",    categorie: "artistique", procedure: null,
        note: "À poursuivre en spécialité Histoire des arts en 1ère générale." },
      { code: "09121864", libelle: "2GT Musique",              categorie: "artistique", procedure: null,
        note: "À poursuivre en spécialité Musique en 1ère générale." },
      { code: "09121865", libelle: "2GT Théâtre",              categorie: "artistique", procedure: null },
      { code: "09122003", libelle: "Langue vivante C rare — Portugais", categorie: "langue", procedure: null },
      { code: "09112477", libelle: "Section européenne Anglais",       categorie: "section_euro", procedure: null },
      { code: "09122034", libelle: "Section européenne Portugais",     categorie: "section_euro", procedure: null }
    ],
    horsAffelnet: [],
    optionsSurPlace: [
      "LCA Latin",
      "Management et gestion",
      "Sciences de l'ingénieur",
      "EPS : Escalade, Basket, Futsal, Danse"
    ],
    seriesTechno: ["STMG", "STI2D"],
    languesTroncCommun: ["Anglais", "Allemand", "Espagnol", "Portugais"]
  },

  parc_des_loges: {
    id: "parc_des_loges",
    uai: "0911251R",
    nom: "Lycée du Parc des Loges",
    ville: "Évry-Courcouronnes",
    trajet: { km: null, minutes: null },
    voeux: [
      { code: "09121769", libelle: "2GT (sans option)",   categorie: "base",       procedure: null },
      { code: "09121992", libelle: "2GT Biotechnologies", categorie: "scientifique",
        procedure: "PassSTL",
        note: "Recrutement spécifique : entretien de présélection. L'avis de la commission " +
              "donne des points bonus/malus sur Affelnet." },
      { code: "09122033", libelle: "2GT Théâtre",         categorie: "artistique", procedure: null },
      { code: "09121841", libelle: "Section européenne Anglais", categorie: "section_euro", procedure: null }
    ],
    horsAffelnet: [
      { libelle: "Section sportive Athlétisme",
        note: "PAS un vœu Affelnet. Candidature directe auprès du lycée. Les listes " +
              "d'élèves retenus sont transmises avant fin mai. Les candidatures hors " +
              "secteur ne bénéficient d'aucune priorité d'affectation." }
    ],
    optionsSurPlace: [
      "LCA Latin",
      "LVC Italien",
      "Management et gestion",
      "Santé et social",
      "Sciences et laboratoire"
    ],
    seriesTechno: ["STL (Biotechnologies)", "ST2S", "STMG"],
    languesTroncCommun: ["Anglais", "Allemand", "Espagnol"]
  },

  brassens: {
    id: "brassens",
    uai: "0911828T",
    nom: "Lycée Georges Brassens",
    ville: "Évry-Courcouronnes",
    trajet: { km: null, minutes: null },
    voeux: [
      { code: "09121768", libelle: "2GT (sans option)",      categorie: "base",       procedure: null },
      { code: "09121924", libelle: "2GT Cinéma-audiovisuel", categorie: "artistique", procedure: null },
      { code: "09121790", libelle: "2GT Création et Culture Design", categorie: "design",
        procedure: "PassCCD",
        note: "Recrutement spécifique : entretien de présélection. L'avis de la commission " +
              "donne des points bonus/malus sur Affelnet. C'est la porte d'entrée vers le bac STD2A." },
      { code: "09112469", libelle: "Langue vivante C rare — Chinois", categorie: "langue", procedure: null },
      { code: "09112472", libelle: "Section européenne Anglais",      categorie: "section_euro", procedure: null }
    ],
    horsAffelnet: [],
    optionsSurPlace: [
      "Histoire des arts",
      "Musique et art du son",
      "Sciences de l'ingénieur",
      "EPS : Basket"
    ],
    seriesTechno: ["STI2D", "STD2A"],
    languesTroncCommun: ["Anglais", "Allemand", "Espagnol", "Chinois"]
  },

  truffaut: {
    id: "truffaut",
    uai: "0911937L",
    nom: "Lycée François Truffaut",
    ville: "Bondoufle",
    trajet: { km: null, minutes: null },
    voeux: [
      { code: "09121783", libelle: "2GT (sans option)",           categorie: "base",         procedure: null },
      { code: "09121600", libelle: "Section européenne Anglais",  categorie: "section_euro", procedure: null }
    ],
    horsAffelnet: [],
    optionsSurPlace: [
      "LCA Latin"
    ],
    seriesTechno: ["ST2S", "STMG"],
    languesTroncCommun: ["Anglais", "Allemand", "Espagnol", "Japonais"]
  },

  laurencin: {
    id: "laurencin",
    uai: "0911962N",
    nom: "Lycée Marie Laurencin",
    ville: "Mennecy",
    trajet: { km: null, minutes: null },
    voeux: [
      { code: "09121786", libelle: "2GT (sans option)",            categorie: "base",         procedure: null },
      { code: "09112533", libelle: "Section européenne Anglais",   categorie: "section_euro", procedure: null },
      { code: "09121752", libelle: "Section européenne Espagnol",  categorie: "section_euro", procedure: null }
    ],
    horsAffelnet: [],
    optionsSurPlace: [
      "LCA Latin",
      "LLC de l'Antiquité (ouverture si effectif suffisant)",
      "Management et gestion"
    ],
    seriesTechno: ["STMG"],
    languesTroncCommun: ["Anglais", "Allemand", "Espagnol"]
  }
};

/* -----------------------------------------------------------------------------
 * CRITÈRES DU COMPARATEUR
 * Chaque critère pointe vers les lycées qui le proposent EN TANT QUE VŒU.
 * `exclusif: true` => un seul lycée le propose : c'est un vrai discriminant.
 * -------------------------------------------------------------------------- */
const CRITERES_2GT = [
  { id: "arts_plastiques", label: "Arts plastiques",        lycees: ["doisneau"], exclusif: true },
  { id: "histoire_arts",   label: "Histoire des arts",      lycees: ["doisneau"], exclusif: true },
  { id: "musique",         label: "Musique",                lycees: ["doisneau"], exclusif: true },
  { id: "cinema",          label: "Cinéma-audiovisuel",     lycees: ["doisneau", "brassens"], exclusif: false },
  { id: "theatre",         label: "Théâtre",                lycees: ["doisneau", "parc_des_loges"], exclusif: false },
  { id: "design",          label: "Design (Création et Culture Design)", lycees: ["brassens"], exclusif: true, procedure: "PassCCD" },
  { id: "biotech",         label: "Biotechnologies",        lycees: ["parc_des_loges"], exclusif: true, procedure: "PassSTL" },
  { id: "chinois",         label: "Chinois (LVC)",          lycees: ["brassens"], exclusif: true },
  { id: "portugais",       label: "Portugais (LVC ou section euro)", lycees: ["doisneau"], exclusif: true },
  { id: "euro_espagnol",   label: "Section européenne Espagnol", lycees: ["laurencin"], exclusif: true },
  { id: "euro_anglais",    label: "Section européenne Anglais",  lycees: ["doisneau", "parc_des_loges", "brassens", "truffaut", "laurencin"],
    exclusif: false,
    remarque: "Proposée par les 5 lycées : ce critère ne permet pas de les départager." }
];

/* -----------------------------------------------------------------------------
 * SÉRIES TECHNOLOGIQUES (choix en fin de 2nde, pas un vœu de 3e)
 * Utile pour anticiper : « si je vise STL, seul le Parc des Loges le propose ».
 * -------------------------------------------------------------------------- */
const SERIES_TECHNO_2GT = {
  STMG:  ["doisneau", "parc_des_loges", "truffaut", "laurencin"],
  STI2D: ["doisneau", "brassens"],
  ST2S:  ["parc_des_loges", "truffaut"],
  STL:   ["parc_des_loges"],
  STD2A: ["brassens"]
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { LYCEES_2GT, CRITERES_2GT, SERIES_TECHNO_2GT, SOURCE_2GT, REGLE_FILET_SECURITE };
}
