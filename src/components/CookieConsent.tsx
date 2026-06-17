'use client'

import { useState, useEffect } from 'react'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('lw_consent')
    if (!consent) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem('lw_consent', 'all')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem('lw_consent', 'minimal')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie-Einstellungen"
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        width: 'min(600px, calc(100vw - 2rem))',
        background: '#1C1C1E',
        border: '1px solid #2E2E30',
        borderRadius: '4px',
        padding: '1.25rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <p style={{ color: '#E8E4DC', fontSize: '0.8125rem', fontFamily: 'var(--font-dm-mono), monospace', lineHeight: '1.6', margin: 0 }}>
        Diese Seite verwendet Cookies für Analysen und Marketing.{' '}
        <a href="/legal/cookies" style={{ color: '#C8FF00', textDecoration: 'underline' }}>Cookies</a>
        {' · '}
        <a href="/legal/datenschutz" style={{ color: '#C8FF00', textDecoration: 'underline' }}>Datenschutz</a>
      </p>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button
          onClick={decline}
          style={{
            padding: '0.5rem 1rem',
            background: 'transparent',
            border: '1px solid #2E2E30',
            color: '#6B6B6B',
            fontFamily: 'var(--font-dm-mono), monospace',
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            cursor: 'pointer',
            borderRadius: '2px',
            textTransform: 'uppercase',
          }}
        >
          Nur notwendige
        </button>
        <button
          onClick={accept}
          style={{
            padding: '0.5rem 1rem',
            background: '#C8FF00',
            border: '1px solid #C8FF00',
            color: '#0A0A0B',
            fontFamily: 'var(--font-dm-mono), monospace',
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            cursor: 'pointer',
            fontWeight: 500,
            borderRadius: '2px',
            textTransform: 'uppercase',
          }}
        >
          Alle akzeptieren
        </button>
      </div>
    </div>
  )
}
