import Link from 'next/link'
import Image from 'next/image'
import GlassCard from './GlassCard'
import { PostMetadata } from '@/lib/posts'

interface BlogCardProps {
  post: PostMetadata
  featured?: boolean
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const formattedDate = new Date(post.publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  if (featured) {
    return (
      <Link href={`/${post.slug}`} className="block">
        <GlassCard variant="hover" className="overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-80 w-full rounded-lg overflow-hidden bg-gradient-to-br from-primary-blue to-accent-gold">
              {post.coverImage ? (
                <>
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl text-white/30">📋</span>
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="inline-block bg-accent-gold text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Featured
                </span>
                <span className="text-white/80 text-sm">{post.category}</span>
              </div>
              <h2 className="font-playfair text-4xl text-white mb-4 leading-tight">
                {post.title}
              </h2>
              <p className="text-white/90 text-lg mb-6 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-6 text-sm text-white/70">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  {formattedDate}
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  {post.readingTime} min read
                </span>
              </div>
              <div className="mt-6">
                <span className="text-accent-gold font-semibold group-hover:underline">
                  Read More →
                </span>
              </div>
            </div>
          </div>
        </GlassCard>
      </Link>
    )
  }

  return (
    <Link href={`/${post.slug}`} className="block h-full">
      <GlassCard variant="hover" className="h-full flex flex-col">
        <div className="relative h-48 w-full rounded-lg overflow-hidden mb-6 bg-gradient-to-br from-primary-blue to-accent-gold">
          {post.coverImage ? (
            <>
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover opacity-60 mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl text-white/30">
                {post.category === 'Estate Planning' && '📋'}
                {post.category === 'Trust Litigation' && '⚖️'}
                {post.category === 'Probate' && '📜'}
                {post.category === 'Conservatorship' && '🛡️'}
                {post.category === 'Fire Litigation' && '🔥'}
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col">
          <div className="mb-3">
            <span className="inline-block bg-accent-gold/20 text-accent-gold px-3 py-1 rounded-full text-xs font-semibold border border-accent-gold/30">
              {post.category}
            </span>
          </div>

          <h3 className="font-playfair text-2xl text-white mb-3 leading-tight">
            {post.title}
          </h3>

          <p className="text-white/80 mb-4 flex-1 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between text-sm text-white/60 pt-4 border-t border-white/10">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              {formattedDate}
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              {post.readingTime} min
            </span>
          </div>
        </div>
      </GlassCard>
    </Link>
  )
}
