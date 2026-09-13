'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { AlertTriangle, LoaderCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getAnnualHtmlDashboard, getAvailableAnnualHtmlDashboardYears } from '@/lib/annual-html-dashboards'

declare global {
  interface Window {
    Plotly?: {
      purge: (element: Element) => void
    }
    __annualHtmlDashboardPlotlyLoaded?: boolean
  }
}

type HtmlDashboardPayload = {
  bodyHtml: string
  bodyScripts: string[]
  headScripts: string[]
  scopedCss: string
}

const ROOT_ATTR = 'data-annual-html-root'
const ROOT_VALUE = 'dashboard'
const ROOT_SELECTOR = `[${ROOT_ATTR}="${ROOT_VALUE}"]`

function prefixSelector(selector: string, scope: string) {
  if (!selector) return selector
  if (selector === 'body') return scope
  if (selector.startsWith(':root')) return selector.replace(':root', scope)
  return `${scope} ${selector}`
}

function scopeCssFallback(cssText: string, scope: string) {
  return cssText.replace(/(^|}|;)\s*([^@}{][^{]+)\{/g, (_match, prefix, selectors) => {
    const scoped = selectors
      .split(',')
      .map((selector: string) => prefixSelector(selector.trim(), scope))
      .join(', ')
    return `${prefix}${scoped}{`
  })
}

function scopeCssText(cssText: string, scope: string) {
  if (!cssText.trim()) return ''

  try {
    const sheet = new CSSStyleSheet()
    sheet.replaceSync(cssText)

    const scopeRule = (rule: CSSRule): string => {
      if (rule instanceof CSSStyleRule) {
        const selectors = rule.selectorText
          .split(',')
          .map((selector) => prefixSelector(selector.trim(), scope))
          .join(', ')
        return `${selectors}{${rule.style.cssText}}`
      }

      if (rule instanceof CSSMediaRule) {
        return `@media ${rule.conditionText}{${Array.from(rule.cssRules)
          .map(scopeRule)
          .join('')}}`
      }

      return rule.cssText
    }

    return Array.from(sheet.cssRules).map(scopeRule).join('\n')
  } catch {
    return scopeCssFallback(cssText, scope)
  }
}

function cleanupDashboard(root: HTMLDivElement | null) {
  if (!root) return

  root.querySelectorAll('.chart').forEach((node) => {
    window.Plotly?.purge(node)
  })

  root.innerHTML = ''
}

function injectInlineScript(target: HTMLElement, code: string) {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.text = code
  target.appendChild(script)
}

function scopeBodyScript(script: string) {
  const replaceAll = (source: string, search: string, replacement: string) =>
    source.split(search).join(replacement)

  return `(() => {
    const root = document.querySelector(${JSON.stringify(ROOT_SELECTOR)});
    if (!root) return;
    const scopeGetElementById = (id) => root.querySelector('#' + CSS.escape(id));
    const scopeQuerySelector = (selector) => root.querySelector(selector);
    const scopeQuerySelectorAll = (selector) => root.querySelectorAll(selector);
    ${replaceAll(
      replaceAll(
        replaceAll(script, 'document.getElementById(', 'scopeGetElementById('),
        'document.querySelectorAll(',
        'scopeQuerySelectorAll(',
      ),
      'document.querySelector(',
      'scopeQuerySelector(',
    )}
  })();`
}

export function AnnualHtmlDashboard({ exercice }: { exercice: number }) {
  const dashboard = getAnnualHtmlDashboard(exercice)
  const availableYears = getAvailableAnnualHtmlDashboardYears()
  const rootRef = useRef<HTMLDivElement | null>(null)
  const [payload, setPayload] = useState<HtmlDashboardPayload | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const rootStyleSelector = useMemo(() => ROOT_SELECTOR, [])

  useEffect(() => {
    let cancelled = false

    async function loadDashboard() {
      if (!dashboard) {
        setPayload(null)
        setError(null)
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)

      try {
        const response = await fetch(dashboard.path, { cache: 'no-store' })
        if (!response.ok) {
          throw new Error(`Le fichier ${dashboard.path} est introuvable.`)
        }

        const html = await response.text()
        const parsed = new DOMParser().parseFromString(html, 'text/html')
        const bodyClone = parsed.body.cloneNode(true) as HTMLBodyElement

        const bodyScripts = Array.from(bodyClone.querySelectorAll('script'))
          .map((script) => script.textContent?.trim() ?? '')
          .filter(Boolean)

        bodyClone.querySelectorAll('script').forEach((script) => script.remove())

        const headScripts = Array.from(parsed.head.querySelectorAll('script'))
          .map((script) => script.textContent?.trim() ?? '')
          .filter(Boolean)

        const styles = Array.from(parsed.head.querySelectorAll('style'))
          .map((style) => style.textContent ?? '')
          .join('\n')

        if (!cancelled) {
          setPayload({
            bodyHtml: bodyClone.innerHTML,
            bodyScripts,
            headScripts,
            scopedCss: scopeCssText(styles, rootStyleSelector),
          })
        }
      } catch (loadError) {
        if (!cancelled) {
          setPayload(null)
          setError(loadError instanceof Error ? loadError.message : 'Impossible de charger le dashboard annuel.')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    void loadDashboard()

    return () => {
      cancelled = true
    }
  }, [dashboard, rootStyleSelector])

  useEffect(() => {
    const root = rootRef.current
    cleanupDashboard(root)

    if (!root || !payload) return

    root.innerHTML = payload.bodyHtml

    if (!window.__annualHtmlDashboardPlotlyLoaded) {
      payload.headScripts.forEach((script) => {
        injectInlineScript(document.head, script)
      })
      window.__annualHtmlDashboardPlotlyLoaded = true
    }

    payload.bodyScripts.forEach((script) => {
      injectInlineScript(root, scopeBodyScript(script))
    })

    return () => {
      cleanupDashboard(root)
    }
  }, [payload, exercice])

  if (!dashboard) {
    return (
      <Card className="m-4 animate-fade-up border-dashed md:m-6">
        <CardHeader>
          <CardTitle>Tableau HTML indisponible</CardTitle>
          <CardDescription>
            Aucun tableau HTML annuel n&apos;est encore publié pour l&apos;exercice {exercice}.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            Pour ajouter une nouvelle année, il suffit d&apos;ajouter un fichier HTML dans
            <code> public/annual-dashboards/AAAA/index.html</code>, puis d&apos;enregistrer
            l&apos;année dans <code>lib/annual-html-dashboards.ts</code>.
          </p>
          <p>
            Années actuellement disponibles : {availableYears.length > 0 ? availableYears.join(', ') : 'aucune'}.
          </p>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="m-4 animate-fade-up border-destructive/25 md:m-6">
        <CardHeader>
          <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <CardTitle>Chargement impossible</CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <section className="animate-fade-in">
      {payload ? <style dangerouslySetInnerHTML={{ __html: payload.scopedCss }} /> : null}

      {loading && !payload ? (
        <Card className="m-4 border-primary/15 bg-primary/5 md:m-6">
          <CardContent className="flex items-center gap-3 p-5 text-sm text-muted-foreground">
            <LoaderCircle className="h-4 w-4 animate-spin text-primary" />
            Chargement du tableau HTML annuel {exercice}...
          </CardContent>
        </Card>
      ) : null}

      <div ref={rootRef} data-annual-html-root={ROOT_VALUE} className="min-h-[calc(100vh-5rem)]" />
    </section>
  )
}
