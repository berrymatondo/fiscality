/**
 * Entités (directions générales, régies, offices...) rattachées à chaque ministère, pour le
 * détail d'exécution de /execution-par-ministere. Données de démonstration cohérentes avec le
 * reste du tableau de bord : les taux sont illustratifs, mais les sigles reprennent des
 * structures réellement rattachées à ces ministères en RDC.
 */

export type MinistryEntity = { name: string; taux: number }
export type MinistryEntities = { name: string; entites: MinistryEntity[] }

export const MINISTRY_ENTITIES: MinistryEntities[] = [
  {
    name: 'Infrastructures et Travaux Publics',
    entites: [
      { name: 'Office des Routes (OR)', taux: 121.6 },
      { name: 'Office des Voiries et Drainage (OVD)', taux: 118.2 },
      { name: "Fonds National d'Entretien Routier (FONER)", taux: 109.8 },
      { name: 'Direction des Infrastructures', taux: 103.5 },
    ],
  },
  {
    name: 'Finances',
    entites: [
      { name: 'Direction Générale des Impôts (DGI)', taux: 104.3 },
      { name: 'Direction Générale des Douanes et Assises (DGDA)', taux: 101.7 },
      { name: 'Direction Générale des Recettes Administratives (DGRAD)', taux: 96.8 },
      { name: 'Direction Générale du Trésor et de la Comptabilité Publique (DGTCP)', taux: 89.4 },
    ],
  },
  {
    name: 'Intérieur et Sécurité',
    entites: [
      { name: 'Police Nationale Congolaise (PNC)', taux: 92.1 },
      { name: 'Direction Générale de Migration (DGM)', taux: 87.5 },
      { name: 'Administration du Territoire', taux: 79.3 },
    ],
  },
  {
    name: 'Éducation Nationale et Nouvelle Citoyenneté',
    entites: [
      { name: 'Service de Contrôle de la Paie des Enseignants (SECOPE)', taux: 84.6 },
      { name: "Direction des Programmes Scolaires", taux: 76.9 },
      { name: "Inspection Générale de l'Enseignement", taux: 71.2 },
    ],
  },
  {
    name: 'Défense Nationale',
    entites: [
      { name: 'État-Major Général (FARDC)', taux: 78.4 },
      { name: 'Direction des Ressources Humaines Militaires', taux: 68.9 },
      { name: 'Direction du Génie Militaire', taux: 64.1 },
    ],
  },
  {
    name: 'Santé Publique, Hygiène et Prévention',
    entites: [
      { name: 'Direction de Lutte contre la Maladie', taux: 41.7 },
      { name: 'Programme National de Lutte contre le Sida (PNLS)', taux: 38.2 },
      { name: 'Direction des Études et Planification (DEP)', taux: 29.6 },
    ],
  },
  {
    name: 'Affaires Sociales',
    entites: [
      { name: 'Fonds Social de la RDC (FSRDC)', taux: 27.8 },
      { name: 'Direction de la Protection Sociale', taux: 22.4 },
      { name: "Direction de l'Action Humanitaire", taux: 19.5 },
    ],
  },
  {
    name: 'Agriculture et Sécurité Alimentaire',
    entites: [
      { name: 'Institut National pour les Études et Recherches Agronomiques (INERA)', taux: 24.3 },
      { name: 'Service National de Semences (SENASEM)', taux: 20.1 },
      { name: 'Direction de la Production Agricole', taux: 16.7 },
    ],
  },
]
