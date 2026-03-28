import { useState, useEffect } from 'react'
import { fetchGoldPrices, GoldPrices } from '@/lib/api'

// Fallback prices (used while loading or on error)
const FALLBACK: GoldPrices = {
  '9k': 601.83,
  '14k': 842.56,
  '18k': 1083.29,
  '21k': 1263.84,
  '22k': 1324.02,
  '24k': 1444.39,
  usdPerOunce: 4492,
  usdToMad: 10,
  updatedAt: new Date().toISOString(),
}

export function useGoldPrices() {
  const [prices, setPrices] = useState<GoldPrices>(FALLBACK)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const data = await fetchGoldPrices()
        if (!cancelled) {
          setPrices(data)
          setError(null)
        }
      } catch (e) {
        if (!cancelled) setError((e as Error).message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    // Refresh every 5 minutes
    const interval = setInterval(load, 5 * 60 * 1000)
    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [])

  return { prices, loading, error }
}
