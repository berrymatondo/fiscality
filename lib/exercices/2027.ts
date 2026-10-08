// Exercice 2027 — Projet de loi de finances (prévisions).
// Source : Exposé général du PLF 2027 (Document n°2), septembre 2026 — annexes (tableaux 1 à 5),
// tableau 2 (piliers du PAG), graphique 16 (trajectoire des recettes) et sections I, IV et V.
// Montants en FC. La colonne « LFR 2026 » sert uniquement de référence pour les évolutions.
// Les données d'exécution 2026 de ce document ne sont pas reprises ici.

export type PlfRow = {
  code?: string
  label: string
  /** Profondeur dans la hiérarchie (0 = rubrique principale). */
  level: number
  /** Loi de finances rectificative 2026 (référence). */
  lfr: number | null
  /** Projet de loi de finances 2027. */
  plf: number | null
  /** Part du PIB 2027 publiée (en %). */
  pib: number | null
  /** Taux d'accroissement publié par rapport à la loi de finances initiale 2026 (en %). */
  accrInitial: number | null
  /** Taux d'accroissement publié par rapport à la LFR 2026 (en %). */
  accrLfr: number | null
}

export type PlfTable = {
  id: string
  title: string
  source: string
  rows: PlfRow[]
  total: Omit<PlfRow, 'level' | 'code'>
}

const p = (
  level: number,
  code: string | undefined,
  label: string,
  lfr: number | null,
  plf: number | null,
  pib: number | null,
  accrInitial: number | null,
  accrLfr: number | null,
): PlfRow => ({ level, code, label, lfr, plf, pib, accrInitial, accrLfr })

export const SOURCE_PLF_2027 = 'Exposé général du PLF 2027 (Document n°2), septembre 2026'

// ---------------------------------------------------------------------------
// Tableau 2 (annexe) : volet recettes

export const recettesPlf2027: PlfTable = {
  id: 'recettes',
  title: 'Projet de loi de finances 2027 — volet recettes',
  source: `${SOURCE_PLF_2027} — annexe, tableau 2`,
  rows: [
    p(0, 'I', 'Budget général', 45420798895981, 51241956991167, 16.3, 4.6, 12.8),
    p(1, 'I.1', 'Recettes internes', 37078609152375, 41786056744350, 13.3, 20.8, 12.7),
    p(2, 'I.1.1', 'Recettes courantes', 34819169455276, 40210556744350, 12.8, 21.8, 15.5),
    p(3, 'I.1.1.1', 'Recettes des Douanes et Accises (DGDA)', 8299629688549, 9353100000000, 3.0, 24.3, 12.7),
    p(4, 'a', 'Recettes minières', 2253849644486, 2706514667989, 0.9, 32.5, 20.1),
    p(4, 'b', 'Autres', 6045780044063, 6646585332011, 2.1, 21.3, 9.9),
    p(3, 'I.1.1.2', 'Recettes des Impôts (DGI)', 20100000000000, 23055267000000, 7.3, 21.1, 14.7),
    p(4, 'a', 'Recettes minières', 9750552987264, 9750552987264, 3.1, 5.6, 0.0),
    p(4, 'b', 'Recettes pétrolières', 248707919588, 281041260570, 0.1, 13.0, 13.0),
    p(4, 'c', 'Autres', 10100739093147, 13023672752165, 4.1, 36.3, 28.9),
    p(3, 'I.1.1.3', 'Recettes non fiscales', 6419539766728, 7802189744350, 2.5, 20.6, 21.5),
    p(4, '1°', 'DGRAD', 5474646336551, 6677644000000, 2.1, 22.0, 22.0),
    p(5, 'a', 'Recettes minières', 1932023377903, 2609168271831, 0.8, 35.0, 35.0),
    p(5, 'b', 'Recettes pétrolières', 379655755882, 291831922259, 0.1, -23.1, -23.1),
    p(5, 'c', 'Autres', 3162967202766, 3776643805910, 1.2, 19.4, 19.4),
    p(4, '2°', 'Autres recettes non fiscales', 944893430176, 1124545744350, 0.4, 13.1, 19.0),
    p(5, 'a', 'Royalties (contrat chinois)', 749893430176, 1124545744350, 0.4, 40.7, 50.0),
    p(5, 'b', 'Autres recettes non fiscales', 195000000000, 0, 0.0, -100.0, -100.0),
    p(2, 'I.1.2', 'Recettes exceptionnelles (produits des emprunts intérieurs)', 2259439697099, 1575500000000, 0.5, 1.4, -30.3),
    p(1, 'I.2', 'Recettes extérieures', 8342189743606, 9455900246817, 3.0, -34.3, 13.4),
    p(2, 'I.2.1', 'Appuis budgétaires', 2762406885671, 2236738262503, 0.7, -22.9, -19.0),
    p(3, 'I.2.1.1', 'Emprunt programme', 2558234512390, 2163446498836, 0.7, -23.5, -15.4),
    p(3, 'I.2.1.2', 'Dons budgétaires', 204172373281, 73291763667, 0.0, 1.8, -64.1),
    p(2, 'I.2.2', 'Financement des investissements', 5579782857935, 7219161984315, 2.3, -37.2, 29.4),
    p(3, 'I.2.2.1', 'Dons projets', 1718850258921, 1891568861969, 0.6, -50.6, 10.0),
    p(3, 'I.2.2.2', 'Emprunts projets', 2356516766870, 4109802234646, 1.3, -46.4, 74.4),
    p(3, 'I.2.2.3', 'Eurobonds', 1504415832144, 1217790887700, 0.4, 0.0, -19.1),
    p(0, 'II', 'Budgets annexes', 892065836164, 179328550662, 0.1, -81.4, -79.9),
    p(0, 'III', 'Comptes spéciaux', 4553483630641, 5508573328481, 1.7, 25.1, 21.0),
  ],
  total: { label: 'Total recettes', lfr: 50866348362786, plf: 56929858870310, pib: 18.1, accrInitial: 4.8, accrLfr: 11.9 },
}

