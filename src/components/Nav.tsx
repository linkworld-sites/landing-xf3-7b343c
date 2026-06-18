'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'

const links = [
  { href: '#mechanism', label: 'Mechanism' },
  { href: '#specs', label: 'Specs' },
  { href: '/shop', label: 'Shop' },
  { href: '/blog', label: 'Blog' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const { totalItems } = useCart()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40 px-6 md:px-12 py-5 flex items-center justify-between"
      style={{ backdropFilter: scrolled ? 'blur(20px)' : 'none' }}
      animate={{ backgroundColor: scrolled ? 'rgba(10,10,11,0.85)' : 'transparent' }}
      transition={{ duration: 0.3 }}
    >
      <Link href="/" className="font-mono text-lg font-medium tracking-[0.25em] text-body hover:text-accent transition-colors">
        XF3
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {links.map((link) => (
          <motion.div key={link.href} whileHover={{ y: -1 }} transition={{ duration: 0.15 }}>
            <Link
              href={link.href}
              className="font-mono text-xs uppercase tracking-widest text-muted hover:text-body transition-colors"
            >
              {link.label}
            </Link>
          </motion.div>
        ))}
      </div>

      <Link href="/cart">
        <motion.div
          className="font-mono text-xs uppercase tracking-widest px-5 py-2 border border-accent text-accent hover:bg-accent hover:text-base transition-colors relative"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.15 }}
        >
          Cart
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-accent text-base font-mono text-[10px] flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </motion.div>
      </Link>
    </motion.nav>
  )
}
