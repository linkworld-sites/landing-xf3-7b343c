'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { track } from '@/lib/funnel'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 80, damping: 20 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-4, 4])
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [4, -4])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen bg-base flex flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(200,255,0,0.05) 0%, transparent 70%)',
        }}
      />

      {/* Product image with mouse parallax */}
      <motion.div
        className="relative w-full max-w-xl mx-auto mb-10 md:mb-14"
        style={{ rotateY, rotateX, perspective: '1200px' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <Image
            src="/images/products/product-0.jpg"
            alt="XF3 MastLOCK precision foil mast mounting system"
            width={640}
            height={640}
            className="w-full h-auto object-contain"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Headline */}
      <motion.div
        className="text-center z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      >
        <h1 className="font-mono font-medium text-body leading-none tracking-[-0.02em]"
          style={{ fontSize: 'clamp(3rem, 9vw, 7rem)' }}
        >
          One grip.
          <br />
          <span className="text-accent">Locked.</span>
        </h1>
        <p className="font-sans text-muted text-base md:text-lg max-w-md mx-auto mt-6 leading-relaxed">
          Screws are a thing of the past. MastLOCK replaces every bolt in your foil setup with a single quarter-turn.
        </p>
      </motion.div>

      {/* CTAs */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 mt-10 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
      >
        <CtaButton href="#buy" primary onClick={() => track('intent')}>
          Buy Now — €319
        </CtaButton>
        <CtaButton href="#mechanism">
          Watch How It Works
        </CtaButton>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <span className="font-mono text-xs tracking-widest text-muted uppercase">Scroll</span>
        <motion.div
          className="w-px h-10 bg-stroke"
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top' }}
        />
      </motion.div>
    </section>
  )
}

function CtaButton({
  href,
  children,
  primary = false,
  onClick,
}: {
  href: string
  children: React.ReactNode
  primary?: boolean
  onClick?: () => void
}) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      className={`relative overflow-hidden font-mono text-sm uppercase tracking-widest px-8 py-4 ${
        primary
          ? 'bg-accent text-base border border-accent'
          : 'bg-transparent text-body border border-stroke'
      }`}
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
    >
      {!primary && (
        <motion.span
          className="absolute inset-0 bg-accent origin-left"
          initial={{ scaleX: 0 }}
          variants={{ hover: { scaleX: 1 } }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
      <motion.span
        className="relative z-10"
        variants={!primary ? { hover: { color: '#0A0A0B' } } : undefined}
      >
        {children}
      </motion.span>
    </motion.a>
  )
}
