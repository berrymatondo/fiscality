import { TrendingUp } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { publicDebt } from '@/lib/data'
import { cn } from '@/lib/utils'
import { DualCurrencyAmount } from '@/components/dashboard/currency'

export function PublicDebtCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dette publique</CardTitle>
        <CardDescription>CDF principal · équivalent USD · % du PIB</CardDescription>
      </CardHeader>
      <CardContent>
        <table className="w-full text-[12px]">
          <thead>
            <tr className="text-left text-[10px] uppercase text-muted-foreground">
              <th className="pb-2 font-semibold" />
              <th className="pb-2 text-right font-semibold">Encours</th>
              <th className="pb-2 text-right font-semibold">% du PIB</th>
              <th className="pb-2 text-right font-semibold">vs 2023</th>
            </tr>
          </thead>
          <tbody>
            {publicDebt.map((row) => (
              <tr
                key={row.type}
                className={cn(
                  'border-t border-border',
                  row.total && 'font-bold text-foreground',
                )}
              >
                <td className="py-2.5 text-foreground">{row.type}</td>
                <td className="py-2.5 text-right text-foreground"><DualCurrencyAmount value={row.encours} scale="billion" className="items-end" dual /></td>
                <td className="py-2.5 text-right text-foreground">{row.pib}</td>
                <td className="py-2.5 text-right">
                  <span className="inline-flex items-center gap-1 font-semibold text-success">
                    {row.vs}
                    <TrendingUp className="h-3 w-3" />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}
