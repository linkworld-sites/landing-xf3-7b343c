'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'

interface Part {
  id: string
  label: string
  desc: string
  x: number
  y: number
  initX: number
  initY: number
  shape: string
  fill: string
  stroke: string
}

const parts: Part[] = [
  {
    id: 'baseplate',
    label: 'Baseplate',
    desc: 'CNC-machined 6061-T6 aluminium. Zero flex under load.',
    x: 0, y: 80, initX: -120, initY: 220,
    shape: 'M-44,-7 L44,-7 L48,7 L-48,7 Z',
    fill: '#2E2E30', stroke: '#6B6B6B',
  },
  {
    id: 'shim',
    label: 'Shim Stack',
    desc: 'Ultra-slim 0.5mm shims for precise trim angle adjustment.',
    x: 0, y: 54, initX: 150, initY: 220,
    shape: 'M-38,-3 L38,-3 L38,3 L-38,3 Z',
    fill: '#1C1C1E', stroke: '#C8FF00',
  },
  {
    id: 'body',
    label: 'Lock Body',
    desc: 'Hardcoat anodised. Rated 800N lateral load.',
    x: 0, y: 16, initX: -150, initY: -180,
    shape: 'M-42,-26 L42,-26 L42,26 L-42,26 Z',
    fill: '#1C1C1E', stroke: '#2E2E30',
  },
  {
    id: 'cam',
    label: 'Cam Lever',
    desc: 'Eccentric cam: 90° rotation generates 8kN clamping force.',
    x: 54, y: -8, initX: 180, initY: -160,
    shape: 'M0,-13 L26,-13 Q34,-13 34,-7 Q34,7 26,7 L0,7 Z',
    fill: '#2E2E30', stroke: '#6B6B6B',
  },
  {
    id: 'pivot',
    label: 'Pivot Pin',
    desc: 'Grade 8 titanium. Field-replaceable in 30 seconds.',
    x: -4, y: -8, initX: -180, initY: -100,
    shape: 'M-4,-26 L4,-26 L4,26 L-4,26 Z',
    fill: '#C8FF00', stroke: '#C8FF00',
  },
  {
    id: 'collar',
    label: 'Quick-Release Collar',
    desc: 'Stainless steel collar — audible click confirms lock.',
    x: 0, y: -52, initX: 100, initY: -230,
    shape: 'M-46,-8 L46,-8 L46,8 L-46,8 Z',
    fill: '#1C1C1E', stroke: '#2E2E30',
  },
]

export default function MechanismView() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const lockedOpacity = useTransform(scrollYProgress, [0.78, 0.88, 0.94, 1.0], [0, 1, 1, 0])
  const lockedScale = useTransform(scrollYProgress, [0.78, 0.88], [0.7, 1])
  const progressHeight = useTransform(scrollYProgress, [0, 0.78], ['0%', '100%'])

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      const idx = Math.min(Math.floor(v / 0.13), parts.length - 1)
      setActiveStep(Math.max(0, idx))
    })
  }, [scrollYProgress])

  return (
    <section id="mechanism" ref={containerRef} className="relative" style={{ height: '500vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-base flex items-center justify-center">
        {/* Section header */}
        <div className="absolute top-24 left-6 md:left-12">
          <span className="font-mono text-xs text-muted uppercase tracking-widest">04 — Mechanism</span>
        </div>

        {/* Active step info */}
        <div className="absolute left-6 md:left-12 bottom-20 z-10 max-w-xs">
          <p className="font-mono text-xs text-accent uppercase tracking-widest mb-2">
            {parts[activeStep]?.label ?? ''}
          </p>
          <p className="font-sans text-sm text-muted leading-relaxed">
            {parts[activeStep]?.desc ?? ''}
          </p>
        </div>

        {/* SVG exploded view */}
        <svg
          viewBox="-160 -130 320 260"
          className="w-full max-w-sm md:max-w-md lg:max-w-lg"
          style={{ overflow: 'visible' }}
        >
          {parts.map((part, i) => (
            <PartElement
              key={part.id}
              part={part}
              index={i}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </svg>

        {/* LOCKED stamp */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
          style={{ opacity: lockedOpacity }}
        >
          <motion.div
            className="font-mono font-medium text-accent text-center"
            style={{ fontSize: 'clamp(3rem, 14vw, 10rem)', scale: lockedScale }}
          >
            LOCKED
          </motion.div>
        </motion.div>

        {/* Scroll progress indicator */}
        <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 h-40 w-px bg-stroke overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 right-0 bg-accent"
            style={{ height: progressHeight }}
          />
        </div>
      </div>
    </section>
  )
}

function PartElement({
  part,
  index,
  scrollYProgress,
}: {
  part: Part
  index: number
  scrollYProgress: MotionValue<number>
}) {
  const start = index * 0.13
  const end = start + 0.12
  const snapStart = 0.8
  const snapEnd = 0.88

  const finalX = useTransform(scrollYProgress, (v) => {
    if (v < start) return part.initX
    if (v < end) {
      const p = (v - start) / (end - start)
      return part.initX + (part.x - part.initX) * p
    }
    if (v < snapStart) return part.x
    if (v < snapEnd) {
      const p = (v - snapStart) / (snapEnd - snapStart)
      return part.x * (1 - p)
    }
    return 0
  })

  const finalY = useTransform(scrollYProgress, (v) => {
    if (v < start) return part.initY
    if (v < end) {
      const p = (v - start) / (end - start)
      return part.initY + (part.y - part.initY) * p
    }
    if (v < snapStart) return part.y
    if (v < snapEnd) {
      const p = (v - snapStart) / (snapEnd - snapStart)
      return part.y * (1 - p)
    }
    return 0
  })

  const opacity = useTransform(scrollYProgress, (v) => {
    if (v < start) return 0
    const fadeLen = (end - start) * 0.35
    if (v < start + fadeLen) return (v - start) / fadeLen
    return 1
  })

  return (
    <motion.g style={{ x: finalX, y: finalY, opacity }}>
      <path d={part.shape} fill={part.fill} stroke={part.stroke} strokeWidth="1" />
    </motion.g>
  )
}
