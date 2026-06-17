export interface Product {
  id: string
  name: string
  description: string
  price_cents: number
  currency: string
  image_url: string
  stock: number | null
}

export interface CartItem {
  product_id: string
  quantity: number
}

export function formatPrice(price_cents: number, currency: string): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency,
  }).format(price_cents / 100)
}

export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch('/api/products', { cache: 'no-store' })
    if (!res.ok) return []
    const data: unknown = await res.json()
    return Array.isArray(data) ? (data as Product[]) : []
  } catch {
    return []
  }
}

export async function checkout(items: CartItem[]): Promise<void> {
  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items }),
  })
  if (!res.ok) throw new Error('Checkout unavailable')
  const data = (await res.json()) as { url?: string }
  if (data.url) window.location.href = data.url
}
