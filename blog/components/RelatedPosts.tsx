import Link from 'next/link'
import GlassCard from './GlassCard'
import { PostMetadata } from '@/lib/posts'

interface RelatedPostsProps {
  posts: PostMetadata[]
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <section className="mt-16">
      <h2 className="font-playfair text-3xl text-white mb-8 text-center">
        Related Articles
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post) => {
          const formattedDate = new Date(post.publishDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })

          return (
            <Link key={post.slug} href={`/${post.slug}`} className="block">
              <GlassCard variant="hover" className="h-full flex flex-col">
                <div className="mb-3">
                  <span className="inline-block bg-accent-gold/20 text-accent-gold px-3 py-1 rounded-full text-xs font-semibold border border-accent-gold/30">
                    {post.category}
                  </span>
                </div>
                <h3 className="font-playfair text-xl text-white mb-3 leading-tight flex-1">
                  {post.title}
                </h3>
                <div className="flex items-center justify-between text-sm text-white/60 pt-3 border-t border-white/10">
                  <span>{formattedDate}</span>
                  <span>{post.readingTime} min</span>
                </div>
              </GlassCard>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
