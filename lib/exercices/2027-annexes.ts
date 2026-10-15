// Données extraites des annexes XV à XVII du Document n°1 du PLF 2027.
// Source : Document n°1 Projet de loi de finances 2027 et ses annexes, pages 77 à 105.
// Montants en francs congolais (FC), effectifs en nombre de postes.

export type ComparaisonBudgetaireRow = {
  code: string
  label: string
  level: number
  provinceCode: string | null
  loiFinances2026: number
  loiRectificative2026: number
  plf2027: number
  page: number
}

export type EffectifRemunereRow = {
  section: string
  specificiteCode: string | null
  label: string
  level: number
  lfr2026: number
  plf2027: number
  actionNouvelle: number
  page: number
}

export type CreditSectionProgrammeTitreRow = {
  kind: 'section' | 'programme' | 'titre' | 'total'
  section: string | null
  program: string | null
  titre: string | null
  label: string
  amount: number
  page: number
}

export const SOURCE_DOCUMENT_1_ANNEXES_2027 = 'Document n°1 PLF 2027 et annexes, pages 77 à 105'

export const pdlParProvinceTerritoire2027 = [
  {
    code: "01",
    label: "BAS-UELE",
    level: 0,
    provinceCode: "01",
    loiFinances2026: 12839988111,
    loiRectificative2026: 12839988111,
    plf2027: 34126287336,
    page: 77
  },
  {
    code: "011100",
    label: "TERRITOIRE D'AKETI",
    level: 1,
    provinceCode: "01",
    loiFinances2026: 2155245715,
    loiRectificative2026: 2155245715,
    plf2027: 5687714556,
    page: 77
  },
  {
    code: "011200",
    label: "TERRITOIRE D'ANGO",
    level: 1,
    provinceCode: "01",
    loiFinances2026: 2073546048,
    loiRectificative2026: 2073546048,
    plf2027: 5687714556,
    page: 77
  },
  {
    code: "011300",
    label: "TERRITOIRE DE BAMBESA",
    level: 1,
    provinceCode: "01",
    loiFinances2026: 2136139919,
    loiRectificative2026: 2136139919,
    plf2027: 5687714556,
    page: 77
  },
  {
    code: "011400",
    label: "TERRITOIRE DE BONDO",
    level: 1,
    provinceCode: "01",
    loiFinances2026: 2071546302,
    loiRectificative2026: 2071546302,
    plf2027: 5687714556,
    page: 77
  },
  {
    code: "011500",
    label: "TERRITOIRE DE BUTA",
    level: 1,
    provinceCode: "01",
    loiFinances2026: 2221058981,
    loiRectificative2026: 2221058981,
    plf2027: 5687714556,
    page: 77
  },
  {
    code: "011600",
    label: "TERRITOIRE DE POKO",
    level: 1,
    provinceCode: "01",
    loiFinances2026: 2182451146,
    loiRectificative2026: 2182451146,
    plf2027: 5687714556,
    page: 77
  },
  {
    code: "02",
    label: "EQUATEUR",
    level: 0,
    provinceCode: "02",
    loiFinances2026: 39161791811,
    loiRectificative2026: 39161791811,
    plf2027: 39814001892,
    page: 77
  },
  {
    code: "021100",
    label: "TERRITOIRE DE BASANKUSU",
    level: 1,
    provinceCode: "02",
    loiFinances2026: 5581675552,
    loiRectificative2026: 5581675552,
    plf2027: 5687714556,
    page: 77
  },
  {
    code: "021200",
    label: "TERRITOIRE DE BIKORO",
    level: 1,
    provinceCode: "02",
    loiFinances2026: 5368086378,
    loiRectificative2026: 5368086378,
    plf2027: 5687714556,
    page: 77
  },
  {
    code: "021300",
    label: "TERRITOIRE DE BOLOMBA",
    level: 1,
    provinceCode: "02",
    loiFinances2026: 5704212716,
    loiRectificative2026: 5704212716,
    plf2027: 5687714556,
    page: 77
  },
  {
    code: "021400",
    label: "TERRITOIRE DE BOMONGO",
    level: 1,
    provinceCode: "02",
    loiFinances2026: 5404974145,
    loiRectificative2026: 5404974145,
    plf2027: 5687714556,
    page: 77
  },
  {
    code: "021500",
    label: "TERRITOIRE DE INGENDE",
    level: 1,
    provinceCode: "02",
    loiFinances2026: 5916668348,
    loiRectificative2026: 5916668348,
    plf2027: 5687714556,
    page: 77
  },
  {
    code: "021600",
    label: "TERRITOIRE DE LUKOLELA",
    level: 1,
    provinceCode: "02",
    loiFinances2026: 5245754693,
    loiRectificative2026: 5245754693,
    plf2027: 5687714556,
    page: 77
  },
  {
    code: "021700",
    label: "TERRITOIRE DE MAKANZA",
    level: 1,
    provinceCode: "02",
    loiFinances2026: 5940419979,
    loiRectificative2026: 5940419979,
    plf2027: 5687714556,
    page: 77
  },
  {
    code: "03",
    label: "HAUT-KATANGA",
    level: 0,
    provinceCode: "03",
    loiFinances2026: 36453303297,
    loiRectificative2026: 36453303297,
    plf2027: 34126287336,
    page: 77
  },
  {
    code: "031100",
    label: "TERRITOIRE DE KAMBOVE",
    level: 1,
    provinceCode: "03",
    loiFinances2026: 6254303258,
    loiRectificative2026: 6254303258,
    plf2027: 5687714556,
    page: 77
  },
  {
    code: "031200",
    label: "TERRITOIRE DE KASENGA",
    level: 1,
    provinceCode: "03",
    loiFinances2026: 5819166102,
    loiRectificative2026: 5819166102,
    plf2027: 5687714556,
    page: 77
  },
  {
    code: "031300",
    label: "TERRITOIRE DE KIPUSHI",
    level: 1,
    provinceCode: "03",
    loiFinances2026: 5590987697,
    loiRectificative2026: 5590987697,
    plf2027: 5687714556,
    page: 77
  },
  {
    code: "031400",
    label: "TERRITOIRE DE MITWABA",
    level: 1,
    provinceCode: "03",
    loiFinances2026: 6678377255,
    loiRectificative2026: 6678377255,
    plf2027: 5687714556,
    page: 77
  },
  {
    code: "031500",
    label: "TERRITOIRE DE PWETO",
    level: 1,
    provinceCode: "03",
    loiFinances2026: 5996903334,
    loiRectificative2026: 5996903334,
    plf2027: 5687714556,
    page: 77
  },
  {
    code: "031600",
    label: "TERRITOIRE DE SAKANIA",
    level: 1,
    provinceCode: "03",
    loiFinances2026: 6113565651,
    loiRectificative2026: 6113565651,
    plf2027: 5687714556,
    page: 77
  },
  {
    code: "04",
    label: "HAUT-LOMAMI",
    level: 0,
    provinceCode: "04",
    loiFinances2026: 31096777107,
    loiRectificative2026: 31096777107,
    plf2027: 28438572780,
    page: 77
  },
  {
    code: "041100",
    label: "TERRITOIRE DE BUKAMA",
    level: 1,
    provinceCode: "04",
    loiFinances2026: 6076144754,
    loiRectificative2026: 6076144754,
    plf2027: 5687714556,
    page: 77
  },
  {
    code: "041200",
    label: "TERRITOIRE DE KABONGO",
    level: 1,
    provinceCode: "04",
    loiFinances2026: 6402442885,
    loiRectificative2026: 6402442885,
    plf2027: 5687714556,
    page: 77
  },
  {
    code: "041300",
    label: "TERRITOIRE DE KAMINA",
    level: 1,
    provinceCode: "04",
    loiFinances2026: 5889931496,
    loiRectificative2026: 5889931496,
    plf2027: 5687714556,
    page: 77
  },
  {
    code: "041400",
    label: "TERRITOIRE DE KANIAMA KASESE",
    level: 1,
    provinceCode: "04",
    loiFinances2026: 6029429566,
    loiRectificative2026: 6029429566,
    plf2027: 5687714556,
    page: 77
  },
  {
    code: "041500",
    label: "TERRITOIRE DE MALEMBA-NKULU",
    level: 1,
    provinceCode: "04",
    loiFinances2026: 6698828406,
    loiRectificative2026: 6698828406,
    plf2027: 5687714556,
    page: 77
  },
  {
    code: "05",
    label: "HAUT-UELE",
    level: 0,
    provinceCode: "05",
    loiFinances2026: 32451237549,
    loiRectificative2026: 32451237549,
    plf2027: 34126287336,
    page: 77
  },
  {
    code: "051100",
    label: "TERRITOIRE DE DUNGU",
    level: 1,
    provinceCode: "05",
    loiFinances2026: 5661501696,
    loiRectificative2026: 5661501696,
    plf2027: 5687714556,
    page: 77
  },
  {
    code: "051200",
    label: "TERRITOIRE DE FARADJE",
    level: 1,
    provinceCode: "05",
    loiFinances2026: 5517033373,
    loiRectificative2026: 5517033373,
    plf2027: 5687714556,
    page: 77
  },
  {
    code: "051300",
    label: "TERRITOIRE DE NIANGARA",
    level: 1,
    provinceCode: "05",
    loiFinances2026: 5437508004,
    loiRectificative2026: 5437508004,
    plf2027: 5687714556,
    page: 77
  },
  {
    code: "051400",
    label: "TERRITOIRE DE RUNGU",
    level: 1,
    provinceCode: "05",
    loiFinances2026: 5524582257,
    loiRectificative2026: 5524582257,
    plf2027: 5687714556,
    page: 77
  },
  {
    code: "051500",
    label: "TERRITOIRE DE WAMBA",
    level: 1,
    provinceCode: "05",
    loiFinances2026: 4730682635,
    loiRectificative2026: 4730682635,
    plf2027: 5687714556,
    page: 77
  },
  {
    code: "051600",
    label: "TERRITOIRE DE WATSA",
    level: 1,
    provinceCode: "05",
    loiFinances2026: 5579929584,
    loiRectificative2026: 5579929584,
    plf2027: 5687714556,
    page: 77
  },
  {
    code: "06",
    label: "ITURI",
    level: 0,
    provinceCode: "06",
    loiFinances2026: 29664102930,
    loiRectificative2026: 29664102930,
    plf2027: 28438572780,
    page: 77
  },
  {
    code: "061100",
    label: "TERRITOIRE D'ARU",
    level: 1,
    provinceCode: "06",
    loiFinances2026: 5481274007,
    loiRectificative2026: 5481274007,
    plf2027: 5687714556,
    page: 77
  },
  {
    code: "061200",
    label: "TERRITOIRE DE DJUGU",
    level: 1,
    provinceCode: "06",
    loiFinances2026: 5935126348,
    loiRectificative2026: 5935126348,
    plf2027: 5687714556,
    page: 77
  },
  {
    code: "061300",
    label: "TERRITOIRE D'IRUMU",
    level: 1,
    provinceCode: "06",
    loiFinances2026: 6163374906,
    loiRectificative2026: 6163374906,
    plf2027: 5687714556,
    page: 77
  },
  {
    code: "061400",
    label: "TERRITOIRE DE MAHAGI",
    level: 1,
    provinceCode: "06",
    loiFinances2026: 6038483917,
    loiRectificative2026: 6038483917,
    plf2027: 5687714556,
    page: 77
  },
  {
    code: "061500",
    label: "TERRITOIRE DE MAMBASA",
    level: 1,
    provinceCode: "06",
    loiFinances2026: 6045843752,
    loiRectificative2026: 6045843752,
    plf2027: 5687714556,
    page: 77
  },
  {
    code: "07",
    label: "KASAI",
    level: 0,
    provinceCode: "07",
    loiFinances2026: 29103834849,
    loiRectificative2026: 29103834849,
    plf2027: 28438572780,
    page: 77
  },
  {
    code: "071100",
    label: "TERRITOIRE DE DEKESE",
    level: 1,
    provinceCode: "07",
    loiFinances2026: 6412766508,
    loiRectificative2026: 6412766508,
    plf2027: 5687714556,
    page: 77
  },
  {
    code: "071200",
    label: "TERRITOIRE D'ILEBO",
    level: 1,
    provinceCode: "07",
    loiFinances2026: 5487329456,
    loiRectificative2026: 5487329456,
    plf2027: 5687714556,
    page: 77
  },
  {
    code: "071300",
    label: "TERRITOIRE DE KAMONIA",
    level: 1,
    provinceCode: "07",
    loiFinances2026: 5090399372,
    loiRectificative2026: 5090399372,
    plf2027: 5687714556,
    page: 77
  },
  {
    code: "071400",
    label: "TERRITOIRE DE LUEBO",
    level: 1,
    provinceCode: "07",
    loiFinances2026: 6285218310,
    loiRectificative2026: 6285218310,
    plf2027: 5687714556,
    page: 77
  },
  {
    code: "071500",
    label: "TERRITOIRE DE MWEKA",
    level: 1,
    provinceCode: "07",
    loiFinances2026: 5828121203,
    loiRectificative2026: 5828121203,
    plf2027: 5687714556,
    page: 77
  },
  {
    code: "08",
    label: "KASAI-ORIENTAL",
    level: 0,
    provinceCode: "08",
    loiFinances2026: 26438780126,
    loiRectificative2026: 26438780126,
    plf2027: 28438572780,
    page: 77
  },
  {
    code: "081100",
    label: "TERRITOIRE DE KABEYA KAMWANGA",
    level: 1,
    provinceCode: "08",
    loiFinances2026: 4790781506,
    loiRectificative2026: 4790781506,
    plf2027: 5687714556,
    page: 77
  },
  {
    code: "081200",
    label: "TERRITOIRE DE KATANDA",
    level: 1,
    provinceCode: "08",
    loiFinances2026: 5104296110,
    loiRectificative2026: 5104296110,
    plf2027: 5687714556,
    page: 77
  },
  {
    code: "081300",
    label: "TERRITOIRE DE LUPATAPATA",
    level: 1,
    provinceCode: "08",
    loiFinances2026: 5515978404,
    loiRectificative2026: 5515978404,
    plf2027: 5687714556,
    page: 77
  },
  {
    code: "081400",
    label: "TERRITOIRE DE MIABI",
    level: 1,
    provinceCode: "08",
    loiFinances2026: 5235248872,
    loiRectificative2026: 5235248872,
    plf2027: 5687714556,
    page: 77
  },
  {
    code: "081500",
    label: "TERRITOIRE DE TSHILENGE",
    level: 1,
    provinceCode: "08",
    loiFinances2026: 5792475234,
    loiRectificative2026: 5792475234,
    plf2027: 5687714556,
    page: 77
  },
  {
    code: "09",
    label: "KONGO CENTRAL",
    level: 0,
    provinceCode: "09",
    loiFinances2026: 59856380588,
    loiRectificative2026: 59856380588,
    plf2027: 56877145560,
    page: 77
  },
  {
    code: "091100",
    label: "TERRITOIRE DE KASANGULU",
    level: 1,
    provinceCode: "09",
    loiFinances2026: 6237083872,
    loiRectificative2026: 6237083872,
    plf2027: 5687714556,
    page: 77
  },
  {
    code: "091200",
    label: "TERRITOIRE DE KIMVULA",
    level: 1,
    provinceCode: "09",
    loiFinances2026: 6035794808,
    loiRectificative2026: 6035794808,
    plf2027: 5687714556,
    page: 77
  },
  {
    code: "091300",
    label: "TERRITOIRE DE LUKULA",
    level: 1,
    provinceCode: "09",
    loiFinances2026: 6058978934,
    loiRectificative2026: 6058978934,
    plf2027: 5687714556,
    page: 78
  },
  {
    code: "091400",
    label: "TERRITOIRE DE LUOZI",
    level: 1,
    provinceCode: "09",
    loiFinances2026: 5763731669,
    loiRectificative2026: 5763731669,
    plf2027: 5687714556,
    page: 78
  },
  {
    code: "091500",
    label: "TERRITOIRE DE MADIMBA",
    level: 1,
    provinceCode: "09",
    loiFinances2026: 5746621654,
    loiRectificative2026: 5746621654,
    plf2027: 5687714556,
    page: 78
  },
  {
    code: "091600",
    label: "TERRITOIRE DE MBANZA NGUNGU",
    level: 1,
    provinceCode: "09",
    loiFinances2026: 5993020883,
    loiRectificative2026: 5993020883,
    plf2027: 5687714556,
    page: 78
  },
  {
    code: "091700",
    label: "TERRITOIRE DE MOANDA",
    level: 1,
    provinceCode: "09",
    loiFinances2026: 5845641622,
    loiRectificative2026: 5845641622,
    plf2027: 5687714556,
    page: 78
  },
  {
    code: "091800",
    label: "TERRITOIRE DE SEKE BANZA",
    level: 1,
    provinceCode: "09",
    loiFinances2026: 6236685363,
    loiRectificative2026: 6236685363,
    plf2027: 5687714556,
    page: 78
  },
  {
    code: "091900",
    label: "TERRITOIRE DE SONGOLOLO",
    level: 1,
    provinceCode: "09",
    loiFinances2026: 5801886826,
    loiRectificative2026: 5801886826,
    plf2027: 5687714556,
    page: 78
  },
  {
    code: "092000",
    label: "TERRITOIRE DE TSHELA",
    level: 1,
    provinceCode: "09",
    loiFinances2026: 6136934957,
    loiRectificative2026: 6136934957,
    plf2027: 5687714556,
    page: 78
  },
  {
    code: "10",
    label: "KWANGO",
    level: 0,
    provinceCode: "10",
    loiFinances2026: 29185969111,
    loiRectificative2026: 29185969111,
    plf2027: 28438572780,
    page: 78
  },
  {
    code: "101100",
    label: "TERRITOIRE DE FESHI",
    level: 1,
    provinceCode: "10",
    loiFinances2026: 5748183118,
    loiRectificative2026: 5748183118,
    plf2027: 5687714556,
    page: 78
  },
  {
    code: "101200",
    label: "TERRITOIRE DE KAHEMBA",
    level: 1,
    provinceCode: "10",
    loiFinances2026: 6111817409,
    loiRectificative2026: 6111817409,
    plf2027: 5687714556,
    page: 78
  },
  {
    code: "101300",
    label: "TERRITOIRE DE KASONGOLUNDA",
    level: 1,
    provinceCode: "10",
    loiFinances2026: 5923136432,
    loiRectificative2026: 5923136432,
    plf2027: 5687714556,
    page: 78
  },
  {
    code: "101400",
    label: "TERRITOIRE DE KENGE",
    level: 1,
    provinceCode: "10",
    loiFinances2026: 5472430186,
    loiRectificative2026: 5472430186,
    plf2027: 5687714556,
    page: 78
  },
  {
    code: "101500",
    label: "TERRITOIRE DE POPOKABAKA",
    level: 1,
    provinceCode: "10",
    loiFinances2026: 5930401966,
    loiRectificative2026: 5930401966,
    plf2027: 5687714556,
    page: 78
  },
  {
    code: "11",
    label: "KWILU",
    level: 0,
    provinceCode: "11",
    loiFinances2026: 29196392501,
    loiRectificative2026: 29196392501,
    plf2027: 28438572780,
    page: 78
  },
  {
    code: "111100",
    label: "TERRITOIRE DE BAGATA",
    level: 1,
    provinceCode: "11",
    loiFinances2026: 6180909765,
    loiRectificative2026: 6180909765,
    plf2027: 5687714556,
    page: 78
  },
  {
    code: "111200",
    label: "TERRITOIRE DE BULUNGU",
    level: 1,
    provinceCode: "11",
    loiFinances2026: 5781617431,
    loiRectificative2026: 5781617431,
    plf2027: 5687714556,
    page: 78
  },
  {
    code: "111300",
    label: "TERRITOIRE D'IDIOFA",
    level: 1,
    provinceCode: "11",
    loiFinances2026: 5907321153,
    loiRectificative2026: 5907321153,
    plf2027: 5687714556,
    page: 78
  },
  {
    code: "111400",
    label: "TERRITOIRE DE GUNGU",
    level: 1,
    provinceCode: "11",
    loiFinances2026: 5511329818,
    loiRectificative2026: 5511329818,
    plf2027: 5687714556,
    page: 78
  },
  {
    code: "111500",
    label: "TERRITOIRE DE MASIMANIMBA",
    level: 1,
    provinceCode: "11",
    loiFinances2026: 5815214334,
    loiRectificative2026: 5815214334,
    plf2027: 5687714556,
    page: 78
  },
  {
    code: "12",
    label: "LOMAMI",
    level: 0,
    provinceCode: "12",
    loiFinances2026: 28691296906,
    loiRectificative2026: 28691296906,
    plf2027: 28438572780,
    page: 78
  },
  {
    code: "121100",
    label: "TERRITOIRE DE KABINDA",
    level: 1,
    provinceCode: "12",
    loiFinances2026: 5771436165,
    loiRectificative2026: 5771436165,
    plf2027: 5687714556,
    page: 78
  },
  {
    code: "121200",
    label: "TERRITOIRE DE KAMIJI",
    level: 1,
    provinceCode: "12",
    loiFinances2026: 5579286973,
    loiRectificative2026: 5579286973,
    plf2027: 5687714556,
    page: 78
  },
  {
    code: "121300",
    label: "TERRITOIRE DE LUBAO",
    level: 1,
    provinceCode: "12",
    loiFinances2026: 5690058449,
    loiRectificative2026: 5690058449,
    plf2027: 5687714556,
    page: 78
  },
  {
    code: "121400",
    label: "TERRITOIRE DE LUILU",
    level: 1,
    provinceCode: "12",
    loiFinances2026: 5952497320,
    loiRectificative2026: 5952497320,
    plf2027: 5687714556,
    page: 78
  },
  {
    code: "121500",
    label: "TERRITOIRE DE NGANDAJIKA",
    level: 1,
    provinceCode: "12",
    loiFinances2026: 5698017999,
    loiRectificative2026: 5698017999,
    plf2027: 5687714556,
    page: 78
  },
  {
    code: "13",
    label: "LUALABA",
    level: 0,
    provinceCode: "13",
    loiFinances2026: 30804369208,
    loiRectificative2026: 30804369208,
    plf2027: 28438572780,
    page: 78
  },
  {
    code: "131100",
    label: "TERRITOIRE DE DILOLO",
    level: 1,
    provinceCode: "13",
    loiFinances2026: 6254850570,
    loiRectificative2026: 6254850570,
    plf2027: 5687714556,
    page: 78
  },
  {
    code: "131200",
    label: "TERRITOIRE DE KAPANGA",
    level: 1,
    provinceCode: "13",
    loiFinances2026: 6286561129,
    loiRectificative2026: 6286561129,
    plf2027: 5687714556,
    page: 78
  },
  {
    code: "131300",
    label: "TERRITOIRE DE LUBUDI",
    level: 1,
    provinceCode: "13",
    loiFinances2026: 5964184747,
    loiRectificative2026: 5964184747,
    plf2027: 5687714556,
    page: 78
  },
  {
    code: "131400",
    label: "TERRITOIRE DE MUTSHATSHA",
    level: 1,
    provinceCode: "13",
    loiFinances2026: 5778944144,
    loiRectificative2026: 5778944144,
    plf2027: 5687714556,
    page: 78
  },
  {
    code: "131500",
    label: "TERRITOIRE DE SANDOA",
    level: 1,
    provinceCode: "13",
    loiFinances2026: 6519828618,
    loiRectificative2026: 6519828618,
    plf2027: 5687714556,
    page: 78
  },
  {
    code: "14",
    label: "KASAI CENTRAL",
    level: 0,
    provinceCode: "14",
    loiFinances2026: 27925992975,
    loiRectificative2026: 27925992975,
    plf2027: 28438572780,
    page: 78
  },
  {
    code: "141100",
    label: "TERRITOIRE DE DEMBA",
    level: 1,
    provinceCode: "14",
    loiFinances2026: 6078104096,
    loiRectificative2026: 6078104096,
    plf2027: 5687714556,
    page: 78
  },
  {
    code: "141200",
    label: "TERRITOIRE DE DIBAYA",
    level: 1,
    provinceCode: "14",
    loiFinances2026: 5404409640,
    loiRectificative2026: 5404409640,
    plf2027: 5687714556,
    page: 78
  },
  {
    code: "141300",
    label: "TERRITOIRE DE DIMBELENGE",
    level: 1,
    provinceCode: "14",
    loiFinances2026: 5560573731,
    loiRectificative2026: 5560573731,
    plf2027: 5687714556,
    page: 78
  },
  {
    code: "141400",
    label: "TERRITOIRE DE KAZUMBA",
    level: 1,
    provinceCode: "14",
    loiFinances2026: 5657735667,
    loiRectificative2026: 5657735667,
    plf2027: 5687714556,
    page: 78
  },
  {
    code: "141500",
    label: "TERRITOIRE DE LUIZA",
    level: 1,
    provinceCode: "14",
    loiFinances2026: 5225169841,
    loiRectificative2026: 5225169841,
    plf2027: 5687714556,
    page: 78
  },
  {
    code: "15",
    label: "MAI-NDOMBE",
    level: 0,
    provinceCode: "15",
    loiFinances2026: 51331954352,
    loiRectificative2026: 51331954352,
    plf2027: 45501716457,
    page: 78
  },
  {
    code: "151100",
    label: "TERRITOIRE DE BOLOBO",
    level: 1,
    provinceCode: "15",
    loiFinances2026: 6656922101,
    loiRectificative2026: 6656922101,
    plf2027: 5687714557,
    page: 78
  },
  {
    code: "151200",
    label: "TERRITOIRE D'INONGO",
    level: 1,
    provinceCode: "15",
    loiFinances2026: 5881897518,
    loiRectificative2026: 5881897518,
    plf2027: 5687714557,
    page: 78
  },
  {
    code: "151300",
    label: "TERRITOIRE DE KIRI",
    level: 1,
    provinceCode: "15",
    loiFinances2026: 7175796359,
    loiRectificative2026: 7175796359,
    plf2027: 5687714557,
    page: 78
  },
  {
    code: "151400",
    label: "TERRITOIRE DE KUTU",
    level: 1,
    provinceCode: "15",
    loiFinances2026: 6498065286,
    loiRectificative2026: 6498065286,
    plf2027: 5687714557,
    page: 78
  },
  {
    code: "151500",
    label: "TERRITOIRE DE KWAMOUTH",
    level: 1,
    provinceCode: "15",
    loiFinances2026: 6529079078,
    loiRectificative2026: 6529079078,
    plf2027: 5687714557,
    page: 78
  },
  {
    code: "151600",
    label: "TERRITOIRE DE MUSHIE",
    level: 1,
    provinceCode: "15",
    loiFinances2026: 6455232636,
    loiRectificative2026: 6455232636,
    plf2027: 5687714558,
    page: 78
  },
  {
    code: "151700",
    label: "TERRITOIRE D'OSHWE",
    level: 1,
    provinceCode: "15",
    loiFinances2026: 5910231006,
    loiRectificative2026: 5910231006,
    plf2027: 5687714557,
    page: 78
  },
  {
    code: "151800",
    label: "TERRITOIRE DE YUMBI",
    level: 1,
    provinceCode: "15",
    loiFinances2026: 6224730368,
    loiRectificative2026: 6224730368,
    plf2027: 5687714557,
    page: 78
  },
  {
    code: "16",
    label: "MANIEMA",
    level: 0,
    provinceCode: "16",
    loiFinances2026: 42300666029,
    loiRectificative2026: 42300666029,
    plf2027: 39814001892,
    page: 78
  },
  {
    code: "161100",
    label: "TERRITOIRE DE KABAMBARE",
    level: 1,
    provinceCode: "16",
    loiFinances2026: 5743430351,
    loiRectificative2026: 5743430351,
    plf2027: 5687714556,
    page: 78
  },
  {
    code: "161200",
    label: "TERRITOIRE DE KAILO",
    level: 1,
    provinceCode: "16",
    loiFinances2026: 5818777664,
    loiRectificative2026: 5818777664,
    plf2027: 5687714556,
    page: 78
  },
  {
    code: "161300",
    label: "TERRITOIRE DE KASONGO",
    level: 1,
    provinceCode: "16",
    loiFinances2026: 6512642346,
    loiRectificative2026: 6512642346,
    plf2027: 5687714556,
    page: 78
  },
  {
    code: "161400",
    label: "TERRITOIRE DE KIBOMBO",
    level: 1,
    provinceCode: "16",
    loiFinances2026: 6138676502,
    loiRectificative2026: 6138676502,
    plf2027: 5687714556,
    page: 78
  },
  {
    code: "161500",
    label: "TERRITOIRE DE LUBUTU",
    level: 1,
    provinceCode: "16",
    loiFinances2026: 5990258537,
    loiRectificative2026: 5990258537,
    plf2027: 5687714556,
    page: 78
  },
  {
    code: "161600",
    label: "TERRITOIRE DE PANGI",
    level: 1,
    provinceCode: "16",
    loiFinances2026: 5981555782,
    loiRectificative2026: 5981555782,
    plf2027: 5687714556,
    page: 78
  },
  {
    code: "161700",
    label: "TERRITOIRE DE PUNIA",
    level: 1,
    provinceCode: "16",
    loiFinances2026: 6115324847,
    loiRectificative2026: 6115324847,
    plf2027: 5687714556,
    page: 78
  },
  {
    code: "17",
    label: "MONGALA",
    level: 0,
    provinceCode: "17",
    loiFinances2026: 17767173447,
    loiRectificative2026: 17767173447,
    plf2027: 17063143668,
    page: 78
  },
  {
    code: "171100",
    label: "TERRITOIRE DE BONGANDANGA",
    level: 1,
    provinceCode: "17",
    loiFinances2026: 5922047847,
    loiRectificative2026: 5922047847,
    plf2027: 5687714556,
    page: 78
  },
  {
    code: "171200",
    label: "TERRITOIRE DE BUMBA",
    level: 1,
    provinceCode: "17",
    loiFinances2026: 6228951768,
    loiRectificative2026: 6228951768,
    plf2027: 5687714556,
    page: 78
  },
  {
    code: "171300",
    label: "TERRITOIRE DE LISALA",
    level: 1,
    provinceCode: "17",
    loiFinances2026: 5616173832,
    loiRectificative2026: 5616173832,
    plf2027: 5687714556,
    page: 78
  },
  {
    code: "18",
    label: "NORD-KIVU",
    level: 0,
    provinceCode: "18",
    loiFinances2026: 33905556170,
    loiRectificative2026: 33905556170,
    plf2027: 34126287336,
    page: 78
  },
  {
    code: "181100",
    label: "TERRITOIRE DE BENI (OICHA)",
    level: 1,
    provinceCode: "18",
    loiFinances2026: 5260673258,
    loiRectificative2026: 5260673258,
    plf2027: 5687714556,
    page: 79
  },
  {
    code: "181200",
    label: "TERRITOIRE DE LUBERO",
    level: 1,
    provinceCode: "18",
    loiFinances2026: 5541048620,
    loiRectificative2026: 5541048620,
    plf2027: 5687714556,
    page: 79
  },
  {
    code: "181300",
    label: "TERRITOIRE DE MASISI",
    level: 1,
    provinceCode: "18",
    loiFinances2026: 5729877773,
    loiRectificative2026: 5729877773,
    plf2027: 5687714556,
    page: 79
  },
  {
    code: "181400",
    label: "TERRITOIRE DE NYIRAGONGO",
    level: 1,
    provinceCode: "18",
    loiFinances2026: 5799740372,
    loiRectificative2026: 5799740372,
    plf2027: 5687714556,
    page: 79
  },
  {
    code: "181500",
    label: "TERRITOIRE DE RUTSHURU",
    level: 1,
    provinceCode: "18",
    loiFinances2026: 5666307200,
    loiRectificative2026: 5666307200,
    plf2027: 5687714556,
    page: 79
  },
  {
    code: "181600",
    label: "TERRITOIRE DE WALIKALE",
    level: 1,
    provinceCode: "18",
    loiFinances2026: 5907908947,
    loiRectificative2026: 5907908947,
    plf2027: 5687714556,
    page: 79
  },
  {
    code: "19",
    label: "NORD-UBANGI",
    level: 0,
    provinceCode: "19",
    loiFinances2026: 23631469045,
    loiRectificative2026: 23631469045,
    plf2027: 22750858224,
    page: 79
  },
  {
    code: "191100",
    label: "TERRITOIRE DE BOSOBOLO",
    level: 1,
    provinceCode: "19",
    loiFinances2026: 6110748162,
    loiRectificative2026: 6110748162,
    plf2027: 5687714556,
    page: 79
  },
  {
    code: "191200",
    label: "TERRITOIRE DE BUSINGA",
    level: 1,
    provinceCode: "19",
    loiFinances2026: 6116012418,
    loiRectificative2026: 6116012418,
    plf2027: 5687714556,
    page: 79
  },
  {
    code: "191300",
    label: "TERRITOIRE DE MOBAYI MBONGO",
    level: 1,
    provinceCode: "19",
    loiFinances2026: 5653990823,
    loiRectificative2026: 5653990823,
    plf2027: 5687714556,
    page: 79
  },
  {
    code: "191400",
    label: "TERRITOIRE DE YAKOMA",
    level: 1,
    provinceCode: "19",
    loiFinances2026: 5750717642,
    loiRectificative2026: 5750717642,
    plf2027: 5687714556,
    page: 79
  },
  {
    code: "20",
    label: "SANKURU",
    level: 0,
    provinceCode: "20",
    loiFinances2026: 34680473508,
    loiRectificative2026: 34680473508,
    plf2027: 34126287336,
    page: 79
  },
  {
    code: "201100",
    label: "TERRITOIRE DE KATAKO KOMBE",
    level: 1,
    provinceCode: "20",
    loiFinances2026: 5259288428,
    loiRectificative2026: 5259288428,
    plf2027: 5687714556,
    page: 79
  },
  {
    code: "201200",
    label: "TERRITOIRE DE KOLE",
    level: 1,
    provinceCode: "20",
    loiFinances2026: 5607961524,
    loiRectificative2026: 5607961524,
    plf2027: 5687714556,
    page: 79
  },
  {
    code: "201300",
    label: "TERRITOIRE DE LODJA",
    level: 1,
    provinceCode: "20",
    loiFinances2026: 6612286014,
    loiRectificative2026: 6612286014,
    plf2027: 5687714556,
    page: 79
  },
  {
    code: "201400",
    label: "TERRITOIRE DE LOMELA",
    level: 1,
    provinceCode: "20",
    loiFinances2026: 5469901652,
    loiRectificative2026: 5469901652,
    plf2027: 5687714556,
    page: 79
  },
  {
    code: "201500",
    label: "TERRITOIRE DE LUBEFU",
    level: 1,
    provinceCode: "20",
    loiFinances2026: 5962753001,
    loiRectificative2026: 5962753001,
    plf2027: 5687714556,
    page: 79
  },
  {
    code: "201600",
    label: "TERRITOIRE DE LUSAMBO",
    level: 1,
    provinceCode: "20",
    loiFinances2026: 5768282889,
    loiRectificative2026: 5768282889,
    plf2027: 5687714556,
    page: 79
  },
  {
    code: "21",
    label: "SUD-KIVU",
    level: 0,
    provinceCode: "21",
    loiFinances2026: 46908336609,
    loiRectificative2026: 46908336609,
    plf2027: 45501716448,
    page: 79
  },
  {
    code: "211100",
    label: "TERRITOIRE DE FIZI",
    level: 1,
    provinceCode: "21",
    loiFinances2026: 5549343059,
    loiRectificative2026: 5549343059,
    plf2027: 5687714556,
    page: 79
  },
  {
    code: "211200",
    label: "TERRITOIRE D'IDJWI",
    level: 1,
    provinceCode: "21",
    loiFinances2026: 5672269636,
    loiRectificative2026: 5672269636,
    plf2027: 5687714556,
    page: 79
  },
  {
    code: "211300",
    label: "TERRITOIRE DE KALEHE",
    level: 1,
    provinceCode: "21",
    loiFinances2026: 6423107314,
    loiRectificative2026: 6423107314,
    plf2027: 5687714556,
    page: 79
  },
  {
    code: "211400",
    label: "TERRITOIRE DE KABARE",
    level: 1,
    provinceCode: "21",
    loiFinances2026: 5589105029,
    loiRectificative2026: 5589105029,
    plf2027: 5687714556,
    page: 79
  },
  {
    code: "211500",
    label: "TERRITOIRE DE MWENGA",
    level: 1,
    provinceCode: "21",
    loiFinances2026: 6377991772,
    loiRectificative2026: 6377991772,
    plf2027: 5687714556,
    page: 79
  },
  {
    code: "211600",
    label: "TERRITOIRE DE SHABUNDA",
    level: 1,
    provinceCode: "21",
    loiFinances2026: 6183347153,
    loiRectificative2026: 6183347153,
    plf2027: 5687714556,
    page: 79
  },
  {
    code: "211700",
    label: "TERRITOIRE D'UVIRA",
    level: 1,
    provinceCode: "21",
    loiFinances2026: 5754081501,
    loiRectificative2026: 5754081501,
    plf2027: 5687714556,
    page: 79
  },
  {
    code: "211800",
    label: "TERRITOIRE DE WALUNGU",
    level: 1,
    provinceCode: "21",
    loiFinances2026: 5359091145,
    loiRectificative2026: 5359091145,
    plf2027: 5687714556,
    page: 79
  },
  {
    code: "22",
    label: "SUD-UBANGI",
    level: 0,
    provinceCode: "22",
    loiFinances2026: 23053385646,
    loiRectificative2026: 23053385646,
    plf2027: 22750858224,
    page: 79
  },
  {
    code: "221100",
    label: "TERRITOIRE DE BUDJALA",
    level: 1,
    provinceCode: "22",
    loiFinances2026: 5427102444,
    loiRectificative2026: 5427102444,
    plf2027: 5687714556,
    page: 79
  },
  {
    code: "221200",
    label: "TERRITOIRE DE GEMENA",
    level: 1,
    provinceCode: "22",
    loiFinances2026: 5499291565,
    loiRectificative2026: 5499291565,
    plf2027: 5687714556,
    page: 79
  },
  {
    code: "221300",
    label: "TERRITOIRE DE KUNGU",
    level: 1,
    provinceCode: "22",
    loiFinances2026: 6247048679,
    loiRectificative2026: 6247048679,
    plf2027: 5687714556,
    page: 79
  },
  {
    code: "221400",
    label: "TERRITOIRE DE LIBENGE",
    level: 1,
    provinceCode: "22",
    loiFinances2026: 5879942958,
    loiRectificative2026: 5879942958,
    plf2027: 5687714556,
    page: 79
  },
  {
    code: "23",
    label: "TANGANYIKA",
    level: 0,
    provinceCode: "23",
    loiFinances2026: 35102793160,
    loiRectificative2026: 35102793160,
    plf2027: 34126287336,
    page: 79
  },
  {
    code: "231100",
    label: "TERRITOIRE DE KABALO",
    level: 1,
    provinceCode: "23",
    loiFinances2026: 5768830328,
    loiRectificative2026: 5768830328,
    plf2027: 5687714556,
    page: 79
  },
  {
    code: "231200",
    label: "TERRITOIRE DE KALEMIE",
    level: 1,
    provinceCode: "23",
    loiFinances2026: 6018359486,
    loiRectificative2026: 6018359486,
    plf2027: 5687714556,
    page: 79
  },
  {
    code: "231300",
    label: "TERRITOIRE DE KONGOLO",
    level: 1,
    provinceCode: "23",
    loiFinances2026: 5938504678,
    loiRectificative2026: 5938504678,
    plf2027: 5687714556,
    page: 79
  },
  {
    code: "231400",
    label: "TERRITOIRE DE MANONO",
    level: 1,
    provinceCode: "23",
    loiFinances2026: 6013594307,
    loiRectificative2026: 6013594307,
    plf2027: 5687714556,
    page: 79
  },
  {
    code: "231500",
    label: "TERRITOIRE DE MOBA",
    level: 1,
    provinceCode: "23",
    loiFinances2026: 5764381055,
    loiRectificative2026: 5764381055,
    plf2027: 5687714556,
    page: 79
  },
  {
    code: "231600",
    label: "TERRITOIRE DE NYUNZU",
    level: 1,
    provinceCode: "23",
    loiFinances2026: 5599123306,
    loiRectificative2026: 5599123306,
    plf2027: 5687714556,
    page: 79
  },
  {
    code: "24",
    label: "TSHOPO",
    level: 0,
    provinceCode: "24",
    loiFinances2026: 37800880553,
    loiRectificative2026: 37800880553,
    plf2027: 39814001892,
    page: 79
  },
  {
    code: "241100",
    label: "TERRITOIRE DE BAFWASENDE",
    level: 1,
    provinceCode: "24",
    loiFinances2026: 5283608181,
    loiRectificative2026: 5283608181,
    plf2027: 5687714556,
    page: 79
  },
  {
    code: "241200",
    label: "TERRITOIRE DE BANALIA",
    level: 1,
    provinceCode: "24",
    loiFinances2026: 5067378322,
    loiRectificative2026: 5067378322,
    plf2027: 5687714556,
    page: 79
  },
  {
    code: "241300",
    label: "TERRITOIRE DE BASOKO",
    level: 1,
    provinceCode: "24",
    loiFinances2026: 5333921928,
    loiRectificative2026: 5333921928,
    plf2027: 5687714556,
    page: 79
  },
  {
    code: "241400",
    label: "TERRITOIRE D'ISANGI",
    level: 1,
    provinceCode: "24",
    loiFinances2026: 5232345974,
    loiRectificative2026: 5232345974,
    plf2027: 5687714556,
    page: 79
  },
  {
    code: "241500",
    label: "TERRITOIRE D'OPALA",
    level: 1,
    provinceCode: "24",
    loiFinances2026: 5489148761,
    loiRectificative2026: 5489148761,
    plf2027: 5687714556,
    page: 79
  },
  {
    code: "241600",
    label: "TERRITOIRE D'UBUNDU",
    level: 1,
    provinceCode: "24",
    loiFinances2026: 6160790139,
    loiRectificative2026: 6160790139,
    plf2027: 5687714556,
    page: 79
  },
  {
    code: "241700",
    label: "TERRITOIRE DE YAHUMA",
    level: 1,
    provinceCode: "24",
    loiFinances2026: 5233687248,
    loiRectificative2026: 5233687248,
    plf2027: 5687714556,
    page: 79
  },
  {
    code: "25",
    label: "TSHUAPA",
    level: 0,
    provinceCode: "25",
    loiFinances2026: 35365705041,
    loiRectificative2026: 35365705041,
    plf2027: 34126287336,
    page: 79
  },
  {
    code: "251100",
    label: "TERRITOIRE DE BEFALE",
    level: 1,
    provinceCode: "25",
    loiFinances2026: 5722881378,
    loiRectificative2026: 5722881378,
    plf2027: 5687714556,
    page: 79
  },
  {
    code: "251200",
    label: "TERRITOIRE DE BOENDE",
    level: 1,
    provinceCode: "25",
    loiFinances2026: 5886029066,
    loiRectificative2026: 5886029066,
    plf2027: 5687714556,
    page: 79
  },
  {
    code: "251300",
    label: "TERRITOIRE DE BOKUNGU",
    level: 1,
    provinceCode: "25",
    loiFinances2026: 5594802168,
    loiRectificative2026: 5594802168,
    plf2027: 5687714556,
    page: 79
  },
  {
    code: "251400",
    label: "TERRITOIRE DE DJOLU",
    level: 1,
    provinceCode: "25",
    loiFinances2026: 5841678501,
    loiRectificative2026: 5841678501,
    plf2027: 5687714556,
    page: 79
  },
  {
    code: "251500",
    label: "TERRITOIRE D'IKELA",
    level: 1,
    provinceCode: "25",
    loiFinances2026: 6115597080,
    loiRectificative2026: 6115597080,
    plf2027: 5687714556,
    page: 79
  },
  {
    code: "251600",
    label: "TERRITOIRE DE MONKOTO Félix-Antoine TSHISEKEDI TSHILOMBO",
    level: 1,
    provinceCode: "25",
    loiFinances2026: 6204716848,
    loiRectificative2026: 6204716848,
    plf2027: 5687714556,
    page: 79
  }
] satisfies ComparaisonBudgetaireRow[]

