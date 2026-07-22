import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { ministryExecution } from '@/lib/data'

export function MinistryChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Exécution des dépenses par ministère</CardTitle>
        <CardDescription>(taux d&apos;exécution à date)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2.5">
        {ministryExecution.map((m) => (
          <div key={m.name} className="grid grid-cols-[1fr_auto] items-center gap-3">
            <div>
              <p className="mb-1 text-[11px] leading-tight text-foreground">{m.name}</p>
              <div className="h-3.5 w-full overflow-hidden rounded-sm bg-muted">
                <div
                  className="h-full rounded-sm bg-primary"
                  style={{ width: `${(m.value / 50) * 100}%` }}
                />
              </div>
            </div>
            <span className="w-11 text-right text-[11px] font-bold text-foreground">
              {m.value.toLocaleString('fr-FR', { minimumFractionDigits: 1 })}%
            </span>
          </div>
        ))}
        <div className="flex justify-between pt-1 text-[10px] text-muted-foreground">
          {[0, 10, 20, 30, 40, 50].map((t) => (
            <span key={t}>{t}%</span>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
