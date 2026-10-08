// Dépenses exécutées à fin juin 2026 — Rapport d'exécution du budget du pouvoir central
// au premier semestre 2026 (Document n°3), section 2.2 et tableaux 11 à 14. Montants en FC.

import { budgetSections, budgetSectionTotal } from '@/lib/budget-sections'
import { r, type RevenueTable } from '@/lib/recettes-mobilisees'

const ESB = 'DGPPB, ESB à fin juin 2026'
const toNumber = (value: string) => Number(value.replaceAll(' ', ''))
const toRate = (value: string) => Number(value.replace(',', '.'))

export const expenseTables: RevenueTable[] = [
  {
    id: 'synthese',
    tab: 'Synthèse',
    title: 'Dépenses du budget du pouvoir central à fin juin 2026',
    source: `${ESB} — section 2.2`,
    rows: [
      r(0, 'Budget général', 45420798895981, 22710399447990, 19923286390863, 87.7, 'I'),
      r(0, 'Budgets annexes', 892065836164, 446032918082, 26858500, 0.0, 'II'),
      r(0, 'Comptes spéciaux', 4553483630641, 2276741815321, 823199776009, 36.2, 'III'),
    ],
    total: { label: 'Total dépenses', vote: 50866348362786, linear: 25433174181393, real: 20746512025372, rate: 81.6 },
    notes: [
      {
        title: 'Lecture',
        tone: 'info',
        items: [
          'Les dépenses des budgets annexes ont été exécutées à hauteur de leurs recettes captées (0,027 Mrd FC), soit moins d’un pourcent de la prévision.',
          'Les dépenses des comptes spéciaux ont été exécutées à hauteur de leurs recettes (823,2 Mrd FC), soit 36,2 % de la prévision linéaire.',
        ],
      },
    ],
  },
  {
    id: 'rubriques',
    tab: 'Par rubrique',
    title: 'Dépenses du Budget général par rubrique à fin juin 2026',
    source: `${ESB} — tableau 11`,
    rows: budgetSections.map((s) =>
      r(0, s.section, toNumber(s.voted), toNumber(s.linear), toNumber(s.execution), toRate(s.rate), s.number),
    ),
    total: {
      label: 'Total Budget général',
      vote: toNumber(budgetSectionTotal.voted),
      linear: toNumber(budgetSectionTotal.linear),
      real: toNumber(budgetSectionTotal.execution),
      rate: toRate(budgetSectionTotal.rate),
    },
    notes: [
      {
        title: 'Charges communes (347,6 Mrd FC · 108,4 %)',
        tone: 'info',
        items: [
          'Communication et télécommunication ; location immobilière (baux et loyers) et satellite.',
          'Alimentation en eau et énergie électrique.',
          'Prise en charge médicale et frais funéraires des fonctionnaires et agents de l’État.',
        ],
      },
      {
        title: 'Interventions économiques, sociales, culturelles et scientifiques (738,4 Mrd FC · 125,6 %)',
        tone: 'info',
        items: [
          'Léopards football seniors — Coupe du monde FIFA 2026 : 85,6 Mrd FC.',
          'Caisse de solidarité nationale et de gestion humanitaire (stocks stratégiques) : 60,0 Mrd FC.',
          'Assemblée nationale — fonds spécial d’intervention : 21,2 Mrd FC ; MIBA (situation sociale) : 19,2 Mrd FC.',
          'FIS-RDC : 7,4 Mrd FC ; sinistrés de N’djili : 5,7 Mrd FC ; RVF — plan d’urgence basses eaux 2026 : 3,4 Mrd FC.',
        ],
      },
      {
        title: 'Rémunérations (6 369,1 Mrd FC · 93,3 %)',
        tone: 'info',
        items: [
          'Présidence : réajustement et déblocage des 582 inspecteurs des finances.',
          'Primature : prise en charge des salaires de 20 membres du cabinet du Premier ministre.',
          'Affaires étrangères : paie complémentaire de 1 234 diplomates ; Coopération internationale : 1 435 agents du secteur diplomatique.',
          'Régularisations au Secrétariat général du Gouvernement, à l’EDU-NC et à l’ESU.',
        ],
      },
      {
        title: 'Points de vigilance',
        tone: 'negative',
        items: [
          'Surconsommation des crédits de fonctionnement des institutions (167,5 %) et des ministères (217,1 %).',
          'Faible exécution des dépenses exceptionnelles (15,8 %), des frais financiers (11,2 %) et des transferts d’investissement aux provinces et ETD (19,1 %).',
        ],
      },
    ],
  },
  {
    id: 'exceptionnelles',
    tab: 'Dépenses exceptionnelles',
    title: 'Dépenses exceptionnelles sur ressources propres à fin juin 2026',
    source: `${ESB} — tableau 12`,
    rows: [
      r(0, 'Intérieur, sécurité, décentralisation et affaires coutumières', 1071333935923, 535666967962, 29015723780, 5.4, '25'),
      r(1, 'Frais secrets de recherche', 127753399793, 63876699896, 0, 0.0, '56183'),
      r(2, 'Dépenses sécuritaires', 127753399793, 63876699896, 0, 0.0),
      r(1, "Fonds spécial d'intervention", 943580536131, 471790268065, 29015723780, 6.2, '66431'),
      r(2, 'Dépenses sécuritaires', 902869286131, 451434643065, 20795582583, 4.6),
      r(2, "Opérations d'identification de la population", 40711250000, 20355625000, 8220141197, 40.4),
      r(0, 'Défense et anciens combattants', 6430492674035, 3215246337017, 538016366148, 16.7, '27'),
      r(1, 'Frais secrets de recherche', 5510840450942, 2755420225471, 163295971019, 5.9, '56183'),
      r(2, 'Dépenses sécuritaires', 5510840450942, 2755420225471, 163295971019, 5.9),
      r(1, "Fonds spécial d'intervention", 919652223093, 459826111546, 374720395129, 81.5, '66431'),
      r(2, 'Dépenses sécuritaires', 419652223092, 209826111546, 0, 0.0),
      r(2, 'Dotation FSD-FARDC', 500000000000, 250000000000, 374720395129, 149.9),
      r(2, 'Dépenses sécuritaires', 43966000000, 21983000000, 0, 0.0),
      r(0, 'Actions humanitaires et solidarité nationale', 107500000000, 53750000000, 39734389647, 73.9, '70'),
      r(1, 'Interventions catastrophes naturelles, calamités', 107500000000, 53750000000, 39734389647, 73.9, '66432'),
      r(2, 'Réserve pour sinistres et calamités', 77500000000, 38750000000, 39734389647, 102.5),
      r(2, 'Sans projet', 30000000000, 15000000000, 0, 0.0),
      r(0, 'Commission électorale nationale indépendante', 175000000000, 87500000000, 42766916000, 48.9, '77'),
      r(1, "Fonds spécial d'intervention", 175000000000, 87500000000, 42766916000, 48.9, '66431'),
      r(2, 'Opérations électorales', 175000000000, 87500000000, 42766916000, 48.9),
    ],
    total: { label: 'Total dépenses exceptionnelles', vote: 8238350270228, linear: 4119175135114, real: 649533395576, rate: 15.8 },
    notes: [
      {
        title: 'Utilisation des crédits',
        tone: 'info',
        items: [
          'Paiement des factures spécifiques pour le renforcement de la sécurité.',
          'Paiement de la prime de guerre des militaires et policiers dans les zones d’opérations.',
          'Recrutement et formation urgente des militaires.',
          'Prise en charge des populations fuyant la guerre à l’Est du pays.',
        ],
      },
    ],
  },
  {
    id: 'dette',
    tab: 'Dette et frais financiers',
    title: 'Dépenses de la dette publique et des frais financiers à fin juin 2026',
    source: `${ESB} — tableau 13`,
    rows: [
      r(0, 'Dette publique', 2011321662288, 1005660831144, 468321195259, 46.6, '1'),
      r(1, 'Dette extérieure', 811321662288, 405660831144, 392616612569, 96.8, '1162'),
      r(2, 'Club de Paris', 15361228785, 7680614392, 0, 0.0, '11621'),
      r(2, 'Club de Kinshasa', 420049707569, 210024853784, 116743636690, 55.6, '11623'),
      r(2, 'Dette multilatérale', 375910725935, 187955362967, 275872975879, 146.8, '11624'),
      r(1, 'Dette intérieure', 1200000000000, 600000000000, 75704582689, 12.6, '1171'),
      r(2, 'Dette sociale', 695089046369, 347544523185, 18730554267, 5.4, '11711'),
      r(2, 'Dette commerciale', 469087260386, 234543630193, 56974028423, 24.3, '11712'),
      r(2, 'Dette financière', 35823693245, 17911846623, 0, 0.0, '11713'),
      r(0, 'Frais financiers', 1153387500000, 576693750000, 64342462192, 11.2, '2'),
      r(1, 'Intérêts sur la dette intérieure', 788000000000, 394000000000, 0, 0.0, '2671'),
      r(2, 'Intérêts sur la dette financière intérieure', 302589154140, 151294577070, 0, 0.0, '26711'),
      r(2, 'Intérêts moratoires', 175118342180, 87559171090, 0, 0.0, '26712'),
      r(2, 'Intérêts titrisés', 310292503680, 155146251840, 0, 0.0, '26713'),
      r(1, 'Intérêts sur la dette extérieure', 365387500000, 182693750000, 64342462192, 35.2, '2672'),
      r(2, 'Intérêts sur Club de Paris', 110703961, 55351981, 0, 0.0, '26721'),
      r(2, 'Intérêts sur Club de Kinshasa', 128924098588, 64462049294, 11983550204, 18.6, '26723'),
      r(2, 'Intérêts sur la dette multilatérale', 236352697450, 118176348725, 52358911988, 44.3, '26724'),
    ],
    total: { label: 'Total dette et frais financiers', vote: 3164709162288, linear: 1582354581144, real: 532663657451, rate: 33.7 },
    notes: [
      {
        title: 'Lecture',
        tone: 'info',
        items: [
          'Dette extérieure payée : 392,6 Mrd FC, dont Club de Kinshasa 116,7 Mrd FC et dette multilatérale 275,9 Mrd FC.',
          'Dette intérieure payée : 75,7 Mrd FC, dont dette commerciale 56,9 Mrd FC et dette sociale 18,7 Mrd FC.',
          'Les frais financiers payés (64,3 Mrd FC) portent essentiellement sur les intérêts de la dette extérieure.',
        ],
      },
    ],
  },
  {
    id: 'investissements',
    tab: 'Investissements',
    title: 'Exécution des investissements sur ressources propres à fin juin 2026',
    source: 'DGPPB, à fin juin 2026 — tableau 14',
    rows: [
      r(0, 'Présidence de la République', 35338033236, 17669016618, 77099207086, 436.4, '10'),
      r(0, 'Intérieur, sécurité, décentralisation et affaires coutumières', 85280925847, 42640462924, 3996885810, 9.4, '25'),
      r(0, 'Défense et anciens combattants', 114636229305, 57318114653, 19397871347, 33.8, '27'),
      r(0, 'Finances', 18159027950, 9079513975, 318844466, 3.5, '30'),
      r(0, 'Budget', 28695348705, 14347674352, 560163204, 3.9, '31'),
      r(0, 'Santé publique, hygiène et prévoyance sociale', 115414913071, 57707456536, 19565864070, 33.9, '37'),
      r(0, 'Enseignement supérieur et universitaire, recherche scientifique et innovation', 21068023834, 10534011917, 75060836530, 712.6, '40'),
      r(0, 'Infrastructures et travaux publics', 213951844021, 106975922011, 267464267438, 250.0, '42'),
      r(0, 'Ressources hydrauliques et électricité', 234731934807, 117365967404, 19245112200, 16.4, '50'),
      r(0, 'Transports, voies de communication et désenclavement', 292843505740, 146421752870, 294695170586, 201.3, '51'),
    ],
    total: { label: 'Total investissements sur ressources propres', vote: 1972457425623, linear: 986228712812, real: 777404222738, rate: 78.8 },
    notes: [
      {
        title: 'Principaux projets sur ressources propres',
        tone: 'info',
        items: [
          'Nouvelle aérogare de l’aéroport international de N’djili : 213,8 Mrd FC.',
          'Programme d’urgence de la ville de Kinshasa et lutte anti-érosion (voiries OVD) : 211,0 Mrd FC.',
          'Construction de douze universités modernes : 74,8 Mrd FC.',
          'Aérogare et infrastructures aéroportuaires de Lubumbashi : 64,2 Mrd FC ; avenue Kulumba : 21,1 Mrd FC.',
        ],
      },
      {
        title: 'Investissements sur ressources extérieures (4 499,3 Mrd FC · 220,8 %)',
        tone: 'info',
        items: [
          'Projet multisectoriel de nutrition et de santé (PMNS) : 215,5 Mrd FC.',
          'Unis pour des paysages durables : 110,1 Mrd FC.',
          'Kin Elenda (PDMRUK) : 82,3 Mrd FC ; PASEA phase 1 : 65,7 Mrd FC.',
          'Unis pour l’éducation : 36,3 Mrd FC.',
        ],
      },
    ],
  },
]