export const effectifsRemuneres2027 = [
  {
    section: "10",
    specificiteCode: null,
    label: "PRÉSIDENCE DE LA RÉPUBLIQUE",
    level: 0,
    lfr2026: 7173,
    plf2027: 7173,
    actionNouvelle: 0,
    page: 80
  },
  {
    section: "10",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 1300,
    plf2027: 1300,
    actionNouvelle: 0,
    page: 80
  },
  {
    section: "10",
    specificiteCode: "1",
    label: "Personnels Politiques",
    level: 1,
    lfr2026: 1971,
    plf2027: 1971,
    actionNouvelle: 0,
    page: 80
  },
  {
    section: "10",
    specificiteCode: "4",
    label: "Professionnels Santé",
    level: 1,
    lfr2026: 93,
    plf2027: 93,
    actionNouvelle: 0,
    page: 80
  },
  {
    section: "10",
    specificiteCode: "5",
    label: "Professionnels Agri.",
    level: 1,
    lfr2026: 3042,
    plf2027: 3042,
    actionNouvelle: 0,
    page: 80
  },
  {
    section: "10",
    specificiteCode: "6",
    label: "Militaire, Policier, Sécurité",
    level: 1,
    lfr2026: 287,
    plf2027: 287,
    actionNouvelle: 0,
    page: 80
  },
  {
    section: "10",
    specificiteCode: "9",
    label: "Autres Catégories",
    level: 1,
    lfr2026: 480,
    plf2027: 480,
    actionNouvelle: 0,
    page: 80
  },
  {
    section: "11",
    specificiteCode: null,
    label: "PRIMATURE",
    level: 0,
    lfr2026: 2064,
    plf2027: 2064,
    actionNouvelle: 0,
    page: 80
  },
  {
    section: "11",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 645,
    plf2027: 645,
    actionNouvelle: 0,
    page: 80
  },
  {
    section: "11",
    specificiteCode: "1",
    label: "Personnels Politiques",
    level: 1,
    lfr2026: 952,
    plf2027: 952,
    actionNouvelle: 0,
    page: 80
  },
  {
    section: "11",
    specificiteCode: "6",
    label: "Militaire, Policier, Sécurité",
    level: 1,
    lfr2026: 271,
    plf2027: 271,
    actionNouvelle: 0,
    page: 80
  },
  {
    section: "11",
    specificiteCode: "9",
    label: "Autres Catégories",
    level: 1,
    lfr2026: 196,
    plf2027: 196,
    actionNouvelle: 0,
    page: 80
  },
  {
    section: "15",
    specificiteCode: null,
    label: "CHANCELLERIE DES ORDRES NATIONAUX",
    level: 0,
    lfr2026: 426,
    plf2027: 426,
    actionNouvelle: 0,
    page: 80
  },
  {
    section: "15",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 360,
    plf2027: 360,
    actionNouvelle: 0,
    page: 80
  },
  {
    section: "15",
    specificiteCode: "1",
    label: "Personnels Politiques",
    level: 1,
    lfr2026: 66,
    plf2027: 66,
    actionNouvelle: 0,
    page: 80
  },
  {
    section: "16",
    specificiteCode: null,
    label: "ASSEMBLEE NATIONALE",
    level: 0,
    lfr2026: 3875,
    plf2027: 3875,
    actionNouvelle: 0,
    page: 80
  },
  {
    section: "16",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 609,
    plf2027: 609,
    actionNouvelle: 0,
    page: 80
  },
  {
    section: "16",
    specificiteCode: "1",
    label: "Personnels Politiques",
    level: 1,
    lfr2026: 3266,
    plf2027: 3266,
    actionNouvelle: 0,
    page: 80
  },
  {
    section: "17",
    specificiteCode: null,
    label: "SÉNAT",
    level: 0,
    lfr2026: 1515,
    plf2027: 1515,
    actionNouvelle: 0,
    page: 80
  },
  {
    section: "17",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 522,
    plf2027: 522,
    actionNouvelle: 0,
    page: 80
  },
  {
    section: "17",
    specificiteCode: "1",
    label: "Personnels Politiques",
    level: 1,
    lfr2026: 993,
    plf2027: 993,
    actionNouvelle: 0,
    page: 80
  },
  {
    section: "20",
    specificiteCode: null,
    label: "POUVOIR JUDICIAIRE",
    level: 0,
    lfr2026: 7378,
    plf2027: 7378,
    actionNouvelle: 0,
    page: 80
  },
  {
    section: "20",
    specificiteCode: "7",
    label: "Personnel Justice et Magistrat",
    level: 1,
    lfr2026: 7378,
    plf2027: 7378,
    actionNouvelle: 0,
    page: 80
  },
  {
    section: "21",
    specificiteCode: null,
    label: "SECRÉTARIAT GENERAL DU GOUVERNEMENT",
    level: 0,
    lfr2026: 2933,
    plf2027: 2933,
    actionNouvelle: 0,
    page: 80
  },
  {
    section: "21",
    specificiteCode: "1",
    label: "Personnels Politiques",
    level: 1,
    lfr2026: 2933,
    plf2027: 2933,
    actionNouvelle: 0,
    page: 80
  },
  {
    section: "22",
    specificiteCode: null,
    label: "AFFAIRES ÉTRANGERES, COOPERATION INTERNATIONALE ET FRANCOPHONIE",
    level: 0,
    lfr2026: 2345,
    plf2027: 2345,
    actionNouvelle: 0,
    page: 80
  },
  {
    section: "22",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 1398,
    plf2027: 1398,
    actionNouvelle: 0,
    page: 80
  },
  {
    section: "22",
    specificiteCode: "1",
    label: "Personnels Politiques",
    level: 1,
    lfr2026: 300,
    plf2027: 300,
    actionNouvelle: 0,
    page: 80
  },
  {
    section: "22",
    specificiteCode: "2",
    label: "Personnels Diplomatiques",
    level: 1,
    lfr2026: 647,
    plf2027: 647,
    actionNouvelle: 0,
    page: 80
  },
  {
    section: "23",
    specificiteCode: null,
    label: "COOPÉRATION INTERNATIONNALE, REGIONALE ET FRANCOPHONIE",
    level: 0,
    lfr2026: 172,
    plf2027: 172,
    actionNouvelle: 0,
    page: 80
  },
  {
    section: "23",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 172,
    plf2027: 172,
    actionNouvelle: 0,
    page: 80
  },
  {
    section: "24",
    specificiteCode: null,
    label: "DECENTRALISATION",
    level: 0,
    lfr2026: 1011,
    plf2027: 1011,
    actionNouvelle: 0,
    page: 80
  },
  {
    section: "24",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 1011,
    plf2027: 1011,
    actionNouvelle: 0,
    page: 80
  },
  {
    section: "25",
    specificiteCode: null,
    label: "INTÉRIEUR, SECURITE, DECENTRALISATION ET AFFAIRES COUTUMIERES",
    level: 0,
    lfr2026: 212551,
    plf2027: 230551,
    actionNouvelle: 18000,
    page: 80
  },
  {
    section: "25",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 8826,
    plf2027: 8826,
    actionNouvelle: 0,
    page: 80
  },
  {
    section: "25",
    specificiteCode: "1",
    label: "Personnels Politiques",
    level: 1,
    lfr2026: 738,
    plf2027: 738,
    actionNouvelle: 0,
    page: 80
  },
  {
    section: "25",
    specificiteCode: "4",
    label: "Professionnels Santé",
    level: 1,
    lfr2026: 0,
    plf2027: 0,
    actionNouvelle: 0,
    page: 80
  },
  {
    section: "25",
    specificiteCode: "5",
    label: "Professionnels Agri.",
    level: 1,
    lfr2026: 0,
    plf2027: 0,
    actionNouvelle: 0,
    page: 80
  },
  {
    section: "25",
    specificiteCode: "6",
    label: "Militaire, Policier, Sécurité",
    level: 1,
    lfr2026: 202987,
    plf2027: 220987,
    actionNouvelle: 18000,
    page: 80
  },
  {
    section: "25",
    specificiteCode: "9",
    label: "Autres Catégories",
    level: 1,
    lfr2026: 0,
    plf2027: 0,
    actionNouvelle: 0,
    page: 80
  },
  {
    section: "26",
    specificiteCode: null,
    label: "RELATIONS AVEC LES PARTIS POLITIQUES",
    level: 0,
    lfr2026: 225,
    plf2027: 225,
    actionNouvelle: 0,
    page: 80
  },
  {
    section: "26",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 225,
    plf2027: 225,
    actionNouvelle: 0,
    page: 80
  },
  {
    section: "27",
    specificiteCode: null,
    label: "DEFENSE ET ANCIENS COMBATTANTS",
    level: 0,
    lfr2026: 300432,
    plf2027: 320432,
    actionNouvelle: 20000,
    page: 80
  },
  {
    section: "27",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 7216,
    plf2027: 7216,
    actionNouvelle: 0,
    page: 80
  },
  {
    section: "27",
    specificiteCode: "4",
    label: "Professionnels Santé",
    level: 1,
    lfr2026: 0,
    plf2027: 0,
    actionNouvelle: 0,
    page: 80
  },
  {
    section: "27",
    specificiteCode: "5",
    label: "Professionnels Agri.",
    level: 1,
    lfr2026: 0,
    plf2027: 0,
    actionNouvelle: 0,
    page: 80
  },
  {
    section: "27",
    specificiteCode: "6",
    label: "Militaire, Policier, Sécurité PRÉSIDENCE DE LA RÉPUBLIQUE",
    level: 1,
    lfr2026: 293216,
    plf2027: 313216,
    actionNouvelle: 20000,
    page: 80
  },
  {
    section: "28",
    specificiteCode: null,
    label: "ANCIENS COMBATTANTS",
    level: 0,
    lfr2026: 884,
    plf2027: 884,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "28",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 884,
    plf2027: 884,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "29",
    specificiteCode: null,
    label: "ÉCONOMIE NATIONALE",
    level: 0,
    lfr2026: 3695,
    plf2027: 3695,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "29",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 3695,
    plf2027: 3695,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "29",
    specificiteCode: "9",
    label: "Autres Catégories",
    level: 1,
    lfr2026: 0,
    plf2027: 0,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "30",
    specificiteCode: null,
    label: "FINANCES",
    level: 0,
    lfr2026: 20219,
    plf2027: 20219,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "30",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 19968,
    plf2027: 19968,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "30",
    specificiteCode: "6",
    label: "Militaire, Policier, Sécurité",
    level: 1,
    lfr2026: 0,
    plf2027: 0,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "30",
    specificiteCode: "9",
    label: "Autres Catégories",
    level: 1,
    lfr2026: 251,
    plf2027: 251,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "31",
    specificiteCode: null,
    label: "BUDGET",
    level: 0,
    lfr2026: 6136,
    plf2027: 6136,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "31",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 5487,
    plf2027: 5487,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "31",
    specificiteCode: "9",
    label: "Autres Catégories",
    level: 1,
    lfr2026: 649,
    plf2027: 649,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "32",
    specificiteCode: null,
    label: "PLAN ET COORDINATION DE L'AIDE AU DEVELOPPEMENT",
    level: 0,
    lfr2026: 2445,
    plf2027: 2445,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "32",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 1689,
    plf2027: 1689,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "32",
    specificiteCode: "9",
    label: "Autres Catégories",
    level: 1,
    lfr2026: 756,
    plf2027: 756,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "33",
    specificiteCode: null,
    label: "RECONSTRUCTION",
    level: 0,
    lfr2026: 1305,
    plf2027: 1305,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "33",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 1305,
    plf2027: 1305,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "34",
    specificiteCode: null,
    label: "JUSTICE ET GARDE DES SCEAUX",
    level: 0,
    lfr2026: 6238,
    plf2027: 6238,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "34",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 3139,
    plf2027: 3139,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "34",
    specificiteCode: "7",
    label: "Personnel Justice et Magistrat",
    level: 1,
    lfr2026: 3099,
    plf2027: 3099,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "35",
    specificiteCode: null,
    label: "REFORMES INSTITUTIONNELLES",
    level: 0,
    lfr2026: 170,
    plf2027: 370,
    actionNouvelle: 200,
    page: 81
  },
  {
    section: "35",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 170,
    plf2027: 370,
    actionNouvelle: 200,
    page: 81
  },
  {
    section: "36",
    specificiteCode: null,
    label: "RELATIONS AVEC LE PARLEMENT",
    level: 0,
    lfr2026: 1378,
    plf2027: 1378,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "36",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 1378,
    plf2027: 1378,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "37",
    specificiteCode: null,
    label: "SANTE PUBLIQUE, HYGIENE ET PREVOYANCE SOCIALE",
    level: 0,
    lfr2026: 60879,
    plf2027: 60879,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "37",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 7087,
    plf2027: 7087,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "37",
    specificiteCode: "4",
    label: "Professionnels Santé",
    level: 1,
    lfr2026: 53792,
    plf2027: 53792,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "38",
    specificiteCode: null,
    label: "EDUCATION ET NOUVELLE CITOYENNETE",
    level: 0,
    lfr2026: 611499,
    plf2027: 611499,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "38",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 878,
    plf2027: 878,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "38",
    specificiteCode: "3",
    label: "Personnel Enseignant",
    level: 1,
    lfr2026: 610485,
    plf2027: 610485,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "38",
    specificiteCode: "9",
    label: "Autres Catégories",
    level: 1,
    lfr2026: 136,
    plf2027: 136,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "40",
    specificiteCode: null,
    label: "ENSEIGNEMENT SUPÉRIEUR ET UNIVERSITAIRE,",
    level: 0,
    lfr2026: 35996,
    plf2027: 35996,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "40",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 0,
    plf2027: 0,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "40",
    specificiteCode: "4",
    label: "Professionnels Santé",
    level: 1,
    lfr2026: 0,
    plf2027: 0,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "40",
    specificiteCode: "8",
    label: "Personnel de l'ESU et de la RS",
    level: 1,
    lfr2026: 35996,
    plf2027: 35996,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "41",
    specificiteCode: null,
    label: "RECHERCHE SCIENTIFIQUE ET INNOVATION",
    level: 0,
    lfr2026: 6979,
    plf2027: 6979,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "41",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 0,
    plf2027: 0,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "41",
    specificiteCode: "8",
    label: "Personnel de l'ESU et de la RS",
    level: 1,
    lfr2026: 6979,
    plf2027: 6979,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "42",
    specificiteCode: null,
    label: "INFRASTRUCTURES ET TRAVAUX PUBLICS",
    level: 0,
    lfr2026: 16485,
    plf2027: 16485,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "42",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 9835,
    plf2027: 9835,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "42",
    specificiteCode: "9",
    label: "Autres Catégories",
    level: 1,
    lfr2026: 6650,
    plf2027: 6650,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "43",
    specificiteCode: null,
    label: "URBANISME ET HABITAT",
    level: 0,
    lfr2026: 3350,
    plf2027: 3350,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "43",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 3350,
    plf2027: 3350,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "43",
    specificiteCode: "9",
    label: "Autres Catégories",
    level: 1,
    lfr2026: 0,
    plf2027: 0,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "44",
    specificiteCode: null,
    label: "AGRICULTURE ET SECURITE ALIMENTAIRE",
    level: 0,
    lfr2026: 11121,
    plf2027: 11121,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "44",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 566,
    plf2027: 566,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "44",
    specificiteCode: "5",
    label: "Professionnels Agri.",
    level: 1,
    lfr2026: 10497,
    plf2027: 10497,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "44",
    specificiteCode: "6",
    label: "Militaire, Policier, Sécurité",
    level: 1,
    lfr2026: 58,
    plf2027: 58,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "45",
    specificiteCode: null,
    label: "DÉVELOPPEMENT RURAL",
    level: 0,
    lfr2026: 5915,
    plf2027: 5915,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "45",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 0,
    plf2027: 0,
    actionNouvelle: 0,
    page: 81
  },
  {
    section: "46",
    specificiteCode: null,
    label: "INDUSTRIE",
    level: 0,
    lfr2026: 3560,
    plf2027: 3560,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "46",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 3390,
    plf2027: 3390,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "46",
    specificiteCode: "9",
    label: "Autres Catégories",
    level: 1,
    lfr2026: 170,
    plf2027: 170,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "47",
    specificiteCode: null,
    label: "COMMERCE EXTÉRIEUR",
    level: 0,
    lfr2026: 780,
    plf2027: 780,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "47",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 408,
    plf2027: 408,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "47",
    specificiteCode: "9",
    label: "Autres Catégories",
    level: 1,
    lfr2026: 372,
    plf2027: 372,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "48",
    specificiteCode: null,
    label: "MINES",
    level: 0,
    lfr2026: 2850,
    plf2027: 2850,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "48",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 2850,
    plf2027: 2850,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "49",
    specificiteCode: null,
    label: "HYDROCARBURES",
    level: 0,
    lfr2026: 984,
    plf2027: 984,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "49",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 984,
    plf2027: 984,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "50",
    specificiteCode: null,
    label: "RESSOURCES HYDRAULIQUES ET ELECTRICITE",
    level: 0,
    lfr2026: 1845,
    plf2027: 1845,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "50",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 1689,
    plf2027: 1689,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "50",
    specificiteCode: "9",
    label: "Autres Catégories",
    level: 1,
    lfr2026: 156,
    plf2027: 156,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "51",
    specificiteCode: null,
    label: "TRANSPORTS, VOIES DE COMMUNICATION ET DESENCLAVEMENT",
    level: 0,
    lfr2026: 6536,
    plf2027: 6536,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "51",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 4752,
    plf2027: 4752,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "51",
    specificiteCode: "9",
    label: "Autres Catégories",
    level: 1,
    lfr2026: 1784,
    plf2027: 1784,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "52",
    specificiteCode: null,
    label: "POSTES ET TELECOMMUNICATIONS",
    level: 0,
    lfr2026: 1517,
    plf2027: 1517,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "52",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 1287,
    plf2027: 1287,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "52",
    specificiteCode: "9",
    label: "Autres Catégories",
    level: 1,
    lfr2026: 230,
    plf2027: 230,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "53",
    specificiteCode: null,
    label: "COMMUNICATION ET MEDIAS",
    level: 0,
    lfr2026: 7038,
    plf2027: 7038,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "53",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 732,
    plf2027: 732,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "53",
    specificiteCode: "9",
    label: "Autres Catégories",
    level: 1,
    lfr2026: 6306,
    plf2027: 6306,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "54",
    specificiteCode: null,
    label: "DROITS HUMAINS",
    level: 0,
    lfr2026: 754,
    plf2027: 754,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "54",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 754,
    plf2027: 754,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "54",
    specificiteCode: "9",
    label: "Autres Catégories",
    level: 1,
    lfr2026: 0,
    plf2027: 0,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "55",
    specificiteCode: null,
    label: "AFFAIRES FONCIERES",
    level: 0,
    lfr2026: 5416,
    plf2027: 5416,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "55",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 5416,
    plf2027: 5416,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "56",
    specificiteCode: null,
    label: "ENVIRONNEMENT, DEVELOPPEMENT DURABLE ET",
    level: 0,
    lfr2026: 9864,
    plf2027: 9864,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "56",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 6062,
    plf2027: 6062,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "56",
    specificiteCode: "9",
    label: "Autres Catégories",
    level: 1,
    lfr2026: 3802,
    plf2027: 3802,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "57",
    specificiteCode: null,
    label: "TOURISME",
    level: 0,
    lfr2026: 3083,
    plf2027: 3083,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "57",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 2260,
    plf2027: 2260,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "57",
    specificiteCode: "9",
    label: "Autres Catégories",
    level: 1,
    lfr2026: 823,
    plf2027: 823,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "58",
    specificiteCode: null,
    label: "CULTURE, ARTS ET PATRIMOINE",
    level: 0,
    lfr2026: 6944,
    plf2027: 6944,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "58",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 2240,
    plf2027: 2240,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "58",
    specificiteCode: "9",
    label: "Autres Catégories",
    level: 1,
    lfr2026: 4704,
    plf2027: 4704,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "59",
    specificiteCode: null,
    label: "JEUNESSE",
    level: 0,
    lfr2026: 2931,
    plf2027: 2931,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "59",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 2931,
    plf2027: 2931,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "59",
    specificiteCode: "9",
    label: "Autres Catégories",
    level: 1,
    lfr2026: 0,
    plf2027: 0,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "60",
    specificiteCode: null,
    label: "SPORTS ET LOISIRS",
    level: 0,
    lfr2026: 1669,
    plf2027: 1669,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "60",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 1346,
    plf2027: 1346,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "60",
    specificiteCode: "9",
    label: "Autres Catégories",
    level: 1,
    lfr2026: 323,
    plf2027: 323,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "61",
    specificiteCode: null,
    label: "FONCTION PUBLIQUE, MODERNISATION DE",
    level: 0,
    lfr2026: 6381,
    plf2027: 6381,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "61",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 6320,
    plf2027: 6320,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "61",
    specificiteCode: "9",
    label: "Autres Catégories",
    level: 1,
    lfr2026: 61,
    plf2027: 61,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "62",
    specificiteCode: null,
    label: "EMPLOI ET TRAVAIL",
    level: 0,
    lfr2026: 5371,
    plf2027: 5371,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "62",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 3429,
    plf2027: 3429,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "62",
    specificiteCode: "9",
    label: "Autres Catégories",
    level: 1,
    lfr2026: 1942,
    plf2027: 1942,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "63",
    specificiteCode: null,
    label: "PREVOYANCE SOCIALE",
    level: 0,
    lfr2026: 650,
    plf2027: 650,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "63",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 550,
    plf2027: 550,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "63",
    specificiteCode: "9",
    label: "Autres Catégories PRÉSIDENCE DE LA RÉPUBLIQUE",
    level: 1,
    lfr2026: 100,
    plf2027: 100,
    actionNouvelle: 0,
    page: 82
  },
  {
    section: "64",
    specificiteCode: null,
    label: "AFFAIRES SOCIALES, ACTIONS HUMANITAIRES ET",
    level: 0,
    lfr2026: 12579,
    plf2027: 12579,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "64",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 8546,
    plf2027: 8546,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "64",
    specificiteCode: "8",
    label: "Personnel de l'ESU et de la RS",
    level: 1,
    lfr2026: 0,
    plf2027: 0,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "64",
    specificiteCode: "9",
    label: "Autres Catégories",
    level: 1,
    lfr2026: 4033,
    plf2027: 4033,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "65",
    specificiteCode: null,
    label: "GENRE, FAMILLE ET ENFANT",
    level: 0,
    lfr2026: 1779,
    plf2027: 1779,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "65",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 1582,
    plf2027: 1582,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "65",
    specificiteCode: "1",
    label: "Personnels Politiques",
    level: 1,
    lfr2026: 0,
    plf2027: 0,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "65",
    specificiteCode: "9",
    label: "Autres Catégories",
    level: 1,
    lfr2026: 197,
    plf2027: 197,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "68",
    specificiteCode: null,
    label: "PERSONNES VIVANT AVEC HANDICAP",
    level: 0,
    lfr2026: 1231,
    plf2027: 1231,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "68",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 400,
    plf2027: 400,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "68",
    specificiteCode: "9",
    label: "Autres Catégories",
    level: 1,
    lfr2026: 831,
    plf2027: 831,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "69",
    specificiteCode: null,
    label: "INTEGRATION REGIONALE",
    level: 0,
    lfr2026: 602,
    plf2027: 602,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "69",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 409,
    plf2027: 409,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "69",
    specificiteCode: "9",
    label: "Autres Catégories",
    level: 1,
    lfr2026: 193,
    plf2027: 193,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "70",
    specificiteCode: null,
    label: "ACTIONS HUMANITAIRES ET SOLIDARITE",
    level: 0,
    lfr2026: 1299,
    plf2027: 1299,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "70",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 1227,
    plf2027: 1227,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "70",
    specificiteCode: "9",
    label: "Autres Catégories",
    level: 1,
    lfr2026: 72,
    plf2027: 72,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "71",
    specificiteCode: null,
    label: "ECONOMIE NUMERIQUE",
    level: 0,
    lfr2026: 438,
    plf2027: 438,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "71",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 438,
    plf2027: 438,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "74",
    specificiteCode: null,
    label: "PORTEFEUILLE",
    level: 0,
    lfr2026: 448,
    plf2027: 448,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "74",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 150,
    plf2027: 150,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "74",
    specificiteCode: "9",
    label: "Autres Catégories",
    level: 1,
    lfr2026: 298,
    plf2027: 298,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "76",
    specificiteCode: null,
    label: "COMITE NATIONAL DE SUIVI DE L'ACCORD DE LA",
    level: 0,
    lfr2026: 0,
    plf2027: 0,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "76",
    specificiteCode: "1",
    label: "Personnels Politiques",
    level: 1,
    lfr2026: 0,
    plf2027: 0,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "77",
    specificiteCode: null,
    label: "COMMISSION ELECTORALE NATIONALE",
    level: 0,
    lfr2026: 3186,
    plf2027: 3186,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "77",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 63,
    plf2027: 63,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "77",
    specificiteCode: "9",
    label: "Autres Catégories",
    level: 1,
    lfr2026: 3123,
    plf2027: 3123,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "78",
    specificiteCode: null,
    label: "FORMATION PROFESSIONNELLE",
    level: 0,
    lfr2026: 1558,
    plf2027: 1558,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "78",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 1537,
    plf2027: 1537,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "78",
    specificiteCode: "3",
    label: "Personnel Enseignant",
    level: 1,
    lfr2026: 21,
    plf2027: 21,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "79",
    specificiteCode: null,
    label: "CONSEIL ÉCONOMIQUE ET SOCIAL DE LA REPUBLIQUE",
    level: 0,
    lfr2026: 205,
    plf2027: 205,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "79",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 111,
    plf2027: 111,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "79",
    specificiteCode: "1",
    label: "Personnels Politiques",
    level: 1,
    lfr2026: 94,
    plf2027: 94,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "79",
    specificiteCode: "9",
    label: "Autres Catégories",
    level: 1,
    lfr2026: 0,
    plf2027: 0,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "80",
    specificiteCode: null,
    label: "CONSEIL SUPÉRIEUR DE L'AUDIO-VISUEL ET DE LA COMMUNICATION",
    level: 0,
    lfr2026: 420,
    plf2027: 420,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "80",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 8,
    plf2027: 8,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "80",
    specificiteCode: "1",
    label: "Personnels Politiques",
    level: 1,
    lfr2026: 412,
    plf2027: 412,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "80",
    specificiteCode: "9",
    label: "Autres Catégories",
    level: 1,
    lfr2026: 0,
    plf2027: 0,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "81",
    specificiteCode: null,
    label: "COMMISSION NATIONALE DES DROITS DE L’HOMME",
    level: 0,
    lfr2026: 259,
    plf2027: 259,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "81",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 6,
    plf2027: 6,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "81",
    specificiteCode: "1",
    label: "Personnels Politiques",
    level: 1,
    lfr2026: 253,
    plf2027: 253,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "82",
    specificiteCode: null,
    label: "PECHE ET ELEVAGE",
    level: 0,
    lfr2026: 2442,
    plf2027: 2442,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "82",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 2171,
    plf2027: 2171,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "82",
    specificiteCode: "5",
    label: "Professionnels Agri.",
    level: 1,
    lfr2026: 271,
    plf2027: 271,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "82",
    specificiteCode: "9",
    label: "Autres Catégories",
    level: 1,
    lfr2026: 0,
    plf2027: 0,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "83",
    specificiteCode: null,
    label: "AFFAIRES COUTUMIERES",
    level: 0,
    lfr2026: 7038,
    plf2027: 7038,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "83",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 7038,
    plf2027: 7038,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "84",
    specificiteCode: null,
    label: "AMENAGEMENT DU TERRITOIRE",
    level: 0,
    lfr2026: 2148,
    plf2027: 2148,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "84",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 2148,
    plf2027: 2148,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "85",
    specificiteCode: null,
    label: "COUR DES COMPTES",
    level: 0,
    lfr2026: 470,
    plf2027: 470,
    actionNouvelle: 0,
    page: 83
  },
  {
    section: "90",
    specificiteCode: null,
    label: "ENTREPRENEURIAT ET DEVELOPPEMENT DES PETITES ET MOYENNES ENTREPRISES",
    level: 0,
    lfr2026: 3278,
    plf2027: 3278,
    actionNouvelle: 0,
    page: 84
  },
  {
    section: "90",
    specificiteCode: "0",
    label: "Personnel Regime Général",
    level: 1,
    lfr2026: 1894,
    plf2027: 1894,
    actionNouvelle: 0,
    page: 84
  },
  {
    section: "90",
    specificiteCode: "9",
    label: "Autres Catégories Félix-Antoine TSHISEKEDI TSHILOMBO",
    level: 1,
    lfr2026: 1384,
    plf2027: 1384,
    actionNouvelle: 0,
    page: 84
  },
  {
    section: "TOTAL",
    specificiteCode: null,
    label: "TOTAL",
    level: 0,
    lfr2026: 1444347,
    plf2027: 1482547,
    actionNouvelle: 38200,
    page: 84
  }
] satisfies EffectifRemunereRow[]

