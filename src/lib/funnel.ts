type FunnelStep = 'landing' | 'engage' | 'intent' | 'convert'

export function track(step: FunnelStep): void {
  if (typeof window === 'undefined') return

  const consent = localStorage.getItem('lw_consent')
  if (!consent && step !== 'landing') return

  try {
    const existing = JSON.parse(localStorage.getItem('lw_funnel') ?? '[]') as string[]
    if (!existing.includes(step)) {
      existing.push(step)
      localStorage.setItem('lw_funnel', JSON.stringify(existing))
    }
  } catch {
    // ignore storage errors
  }
}
