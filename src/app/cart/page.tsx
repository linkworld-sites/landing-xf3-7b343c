'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { formatPrice } from '@/lib/checkout'
import { useCart } from '@/context/CartContext'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function CartPage() {
  const { items, removeItem, updateQty, totalCents } = useCart()
  const currency = items[0]?.product.currency || 'EUR'

  if (items.length === 0) {
    return (
      <>
        <Nav />
        <main className="min-h-screen bg-base flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">Cart</p>
            <h1 className="font-mono text-4xl text-body mb-6">Nothing here yet.</h1>
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
        <div className="max-w-3xl mx-auto pt-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <p className="font-mono text-xs text-accent uppercase tracking-widest mb-3">Your Order</p>
            <h1 className="font-mono text-4xl md:text-5xl font-medium text-body tracking-tight">
              Cart
            </h1>
          </motion.div>

          {/* Line items */}
          <div className="space-y-0 mb-12">
            <AnimatePresence initial={false}>
              {items.map((item, i) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16, height: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.07 }}
                  className="flex items-center gap-6 py-6 border-b border-stroke"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 border border-stroke bg-surface flex-shrink-0 overflow-hidden relative">
                    {item.product.image_url ? (
                      <Image
                        src={item.product.image_url}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="font-mono text-xs text-muted">XF3</span>
                      </div>
                    )}
                  </div>

                  {/* Name + price */}
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-sm font-medium text-body truncate">{item.product.name}</p>
                    <p className="font-mono text-sm text-accent mt-1">
                      {formatPrice(item.product.price_cents, item.product.currency)}
                    </p>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2">
                    <motion.button
                      onClick={() => updateQty(item.product.id, item.quantity - 1)}
                      whileTap={{ scale: 0.9 }}
                      className="w-8 h-8 border border-stroke text-body font-mono text-lg hover:border-accent hover:text-accent transition-colors flex items-center justify-center"
                    >
                      −
                    </motion.button>
                    <span className="font-mono text-sm text-body w-5 text-center">{item.quantity}</span>
                    <motion.button
                      onClick={() => updateQty(item.product.id, item.quantity + 1)}
                      whileTap={{ scale: 0.9 }}
                      className="w-8 h-8 border border-stroke text-body font-mono text-lg hover:border-accent hover:text-accent transition-colors flex items-center justify-center"
                    >
                      +
                    </motion.button>
                  </div>

                  {/* Row total */}
                  <p className="font-mono text-sm text-body w-20 text-right hidden sm:block">
                    {formatPrice(item.product.price_cents * item.quantity, item.product.currency)}
                  </p>

                  {/* Remove */}
                  <motion.button
                    onClick={() => removeItem(item.product.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="font-mono text-xs text-muted hover:text-accent transition-colors uppercase tracking-widest ml-2"
                  >
                    ✕
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order total */}
          <div className="flex items-center justify-between mb-10">
            <span className="font-mono text-xs text-muted uppercase tracking-widest">Total</span>
            <span className="font-mono text-3xl font-medium text-body">
              {formatPrice(totalCents, currency)}
            </span>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/shop" className="flex-1">
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="text-center font-mono text-xs uppercase tracking-widest px-6 py-4 border border-stroke text-muted hover:border-body hover:text-body transition-colors"
              >
                ← Continue Shopping
              </motion.div>
            </Link>
            <Link href="/checkout" className="flex-1">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="text-center font-mono text-xs uppercase tracking-widest px-6 py-4 bg-accent text-base hover:bg-accent/90 transition-colors"
              >
                Checkout →
              </motion.div>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
