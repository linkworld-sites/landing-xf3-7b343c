'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { fetchProducts, formatPrice, type Product } from '@/lib/checkout'
import { track } from '@/lib/funnel'
import { useCart } from '@/context/CartContext'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { addItem } = useCart()
  const outOfStock = product.stock !== null && product.stock <= 0

  const handleAdd = () => {
    if (outOfStock) return
    addItem(product)
    track('add_to_cart')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="border border-stroke bg-surface flex flex-col"
    >
      <div className="aspect-square bg-base border-b border-stroke overflow-hidden relative">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-28 h-28 text-stroke" fill="none">
              <rect x="55" y="75" width="90" height="50" rx="6" stroke="currentColor" strokeWidth="2" />
              <circle cx="100" cy="100" r="10" stroke="#C6037F" strokeWidth="2" />
              <line x1="145" y1="100" x2="168" y2="100" stroke="currentColor" strokeWidth="2" />
              <line x1="32" y1="100" x2="55" y2="100" stroke="currentColor" strokeWidth="2" />
              <line x1="100" y1="62" x2="100" y2="40" stroke="#C6037F" strokeWidth="1.5" strokeDasharray="3 3" />
            </svg>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1 gap-3">
        <h2 className="font-mono text-sm font-medium text-body tracking-wide">{product.name}</h2>
        {product.description && (
          <p className="font-sans text-xs text-muted leading-relaxed flex-1">{product.description}</p>
        )}

        {product.stock !== null && product.stock > 0 && product.stock <= 5 && (
          <p className="font-mono text-xs text-accent uppercase tracking-widest">
            Only {product.stock} left
          </p>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-stroke mt-auto">
          <span className="font-mono text-lg font-medium text-accent">
            {formatPrice(product.price_cents, product.currency)}
          </span>
          <motion.button
            onClick={handleAdd}
            disabled={outOfStock}
            whileHover={outOfStock ? {} : { scale: 1.04 }}
            whileTap={outOfStock ? {} : { scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="font-mono text-xs uppercase tracking-widest px-5 py-2 border border-accent text-accent hover:bg-accent hover:text-base transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {outOfStock ? 'Sold Out' : 'Add to Cart'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { totalItems } = useCart()

  useEffect(() => {
    track('product_view')
    fetchProducts().then((p) => {
      setProducts(p)
      setLoading(false)
    })
  }, [])

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-base pt-24 pb-32 px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-6xl mx-auto mb-16 pt-8"
        >
          <p className="font-mono text-xs text-accent uppercase tracking-widest mb-3">
            XF3 Store
          </p>
          <h1 className="font-mono text-4xl md:text-6xl font-medium text-body tracking-tight mb-4">
            MastLOCK
          </h1>
          <p className="font-mono text-sm text-muted uppercase tracking-widest">
            One grip. No tools. Ships worldwide in 24h.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[0, 1, 2].map((i) => (
                <div key={i} className="border border-stroke bg-surface h-96 animate-pulse" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32 border border-stroke"
            >
              <p className="font-mono text-sm text-muted uppercase tracking-widest mb-2">
                Coming soon
              </p>
              <p className="font-mono text-xs text-muted/60">
                Product catalog loading — check back shortly.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>

        {/* Floating cart CTA */}
        <AnimatePresence>
          {totalItems > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
            >
              <Link href="/cart">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-accent text-base font-mono text-sm uppercase tracking-widest px-10 py-4 shadow-2xl whitespace-nowrap"
                >
                  View Cart ({totalItems})
                </motion.div>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}
