'use client'

import { useEffect } from 'react'
import { track } from '@/lib/funnel'

export default function FunnelTracker() {
  useEffect(() => {
    track('landing')

    let engaged = false
    const handleEngage = () => {
      if (engaged) return
      engaged = true
      track('engage')
    }

    window.addEventListener('scroll', handleEngage, { passive: true, once: true })
    window.addEventListener('click', handleEngage, { once: true })

    return () => {
      window.removeEventListener('scroll', handleEngage)
      window.removeEventListener('click', handleEngage)
    }
  }, [])

  return null
}
