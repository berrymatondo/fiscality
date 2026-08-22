'use client'

import { useEffect, useMemo, useState } from 'react'
import { ChevronRight, MapPin, Building2, Landmark, AlertTriangle, Search } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { InteractiveProvinceMap } from '@/components/dashboard/province-map-interactive'
import { BudgetBreakdown } from '@/components/dashboard/budget-breakdown'
import { CountUp } from '@/components/dashboard/count-up'
import { PROVINCES_GEO } from '@/lib/provinces-geo'

function normalize(name: string): string {
  return name
    .toLowerCase()
    .replace(/\([^)]*\)/g, '')
    .trim()
}

/** Comparaison de recherche insensible à la casse et aux accents. */
function normalizeSearch(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
}

function findProvinceGeo(name: string) {
  const target = normalize(name)
  return PROVINCES_GEO.find((p) => normalize(p.nom) === target)
}

type Level =
  | { depth: 0 }
  | { depth: 1; province: string }
  | { depth: 2; province: string; subdivision: string }
  | { depth: 3; province: string; subdivision: string; commune: string }

function TauxBar({ taux }: { taux: number }) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const raf = requestAnimationFrame(() => setWidth(taux))
    return () => cancelAnimationFrame(raf)
  }, [taux])

  return (
    <div className="flex items-center gap-2">
      <div className="h-2 w-32 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
      <span className="font-semibold text-foreground">
        <CountUp value={`${taux}%`} />
      </span>
    </div>
  )
}

function DonneesIndisponiblesBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/10 px-2.5 py-1 text-[11px] font-semibold text-destructive">
      <AlertTriangle className="size-3.5" />
      Données indisponibles
    </span>
  )
}

