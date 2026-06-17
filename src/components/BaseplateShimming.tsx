'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function BaseplateShimming() {
  const [angle, setAngle] = useState(3)
  const trimDeg = angle - 3

  return (
    <section className="bg-base py-24 md:py-36">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-mono text-xs text-muted uppercase tracking-widest">
            06 — Baseplate Shimming
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-mono text-4xl md:text-5xl font-medium text-body mb-6 leading-tight tracking-wide">
              Engineered down to
              <br />
              every millimeter.
            </h2>
            <p className="font-sans text-muted text-base leading-relaxed mb-8 max-w-md">
              Ultra-slim 0.5mm aluminium shims stack behind the baseplate to dial in your trim angle
              with surgical precision. No guesswork. No re-tightening after the fact.
            </p>
            <div className="flex flex-col gap-3">
              {[
                '0.5mm per shim increment',
                '±3° trim range',
                'Shims included in every kit',
              ].map((spec) => (
                <div key={spec} className="flex items-center gap-3">
                  <div className="w-1 h-1 bg-accent rounded-full flex-shrink-0" />
                  <span className="font-mono text-xs text-muted uppercase tracking-widest">{spec}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Interactive SVG */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="flex flex-col items-center gap-8"
          >
            {/* SVG diagram */}
            <div className="relative w-full max-w-sm">
              <svg viewBox="0 0 300 240" className="w-full" style={{ overflow: 'visible' }}>
                {/* Water surface reference */}
                <line x1="20" y1="180" x2="280" y2="180" stroke="#2E2E30" strokeWidth="1" strokeDasharray="4 4" />
                <text x="25" y="175" fill="#6B6B6B" fontFamily="var(--font-dm-mono)" fontSize="9" letterSpacing="1">WATER</text>

                {/* Mast group — pivots at base */}
                <g transform={`translate(150, 180) rotate(${trimDeg})`}>
                  {/* Mast */}
                  <rect x="-6" y="-140" width="12" height="140" fill="#1C1C1E" stroke="#2E2E30" strokeWidth="1" />

                  {/* Baseplate */}
                  <rect x="-36" y="-16" width="72" height="16" rx="2" fill="#2E2E30" stroke="#6B6B6B" strokeWidth="1" />

                  {/* Shim layers (accent-coloured) */}
                  {Array.from({ length: Math.abs(trimDeg) }).map((_, i) => (
                    <rect
                      key={i}
                      x={trimDeg > 0 ? 18 : -36}
                      y={-32 - i * 4}
                      width="18"
                      height="3"
                      rx="1"
                      fill="#C6037F"
                      opacity={0.8 - i * 0.15}
                    />
                  ))}

                  {/* Cam lever */}
                  <rect x="22" y="-30" width="24" height="14" rx="2" fill="#1C1C1E" stroke="#2E2E30" strokeWidth="1" />
                  <circle cx="46" cy="-23" r="5" fill="none" stroke="#C6037F" strokeWidth="1.5" />

                  {/* Angle arc */}
                  <path
                    d={`M 0 -140 L 0 -165`}
                    stroke="#2E2E30"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                </g>

                {/* Vertical reference */}
                <line x1="150" y1="30" x2="150" y2="180" stroke="#2E2E30" strokeWidth="1" strokeDasharray="3 3" />

                {/* Angle label */}
                <text
                  x="162"
                  y="80"
                  fill={trimDeg !== 0 ? '#C6037F' : '#6B6B6B'}
                  fontFamily="var(--font-dm-mono)"
                  fontSize="12"
                  letterSpacing="1"
                >
                  {trimDeg >= 0 ? '+' : ''}{trimDeg}°
                </text>
              </svg>
            </div>

            {/* Slider */}
            <div className="w-full max-w-sm">
              <div className="flex justify-between mb-2">
                <span className="font-mono text-xs text-muted">−3°</span>
                <span className="font-mono text-xs text-accent">
                  Trim: {trimDeg >= 0 ? '+' : ''}{trimDeg}°
                </span>
                <span className="font-mono text-xs text-muted">+3°</span>
              </div>
              <input
                type="range"
                min={0}
                max={6}
                step={1}
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
                className="w-full h-1 appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #C6037F ${((angle) / 6) * 100}%, #2E2E30 ${((angle) / 6) * 100}%)`,
                  borderRadius: '2px',
                  outline: 'none',
                }}
              />
              <p className="font-mono text-xs text-muted mt-3 text-center tracking-widest uppercase">
                Drag to adjust trim angle
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
