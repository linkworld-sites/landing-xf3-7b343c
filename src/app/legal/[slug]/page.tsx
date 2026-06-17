import { notFound } from 'next/navigation'
import Link from 'next/link'
import { marked } from 'marked'
import { getLegalBySlug } from '@/lib/posts'
import type { Metadata } from 'next'

const validSlugs = ['impressum', 'datenschutz', 'cookies']

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = getLegalBySlug(slug)
  if (!page) return {}
  return { title: `${page.title} — XF3` }
}

export default async function LegalPage({ params }: Props) {
  const { slug } = await params
  if (!validSlugs.includes(slug)) notFound()
  const page = getLegalBySlug(slug)
  if (!page) notFound()

  const html = await marked.parse(page.content)

  return (
    <div className="min-h-screen bg-base pt-28 pb-24 px-6 md:px-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-10">
          <Link
            href="/"
            className="font-mono text-xs text-muted hover:text-body transition-colors tracking-widest uppercase"
          >
            ← XF3
          </Link>
        </div>

        <h1 className="font-mono text-3xl md:text-4xl font-medium text-body mb-10 tracking-wide">
          {page.title}
        </h1>

        <div
          className="post-body"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <div className="mt-16 pt-8 border-t border-stroke flex gap-6">
          {validSlugs.map((s) => (
            <Link
              key={s}
              href={`/legal/${s}`}
              className={`font-mono text-xs tracking-widest uppercase transition-colors ${
                s === slug ? 'text-accent' : 'text-muted hover:text-body'
              }`}
            >
              {s}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
