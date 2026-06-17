'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoaderProps {
  onComplete: () => void
}

export default function Loader({ onComplete }: LoaderProps) {
  const [phase, setPhase] = useState<'parts' | 'lock' | 'wordmark' | 'exit'>('parts')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('lock'), 800)
    const t2 = setTimeout(() => setPhase('wordmark'), 1500)
    const t3 = setTimeout(() => setPhase('exit'), 2400)
    const t4 = setTimeout(() => onComplete(), 3000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [onComplete])

  const partVariants = {
    parts: (i: number) => ({
      x: [(-80 + i * 30), 0][0],
      y: [(-50 + i * 20), 0][0],
      opacity: 1,
      scale: 0.8,
    }),
    lock: { x: 0, y: 0, opacity: 1, scale: 1 },
  }

  return (
    <AnimatePresence>
      {phase !== 'exit' ? (
        <motion.div
          className="fixed inset-0 z-50 bg-base flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Lock mechanism SVG animation */}
          <div className="relative mb-10">
            <svg width="80" height="96" viewBox="0 0 80 96" fill="none">
              {/* Shackle top-left arc */}
              <motion.path
                d="M20 44 L20 26 Q20 8 40 8 Q60 8 60 26 L60 44"
                stroke="#2E2E30"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={phase !== 'parts' ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
              {/* Lock body */}
              <motion.rect
                x="8" y="44" width="64" height="44" rx="4"
                fill="#1C1C1E"
                stroke="#2E2E30"
                strokeWidth="1.5"
                initial={{ scaleY: 0, opacity: 0 }}
                animate={phase !== 'parts' ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
                style={{ transformOrigin: '40px 88px' }}
                transition={{ duration: 0.4, delay: 0.1 }}
              />
              {/* Keyhole */}
              <motion.circle
                cx="40" cy="63" r="6"
                fill="#C6037F"
                initial={{ scale: 0, opacity: 0 }}
                animate={phase === 'wordmark' ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{ duration: 0.3, type: 'spring', stiffness: 400 }}
              />
              {/* Part 1 - top left fragment */}
              <motion.rect
                x="10" y="10" width="16" height="8" rx="2"
                fill="#2E2E30"
                initial={{ x: -40, y: -30, opacity: 0 }}
                animate={phase !== 'parts'
                  ? { x: 0, y: 0, opacity: 0 }
                  : { x: 0, y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              {/* Part 2 - top right fragment */}
              <motion.rect
                x="54" y="10" width="16" height="8" rx="2"
                fill="#2E2E30"
                initial={{ x: 40, y: -30, opacity: 0 }}
                animate={phase !== 'parts'
                  ? { x: 0, y: 0, opacity: 0 }
                  : { x: 0, y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              />
            </svg>
          </div>

          {/* Wordmark stamp */}
          <AnimatePresence>
            {phase === 'wordmark' && (
              <motion.div
                className="font-mono text-5xl font-medium tracking-[0.3em] text-body"
                initial={{ scale: 1.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                XF3
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress line */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 h-px bg-stroke"
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ duration: 2.4, ease: 'linear' }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
