import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        base: '#0A0A0B',
        surface: '#1C1C1E',
        stroke: '#2E2E30',
        accent: '#C6037F',
        body: '#E8E4DC',
        muted: '#6B6B6B',
      },
      fontFamily: {
        mono: ['var(--font-dm-mono)', 'DM Mono', 'monospace'],
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
      },
    },
  },
  plugins: [],
}

export default config
