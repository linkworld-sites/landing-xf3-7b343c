import { notFound } from 'next/navigation'
import Link from 'next/link'
import { marked } from 'marked'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return { title: `${post.title} — XF3`, description: post.description }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const html = await marked.parse(post.content)

  return (
    <div className="min-h-screen bg-base pt-28 pb-24 px-6 md:px-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-10">
          <Link
            href="/blog"
            className="font-mono text-xs text-muted hover:text-body transition-colors tracking-widest uppercase"
          >
            ← Blog
          </Link>
        </div>

        <time className="font-mono text-xs text-muted uppercase tracking-widest">{post.date}</time>
        <h1 className="font-mono text-3xl md:text-4xl font-medium text-body mt-3 mb-8 tracking-wide leading-tight">
          {post.title}
        </h1>

        <div
          className="post-body"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <div className="mt-16 pt-8 border-t border-stroke">
          <Link href="/blog" className="font-mono text-xs text-muted hover:text-body transition-colors tracking-widest uppercase">
            ← All Posts
          </Link>
        </div>
      </div>
    </div>
  )
}