// ---------------------------------------------------------------------------
// Tableau 3 (annexe) : volet dépenses

export const depensesPlf2027: PlfTable = {
  id: 'depenses',
  title: 'Projet de loi de finances 2027 — volet dépenses',
  source: `${SOURCE_PLF_2027} — annexe, tableau 3`,
  rows: [
    p(0, 'A', 'Budget général', 45420798895981, 51241956991167, 16.3, 4.6, 12.8),
    p(1, 'I', 'Dette publique et frais financiers', 3164709162288, 3478461481381, 1.1, 17.2, 9.9),
    p(2, '1.1', 'Dette publique', 2011321662288, 1941426490407, 0.6, -5.8, -3.5),
    p(3, '1.1.1', 'Dette intérieure', 1200000000000, 1200000000000, 0.4, 0.0, 0.0),
    p(3, '1.1.2', 'Dette extérieure (principal)', 811321662288, 741426490407, 0.2, -13.8, -8.6),
    p(2, '1.2', 'Frais financiers', 1153387500000, 1537034990975, 0.5, 69.3, 33.3),
    p(3, '1.2.1', 'Intérieurs', 788000000000, 1026878613823, 0.3, 56.9, 30.3),
    p(3, '1.2.2', 'Extérieurs', 365387500000, 510156377152, 0.2, 101.3, 39.6),
    p(1, 'II', 'Rémunérations (dépenses de personnel)', 13654929632167, 15314485354818, 4.9, 13.0, 12.2),
    p(2, '2.1', 'Pouvoir central', 8285308272209, 9940791715903, 3.2, 21.5, 20.0),
    p(2, '2.2', 'Provinces', 5369621359958, 5373693638915, 1.7, 0.1, 0.1),
    p(1, 'III', 'Biens et services (fonctionnement)', 5276391558979, 6035382766547, 1.9, 10.3, 14.4),
    p(2, '3.1', 'Fonctionnement des institutions', 1800453916816, 1984213081099, 0.6, 4.5, 10.2),
    p(2, '3.2', 'Fonctionnement des ministères', 2679218606561, 3243232262090, 1.0, 6.4, 21.1),
    p(2, '3.3', 'Financement des réformes', 135560527815, 146736401595, 0.0, 8.2, 8.2),
    p(2, '3.4', 'Fonctionnement des services déconcentrés', 19957486023, 20000000000, 0.0, 0.2, 0.2),
    p(2, '3.5', 'Charges communes', 641201021763, 641201021763, 0.2, 73.7, 0.0),
    p(1, 'IV', 'Transferts et subventions', 4538076884471, 5219161552831, 1.7, 21.6, 15.0),
    p(2, '4.1', 'Rétrocession aux administrations financières', 1864308716723, 2239912930253, 0.7, 23.2, 20.1),
    p(2, '4.2', 'Transfert aux provinces et ETD (fonctionnement)', 923344914358, 985000000000, 0.3, 6.7, 6.7),
    p(2, '4.3', 'Interventions économiques, sociales, culturelles et scientifiques', 1175439685481, 1398564015720, 0.4, 43.5, 19.0),
    p(2, '4.4', 'Organismes auxiliaires', 150000000000, 160000000000, 0.1, 6.7, 6.7),
    p(2, '4.5', "Bourses d'études", 31565000000, 33442550711, 0.0, 5.9, 5.9),
    p(2, '4.6', 'TVA remboursable', 143418567909, 100691289848, 0.0, -29.8, -29.8),
    p(2, '4.7', 'Mise à la retraite', 250000000000, 301550766299, 0.1, 20.6, 20.6),
    p(1, 'V', "Dépenses d'investissement", 10548341387848, 13721989859542, 4.4, -14.3, 30.1),
    p(2, '5.1', 'Investissements sur ressources propres', 4968558529913, 6502827875227, 2.1, 40.1, 30.9),
    p(3, '5.1.1', 'Projets du Gouvernement central', 1972457425623, 2771827710589, 0.9, 73.8, 40.5),
    p(3, '5.1.2', 'Investissements sur cession d’actifs miniers (contrat chinois)', 749893430176, 1124545744350, 0.4, 40.7, 50.0),
    p(3, '5.1.3', 'Contrepartie des projets', 100000000000, 116028231183, 0.0, 16.0, 16.0),
    p(3, '5.1.4', 'Projets des provinces', 1401574678664, 1575000000000, 0.5, 12.4, 12.4),
    p(3, '5.1.5', 'Fonds de péréquation', 744632995450, 915426189106, 0.3, 22.9, 22.9),
    p(2, '5.3', 'Investissements sur ressources extérieures', 5579782857935, 7219161984315, 2.3, -36.5, 29.4),
    p(3, '5.3.1', 'Autres bailleurs', 4075367025791, 6001371096615, 1.9, -47.2, 47.3),
    p(3, '5.3.2', 'Projets financés sur Eurobond', 1504415832144, 1217790887700, 0.4, 0.0, -19.1),
    p(1, 'VI', 'Dépenses exceptionnelles (sur ressources propres)', 8238350270228, 7472475976048, 2.4, 11.9, -9.3),
    p(2, '6.1.1', 'Opérations électorales', 175000000000, 400000000000, 0.1, 99.4, 128.6),
    p(2, '6.1.2', 'Réserve budgétaire', 24588307443, 24588307443, 0.0, -50.8, 0.0),
    p(2, '6.1.3', 'Réserve pour sinistres et calamités', 107500000000, 110000000000, 0.0, 2.3, 2.3),
    p(2, '6.1.4', "Opérations de recensement et d'identification", 81422500000, 181422500000, 0.1, 122.8, 122.8),
    p(2, '6.1.5', 'Organisation du dialogue national', null, 142381888283, null, null, null),
    p(2, '6.1.6', 'Dépenses sécuritaires', 7849839462784, 6614083280321, 2.1, 8.1, -15.7),
    p(0, 'B', 'Budgets annexes', 892065836164, 179328550662, 0.1, -81.4, -79.9),
    p(0, 'C', 'Comptes spéciaux', 4553483630641, 5508573328481, 1.7, 25.1, 21.0),
  ],
  total: { label: 'Total dépenses', lfr: 50866348362786, plf: 56929858870310, pib: 18.1, accrInitial: 4.8, accrLfr: 11.9 },
}

