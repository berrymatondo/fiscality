import { AlertCircle, AlertTriangle, Info, type LucideIcon } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { alerts } from '@/lib/data'

const config: Record<string, { icon: LucideIcon; color: string }> = {
  danger: { icon: AlertCircle, color: 'text-destructive' },
  warning: { icon: AlertTriangle, color: 'text-warning' },
  info: { icon: Info, color: 'text-primary' },
}

export function AlertsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Alertes &amp; Risques</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map((alert) => {
          const { icon: Icon, color } = config[alert.level]
          return (
            <div key={alert.text} className="flex gap-2.5">
              <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${color}`} />
              <p className="text-[12px] leading-snug text-foreground">{alert.text}</p>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
