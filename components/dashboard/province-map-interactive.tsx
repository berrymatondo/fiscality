'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { provinceLegend } from '@/lib/data'
import { PROVINCES_GEO } from '@/lib/provinces-geo'
import { MAP_VIEWBOX, PROVINCE_CELLS } from '@/lib/provinces-map-cells'

function bandIndex(taux: number): number {
  if (taux >= 50) return 0
  if (taux >= 40) return 1
  if (taux >= 30) return 2
  if (taux >= 20) return 3
  return 4
}

function tauxOf(name: string): number {
  return PROVINCES_GEO.find((p) => p.nom === name)?.taux ?? 0
}

export function InteractiveProvinceMap({ onSelect }: { onSelect: (province: string) => void }) {
  const [hovered, setHovered] = useState<string | null>(null)

  const cellsWithData = PROVINCE_CELLS.map((cell) => {
    const taux = tauxOf(cell.name)
    const d = cell.points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ') + ' Z'
    return { name: cell.name, d, taux, color: provinceLegend[bandIndex(taux)].color }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Exécution des dépenses par province</CardTitle>
        <CardDescription>(taux d&apos;exécution à date) — survolez ou cliquez une province pour explorer ses territoires et villes</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="relative flex-1">
          <svg viewBox={MAP_VIEWBOX} className="h-auto w-full" role="img" aria-label="Carte de la République Démocratique du Congo par province">
            {cellsWithData.map((cell) => {
              const isHovered = hovered === cell.name
              return (
                <path
                  key={cell.name}
                  d={cell.d}
                  fill={cell.color}
                  stroke="var(--card)"
                  strokeWidth={isHovered ? 3 : 1.2}
                  className="cursor-pointer transition-[stroke-width,filter] duration-150"
                  style={{ filter: isHovered ? 'brightness(1.2)' : undefined }}
                  onMouseEnter={() => setHovered(cell.name)}
                  onMouseLeave={() => setHovered((h) => (h === cell.name ? null : h))}
                  onClick={() => onSelect(cell.name)}
                >
                  <title>{`${cell.name} — ${cell.taux}%`}</title>
                </path>
              )
            })}
          </svg>

          {hovered && (
            <div className="pointer-events-none absolute left-2 top-2 rounded-md border border-border bg-card/95 px-2.5 py-1.5 text-[11px] font-semibold text-foreground shadow-sm">
              {hovered} — {tauxOf(hovered)}%
            </div>
          )}
        </div>
        <div className="shrink-0">
          <p className="mb-2 text-[11px] font-semibold text-foreground">Taux d&apos;exécution</p>
          <ul className="flex flex-col gap-1.5">
            {provinceLegend.map((l) => (
              <li key={l.label} className="flex items-center gap-2 text-[11px] text-foreground">
                <span className="h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: l.color }} />
                {l.label}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