/** Grandes natures de dépenses du Budget général (codes I à VI du tableau 3). */
export const naturesDepensesPlf2027 = depensesPlf2027.rows.filter((r) => r.level === 1)

export const soldesPlf2027 = {
  global: { label: 'Solde global (base caisse)', lfr: -7867285146215, plf: -8325113130775, pibLfr: -2.8, pibPlf: -2.6 },
  interieur: { label: 'Solde budgétaire intérieur', lfr: -5349553252626, plf: -3778446282644, pibLfr: -1.9, pibPlf: -1.2 },
}

// ---------------------------------------------------------------------------
// Tableau 1 (annexe) et tableau 3 (texte) : cadrage macroéconomique

export type MacroRow = { label: string; unit: string; vote2026: number | null; lfr2026: number | null; projection2027: number | null }

export const macroPlf2027: MacroRow[] = [
  { label: 'Taux de croissance du PIB', unit: '%', vote2026: 5.3, lfr2026: 5.6, projection2027: 5.8 },
  { label: "Taux d'inflation moyen", unit: '%', vote2026: 4.4, lfr2026: 3.5, projection2027: 6.4 },
  { label: "Taux d'inflation en fin de période", unit: '%', vote2026: 6.1, lfr2026: null, projection2027: 7.0 },
  { label: 'Taux de croissance du secteur minier', unit: '%', vote2026: 5.0, lfr2026: 6.7, projection2027: 5.0 },
  { label: 'Taux de change moyen', unit: 'FC/USD', vote2026: 2467.0, lfr2026: 2290.0, projection2027: 2300.0 },
  { label: 'Taux de change en fin de période', unit: 'FC/USD', vote2026: 2634.1, lfr2026: 2398.5, projection2027: null },
  { label: 'PIB nominal', unit: 'Mrd FC', vote2026: 269291.9, lfr2026: 278612.3, projection2027: 315100.0 },
  { label: 'PIB nominal', unit: 'Mrd USD', vote2026: 109.2, lfr2026: 121.7, projection2027: 137.0 },
]

