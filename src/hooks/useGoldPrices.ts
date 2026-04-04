import { useState, useEffect } from 'react'
import { fetchGoldPrices, GoldPrices } from '@/lib/api'

// Fallback prices (used while loading or on error)
const FALLBACK: GoldPrices = {
  '9k': 530.00,
  '14k': 830.00,
  '18k': 1070.00,
  '21k': 1250.00,
  '22k': 1310.00,
  '24k': 1400.00,
  usdPerOunce: 4676,
  usdToMad: 9.40,
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
        console.log('Prix or chargés depuis API:', data)
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
