const BASE_URL = import.meta.env.VITE_API_URL ?? 'https://casa-gold-backend-production.up.railway.app'

export interface GoldPrices {
  '9k': number
  '14k': number
  '18k': number
  '21k': number
  '22k': number
  '24k': number
  usdPerOunce: number
  usdToMad: number
  updatedAt: string
}

export async function fetchGoldPrices(): Promise<GoldPrices> {
  const res = await fetch(`${BASE_URL}/api/gold/prices`)
  if (!res.ok) throw new Error(`Gold API error: ${res.status}`)
  return res.json()
}
