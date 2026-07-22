'use client'

import { useEffect, useState } from 'react'

/**
 * Animates a formatted numeric string from 0 to its target value.
 * Handles French formatting: space thousands separator, comma decimals,
 * optional leading sign and trailing suffix (e.g. "%").
 */
export function CountUp({
  value,
  duration = 1400,
  className,
}: {
  value: string
  duration?: number
  className?: string
}) {
  // Parse the target value, preserving prefix sign / suffix and decimals.
  const match = value.match(/^([+-]?)([\d\s.,]+)(.*)$/)
  const sign = match?.[1] ?? ''
  const numberPart = match?.[2] ?? value
  const suffix = match?.[3] ?? ''

  const normalized = numberPart.replace(/\s/g, '').replace(',', '.')
  const target = Number.parseFloat(normalized)
  const decimals = normalized.includes('.') ? normalized.split('.')[1].length : 0

  const isNumeric = Number.isFinite(target)

  const [display, setDisplay] = useState(isNumeric ? '0' : value)

  useEffect(() => {
    if (!isNumeric) return

    let raf = 0
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      // easeOutExpo for a snappy, satisfying finish
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      const current = target * eased

      setDisplay(
        current.toLocaleString('fr-FR', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }),
      )

      if (progress < 1) raf = requestAnimationFrame(tick)
    }

    // Always start from zero on (re)mount, then animate up.
    raf = requestAnimationFrame(() => {
      setDisplay(
        (0).toLocaleString('fr-FR', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }),
      )
      raf = requestAnimationFrame(tick)
    })
    return () => cancelAnimationFrame(raf)
  }, [isNumeric, target, decimals, duration])

  if (!isNumeric) return <span className={className}>{value}</span>

  return (
    <span className={className}>
      {sign}
      {display}
      {suffix}
    </span>
  )
}
