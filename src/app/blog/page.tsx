import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export const metadata = {
  title: 'Blog — XF3 MastLOCK',
  description: 'Engineering updates, rider stories, and product insights from the XF3 team.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="min-h-screen bg-base pt-28 pb-24 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <span className="font-mono text-xs text-muted uppercase tracking-widest">Journal</span>
          <h1 className="font-mono text-4xl md:text-5xl font-medium text-body mt-3 tracking-wide">
            XF3 Blog
          </h1>
        </div>

        {posts.length === 0 ? (
          <p className="font-sans text-muted">No posts yet.</p>
        ) : (
          <ul className="divide-y divide-stroke">
            {posts.map((post) => (
              <li key={post.slug} className="py-8">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block"
                >
                  <time className="font-mono text-xs text-muted uppercase tracking-widest">
                    {post.date}
                  </time>
                  <h2 className="font-mono text-xl md:text-2xl font-medium text-body mt-2 mb-3 group-hover:text-accent transition-colors tracking-wide">
                    {post.title}
                  </h2>
                  <p className="font-sans text-sm text-muted leading-relaxed max-w-xl">
                    {post.description}
                  </p>
                  <span className="font-mono text-xs text-accent mt-4 inline-block tracking-widest uppercase">
                    Read →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-16 pt-8 border-t border-stroke">
          <Link href="/" className="font-mono text-xs text-muted hover:text-body transition-colors tracking-widest uppercase">
            ← Back to XF3
          </Link>
        </div>
      </div>
    </div>
  )
}