function DonneesIndisponiblesCard({ nom }: { nom: string }) {
  return (
    <Card className="border-destructive/40 bg-destructive/5">
      <CardContent className="flex items-start gap-3 py-5">
        <AlertTriangle className="mt-0.5 size-5 shrink-0 text-destructive" />
        <div>
          <p className="text-sm font-semibold text-destructive">Données indisponibles</p>
          <p className="mt-1 text-[12px] text-muted-foreground">
            {nom} est une zone affectée par le conflit armé dans l&apos;Est de la RDC. Aucune donnée d&apos;exécution
            budgétaire n&apos;y est disponible actuellement.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

function Breadcrumb({ items }: { items: { label: string; onClick?: () => void }[] }) {
  return (
    <div className="flex flex-wrap items-center gap-1 text-[11px] font-medium text-muted-foreground">
      {items.map((item, index) => (
        <span key={item.label} className="flex items-center gap-1">
          {index > 0 && <ChevronRight className="size-3" />}
          {item.onClick ? (
            <button type="button" onClick={item.onClick} className="hover:text-foreground hover:underline">
              {item.label}
            </button>
          ) : (
            <span>{item.label}</span>
          )}
        </span>
      ))}
    </div>
  )
}

export function ProvinceDrilldown({ data }: { data: { name: string; taux: number }[] }) {
  const [level, setLevel] = useState<Level>({ depth: 0 })
  const [search, setSearch] = useState('')

  const filteredData = useMemo(() => {
    const query = normalizeSearch(search)
    if (!query) return data
    return data.filter((p) => normalizeSearch(p.name).includes(query))
  }, [data, search])

  if (level.depth === 1) {
    const geo = findProvinceGeo(level.province)
    return (
      <Card>
        <CardHeader className="gap-1.5">
          <Breadcrumb items={[{ label: 'Provinces', onClick: () => setLevel({ depth: 0 }) }, { label: level.province }]} />
          <CardTitle>Territoires et villes</CardTitle>
          <CardDescription>{level.province} — taux d&apos;exécution à date</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {!geo || geo.subdivisions.length === 0 ? (
            <p className="py-4 text-sm text-muted-foreground">Aucune donnée détaillée disponible pour cette province.</p>
          ) : (
            <table className="w-full min-w-[340px] text-[12px]">
              <thead>
                <tr className="text-left text-[10px] uppercase text-muted-foreground">
                  <th className="pb-2 font-semibold">Territoire / Ville</th>
                  <th className="pb-2 font-semibold">Taux d&apos;exécution</th>
                  <th className="pb-2" />
                </tr>
              </thead>
              <tbody>
                {geo.subdivisions.map((s) => (
                  <tr
                    key={s.nom}
                    onClick={() => setLevel({ depth: 2, province: level.province, subdivision: s.nom })}
                    className="cursor-pointer border-t border-border hover:bg-muted/50"
                  >
                    <td className="py-2.5 text-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        {s.type === 'Ville' ? (
                          <Building2 className="size-3.5 shrink-0 text-muted-foreground" />
                        ) : (
                          <MapPin className="size-3.5 shrink-0 text-muted-foreground" />
                        )}
                        {s.nom}
                        <span className="text-[10px] uppercase text-muted-foreground">({s.type})</span>
                      </span>
                    </td>
                    <td className="py-2.5">{s.indisponible ? <DonneesIndisponiblesBadge /> : <TauxBar taux={s.taux} />}</td>
                    <td className="py-2.5 text-right">
                      <ChevronRight className="ml-auto size-4 text-muted-foreground" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    )
  }

  if (level.depth === 2) {
    const geo = findProvinceGeo(level.province)
    const sub = geo?.subdivisions.find((s) => s.nom === level.subdivision)
    return (
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader className="gap-1.5">
            <Breadcrumb
              items={[
                { label: 'Provinces', onClick: () => setLevel({ depth: 0 }) },
                { label: level.province, onClick: () => setLevel({ depth: 1, province: level.province }) },
                { label: level.subdivision },
              ]}
            />
            <CardTitle className="flex flex-wrap items-center gap-2">
              {sub?.type ?? 'Entité'} de {level.subdivision}
              {sub?.indisponible && <DonneesIndisponiblesBadge />}
            </CardTitle>
            <CardDescription>{level.province} — données de démonstration</CardDescription>
          </CardHeader>
        </Card>
        {sub?.indisponible ? (
          <DonneesIndisponiblesCard nom={level.subdivision} />
        ) : (
          <BudgetBreakdown label={level.subdivision} taux={sub?.taux ?? 25} scale={4} />
        )}
        <Card>
          <CardHeader>
            <CardTitle>Communes</CardTitle>
            <CardDescription>Cliquez sur une commune pour voir son détail budgétaire</CardDescription>
          </CardHeader>
          <CardContent>
            {!sub || sub.communes.length === 0 ? (
              <p className="py-4 text-sm text-muted-foreground">Aucune commune répertoriée pour cette entité.</p>
            ) : (
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {sub.communes.map((commune) => (
                  <li key={commune}>
                    <button
                      type="button"
                      onClick={() => setLevel({ depth: 3, province: level.province, subdivision: level.subdivision, commune })}
                      className="flex w-full items-center gap-2 rounded-md border border-border px-3 py-2 text-left text-[12px] text-foreground hover:bg-muted/50"
                    >
                      <Landmark className="size-3.5 shrink-0 text-muted-foreground" />
                      <span className="flex-1">{commune}</span>
                      <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  if (level.depth === 3) {
    const geo = findProvinceGeo(level.province)
    const sub = geo?.subdivisions.find((s) => s.nom === level.subdivision)
    return (
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader className="gap-1.5">
            <Breadcrumb
              items={[
                { label: 'Provinces', onClick: () => setLevel({ depth: 0 }) },
                { label: level.province, onClick: () => setLevel({ depth: 1, province: level.province }) },
                { label: level.subdivision, onClick: () => setLevel({ depth: 2, province: level.province, subdivision: level.subdivision }) },
                { label: level.commune },
              ]}
            />
            <CardTitle className="flex flex-wrap items-center gap-2">
              Détail budgétaire — {level.commune}
              {sub?.indisponible && <DonneesIndisponiblesBadge />}
            </CardTitle>
            <CardDescription>
              Commune de {level.subdivision}, {level.province} — données de démonstration
            </CardDescription>
          </CardHeader>
        </Card>
        {sub?.indisponible ? (
          <DonneesIndisponiblesCard nom={`${level.commune} (${level.subdivision})`} />
        ) : (
          <BudgetBreakdown label={level.commune} taux={sub?.taux ?? 25} />
        )}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <InteractiveProvinceMap onSelect={(province) => setLevel({ depth: 1, province })} />
      <Card>
        <CardHeader className="gap-2.5">
          <CardTitle>Détail par province</CardTitle>
          <CardDescription>(taux d&apos;exécution à date) — cliquez sur une province pour explorer ses territoires et villes</CardDescription>
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher une province..."
              className="h-8 w-full rounded-md border border-border bg-background pl-8 pr-3 text-[12px] outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            />
          </div>
        </CardHeader>
        <CardContent className="max-h-[26rem] overflow-auto">
          <table className="w-full min-w-[340px] text-[12px]">
            <thead className="sticky top-0 z-10 bg-card">
              <tr className="text-left text-[10px] uppercase text-muted-foreground">
                <th className="pb-2 font-semibold">Province</th>
                <th className="pb-2 font-semibold">Taux d&apos;exécution</th>
                <th className="pb-2" />
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-6 text-center text-muted-foreground">
                    Aucune province ne correspond à « {search} ».
                  </td>
                </tr>
              )}
              {filteredData.map((p) => (
                <tr
                  key={p.name}
                  onClick={() => setLevel({ depth: 1, province: p.name })}
                  className="cursor-pointer border-t border-border hover:bg-muted/50"
                >
                  <td className="py-2.5 text-foreground">{p.name}</td>
                  <td className="py-2.5">
                    <TauxBar taux={p.taux} />
                  </td>
                  <td className="py-2.5 text-right">
                    <ChevronRight className="ml-auto size-4 text-muted-foreground" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
