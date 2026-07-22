import { Check } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { reforms } from '@/lib/data'

export function ReformsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Suivi des réformes budgétaires</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="mb-1 flex items-center justify-between text-[11px]">
            <span className="text-muted-foreground">Avancement global</span>
            <span className="font-bold text-foreground">68%</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-success" style={{ width: '68%' }} />
          </div>
        </div>

        <p className="mb-2 text-[11px] font-semibold text-foreground">Principales réformes</p>
        <ul className="space-y-2">
          {reforms.map((reform) => (
            <li
              key={reform.name}
              className="flex items-center justify-between gap-2 text-[12px] text-foreground"
            >
              <span>{reform.name}</span>
              <Check
                className={
                  reform.status === 'done'
                    ? 'h-4 w-4 shrink-0 text-success'
                    : 'h-4 w-4 shrink-0 text-warning'
                }
              />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
