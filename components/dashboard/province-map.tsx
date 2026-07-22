import Image from 'next/image'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { provinceLegend } from '@/lib/data'

export function ProvinceMap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Exécution des dépenses par province</CardTitle>
        <CardDescription>(taux d&apos;exécution à date)</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-4">
        <div className="relative h-[220px] flex-1">
          <Image
            src="/drc-provinces-map.png"
            alt="Carte de la République Démocratique du Congo montrant le taux d'exécution des dépenses par province"
            fill
            className="object-contain"
          />
        </div>
        <div className="shrink-0">
          <p className="mb-2 text-[11px] font-semibold text-foreground">Taux d&apos;exécution</p>
          <ul className="flex flex-col gap-1.5">
            {provinceLegend.map((l) => (
              <li key={l.label} className="flex items-center gap-2 text-[11px] text-foreground">
                <span
                  className="h-3 w-3 rounded-sm"
                  style={{ backgroundColor: l.color }}
                />
                {l.label}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