export const creditsParSectionProgrammeTitre2027 = [
  {
    kind: "section",
    section: "10",
    program: null,
    titre: null,
    label: "PRÉSIDENCE DE LA RÉPUBLIQUE",
    amount: 1554262645431,
    page: 85
  },
  {
    kind: "programme",
    section: "10",
    program: "1",
    titre: null,
    label: "Présidence de la République",
    amount: 1554262645431,
    page: 85
  },
  {
    kind: "titre",
    section: "10",
    program: "1",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 570959891765,
    page: 85
  },
  {
    kind: "titre",
    section: "10",
    program: "1",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 41095857295,
    page: 85
  },
  {
    kind: "titre",
    section: "10",
    program: "1",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 274526268230,
    page: 85
  },
  {
    kind: "titre",
    section: "10",
    program: "1",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 613053226838,
    page: 85
  },
  {
    kind: "titre",
    section: "10",
    program: "1",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 24974100505,
    page: 85
  },
  {
    kind: "titre",
    section: "10",
    program: "1",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 29653300798,
    page: 85
  },
  {
    kind: "section",
    section: "11",
    program: null,
    titre: null,
    label: "PRIMATURE",
    amount: 737717520834,
    page: 85
  },
  {
    kind: "programme",
    section: "11",
    program: "2",
    titre: null,
    label: "Administration Générale de la Primature",
    amount: 681826486290,
    page: 85
  },
  {
    kind: "titre",
    section: "11",
    program: "2",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 116151138327,
    page: 85
  },
  {
    kind: "titre",
    section: "11",
    program: "2",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 4281312136,
    page: 85
  },
  {
    kind: "titre",
    section: "11",
    program: "2",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 6150978714,
    page: 85
  },
  {
    kind: "titre",
    section: "11",
    program: "2",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 81420327543,
    page: 85
  },
  {
    kind: "titre",
    section: "11",
    program: "2",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 207872419439,
    page: 85
  },
  {
    kind: "titre",
    section: "11",
    program: "2",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 265950310131,
    page: 85
  },
  {
    kind: "programme",
    section: "11",
    program: "3",
    titre: null,
    label: "Coaching du Gouvernement A",
    amount: 43965545998,
    page: 85
  },
  {
    kind: "titre",
    section: "11",
    program: "3",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 35224119072,
    page: 85
  },
  {
    kind: "titre",
    section: "11",
    program: "3",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 689266181,
    page: 85
  },
  {
    kind: "titre",
    section: "11",
    program: "3",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 1614348336,
    page: 85
  },
  {
    kind: "titre",
    section: "11",
    program: "3",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 6437812409,
    page: 85
  },
  {
    kind: "titre",
    section: "11",
    program: "3",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 11387062149,
    page: 85
  },
  {
    kind: "titre",
    section: "11",
    program: "3",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 135030452,
    page: 85
  },
  {
    kind: "titre",
    section: "11",
    program: "3",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 403395945,
    page: 85
  },
  {
    kind: "section",
    section: "12",
    program: null,
    titre: null,
    label: "VICE-PRIMATURE",
    amount: 1641772333,
    page: 85
  },
  {
    kind: "programme",
    section: "12",
    program: "21",
    titre: null,
    label: "Administration Générale de l'Intérieur et Sécurité",
    amount: 273628723,
    page: 85
  },
  {
    kind: "titre",
    section: "12",
    program: "21",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 273628723,
    page: 85
  },
  {
    kind: "programme",
    section: "12",
    program: "26",
    titre: null,
    label: "Administration Générale de la Défense",
    amount: 273628722,
    page: 85
  },
  {
    kind: "titre",
    section: "12",
    program: "26",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 273628722,
    page: 85
  },
  {
    kind: "programme",
    section: "12",
    program: "33",
    titre: null,
    label: "Administration Générale de l'Economie Nationale",
    amount: 273628722,
    page: 85
  },
  {
    kind: "titre",
    section: "12",
    program: "33",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 273628722,
    page: 85
  },
  {
    kind: "programme",
    section: "12",
    program: "39",
    titre: null,
    label: "Administration Générale du Budget",
    amount: 273628722,
    page: 85
  },
  {
    kind: "titre",
    section: "12",
    program: "39",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 273628722,
    page: 85
  },
  {
    kind: "programme",
    section: "12",
    program: "101",
    titre: null,
    label: "Administration Générale des Transports et Voies de communication",
    amount: 273628722,
    page: 85
  },
  {
    kind: "titre",
    section: "12",
    program: "101",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 273628722,
    page: 85
  },
  {
    kind: "programme",
    section: "12",
    program: "129",
    titre: null,
    label: "Administration Générale de la Fonction Publique",
    amount: 273628722,
    page: 85
  },
  {
    kind: "titre",
    section: "12",
    program: "129",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 273628722,
    page: 85
  },
  {
    kind: "section",
    section: "15",
    program: null,
    titre: null,
    label: "CHANCELLERIE DES ORDRES NATIONAUX",
    amount: 32343735366,
    page: 85
  },
  {
    kind: "programme",
    section: "15",
    program: "8",
    titre: null,
    label: "Recherche et décoration des requérants",
    amount: 32343735366,
    page: 85
  },
  {
    kind: "titre",
    section: "15",
    program: "8",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 14556628166,
    page: 85
  },
  {
    kind: "titre",
    section: "15",
    program: "8",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 8391913706,
    page: 85
  },
  {
    kind: "titre",
    section: "15",
    program: "8",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 3986818807,
    page: 85
  },
  {
    kind: "titre",
    section: "15",
    program: "8",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 4029517784,
    page: 85
  },
  {
    kind: "titre",
    section: "15",
    program: "8",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 125360000,
    page: 85
  },
  {
    kind: "titre",
    section: "15",
    program: "8",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 1253496903,
    page: 85
  },
  {
    kind: "section",
    section: "16",
    program: null,
    titre: null,
    label: "ASSEMBLEE NATIONALE",
    amount: 979393032946,
    page: 85
  },
  {
    kind: "programme",
    section: "16",
    program: "9",
    titre: null,
    label: "Assemblée Nationale",
    amount: 979393032946,
    page: 85
  },
  {
    kind: "titre",
    section: "16",
    program: "9",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 323412454383,
    page: 85
  },
  {
    kind: "titre",
    section: "16",
    program: "9",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 5094534305,
    page: 85
  },
  {
    kind: "titre",
    section: "16",
    program: "9",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 1677062461,
    page: 85
  },
  {
    kind: "titre",
    section: "16",
    program: "9",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 597139630231,
    page: 85
  },
  {
    kind: "titre",
    section: "16",
    program: "9",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 14950488634,
    page: 85
  },
  {
    kind: "titre",
    section: "16",
    program: "9",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 37118862932,
    page: 85
  },
  {
    kind: "section",
    section: "17",
    program: null,
    titre: null,
    label: "SÉNAT",
    amount: 375361010886,
    page: 85
  },
  {
    kind: "titre",
    section: "17",
    program: null,
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 122655609957,
    page: 86
  },
  {
    kind: "titre",
    section: "17",
    program: null,
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 5737771550,
    page: 86
  },
  {
    kind: "titre",
    section: "17",
    program: null,
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 4822188983,
    page: 86
  },
  {
    kind: "titre",
    section: "17",
    program: null,
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 234558803137,
    page: 86
  },
  {
    kind: "titre",
    section: "17",
    program: null,
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 3966656459,
    page: 86
  },
  {
    kind: "titre",
    section: "17",
    program: null,
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 3619980800,
    page: 86
  },
  {
    kind: "section",
    section: "19",
    program: null,
    titre: null,
    label: "ORGANE EXÉCUTIF PROVINCIAL OU LOCAL",
    amount: 985000000000,
    page: 86
  },
  {
    kind: "programme",
    section: "19",
    program: "154",
    titre: null,
    label: "Coordination des Organes exécutifs provinciaux ou locaux",
    amount: 985000000000,
    page: 86
  },
  {
    kind: "titre",
    section: "19",
    program: "154",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 982372655755,
    page: 86
  },
  {
    kind: "titre",
    section: "19",
    program: "154",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 1345262056,
    page: 86
  },
  {
    kind: "titre",
    section: "19",
    program: "154",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 1282082189,
    page: 86
  },
  {
    kind: "section",
    section: "20",
    program: null,
    titre: null,
    label: "POUVOIR JUDICIAIRE",
    amount: 773410712628,
    page: 86
  },
  {
    kind: "programme",
    section: "20",
    program: "11",
    titre: null,
    label: "Pouvoir Judiciaire",
    amount: 773410712628,
    page: 86
  },
  {
    kind: "titre",
    section: "20",
    program: "11",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 593303547190,
    page: 86
  },
  {
    kind: "titre",
    section: "20",
    program: "11",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 28849291199,
    page: 86
  },
  {
    kind: "titre",
    section: "20",
    program: "11",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 26090152928,
    page: 86
  },
  {
    kind: "titre",
    section: "20",
    program: "11",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 97560791416,
    page: 86
  },
  {
    kind: "titre",
    section: "20",
    program: "11",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 1700000000,
    page: 86
  },
  {
    kind: "titre",
    section: "20",
    program: "11",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 25906929894,
    page: 86
  },
  {
    kind: "section",
    section: "21",
    program: null,
    titre: null,
    label: "SECRÉTARIAT GENERAL DU GOUVERNEMENT",
    amount: 124667734654,
    page: 86
  },
  {
    kind: "programme",
    section: "21",
    program: "2",
    titre: null,
    label: "Administration Générale de la Primature",
    amount: 124667734654,
    page: 86
  },
  {
    kind: "titre",
    section: "21",
    program: "2",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 78809943923,
    page: 86
  },
  {
    kind: "titre",
    section: "21",
    program: "2",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 1427494102,
    page: 86
  },
  {
    kind: "titre",
    section: "21",
    program: "2",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 5979344151,
    page: 86
  },
  {
    kind: "titre",
    section: "21",
    program: "2",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 38133591506,
    page: 86
  },
  {
    kind: "titre",
    section: "21",
    program: "2",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 317360972,
    page: 86
  },
  {
    kind: "section",
    section: "22",
    program: null,
    titre: null,
    label: "AFFAIRES ÉTRANGERES, COOPERATION INTERNATIONALE ET FRANCOPHONIE",
    amount: 500332245179,
    page: 86
  },
  {
    kind: "programme",
    section: "22",
    program: "12",
    titre: null,
    label: "Administration Générale des Affaires Etrangères",
    amount: 255039714869,
    page: 86
  },
  {
    kind: "titre",
    section: "22",
    program: "12",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 55780554792,
    page: 86
  },
  {
    kind: "titre",
    section: "22",
    program: "12",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 8047233866,
    page: 86
  },
  {
    kind: "titre",
    section: "22",
    program: "12",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 49625033160,
    page: 86
  },
  {
    kind: "titre",
    section: "22",
    program: "12",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 86483122947,
    page: 86
  },
  {
    kind: "titre",
    section: "22",
    program: "12",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 13052933000,
    page: 86
  },
  {
    kind: "titre",
    section: "22",
    program: "12",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 42050837104,
    page: 86
  },
  {
    kind: "programme",
    section: "22",
    program: "13",
    titre: null,
    label: "Redynamisation de la diplomatie",
    amount: 152950173672,
    page: 86
  },
  {
    kind: "titre",
    section: "22",
    program: "13",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 97694335918,
    page: 86
  },
  {
    kind: "titre",
    section: "22",
    program: "13",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 1701014797,
    page: 86
  },
  {
    kind: "titre",
    section: "22",
    program: "13",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 53554822957,
    page: 86
  },
  {
    kind: "programme",
    section: "22",
    program: "14",
    titre: null,
    label: "Promotion des relations avec les Organisations Internationales",
    amount: 89606262985,
    page: 86
  },
  {
    kind: "titre",
    section: "22",
    program: "14",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 3497652823,
    page: 86
  },
  {
    kind: "titre",
    section: "22",
    program: "14",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 1423819490,
    page: 86
  },
  {
    kind: "titre",
    section: "22",
    program: "14",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 3492798552,
    page: 86
  },
  {
    kind: "titre",
    section: "22",
    program: "14",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 80685115120,
    page: 86
  },
  {
    kind: "titre",
    section: "22",
    program: "14",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 506877000,
    page: 86
  },
  {
    kind: "programme",
    section: "22",
    program: "15",
    titre: null,
    label: "Congolais de l'étranger",
    amount: 1179769326,
    page: 86
  },
  {
    kind: "titre",
    section: "22",
    program: "15",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 74495362,
    page: 86
  },
  {
    kind: "titre",
    section: "22",
    program: "15",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 247181092,
    page: 86
  },
  {
    kind: "titre",
    section: "22",
    program: "15",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 817058567,
    page: 86
  },
  {
    kind: "titre",
    section: "22",
    program: "15",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 41034305,
    page: 86
  },
  {
    kind: "titre",
    section: "22",
    program: "15",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 115442965,
    page: 86
  },
  {
    kind: "titre",
    section: "22",
    program: "15",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 754485108,
    page: 86
  },
  {
    kind: "titre",
    section: "22",
    program: "15",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 686396254,
    page: 86
  },
  {
    kind: "section",
    section: "23",
    program: null,
    titre: null,
    label: "COOPÉRATION INTERNATIONNALE, REGIONALE ET FRANCOPHONIE",
    amount: 19618922092,
    page: 86
  },
  {
    kind: "programme",
    section: "23",
    program: "16",
    titre: null,
    label: "Administration Générale de la Coopération Internationale",
    amount: 19618922092,
    page: 86
  },
  {
    kind: "titre",
    section: "23",
    program: "16",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 13141184963,
    page: 86
  },
  {
    kind: "titre",
    section: "23",
    program: "16",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 1536035195,
    page: 86
  },
  {
    kind: "titre",
    section: "23",
    program: "16",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 257291333,
    page: 87
  },
  {
    kind: "titre",
    section: "23",
    program: "16",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 369894158,
    page: 87
  },
  {
    kind: "titre",
    section: "23",
    program: "16",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 1600000000,
    page: 87
  },
  {
    kind: "section",
    section: "24",
    program: null,
    titre: null,
    label: "DECENTRALISATION",
    amount: 21087720185,
    page: 87
  },
  {
    kind: "programme",
    section: "24",
    program: "18",
    titre: null,
    label: "Administration Générale de la Décentralisation",
    amount: 18558876307,
    page: 87
  },
  {
    kind: "titre",
    section: "24",
    program: "18",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 12562633942,
    page: 87
  },
  {
    kind: "titre",
    section: "24",
    program: "18",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 514474879,
    page: 87
  },
  {
    kind: "titre",
    section: "24",
    program: "18",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 2185577931,
    page: 87
  },
  {
    kind: "titre",
    section: "24",
    program: "18",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 2096189555,
    page: 87
  },
  {
    kind: "titre",
    section: "24",
    program: "18",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 200000000,
    page: 87
  },
  {
    kind: "titre",
    section: "24",
    program: "18",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 1000000000,
    page: 87
  },
  {
    kind: "programme",
    section: "24",
    program: "20",
    titre: null,
    label: "Décentralisation",
    amount: 2205070691,
    page: 87
  },
  {
    kind: "titre",
    section: "24",
    program: "20",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 148202189,
    page: 87
  },
  {
    kind: "titre",
    section: "24",
    program: "20",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 339506058,
    page: 87
  },
  {
    kind: "titre",
    section: "24",
    program: "20",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 1368413864,
    page: 87
  },
  {
    kind: "titre",
    section: "24",
    program: "20",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 348948580,
    page: 87
  },
  {
    kind: "titre",
    section: "24",
    program: "20",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 39684913,
    page: 87
  },
  {
    kind: "titre",
    section: "24",
    program: "20",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 78683032,
    page: 87
  },
  {
    kind: "titre",
    section: "24",
    program: "20",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 205405242,
    page: 87
  },
  {
    kind: "section",
    section: "25",
    program: null,
    titre: null,
    label: "INTÉRIEUR, SECURITE, DECENTRALISATION ET AFFAIRES COUTUMIERES",
    amount: 3921548410469,
    page: 87
  },
  {
    kind: "programme",
    section: "25",
    program: "21",
    titre: null,
    label: "Administration Générale de l'Intérieur et Sécurité",
    amount: 1579000237291,
    page: 87
  },
  {
    kind: "titre",
    section: "25",
    program: "21",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 165028676690,
    page: 87
  },
  {
    kind: "titre",
    section: "25",
    program: "21",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 1549387802,
    page: 87
  },
  {
    kind: "titre",
    section: "25",
    program: "21",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 215194420675,
    page: 87
  },
  {
    kind: "titre",
    section: "25",
    program: "21",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 975811006201,
    page: 87
  },
  {
    kind: "titre",
    section: "25",
    program: "21",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 205274383915,
    page: 87
  },
  {
    kind: "titre",
    section: "25",
    program: "21",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 16142362008,
    page: 87
  },
  {
    kind: "programme",
    section: "25",
    program: "22",
    titre: null,
    label: "Mise en œuvre de la Politique de la Sécurité intérieure et Extérieure",
    amount: 2171981661519,
    page: 87
  },
  {
    kind: "titre",
    section: "25",
    program: "22",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 1745994234943,
    page: 87
  },
  {
    kind: "titre",
    section: "25",
    program: "22",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 18555902265,
    page: 87
  },
  {
    kind: "titre",
    section: "25",
    program: "22",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 256985533138,
    page: 87
  },
  {
    kind: "titre",
    section: "25",
    program: "22",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 69492736169,
    page: 87
  },
  {
    kind: "titre",
    section: "25",
    program: "22",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 28393671014,
    page: 87
  },
  {
    kind: "titre",
    section: "25",
    program: "22",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 52559583990,
    page: 87
  },
  {
    kind: "programme",
    section: "25",
    program: "23",
    titre: null,
    label: "Administration du Territoire",
    amount: 58774104458,
    page: 87
  },
  {
    kind: "titre",
    section: "25",
    program: "23",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 44006591730,
    page: 87
  },
  {
    kind: "titre",
    section: "25",
    program: "23",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 672221589,
    page: 87
  },
  {
    kind: "titre",
    section: "25",
    program: "23",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 13336985712,
    page: 87
  },
  {
    kind: "titre",
    section: "25",
    program: "23",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 203810441,
    page: 87
  },
  {
    kind: "titre",
    section: "25",
    program: "23",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 554494986,
    page: 87
  },
  {
    kind: "titre",
    section: "25",
    program: "23",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 7115792045,
    page: 87
  },
  {
    kind: "titre",
    section: "25",
    program: "23",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 368409788,
    page: 87
  },
  {
    kind: "titre",
    section: "25",
    program: "23",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 1530402224,
    page: 87
  },
  {
    kind: "titre",
    section: "25",
    program: "23",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 90711250000,
    page: 87
  },
  {
    kind: "titre",
    section: "25",
    program: "23",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 5789580000,
    page: 87
  },
  {
    kind: "titre",
    section: "25",
    program: "23",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 6276973144,
    page: 87
  },
  {
    kind: "section",
    section: "26",
    program: null,
    titre: null,
    label: "RELATIONS AVEC LES PARTIS POLITIQUES",
    amount: 6813253562,
    page: 87
  },
  {
    kind: "programme",
    section: "26",
    program: "24",
    titre: null,
    label: "Gouvernance Démocratique",
    amount: 69102220,
    page: 87
  },
  {
    kind: "titre",
    section: "26",
    program: "24",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 33528510,
    page: 87
  },
  {
    kind: "titre",
    section: "26",
    program: "24",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 35573710,
    page: 87
  },
  {
    kind: "programme",
    section: "26",
    program: "25",
    titre: null,
    label: "Administration Générale des Relations avec les partis politiques",
    amount: 6675704668,
    page: 87
  },
  {
    kind: "titre",
    section: "26",
    program: "25",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 4778057910,
    page: 87
  },
  {
    kind: "titre",
    section: "26",
    program: "25",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 796972380,
    page: 87
  },
  {
    kind: "titre",
    section: "26",
    program: "25",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 455823278,
    page: 87
  },
  {
    kind: "titre",
    section: "26",
    program: "25",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 34070302,
    page: 88
  },
  {
    kind: "titre",
    section: "26",
    program: "25",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 34376372,
    page: 88
  },
  {
    kind: "section",
    section: "27",
    program: null,
    titre: null,
    label: "DEFENSE ET ANCIENS COMBATTANTS",
    amount: 8147102660434,
    page: 88
  },
  {
    kind: "programme",
    section: "27",
    program: "26",
    titre: null,
    label: "Administration Générale de la Défense",
    amount: 7400778628851,
    page: 88
  },
  {
    kind: "titre",
    section: "27",
    program: "26",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 1957438524828,
    page: 88
  },
  {
    kind: "titre",
    section: "27",
    program: "26",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 14039474491,
    page: 88
  },
  {
    kind: "titre",
    section: "27",
    program: "26",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 4315121270477,
    page: 88
  },
  {
    kind: "titre",
    section: "27",
    program: "26",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 906837497854,
    page: 88
  },
  {
    kind: "titre",
    section: "27",
    program: "26",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 159886656670,
    page: 88
  },
  {
    kind: "titre",
    section: "27",
    program: "26",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 47455204531,
    page: 88
  },
  {
    kind: "programme",
    section: "27",
    program: "27",
    titre: null,
    label: "Formation et entrainement",
    amount: 48317585584,
    page: 88
  },
  {
    kind: "titre",
    section: "27",
    program: "27",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 6236269510,
    page: 88
  },
  {
    kind: "titre",
    section: "27",
    program: "27",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 9606140299,
    page: 88
  },
  {
    kind: "titre",
    section: "27",
    program: "27",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 23972397203,
    page: 88
  },
  {
    kind: "titre",
    section: "27",
    program: "27",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 6672937009,
    page: 88
  },
  {
    kind: "titre",
    section: "27",
    program: "27",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 1829841563,
    page: 88
  },
  {
    kind: "programme",
    section: "27",
    program: "28",
    titre: null,
    label: "Equipement et matériels militaires",
    amount: 526495127554,
    page: 88
  },
  {
    kind: "titre",
    section: "27",
    program: "28",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 2805194197,
    page: 88
  },
  {
    kind: "titre",
    section: "27",
    program: "28",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 516257441900,
    page: 88
  },
  {
    kind: "titre",
    section: "27",
    program: "28",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 5692371474,
    page: 88
  },
  {
    kind: "titre",
    section: "27",
    program: "28",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 1740119983,
    page: 88
  },
  {
    kind: "programme",
    section: "27",
    program: "29",
    titre: null,
    label: "Infrastructures",
    amount: 12012322463,
    page: 88
  },
  {
    kind: "titre",
    section: "27",
    program: "29",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 374499777,
    page: 88
  },
  {
    kind: "titre",
    section: "27",
    program: "29",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 5393905538,
    page: 88
  },
  {
    kind: "titre",
    section: "27",
    program: "29",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 1794338689,
    page: 88
  },
  {
    kind: "titre",
    section: "27",
    program: "29",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 2075595388,
    page: 88
  },
  {
    kind: "titre",
    section: "27",
    program: "29",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 2373983071,
    page: 88
  },
  {
    kind: "programme",
    section: "27",
    program: "30",
    titre: null,
    label: "Opérations militaires",
    amount: 80717970134,
    page: 88
  },
  {
    kind: "titre",
    section: "27",
    program: "30",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 8572239702,
    page: 88
  },
  {
    kind: "titre",
    section: "27",
    program: "30",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 10783237973,
    page: 88
  },
  {
    kind: "titre",
    section: "27",
    program: "30",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 25212348828,
    page: 88
  },
  {
    kind: "titre",
    section: "27",
    program: "30",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 22187163219,
    page: 88
  },
  {
    kind: "titre",
    section: "27",
    program: "30",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 12405374162,
    page: 88
  },
  {
    kind: "titre",
    section: "27",
    program: "30",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 1557606250,
    page: 88
  },
  {
    kind: "programme",
    section: "27",
    program: "212",
    titre: null,
    label: "Production Militaire",
    amount: 78781025848,
    page: 88
  },
  {
    kind: "titre",
    section: "27",
    program: "212",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 600372976,
    page: 88
  },
  {
    kind: "titre",
    section: "27",
    program: "212",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 1697379752,
    page: 88
  },
  {
    kind: "titre",
    section: "27",
    program: "212",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 2935739377,
    page: 88
  },
  {
    kind: "titre",
    section: "27",
    program: "212",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 11290911695,
    page: 88
  },
  {
    kind: "titre",
    section: "27",
    program: "212",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 57168876382,
    page: 88
  },
  {
    kind: "titre",
    section: "27",
    program: "212",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 5087745666,
    page: 88
  },
  {
    kind: "section",
    section: "28",
    program: null,
    titre: null,
    label: "ANCIENS COMBATTANTS",
    amount: 39712669633,
    page: 88
  },
  {
    kind: "programme",
    section: "28",
    program: "32",
    titre: null,
    label: "Anciens Combattants",
    amount: 456213799,
    page: 88
  },
  {
    kind: "titre",
    section: "28",
    program: "32",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 192938146,
    page: 88
  },
  {
    kind: "titre",
    section: "28",
    program: "32",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 155835064,
    page: 88
  },
  {
    kind: "titre",
    section: "28",
    program: "32",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 37753242,
    page: 88
  },
  {
    kind: "titre",
    section: "28",
    program: "32",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 69687347,
    page: 88
  },
  {
    kind: "programme",
    section: "28",
    program: "177",
    titre: null,
    label: "Administration Générale des Anciens Combattants",
    amount: 39256455834,
    page: 88
  },
  {
    kind: "titre",
    section: "28",
    program: "177",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 6813104079,
    page: 88
  },
  {
    kind: "titre",
    section: "28",
    program: "177",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 1106430419,
    page: 88
  },
  {
    kind: "titre",
    section: "28",
    program: "177",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 1471097524,
    page: 88
  },
  {
    kind: "titre",
    section: "28",
    program: "177",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 4665823812,
    page: 88
  },
  {
    kind: "titre",
    section: "28",
    program: "177",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 3256000000,
    page: 88
  },
  {
    kind: "titre",
    section: "28",
    program: "177",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE PRÉSIDENCE DE LA RÉPUBLIQUE",
    amount: 21944000000,
    page: 88
  },
  {
    kind: "section",
    section: "29",
    program: null,
    titre: null,
    label: "ÉCONOMIE NATIONALE",
    amount: 55448515550,
    page: 89
  },
  {
    kind: "programme",
    section: "29",
    program: "33",
    titre: null,
    label: "Administration Générale de l'Economie Nationale",
    amount: 38137048115,
    page: 89
  },
  {
    kind: "titre",
    section: "29",
    program: "33",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 26773654087,
    page: 89
  },
  {
    kind: "titre",
    section: "29",
    program: "33",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 1954079172,
    page: 89
  },
  {
    kind: "titre",
    section: "29",
    program: "33",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 3705748436,
    page: 89
  },
  {
    kind: "titre",
    section: "29",
    program: "33",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 405948981,
    page: 89
  },
  {
    kind: "titre",
    section: "29",
    program: "33",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 1390606272,
    page: 89
  },
  {
    kind: "titre",
    section: "29",
    program: "33",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 3907011167,
    page: 89
  },
  {
    kind: "programme",
    section: "29",
    program: "34",
    titre: null,
    label: "Régulation de l'Economie",
    amount: 17311467435,
    page: 89
  },
  {
    kind: "titre",
    section: "29",
    program: "34",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 8304541589,
    page: 89
  },
  {
    kind: "titre",
    section: "29",
    program: "34",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 651369872,
    page: 89
  },
  {
    kind: "titre",
    section: "29",
    program: "34",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 1294604481,
    page: 89
  },
  {
    kind: "titre",
    section: "29",
    program: "34",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 6733100906,
    page: 89
  },
  {
    kind: "titre",
    section: "29",
    program: "34",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 327850587,
    page: 89
  },
  {
    kind: "section",
    section: "30",
    program: null,
    titre: null,
    label: "FINANCES",
    amount: 8014770574353,
    page: 89
  },
  {
    kind: "programme",
    section: "30",
    program: "35",
    titre: null,
    label: "Administration Générale des Finances",
    amount: 1803723836517,
    page: 89
  },
  {
    kind: "titre",
    section: "30",
    program: "35",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 366949601833,
    page: 89
  },
  {
    kind: "titre",
    section: "30",
    program: "35",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 38695993572,
    page: 89
  },
  {
    kind: "titre",
    section: "30",
    program: "35",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 11044736116,
    page: 89
  },
  {
    kind: "titre",
    section: "30",
    program: "35",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 3446852907,
    page: 89
  },
  {
    kind: "titre",
    section: "30",
    program: "35",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 291800209480,
    page: 89
  },
  {
    kind: "titre",
    section: "30",
    program: "35",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 1091786442609,
    page: 89
  },
  {
    kind: "programme",
    section: "30",
    program: "36",
    titre: null,
    label: "Appui à la Stabilisation du Cadre Macroéconomique",
    amount: 1049179447237,
    page: 89
  },
  {
    kind: "programme",
    section: "30",
    program: "2",
    titre: null,
    label: "FRAIS FINANCIERS",
    amount: 1026878613823,
    page: 89
  },
  {
    kind: "titre",
    section: "30",
    program: "2",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 10632838190,
    page: 89
  },
  {
    kind: "titre",
    section: "30",
    program: "2",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 137938846,
    page: 89
  },
  {
    kind: "titre",
    section: "30",
    program: "2",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 11202178338,
    page: 89
  },
  {
    kind: "titre",
    section: "30",
    program: "2",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 327878040,
    page: 89
  },
  {
    kind: "programme",
    section: "30",
    program: "37",
    titre: null,
    label: "Mobilisation des Recettes Publiques",
    amount: 2432617767574,
    page: 89
  },
  {
    kind: "titre",
    section: "30",
    program: "37",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 77365066215,
    page: 89
  },
  {
    kind: "titre",
    section: "30",
    program: "37",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 2352867454822,
    page: 89
  },
  {
    kind: "titre",
    section: "30",
    program: "37",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 200000000,
    page: 89
  },
  {
    kind: "titre",
    section: "30",
    program: "37",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 2185246537,
    page: 89
  },
  {
    kind: "programme",
    section: "30",
    program: "38",
    titre: null,
    label: "Comptabilité Publique, Gestion de la Trésorerie et de la Dette publique et Secteur",
    amount: 2695110069433,
    page: 89
  },
  {
    kind: "programme",
    section: "30",
    program: "1",
    titre: null,
    label: "DETTE PUBLIQUE EN CAPITAL",
    amount: 1941426490407,
    page: 89
  },
  {
    kind: "programme",
    section: "30",
    program: "2",
    titre: null,
    label: "FRAIS FINANCIERS",
    amount: 510156377152,
    page: 89
  },
  {
    kind: "titre",
    section: "30",
    program: "2",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 48113410173,
    page: 89
  },
  {
    kind: "titre",
    section: "30",
    program: "2",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 6824171214,
    page: 89
  },
  {
    kind: "titre",
    section: "30",
    program: "2",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 47739893130,
    page: 89
  },
  {
    kind: "titre",
    section: "30",
    program: "2",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 139330169506,
    page: 89
  },
  {
    kind: "titre",
    section: "30",
    program: "2",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 381744892,
    page: 89
  },
  {
    kind: "titre",
    section: "30",
    program: "2",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 1137812960,
    page: 89
  },
  {
    kind: "programme",
    section: "30",
    program: "197",
    titre: null,
    label: "Pilotage des Réformes des Finances Publiques",
    amount: 34139453592,
    page: 89
  },
  {
    kind: "titre",
    section: "30",
    program: "197",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 17558210340,
    page: 89
  },
  {
    kind: "titre",
    section: "30",
    program: "197",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 4869749807,
    page: 89
  },
  {
    kind: "titre",
    section: "30",
    program: "197",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 9807465007,
    page: 89
  },
  {
    kind: "titre",
    section: "30",
    program: "197",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 368329823,
    page: 89
  },
  {
    kind: "titre",
    section: "30",
    program: "197",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 1535698615,
    page: 89
  },
  {
    kind: "section",
    section: "31",
    program: null,
    titre: null,
    label: "BUDGET",
    amount: 1306488834483,
    page: 89
  },
  {
    kind: "programme",
    section: "31",
    program: "39",
    titre: null,
    label: "Administration Générale du Budget",
    amount: 519951650309,
    page: 89
  },
  {
    kind: "titre",
    section: "31",
    program: "39",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 403472858565,
    page: 89
  },
  {
    kind: "titre",
    section: "31",
    program: "39",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 23470726027,
    page: 89
  },
  {
    kind: "titre",
    section: "31",
    program: "39",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 46327710226,
    page: 89
  },
  {
    kind: "titre",
    section: "31",
    program: "39",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 24828313142,
    page: 89
  },
  {
    kind: "titre",
    section: "31",
    program: "39",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 15078912349,
    page: 89
  },
  {
    kind: "titre",
    section: "31",
    program: "39",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 6773130000,
    page: 89
  },
  {
    kind: "programme",
    section: "31",
    program: "40",
    titre: null,
    label: "Programmation et Budgétisation des Politiques publiques",
    amount: 63393226479,
    page: 89
  },
  {
    kind: "titre",
    section: "31",
    program: "40",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 4083722000,
    page: 90
  },
  {
    kind: "titre",
    section: "31",
    program: "40",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 29122982428,
    page: 90
  },
  {
    kind: "titre",
    section: "31",
    program: "40",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 561922051,
    page: 90
  },
  {
    kind: "titre",
    section: "31",
    program: "40",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 500000000,
    page: 90
  },
  {
    kind: "titre",
    section: "31",
    program: "40",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 11000000000,
    page: 90
  },
  {
    kind: "programme",
    section: "31",
    program: "41",
    titre: null,
    label: "Contrôle et suivi l'exécution du Budget",
    amount: 675751395240,
    page: 90
  },
  {
    kind: "titre",
    section: "31",
    program: "41",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 23248352959,
    page: 90
  },
  {
    kind: "titre",
    section: "31",
    program: "41",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 102965629166,
    page: 90
  },
  {
    kind: "titre",
    section: "31",
    program: "41",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 457469732029,
    page: 90
  },
  {
    kind: "titre",
    section: "31",
    program: "41",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 89211499386,
    page: 90
  },
  {
    kind: "titre",
    section: "31",
    program: "41",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 2856181700,
    page: 90
  },
  {
    kind: "programme",
    section: "31",
    program: "42",
    titre: null,
    label: "Développement et Suivi des Performances",
    amount: 3640099194,
    page: 90
  },
  {
    kind: "titre",
    section: "31",
    program: "42",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 1588180215,
    page: 90
  },
  {
    kind: "titre",
    section: "31",
    program: "42",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 846832378,
    page: 90
  },
  {
    kind: "titre",
    section: "31",
    program: "42",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 440708813,
    page: 90
  },
  {
    kind: "titre",
    section: "31",
    program: "42",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 538183391,
    page: 90
  },
  {
    kind: "titre",
    section: "31",
    program: "42",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 226194397,
    page: 90
  },
  {
    kind: "programme",
    section: "31",
    program: "153",
    titre: null,
    label: "Gestion des Approvionnements et Impression",
    amount: 28217211403,
    page: 90
  },
  {
    kind: "titre",
    section: "31",
    program: "153",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 27859025618,
    page: 90
  },
  {
    kind: "titre",
    section: "31",
    program: "153",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 293488492,
    page: 90
  },
  {
    kind: "titre",
    section: "31",
    program: "153",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 64697293,
    page: 90
  },
  {
    kind: "titre",
    section: "31",
    program: "153",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 15400213164,
    page: 90
  },
  {
    kind: "titre",
    section: "31",
    program: "153",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 135038694,
    page: 90
  },
  {
    kind: "section",
    section: "32",
    program: null,
    titre: null,
    label: "PLAN ET COORDINATION DE L'AIDE AU DEVELOPPEMENT",
    amount: 528724816997,
    page: 90
  },
  {
    kind: "programme",
    section: "32",
    program: "43",
    titre: null,
    label: "Administration Générale du Plan",
    amount: 312933134676,
    page: 90
  },
  {
    kind: "titre",
    section: "32",
    program: "43",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 58652889244,
    page: 90
  },
  {
    kind: "titre",
    section: "32",
    program: "43",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 3823642220,
    page: 90
  },
  {
    kind: "titre",
    section: "32",
    program: "43",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 2502129230,
    page: 90
  },
  {
    kind: "titre",
    section: "32",
    program: "43",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 5680930449,
    page: 90
  },
  {
    kind: "titre",
    section: "32",
    program: "43",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 17497504791,
    page: 90
  },
  {
    kind: "titre",
    section: "32",
    program: "43",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 224776038742,
    page: 90
  },
  {
    kind: "programme",
    section: "32",
    program: "44",
    titre: null,
    label: "Etudes et Planification du développment",
    amount: 141968522440,
    page: 90
  },
  {
    kind: "titre",
    section: "32",
    program: "44",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 71163929462,
    page: 90
  },
  {
    kind: "titre",
    section: "32",
    program: "44",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 3754413236,
    page: 90
  },
  {
    kind: "titre",
    section: "32",
    program: "44",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 3208402960,
    page: 90
  },
  {
    kind: "titre",
    section: "32",
    program: "44",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 53489911941,
    page: 90
  },
  {
    kind: "titre",
    section: "32",
    program: "44",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 10351864841,
    page: 90
  },
  {
    kind: "programme",
    section: "32",
    program: "45",
    titre: null,
    label: "Investissements et Promotion du partenariat",
    amount: 73823159881,
    page: 90
  },
  {
    kind: "titre",
    section: "32",
    program: "45",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 38366094189,
    page: 90
  },
  {
    kind: "titre",
    section: "32",
    program: "45",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 7619618138,
    page: 90
  },
  {
    kind: "titre",
    section: "32",
    program: "45",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 26488143674,
    page: 90
  },
  {
    kind: "titre",
    section: "32",
    program: "45",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 1349303880,
    page: 90
  },
  {
    kind: "section",
    section: "33",
    program: null,
    titre: null,
    label: "RECONSTRUCTION",
    amount: 13616759853,
    page: 90
  },
  {
    kind: "programme",
    section: "33",
    program: "46",
    titre: null,
    label: "Administration Générale de la Reconstruction",
    amount: 13313579969,
    page: 90
  },
  {
    kind: "titre",
    section: "33",
    program: "46",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 11922917079,
    page: 90
  },
  {
    kind: "titre",
    section: "33",
    program: "46",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 96868909,
    page: 90
  },
  {
    kind: "titre",
    section: "33",
    program: "46",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 164734153,
    page: 90
  },
  {
    kind: "titre",
    section: "33",
    program: "46",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 129059828,
    page: 90
  },
  {
    kind: "titre",
    section: "33",
    program: "46",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 1000000000,
    page: 90
  },
  {
    kind: "programme",
    section: "33",
    program: "47",
    titre: null,
    label: "Reconstruction",
    amount: 303179884,
    page: 90
  },
  {
    kind: "titre",
    section: "33",
    program: "47",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 118785208,
    page: 90
  },
  {
    kind: "titre",
    section: "33",
    program: "47",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 88568114,
    page: 90
  },
  {
    kind: "titre",
    section: "33",
    program: "47",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 95826562,
    page: 90
  },
  {
    kind: "section",
    section: "34",
    program: null,
    titre: null,
    label: "JUSTICE ET GARDE DES SCEAUX",
    amount: 200641968633,
    page: 90
  },
  {
    kind: "programme",
    section: "34",
    program: "48",
    titre: null,
    label: "Administration Générale de la Justice",
    amount: 173941713387,
    page: 90
  },
  {
    kind: "titre",
    section: "34",
    program: "48",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 63832986199,
    page: 90
  },
  {
    kind: "titre",
    section: "34",
    program: "48",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 7887231436,
    page: 90
  },
  {
    kind: "titre",
    section: "34",
    program: "48",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 4210948856,
    page: 91
  },
  {
    kind: "titre",
    section: "34",
    program: "48",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 46353952052,
    page: 91
  },
  {
    kind: "titre",
    section: "34",
    program: "48",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 40930066402,
    page: 91
  },
  {
    kind: "programme",
    section: "34",
    program: "49",
    titre: null,
    label: "Affaires Juridiques et Judiciaires",
    amount: 3619449786,
    page: 91
  },
  {
    kind: "titre",
    section: "34",
    program: "49",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 187682551,
    page: 91
  },
  {
    kind: "titre",
    section: "34",
    program: "49",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 190758850,
    page: 91
  },
  {
    kind: "titre",
    section: "34",
    program: "49",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 309737355,
    page: 91
  },
  {
    kind: "titre",
    section: "34",
    program: "49",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 2931271030,
    page: 91
  },
  {
    kind: "programme",
    section: "34",
    program: "50",
    titre: null,
    label: "Affaires pénitentiaires et assistance aux victimes",
    amount: 10106752394,
    page: 91
  },
  {
    kind: "titre",
    section: "34",
    program: "50",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 506755580,
    page: 91
  },
  {
    kind: "titre",
    section: "34",
    program: "50",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 4026936007,
    page: 91
  },
  {
    kind: "titre",
    section: "34",
    program: "50",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 1040941138,
    page: 91
  },
  {
    kind: "titre",
    section: "34",
    program: "50",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 4532119669,
    page: 91
  },
  {
    kind: "programme",
    section: "34",
    program: "51",
    titre: null,
    label: "Contentieux de l'Etat",
    amount: 3334988755,
    page: 91
  },
  {
    kind: "titre",
    section: "34",
    program: "51",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 50483390,
    page: 91
  },
  {
    kind: "titre",
    section: "34",
    program: "51",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 50622972,
    page: 91
  },
  {
    kind: "titre",
    section: "34",
    program: "51",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 151881578,
    page: 91
  },
  {
    kind: "titre",
    section: "34",
    program: "51",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 3082000815,
    page: 91
  },
  {
    kind: "programme",
    section: "34",
    program: "52",
    titre: null,
    label: "Modernisation du droit des affaires",
    amount: 9639064311,
    page: 91
  },
  {
    kind: "titre",
    section: "34",
    program: "52",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 8991175586,
    page: 91
  },
  {
    kind: "titre",
    section: "34",
    program: "52",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 142473335,
    page: 91
  },
  {
    kind: "titre",
    section: "34",
    program: "52",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 184802681,
    page: 91
  },
  {
    kind: "titre",
    section: "34",
    program: "52",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 320612709,
    page: 91
  },
  {
    kind: "section",
    section: "35",
    program: null,
    titre: null,
    label: "REFORMES INSTITUTIONNELLES",
    amount: 35483456097,
    page: 91
  },
  {
    kind: "programme",
    section: "35",
    program: "53",
    titre: null,
    label: "Administration Générale des Réformes Institutionnelles",
    amount: 31548397629,
    page: 91
  },
  {
    kind: "titre",
    section: "35",
    program: "53",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 13063864950,
    page: 91
  },
  {
    kind: "titre",
    section: "35",
    program: "53",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 2048197432,
    page: 91
  },
  {
    kind: "titre",
    section: "35",
    program: "53",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 2447092531,
    page: 91
  },
  {
    kind: "titre",
    section: "35",
    program: "53",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 3129584444,
    page: 91
  },
  {
    kind: "titre",
    section: "35",
    program: "53",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 8484866067,
    page: 91
  },
  {
    kind: "titre",
    section: "35",
    program: "53",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 2374792205,
    page: 91
  },
  {
    kind: "programme",
    section: "35",
    program: "193",
    titre: null,
    label: "Réformes institutionnelles",
    amount: 3935058468,
    page: 91
  },
  {
    kind: "titre",
    section: "35",
    program: "193",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 1435958157,
    page: 91
  },
  {
    kind: "titre",
    section: "35",
    program: "193",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 1689206778,
    page: 91
  },
  {
    kind: "titre",
    section: "35",
    program: "193",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 183358203,
    page: 91
  },
  {
    kind: "titre",
    section: "35",
    program: "193",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 626535330,
    page: 91
  },
  {
    kind: "section",
    section: "36",
    program: null,
    titre: null,
    label: "RELATIONS AVEC LE PARLEMENT",
    amount: 87615751007,
    page: 91
  },
  {
    kind: "programme",
    section: "36",
    program: "54",
    titre: null,
    label: "Administration Générale des Relations avec le Parlement",
    amount: 87115530247,
    page: 91
  },
  {
    kind: "titre",
    section: "36",
    program: "54",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 38989965857,
    page: 91
  },
  {
    kind: "titre",
    section: "36",
    program: "54",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 11028488562,
    page: 91
  },
  {
    kind: "titre",
    section: "36",
    program: "54",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 12261348291,
    page: 91
  },
  {
    kind: "titre",
    section: "36",
    program: "54",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 19700091722,
    page: 91
  },
  {
    kind: "titre",
    section: "36",
    program: "54",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 1135635815,
    page: 91
  },
  {
    kind: "titre",
    section: "36",
    program: "54",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 4000000000,
    page: 91
  },
  {
    kind: "programme",
    section: "36",
    program: "56",
    titre: null,
    label: "Coopération parlementaire et gestion des Divisions provinciales",
    amount: 331693162,
    page: 91
  },
  {
    kind: "titre",
    section: "36",
    program: "56",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 149251791,
    page: 91
  },
  {
    kind: "titre",
    section: "36",
    program: "56",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 169304684,
    page: 91
  },
  {
    kind: "titre",
    section: "36",
    program: "56",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 13136687,
    page: 91
  },
  {
    kind: "programme",
    section: "36",
    program: "57",
    titre: null,
    label: "Gouvernance harmonieuse et connaisance des lois",
    amount: 168527598,
    page: 91
  },
  {
    kind: "titre",
    section: "36",
    program: "57",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 66152610,
    page: 91
  },
  {
    kind: "titre",
    section: "36",
    program: "57",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 90283161,
    page: 91
  },
  {
    kind: "titre",
    section: "36",
    program: "57",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 12091827,
    page: 91
  },
  {
    kind: "section",
    section: "37",
    program: null,
    titre: null,
    label: "SANTE PUBLIQUE, HYGIENE ET PREVOYANCE SOCIALE",
    amount: 3944715397670,
    page: 91
  },
  {
    kind: "programme",
    section: "37",
    program: "58",
    titre: null,
    label: "Administration Générale de la Santé",
    amount: 3431804469269,
    page: 91
  },
  {
    kind: "titre",
    section: "37",
    program: "58",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 1578423964664,
    page: 91
  },
  {
    kind: "titre",
    section: "37",
    program: "58",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 10018022713,
    page: 91
  },
  {
    kind: "titre",
    section: "37",
    program: "58",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 18187920473,
    page: 91
  },
  {
    kind: "titre",
    section: "37",
    program: "58",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 19708219259,
    page: 91
  },
  {
    kind: "titre",
    section: "37",
    program: "58",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 260299193114,
    page: 92
  },
  {
    kind: "programme",
    section: "37",
    program: "59",
    titre: null,
    label: "Prestations de services de santé et continuité des soins",
    amount: 288241652013,
    page: 92
  },
  {
    kind: "titre",
    section: "37",
    program: "59",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 11993097339,
    page: 92
  },
  {
    kind: "titre",
    section: "37",
    program: "59",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 158877839405,
    page: 92
  },
  {
    kind: "titre",
    section: "37",
    program: "59",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 23522408869,
    page: 92
  },
  {
    kind: "titre",
    section: "37",
    program: "59",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 56101900005,
    page: 92
  },
  {
    kind: "titre",
    section: "37",
    program: "59",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 10000000000,
    page: 92
  },
  {
    kind: "titre",
    section: "37",
    program: "59",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 27746406395,
    page: 92
  },
  {
    kind: "programme",
    section: "37",
    program: "60",
    titre: null,
    label: "Lutte contre la maladie",
    amount: 224669276388,
    page: 92
  },
  {
    kind: "titre",
    section: "37",
    program: "60",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 2284575038,
    page: 92
  },
  {
    kind: "titre",
    section: "37",
    program: "60",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 37819682227,
    page: 92
  },
  {
    kind: "titre",
    section: "37",
    program: "60",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 57371929879,
    page: 92
  },
  {
    kind: "titre",
    section: "37",
    program: "60",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 111635118188,
    page: 92
  },
  {
    kind: "titre",
    section: "37",
    program: "60",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 12507971056,
    page: 92
  },
  {
    kind: "titre",
    section: "37",
    program: "60",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 3050000000,
    page: 92
  },
  {
    kind: "section",
    section: "38",
    program: null,
    titre: null,
    label: "EDUCATION ET NOUVELLE CITOYENNETE",
    amount: 5118429353868,
    page: 92
  },
  {
    kind: "programme",
    section: "38",
    program: "61",
    titre: null,
    label: "Administration Générale de l'Enseignement Primaire, Secondaire et Technique",
    amount: 1224585494204,
    page: 92
  },
  {
    kind: "titre",
    section: "38",
    program: "61",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 176224703719,
    page: 92
  },
  {
    kind: "titre",
    section: "38",
    program: "61",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 14139733976,
    page: 92
  },
  {
    kind: "titre",
    section: "38",
    program: "61",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 46885178105,
    page: 92
  },
  {
    kind: "titre",
    section: "38",
    program: "61",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 104573285549,
    page: 92
  },
  {
    kind: "titre",
    section: "38",
    program: "61",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 493314376577,
    page: 92
  },
  {
    kind: "titre",
    section: "38",
    program: "61",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 389448216278,
    page: 92
  },
  {
    kind: "programme",
    section: "38",
    program: "62",
    titre: null,
    label: "Enseignement Secondaire Général et Technique",
    amount: 11512875538,
    page: 92
  },
  {
    kind: "titre",
    section: "38",
    program: "62",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 585320655,
    page: 92
  },
  {
    kind: "titre",
    section: "38",
    program: "62",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 187736714,
    page: 92
  },
  {
    kind: "titre",
    section: "38",
    program: "62",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 2650516569,
    page: 92
  },
  {
    kind: "titre",
    section: "38",
    program: "62",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 8089301600,
    page: 92
  },
  {
    kind: "programme",
    section: "38",
    program: "63",
    titre: null,
    label: "Enseignement Pré-Scolaire et Primaire",
    amount: 3307151223392,
    page: 92
  },
  {
    kind: "titre",
    section: "38",
    program: "63",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 3087707968540,
    page: 92
  },
  {
    kind: "titre",
    section: "38",
    program: "63",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 6792120978,
    page: 92
  },
  {
    kind: "titre",
    section: "38",
    program: "63",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 66197239870,
    page: 92
  },
  {
    kind: "titre",
    section: "38",
    program: "63",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 144799728804,
    page: 92
  },
  {
    kind: "titre",
    section: "38",
    program: "63",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 1654165200,
    page: 92
  },
  {
    kind: "programme",
    section: "38",
    program: "64",
    titre: null,
    label: "Evaluation pédagogique et Formation continue",
    amount: 573346858817,
    page: 92
  },
  {
    kind: "titre",
    section: "38",
    program: "64",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 127265930265,
    page: 92
  },
  {
    kind: "titre",
    section: "38",
    program: "64",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 21676751699,
    page: 92
  },
  {
    kind: "titre",
    section: "38",
    program: "64",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 213556947303,
    page: 92
  },
  {
    kind: "titre",
    section: "38",
    program: "64",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 189364288446,
    page: 92
  },
  {
    kind: "titre",
    section: "38",
    program: "64",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 21482941104,
    page: 92
  },
  {
    kind: "titre",
    section: "38",
    program: "64",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 174156399,
    page: 92
  },
  {
    kind: "titre",
    section: "38",
    program: "64",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 202439714,
    page: 92
  },
  {
    kind: "titre",
    section: "38",
    program: "64",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 1456305804,
    page: 92
  },
  {
    kind: "section",
    section: "40",
    program: null,
    titre: null,
    label: "ENSEIGNEMENT SUPÉRIEUR ET UNIVERSITAIRE, RECHERCHE SCIENTIFIQUE ET INNOVATION",
    amount: 1074866910113,
    page: 92
  },
  {
    kind: "programme",
    section: "40",
    program: "67",
    titre: null,
    label: "Administration Générale de l'Enseignement Supérieur et Universitaire",
    amount: 140880489781,
    page: 92
  },
  {
    kind: "titre",
    section: "40",
    program: "67",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 69451775170,
    page: 92
  },
  {
    kind: "titre",
    section: "40",
    program: "67",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 2609961550,
    page: 92
  },
  {
    kind: "titre",
    section: "40",
    program: "67",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 5761686194,
    page: 92
  },
  {
    kind: "titre",
    section: "40",
    program: "67",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 34518975900,
    page: 92
  },
  {
    kind: "titre",
    section: "40",
    program: "67",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 5775820073,
    page: 92
  },
  {
    kind: "titre",
    section: "40",
    program: "67",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 22762270894,
    page: 92
  },
  {
    kind: "programme",
    section: "40",
    program: "68",
    titre: null,
    label: "Enseignement Supérieur et Universitaire",
    amount: 380066984238,
    page: 92
  },
  {
    kind: "titre",
    section: "40",
    program: "68",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 375789433023,
    page: 92
  },
  {
    kind: "titre",
    section: "40",
    program: "68",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 377965470,
    page: 92
  },
  {
    kind: "titre",
    section: "40",
    program: "68",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 509955460,
    page: 92
  },
  {
    kind: "programme",
    section: "40",
    program: "69",
    titre: null,
    label: "Recherche scientifique et universitaire",
    amount: 296289916212,
    page: 93
  },
  {
    kind: "titre",
    section: "40",
    program: "69",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 291203501007,
    page: 93
  },
  {
    kind: "titre",
    section: "40",
    program: "69",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 60857456,
    page: 93
  },
  {
    kind: "titre",
    section: "40",
    program: "69",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 147116304,
    page: 93
  },
  {
    kind: "titre",
    section: "40",
    program: "69",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 4878441445,
    page: 93
  },
  {
    kind: "programme",
    section: "40",
    program: "70",
    titre: null,
    label: "Enseignement Supérieur Pédagogique",
    amount: 257629519882,
    page: 93
  },
  {
    kind: "titre",
    section: "40",
    program: "70",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 254865333280,
    page: 93
  },
  {
    kind: "titre",
    section: "40",
    program: "70",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 2764186602,
    page: 93
  },
  {
    kind: "section",
    section: "41",
    program: null,
    titre: null,
    label: "RECHERCHE SCIENTIFIQUE ET INNOVATION TECHNOLOGIQUE",
    amount: 336839906275,
    page: 93
  },
  {
    kind: "programme",
    section: "41",
    program: "71",
    titre: null,
    label: "Administration Générale de la Recherche Scientifique et Innovation technologique",
    amount: 103392384610,
    page: 93
  },
  {
    kind: "titre",
    section: "41",
    program: "71",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 65157344124,
    page: 93
  },
  {
    kind: "titre",
    section: "41",
    program: "71",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 5384126375,
    page: 93
  },
  {
    kind: "titre",
    section: "41",
    program: "71",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 10602419839,
    page: 93
  },
  {
    kind: "titre",
    section: "41",
    program: "71",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 2180416697,
    page: 93
  },
  {
    kind: "titre",
    section: "41",
    program: "71",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 11981240983,
    page: 93
  },
  {
    kind: "titre",
    section: "41",
    program: "71",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 8086836592,
    page: 93
  },
  {
    kind: "programme",
    section: "41",
    program: "72",
    titre: null,
    label: "Promotion de la recherche et application de la Science, la Technologie et de",
    amount: 10829970408,
    page: 93
  },
  {
    kind: "titre",
    section: "41",
    program: "72",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 1318117773,
    page: 93
  },
  {
    kind: "titre",
    section: "41",
    program: "72",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 2255640434,
    page: 93
  },
  {
    kind: "titre",
    section: "41",
    program: "72",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 4789021095,
    page: 93
  },
  {
    kind: "titre",
    section: "41",
    program: "72",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 2467191106,
    page: 93
  },
  {
    kind: "programme",
    section: "41",
    program: "73",
    titre: null,
    label: "Valorisation des résultats de recherche",
    amount: 207406648627,
    page: 93
  },
  {
    kind: "titre",
    section: "41",
    program: "73",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 89801365200,
    page: 93
  },
  {
    kind: "titre",
    section: "41",
    program: "73",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 112453769322,
    page: 93
  },
  {
    kind: "titre",
    section: "41",
    program: "73",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 5151514105,
    page: 93
  },
  {
    kind: "programme",
    section: "41",
    program: "183",
    titre: null,
    label: "Protection contre les dangers des rayonnements ionisants (Nucléaires et",
    amount: 15210902630,
    page: 93
  },
  {
    kind: "titre",
    section: "41",
    program: "183",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 12531665273,
    page: 93
  },
  {
    kind: "titre",
    section: "41",
    program: "183",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 2679237357,
    page: 93
  },
  {
    kind: "section",
    section: "42",
    program: null,
    titre: null,
    label: "INFRASTRUCTURES ET TRAVAUX PUBLICS",
    amount: 2711242327749,
    page: 93
  },
  {
    kind: "programme",
    section: "42",
    program: "74",
    titre: null,
    label: "Administration Générale des Infrastructures et Travaux publics",
    amount: 1625902678495,
    page: 93
  },
  {
    kind: "titre",
    section: "42",
    program: "74",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 66309681314,
    page: 93
  },
  {
    kind: "titre",
    section: "42",
    program: "74",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 9123506183,
    page: 93
  },
  {
    kind: "titre",
    section: "42",
    program: "74",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 9529047602,
    page: 93
  },
  {
    kind: "titre",
    section: "42",
    program: "74",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 2167857022,
    page: 93
  },
  {
    kind: "titre",
    section: "42",
    program: "74",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 9815715995,
    page: 93
  },
  {
    kind: "titre",
    section: "42",
    program: "74",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 1528956870379,
    page: 93
  },
  {
    kind: "programme",
    section: "42",
    program: "75",
    titre: null,
    label: "Routes et voiries urbaines",
    amount: 1050515471623,
    page: 93
  },
  {
    kind: "titre",
    section: "42",
    program: "75",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 102290110401,
    page: 93
  },
  {
    kind: "titre",
    section: "42",
    program: "75",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 183956619,
    page: 93
  },
  {
    kind: "titre",
    section: "42",
    program: "75",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 632268402,
    page: 93
  },
  {
    kind: "titre",
    section: "42",
    program: "75",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 408007130,
    page: 93
  },
  {
    kind: "titre",
    section: "42",
    program: "75",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 5024137000,
    page: 93
  },
  {
    kind: "titre",
    section: "42",
    program: "75",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 941976992071,
    page: 93
  },
  {
    kind: "programme",
    section: "42",
    program: "76",
    titre: null,
    label: "Parc immobilier et automobiles de l'Etat",
    amount: 34824177632,
    page: 93
  },
  {
    kind: "titre",
    section: "42",
    program: "76",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 6184751376,
    page: 93
  },
  {
    kind: "titre",
    section: "42",
    program: "76",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 659050142,
    page: 93
  },
  {
    kind: "titre",
    section: "42",
    program: "76",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 1797044173,
    page: 93
  },
  {
    kind: "titre",
    section: "42",
    program: "76",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 4108012722,
    page: 93
  },
  {
    kind: "titre",
    section: "42",
    program: "76",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 22075319219,
    page: 93
  },
  {
    kind: "section",
    section: "43",
    program: null,
    titre: null,
    label: "URBANISME ET HABITAT",
    amount: 74890081988,
    page: 93
  },
  {
    kind: "programme",
    section: "43",
    program: "77",
    titre: null,
    label: "Administration Générale de l'Urbanisme et Habitat",
    amount: 63045742639,
    page: 93
  },
  {
    kind: "titre",
    section: "43",
    program: "77",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 26243679085,
    page: 93
  },
  {
    kind: "titre",
    section: "43",
    program: "77",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 3062868673,
    page: 93
  },
  {
    kind: "titre",
    section: "43",
    program: "77",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 2453505846,
    page: 93
  },
  {
    kind: "titre",
    section: "43",
    program: "77",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 11000000000,
    page: 93
  },
  {
    kind: "titre",
    section: "43",
    program: "77",
    titre: "7",
    label: "EQUIPEMENTS EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 9144701223,
    page: 93
  },
  {
    kind: "programme",
    section: "43",
    program: "79",
    titre: null,
    label: "Amélioration de l'habitat",
    amount: 10681015344,
    page: 94
  },
  {
    kind: "titre",
    section: "43",
    program: "79",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 4469991291,
    page: 94
  },
  {
    kind: "titre",
    section: "43",
    program: "79",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 101583460,
    page: 94
  },
  {
    kind: "titre",
    section: "43",
    program: "79",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 787333527,
    page: 94
  },
  {
    kind: "titre",
    section: "43",
    program: "79",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 5322107066,
    page: 94
  },
  {
    kind: "programme",
    section: "43",
    program: "185",
    titre: null,
    label: "Viabilisation de zones urbaines, peri-urbaines et rurales",
    amount: 1163324005,
    page: 94
  },
  {
    kind: "titre",
    section: "43",
    program: "185",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 239249981,
    page: 94
  },
  {
    kind: "titre",
    section: "43",
    program: "185",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 209277966,
    page: 94
  },
  {
    kind: "titre",
    section: "43",
    program: "185",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 714796058,
    page: 94
  },
  {
    kind: "section",
    section: "44",
    program: null,
    titre: null,
    label: "AGRICULTURE ET SECURITE ALIMENTAIRE",
    amount: 1275338537240,
    page: 94
  },
  {
    kind: "programme",
    section: "44",
    program: "80",
    titre: null,
    label: "Administration Générale de l'Agriculture",
    amount: 1228426477785,
    page: 94
  },
  {
    kind: "titre",
    section: "44",
    program: "80",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 87871202401,
    page: 94
  },
  {
    kind: "titre",
    section: "44",
    program: "80",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 6046697516,
    page: 94
  },
  {
    kind: "titre",
    section: "44",
    program: "80",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 8250481806,
    page: 94
  },
  {
    kind: "titre",
    section: "44",
    program: "80",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 17537160431,
    page: 94
  },
  {
    kind: "titre",
    section: "44",
    program: "80",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 971866231130,
    page: 94
  },
  {
    kind: "titre",
    section: "44",
    program: "80",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 136854704501,
    page: 94
  },
  {
    kind: "programme",
    section: "44",
    program: "81",
    titre: null,
    label: "Développement des Filières végétales",
    amount: 46912059455,
    page: 94
  },
  {
    kind: "titre",
    section: "44",
    program: "81",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 6554999564,
    page: 94
  },
  {
    kind: "titre",
    section: "44",
    program: "81",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 11965807889,
    page: 94
  },
  {
    kind: "titre",
    section: "44",
    program: "81",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 7198992755,
    page: 94
  },
  {
    kind: "titre",
    section: "44",
    program: "81",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 6963145850,
    page: 94
  },
  {
    kind: "titre",
    section: "44",
    program: "81",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 14229113397,
    page: 94
  },
  {
    kind: "section",
    section: "45",
    program: null,
    titre: null,
    label: "DÉVELOPPEMENT RURAL",
    amount: 951314502053,
    page: 94
  },
  {
    kind: "programme",
    section: "45",
    program: "84",
    titre: null,
    label: "Administration Générale du Développment Rural",
    amount: 886396893064,
    page: 94
  },
  {
    kind: "titre",
    section: "45",
    program: "84",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 44276960501,
    page: 94
  },
  {
    kind: "titre",
    section: "45",
    program: "84",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 6891577084,
    page: 94
  },
  {
    kind: "titre",
    section: "45",
    program: "84",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 11517400831,
    page: 94
  },
  {
    kind: "titre",
    section: "45",
    program: "84",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 14630481211,
    page: 94
  },
  {
    kind: "titre",
    section: "45",
    program: "84",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 500315579853,
    page: 94
  },
  {
    kind: "titre",
    section: "45",
    program: "84",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 308764893584,
    page: 94
  },
  {
    kind: "programme",
    section: "45",
    program: "85",
    titre: null,
    label: "Développement des infrastructures rurales",
    amount: 30590745510,
    page: 94
  },
  {
    kind: "titre",
    section: "45",
    program: "85",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 9184855748,
    page: 94
  },
  {
    kind: "titre",
    section: "45",
    program: "85",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 611025034,
    page: 94
  },
  {
    kind: "titre",
    section: "45",
    program: "85",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 1314349547,
    page: 94
  },
  {
    kind: "titre",
    section: "45",
    program: "85",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 1792010584,
    page: 94
  },
  {
    kind: "titre",
    section: "45",
    program: "85",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 13000000000,
    page: 94
  },
  {
    kind: "titre",
    section: "45",
    program: "85",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 4688504597,
    page: 94
  },
  {
    kind: "programme",
    section: "45",
    program: "180",
    titre: null,
    label: "Accompagnement des populations paysannes",
    amount: 34326863479,
    page: 94
  },
  {
    kind: "titre",
    section: "45",
    program: "180",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 5662824059,
    page: 94
  },
  {
    kind: "titre",
    section: "45",
    program: "180",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 1418692464,
    page: 94
  },
  {
    kind: "titre",
    section: "45",
    program: "180",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 716642359,
    page: 94
  },
  {
    kind: "titre",
    section: "45",
    program: "180",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 400000000,
    page: 94
  },
  {
    kind: "titre",
    section: "45",
    program: "180",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 3500000000,
    page: 94
  },
  {
    kind: "titre",
    section: "45",
    program: "180",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 22628704597,
    page: 94
  },
  {
    kind: "section",
    section: "46",
    program: null,
    titre: null,
    label: "INDUSTRIE",
    amount: 127554481348,
    page: 94
  },
  {
    kind: "programme",
    section: "46",
    program: "86",
    titre: null,
    label: "Administration Générale de l'Industrie",
    amount: 80408249006,
    page: 94
  },
  {
    kind: "titre",
    section: "46",
    program: "86",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 19351536356,
    page: 94
  },
  {
    kind: "titre",
    section: "46",
    program: "86",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 1658777294,
    page: 94
  },
  {
    kind: "titre",
    section: "46",
    program: "86",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 1580403343,
    page: 94
  },
  {
    kind: "titre",
    section: "46",
    program: "86",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 3301895797,
    page: 94
  },
  {
    kind: "titre",
    section: "46",
    program: "86",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 29908967203,
    page: 94
  },
  {
    kind: "titre",
    section: "46",
    program: "86",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 24606669013,
    page: 94
  },
  {
    kind: "programme",
    section: "46",
    program: "87",
    titre: null,
    label: "Développement du secteur de l'ndustrie",
    amount: 47146232342,
    page: 94
  },
  {
    kind: "titre",
    section: "46",
    program: "87",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 38685647997,
    page: 94
  },
  {
    kind: "titre",
    section: "46",
    program: "87",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 493782792,
    page: 95
  },
  {
    kind: "titre",
    section: "46",
    program: "87",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 7836823651,
    page: 95
  },
  {
    kind: "section",
    section: "47",
    program: null,
    titre: null,
    label: "COMMERCE EXTÉRIEUR",
    amount: 91496938279,
    page: 95
  },
  {
    kind: "programme",
    section: "47",
    program: "89",
    titre: null,
    label: "Administration Générale du Commerce Extérieur",
    amount: 37269798985,
    page: 95
  },
  {
    kind: "titre",
    section: "47",
    program: "89",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 13495076951,
    page: 95
  },
  {
    kind: "titre",
    section: "47",
    program: "89",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 1784352696,
    page: 95
  },
  {
    kind: "titre",
    section: "47",
    program: "89",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 1445271431,
    page: 95
  },
  {
    kind: "titre",
    section: "47",
    program: "89",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 115877449,
    page: 95
  },
  {
    kind: "titre",
    section: "47",
    program: "89",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 9174673054,
    page: 95
  },
  {
    kind: "titre",
    section: "47",
    program: "89",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 11254547404,
    page: 95
  },
  {
    kind: "programme",
    section: "47",
    program: "90",
    titre: null,
    label: "Commerce extérieur",
    amount: 54227139294,
    page: 95
  },
  {
    kind: "titre",
    section: "47",
    program: "90",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 14687948822,
    page: 95
  },
  {
    kind: "titre",
    section: "47",
    program: "90",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 431358828,
    page: 95
  },
  {
    kind: "titre",
    section: "47",
    program: "90",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 1110469681,
    page: 95
  },
  {
    kind: "titre",
    section: "47",
    program: "90",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 22884122551,
    page: 95
  },
  {
    kind: "titre",
    section: "47",
    program: "90",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 15113239412,
    page: 95
  },
  {
    kind: "section",
    section: "48",
    program: null,
    titre: null,
    label: "MINES",
    amount: 98299829859,
    page: 95
  },
  {
    kind: "programme",
    section: "48",
    program: "91",
    titre: null,
    label: "Administration Générale des Mines",
    amount: 46636479829,
    page: 95
  },
  {
    kind: "titre",
    section: "48",
    program: "91",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 18041983990,
    page: 95
  },
  {
    kind: "titre",
    section: "48",
    program: "91",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 3155349146,
    page: 95
  },
  {
    kind: "titre",
    section: "48",
    program: "91",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 3091165552,
    page: 95
  },
  {
    kind: "titre",
    section: "48",
    program: "91",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 1069702736,
    page: 95
  },
  {
    kind: "titre",
    section: "48",
    program: "91",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 21278278405,
    page: 95
  },
  {
    kind: "programme",
    section: "48",
    program: "92",
    titre: null,
    label: "Recherches Géologiques et Minières",
    amount: 5993722183,
    page: 95
  },
  {
    kind: "titre",
    section: "48",
    program: "92",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 266083923,
    page: 95
  },
  {
    kind: "titre",
    section: "48",
    program: "92",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 274235260,
    page: 95
  },
  {
    kind: "titre",
    section: "48",
    program: "92",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 245850591,
    page: 95
  },
  {
    kind: "titre",
    section: "48",
    program: "92",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 5207552409,
    page: 95
  },
  {
    kind: "programme",
    section: "48",
    program: "93",
    titre: null,
    label: "Gestion et Contrôle des Activités minières",
    amount: 45669627847,
    page: 95
  },
  {
    kind: "titre",
    section: "48",
    program: "93",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 1810686192,
    page: 95
  },
  {
    kind: "titre",
    section: "48",
    program: "93",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 1812470157,
    page: 95
  },
  {
    kind: "titre",
    section: "48",
    program: "93",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 1737663195,
    page: 95
  },
  {
    kind: "titre",
    section: "48",
    program: "93",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 40308808303,
    page: 95
  },
  {
    kind: "section",
    section: "49",
    program: null,
    titre: null,
    label: "HYDROCARBURES",
    amount: 46379018269,
    page: 95
  },
  {
    kind: "programme",
    section: "49",
    program: "94",
    titre: null,
    label: "Administration Générale des Hydrocarbures",
    amount: 45757512577,
    page: 95
  },
  {
    kind: "titre",
    section: "49",
    program: "94",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 11087357957,
    page: 95
  },
  {
    kind: "titre",
    section: "49",
    program: "94",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 2430871028,
    page: 95
  },
  {
    kind: "titre",
    section: "49",
    program: "94",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 938652938,
    page: 95
  },
  {
    kind: "titre",
    section: "49",
    program: "94",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 272467132,
    page: 95
  },
  {
    kind: "titre",
    section: "49",
    program: "94",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 14921004780,
    page: 95
  },
  {
    kind: "titre",
    section: "49",
    program: "94",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 16107158742,
    page: 95
  },
  {
    kind: "programme",
    section: "49",
    program: "95",
    titre: null,
    label: "Amont Pétrolier",
    amount: 389696462,
    page: 95
  },
  {
    kind: "titre",
    section: "49",
    program: "95",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 126675150,
    page: 95
  },
  {
    kind: "titre",
    section: "49",
    program: "95",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 78813347,
    page: 95
  },
  {
    kind: "titre",
    section: "49",
    program: "95",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 184207965,
    page: 95
  },
  {
    kind: "programme",
    section: "49",
    program: "96",
    titre: null,
    label: "Aval Pétrolier",
    amount: 231809230,
    page: 95
  },
  {
    kind: "titre",
    section: "49",
    program: "96",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 41847723,
    page: 95
  },
  {
    kind: "titre",
    section: "49",
    program: "96",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 65034360,
    page: 95
  },
  {
    kind: "titre",
    section: "49",
    program: "96",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 124927147,
    page: 95
  },
  {
    kind: "section",
    section: "50",
    program: null,
    titre: null,
    label: "RESSOURCES HYDRAULIQUES ET ELECTRICITE",
    amount: 1241388377578,
    page: 95
  },
  {
    kind: "programme",
    section: "50",
    program: "97",
    titre: null,
    label: "Administration Générale des Ressources Hydraulique et de l'Electricité",
    amount: 1062926341116,
    page: 95
  },
  {
    kind: "titre",
    section: "50",
    program: "97",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 15712470307,
    page: 95
  },
  {
    kind: "titre",
    section: "50",
    program: "97",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 2280986546,
    page: 95
  },
  {
    kind: "titre",
    section: "50",
    program: "97",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 1083240576,
    page: 95
  },
  {
    kind: "titre",
    section: "50",
    program: "97",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 947843738,
    page: 95
  },
  {
    kind: "titre",
    section: "50",
    program: "97",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 586018001427,
    page: 95
  },
  {
    kind: "titre",
    section: "50",
    program: "97",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 456883798522,
    page: 95
  },
  {
    kind: "titre",
    section: "50",
    program: "97",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 8810340160,
    page: 96
  },
  {
    kind: "titre",
    section: "50",
    program: "97",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 233588202,
    page: 96
  },
  {
    kind: "titre",
    section: "50",
    program: "97",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 224746375,
    page: 96
  },
  {
    kind: "titre",
    section: "50",
    program: "97",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 20558736118,
    page: 96
  },
  {
    kind: "titre",
    section: "50",
    program: "97",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 8935146709,
    page: 96
  },
  {
    kind: "titre",
    section: "50",
    program: "97",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 124045646428,
    page: 96
  },
  {
    kind: "programme",
    section: "50",
    program: "99",
    titre: null,
    label: "Eau potable",
    amount: 15390059808,
    page: 96
  },
  {
    kind: "titre",
    section: "50",
    program: "99",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 245731682,
    page: 96
  },
  {
    kind: "titre",
    section: "50",
    program: "99",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 102206935,
    page: 96
  },
  {
    kind: "titre",
    section: "50",
    program: "99",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 92585400,
    page: 96
  },
  {
    kind: "titre",
    section: "50",
    program: "99",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 300000000,
    page: 96
  },
  {
    kind: "titre",
    section: "50",
    program: "99",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 14649535791,
    page: 96
  },
  {
    kind: "titre",
    section: "50",
    program: "99",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 159914765,
    page: 96
  },
  {
    kind: "titre",
    section: "50",
    program: "99",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 103857897,
    page: 96
  },
  {
    kind: "section",
    section: "51",
    program: null,
    titre: null,
    label: "TRANSPORTS, VOIES DE COMMUNICATION ET DESENCLAVEMENT",
    amount: 747682412148,
    page: 96
  },
  {
    kind: "programme",
    section: "51",
    program: "101",
    titre: null,
    label: "Administration Générale des Transports et Voies de communication",
    amount: 543527202644,
    page: 96
  },
  {
    kind: "titre",
    section: "51",
    program: "101",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 90100227155,
    page: 96
  },
  {
    kind: "titre",
    section: "51",
    program: "101",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 19794166318,
    page: 96
  },
  {
    kind: "titre",
    section: "51",
    program: "101",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 1256413909,
    page: 96
  },
  {
    kind: "titre",
    section: "51",
    program: "101",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 3812290174,
    page: 96
  },
  {
    kind: "titre",
    section: "51",
    program: "101",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 92170627387,
    page: 96
  },
  {
    kind: "titre",
    section: "51",
    program: "101",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 336393477701,
    page: 96
  },
  {
    kind: "programme",
    section: "51",
    program: "102",
    titre: null,
    label: "Réglementation et développement des plateformes de transports multi-modales",
    amount: 204155209504,
    page: 96
  },
  {
    kind: "titre",
    section: "51",
    program: "102",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 27661689559,
    page: 96
  },
  {
    kind: "titre",
    section: "51",
    program: "102",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 595115270,
    page: 96
  },
  {
    kind: "titre",
    section: "51",
    program: "102",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 914189533,
    page: 96
  },
  {
    kind: "titre",
    section: "51",
    program: "102",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 20925051810,
    page: 96
  },
  {
    kind: "titre",
    section: "51",
    program: "102",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 67144863088,
    page: 96
  },
  {
    kind: "titre",
    section: "51",
    program: "102",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 86914300244,
    page: 96
  },
  {
    kind: "section",
    section: "52",
    program: null,
    titre: null,
    label: "POSTES ET TELECOMMUNICATIONS",
    amount: 84546674366,
    page: 96
  },
  {
    kind: "programme",
    section: "52",
    program: "104",
    titre: null,
    label: "Administration Générale des Postes, télécommunications et nouvelles",
    amount: 59769919159,
    page: 96
  },
  {
    kind: "titre",
    section: "52",
    program: "104",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 34506222341,
    page: 96
  },
  {
    kind: "titre",
    section: "52",
    program: "104",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 5619239378,
    page: 96
  },
  {
    kind: "titre",
    section: "52",
    program: "104",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 1922320275,
    page: 96
  },
  {
    kind: "titre",
    section: "52",
    program: "104",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 3827486213,
    page: 96
  },
  {
    kind: "titre",
    section: "52",
    program: "104",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 2559447984,
    page: 96
  },
  {
    kind: "titre",
    section: "52",
    program: "104",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 11335202968,
    page: 96
  },
  {
    kind: "programme",
    section: "52",
    program: "105",
    titre: null,
    label: "Développement du secteur postal",
    amount: 9066925220,
    page: 96
  },
  {
    kind: "titre",
    section: "52",
    program: "105",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 130055641,
    page: 96
  },
  {
    kind: "titre",
    section: "52",
    program: "105",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 62053277,
    page: 96
  },
  {
    kind: "titre",
    section: "52",
    program: "105",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 113000000,
    page: 96
  },
  {
    kind: "titre",
    section: "52",
    program: "105",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 757816302,
    page: 96
  },
  {
    kind: "titre",
    section: "52",
    program: "105",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 8004000000,
    page: 96
  },
  {
    kind: "programme",
    section: "52",
    program: "106",
    titre: null,
    label: "Développement des télécommunications et NTIC",
    amount: 15709829987,
    page: 96
  },
  {
    kind: "titre",
    section: "52",
    program: "106",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 12152146227,
    page: 96
  },
  {
    kind: "titre",
    section: "52",
    program: "106",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 181828910,
    page: 96
  },
  {
    kind: "titre",
    section: "52",
    program: "106",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 150000000,
    page: 96
  },
  {
    kind: "titre",
    section: "52",
    program: "106",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 3225854850,
    page: 96
  },
  {
    kind: "section",
    section: "53",
    program: null,
    titre: null,
    label: "COMMUNICATION ET MEDIAS",
    amount: 227020253073,
    page: 96
  },
  {
    kind: "programme",
    section: "53",
    program: "107",
    titre: null,
    label: "Administration Générale de la Communication et Médias",
    amount: 77311722330,
    page: 96
  },
  {
    kind: "titre",
    section: "53",
    program: "107",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 27311016042,
    page: 96
  },
  {
    kind: "titre",
    section: "53",
    program: "107",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 2575618992,
    page: 96
  },
  {
    kind: "titre",
    section: "53",
    program: "107",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 2787546722,
    page: 96
  },
  {
    kind: "titre",
    section: "53",
    program: "107",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 44322369261,
    page: 96
  },
  {
    kind: "titre",
    section: "53",
    program: "107",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 315171313,
    page: 96
  },
  {
    kind: "titre",
    section: "53",
    program: "107",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 249151977,
    page: 97
  },
  {
    kind: "titre",
    section: "53",
    program: "107",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 603098030,
    page: 97
  },
  {
    kind: "titre",
    section: "53",
    program: "107",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 307026302,
    page: 97
  },
  {
    kind: "programme",
    section: "53",
    program: "109",
    titre: null,
    label: "Communication",
    amount: 148549254434,
    page: 97
  },
  {
    kind: "titre",
    section: "53",
    program: "109",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 138340577684,
    page: 97
  },
  {
    kind: "titre",
    section: "53",
    program: "109",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 4215393678,
    page: 97
  },
  {
    kind: "titre",
    section: "53",
    program: "109",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 2929028370,
    page: 97
  },
  {
    kind: "titre",
    section: "53",
    program: "109",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 3064254702,
    page: 97
  },
  {
    kind: "section",
    section: "54",
    program: null,
    titre: null,
    label: "DROITS HUMAINS",
    amount: 29708290783,
    page: 97
  },
  {
    kind: "programme",
    section: "54",
    program: "110",
    titre: null,
    label: "Administration Générale des Droits Humains",
    amount: 20160254041,
    page: 97
  },
  {
    kind: "titre",
    section: "54",
    program: "110",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 10467688409,
    page: 97
  },
  {
    kind: "titre",
    section: "54",
    program: "110",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 1723841780,
    page: 97
  },
  {
    kind: "titre",
    section: "54",
    program: "110",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 1802152758,
    page: 97
  },
  {
    kind: "titre",
    section: "54",
    program: "110",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 1461294444,
    page: 97
  },
  {
    kind: "titre",
    section: "54",
    program: "110",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 2057156325,
    page: 97
  },
  {
    kind: "titre",
    section: "54",
    program: "110",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 2648120325,
    page: 97
  },
  {
    kind: "programme",
    section: "54",
    program: "111",
    titre: null,
    label: "Promotion et protection des Droits Humains",
    amount: 9548036742,
    page: 97
  },
  {
    kind: "titre",
    section: "54",
    program: "111",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 2065269205,
    page: 97
  },
  {
    kind: "titre",
    section: "54",
    program: "111",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 565016023,
    page: 97
  },
  {
    kind: "titre",
    section: "54",
    program: "111",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 164479181,
    page: 97
  },
  {
    kind: "titre",
    section: "54",
    program: "111",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 6753272333,
    page: 97
  },
  {
    kind: "section",
    section: "55",
    program: null,
    titre: null,
    label: "AFFAIRES FONCIERES",
    amount: 48744396241,
    page: 97
  },
  {
    kind: "programme",
    section: "55",
    program: "112",
    titre: null,
    label: "Administration Générale des Affaires Foncières",
    amount: 45801684351,
    page: 97
  },
  {
    kind: "titre",
    section: "55",
    program: "112",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 34561733129,
    page: 97
  },
  {
    kind: "titre",
    section: "55",
    program: "112",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 1895405263,
    page: 97
  },
  {
    kind: "titre",
    section: "55",
    program: "112",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 2058225350,
    page: 97
  },
  {
    kind: "titre",
    section: "55",
    program: "112",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 259337555,
    page: 97
  },
  {
    kind: "titre",
    section: "55",
    program: "112",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 3576752454,
    page: 97
  },
  {
    kind: "titre",
    section: "55",
    program: "112",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 3450230600,
    page: 97
  },
  {
    kind: "programme",
    section: "55",
    program: "113",
    titre: null,
    label: "Accès au Foncier",
    amount: 1031430950,
    page: 97
  },
  {
    kind: "titre",
    section: "55",
    program: "113",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 423356477,
    page: 97
  },
  {
    kind: "titre",
    section: "55",
    program: "113",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 507969031,
    page: 97
  },
  {
    kind: "titre",
    section: "55",
    program: "113",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 100105442,
    page: 97
  },
  {
    kind: "programme",
    section: "55",
    program: "114",
    titre: null,
    label: "Domaine foncier privé de l’Etat",
    amount: 1911280940,
    page: 97
  },
  {
    kind: "titre",
    section: "55",
    program: "114",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 50986525,
    page: 97
  },
  {
    kind: "titre",
    section: "55",
    program: "114",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 93695995,
    page: 97
  },
  {
    kind: "titre",
    section: "55",
    program: "114",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 1766598420,
    page: 97
  },
  {
    kind: "section",
    section: "56",
    program: null,
    titre: null,
    label: "ENVIRONNEMENT, DEVELOPPEMENT DURABLE ET NOUVELLE ECONOMIE DU CLIMAT",
    amount: 303261581031,
    page: 97
  },
  {
    kind: "programme",
    section: "56",
    program: "115",
    titre: null,
    label: "Administration Générale de l'Environnement et Conservation de la nature",
    amount: 8878813039,
    page: 97
  },
  {
    kind: "titre",
    section: "56",
    program: "115",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 1394249848,
    page: 97
  },
  {
    kind: "titre",
    section: "56",
    program: "115",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 2203506926,
    page: 97
  },
  {
    kind: "titre",
    section: "56",
    program: "115",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 923402890,
    page: 97
  },
  {
    kind: "titre",
    section: "56",
    program: "115",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 2000000000,
    page: 97
  },
  {
    kind: "titre",
    section: "56",
    program: "115",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 1440500000,
    page: 97
  },
  {
    kind: "titre",
    section: "56",
    program: "115",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 917153375,
    page: 97
  },
  {
    kind: "programme",
    section: "56",
    program: "116",
    titre: null,
    label: "Environnement et cadre de vie",
    amount: 11949811567,
    page: 97
  },
  {
    kind: "titre",
    section: "56",
    program: "116",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 11209577676,
    page: 97
  },
  {
    kind: "titre",
    section: "56",
    program: "116",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 171301638,
    page: 97
  },
  {
    kind: "titre",
    section: "56",
    program: "116",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 355776677,
    page: 97
  },
  {
    kind: "titre",
    section: "56",
    program: "116",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 213155576,
    page: 97
  },
  {
    kind: "programme",
    section: "56",
    program: "117",
    titre: null,
    label: "Gestion des Ressources Forestières",
    amount: 1519494022,
    page: 97
  },
  {
    kind: "titre",
    section: "56",
    program: "117",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 687966377,
    page: 97
  },
  {
    kind: "titre",
    section: "56",
    program: "117",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 327076856,
    page: 97
  },
  {
    kind: "titre",
    section: "56",
    program: "117",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 320956085,
    page: 97
  },
  {
    kind: "titre",
    section: "56",
    program: "117",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 183494704,
    page: 97
  },
  {
    kind: "programme",
    section: "56",
    program: "118",
    titre: null,
    label: "Gestion des Ressources en eau",
    amount: 462928644,
    page: 97
  },
  {
    kind: "titre",
    section: "56",
    program: "118",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 286776216,
    page: 97
  },
  {
    kind: "programme",
    section: "56",
    program: "119",
    titre: null,
    label: "Conservation de la diversité biologique",
    amount: 22806866094,
    page: 98
  },
  {
    kind: "titre",
    section: "56",
    program: "119",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 18218324902,
    page: 98
  },
  {
    kind: "titre",
    section: "56",
    program: "119",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 3188541192,
    page: 98
  },
  {
    kind: "titre",
    section: "56",
    program: "119",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 1400000000,
    page: 98
  },
  {
    kind: "titre",
    section: "56",
    program: "119",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 35937936184,
    page: 98
  },
  {
    kind: "titre",
    section: "56",
    program: "119",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 1189341968,
    page: 98
  },
  {
    kind: "titre",
    section: "56",
    program: "119",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 10213617590,
    page: 98
  },
  {
    kind: "titre",
    section: "56",
    program: "119",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 7905061056,
    page: 98
  },
  {
    kind: "titre",
    section: "56",
    program: "119",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 200431164242,
    page: 98
  },
  {
    kind: "titre",
    section: "56",
    program: "119",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 1966546625,
    page: 98
  },
  {
    kind: "section",
    section: "57",
    program: null,
    titre: null,
    label: "TOURISME",
    amount: 225734182790,
    page: 98
  },
  {
    kind: "programme",
    section: "57",
    program: "120",
    titre: null,
    label: "Administration Générale du Tourisme",
    amount: 195682826710,
    page: 98
  },
  {
    kind: "titre",
    section: "57",
    program: "120",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 30951764214,
    page: 98
  },
  {
    kind: "titre",
    section: "57",
    program: "120",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 16333955871,
    page: 98
  },
  {
    kind: "titre",
    section: "57",
    program: "120",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 2417276245,
    page: 98
  },
  {
    kind: "titre",
    section: "57",
    program: "120",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 1007619109,
    page: 98
  },
  {
    kind: "titre",
    section: "57",
    program: "120",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 144972211271,
    page: 98
  },
  {
    kind: "programme",
    section: "57",
    program: "121",
    titre: null,
    label: "Développement des Ressources touristiques",
    amount: 1927681926,
    page: 98
  },
  {
    kind: "titre",
    section: "57",
    program: "121",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 751909997,
    page: 98
  },
  {
    kind: "titre",
    section: "57",
    program: "121",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 800013926,
    page: 98
  },
  {
    kind: "titre",
    section: "57",
    program: "121",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 375758003,
    page: 98
  },
  {
    kind: "programme",
    section: "57",
    program: "188",
    titre: null,
    label: "Promotion de la destination RDC",
    amount: 28123674154,
    page: 98
  },
  {
    kind: "titre",
    section: "57",
    program: "188",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 20956802251,
    page: 98
  },
  {
    kind: "titre",
    section: "57",
    program: "188",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 7166871903,
    page: 98
  },
  {
    kind: "section",
    section: "58",
    program: null,
    titre: null,
    label: "CULTURE, ARTS ET PATRIMOINE",
    amount: 189055985601,
    page: 98
  },
  {
    kind: "programme",
    section: "58",
    program: "103",
    titre: null,
    label: "Coopération culturelle",
    amount: 22552354508,
    page: 98
  },
  {
    kind: "titre",
    section: "58",
    program: "103",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 19339513327,
    page: 98
  },
  {
    kind: "titre",
    section: "58",
    program: "103",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 93544951,
    page: 98
  },
  {
    kind: "titre",
    section: "58",
    program: "103",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 159108628,
    page: 98
  },
  {
    kind: "titre",
    section: "58",
    program: "103",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 2960187602,
    page: 98
  },
  {
    kind: "programme",
    section: "58",
    program: "122",
    titre: null,
    label: "Administration Générale de la Culture et Arts",
    amount: 50259966282,
    page: 98
  },
  {
    kind: "titre",
    section: "58",
    program: "122",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 21404830893,
    page: 98
  },
  {
    kind: "titre",
    section: "58",
    program: "122",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 1953941467,
    page: 98
  },
  {
    kind: "titre",
    section: "58",
    program: "122",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 795743692,
    page: 98
  },
  {
    kind: "titre",
    section: "58",
    program: "122",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 2020000000,
    page: 98
  },
  {
    kind: "titre",
    section: "58",
    program: "122",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 5582450230,
    page: 98
  },
  {
    kind: "titre",
    section: "58",
    program: "122",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 18503000000,
    page: 98
  },
  {
    kind: "programme",
    section: "58",
    program: "123",
    titre: null,
    label: "Développement de la Culture et des Arts",
    amount: 6595636577,
    page: 98
  },
  {
    kind: "titre",
    section: "58",
    program: "123",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 4215447741,
    page: 98
  },
  {
    kind: "titre",
    section: "58",
    program: "123",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 464667915,
    page: 98
  },
  {
    kind: "titre",
    section: "58",
    program: "123",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 434459664,
    page: 98
  },
  {
    kind: "titre",
    section: "58",
    program: "123",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 1481061257,
    page: 98
  },
  {
    kind: "programme",
    section: "58",
    program: "124",
    titre: null,
    label: "Protection du Patrimoine culturel",
    amount: 109648028234,
    page: 98
  },
  {
    kind: "titre",
    section: "58",
    program: "124",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 101275733585,
    page: 98
  },
  {
    kind: "titre",
    section: "58",
    program: "124",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 4457744879,
    page: 98
  },
  {
    kind: "titre",
    section: "58",
    program: "124",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 2314549770,
    page: 98
  },
  {
    kind: "titre",
    section: "58",
    program: "124",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 1600000000,
    page: 98
  },
  {
    kind: "section",
    section: "59",
    program: null,
    titre: null,
    label: "JEUNESSE",
    amount: 77451804262,
    page: 98
  },
  {
    kind: "programme",
    section: "59",
    program: "55",
    titre: null,
    label: "Initiation à la Nouvelle citoyenneté",
    amount: 775967084,
    page: 98
  },
  {
    kind: "titre",
    section: "59",
    program: "55",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 84367902,
    page: 98
  },
  {
    kind: "titre",
    section: "59",
    program: "55",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 123961310,
    page: 98
  },
  {
    kind: "titre",
    section: "59",
    program: "55",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 123070961,
    page: 98
  },
  {
    kind: "titre",
    section: "59",
    program: "55",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 444566911,
    page: 98
  },
  {
    kind: "programme",
    section: "59",
    program: "125",
    titre: null,
    label: "Administration Générale de la Jeunesse",
    amount: 57577765098,
    page: 98
  },
  {
    kind: "titre",
    section: "59",
    program: "125",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 31599224501,
    page: 98
  },
  {
    kind: "titre",
    section: "59",
    program: "125",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 2676255748,
    page: 98
  },
  {
    kind: "titre",
    section: "59",
    program: "125",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 10300301551,
    page: 99
  },
  {
    kind: "titre",
    section: "59",
    program: "125",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 4036122869,
    page: 99
  },
  {
    kind: "titre",
    section: "59",
    program: "125",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 5572990000,
    page: 99
  },
  {
    kind: "programme",
    section: "59",
    program: "126",
    titre: null,
    label: "Insertion sociale des adolescents et Jeunes",
    amount: 19098072080,
    page: 99
  },
  {
    kind: "titre",
    section: "59",
    program: "126",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 7566438476,
    page: 99
  },
  {
    kind: "titre",
    section: "59",
    program: "126",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 368702133,
    page: 99
  },
  {
    kind: "titre",
    section: "59",
    program: "126",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 430125617,
    page: 99
  },
  {
    kind: "titre",
    section: "59",
    program: "126",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 10732805854,
    page: 99
  },
  {
    kind: "section",
    section: "60",
    program: null,
    titre: null,
    label: "SPORTS ET LOISIRS",
    amount: 49640638636,
    page: 99
  },
  {
    kind: "programme",
    section: "60",
    program: "127",
    titre: null,
    label: "Administration Générale des Sports et Loisirs",
    amount: 36974533988,
    page: 99
  },
  {
    kind: "titre",
    section: "60",
    program: "127",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 14163776053,
    page: 99
  },
  {
    kind: "titre",
    section: "60",
    program: "127",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 1551303437,
    page: 99
  },
  {
    kind: "titre",
    section: "60",
    program: "127",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 5177489774,
    page: 99
  },
  {
    kind: "titre",
    section: "60",
    program: "127",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 3397533472,
    page: 99
  },
  {
    kind: "titre",
    section: "60",
    program: "127",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 1736506862,
    page: 99
  },
  {
    kind: "titre",
    section: "60",
    program: "127",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 10947924391,
    page: 99
  },
  {
    kind: "programme",
    section: "60",
    program: "128",
    titre: null,
    label: "Création et gestion des infrastructures des Sport et Loisirs",
    amount: 8621523462,
    page: 99
  },
  {
    kind: "titre",
    section: "60",
    program: "128",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 891062600,
    page: 99
  },
  {
    kind: "titre",
    section: "60",
    program: "128",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 648817186,
    page: 99
  },
  {
    kind: "titre",
    section: "60",
    program: "128",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 531095507,
    page: 99
  },
  {
    kind: "titre",
    section: "60",
    program: "128",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 6550548168,
    page: 99
  },
  {
    kind: "programme",
    section: "60",
    program: "200",
    titre: null,
    label: "Développement des Sport et des Loisirs",
    amount: 4044581186,
    page: 99
  },
  {
    kind: "titre",
    section: "60",
    program: "200",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 1465365615,
    page: 99
  },
  {
    kind: "titre",
    section: "60",
    program: "200",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 628018510,
    page: 99
  },
  {
    kind: "titre",
    section: "60",
    program: "200",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 1099831505,
    page: 99
  },
  {
    kind: "titre",
    section: "60",
    program: "200",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 851365557,
    page: 99
  },
  {
    kind: "section",
    section: "61",
    program: null,
    titre: null,
    label: "FONCTION PUBLIQUE, MODERNISATION DE L'ADMINISTRATION ET INNOVATION DU SERVICE PUBLIC",
    amount: 757100768982,
    page: 99
  },
  {
    kind: "programme",
    section: "61",
    program: "31",
    titre: null,
    label: "Réforme de l'Administration publique",
    amount: 6151181565,
    page: 99
  },
  {
    kind: "titre",
    section: "61",
    program: "31",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 4106317642,
    page: 99
  },
  {
    kind: "titre",
    section: "61",
    program: "31",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 92036977,
    page: 99
  },
  {
    kind: "titre",
    section: "61",
    program: "31",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 161582743,
    page: 99
  },
  {
    kind: "titre",
    section: "61",
    program: "31",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 1196244203,
    page: 99
  },
  {
    kind: "titre",
    section: "61",
    program: "31",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 300000000,
    page: 99
  },
  {
    kind: "titre",
    section: "61",
    program: "31",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 295000000,
    page: 99
  },
  {
    kind: "programme",
    section: "61",
    program: "129",
    titre: null,
    label: "Administration Générale de la Fonction Publique",
    amount: 465741570500,
    page: 99
  },
  {
    kind: "titre",
    section: "61",
    program: "129",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 379078576150,
    page: 99
  },
  {
    kind: "titre",
    section: "61",
    program: "129",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 1116420131,
    page: 99
  },
  {
    kind: "titre",
    section: "61",
    program: "129",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 23435113484,
    page: 99
  },
  {
    kind: "titre",
    section: "61",
    program: "129",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 6788637972,
    page: 99
  },
  {
    kind: "titre",
    section: "61",
    program: "129",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 32985711950,
    page: 99
  },
  {
    kind: "titre",
    section: "61",
    program: "129",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 22337110813,
    page: 99
  },
  {
    kind: "programme",
    section: "61",
    program: "130",
    titre: null,
    label: "Amelioration de la Gestion des ressources humaines des services publics de",
    amount: 20275818670,
    page: 99
  },
  {
    kind: "titre",
    section: "61",
    program: "130",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 13082235385,
    page: 99
  },
  {
    kind: "titre",
    section: "61",
    program: "130",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 744197127,
    page: 99
  },
  {
    kind: "titre",
    section: "61",
    program: "130",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 1519541443,
    page: 99
  },
  {
    kind: "titre",
    section: "61",
    program: "130",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 1843271018,
    page: 99
  },
  {
    kind: "titre",
    section: "61",
    program: "130",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 3086573697,
    page: 99
  },
  {
    kind: "programme",
    section: "61",
    program: "131",
    titre: null,
    label: "Gestion des Retraités et Rentiers de l'Etat",
    amount: 478318168,
    page: 99
  },
  {
    kind: "titre",
    section: "61",
    program: "131",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 58960759,
    page: 99
  },
  {
    kind: "titre",
    section: "61",
    program: "131",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 120050592,
    page: 99
  },
  {
    kind: "titre",
    section: "61",
    program: "131",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 299306817,
    page: 99
  },
  {
    kind: "titre",
    section: "61",
    program: "131",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 261422653448,
    page: 99
  },
  {
    kind: "titre",
    section: "61",
    program: "131",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 60815435,
    page: 99
  },
  {
    kind: "titre",
    section: "61",
    program: "131",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 360906307,
    page: 99
  },
  {
    kind: "titre",
    section: "61",
    program: "131",
    titre: "7",
    label: "EQUIPEMENTS EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 624885666,
    page: 99
  },
  {
    kind: "section",
    section: "62",
    program: null,
    titre: null,
    label: "EMPLOI ET TRAVAIL",
    amount: 113332761300,
    page: 100
  },
  {
    kind: "programme",
    section: "62",
    program: "132",
    titre: null,
    label: "Administration Générale de l'Emploi et Travail",
    amount: 37100641775,
    page: 100
  },
  {
    kind: "titre",
    section: "62",
    program: "132",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 25015425800,
    page: 100
  },
  {
    kind: "titre",
    section: "62",
    program: "132",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 557019517,
    page: 100
  },
  {
    kind: "titre",
    section: "62",
    program: "132",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 879443924,
    page: 100
  },
  {
    kind: "titre",
    section: "62",
    program: "132",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 120973421,
    page: 100
  },
  {
    kind: "titre",
    section: "62",
    program: "132",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 8013429113,
    page: 100
  },
  {
    kind: "titre",
    section: "62",
    program: "132",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 2514350000,
    page: 100
  },
  {
    kind: "programme",
    section: "62",
    program: "133",
    titre: null,
    label: "Formation Professionnelle",
    amount: 3746126752,
    page: 100
  },
  {
    kind: "titre",
    section: "62",
    program: "133",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 1368847502,
    page: 100
  },
  {
    kind: "titre",
    section: "62",
    program: "133",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 124049143,
    page: 100
  },
  {
    kind: "titre",
    section: "62",
    program: "133",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 57187842,
    page: 100
  },
  {
    kind: "titre",
    section: "62",
    program: "133",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 82697028,
    page: 100
  },
  {
    kind: "titre",
    section: "62",
    program: "133",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 2113345237,
    page: 100
  },
  {
    kind: "programme",
    section: "62",
    program: "134",
    titre: null,
    label: "Promotion de l'Emploi et du Travail",
    amount: 72485992773,
    page: 100
  },
  {
    kind: "titre",
    section: "62",
    program: "134",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 69687951886,
    page: 100
  },
  {
    kind: "titre",
    section: "62",
    program: "134",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 163262909,
    page: 100
  },
  {
    kind: "titre",
    section: "62",
    program: "134",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 486514730,
    page: 100
  },
  {
    kind: "titre",
    section: "62",
    program: "134",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 749851150,
    page: 100
  },
  {
    kind: "titre",
    section: "62",
    program: "134",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 1398412098,
    page: 100
  },
  {
    kind: "section",
    section: "63",
    program: null,
    titre: null,
    label: "PREVOYANCE SOCIALE",
    amount: 170062711638,
    page: 100
  },
  {
    kind: "programme",
    section: "63",
    program: "135",
    titre: null,
    label: "Administration Générale de la Prévoyance Sociale",
    amount: 94681675527,
    page: 100
  },
  {
    kind: "titre",
    section: "63",
    program: "135",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 9377466114,
    page: 100
  },
  {
    kind: "titre",
    section: "63",
    program: "135",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 479650280,
    page: 100
  },
  {
    kind: "titre",
    section: "63",
    program: "135",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 814991277,
    page: 100
  },
  {
    kind: "titre",
    section: "63",
    program: "135",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 78959305868,
    page: 100
  },
  {
    kind: "titre",
    section: "63",
    program: "135",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 5050261988,
    page: 100
  },
  {
    kind: "programme",
    section: "63",
    program: "136",
    titre: null,
    label: "Protection Sociale",
    amount: 75381036111,
    page: 100
  },
  {
    kind: "titre",
    section: "63",
    program: "136",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 5693876845,
    page: 100
  },
  {
    kind: "titre",
    section: "63",
    program: "136",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 294657229,
    page: 100
  },
  {
    kind: "titre",
    section: "63",
    program: "136",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 612350516,
    page: 100
  },
  {
    kind: "titre",
    section: "63",
    program: "136",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 68780151521,
    page: 100
  },
  {
    kind: "section",
    section: "64",
    program: null,
    titre: null,
    label: "AFFAIRES SOCIALES, ACTIONS HUMANITAIRES ET SOLIDARITE NATIONALE",
    amount: 222595624986,
    page: 100
  },
  {
    kind: "programme",
    section: "64",
    program: "156",
    titre: null,
    label: "Assistance sociale",
    amount: 38873258233,
    page: 100
  },
  {
    kind: "titre",
    section: "64",
    program: "156",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 25071464758,
    page: 100
  },
  {
    kind: "titre",
    section: "64",
    program: "156",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 386794322,
    page: 100
  },
  {
    kind: "titre",
    section: "64",
    program: "156",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 507103155,
    page: 100
  },
  {
    kind: "titre",
    section: "64",
    program: "156",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 12907895998,
    page: 100
  },
  {
    kind: "programme",
    section: "64",
    program: "169",
    titre: null,
    label: "Administration Générale des Affaires Sociales",
    amount: 124919936465,
    page: 100
  },
  {
    kind: "titre",
    section: "64",
    program: "169",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 47035986690,
    page: 100
  },
  {
    kind: "titre",
    section: "64",
    program: "169",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 1717100004,
    page: 100
  },
  {
    kind: "titre",
    section: "64",
    program: "169",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 1871360330,
    page: 100
  },
  {
    kind: "titre",
    section: "64",
    program: "169",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 1528477776,
    page: 100
  },
  {
    kind: "titre",
    section: "64",
    program: "169",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 61164752493,
    page: 100
  },
  {
    kind: "titre",
    section: "64",
    program: "169",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 11602259172,
    page: 100
  },
  {
    kind: "programme",
    section: "64",
    program: "179",
    titre: null,
    label: "Promotion sociale des personnes vulnérables",
    amount: 4794721912,
    page: 100
  },
  {
    kind: "titre",
    section: "64",
    program: "179",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 3846590196,
    page: 100
  },
  {
    kind: "titre",
    section: "64",
    program: "179",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 117152430,
    page: 100
  },
  {
    kind: "titre",
    section: "64",
    program: "179",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 31328982,
    page: 100
  },
  {
    kind: "titre",
    section: "64",
    program: "179",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 799650304,
    page: 100
  },
  {
    kind: "programme",
    section: "64",
    program: "181",
    titre: null,
    label: "Promotion de la Solidarité nationale",
    amount: 54007708376,
    page: 100
  },
  {
    kind: "titre",
    section: "64",
    program: "181",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 14586423621,
    page: 100
  },
  {
    kind: "titre",
    section: "64",
    program: "181",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 1752811120,
    page: 100
  },
  {
    kind: "titre",
    section: "64",
    program: "181",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 2421332023,
    page: 100
  },
  {
    kind: "titre",
    section: "64",
    program: "181",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 1540429593,
    page: 100
  },
  {
    kind: "titre",
    section: "64",
    program: "181",
    titre: "7",
    label: "EQUIPEMENTS EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 32949141492,
    page: 100
  },
  {
    kind: "section",
    section: "65",
    program: null,
    titre: null,
    label: "GENRE, FAMILLE ET ENFANT",
    amount: 127966983513,
    page: 101
  },
  {
    kind: "programme",
    section: "65",
    program: "137",
    titre: null,
    label: "Administration Générale du Genre, Famille et Enfant",
    amount: 104382274292,
    page: 101
  },
  {
    kind: "titre",
    section: "65",
    program: "137",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 17607888119,
    page: 101
  },
  {
    kind: "titre",
    section: "65",
    program: "137",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 1773339319,
    page: 101
  },
  {
    kind: "titre",
    section: "65",
    program: "137",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 1044317259,
    page: 101
  },
  {
    kind: "titre",
    section: "65",
    program: "137",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 106181791,
    page: 101
  },
  {
    kind: "titre",
    section: "65",
    program: "137",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 81387743315,
    page: 101
  },
  {
    kind: "titre",
    section: "65",
    program: "137",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 2462804489,
    page: 101
  },
  {
    kind: "programme",
    section: "65",
    program: "138",
    titre: null,
    label: "Statut de la Femme et Egalité de genre",
    amount: 11800538337,
    page: 101
  },
  {
    kind: "titre",
    section: "65",
    program: "138",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 10587893060,
    page: 101
  },
  {
    kind: "titre",
    section: "65",
    program: "138",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 256433265,
    page: 101
  },
  {
    kind: "titre",
    section: "65",
    program: "138",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 956212012,
    page: 101
  },
  {
    kind: "programme",
    section: "65",
    program: "139",
    titre: null,
    label: "Promotion et Protection des droits de la famille et de l'enfant",
    amount: 11101974174,
    page: 101
  },
  {
    kind: "titre",
    section: "65",
    program: "139",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 5699370892,
    page: 101
  },
  {
    kind: "titre",
    section: "65",
    program: "139",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 140810340,
    page: 101
  },
  {
    kind: "titre",
    section: "65",
    program: "139",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 5040380330,
    page: 101
  },
  {
    kind: "titre",
    section: "65",
    program: "139",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 221412612,
    page: 101
  },
  {
    kind: "titre",
    section: "65",
    program: "139",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 184330340,
    page: 101
  },
  {
    kind: "titre",
    section: "65",
    program: "139",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 194890341,
    page: 101
  },
  {
    kind: "titre",
    section: "65",
    program: "139",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 302976029,
    page: 101
  },
  {
    kind: "section",
    section: "68",
    program: null,
    titre: null,
    label: "PERSONNES VIVANT AVEC HANDICAP",
    amount: 55041853315,
    page: 101
  },
  {
    kind: "programme",
    section: "68",
    program: "189",
    titre: null,
    label: "Administration Générale des Personnes vivant avec handicap",
    amount: 55041853315,
    page: 101
  },
  {
    kind: "titre",
    section: "68",
    program: "189",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 10047484676,
    page: 101
  },
  {
    kind: "titre",
    section: "68",
    program: "189",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 2822137990,
    page: 101
  },
  {
    kind: "titre",
    section: "68",
    program: "189",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 837822136,
    page: 101
  },
  {
    kind: "titre",
    section: "68",
    program: "189",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 11139044281,
    page: 101
  },
  {
    kind: "titre",
    section: "68",
    program: "189",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 6950000000,
    page: 101
  },
  {
    kind: "titre",
    section: "68",
    program: "189",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 23245364232,
    page: 101
  },
  {
    kind: "section",
    section: "69",
    program: null,
    titre: null,
    label: "INTEGRATION REGIONALE",
    amount: 43808905026,
    page: 101
  },
  {
    kind: "programme",
    section: "69",
    program: "157",
    titre: null,
    label: "Redynamisation de l'Intégration Régionale",
    amount: 2773791820,
    page: 101
  },
  {
    kind: "titre",
    section: "69",
    program: "157",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 647257623,
    page: 101
  },
  {
    kind: "titre",
    section: "69",
    program: "157",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 693975484,
    page: 101
  },
  {
    kind: "titre",
    section: "69",
    program: "157",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 1432558713,
    page: 101
  },
  {
    kind: "programme",
    section: "69",
    program: "170",
    titre: null,
    label: "Administration Générale de l'Intégration Régionale",
    amount: 41035113206,
    page: 101
  },
  {
    kind: "titre",
    section: "69",
    program: "170",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 29795162131,
    page: 101
  },
  {
    kind: "titre",
    section: "69",
    program: "170",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 1965727103,
    page: 101
  },
  {
    kind: "titre",
    section: "69",
    program: "170",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 3135885054,
    page: 101
  },
  {
    kind: "titre",
    section: "69",
    program: "170",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 3531338918,
    page: 101
  },
  {
    kind: "titre",
    section: "69",
    program: "170",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 1614327398,
    page: 101
  },
  {
    kind: "titre",
    section: "69",
    program: "170",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 992672602,
    page: 101
  },
  {
    kind: "section",
    section: "70",
    program: null,
    titre: null,
    label: "ACTIONS HUMANITAIRES ET SOLIDARITE NATIONALE",
    amount: 147947328657,
    page: 101
  },
  {
    kind: "programme",
    section: "70",
    program: "158",
    titre: null,
    label: "Prevention et Reduction des risques des catastrophes et de deplacements",
    amount: 4938521375,
    page: 101
  },
  {
    kind: "titre",
    section: "70",
    program: "158",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 87946953,
    page: 101
  },
  {
    kind: "titre",
    section: "70",
    program: "158",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 259682196,
    page: 101
  },
  {
    kind: "titre",
    section: "70",
    program: "158",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 331430056,
    page: 101
  },
  {
    kind: "titre",
    section: "70",
    program: "158",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 4259462170,
    page: 101
  },
  {
    kind: "programme",
    section: "70",
    program: "171",
    titre: null,
    label: "Administration Générale des Actions Humanitaires et Solidarité Nationale",
    amount: 102664995288,
    page: 101
  },
  {
    kind: "titre",
    section: "70",
    program: "171",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 14605660516,
    page: 101
  },
  {
    kind: "titre",
    section: "70",
    program: "171",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 1350009317,
    page: 101
  },
  {
    kind: "titre",
    section: "70",
    program: "171",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 756546786,
    page: 101
  },
  {
    kind: "titre",
    section: "70",
    program: "171",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 79722855148,
    page: 101
  },
  {
    kind: "titre",
    section: "70",
    program: "171",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 5566641173,
    page: 101
  },
  {
    kind: "titre",
    section: "70",
    program: "171",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 663282348,
    page: 101
  },
  {
    kind: "programme",
    section: "70",
    program: "199",
    titre: null,
    label: "Préparation et organisation de la réponse humanitaire d'Urgence",
    amount: 40343811994,
    page: 101
  },
  {
    kind: "titre",
    section: "70",
    program: "199",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 4481564755,
    page: 101
  },
  {
    kind: "titre",
    section: "70",
    program: "199",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 91295972,
    page: 102
  },
  {
    kind: "titre",
    section: "70",
    program: "199",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 35686253835,
    page: 102
  },
  {
    kind: "section",
    section: "71",
    program: null,
    titre: null,
    label: "ECONOMIE NUMERIQUE",
    amount: 189044299408,
    page: 102
  },
  {
    kind: "programme",
    section: "71",
    program: "190",
    titre: null,
    label: "Administration Générale du Numérique",
    amount: 187247890526,
    page: 102
  },
  {
    kind: "titre",
    section: "71",
    program: "190",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 32496239987,
    page: 102
  },
  {
    kind: "titre",
    section: "71",
    program: "190",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 6825851746,
    page: 102
  },
  {
    kind: "titre",
    section: "71",
    program: "190",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 1173655982,
    page: 102
  },
  {
    kind: "titre",
    section: "71",
    program: "190",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 2240496320,
    page: 102
  },
  {
    kind: "titre",
    section: "71",
    program: "190",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 144511646491,
    page: 102
  },
  {
    kind: "programme",
    section: "71",
    program: "211",
    titre: null,
    label: "Développement du Numérique",
    amount: 1796408882,
    page: 102
  },
  {
    kind: "titre",
    section: "71",
    program: "211",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 956395862,
    page: 102
  },
  {
    kind: "titre",
    section: "71",
    program: "211",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 840013020,
    page: 102
  },
  {
    kind: "section",
    section: "74",
    program: null,
    titre: null,
    label: "PORTEFEUILLE",
    amount: 270756449819,
    page: 102
  },
  {
    kind: "programme",
    section: "74",
    program: "140",
    titre: null,
    label: "Administration Générale du Portefeuille",
    amount: 197094489586,
    page: 102
  },
  {
    kind: "titre",
    section: "74",
    program: "140",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 10420587084,
    page: 102
  },
  {
    kind: "titre",
    section: "74",
    program: "140",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 4022039507,
    page: 102
  },
  {
    kind: "titre",
    section: "74",
    program: "140",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 4158121455,
    page: 102
  },
  {
    kind: "titre",
    section: "74",
    program: "140",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 175060454714,
    page: 102
  },
  {
    kind: "titre",
    section: "74",
    program: "140",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 3433286826,
    page: 102
  },
  {
    kind: "programme",
    section: "74",
    program: "141",
    titre: null,
    label: "Gouvernance des entreprises du Portefeuille",
    amount: 67218174469,
    page: 102
  },
  {
    kind: "titre",
    section: "74",
    program: "141",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 7616446339,
    page: 102
  },
  {
    kind: "titre",
    section: "74",
    program: "141",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 196968013,
    page: 102
  },
  {
    kind: "titre",
    section: "74",
    program: "141",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 302371776,
    page: 102
  },
  {
    kind: "titre",
    section: "74",
    program: "141",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 59102388341,
    page: 102
  },
  {
    kind: "programme",
    section: "74",
    program: "142",
    titre: null,
    label: "Restructuration du Portefeuille et Désengagement de l'Etat",
    amount: 6443785764,
    page: 102
  },
  {
    kind: "titre",
    section: "74",
    program: "142",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 3175176471,
    page: 102
  },
  {
    kind: "titre",
    section: "74",
    program: "142",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 245415738,
    page: 102
  },
  {
    kind: "titre",
    section: "74",
    program: "142",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 639232405,
    page: 102
  },
  {
    kind: "titre",
    section: "74",
    program: "142",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 32229175,
    page: 102
  },
  {
    kind: "titre",
    section: "74",
    program: "142",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 2351731975,
    page: 102
  },
  {
    kind: "section",
    section: "76",
    program: null,
    titre: null,
    label: "COMITE NATIONAL DE SUIVI DE L'ACCORD DE LA St SYLVESTRE",
    amount: 4857882709,
    page: 102
  },
  {
    kind: "programme",
    section: "76",
    program: "160",
    titre: null,
    label: "Accord de la Ste Sylvestre",
    amount: 4857882709,
    page: 102
  },
  {
    kind: "titre",
    section: "76",
    program: "160",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 3208260472,
    page: 102
  },
  {
    kind: "titre",
    section: "76",
    program: "160",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 1649622237,
    page: 102
  },
  {
    kind: "section",
    section: "77",
    program: null,
    titre: null,
    label: "COMMISSION ELECTORALE NATIONALE INDEPENDANTE",
    amount: 517687871066,
    page: 102
  },
  {
    kind: "programme",
    section: "77",
    program: "143",
    titre: null,
    label: "Organisation des processsus électoraux et référendaires",
    amount: 517687871066,
    page: 102
  },
  {
    kind: "titre",
    section: "77",
    program: "143",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 104176652176,
    page: 102
  },
  {
    kind: "titre",
    section: "77",
    program: "143",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 2854158606,
    page: 102
  },
  {
    kind: "titre",
    section: "77",
    program: "143",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 6833879266,
    page: 102
  },
  {
    kind: "titre",
    section: "77",
    program: "143",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 403386848906,
    page: 102
  },
  {
    kind: "titre",
    section: "77",
    program: "143",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 436332112,
    page: 102
  },
  {
    kind: "section",
    section: "78",
    program: null,
    titre: null,
    label: "FORMATION PROFESSIONNELLE",
    amount: 166830235195,
    page: 102
  },
  {
    kind: "programme",
    section: "78",
    program: "161",
    titre: null,
    label: "Enseignement et Formation professionnelle",
    amount: 24405504737,
    page: 102
  },
  {
    kind: "titre",
    section: "78",
    program: "161",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 17324588814,
    page: 102
  },
  {
    kind: "titre",
    section: "78",
    program: "161",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 3029833141,
    page: 102
  },
  {
    kind: "titre",
    section: "78",
    program: "161",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 2589058250,
    page: 102
  },
  {
    kind: "titre",
    section: "78",
    program: "161",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 1061295332,
    page: 102
  },
  {
    kind: "titre",
    section: "78",
    program: "161",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 400729200,
    page: 102
  },
  {
    kind: "programme",
    section: "78",
    program: "173",
    titre: null,
    label: "Administration Générale de la Formation professionnelle",
    amount: 137786071157,
    page: 102
  },
  {
    kind: "titre",
    section: "78",
    program: "173",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 46357040425,
    page: 102
  },
  {
    kind: "titre",
    section: "78",
    program: "173",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 7803218135,
    page: 102
  },
  {
    kind: "titre",
    section: "78",
    program: "173",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 14098847596,
    page: 102
  },
  {
    kind: "titre",
    section: "78",
    program: "173",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 2455542001,
    page: 102
  },
  {
    kind: "titre",
    section: "78",
    program: "173",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 24054872330,
    page: 102
  },
  {
    kind: "titre",
    section: "78",
    program: "173",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 43016550670,
    page: 102
  },
  {
    kind: "programme",
    section: "78",
    program: "194",
    titre: null,
    label: "Apprentissage, réinsertion scolaire et insertion professionnelle",
    amount: 2429372756,
    page: 102
  },
  {
    kind: "titre",
    section: "78",
    program: "194",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 255197155,
    page: 102
  },
  {
    kind: "titre",
    section: "78",
    program: "194",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 250600311,
    page: 102
  },
  {
    kind: "titre",
    section: "78",
    program: "194",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 836833105,
    page: 103
  },
  {
    kind: "titre",
    section: "78",
    program: "194",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 200000000,
    page: 103
  },
  {
    kind: "programme",
    section: "78",
    program: "195",
    titre: null,
    label: "Arts et Métiers",
    amount: 687599989,
    page: 103
  },
  {
    kind: "titre",
    section: "78",
    program: "195",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 148328405,
    page: 103
  },
  {
    kind: "titre",
    section: "78",
    program: "195",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 93700754,
    page: 103
  },
  {
    kind: "titre",
    section: "78",
    program: "195",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 445570830,
    page: 103
  },
  {
    kind: "programme",
    section: "78",
    program: "196",
    titre: null,
    label: "Evaluation pédagogique et professionnelle",
    amount: 1521686556,
    page: 103
  },
  {
    kind: "titre",
    section: "78",
    program: "196",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 419177432,
    page: 103
  },
  {
    kind: "titre",
    section: "78",
    program: "196",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 311354671,
    page: 103
  },
  {
    kind: "titre",
    section: "78",
    program: "196",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 791154453,
    page: 103
  },
  {
    kind: "section",
    section: "79",
    program: null,
    titre: null,
    label: "CONSEIL ÉCONOMIQUE ET SOCIAL DE LA REPUBLIQUE",
    amount: 64959719726,
    page: 103
  },
  {
    kind: "programme",
    section: "79",
    program: "100",
    titre: null,
    label: "Administration Générale du Conseil Economique et Social",
    amount: 44058410320,
    page: 103
  },
  {
    kind: "titre",
    section: "79",
    program: "100",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 27291013181,
    page: 103
  },
  {
    kind: "titre",
    section: "79",
    program: "100",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 12007997743,
    page: 103
  },
  {
    kind: "titre",
    section: "79",
    program: "100",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 4759399396,
    page: 103
  },
  {
    kind: "programme",
    section: "79",
    program: "144",
    titre: null,
    label: "Conseil Economique et Social",
    amount: 20901309406,
    page: 103
  },
  {
    kind: "titre",
    section: "79",
    program: "144",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 11915823976,
    page: 103
  },
  {
    kind: "titre",
    section: "79",
    program: "144",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 738542610,
    page: 103
  },
  {
    kind: "titre",
    section: "79",
    program: "144",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 2572604676,
    page: 103
  },
  {
    kind: "titre",
    section: "79",
    program: "144",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 773737540,
    page: 103
  },
  {
    kind: "titre",
    section: "79",
    program: "144",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 4900600604,
    page: 103
  },
  {
    kind: "section",
    section: "80",
    program: null,
    titre: null,
    label: "CONSEIL SUPÉRIEUR DE L'AUDIO-VISUEL ET DE LA COMMUNICATION",
    amount: 45229364063,
    page: 103
  },
  {
    kind: "programme",
    section: "80",
    program: "145",
    titre: null,
    label: "Régulation des médias",
    amount: 45229364063,
    page: 103
  },
  {
    kind: "titre",
    section: "80",
    program: "145",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 30499283996,
    page: 103
  },
  {
    kind: "titre",
    section: "80",
    program: "145",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 922220779,
    page: 103
  },
  {
    kind: "titre",
    section: "80",
    program: "145",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 3814971994,
    page: 103
  },
  {
    kind: "titre",
    section: "80",
    program: "145",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 6355185693,
    page: 103
  },
  {
    kind: "titre",
    section: "80",
    program: "145",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 3637701601,
    page: 103
  },
  {
    kind: "section",
    section: "81",
    program: null,
    titre: null,
    label: "COMMISSION NATIONALE DES DROITS DE L’HOMME",
    amount: 26406028675,
    page: 103
  },
  {
    kind: "programme",
    section: "81",
    program: "149",
    titre: null,
    label: "Administration Générale de la Commission nationale des droits de l'homme",
    amount: 22815797003,
    page: 103
  },
  {
    kind: "titre",
    section: "81",
    program: "149",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 13848600343,
    page: 103
  },
  {
    kind: "titre",
    section: "81",
    program: "149",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 461504497,
    page: 103
  },
  {
    kind: "titre",
    section: "81",
    program: "149",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 4639632897,
    page: 103
  },
  {
    kind: "titre",
    section: "81",
    program: "149",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 3812980674,
    page: 103
  },
  {
    kind: "titre",
    section: "81",
    program: "149",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 30000000,
    page: 103
  },
  {
    kind: "titre",
    section: "81",
    program: "149",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 23078592,
    page: 103
  },
  {
    kind: "programme",
    section: "81",
    program: "162",
    titre: null,
    label: "Promotion et protection des droits de l'homme",
    amount: 3590231672,
    page: 103
  },
  {
    kind: "titre",
    section: "81",
    program: "162",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 1331450637,
    page: 103
  },
  {
    kind: "titre",
    section: "81",
    program: "162",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 620575277,
    page: 103
  },
  {
    kind: "titre",
    section: "81",
    program: "162",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 1638205758,
    page: 103
  },
  {
    kind: "section",
    section: "82",
    program: null,
    titre: null,
    label: "PECHE ET ELEVAGE",
    amount: 267187692179,
    page: 103
  },
  {
    kind: "programme",
    section: "82",
    program: "82",
    titre: null,
    label: "Développement des Filières animales",
    amount: 13534615209,
    page: 103
  },
  {
    kind: "titre",
    section: "82",
    program: "82",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 555132372,
    page: 103
  },
  {
    kind: "titre",
    section: "82",
    program: "82",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 384643153,
    page: 103
  },
  {
    kind: "titre",
    section: "82",
    program: "82",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 393436797,
    page: 103
  },
  {
    kind: "titre",
    section: "82",
    program: "82",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 5018931019,
    page: 103
  },
  {
    kind: "titre",
    section: "82",
    program: "82",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 4182471868,
    page: 103
  },
  {
    kind: "titre",
    section: "82",
    program: "82",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 3000000000,
    page: 103
  },
  {
    kind: "programme",
    section: "82",
    program: "83",
    titre: null,
    label: "Développement des Filières Halieutiques et aquacoles",
    amount: 9092969383,
    page: 103
  },
  {
    kind: "titre",
    section: "82",
    program: "83",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 6660828500,
    page: 103
  },
  {
    kind: "titre",
    section: "82",
    program: "83",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 537551510,
    page: 103
  },
  {
    kind: "titre",
    section: "82",
    program: "83",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 1737430556,
    page: 103
  },
  {
    kind: "titre",
    section: "82",
    program: "83",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 157158817,
    page: 103
  },
  {
    kind: "programme",
    section: "82",
    program: "163",
    titre: null,
    label: "Administration Générale de la Pêche et élevage",
    amount: 240957796690,
    page: 103
  },
  {
    kind: "titre",
    section: "82",
    program: "163",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 16107844867,
    page: 103
  },
  {
    kind: "titre",
    section: "82",
    program: "163",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 3003925707,
    page: 103
  },
  {
    kind: "titre",
    section: "82",
    program: "163",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 4535982916,
    page: 103
  },
  {
    kind: "titre",
    section: "82",
    program: "163",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 104956603977,
    page: 104
  },
  {
    kind: "titre",
    section: "82",
    program: "163",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 112177227467,
    page: 104
  },
  {
    kind: "programme",
    section: "82",
    program: "187",
    titre: null,
    label: "Lutte contre les maladies animales",
    amount: 3602310897,
    page: 104
  },
  {
    kind: "titre",
    section: "82",
    program: "187",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 603593674,
    page: 104
  },
  {
    kind: "titre",
    section: "82",
    program: "187",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 939826401,
    page: 104
  },
  {
    kind: "titre",
    section: "82",
    program: "187",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 2058890822,
    page: 104
  },
  {
    kind: "section",
    section: "83",
    program: null,
    titre: null,
    label: "AFFAIRES COUTUMIERES",
    amount: 40348187375,
    page: 104
  },
  {
    kind: "programme",
    section: "83",
    program: "19",
    titre: null,
    label: "Gestion des affaires administratives et Coutumières",
    amount: 18528219045,
    page: 104
  },
  {
    kind: "titre",
    section: "83",
    program: "19",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 17893428241,
    page: 104
  },
  {
    kind: "titre",
    section: "83",
    program: "19",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 230830541,
    page: 104
  },
  {
    kind: "titre",
    section: "83",
    program: "19",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 403960263,
    page: 104
  },
  {
    kind: "programme",
    section: "83",
    program: "174",
    titre: null,
    label: "Administration Générale des Affaires Coutumières",
    amount: 21693591146,
    page: 104
  },
  {
    kind: "titre",
    section: "83",
    program: "174",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 17078845699,
    page: 104
  },
  {
    kind: "titre",
    section: "83",
    program: "174",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 386090527,
    page: 104
  },
  {
    kind: "titre",
    section: "83",
    program: "174",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 729367335,
    page: 104
  },
  {
    kind: "titre",
    section: "83",
    program: "174",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 806844944,
    page: 104
  },
  {
    kind: "titre",
    section: "83",
    program: "174",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 2692442641,
    page: 104
  },
  {
    kind: "programme",
    section: "83",
    program: "198",
    titre: null,
    label: "Intégration et Promotion des Peuples Autochtones / Pygmées",
    amount: 126377184,
    page: 104
  },
  {
    kind: "titre",
    section: "83",
    program: "198",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 22022628,
    page: 104
  },
  {
    kind: "titre",
    section: "83",
    program: "198",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 20880027,
    page: 104
  },
  {
    kind: "titre",
    section: "83",
    program: "198",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 83474529,
    page: 104
  },
  {
    kind: "section",
    section: "84",
    program: null,
    titre: null,
    label: "AMENAGEMENT DU TERRITOIRE",
    amount: 63503686763,
    page: 104
  },
  {
    kind: "programme",
    section: "84",
    program: "78",
    titre: null,
    label: "Aménagement du territoire",
    amount: 27892001378,
    page: 104
  },
  {
    kind: "titre",
    section: "84",
    program: "78",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 17224560361,
    page: 104
  },
  {
    kind: "titre",
    section: "84",
    program: "78",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 966682908,
    page: 104
  },
  {
    kind: "titre",
    section: "84",
    program: "78",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 652157118,
    page: 104
  },
  {
    kind: "titre",
    section: "84",
    program: "78",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 8749715783,
    page: 104
  },
  {
    kind: "titre",
    section: "84",
    program: "78",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 298885208,
    page: 104
  },
  {
    kind: "programme",
    section: "84",
    program: "175",
    titre: null,
    label: "Administration Générale de l'Aménagement du Territoire",
    amount: 35248973765,
    page: 104
  },
  {
    kind: "titre",
    section: "84",
    program: "175",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 15624444985,
    page: 104
  },
  {
    kind: "titre",
    section: "84",
    program: "175",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 1564479221,
    page: 104
  },
  {
    kind: "titre",
    section: "84",
    program: "175",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 3257303416,
    page: 104
  },
  {
    kind: "titre",
    section: "84",
    program: "175",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 3064473551,
    page: 104
  },
  {
    kind: "titre",
    section: "84",
    program: "175",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 2548967699,
    page: 104
  },
  {
    kind: "titre",
    section: "84",
    program: "175",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 9189304893,
    page: 104
  },
  {
    kind: "programme",
    section: "84",
    program: "186",
    titre: null,
    label: "Rénovation de la Ville",
    amount: 362711620,
    page: 104
  },
  {
    kind: "titre",
    section: "84",
    program: "186",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 100129374,
    page: 104
  },
  {
    kind: "titre",
    section: "84",
    program: "186",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 159687704,
    page: 104
  },
  {
    kind: "titre",
    section: "84",
    program: "186",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 102894542,
    page: 104
  },
  {
    kind: "section",
    section: "85",
    program: null,
    titre: null,
    label: "COUR DES COMPTES",
    amount: 126117783365,
    page: 104
  },
  {
    kind: "programme",
    section: "85",
    program: "152",
    titre: null,
    label: "Contrôle juridictionnel et de gestion des finances publiques",
    amount: 126117783365,
    page: 104
  },
  {
    kind: "titre",
    section: "85",
    program: "152",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 43915304482,
    page: 104
  },
  {
    kind: "titre",
    section: "85",
    program: "152",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 2032924912,
    page: 104
  },
  {
    kind: "titre",
    section: "85",
    program: "152",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 3135999188,
    page: 104
  },
  {
    kind: "titre",
    section: "85",
    program: "152",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 40266736600,
    page: 104
  },
  {
    kind: "titre",
    section: "85",
    program: "152",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 8285271143,
    page: 104
  },
  {
    kind: "titre",
    section: "85",
    program: "152",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 28481547040,
    page: 104
  },
  {
    kind: "section",
    section: "90",
    program: null,
    titre: null,
    label: "ENTREPRENEURIAT ET DEVELOPPEMENT DES PETITES ET MOYENNES ENTREPRISES",
    amount: 282421874649,
    page: 104
  },
  {
    kind: "programme",
    section: "90",
    program: "146",
    titre: null,
    label: "Administration Générale de la Classe moyenne, Petites et Moyennes Entraprises et",
    amount: 68401645264,
    page: 104
  },
  {
    kind: "titre",
    section: "90",
    program: "146",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 26198859120,
    page: 104
  },
  {
    kind: "titre",
    section: "90",
    program: "146",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 1215269669,
    page: 104
  },
  {
    kind: "titre",
    section: "90",
    program: "146",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 1881159892,
    page: 104
  },
  {
    kind: "titre",
    section: "90",
    program: "146",
    titre: "7",
    label: "EQUIPEMENTS",
    amount: 36245729586,
    page: 104
  },
  {
    kind: "titre",
    section: "90",
    program: "146",
    titre: "8",
    label: "CONSTRUCTION, REFECTION, REHABILITATION, ADDITION D’OUVRAGE ET EDIFICE, ACQUISITION IMMOBILIERE",
    amount: 2860626997,
    page: 104
  },
  {
    kind: "programme",
    section: "90",
    program: "147",
    titre: null,
    label: "Développment des mesures d'appui et de soutien aux PMEA",
    amount: 213143912615,
    page: 104
  },
  {
    kind: "titre",
    section: "90",
    program: "147",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 140505463,
    page: 105
  },
  {
    kind: "titre",
    section: "90",
    program: "147",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 318686273,
    page: 105
  },
  {
    kind: "titre",
    section: "90",
    program: "147",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT",
    amount: 170994766268,
    page: 105
  },
  {
    kind: "programme",
    section: "90",
    program: "148",
    titre: null,
    label: "Mise à niveau des PMEA",
    amount: 876316770,
    page: 105
  },
  {
    kind: "titre",
    section: "90",
    program: "148",
    titre: "3",
    label: "DEPENSES DE PERSONNEL",
    amount: 191849145,
    page: 105
  },
  {
    kind: "titre",
    section: "90",
    program: "148",
    titre: "4",
    label: "BIENS ET MATERIELS",
    amount: 296091998,
    page: 105
  },
  {
    kind: "titre",
    section: "90",
    program: "148",
    titre: "5",
    label: "DEPENSES DE PRESTATIONS",
    amount: 388375627,
    page: 105
  },
  {
    kind: "section",
    section: "93",
    program: null,
    titre: null,
    label: "OPPOSITION POLITIQUE",
    amount: 300981940,
    page: 105
  },
  {
    kind: "programme",
    section: "93",
    program: "165",
    titre: null,
    label: "Opposition politique",
    amount: 300981940,
    page: 105
  },
  {
    kind: "titre",
    section: "93",
    program: "165",
    titre: "6",
    label: "TRANSFERTS ET INTERVENTIONS DE L’ETAT Félix-Antoine TSHISEKEDI TSHILOMBO",
    amount: 300981940,
    page: 105
  },
  {
    kind: "total",
    section: null,
    program: null,
    titre: null,
    label: "TOTAL",
    amount: 51241956991167,
    page: 105
  }
] satisfies CreditSectionProgrammeTitreRow[]
