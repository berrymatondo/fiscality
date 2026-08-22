import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { macroIndicators } from '@/lib/data'
import { cn } from '@/lib/utils'
import { DualCurrencyAmount } from '@/components/dashboard/currency'

export function MacroCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Indicateurs macroéconomiques clés</CardTitle>
      </CardHeader>
      <CardContent>
        <table className="w-full text-[12px]">
          <thead>
            <tr className="text-left text-[10px] uppercase text-muted-foreground">
              <th className="pb-2 font-semibold">Indicateur</th>
              <th className="pb-2 text-right font-semibold">Valeur</th>
              <th className="pb-2 text-right font-semibold">vs 2023</th>
            </tr>
          </thead>
          <tbody>
            {macroIndicators.map((row) => (
              <tr key={row.name} className="border-t border-border">
                <td className="py-2 text-foreground">{row.name}</td>
                <td className="py-2 text-right font-semibold text-foreground">
                  {row.name.includes('PIB nominal') ? <DualCurrencyAmount value={row.value} scale="billion" className="items-end" dual /> : row.value}
                </td>
                <td
                  className={cn(
                    'py-2 text-right font-semibold',
                    row.tone === 'positive' ? 'text-success' : 'text-destructive',
                  )}
                >
                  {row.vs}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}
