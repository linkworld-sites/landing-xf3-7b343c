import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDir = path.join(process.cwd(), 'content/posts')
const legalDir = path.join(process.cwd(), 'content/legal')

export interface Post {
  slug: string
  title: string
  date: string
  description: string
  content: string
}

export interface LegalPage {
  title: string
  content: string
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDir)) return []
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'))
  return files
    .map((filename) => {
      const slug = filename.replace(/\.md$/, '')
      const fullPath = path.join(postsDir, filename)
      const raw = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(raw)
      return {
        slug,
        title: (data.title as string) ?? slug,
        date: (data.date as string) ?? '',
        description: (data.description as string) ?? '',
        content,
      }
    })
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDir, `${slug}.md`)
  if (!fs.existsSync(fullPath)) return null
  const raw = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(raw)
  return {
    slug,
    title: (data.title as string) ?? slug,
    date: (data.date as string) ?? '',
    description: (data.description as string) ?? '',
    content,
  }
}

export function getLegalBySlug(slug: string): LegalPage | null {
  const fullPath = path.join(legalDir, `${slug}.md`)
  if (!fs.existsSync(fullPath)) return null
  const raw = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(raw)
  return {
    title: (data.title as string) ?? slug,
    content,
  }
}
