'use client'

import { useDisplayCurrency, setDisplayCurrency, type Currency } from '@/components/dashboard/currency'
import { cn } from '@/lib/utils'

const CURRENCIES: Currency[] = ['CDF', 'USD']

export function CurrencyToggle() {
  const currency = useDisplayCurrency()

  return (
    <span className="inline-flex items-center rounded-md border border-border bg-muted/40 p-0.5 text-[12px] font-bold leading-none">
      {CURRENCIES.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setDisplayCurrency(item)}
          aria-pressed={currency === item}
          title={item === 'CDF' ? 'Afficher les montants en Francs congolais' : 'Afficher les montants en Dollars américains'}
          className={cn(
            'rounded px-3 py-1.5 transition-colors',
            currency === item ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {item}
        </button>
      ))}
    </span>
  )
}
