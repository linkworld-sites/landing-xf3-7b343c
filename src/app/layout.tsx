import type { Metadata } from 'next'
import { DM_Mono, Inter } from 'next/font/google'
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
  title: 'XF3 MastLOCK — Tool-Free Foil Mast Mounting',
  description:
    'One grip. Locked. The XF3 MastLOCK eliminates tools and screws from your foil setup — faster, repeatable, universal.',
  openGraph: {
    title: 'XF3 MastLOCK — Tool-Free Foil Mast Mounting',
    description: 'One grip. Locked. Engineered for serious foil riders.',
    images: ['/images/hero.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${dmMono.variable} ${inter.variable}`}>
      <body className="bg-base text-body font-sans antialiased">
        <SmoothScroll>
          <FunnelTracker />
          {children}
          <CookieConsent />
        </SmoothScroll>
      </body>
    </html>
  )
}
