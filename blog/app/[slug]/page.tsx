import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import GlassCard from '@/components/GlassCard'
import AuthorBio from '@/components/AuthorBio'
import RelatedPosts from '@/components/RelatedPosts'
import SocialShare from '@/components/SocialShare'
import CTABox from '@/components/CTABox'
import { getPostBySlug, getAllPostSlugs, getRelatedPosts } from '@/lib/posts'

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const description = post.metaDescription || post.excerpt

  return {
    title: post.title,
    description: description,
    keywords: [...post.tags, post.category, 'estate planning', 'Rozsa Gyene', 'Glendale attorney'],
    authors: [{ name: post.author.name }],
    alternates: {
      canonical: `https://livingtrust-attorneys.com/blog/${params.slug}`,
    },
    openGraph: {
      title: post.title,
      description: description,
      type: 'article',
      publishedTime: post.publishDate,
      modifiedTime: post.updatedDate,
      authors: [post.author.name],
      tags: post.tags,
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(post.slug, post.category, post.tags, 3)

  const formattedDate = new Date(post.publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const updatedDate = post.updatedDate
    ? new Date(post.updatedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-primary-blue/20 py-4 no-print">
        <div className="container-custom">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-white/70">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span>/</span>
            <a href="/blog" className="hover:text-white transition-colors">Blog</a>
            <span>/</span>
            <span className="text-white">{post.category}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-transparent to-primary-blue/20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <span className="inline-block bg-accent-gold text-white px-4 py-2 rounded-full text-sm font-semibold">
                {post.category}
              </span>
            </div>
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white mb-6 text-shadow-lg leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-6 text-white/80 mb-8">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                {post.author.name}
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                {formattedDate}
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                {post.readingTime} min read
              </span>
            </div>
            {updatedDate && (
              <p className="text-white/60 text-sm">
                Last updated: {updatedDate}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1fr_300px] gap-8 mb-12">
            {/* Article Content */}
            <div>
              <GlassCard className="mb-8">
                <div
                  className="prose-blog"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </GlassCard>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="mb-8">
                  <GlassCard padding="sm">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-white/70 font-semibold">Tags:</span>
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-white/10 text-white px-3 py-1 rounded-full text-sm border border-white/20"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                </div>
              )}

              {/* Social Share */}
              <div className="mb-8">
                <SocialShare title={post.title} slug={post.slug} />
              </div>

              {/* Author Bio */}
              <AuthorBio />
            </div>

            {/* Sidebar */}
            <aside className="no-print">
              <CTABox />
            </aside>
          </div>

          {/* Related Posts */}
          <RelatedPosts posts={relatedPosts} />
        </div>
      </section>

      {/* JSON-LD Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.metaDescription || post.excerpt,
            image: `https://livingtrust-attorneys.com${post.coverImage.replace('/blog', '')}`,
            articleSection: post.category,
            keywords: post.tags.join(', '),
            wordCount: post.content.replace(/<[^>]*>/g, '').split(/\s+/).length,
            author: {
              '@type': 'Person',
              name: 'Rozsa Gyene',
              jobTitle: 'Estate Planning Attorney',
              credentials: 'California State Bar #208356',
              url: 'https://livingtrust-attorneys.com/about.html',
            },
            publisher: {
              '@type': 'LegalService',
              name: 'Law Offices of Rozsa Gyene',
              url: 'https://livingtrust-attorneys.com',
              telephone: '818-291-6217',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '450 N Brand Blvd, Suite 600',
                addressLocality: 'Glendale',
                addressRegion: 'CA',
                postalCode: '91203',
              },
            },
            datePublished: post.publishDate || '2025-01-01',
            dateModified: '2025-12-24',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://livingtrust-attorneys.com/blog/${post.slug}`,
            },
            inLanguage: 'en-US',
            isAccessibleForFree: true,
          }),
        }}
      />

      {/* JSON-LD FAQPage Schema (if post has FAQs) */}
      {post.faqs && post.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: post.faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer,
                },
              })),
            }),
          }}
        />
      )}

      {/* Hardcoded FAQ Schema for California Probate Guide */}
      {post.slug === 'california-probate-complete-guide-2025' && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'How much does probate cost in California in 2025?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'In 2025, California probate costs are statutory, meaning they are set by Probate Code §10800. For both the attorney and executor, the fee is 4% of the first $100k, 3% of the next $100k, and 2% of the next $800k. A typical $1,000,000 estate will pay $46,000 in combined statutory fees plus court costs.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What is the new California probate limit for 2025?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'As of April 1, 2025, the threshold for a Small Estate Affidavit is $208,850. Additionally, Assembly Bill 2016 (AB 2016) allows primary residences valued up to $750,000 to be transferred using a simplified court procedure for deaths occurring on or after April 1, 2025.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How long does probate take in Los Angeles County?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Due to court backlogs at the Stanley Mosk Courthouse, probate in Los Angeles County typically takes 12-18 months. Using the Independent Administration of Estates Act (IAEA) can help expedite the process.',
                  },
                },
              ],
            }),
          }}
        />
      )}
    </div>
  )
}
