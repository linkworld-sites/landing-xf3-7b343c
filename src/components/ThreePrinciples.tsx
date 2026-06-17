'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

const principles = [
  {
    id: 'tool-free',
    title: 'TOOL-FREE',
    sub: 'No hex keys. No screwdrivers. No searching the beach bag.',
    detail: 'Quarter-turn cam lever. Any rider, any glove, any conditions.',
    image: '/images/detail.png',
    offset: '-60px',
  },
  {
    id: 'repeatable',
    title: 'REPEATABLE',
    sub: 'Same position. Every session. Every board.',
    detail: 'Precision-machined datum surfaces ensure sub-millimeter repeatability every mount.',
    image: '/images/process.png',
    offset: '60px',
  },
  {
    id: 'universal',
    title: 'UNIVERSAL',
    sub: 'One system. All brands. All mast bases.',
    detail: 'Compatible with every ISO-spec mast track. Swap boards in seconds, not minutes.',
    image: '/images/material.png',
    offset: '-40px',
  },
]

export default function ThreePrinciples() {
  return (
    <section className="bg-base py-24 md:py-36 overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-mono text-xs text-muted uppercase tracking-widest">
            05 — Three Principles
          </span>
        </motion.div>

        <div className="flex flex-col gap-0">
          {principles.map((p, i) => (
            <PrincipleTile key={p.id} principle={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PrincipleTile({
  principle,
  index,
}: {
  principle: (typeof principles)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const isRight = index % 2 === 1
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [isRight ? 60 : -60, isRight ? -60 : 60]
  )

  return (
    <motion.div
      ref={ref}
      className={`relative w-full md:w-[60vw] overflow-hidden border-t border-stroke ${
        isRight ? 'ml-auto' : ''
      }`}
      style={{ minHeight: '50vh' }}
      initial={{ opacity: 0, x: isRight ? 60 : -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background image at 20% opacity */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image
          src={principle.image}
          alt={principle.title}
          fill
          className="object-cover opacity-20"
          sizes="60vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-base/60 to-base/40" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 p-8 md:p-16 flex flex-col justify-end min-h-[50vh]">
        <div className="mb-3">
          <span className="font-mono text-xs text-muted uppercase tracking-widest">
            0{index + 1}
          </span>
        </div>
        <h3
          className="font-mono font-medium text-body tracking-widest leading-none mb-4"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
        >
          {principle.title}
        </h3>
        <p className="font-sans text-body/70 text-base md:text-lg max-w-md leading-relaxed mb-3">
          {principle.sub}
        </p>
        <p className="font-mono text-xs text-muted tracking-wide max-w-sm leading-relaxed">
          {principle.detail}
        </p>
      </div>
    </motion.div>
  )
}