/** Taux de change retenu par le PLF 2027 pour les équivalents en USD. */
export const TAUX_CHANGE_PLF_2027 = 2300

/** Graphique 16 : trajectoire des recettes courantes (Md USD) et de la pression fiscale (% du PIB). */
export const trajectoireRecettes = [
  { annee: 2024, recettes: 9.8, pression: 13.7, nature: 'Budget' },
  { annee: 2025, recettes: 10.4, pression: 12.5, nature: 'Budget' },
  { annee: 2026, recettes: 15.2, pression: 12.5, nature: 'LFR' },
  { annee: 2027, recettes: 17.5, pression: 12.8, nature: 'PLF' },
  { annee: 2028, recettes: 18.8, pression: 13.5, nature: 'Projection' },
  { annee: 2029, recettes: 20.5, pression: 13.8, nature: 'Projection' },
  { annee: 2030, recettes: 22.5, pression: 14.2, nature: 'Projection' },
]

/** Section I.2 : perspectives internationales pour 2027 (FMI, Banque mondiale, OMC). */
export const contexteInternational2027 = [
  { label: 'Croissance mondiale', valeur2027: 3.4, reference2026: 3.0, unit: '%' },
  { label: 'Croissance des économies avancées', valeur2027: 1.8, reference2026: 1.7, unit: '%' },
  { label: 'Croissance des économies émergentes et en développement', valeur2027: 4.5, reference2026: 3.8, unit: '%' },
  { label: 'Croissance en Afrique subsaharienne', valeur2027: 4.5, reference2026: 4.3, unit: '%' },
  { label: 'Inflation mondiale', valeur2027: 3.9, reference2026: 4.7, unit: '%' },
  { label: 'Inflation des économies émergentes et en développement', valeur2027: 4.8, reference2026: 5.8, unit: '%' },
  { label: 'Volume du commerce mondial (biens et services, FMI)', valeur2027: 4.3, reference2026: 3.5, unit: '%' },
  { label: 'Prix moyen du pétrole brut', valeur2027: 78.7, reference2026: 89.3, unit: 'USD/baril' },
  { label: 'Cours moyen du cuivre', valeur2027: 14350.2, reference2026: 12000, unit: 'USD/t' },
  { label: 'Cours moyen du cobalt', valeur2027: 55599, reference2026: null, unit: 'USD/t' },
]

// ---------------------------------------------------------------------------
// Tableau 2 (texte) : synthèse des dépenses par piliers du PAG

