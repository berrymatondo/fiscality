'use client'

import { useState } from 'react'
import { CircleDollarSign, RotateCcw, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DEFAULT_USD_CDF_EXCHANGE_RATE, USD_CDF_EXCHANGE_RATE_STORAGE_KEY } from '@/lib/settings'
import { EXCHANGE_RATE_CHANGED_EVENT } from '@/components/dashboard/currency'

const formatRate = (rate: number) => rate.toLocaleString('fr-FR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

function getInitialRate() {
  if (typeof window === 'undefined') return DEFAULT_USD_CDF_EXCHANGE_RATE
  const storedRate = Number(localStorage.getItem(USD_CDF_EXCHANGE_RATE_STORAGE_KEY))
  return Number.isFinite(storedRate) && storedRate > 0
    ? storedRate
    : DEFAULT_USD_CDF_EXCHANGE_RATE
}

export function SettingsView() {
  const [rate, setRate] = useState(() => String(getInitialRate()))
  const [savedRate, setSavedRate] = useState(getInitialRate)
  const [message, setMessage] = useState('')

  const parsedRate = Number(rate.replace(',', '.'))
  const isValid = Number.isFinite(parsedRate) && parsedRate > 0

  function saveRate() {
    if (!isValid) return
    localStorage.setItem(USD_CDF_EXCHANGE_RATE_STORAGE_KEY, String(parsedRate))
    window.dispatchEvent(new Event(EXCHANGE_RATE_CHANGED_EVENT))
    setRate(String(parsedRate))
    setSavedRate(parsedRate)
    setMessage('Taux de change enregistré.')
  }

  function resetRate() {
    localStorage.removeItem(USD_CDF_EXCHANGE_RATE_STORAGE_KEY)
    window.dispatchEvent(new Event(EXCHANGE_RATE_CHANGED_EVENT))
    setRate(String(DEFAULT_USD_CDF_EXCHANGE_RATE))
    setSavedRate(DEFAULT_USD_CDF_EXCHANGE_RATE)
    setMessage('Taux par défaut rétabli.')
  }

  return (
    <Card className="max-w-3xl">
      <CardHeader>
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <CircleDollarSign className="h-5 w-5" />
          </span>
          <div>
            <CardTitle>Taux de change</CardTitle>
            <CardDescription>Configuration de la conversion USD/CDF</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <p className="text-xs font-medium text-muted-foreground">Taux actuellement appliqué</p>
          <p className="mt-1 text-2xl font-extrabold text-foreground">1 USD = {formatRate(savedRate)} CDF</p>
        </div>
        <div className="space-y-2">
          <label htmlFor="usd-cdf-rate" className="text-sm font-semibold text-foreground">Valeur de 1 USD en CDF</label>
          <div className="flex max-w-md items-center overflow-hidden rounded-lg border border-border bg-background focus-within:ring-2 focus-within:ring-ring">
            <span className="border-r border-border bg-muted px-3 py-2 text-sm font-semibold">1 USD</span>
            <input id="usd-cdf-rate" type="text" inputMode="decimal" value={rate}
              onChange={(event) => { setRate(event.target.value); setMessage('') }}
              aria-invalid={!isValid}
              className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm outline-none" />
            <span className="px-3 py-2 text-sm font-semibold text-muted-foreground">CDF</span>
          </div>
          {!isValid && <p className="text-xs text-destructive">Saisissez un taux supérieur à zéro.</p>}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={saveRate} disabled={!isValid} className="gap-2"><Save className="h-4 w-4" /> Enregistrer</Button>
          <Button variant="outline" onClick={resetRate} className="gap-2"><RotateCcw className="h-4 w-4" /> Valeur par défaut</Button>
          {message && <p role="status" className="text-xs font-medium text-emerald-600">{message}</p>}
        </div>
      </CardContent>
    </Card>
  )
}
