const DOMAINS = {
  relation_client: {
    label: "Métiers de la Relation Client (Commerce, Vente, Accueil)",
    keywords: ["commerce", "vente", "vendre", "client", "magasin", "accueil", "boutique", "relation client", "mrc", "mcva", "mcvb", "epc"],
    coeffs: [6, 5, 4, 5, 3, 3, 4], // FR, MATH, HG, LV, EPS, ARTS, SCI
    formations: [
      {
        nom: "2de Pro Métiers de la Relation Client (MRC)",
        niveau: "Bac Pro",
        etablissements: [
          {nom: "Lycée Robert Doisneau", ville: "Corbeil-Essonnes", transport: "Bus 401 (env. 15 min)"},
          {nom: "Lycée Charles Baudelaire", ville: "Évry-Courcouronnes", transport: "Bus 401 ou 402 (env. 30 min)"},
          {nom: "Lycée Pierre Mendès-France", ville: "Ris-Orangis", transport: "RER D ou Bus 402 (env. 45 min)"},
          {nom: "Lycée Jean Monnet", ville: "Juvisy-sur-Orge", transport: "RER D (env. 45 min)"}
        ]
      },
      {
        nom: "CAP Équipier Polyvalent du Commerce (EPC)",
        niveau: "CAP",
        etablissements: [
          {nom: "Lycée Charles Baudelaire", ville: "Évry-Courcouronnes", transport: "Bus 401 ou 402 (env. 30 min)"},
          {nom: "Lycée Pierre Mendès-France", ville: "Ris-Orangis", transport: "RER D ou Bus 402 (env. 45 min)"}
        ]
      }
    ]
  },
  sante_social: {
    label: "Santé, Social et Soins (ASSP, AEPE, AAGA)",
    keywords: ["sante", "social", "soin", "enfant", "personnes agees", "hopital", "medical", "infirmier", "aide", "assp", "petite enfance", "aepe", "aaga"],
    coeffs: [5, 4, 3, 3, 4, 4, 7], 
    formations: [
      {
        nom: "Bac Pro Accompagnement, soins et services à la personne (ASSP)",
        niveau: "Bac Pro",
        etablissements: [
          {nom: "Lycée Charles Baudelaire", ville: "Évry-Courcouronnes", transport: "Bus 401 ou 402 (env. 30 min)"},
          {nom: "Lycée Jean Monnet", ville: "Juvisy-sur-Orge", transport: "RER D (env. 45 min)"},
          {nom: "Lycée Léonard de Vinci", ville: "Saint-Michel-sur-Orge", transport: "RER D puis Bus (env. 55 min)"}
        ]
      },
      {
        nom: "CAP Accompagnant Éducatif Petite Enfance (AEPE)",
        niveau: "CAP",
        etablissements: [
          {nom: "Lycée Charles Baudelaire", ville: "Évry-Courcouronnes", transport: "Bus 401 ou 402 (env. 30 min)"}
        ]
      },
      {
        nom: "CAP Agent Accompagnant au Grand Age (AAGA)",
        niveau: "CAP",
        etablissements: [
          {nom: "Lycée Charles Baudelaire", ville: "Évry-Courcouronnes", transport: "Bus 401 ou 402 (env. 30 min)"},
          {nom: "Lycée Léonard de Vinci", ville: "Saint-Michel-sur-Orge", transport: "RER D puis Bus (env. 55 min)"}
        ]
      }
    ]
  },
  numerique_energie: {
    label: "Transitions Numérique et Énergétique (Électricité, Info, MELEC)",
    keywords: ["informatique", "ordinateur", "numerique", "electricite", "electricien", "ciel", "melec", "energie", "code", "technologie", "chauffage", "climatisation"],
    coeffs: [5, 6, 3, 4, 3, 2, 7], 
    formations: [
      {
        nom: "Bac Pro Cybersécurité, Informatique et Réseaux, Électronique (CIEL)",
        niveau: "Bac Pro",
        etablissements: [
          {nom: "Lycée Georges Brassens", ville: "Évry-Courcouronnes", transport: "Bus 402 (env. 25 min)"}
        ]
      },
      {
        nom: "Bac Pro Métiers de l'électricité et de ses environnements connectés (MELEC)",
        niveau: "Bac Pro",
        etablissements: [
          {nom: "Lycée Robert Doisneau", ville: "Corbeil-Essonnes", transport: "Bus 401 (env. 15 min)"},
          {nom: "Lycée Pierre Mendès-France", ville: "Ris-Orangis", transport: "RER D ou Bus 402 (env. 45 min)"}
        ]
      },
      {
        nom: "CAP Électricien",
        niveau: "CAP",
        etablissements: [
          {nom: "Lycée Robert Doisneau", ville: "Corbeil-Essonnes", transport: "Bus 401 (env. 15 min)"},
          {nom: "Lycée Pierre Mendès-France", ville: "Ris-Orangis", transport: "RER D ou Bus 402 (env. 45 min)"}
        ]
      }
    ]
  },
  construction_batiment: {
    label: "Métiers du Bâtiment et de la Construction Durable",
    keywords: ["batiment", "construire", "construction", "menuisier", "menuiserie", "maçon", "travaux", "chantier", "architecture", "peintre", "carreleur"],
    coeffs: [5, 6, 3, 4, 3, 2, 7],
    formations: [
      {
        nom: "Bac Pro Technicien du Bâtiment (TBORGO)",
        niveau: "Bac Pro",
        etablissements: [
          {nom: "Lycée Auguste Perret", ville: "Évry-Courcouronnes", transport: "Bus 401 (env. 25 min)"},
          {nom: "Lycée Jean-Pierre Timbaud", ville: "Brétigny-sur-Orge", transport: "RER D puis RER C (env. 60 min)"}
        ]
      },
      {
        nom: "CAP Maçon",
        niveau: "CAP",
        etablissements: [
          {nom: "Lycée Auguste Perret", ville: "Évry-Courcouronnes", transport: "Bus 401 (env. 25 min)"},
          {nom: "Lycée Jean-Pierre Timbaud", ville: "Brétigny-sur-Orge", transport: "RER D puis RER C (env. 60 min)"}
        ]
      },
      {
        nom: "CAP Menuisier Fabricant",
        niveau: "CAP",
        etablissements: [
          {nom: "Lycée Auguste Perret", ville: "Évry-Courcouronnes", transport: "Bus 401 (env. 25 min)"}
        ]
      }
    ]
  },
  restauration_alimentation: {
    label: "Hôtellerie, Restauration et Alimentation",
    keywords: ["cuisine", "cuisinier", "cuisiniere", "restaurant", "restauration", "chef", "patissier", "patisserie", "boulanger", "manger", "hotellerie"],
    coeffs: [5, 4, 3, 3, 4, 4, 7],
    formations: [
      {
        nom: "2de Pro Métiers de l'Hôtellerie-Restauration (MHR)",
        niveau: "Bac Pro",
        etablissements: [
          {nom: "Lycée Château des Coudraies", ville: "Étiolles", transport: "Bus 7001 (env. 20 min)"}
        ]
      },
      {
        nom: "CAP Cuisine",
        niveau: "CAP",
        etablissements: [
          {nom: "Lycée Château des Coudraies", ville: "Étiolles", transport: "Bus 7001 (env. 20 min)"}
        ]
      },
      {
        nom: "Bac Pro Boulanger-Pâtissier",
        niveau: "Bac Pro",
        etablissements: [
          {nom: "Lycée Château des Coudraies", ville: "Étiolles", transport: "Bus 7001 (env. 20 min)"}
        ]
      },
      {
        nom: "CAP Pâtissier",
        niveau: "CAP",
        etablissements: [
          {nom: "Lycée Château des Coudraies", ville: "Étiolles", transport: "Bus 7001 (env. 20 min)"}
        ]
      }
    ]
  },
  mecanique_maintenance: {
    label: "Maintenance des Véhicules et Mécanique",
    keywords: ["voiture", "mecanique", "mecanicien", "auto", "automobile", "garage", "carrosserie", "moteur", "maintenance", "remi"],
    coeffs: [4, 6, 3, 4, 3, 2, 8],
    formations: [
      {
        nom: "Bac Pro Maintenance des Véhicules (MVA)",
        niveau: "Bac Pro",
        etablissements: [
          {nom: "Lycée Alexandre Denis", ville: "Cerny", transport: "RER D puis Bus (env. 1h10)"}
        ]
      },
      {
        nom: "CAP Maintenance des Véhicules (Voitures Particulières)",
        niveau: "CAP",
        etablissements: [
          {nom: "Lycée Alexandre Denis", ville: "Cerny", transport: "RER D puis Bus (env. 1h10)"}
        ]
      },
      {
        nom: "2de Pro Réalisation d'Ensembles Mécaniques et Industriels (REMI)",
        niveau: "Bac Pro",
        etablissements: [
          {nom: "Lycée Robert Doisneau", ville: "Corbeil-Essonnes", transport: "Bus 401 (env. 15 min)"},
          {nom: "Lycée Georges Brassens", ville: "Évry-Courcouronnes", transport: "Bus 402 (env. 25 min)"}
        ]
      }
    ]
  }
};
