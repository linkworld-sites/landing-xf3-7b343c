'use client'

import { motion } from 'framer-motion'

const marqueeQuotes = [
  '"Haven\'t touched a hex key since."',
  '"Same position, every session."',
  '"Under two minutes. Every time."',
  '"The math is simple — MastLOCK."',
  '"Four bolts to zero. That\'s the upgrade."',
  '"Click in. Ride. Done."',
]

const testimonials = [
  {
    quote:
      'I haven\'t touched a hex key since I got the MastLOCK. Not once. We\'re talking forty sessions across three boards and two locations.',
    name: 'Tom A.',
    discipline: 'Wingfoiler',
    location: 'Tarifa, ES',
  },
  {
    quote:
      'Same position, every session. That\'s what I paid for. My feet have been in the same spot since day one. That repeatability is everything when you\'re pumping.',
    name: 'Maya R.',
    discipline: 'Pump Foiler',
    location: 'Cape Town, ZA',
  },
  {
    quote:
      'Set up and in the water in under two minutes. My previous record was seven with the old system. The math is simple.',
    name: 'Kai B.',
    discipline: 'Kitefoiler',
    location: 'Maui, HI',
  },
]

export default function Testimonials() {
  return (
    <section className="bg-base overflow-hidden py-24 md:py-32">
      {/* Marquee */}
      <div className="relative overflow-hidden mb-16 border-t border-b border-stroke py-4">
        <motion.div
          className="flex gap-12 whitespace-nowrap"
          animate={{ x: [0, '-50%'] }}
          transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
        >
          {[...marqueeQuotes, ...marqueeQuotes].map((quote, i) => (
            <span key={i} className="font-mono text-sm text-accent tracking-widest flex-shrink-0">
              {quote}
              <span className="mx-6 text-stroke">·</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Section header */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="font-mono text-xs text-muted uppercase tracking-widest">
            07 — Riders
          </span>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[0]
  index: number
}) {
  return (
    <motion.div
      className="bg-surface border border-stroke p-8 flex flex-col justify-between"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      whileHover={{ y: -8, boxShadow: '0 24px 48px rgba(0,0,0,0.4)' }}
    >
      <div>
        <div className="font-mono text-xs text-accent mb-6">&#34;</div>
        <p className="font-sans text-body/80 text-sm leading-relaxed mb-8">
          {testimonial.quote}
        </p>
      </div>
      <div className="border-t border-stroke pt-4">
        <p className="font-mono text-xs text-body uppercase tracking-widest">{testimonial.name}</p>
        <p className="font-mono text-xs text-muted uppercase tracking-widest mt-1">
          {testimonial.discipline} · {testimonial.location}
        </p>
      </div>
    </motion.div>
  )
}
