'use client'

import { useState, useSyncExternalStore } from 'react'
import { DEFAULT_USD_CDF_EXCHANGE_RATE, USD_CDF_EXCHANGE_RATE_STORAGE_KEY } from '@/lib/settings'
import { parseFrenchNumber, formatUsdFromCdf } from '@/lib/currency'
import { cn } from '@/lib/utils'

export { parseFrenchNumber, formatUsdFromCdf }

export const EXCHANGE_RATE_CHANGED_EVENT = 'fiscality:exchange-rate-changed'

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback)
  window.addEventListener(EXCHANGE_RATE_CHANGED_EVENT, callback)
  return () => {
    window.removeEventListener('storage', callback)
    window.removeEventListener(EXCHANGE_RATE_CHANGED_EVENT, callback)
  }
}

function getSnapshot() {
  const value = Number(localStorage.getItem(USD_CDF_EXCHANGE_RATE_STORAGE_KEY))
  return Number.isFinite(value) && value > 0 ? value : DEFAULT_USD_CDF_EXCHANGE_RATE
}

export function useExchangeRate() {
  return useSyncExternalStore(subscribe, getSnapshot, () => DEFAULT_USD_CDF_EXCHANGE_RATE)
}

export function DualCurrencyAmount({
  value,
  scale = 'unit',
  className,
  secondaryClassName,
  showToggle = true,
}: {
  value: number | string
  scale?: 'unit' | 'billion'
  className?: string
  secondaryClassName?: string
  showToggle?: boolean
}) {
  const [currency, setCurrency] = useState<'CDF' | 'USD'>('CDF')
  const rate = useExchangeRate()
  const numericValue = typeof value === 'string' ? parseFrenchNumber(value) : value
  const cdf = scale === 'billion' ? numericValue * 1e9 : numericValue
  const cdfText = numericValue.toLocaleString('fr-FR', { maximumFractionDigits: scale === 'billion' ? 1 : 0 })
  const usdText = formatUsdFromCdf(cdf, rate, scale === 'billion' ? 2 : 0)

  return (
    <span className={cn('inline-flex flex-col gap-1', className)}>
      {showToggle && <span className="inline-flex w-fit rounded-md border border-border bg-muted/40 p-0.5 text-[9px] font-bold leading-none">
        {(['CDF', 'USD'] as const).map((item) => <button key={item} type="button" onClick={() => setCurrency(item)} aria-pressed={currency === item} className={cn('rounded px-2 py-1 transition-colors', currency === item ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground')}>{item}</button>)}
      </span>}
      {showToggle ? <span>{currency === 'CDF' ? cdfText : usdText} {scale === 'billion' ? `Mrd ${currency}` : currency}</span> : <>
        <span>{cdfText} {scale === 'billion' ? 'Mrd CDF' : 'CDF'}</span>
        <span className={cn('text-[0.78em] font-medium text-muted-foreground', secondaryClassName)}>≈ {usdText} {scale === 'billion' ? 'Mrd USD' : 'USD'}</span>
      </>}
    </span>
  )
}
