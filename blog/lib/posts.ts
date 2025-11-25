import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'

const postsDirectory = path.join(process.cwd(), 'content/posts')

// Cache for post metadata to avoid re-reading files during build
let metadataCache: PostMetadata[] | null = null
let fullPostsCache: Map<string, Post> = new Map()

export interface Post {
  slug: string
  title: string
  publishDate: string
  updatedDate?: string
  author: {
    name: string
    title: string
    image: string
    bio: string
  }
  category: string
  tags: string[]
  excerpt: string
  metaDescription?: string
  featured: boolean
  coverImage: string
  content: string
  readingTime: number
}

export interface PostMetadata extends Omit<Post, 'content'> {}

// Calculate reading time (average 200 words per minute)
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.trim().split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

// Get all post slugs
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter(fileName => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map(fileName => fileName.replace(/\.mdx?$/, ''))
}

// Get post metadata only (faster, no content processing)
function getPostMetadataBySlug(slug: string): PostMetadata | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title,
      publishDate: data.publishDate,
      updatedDate: data.updatedDate,
      author: data.author || {
        name: 'Rozsa Gyene',
        title: 'Estate Planning Attorney',
        image: '/blog/images/author/rozsa-gyene.jpg',
        bio: 'Attorney Rozsa Gyene has over 25 years of experience in estate planning, trust litigation, and probate law, serving families throughout Los Angeles County.',
      },
      category: data.category,
      tags: data.tags || [],
      excerpt: data.excerpt,
      metaDescription: data.metaDescription,
      featured: data.featured || false,
      coverImage: data.coverImage ? `/blog${data.coverImage}` : '/blog/images/blog/default-cover.jpg',
      readingTime: calculateReadingTime(content),
    }
  } catch (error) {
    console.error(`Error reading post metadata ${slug}:`, error)
    return null
  }
}

// Get post by slug with full content
export async function getPostBySlug(slug: string): Promise<Post | null> {
  // Check cache first
  if (fullPostsCache.has(slug)) {
    return fullPostsCache.get(slug)!
  }

  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const processedContent = await remark()
      .use(remarkGfm)
      .use(html)
      .process(content)
    const contentHtml = processedContent.toString()

    const post: Post = {
      slug,
      title: data.title,
      publishDate: data.publishDate,
      updatedDate: data.updatedDate,
      author: data.author || {
        name: 'Rozsa Gyene',
        title: 'Estate Planning Attorney',
        image: '/blog/images/author/rozsa-gyene.jpg',
        bio: 'Attorney Rozsa Gyene has over 25 years of experience in estate planning, trust litigation, and probate law, serving families throughout Los Angeles County.',
      },
      category: data.category,
      tags: data.tags || [],
      excerpt: data.excerpt,
      metaDescription: data.metaDescription,
      featured: data.featured || false,
      coverImage: data.coverImage ? `/blog${data.coverImage}` : '/blog/images/blog/default-cover.jpg',
      content: contentHtml,
      readingTime: calculateReadingTime(content),
    }

    // Cache the result
    fullPostsCache.set(slug, post)
    return post
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

// Get all posts with metadata (cached for performance)
export async function getAllPosts(): Promise<PostMetadata[]> {
  // Return cached metadata if available
  if (metadataCache !== null) {
    return metadataCache
  }

  const slugs = getAllPostSlugs()
  const posts = slugs
    .map(slug => getPostMetadataBySlug(slug))
    .filter((post): post is PostMetadata => post !== null)
    .sort((a, b) => (new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()))

  // Cache the results
  metadataCache = posts
  return posts
}

// Get posts by category
export async function getPostsByCategory(category: string): Promise<PostMetadata[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter(post =>
    post.category.toLowerCase() === category.toLowerCase()
  )
}

// Get featured posts
export async function getFeaturedPosts(limit: number = 3): Promise<PostMetadata[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter(post => post.featured).slice(0, limit)
}

// Get related posts based on category and tags
export async function getRelatedPosts(
  currentSlug: string,
  category: string,
  tags: string[],
  limit: number = 3
): Promise<PostMetadata[]> {
  const allPosts = await getAllPosts()

  const scoredPosts = allPosts
    .filter(post => post.slug !== currentSlug)
    .map(post => {
      let score = 0
      // Same category gets high score
      if (post.category === category) score += 10
      // Each matching tag gets points
      const matchingTags = post.tags.filter(tag => tags.includes(tag))
      score += matchingTags.length * 3
      // Recent posts get slight boost
      const daysDiff = Math.abs(
        new Date(post.publishDate).getTime() - Date.now()
      ) / (1000 * 60 * 60 * 24)
      if (daysDiff < 30) score += 2
      if (daysDiff < 90) score += 1

      return { post, score }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)

  return scoredPosts.map(item => item.post)
}

// Search posts
export async function searchPosts(query: string): Promise<PostMetadata[]> {
  const allPosts = await getAllPosts()
  const lowerQuery = query.toLowerCase()

  return allPosts.filter(post =>
    post.title.toLowerCase().includes(lowerQuery) ||
    post.excerpt.toLowerCase().includes(lowerQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    post.category.toLowerCase().includes(lowerQuery)
  )
}

// Get all categories
export async function getAllCategories(): Promise<string[]> {
  const allPosts = await getAllPosts()
  const categories = allPosts
    .map(post => post.category)
    .filter(category => category && category.trim() !== '') // Filter out empty/whitespace categories
  return Array.from(new Set(categories)).sort() // Sort alphabetically
}

// Generate table of contents from HTML content
export function generateTableOfContents(content: string): { id: string; text: string; level: number }[] {
  const headingRegex = /<h([2-3])[^>]*>(.*?)<\/h\1>/g
  const toc: { id: string; text: string; level: number }[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = parseInt(match[1])
    const text = match[2].replace(/<[^>]*>/g, '') // Strip HTML tags
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    toc.push({ id, text, level })
  }

  return toc
}
