'use client'

import { createContext, useContext, useEffect, useState, useSyncExternalStore, type ReactNode } from 'react'
import {
  DEFAULT_USD_CDF_EXCHANGE_RATE,
  DEFAULT_DISPLAY_CURRENCY,
  DISPLAY_CURRENCY_STORAGE_KEY,
} from '@/lib/settings'
import { parseFrenchNumber, formatUsdFromCdf } from '@/lib/currency'
import { cn } from '@/lib/utils'

export { parseFrenchNumber, formatUsdFromCdf }

export type Currency = 'CDF' | 'USD'

export const DISPLAY_CURRENCY_CHANGED_EVENT = 'fiscality:display-currency-changed'

function subscribe(event: string) {
  return (callback: () => void) => {
    window.addEventListener('storage', callback)
    window.addEventListener(event, callback)
    return () => {
      window.removeEventListener('storage', callback)
      window.removeEventListener(event, callback)
    }
  }
}

const ExchangeRateContext = createContext<number>(DEFAULT_USD_CDF_EXCHANGE_RATE)

/** Fournit le taux USD/CDF de l'exercice sélectionné à tous les montants affichés. */
export function ExchangeRateProvider({ rate, children }: { rate: number; children: ReactNode }) {
  return <ExchangeRateContext.Provider value={rate}>{children}</ExchangeRateContext.Provider>
}

/** Taux USD/CDF de l'exercice sélectionné (1 USD = taux CDF). */
export function useExchangeRate() {
  return useContext(ExchangeRateContext)
}

function getCurrencySnapshot(): Currency {
  const value = localStorage.getItem(DISPLAY_CURRENCY_STORAGE_KEY)
  return value === 'USD' ? 'USD' : DEFAULT_DISPLAY_CURRENCY
}

/** Devise d'affichage globale de la plateforme — un seul réglage, partagé par tous les montants. */
export function useDisplayCurrency(): Currency {
  return useSyncExternalStore(subscribe(DISPLAY_CURRENCY_CHANGED_EVENT), getCurrencySnapshot, () => DEFAULT_DISPLAY_CURRENCY)
}

export function setDisplayCurrency(currency: Currency) {
  localStorage.setItem(DISPLAY_CURRENCY_STORAGE_KEY, currency)
  window.dispatchEvent(new Event(DISPLAY_CURRENCY_CHANGED_EVENT))
}

/** Anime une valeur numérique de 0 jusqu'à sa cible à chaque (re)montage — même ressort que CountUp. */
function useAnimatedNumber(target: number, duration = 1400): number {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!Number.isFinite(target)) return
    let raf = 0
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setDisplay(target * eased)
      if (progress < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(() => {
      setDisplay(0)
      raf = requestAnimationFrame(tick)
    })
    return () => cancelAnimationFrame(raf)
  }, [target, duration])

  return Number.isFinite(target) ? display : target
}

export function DualCurrencyAmount({
  value,
  scale = 'unit',
  className,
  secondaryClassName,
  dual = false,
  animate = true,
}: {
  value: number | string
  scale?: 'unit' | 'billion'
  className?: string
  secondaryClassName?: string
  /** Affiche CDF et USD empilés (pour les tableaux denses) au lieu de suivre la devise globale. */
  dual?: boolean
  animate?: boolean
}) {
  const currency = useDisplayCurrency()
  const rate = useExchangeRate()
  const targetValue = typeof value === 'string' ? parseFrenchNumber(value) : value
  const animatedValue = useAnimatedNumber(targetValue)
  const numericValue = animate ? animatedValue : targetValue
  // Le taux CDF/USD est un ratio indépendant de l'échelle : diviser numericValue (en Mrd ou en
  // unité) par ce taux donne directement l'équivalent USD dans la même échelle — pas besoin de
  // repasser par les CDF bruts (×1e9) puis re-diviser, ce qui produisait un résultat 1e9 fois trop grand.
  const cdfText = numericValue.toLocaleString('fr-FR', { maximumFractionDigits: scale === 'billion' ? 1 : 0 })
  const usdValue = numericValue / rate
  const usdText = usdValue.toLocaleString('fr-FR', { maximumFractionDigits: scale === 'billion' ? 2 : 0 })

  return (
    <span className={cn('inline-flex flex-col gap-1', className)}>
      {dual ? (
        <>
          <span>{cdfText} {scale === 'billion' ? 'Mrd CDF' : 'CDF'}</span>
          <span className={cn('text-[0.78em] font-medium text-muted-foreground', secondaryClassName)}>≈ {usdText} {scale === 'billion' ? 'Mrd USD' : 'USD'}</span>
        </>
      ) : (
        <span>{currency === 'CDF' ? cdfText : usdText} {scale === 'billion' ? `Mrd ${currency}` : currency}</span>
      )}
    </span>
  )
}
