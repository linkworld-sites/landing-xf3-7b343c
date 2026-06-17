'use client'

import { motion } from 'framer-motion'

const specs = [
  { label: 'Weight', value: '85g' },
  { label: 'Material', value: '6061-T6 Aluminium' },
  { label: 'Finish', value: 'Hardcoat Anodised' },
  { label: 'Mast Compatibility', value: 'Universal ISO-spec' },
  { label: 'Dimensions', value: '85 × 45 × 28mm' },
  { label: 'Max Load', value: '800N Lateral' },
  { label: 'Cam Travel', value: '90°' },
  { label: 'Shims Included', value: '6 × 0.5mm' },
]

export default function SpecsStrip() {
  return (
    <section id="specs" className="bg-surface border-t border-b border-stroke py-16 md:py-20">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs text-muted uppercase tracking-widest">
            08 — Specifications
          </span>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 border-l border-stroke">
          {specs.map((spec, i) => (
            <motion.div
              key={spec.label}
              className="border-r border-b border-stroke px-6 py-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <p className="font-mono text-xs text-muted uppercase tracking-widest mb-2">
                {spec.label}
              </p>
              <p className="font-mono text-base md:text-lg text-body">{spec.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
