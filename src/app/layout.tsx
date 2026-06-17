import type { Metadata } from 'next'
import { DM_Mono, Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import SmoothScroll from '@/components/SmoothScroll'
import FunnelTracker from '@/components/FunnelTracker'
import CookieConsent from '@/components/CookieConsent'

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://c76f5cc9.run.linkworld.ai'),
  title: 'XF3 MastLOCK — Tool-Free Foil Mast Mounting',
  description:
    'XF3 MastLOCK eliminates tools, screws, and setup frustration — one-grip quick-release for all foil brands. Faster, repeatable, universal.',
  openGraph: {
    type: 'website',
    url: 'https://c76f5cc9.run.linkworld.ai',
    title: 'XF3 MastLOCK — Tool-Free Foil Mast Mounting',
    description:
      'One grip. Locked. XF3 MastLOCK replaces screws and tools with a quick-release system engineered for serious foil riders.',
    siteName: 'XF3',
    images: [{ url: '/images/hero.png', width: 1200, height: 630, alt: 'XF3 MastLOCK quick-release foil mounting system' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'XF3 MastLOCK — Tool-Free Foil Mast Mounting',
    description:
      'One grip. Locked. XF3 MastLOCK replaces screws and tools with a quick-release system engineered for serious foil riders.',
    images: ['/images/hero.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${dmMono.variable} ${inter.variable}`}>
      <body className="bg-base text-body font-sans antialiased">
        <Script
          src="https://app.linkworld.ai/api/public/funnel/7b343c2f-0bb7-4e2b-920c-d406c3073cad/pixel.js"
          strategy="afterInteractive"
        />
        <SmoothScroll>
          <FunnelTracker />
          {children}
          <CookieConsent />
        </SmoothScroll>
      </body>
    </html>
  )
}
