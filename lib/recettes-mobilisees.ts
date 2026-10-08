// Recettes mobilisées à fin juin 2026 — Rapport d'exécution du budget du pouvoir central
// au premier semestre 2026 (Document n°3), tableaux 3 à 10. Montants en FC.

export type RevenueRow = {
  label: string
  code?: string
  /** Profondeur dans la hiérarchie (0 = rubrique principale). */
  level: number
  vote: number | null
  linear: number | null
  real: number | null
  /** Taux de réalisation tel que publié dans le rapport (en %). */
  rate: number | null
}

export type RevenueTable = {
  id: string
  tab: string
  title: string
  source: string
  rows: RevenueRow[]
  total: Omit<RevenueRow, 'level' | 'code'>
  notes?: { title: string; tone: 'positive' | 'negative' | 'info'; items: string[] }[]
}

export const r = (
  level: number,
  label: string,
  vote: number | null,
  linear: number | null,
  real: number | null,
  rate: number | null,
  code?: string,
): RevenueRow => ({ level, label, vote, linear, real, rate, code })

const SOURCE = 'Canevas des recettes, DGPPB, juin 2026'

export const revenueTables: RevenueTable[] = [
  {
    id: 'synthese',
    tab: 'Synthèse',
    title: 'Recettes du budget du pouvoir central à fin juin 2026',
    source: `${SOURCE} — tableau 3`,
    rows: [
      r(0, 'Budget général', 45420798895981, 22710399447991, 21652889223797, 95.3, 'I'),
      r(1, 'Recettes internes', 37078609152375, 18539304576188, 15949706769688, 86.0, 'I.1'),
      r(2, 'Recettes courantes', 34819169455276, 17409584727638, 14655403749688, 84.2, 'A'),
      r(3, 'Recettes des Douanes et Accises (DGDA)', 8299629688549, 4149814844274, 3770473651300, 90.9),
      r(3, 'Recettes des Impôts (DGI) hors pétroliers producteurs', 19851292080412, 9925646040206, 8165347509595, 82.3),
      r(3, 'Recettes non fiscales', 6039884010845, 3019942005422, 2549880034473, 84.4),
      r(4, 'DGRAD hors pétroliers', 5094990580669, 2547495290334, 2509851034473, 98.5),
      r(4, 'Autres recettes non fiscales', 944893430176, 472446715088, 40029000000, 8.5),
      r(5, 'Royalties (contrat chinois)', 749893430176, 374946715088, 0, 0.0),
      r(5, 'Autres recettes', 195000000000, 97500000000, 40029000000, 41.1),
      r(3, 'Pétroliers producteurs', 628363675470, 314181837735, 169702554319, 54.0),
      r(4, 'DGI', 248707919588, 124353959794, 65077347139, 52.3),
      r(4, 'DGRAD', 379655755882, 189827877941, 104625207180, 55.1),
      r(2, 'Recettes exceptionnelles', 2259439697099, 1129719848550, 1281426000000, 113.4, 'B'),
      r(2, 'Fonds de concours pour la guerre', null, null, 12877000000, null, 'C'),
      r(1, 'Recettes extérieures', 8342189743606, 4171094871803, 5703182454109, 136.7, 'I.2'),
      r(2, "Recettes extérieures d'appuis budgétaires", 2762406885671, 1381203442836, 1203843510815, 87.2),
      r(3, 'Emprunt programme', 2558234512390, 1279117256195, 1100046510815, 86.0),
      r(3, 'Dons budgétaires', 204172373281, 102086186641, 103797000000, 101.7),
      r(2, 'Recettes extérieures de financement des investissements', 5579782857935, 2789891428968, 4499338943294, 161.3),
      r(3, 'Dons projets', 1718850258921, 859425129461, 2138205056492, 248.8),
      r(3, 'Emprunts projets', 2356516766870, 1178258383435, 2045356008136, 173.6),
      r(3, 'Eurobond', 1504415832144, 752207916072, 315777878666, 42.0),
      r(0, 'Budgets annexes', 892065836164, 446032918082, 26858500, 0.0, 'II'),
      r(0, 'Comptes spéciaux', 4553483630641, 2276741815321, 823199776009, 36.2, 'III'),
    ],
    total: { label: 'Total recettes', vote: 50866348362786, linear: 25433174181393, real: 22476115858306, rate: 88.4 },
  },
  {
    id: 'dgda',
    tab: 'Douanes et accises',
    title: 'Recettes des douanes et accises (DGDA) à fin juin 2026',
    source: `${SOURCE} — tableau 4`,
    rows: [
      r(0, 'Impôts généraux sur les biens et services (TVA à l’importation)', 2866054955571, 1433027477785, 1426549877097, 99.5, 'I'),
      r(0, "Droits d'accises", 2832310336256, 1416155168128, 1019966112530, 72.0, 'II'),
      r(1, 'Intérieur', 1964973185642, 982486592821, 800432916428, 81.5),
      r(1, 'Importation', 867337150614, 433668575307, 219533196102, 50.6),
      // Prévision linéaire alignée sur le texte et le graphique 2 du rapport (1 260,5 Mrd FC).
      r(0, "Droits de douane et autres droits à l'importation", 2520986267346, 1260493133673, 1293176618354, 102.6, 'III'),
      r(1, 'Droit de douane', 2520973690676, 1260486845338, 1292850591954, 102.6),
      r(1, "Autres droits à l'importation", 12576670, 6288335, 326026400, null),
      r(0, "Taxes à l'exportation", 35556767072, 17778383536, 9083591991, 51.1, 'IV'),
      r(1, 'Droits de sortie minerais', 1747347315, 873673657, 520949239, 59.6),
      r(1, 'Droits de sortie des produits agricoles et végétaux', 33809419757, 16904709878, 8562642751, 50.7),
      r(0, 'Amendes et pénalités', 44721362305, 22360681152, 21697911329, 97.0, 'V'),
    ],
    total: { label: 'Total DGDA', vote: 8299629688549, linear: 4149814844274, real: 3770473671300, rate: 90.9 },
    notes: [
      {
        title: 'Facteurs favorables',
        tone: 'positive',
        items: [
          "Apport des mesures portant sur l'exclusion de la subvention pétrolière dans le secteur minier.",
          "Imposition de l'acide sulfurique aux droits d'accises.",
          'Effort de service impulsé par les contrats de performance entre la Direction générale et les Directions provinciales.',
        ],
      },
      {
        title: 'Facteurs défavorables',
        tone: 'negative',
        items: [
          'Non application de l’exclusion de la subvention pétrolière dans les secteurs brassicole, télécommunication et forestier.',
          "Non imposition aux droits d'accises, aux taux de droit commun, des carburants importés par les miniers et leurs sous-traitants.",
          'Promulgation tardive de la loi de finances rectificative et de ses nouveaux taux.',
        ],
      },
    ],
  },
  {
    id: 'dgi',
    tab: 'Impôts',
    title: 'Recettes des impôts (DGI) hors pétroliers producteurs à fin juin 2026',
    source: `${SOURCE} — tableau 5`,
    rows: [
      r(0, 'Impôts sur les revenus des personnes physiques', 3538920710953, 1769460355476, 724782277632, 41.0, 'I'),
      r(1, 'IRPP revenus salariaux et assimilés', 2917092221919, 1458546110960, 677229420032, 46.4),
      r(1, 'IRPP au titre de revenu des capitaux mobiliers', 616923847357, 308461923678, 47221226166, 15.3),
      r(1, 'IRPP au titre de plus-values réalisées par les personnes physiques', 1885688090, 942844045, 8997181, 1.0),
      r(1, 'IRPP personnel domestique et des microentreprises', 444060000, 222030000, 0, 0.0),
      r(1, 'IRPP sur les bénéfices / régime réel', 2574893587, 1287446793, 185245024, 14.4),
      r(1, 'IRPP sur les bénéfices des entreprises de petite taille', 0, 0, 137389228, null),
      r(0, 'Prélèvements', 1029443794136, 514721897068, 232546487476, 45.2, 'II'),
      r(1, 'PEEEPE (entreprises employant un personnel expatrié)', 565934958072, 282967479036, 68277878854, 24.1),
      r(1, 'PSPPNR (prestataires de services non-résidents)', 301160455180, 150580227590, 79469168126, 52.8),
      r(1, 'PSRCMVPNR (revenus des capitaux mobiliers versés à des non-résidents)', 162348380883, 81174190442, 84799440497, 104.5),
      r(0, 'Impôts sur les sociétés et autres revenus des sociétés', 4903064506864, 2451532253432, 968608757829, 39.5, 'III'),
      r(1, 'IS des grandes et moyennes entreprises non pétrolières de production', 4432711215528, 2216355607764, 343782476746, 15.5),
      r(1, 'Impôt spécial sur les profits excédentaires (ISPE)', 470353291337, 235176645668, 624826281083, 265.7),
      r(0, 'Impôts et taxes sur les biens et services', 6355259685379, 3177629842689, 1901257374760, 59.8, 'IV'),
      r(1, 'Taxe sur la valeur ajoutée', 6355259685379, 3177629842689, 1901257374760, 59.8),
      r(0, 'Autres recettes', 564237778702, 282118889351, 160219792786, 56.8, 'V'),
      r(1, 'Immatriculations des véhicules', 5151657875, 2575828938, 1759827442, 68.3),
      r(1, 'Vente des imprimés', 862839250, 431419625, 998014465, 231.3),
      r(1, 'Amendes et pénalités', 558223281577, 279111640788, 157461950879, 56.4),
      r(0, 'Sous-total (I + II + III + IV + V)', 16390926476034, 8195463238017, 3987405693302, 48.7),
      r(0, 'Recettes des impôts cédulaires / revenu 2025 et résiduelles', 3460365604378, 1730182802189, 4177941816293, 241.5),
      r(1, 'Impôts sur les rémunérations', 569404997152, 284702498576, 659543856807, 231.7),
      r(1, 'Impôts sur les bénéfices et profits et sur les revenus des capitaux mobiliers', 2890960607226, 1445480303613, 3518397959485, 243.4),
    ],
    total: { label: 'Total DGI hors pétroliers producteurs', vote: 19851292080412, linear: 9925646040206, real: 8165347509595, rate: 82.3 },
    notes: [
      {
        title: 'Facteurs défavorables',
        tone: 'negative',
        items: [
          'Écart considérable entre les attentes au titre de la TVA et les recettes réelles, lié aux difficultés d’implémentation de la facture normalisée.',
          'Impact négatif de l’appréciation brusque du franc congolais enregistrée en fin d’année 2025.',
        ],
      },
    ],
  },
  {
    id: 'dgrad',
    tab: 'Non fiscales (DGRAD)',
    title: 'Recettes de la DGRAD hors pétroliers producteurs à fin juin 2026',
    source: `${SOURCE} — tableau 6`,
    rows: [
      r(0, 'Recettes administratives', 1640336709946, 820168354973, 599476842877, 73.1, 'I'),
      r(1, 'Affaires étrangères', 54330159780, 27165079890, 8706076453, 32.0, '22'),
      r(1, 'Intérieur et sécurité', 5564919616, 2617378007, 840969027, 32.1, '25.a'),
      r(1, 'Intérieur / relation avec les partis politiques', 995950800, 497975400, 366123455, 73.5, '25.b'),
      r(1, 'Économie nationale', 12195880157, 6097940079, 930078543, 15.3, '29'),
      r(1, 'Finances', 47222398548, 23611199274, 19326881617, 81.9, '30'),
      r(1, 'Budget', 1872196008, 936098004, 415562470, 44.4, '31'),
      r(1, 'Plan', 118739314, 59369657, 33758048, 56.9, '32'),
      r(1, 'Santé publique', 414173085183, 207086542592, 162655657228, 78.5, '37'),
      r(1, 'Enseignement supérieur et universitaire', 16208392046, 8104196023, 1381413706, 17.0, '40'),
      r(1, 'Recherche scientifique et innovation technologique', 12795196, 6397598, 13521050, 211.3, '41'),
      r(1, 'Infrastructures et travaux publics', 3471461526, 1735730763, 1055265639, 60.8, '42'),
      r(1, 'Agriculture', 53553346736, 26776673368, 13475961892, 50.3, '44'),
      r(1, 'Industrie', 45161940861, 22580970431, 11693895517, 51.8, '46'),
      r(1, 'Commerce extérieur', 112294530904, 56147265452, 45019578330, 80.2, '47'),
      r(1, 'Ressources hydrauliques et électricité', 44815306993, 22407653496, 28631957922, 127.8, '50'),
      r(1, 'Transports et voies de communication', 111834877704, 55917438852, 18193393485, 32.5, '51'),
      r(1, 'Autorité de régulation des PTT', 152719728158, 76359864079, 95802755679, 125.5, '52'),
      r(1, 'Postes, téléphones et nouvelles technologies de l’information et de la communication', 401247063772, 200623531886, 126027741873, 62.8, '52'),
      r(1, 'Communication et médias', 1974396648, 987198324, 618195908, 62.6, '53'),
      r(1, 'Tourisme', 5282823943, 2641411972, 800866171, 30.3, '57'),
      r(1, 'Culture et arts', 5160959050, 2580479525, 1187253369, 46.0, '58'),
      r(1, 'Sports et loisirs', 2961596093, 1480798046, 1674822248, 113.1, '60'),
      r(1, 'Emploi et travail', 88295022934, 44147511467, 37413808666, 84.7, '62'),
      r(1, 'Prévoyance sociale', 1172202654, 586101327, 66829247, 11.4, '63'),
      r(1, 'Affaires sociales', null, null, 22375496, null, '64'),
      r(1, 'Pêche et élevage', 7151433523, 3575716761, 1872149001, 52.4, '82'),
      r(1, 'Direction générale de migration (DGM)', 50422478125, 25211239063, 21249950836, 84.3, '86'),
      r(1, 'Entrepreneuriat, petites et moyennes entreprises', 453187276, 226593638, 0, 0.0, '90'),
      r(0, 'Recettes judiciaires', 179232825287, 89616412643, 36872496192, 41.1, 'II'),
      r(1, 'Chancellerie des ordres nationaux', 558262682, 279131341, 793868289, 284.4, '15'),
      r(1, 'Justice, garde des sceaux et droits humains', 25734402410, 12867201205, 1863107403, 14.5, '34'),
      r(1, 'Police nationale', 114369860195, 57184930097, 22632988281, 39.6, '85'),
      r(1, 'Cours, tribunaux et parquets', 38570300000, 19285150000, 11582532219, 60.1, '87'),
      r(0, 'Recettes domaniales', 2852142295690, 1426071147845, 1349829122725, 94.7, 'III'),
      r(1, 'Défense nationale', 7308756000, 3654378000, 1559316406, 42.7, '27'),
      r(1, 'Urbanisme et habitat', 38196349745, 19098174873, 10941216931, 57.3, '43'),
      r(1, 'Mines', 2146303924495, 1073151962248, 953362831063, 88.8, '48'),
      r(1, 'Hydrocarbures', 40273527545, 20136763773, 25843311982, 128.3, '49'),
      r(1, 'Affaires foncières', 130530876885, 65265438442, 49426508946, 75.7, '55'),
      r(1, 'Environnement et développement durable', 489528861020, 244764430510, 308695937397, 126.1, '56'),
      r(0, 'Recettes de participations', 423278749747, 211639374873, 523672572680, 247.4, 'IV'),
      r(1, 'Portefeuille', 423278749747, 211639374873, 523672572680, 247.4, '74'),
    ],
    total: { label: 'Total DGRAD hors pétroliers', vote: 5094990580669, linear: 2547495290335, real: 2509851034473, rate: 98.5 },
    notes: [
      {
        title: 'Facteurs favorables',
        tone: 'positive',
        items: [
          'Paiement en juin de la redevance minière par les opérateurs n’ayant pas utilisé leurs quotas d’exportation de cobalt (communiqué ARECOMS n°2026/003).',
          'Paiement des dividendes par les sociétés minières d’exploitation.',
          'Paiement par TFM de 225,6 Mrd FC (quotité de 25 % du pas de porte, royalties, prime de cession et redevance supplémentaire).',
          'Échéances de paiement des droits, taxes et redevances de certains secteurs ; résultats des missions de contrôle mixte de 2025.',
        ],
      },
      {
        title: 'Difficultés rencontrées',
        tone: 'negative',
        items: [
          'Création de Fonds spéciaux sous forme d’établissements publics bénéficiant des quotités des recettes non fiscales.',
          'Retard de configuration dans SYDONIA des arrêtés interministériels (Santé publique, Agriculture, Pêche et Élevage).',
        ],
      },
    ],
  },
  {
    id: 'petroliers',
    tab: 'Pétroliers producteurs',
    title: 'Recettes des pétroliers producteurs à fin juin 2026',
    source: `${SOURCE} — tableau 7`,
    rows: [
      r(0, 'DGI', 248707919588, 124353959794, 65077347139, 52.3, 'I'),
      r(1, 'Pétroliers / Régime IS', 186151232667, 93075616333, 29604578507, 31.8),
      r(1, 'Pétroliers / Impôts cédulaires (recettes résiduelles)', 62556686922, 31278343461, 35472768631, 133.4),
      r(0, 'DGRAD', 379655755882, 189827877941, 104625207180, 55.1, 'II'),
      r(1, 'Hydrocarbures — loyers', 263689644644, 131844822322, 85058103690, 64.5, 'a'),
      r(2, 'Marge distribuable', 184793973989, 92396986995, 65007619468, 70.4),
      r(2, 'Royalties des sociétés pétrolières (PERENCO-REP)', 78895670655, 39447835328, 20050484222, 50.8),
      r(1, 'Portefeuille — dividendes des pétroliers producteurs', 115966111238, 57983055619, 19567103490, 33.7, 'b'),
      r(2, 'Dividendes on shore', 40986858633, 20493429317, 0, 0.0),
      r(2, 'Participations off shore', 74979252605, 37489626303, 19567103490, 52.2),
    ],
    total: { label: 'Total pétroliers producteurs', vote: 628363675470, linear: 314181837735, real: 169702554319, rate: 54.0 },
    notes: [
      {
        title: 'Facteurs défavorables',
        tone: 'negative',
        items: [
          'Chute du cours du baril de Brent sur le marché international.',
          'Baisse de la production de pétrole brut liée à l’épuisement des gisements.',
          'Hausse des charges d’exploitation corollaire à la diminution de la production.',
        ],
      },
    ],
  },
  {
    id: 'exterieures',
    tab: 'Recettes extérieures',
    title: 'Recettes extérieures à fin juin 2026',
    source: `${SOURCE} — tableau 8`,
    rows: [
      r(0, "Recettes extérieures d'appui budgétaire", 2762406885671, 1381203442836, 1203843510815, 87.2),
      r(1, 'Emprunt programme', 2558234512390, 1279117256195, 1100046510815, 86.0),
      r(2, 'Banque mondiale', 469079412390, 234539706195, 0, 0.0),
      r(2, 'FMI (FEC)', 581000000000, 290500000000, 814896821940, 280.5),
      r(2, 'FMI (RST)', 605155100000, 302577550000, 0, 0.0),
      r(2, 'FRD', 903000000000, 451500000000, 285149688875, 63.2),
      r(1, 'Dons budgétaires', 204172373281, 102086186641, 103797000000, 101.7),
      r(2, 'Banque mondiale', 204172373281, 102086186641, 103797000000, 101.7),
      r(0, 'Recettes extérieures de financement des investissements', 5579782857935, 2789891428968, 4499338943294, 161.3),
      r(1, 'Dons projets', 1718850258921, 859425129461, 2138205056492, 248.8),
      r(2, 'Banque mondiale', 1152331500046, 576165750023, 1529800604725, 265.5),
      r(2, 'Banque africaine de développement', 131970294145, 65985147073, 63412390000, 96.1),
      r(2, 'Union européenne', 400565363950, 200282681975, 497935130926, 248.6),
      r(2, 'France', null, null, 21439545760, null),
      r(2, 'GAVI', 33983100780, 16991550390, 17123434421, 100.8),
      r(2, 'Fonds international pour le développement agricole (FIDA)', null, null, 8493950660, null),
      r(1, 'Emprunts projets', 2356516766870, 1178258383435, 2045356008136, 173.6),
      r(2, 'Banque mondiale', 1700950700593, 850475350297, 1622440390160, 190.8),
      r(2, 'Banque africaine de développement', 409550441392, 204775220696, 155384040398, 75.9),
      r(2, 'Inde', null, null, 1043374128, null),
      r(2, 'Organisation des pays exportateurs de pétrole', null, null, 6256771457, null),
      r(2, 'OFID', null, null, 14571002482, null),
      r(2, 'BADEA', 100270040760, 50135020380, 0, 0.0),
      r(2, 'Chine', 145745584125, 72872792063, 0, 0.0),
      r(2, 'AFREXIMBANK', null, null, 124391987668, null),
      r(2, 'EXIMBANK of India', null, null, 2396951015, null),
      r(2, 'GEMCORP', null, null, 118871490828, null),
      r(1, 'Eurobond', 1504415832144, 752207916072, 315777878666, 42.0),
    ],
    total: { label: 'Total recettes extérieures', vote: 8342189743606, linear: 4171094871803, real: 5703182454109, rate: 136.7 },
  },
  {
    id: 'budgets-annexes',
    tab: 'Budgets annexes',
    title: 'Recettes des budgets annexes à fin juin 2026',
    source: 'DGPPB — tableau 9',
    rows: [
      r(0, 'Recettes des universités et instituts supérieurs', 415620587585, 207810293792, null, null),
      r(0, 'Recettes des hôpitaux généraux de référence', 314669241939, 157334620969, null, null),
      r(0, 'Budgets annexes reclassés', 161776006641, 80888003320, 26858500, 0.0),
    ],
    total: { label: 'Total budgets annexes', vote: 892065836164, linear: 446032918082, real: 26858500, rate: 0.0 },
    notes: [
      {
        title: 'Remontée des statistiques',
        tone: 'negative',
        items: ['Seules les statistiques du Centre culturel Le Zoo (budget annexe reclassé) ont pu être captées à fin juin 2026, à hauteur de 0,027 Mrd FC.'],
      },
    ],
  },
  {
    id: 'comptes-speciaux',
    tab: 'Comptes spéciaux',
    title: 'Recettes des comptes spéciaux à fin juin 2026',
    source: `${SOURCE} — tableau 10`,
    rows: [
      r(0, "Fonds national d'entretien routier (FONER)", 447990157908, 223995078954, 257061625812, 114.8, '1'),
      r(0, "Fonds de promotion de l'éducation et de la formation (FPEF)", 15205515987, 7602757993, 1827930431, 24.0, '2'),
      r(0, 'Fonds de promotion culturelle (FPC)', 23783628168, 11891814084, 7633060338, 64.2, '3'),
      r(0, "Fonds de promotion de l'industrie (FPI)", 1700056257399, 850028128699, 0, 0.0, '4'),
      r(0, 'Régie des voies aériennes (RVA) — Go-Pass', 104755153638, 52377576819, 0, 0.0, '5'),
      r(0, 'Fonds de promotion du tourisme (FPT)', 89388074213, 44694037106, 0, 0.0, '6'),
      r(0, 'Fonds forestier national (FFN)', 30904796859, 15452398429, 9331843230, 60.4, '7'),
      r(0, 'Fonds minier des générations futures (FOMIN)', 268159026606, 134079513303, 152283106933, 113.6, '8'),
      r(0, 'Fonds de soutien et de développement des FARDC et services de sécurité (FSD-FARDC)', 532435946003, 266217973001, 0, 0.0, '9'),
      r(0, 'Fonds national de réparation des victimes de violences sexuelles (FONAREV)', 632333652898, 316166826449, 209389272033, 66.2, '10'),
      r(0, "Fonds d'intervention pour l'environnement", 104488020901, 52244010451, 2011378940, 3.8, '11'),
      r(0, "Fonds d'investissement stratégique de la RDC (FIS-RDC)", 201921555575, 100960777788, 183661558290, 181.9, '12'),
      r(0, 'Fonds de développement du service universel (FDSU)', 32011844487, 16005922243, null, null, '13'),
      r(0, 'Fonds de promotion de la santé (FPS)', 370050000000, 185025000000, null, null),
    ],
    total: { label: 'Total comptes spéciaux', vote: 4553483630641, linear: 2276741815321, real: 823199776009, rate: 36.2 },
  },
]
