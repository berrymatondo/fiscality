export const DEFAULT_USD_CDF_EXCHANGE_RATE = 2250.54

export const DEFAULT_DISPLAY_CURRENCY = 'CDF' as const

export const DISPLAY_CURRENCY_STORAGE_KEY = 'fiscality.settings.display-currency'

/** Taux USD/CDF par exercice (1 USD = taux CDF). */
export type TauxParExercice = Record<number, number>

/** Taux retenu pour un exercice, ou le taux par défaut s'il n'a pas été configuré. */
export function rateForExercice(taux: TauxParExercice, exercice: number): number {
  const value = taux[exercice]
  return Number.isFinite(value) && value > 0 ? value : DEFAULT_USD_CDF_EXCHANGE_RATE
}
