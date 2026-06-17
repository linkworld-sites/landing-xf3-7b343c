'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const navLinks = [
  { href: '#mechanism', label: 'Mechanism' },
  { href: '#specs', label: 'Specs' },
  { href: '#buy', label: 'Buy' },
  { href: '/blog', label: 'Blog' },
]

const legalLinks = [
  { href: '/legal/impressum', label: 'Impressum' },
  { href: '/legal/datenschutz', label: 'Datenschutz' },
  { href: '/legal/cookies', label: 'Cookies' },
]

const socials = [
  { href: '#', label: 'Instagram' },
  { href: '#', label: 'YouTube' },
]

export default function Footer() {
  return (
    <footer className="bg-base border-t border-stroke">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="font-mono text-2xl font-medium tracking-[0.25em] text-body block mb-4">
              XF3
            </Link>
            <p className="font-sans text-sm text-muted max-w-xs leading-relaxed mb-6">
              MastLOCK. The tool-free foil mast mounting system engineered for serious riders.
            </p>
            {/* Dealer CTA */}
            <motion.a
              href="mailto:dealers@xf3.com"
              className="inline-block font-mono text-xs uppercase tracking-widest px-6 py-3 border border-stroke text-muted hover:border-body hover:text-body transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Become a Dealer →
            </motion.a>
          </div>

          {/* Nav */}
          <div>
            <p className="font-mono text-xs text-muted uppercase tracking-widest mb-5">Navigation</p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-mono text-sm text-muted hover:text-body transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + Legal */}
          <div>
            <p className="font-mono text-xs text-muted uppercase tracking-widest mb-5">Social</p>
            <ul className="space-y-3 mb-8">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="font-mono text-sm text-muted hover:text-body transition-colors"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">Legal</p>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-mono text-xs text-muted hover:text-body transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-stroke pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="font-mono text-xs text-muted/60 tracking-widest">
            © 2026 XFLOOW GmbH. All rights reserved.
          </p>
          <p className="font-mono text-xs text-muted/40 tracking-widest">
            Click in. Ride. Release.
          </p>
        </div>
      </div>
    </footer>
  )
}