export const piliersPag2027 = [
  { code: 'I', label: "Créer plus d'emplois et protéger le pouvoir d'achat des ménages", montant: 5, part: 21.5, details: 'Agriculture et sécurité alimentaire, programme « Debout Jeunes Congolais », PME, lutte contre la vie chère.' },
  { code: 'II', label: 'Protéger le territoire national et sécuriser les personnes et leurs biens', montant: 6, part: 27.4, details: 'Effort de guerre, recrutement de 20 000 militaires, loi de programmation de la Police, urgences humanitaires.' },
  { code: 'III', label: "Aménager le territoire national en vue d'une connectivité maximale", montant: 2, part: 8.7, details: 'Rocade de Kinshasa, aéroports de N’djili et Luano, RN4, barrage de Katende, ligne d’Inga.' },
  { code: 'IV', label: "Garantir l'accès aux services de base", montant: 6, part: 27.7, details: 'Gratuité de l’enseignement (7e et 8e), couverture santé universelle, PDL-145T, eau et électricité.' },
  { code: 'V', label: "Renforcer l'efficacité des services publics", montant: 3, part: 12.2, details: 'Dialogue national, fichier électoral, recensement, Compte unique du Trésor, digitalisation des recettes.' },
  { code: 'VI', label: "Gérer durablement l'écosystème face aux changements climatiques", montant: 1, part: 2.5, details: 'Protection de l’environnement, agriculture durable, recherche et innovation.' },
]
export const totalPiliersPag2027 = 22.29

// ---------------------------------------------------------------------------
// Tableau 4 (annexe) : calcul des 40 % des recettes à caractère national

export type CascadeRow = { label: string; level: number; lfr: number; plf: number }

export const retrocessionProvinces2027: CascadeRow[] = [
  { label: '1. Recettes courantes', level: 0, lfr: 33874276025100, plf: 39086011000000 },
  { label: 'DGDA', level: 1, lfr: 8299629688549, plf: 9353100000000 },
  { label: 'DGI', level: 1, lfr: 19851292080412, plf: 22774225739430 },
  { label: 'DGRAD', level: 1, lfr: 5094990580669, plf: 6385812077741 },
  { label: 'Pétroliers', level: 1, lfr: 628363675470, plf: 572873182830 },
  { label: '2. TVA remboursable', level: 0, lfr: 143418567909, plf: 100691289848 },
  { label: '3. Recettes courantes après déduction de la TVA', level: 0, lfr: 33630192357454, plf: 38985319710152 },
  { label: '4. Rétrocession aux régies', level: 0, lfr: 1864308716723, plf: 2239912930253 },
  { label: '5. Recettes courantes après rétrocession', level: 0, lfr: 31765883640731, plf: 36745406779899 },
  { label: '6. Dette publique, frais financiers et redevances minières', level: 0, lfr: 5124172367829, plf: 6231200476378 },
  { label: 'Dette publique et frais financiers', level: 1, lfr: 3164709162288, plf: 3478461481381 },
  { label: '50 % des redevances minières', level: 1, lfr: 1959463205541, plf: 2752738994997 },
  { label: '7. Recettes courantes après déduction de la dette', level: 0, lfr: 26641711272902, plf: 30514206303521 },
  { label: '8. Transfert aux provinces (40 %)', level: 0, lfr: 7694540952980, plf: 7933693638915 },
  { label: 'DGDA', level: 1, lfr: 1890188648184, plf: 1998054616386 },
  { label: 'DGI', level: 1, lfr: 5201607976795, plf: 5309590769222 },
  { label: 'DGRAD', level: 1, lfr: 407951588606, plf: 477101225772 },
  { label: 'Pétroliers', level: 1, lfr: 194792739396, plf: 148947027536 },
  { label: '9. Répartition du transfert aux provinces', level: 0, lfr: 7694540952980, plf: 7933693638915 },
  { label: 'Rémunérations', level: 1, lfr: 5369621359958, plf: 5373693638915 },
  { label: 'Fonctionnement', level: 1, lfr: 923344914358, plf: 985000000000 },
  { label: 'Investissement', level: 1, lfr: 1401574678664, plf: 1575000000000 },
  { label: '10. Fonds de péréquation', level: 0, lfr: 744632995450, plf: 915426189106 },
  { label: '11. Reste à répartir (Pouvoir central)', level: 0, lfr: 18202537324472, plf: 21665086475500 },
]

