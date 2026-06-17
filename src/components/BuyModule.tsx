'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { fetchProducts, checkout, formatPrice, type Product, type CartItem } from '@/lib/checkout'
import { track } from '@/lib/funnel'

export default function BuyModule() {
  const [products, setProducts] = useState<Product[]>([])
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts().then((p) => {
      setProducts(p)
      setLoading(false)
    })
  }, [])

  const addToCart = (productId: string) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product_id === productId)
      if (existing) {
        return prev.map((i) =>
          i.product_id === productId ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { product_id: productId, quantity: 1 }]
    })
    track('intent')
  }

  const handleCheckout = async () => {
    if (cartItems.length === 0) return
    setCheckoutLoading(true)
    setError(null)
    try {
      await checkout(cartItems)
      track('convert')
    } catch {
      setError('Checkout unavailable. Please try again later.')
      setCheckoutLoading(false)
    }
  }

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <section id="buy" className="bg-base min-h-screen flex items-center justify-center py-24 px-6">
      <div className="w-full max-w-3xl mx-auto text-center">
        <motion.div
          className="mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs text-muted uppercase tracking-widest">
            09 — Get Yours
          </span>
        </motion.div>

        {/* Product image on radial gradient */}
        <motion.div
          className="relative mx-auto mb-12"
          style={{
            width: 'min(480px, 100%)',
            background: 'radial-gradient(ellipse at center, rgba(200,255,0,0.06) 0%, transparent 70%)',
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/images/hero.png"
            alt="XF3 MastLOCK"
            width={480}
            height={480}
            className="w-full h-auto object-contain drop-shadow-2xl"
          />
        </motion.div>

        {/* Product name */}
        <motion.h2
          className="font-mono text-3xl md:text-5xl font-medium text-body tracking-wide mb-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          XF3 MastLOCK
        </motion.h2>

        {/* Price */}
        <motion.div
          className="font-mono text-6xl md:text-8xl font-medium text-body mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          {loading ? (
            <span className="text-muted text-4xl">—</span>
          ) : products.length > 0 ? (
            formatPrice(products[0].price_cents, products[0].currency)
          ) : (
            '€319'
          )}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col items-center gap-4"
        >
          {loading ? (
            <div className="font-mono text-sm text-muted tracking-widest">Loading...</div>
          ) : products.length > 0 ? (
            <>
              <motion.button
                onClick={() => addToCart(products[0].id)}
                className="font-mono text-sm uppercase tracking-widest px-12 py-5 bg-accent text-base font-medium"
                disabled={products[0].stock !== null && products[0].stock === 0}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
              >
                {products[0].stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </motion.button>

              {/* Cart summary */}
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.div
                    className="flex flex-col items-center gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="font-mono text-sm text-muted">
                      {cartCount} × MastLOCK in cart
                    </p>
                    <motion.button
                      onClick={handleCheckout}
                      disabled={checkoutLoading}
                      className="font-mono text-xs uppercase tracking-widest px-8 py-3 border border-accent text-accent hover:bg-accent hover:text-base transition-colors disabled:opacity-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {checkoutLoading ? 'Processing...' : 'Checkout →'}
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

              {error && (
                <p className="font-mono text-xs text-red-400 tracking-wide">{error}</p>
              )}
            </>
          ) : (
            /* Empty state */
            <div className="flex flex-col items-center gap-6">
              <motion.a
                href="mailto:hello@xf3.com"
                onClick={() => track('intent')}
                className="font-mono text-sm uppercase tracking-widest px-12 py-5 bg-accent text-base font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Contact to Order
              </motion.a>
              <p className="font-mono text-xs text-muted tracking-widest">
                Ships within 24h · Worldwide delivery
              </p>
            </div>
          )}

          {!loading && products.length > 0 && (
            <p className="font-mono text-xs text-muted tracking-widest mt-2">
              Ships within 24h · Worldwide delivery
            </p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
