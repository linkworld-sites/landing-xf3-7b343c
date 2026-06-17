'use client'

import { useState } from 'react'
import Loader from '@/components/Loader'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import ProblemStatement from '@/components/ProblemStatement'
import MechanismView from '@/components/MechanismView'
import ThreePrinciples from '@/components/ThreePrinciples'
import BaseplateShimming from '@/components/BaseplateShimming'
import Testimonials from '@/components/Testimonials'
import SpecsStrip from '@/components/SpecsStrip'
import BuyModule from '@/components/BuyModule'
import Footer from '@/components/Footer'

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <Loader onComplete={() => setLoaded(true)} />
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.6s ease',
          pointerEvents: loaded ? 'auto' : 'none',
        }}
      >
        <Nav />
        <main>
          <Hero />
          <ProblemStatement />
          <MechanismView />
          <ThreePrinciples />
          <BaseplateShimming />
          <Testimonials />
          <SpecsStrip />
          <BuyModule />
        </main>
        <Footer />
      </div>
    </>
  )
}
