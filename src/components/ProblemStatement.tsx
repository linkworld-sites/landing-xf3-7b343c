'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'

const panels = [
  {
    counter: '4',
    unit: 'SCREWS',
    sub: 'per mast connection',
    pain: 'Four points of failure on every session. Every screw a potential delay.',
    resolution: false,
  },
  {
    counter: '2',
    unit: 'MINUTES',
    sub: 'minimum setup time',
    pain: "Perfect conditions don't wait. Two minutes becomes ten when your hex key is buried.",
    resolution: false,
  },
  {
    counter: '1',
    unit: 'LOST NUT',
    sub: 'in the sand — always',
    pain: null,
    resolution: true,
  },
]

export default function ProblemStatement() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0vw', '-200vw'])

  return (
    <section ref={containerRef} className="relative" style={{ height: '300vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div className="flex" style={{ x, width: '300vw' }}>
          {panels.map((panel, i) => (
            <PanelCard key={i} panel={panel} index={i} scrollYProgress={scrollYProgress} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function PanelCard({
  panel,
  index,
  scrollYProgress,
}: {
  panel: (typeof panels)[0]
  index: number
  scrollYProgress: MotionValue<number>
}) {
  const start = index / 3
  const end = (index + 1) / 3

  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.05, end - 0.05, end],
    [0.3, 1, 1, 0.4]
  )

  const counterColor = useTransform(
    scrollYProgress,
    [start, start + 0.15],
    ['#2E2E30', '#E8E4DC']
  )

  return (
    <motion.div
      className="flex-shrink-0 w-screen h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24"
      style={{ opacity }}
    >
      {!panel.resolution ? (
        <>
          <div className="mb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              Problem 0{index + 1}
            </span>
          </div>
          <motion.div
            className="font-mono font-medium leading-none mb-4"
            style={{ color: counterColor, fontSize: 'clamp(6rem, 20vw, 16rem)' }}
          >
            {panel.counter}
          </motion.div>
          <div
            className="font-mono tracking-widest text-body/60 mb-6"
            style={{ fontSize: 'clamp(1.25rem, 3vw, 2.5rem)' }}
          >
            {panel.unit}
          </div>
          <div className="font-mono text-sm text-muted uppercase tracking-widest mb-8">
            {panel.sub}
          </div>
          <p className="font-sans text-base text-muted max-w-md leading-relaxed">
            {panel.pain}
          </p>
        </>
      ) : (
        <ResolutionPanel counter={panel.counter} unit={panel.unit} sub={panel.sub} />
      )}
    </motion.div>
  )
}

function ResolutionPanel({
  counter,
  unit,
  sub,
}: {
  counter: string
  unit: string
  sub: string
}) {
  return (
    <>
      <div className="mb-4">
        <span className="font-mono text-xs uppercase tracking-widest text-muted">Problem 03</span>
      </div>
      <div
        className="font-mono font-medium leading-none mb-4 text-muted line-through"
        style={{ fontSize: 'clamp(6rem, 20vw, 16rem)' }}
      >
        {counter}
      </div>
      <div
        className="font-mono tracking-widest text-muted/40 mb-6 line-through"
        style={{ fontSize: 'clamp(1.25rem, 3vw, 2.5rem)' }}
      >
        {unit}
      </div>
      <div className="font-mono text-sm text-muted uppercase tracking-widest mb-10 line-through">
        {sub}
      </div>
      <div className="w-16 h-px bg-accent mb-8" />
      <div
        className="font-mono text-accent tracking-wide leading-tight"
        style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)' }}
      >
        MastLOCK.
        <br />
        <span className="text-body">Zero tools.</span>
        <br />
        <span className="text-body">Zero parts.</span>
        <br />
        <span className="text-body/60">One click.</span>
      </div>
    </>
  )
}
