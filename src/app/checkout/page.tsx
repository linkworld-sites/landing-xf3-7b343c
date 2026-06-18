'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { checkout, formatPrice } from '@/lib/checkout'
import { track } from '@/lib/funnel'
import { useCart } from '@/context/CartContext'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function CheckoutPage() {
  const { items, totalCents } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const currency = items[0]?.product.currency || 'EUR'

  const handlePay = async () => {
    if (!items.length) return
    setLoading(true)
    setError(null)
    track('convert')
    const cartItems = items.map((i) => ({ product_id: i.product.id, quantity: i.quantity }))
    const ok = await checkout(cartItems)
    if (!ok) {
      setError('Payment could not be started. Please try again or contact hello@xf3.com.')
      setLoading(false)
    }
    // on success, browser redirects to hosted payment page
  }

  if (items.length === 0) {
    return (
      <>
        <Nav />
        <main className="min-h-screen bg-base flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">Checkout</p>
            <h1 className="font-mono text-4xl text-body mb-6">Cart is empty.</h1>
            <Link href="/shop">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block font-mono text-xs uppercase tracking-widest px-8 py-4 border border-accent text-accent hover:bg-accent hover:text-base transition-colors"
              >
                Shop MastLOCK →
              </motion.div>
            </Link>
          </motion.div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-base pt-24 pb-32 px-6 md:px-12">
        <div className="max-w-2xl mx-auto pt-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <p className="font-mono text-xs text-accent uppercase tracking-widest mb-3">
              Secure Checkout
            </p>
            <h1 className="font-mono text-4xl md:text-5xl font-medium text-body tracking-tight">
              Order Summary
            </h1>
          </motion.div>

          {/* Order box */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="border border-stroke bg-surface p-8 mb-6"
          >
            <div className="space-y-5 mb-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-mono text-sm text-body">{item.product.name}</p>
                    <p className="font-mono text-xs text-muted mt-0.5">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-mono text-sm text-body">
                    {formatPrice(item.product.price_cents * item.quantity, item.product.currency)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-stroke pt-6 flex items-center justify-between">
              <span className="font-mono text-xs text-muted uppercase tracking-widest">Total</span>
              <span className="font-mono text-2xl font-medium text-body">
                {formatPrice(totalCents, currency)}
              </span>
            </div>
          </motion.div>

          {/* Shipping notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="flex items-center gap-3 mb-8"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-accent flex-shrink-0">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-mono text-xs text-muted uppercase tracking-widest">
              Dispatched within 24 hours · Worldwide shipping
            </span>
          </motion.div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-mono text-sm text-red-400 mb-6"
            >
              {error}
            </motion.p>
          )}

          {/* Pay button */}
          <motion.button
            onClick={handlePay}
            disabled={loading}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={loading ? {} : { scale: 1.015 }}
            whileTap={loading ? {} : { scale: 0.985 }}
            className="w-full font-mono text-sm uppercase tracking-widest py-5 bg-accent text-base hover:bg-accent/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Redirecting to payment…' : 'Pay Securely'}
          </motion.button>

          <p className="font-mono text-xs text-muted/60 text-center mt-5">
            Secure payment via Stripe — you will be redirected to complete your purchase.
          </p>

          <div className="mt-8 text-center">
            <Link href="/cart">
              <motion.span
                whileHover={{ x: -2 }}
                className="inline-block font-mono text-xs text-muted hover:text-body transition-colors uppercase tracking-widest"
              >
                ← Back to Cart
              </motion.span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
