// Registre des jeux de données par exercice budgétaire.
// - 2026 : exécution à fin juin (fichiers historiques lib/data.ts, recettes-mobilisees.ts, depenses-executees.ts…).
// - 2027 : projet de loi de finances (prévisions, aucune exécution) — lib/exercices/2027.ts.

export type ExerciceMode = 'execution' | 'prevision'

export type ExerciceInfo = {
  exercice: number
  mode: ExerciceMode
  label: string
  source: string
  /** Date de référence des données (texte affiché). */
  dateReference: string
}

export const exercices: Record<number, ExerciceInfo> = {
  2026: {
    exercice: 2026,
    mode: 'execution',
    label: 'Exécution à fin juin 2026',
    source: "Rapport d'exécution du budget du pouvoir central au premier semestre 2026 (Document n°3)",
    dateReference: '30 juin 2026',
  },
  2027: {
    exercice: 2027,
    mode: 'prevision',
    label: 'Projet de loi de finances 2027',
    source: 'Exposé général du projet de loi de finances pour l’exercice 2027 (Document n°2), septembre 2026',
    dateReference: 'Septembre 2026',
  },
}

export const exercicesAvecDonnees = Object.keys(exercices).map(Number)

export function getExerciceInfo(exercice: number): ExerciceInfo | null {
  return exercices[exercice] ?? null
}

export function isPrevision(exercice: number) {
  return getExerciceInfo(exercice)?.mode === 'prevision'
}
