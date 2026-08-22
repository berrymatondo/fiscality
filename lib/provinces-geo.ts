export type SubdivisionType = 'Ville' | 'Territoire'

export type Subdivision = {
  nom: string
  type: SubdivisionType
  taux: number
  communes: string[]
  /** Zone affectée par le conflit armé dans l'Est de la RDC — données d'exécution indisponibles. */
  indisponible?: boolean
}

export type ProvinceGeo = {
  nom: string
  taux: number
  subdivisions: Subdivision[]
}

/**
 * Variation déterministe (et non aléatoire) du taux d'exécution provincial pour chaque
 * subdivision, afin d'éviter d'afficher partout la même valeur.
 */
function subTaux(base: number, index: number): number {
  const offset = ((index % 5) - 2) * 4
  return Math.min(95, Math.max(5, base + offset))
}

/** Kinshasa est la seule entrée dont les communes sont les vraies communes officielles. */
const KINSHASA_COMMUNES = [
  'Gombe',
  'Kalamu',
  'Kasa-Vubu',
  'Lemba',
  'Limete',
  'Ngaliema',
  'Bandalungwa',
  'Kintambo',
  'Kimbanseke',
  'Masina',
  'Ndjili',
  'Mont Ngafula',
]

/**
 * Pour les autres provinces, les communes affichées sous chaque territoire/ville sont des
 * découpages génériques de démonstration (le modèle de données ne descend pas au niveau
 * commune) — cohérent avec le reste de cette page, déjà signalée « Données de démonstration ».
 */
function demoCommunes(nom: string): string[] {
  return [`${nom} - Commune Centre`, `${nom} - Commune Nord`, `${nom} - Commune Sud`]
}

function buildSubdivisions(
  entries: [string, SubdivisionType][],
  baseTaux: number,
): Subdivision[] {
  return entries.map(([nom, type], index) => ({
    nom,
    type,
    taux: subTaux(baseTaux, index),
    communes: demoCommunes(nom),
  }))
}

