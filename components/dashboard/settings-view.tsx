'use client'

import { useState, useTransition } from 'react'
import { CircleDollarSign, RotateCcw, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DEFAULT_USD_CDF_EXCHANGE_RATE, rateForExercice, type TauxParExercice } from '@/lib/settings'
import { saveTauxExercice, resetTauxExercice } from '@/lib/taux-change-actions'
import { cn } from '@/lib/utils'

const formatRate = (rate: number) => rate.toLocaleString('fr-FR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

function TauxRow({
  exercice,
  savedRate,
  isConfigured,
  isSelected,
  canEdit,
}: {
  exercice: number
  savedRate: number
  isConfigured: boolean
  isSelected: boolean
  canEdit: boolean
}) {
  const [rate, setRate] = useState(String(savedRate))
  const [message, setMessage] = useState<{ text: string; error?: boolean } | null>(null)
  const [pending, startTransition] = useTransition()

  const parsedRate = Number(rate.replace(/\s/g, '').replace(',', '.'))
  const isValid = Number.isFinite(parsedRate) && parsedRate > 0
  const isDirty = isValid && parsedRate !== savedRate

  function run(action: () => Promise<void>, success: string, nextRate: number) {
    startTransition(async () => {
      try {
        await action()
        setRate(String(nextRate))
        setMessage({ text: success })
      } catch (e) {
        setMessage({ text: e instanceof Error ? e.message : 'Enregistrement impossible.', error: true })
      }
    })
  }

  return (
    <div className={cn(
      'flex flex-col gap-3 rounded-lg border border-border p-4 md:flex-row md:items-center',
      isSelected && 'border-primary/50 bg-primary/5',
    )}>
      <div className="w-36 shrink-0">
        <p className="text-sm font-bold text-foreground">Exercice {exercice}</p>
        <p className="text-xs text-muted-foreground">
          {isSelected ? 'Exercice sélectionné' : isConfigured ? 'Taux configuré' : 'Taux par défaut'}
        </p>
      </div>

      {canEdit ? (
        <>
          <div className="flex min-w-0 max-w-sm flex-1 items-center overflow-hidden rounded-lg border border-border bg-background focus-within:ring-2 focus-within:ring-ring">
            <span className="border-r border-border bg-muted px-3 py-2 text-sm font-semibold">1 USD</span>
            <input
              aria-label={`Taux de l'exercice ${exercice}`}
              type="text"
              inputMode="decimal"
              value={rate}
              onChange={(event) => { setRate(event.target.value); setMessage(null) }}
              aria-invalid={!isValid}
              className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm outline-none"
            />
            <span className="px-3 py-2 text-sm font-semibold text-muted-foreground">CDF</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              size="sm"
              disabled={!isDirty || pending}
              onClick={() => run(() => saveTauxExercice(exercice, parsedRate), 'Taux enregistré.', parsedRate)}
              className="gap-2"
            >
              <Save className="h-4 w-4" /> Enregistrer
            </Button>
            {isConfigured && (
              <Button
                size="sm"
                variant="outline"
                disabled={pending}
                onClick={() => run(() => resetTauxExercice(exercice), 'Taux par défaut rétabli.', DEFAULT_USD_CDF_EXCHANGE_RATE)}
                className="gap-2"
              >
                <RotateCcw className="h-4 w-4" /> Valeur par défaut
              </Button>
            )}
          </div>
        </>
      ) : (
        <p className="text-lg font-extrabold text-foreground tabular-nums">1 USD = {formatRate(savedRate)} CDF</p>
      )}

      {!isValid && <p className="text-xs text-destructive">Saisissez un taux supérieur à zéro.</p>}
      {message && (
        <p role="status" className={cn('text-xs font-medium', message.error ? 'text-destructive' : 'text-emerald-600')}>
          {message.text}
        </p>
      )}
    </div>
  )
}

export function SettingsView({
  exercice,
  exercicesDisponibles,
  tauxParExercice,
  canEdit,
}: {
  exercice: number
  exercicesDisponibles: number[]
  tauxParExercice: TauxParExercice
  canEdit: boolean
}) {
  const exercices = [...new Set([...exercicesDisponibles, ...Object.keys(tauxParExercice).map(Number), exercice])]
    .sort((a, b) => b - a)

  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <CircleDollarSign className="h-5 w-5" />
          </span>
          <div>
            <CardTitle>Taux de change par exercice</CardTitle>
            <CardDescription>Conversion USD/CDF retenue pour chaque année budgétaire</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-xs text-muted-foreground">
          Le taux de l&apos;exercice sélectionné est affiché dans l&apos;en-tête et utilisé pour toutes les conversions en USD.
          Sans taux configuré, le taux par défaut ({formatRate(DEFAULT_USD_CDF_EXCHANGE_RATE)} CDF) s&apos;applique.
          {!canEdit && ' Seuls les administrateurs peuvent modifier ces taux.'}
        </p>
        {exercices.map((year) => (
          <TauxRow
            key={year}
            exercice={year}
            savedRate={rateForExercice(tauxParExercice, year)}
            isConfigured={year in tauxParExercice}
            isSelected={year === exercice}
            canEdit={canEdit}
          />
        ))}
      </CardContent>
    </Card>
  )
}
