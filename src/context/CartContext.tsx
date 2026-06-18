'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { Product } from '@/lib/checkout'

export type CartEntry = {
  product: Product
  quantity: number
}

type CartContextType = {
  items: CartEntry[]
  addItem: (product: Product, qty?: number) => void
  removeItem: (productId: string) => void
  updateQty: (productId: string, qty: number) => void
  clearCart: () => void
  totalItems: number
  totalCents: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartEntry[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('xf3_cart')
      if (raw) setItems(JSON.parse(raw))
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('xf3_cart', JSON.stringify(items))
    } catch {}
  }, [items])

  const addItem = (product: Product, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.product.id === product.id)
      if (found) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i
        )
      }
      return [...prev, { product, quantity: qty }]
    })
  }

  const removeItem = (productId: string) =>
    setItems((prev) => prev.filter((i) => i.product.id !== productId))

  const updateQty = (productId: string, qty: number) => {
    if (qty <= 0) { removeItem(productId); return }
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity: qty } : i))
    )
  }

  const clearCart = () => setItems([])

  const totalItems = items.reduce((s, i) => s + i.quantity, 0)
  const totalCents = items.reduce((s, i) => s + i.product.price_cents * i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, totalItems, totalCents }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