// ---------------------------------------------------------------------------
// Tableau 5 (annexe) : état de l'équilibre financier et budgétaire (PLF 2027)

export const equilibrePlf2027 = {
  ressources: [
    { label: 'Recettes courantes après retenue de 40 %', montant: 32276863105435 },
    { label: 'Recettes exceptionnelles', montant: 1575500000000 },
    { label: 'Dons budgétaires', montant: 73291763667 },
    { label: 'Emprunt programme', montant: 2163446498836 },
    { label: 'Retenue de 40 % (provinces et ETD)', montant: 7933693638915 },
    { label: 'Ressources extérieures (financement des investissements)', montant: 7219161984315 },
    { label: 'Budgets annexes', montant: 179328550662 },
    { label: 'Comptes spéciaux', montant: 5508573328481 },
  ],
  emplois: [
    { label: 'Dépenses courantes du Pouvoir central', montant: 23688797516662 },
    { label: "Dépenses d'investissement et exceptionnelles", montant: 12400303851275 },
    { label: 'Transfert aux provinces et ETD (40 %)', montant: 7933693638915 },
    { label: 'Dépenses sur ressources extérieures', montant: 7219161984315 },
    { label: 'Budgets annexes', montant: 179328550662 },
    { label: 'Comptes spéciaux', montant: 5508573328481 },
  ],
  total: 56929858870310,
}

// ---------------------------------------------------------------------------
// Éléments qualitatifs (sections IV et V)

export const mesuresFiscales2027 = [
  {
    title: 'Douanes et accises',
    items: [
      'Exclusion de nouveaux secteurs de la subvention sur les produits pétroliers et droits d’accises de droit commun sur les carburants miniers.',
      'Poursuite de la taxation de l’acide sulfurique comme produit d’accise.',
      'Acquisition de scanners, ponts-bascules et spectromètres ; modernisation des postes frontaliers et interconnexion de SYDONIA.',
    ],
  },
  {
    title: 'Impôts',
    items: [
      'Impôt sur les sociétés dû par les non-résidents fournissant des services numériques.',
      'Opérationnalisation complète de la facture normalisée et des dispositifs électroniques fiscaux.',
      'Extension de la gestion de la TVA aux Centres d’impôts synthétiques ; retenue à la source sur les plus-values des personnes physiques.',
      'Recouvrement d’une partie du solde débiteur des contribuables.',
    ],
  },
  {
    title: 'Recettes non fiscales',
    items: [
      'Exportations de lithium par Manono Lithium (Tanganyika) ; hausse de la production de Kamoa Copper et de TFM.',
      'Prise en compte des sous-produits miniers ; suivi des transactions financières des sociétés de télécommunication.',
      'Recouvrement de 502,93 Mrd FC de créances relatives aux biens nationalisés.',
      'Dématérialisation de la perception (LOGIRAD, SYDONIA) et actualisation des taux des actes générateurs.',
    ],
  },
]

export const actionsPhares2027 = [
  {
    title: 'Rémunérations (15 314,5 Mrd FC · 38,1 % des recettes courantes · 4,9 % du PIB)',
    items: [
      'Recrutement de 18 000 policiers et 20 000 militaires ; amélioration salariale des services de sécurité (ANR, DGM, CNS).',
      'Prise en compte de 50 000 agents non payés du régime général et poursuite des barèmes salariaux.',
      'Recrutement de magistrats de la Cour des comptes ; primes des greffes et des magistrats civils et militaires.',
    ],
  },
  {
    title: 'Projets financés sur Eurobonds (1 217,8 Mrd FC)',
    items: [
      'Rocade de Kinshasa ; modernisation des aéroports de N’djili et de Luano.',
      'Réhabilitation de la route nationale n°4 ; barrage de Katende ; ligne électrique Inga de 330 kV.',
    ],
  },
  {
    title: 'Dépenses exceptionnelles (7 472,5 Mrd FC)',
    items: [
      'Dépenses sécuritaires : 6 614,1 Mrd FC ; élections (fichier électoral, cartographie) : 400,0 Mrd FC.',
      'Recensement et identification : 181,4 Mrd FC ; dialogue national : 142,4 Mrd FC ; sinistres et calamités : 110,0 Mrd FC.',
    ],
  },
]