export const PROVINCES_GEO: ProvinceGeo[] = [
  {
    nom: 'Bas-Uélé',
    taux: 24,
    subdivisions: buildSubdivisions(
      [['Buta', 'Ville'], ['Ango', 'Territoire'], ['Aketi', 'Territoire'], ['Bambesa', 'Territoire'], ['Bondo', 'Territoire'], ['Poko', 'Territoire']],
      24,
    ),
  },
  {
    nom: 'Équateur',
    taux: 18,
    subdivisions: buildSubdivisions(
      [['Mbandaka', 'Ville'], ['Bikoro', 'Territoire'], ['Bomongo', 'Territoire'], ['Ingende', 'Territoire'], ['Lukolela', 'Territoire'], ['Makanza', 'Territoire']],
      18,
    ),
  },
  {
    nom: 'Haut-Katanga',
    taux: 48,
    subdivisions: buildSubdivisions(
      [['Lubumbashi', 'Ville'], ['Kambove', 'Territoire'], ['Kasenga', 'Territoire'], ['Kipushi', 'Territoire'], ['Mitwaba', 'Territoire'], ['Pweto', 'Territoire'], ['Sakania', 'Territoire']],
      48,
    ),
  },
  {
    nom: 'Haut-Lomami',
    taux: 29,
    subdivisions: buildSubdivisions(
      [['Kamina', 'Ville'], ['Bukama', 'Territoire'], ['Kabongo', 'Territoire'], ['Kaniama', 'Territoire'], ['Malemba-Nkulu', 'Territoire']],
      29,
    ),
  },
  {
    nom: 'Haut-Uélé',
    taux: 21,
    subdivisions: buildSubdivisions(
      [['Isiro', 'Ville'], ['Dungu', 'Territoire'], ['Faradje', 'Territoire'], ['Niangara', 'Territoire'], ['Rungu', 'Territoire'], ['Wamba', 'Territoire'], ['Watsa', 'Territoire']],
      21,
    ),
  },
  {
    nom: 'Ituri',
    taux: 26,
    subdivisions: buildSubdivisions(
      [['Bunia', 'Ville'], ['Aru', 'Territoire'], ['Djugu', 'Territoire'], ['Irumu', 'Territoire'], ['Mahagi', 'Territoire'], ['Mambasa', 'Territoire']],
      26,
    ),
  },
  {
    nom: 'Kasaï',
    taux: 22,
    subdivisions: buildSubdivisions(
      [['Tshikapa', 'Ville'], ['Dekese', 'Territoire'], ['Ilebo', 'Territoire'], ['Kamonia', 'Territoire'], ['Luebo', 'Territoire'], ['Mweka', 'Territoire']],
      22,
    ),
  },
  {
    nom: 'Kasaï-Central',
    taux: 30,
    subdivisions: buildSubdivisions(
      [['Kananga', 'Ville'], ['Demba', 'Territoire'], ['Dibaya', 'Territoire'], ['Dimbelenge', 'Territoire'], ['Kazumba', 'Territoire'], ['Luiza', 'Territoire']],
      30,
    ),
  },
  {
    nom: 'Kasaï-Oriental',
    taux: 35,
    subdivisions: buildSubdivisions(
      [['Mbuji-Mayi', 'Ville'], ['Kabeya-Kamwanga', 'Territoire'], ['Katanda', 'Territoire'], ['Lupatapata', 'Territoire'], ['Miabi', 'Territoire'], ['Tshilenge', 'Territoire']],
      35,
    ),
  },
  {
    nom: 'Kinshasa (capitale)',
    taux: 52,
    subdivisions: [
      { nom: 'Ville de Kinshasa', type: 'Ville', taux: 52, communes: KINSHASA_COMMUNES },
    ],
  },
  {
    nom: 'Kongo-Central',
    taux: 44,
    subdivisions: buildSubdivisions(
      [['Matadi', 'Ville'], ['Boma', 'Territoire'], ['Mbanza-Ngungu', 'Territoire'], ['Moanda', 'Territoire'], ['Songololo', 'Territoire'], ['Tshela', 'Territoire']],
      44,
    ),
  },
  {
    nom: 'Kwango',
    taux: 20,
    subdivisions: buildSubdivisions(
      [['Kenge', 'Ville'], ['Feshi', 'Territoire'], ['Kahemba', 'Territoire'], ['Kasongo-Lunda', 'Territoire'], ['Popokabaka', 'Territoire']],
      20,
    ),
  },
  {
    nom: 'Kwilu',
    taux: 28,
    subdivisions: buildSubdivisions(
      [['Kikwit', 'Ville'], ['Bagata', 'Territoire'], ['Bulungu', 'Territoire'], ['Gungu', 'Territoire'], ['Idiofa', 'Territoire'], ['Masi-Manimba', 'Territoire']],
      28,
    ),
  },
  {
    nom: 'Lomami',
    taux: 25,
    subdivisions: buildSubdivisions(
      [['Kabinda', 'Ville'], ['Kamiji', 'Territoire'], ['Lubao', 'Territoire'], ['Luilu', 'Territoire'], ['Ngandajika', 'Territoire']],
      25,
    ),
  },
  {
    nom: 'Lualaba',
    taux: 41,
    subdivisions: buildSubdivisions(
      [['Kolwezi', 'Ville'], ['Dilolo', 'Territoire'], ['Kapanga', 'Territoire'], ['Lubudi', 'Territoire'], ['Mutshatsha', 'Territoire'], ['Sandoa', 'Territoire']],
      41,
    ),
  },
  {
    nom: 'Maï-Ndombe',
    taux: 17,
    subdivisions: buildSubdivisions(
      [['Inongo', 'Ville'], ['Kiri', 'Territoire'], ['Kutu', 'Territoire'], ['Kwamouth', 'Territoire'], ['Mushie', 'Territoire'], ['Oshwe', 'Territoire'], ['Yumbi', 'Territoire']],
      17,
    ),
  },
  {
    nom: 'Maniema',
    taux: 23,
    subdivisions: buildSubdivisions(
      [['Kindu', 'Ville'], ['Kabambare', 'Territoire'], ['Kailo', 'Territoire'], ['Kasongo', 'Territoire'], ['Kibombo', 'Territoire'], ['Lubutu', 'Territoire'], ['Pangi', 'Territoire'], ['Punia', 'Territoire']],
      23,
    ),
  },
  {
    nom: 'Mongala',
    taux: 19,
    subdivisions: buildSubdivisions(
      [['Lisala', 'Ville'], ['Bongandanga', 'Territoire'], ['Bumba', 'Territoire']],
      19,
    ),
  },
  {
    nom: 'Nord-Kivu',
    taux: 33,
    subdivisions: buildSubdivisions(
      [['Goma', 'Ville'], ['Beni', 'Territoire'], ['Lubero', 'Territoire'], ['Masisi', 'Territoire'], ['Nyiragongo', 'Territoire'], ['Rutshuru', 'Territoire'], ['Walikale', 'Territoire']],
      33,
    ),
  },
  {
    nom: 'Nord-Ubangi',
    taux: 16,
    subdivisions: buildSubdivisions(
      [['Gbadolite', 'Ville'], ['Bosobolo', 'Territoire'], ['Businga', 'Territoire'], ['Mobayi-Mbongo', 'Territoire'], ['Yakoma', 'Territoire']],
      16,
    ),
  },
  {
    nom: 'Sankuru',
    taux: 15,
    subdivisions: buildSubdivisions(
      [['Lusambo', 'Ville'], ['Katako-Kombe', 'Territoire'], ['Kole', 'Territoire'], ['Lodja', 'Territoire'], ['Lomela', 'Territoire'], ['Lubefu', 'Territoire']],
      15,
    ),
  },
  {
    nom: 'Sud-Kivu',
    taux: 31,
    subdivisions: buildSubdivisions(
      [['Bukavu', 'Ville'], ['Fizi', 'Territoire'], ['Idjwi', 'Territoire'], ['Kabare', 'Territoire'], ['Kalehe', 'Territoire'], ['Mwenga', 'Territoire'], ['Shabunda', 'Territoire'], ['Uvira', 'Territoire'], ['Walungu', 'Territoire']],
      31,
    ),
  },
  {
    nom: 'Sud-Ubangi',
    taux: 18,
    subdivisions: buildSubdivisions(
      [['Gemena', 'Ville'], ['Budjala', 'Territoire'], ['Kungu', 'Territoire'], ['Libenge', 'Territoire'], ['Zongo', 'Territoire']],
      18,
    ),
  },
  {
    nom: 'Tanganyika',
    taux: 27,
    subdivisions: buildSubdivisions(
      [['Kalemie', 'Ville'], ['Kabalo', 'Territoire'], ['Kongolo', 'Territoire'], ['Manono', 'Territoire'], ['Moba', 'Territoire'], ['Nyunzu', 'Territoire']],
      27,
    ),
  },
  {
    nom: 'Tshopo',
    taux: 27,
    subdivisions: buildSubdivisions(
      [['Kisangani', 'Ville'], ['Bafwasende', 'Territoire'], ['Banalia', 'Territoire'], ['Basoko', 'Territoire'], ['Isangi', 'Territoire'], ['Opala', 'Territoire'], ['Ubundu', 'Territoire'], ['Yahuma', 'Territoire']],
      27,
    ),
  },
  {
    nom: 'Tshuapa',
    taux: 14,
    subdivisions: buildSubdivisions(
      [['Boende', 'Ville'], ['Befale', 'Territoire'], ['Bokungu', 'Territoire'], ['Djolu', 'Territoire'], ['Ikela', 'Territoire'], ['Monkoto', 'Territoire']],
      14,
    ),
  },
]

/**
 * Territoires touchés par le conflit armé dans l'Est de la RDC : les données d'exécution
 * budgétaire n'y sont pas disponibles.
 */
const ZONES_DONNEES_INDISPONIBLES: Record<string, string[]> = {
  'Nord-Kivu': ['Rutshuru', 'Masisi', 'Walikale', 'Lubero', 'Beni'],
  'Sud-Kivu': ['Kalehe', 'Kabare', 'Walungu', 'Mwenga', 'Fizi', 'Uvira'],
  Ituri: ['Irumu', 'Mambasa', 'Djugu', 'Mahagi', 'Aru'],
}

for (const province of PROVINCES_GEO) {
  const territoiresAffectes = ZONES_DONNEES_INDISPONIBLES[province.nom]
  if (!territoiresAffectes) continue
  for (const subdivision of province.subdivisions) {
    if (territoiresAffectes.includes(subdivision.nom)) {
      subdivision.indisponible = true
    }
  }
}
