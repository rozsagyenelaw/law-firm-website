'use client'

import { useState, useEffect } from 'react'
import BlogCard from '@/components/BlogCard'
import SearchBar from '@/components/SearchBar'
import CategoryFilter from '@/components/CategoryFilter'
import Pagination from '@/components/Pagination'
import GlassCard from '@/components/GlassCard'
import NewsletterSignup from '@/components/NewsletterSignup'
import { PostMetadata } from '@/lib/posts'

const POSTS_PER_PAGE = 9

interface BlogListingClientProps {
  initialPosts: PostMetadata[]
  initialCategories: string[]
  featuredPost: PostMetadata | null
}

export default function BlogListingClient({
  initialPosts,
  initialCategories,
  featuredPost
}: BlogListingClientProps) {
  const [filteredPosts, setFilteredPosts] = useState<PostMetadata[]>(initialPosts)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  // Filter posts when category or search changes
  useEffect(() => {
    let filtered = [...initialPosts]

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(post => post.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    setFilteredPosts(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [selectedCategory, searchQuery, initialPosts])

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const currentPosts = filteredPosts.slice(startIndex, endIndex)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-transparent to-primary-blue/20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="font-playfair text-5xl md:text-6xl text-white mb-6 text-shadow-lg">
              Estate Planning Insights
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto text-shadow-sm">
              Expert legal guidance on trusts, probate, conservatorship, and asset protection
              from Attorney Rozsa Gyene
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <SearchBar onSearch={setSearchQuery} />
          </div>

          {/* Category Filter */}
          {initialCategories.length > 0 && (
            <div className="mb-12">
              <CategoryFilter
                categories={initialCategories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Featured Post */}
          {featuredPost && !selectedCategory && !searchQuery && (
            <div className="mb-16 fade-in">
              <h2 className="font-playfair text-3xl text-white mb-8 text-center">
                Featured Article
              </h2>
              <BlogCard post={featuredPost} featured />
            </div>
          )}

          {/* Results Summary */}
          {(selectedCategory || searchQuery) && (
            <GlassCard padding="sm" className="mb-8">
              <p className="text-white text-center">
                {filteredPosts.length > 0 ? (
                  <>
                    Found <span className="font-bold text-accent-gold">{filteredPosts.length}</span>{' '}
                    {filteredPosts.length === 1 ? 'article' : 'articles'}
                    {selectedCategory && <> in <span className="font-bold">{selectedCategory}</span></>}
                    {searchQuery && <> matching <span className="font-bold">&quot;{searchQuery}&quot;</span></>}
                  </>
                ) : (
                  <>No articles found. Try adjusting your filters.</>
                )}
              </p>
            </GlassCard>
          )}

          {/* Blog Grid */}
          {currentPosts.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {currentPosts.map((post, index) => (
                  <div
                    key={post.slug}
                    className="fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <BlogCard post={post} />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          ) : initialPosts.length === 0 ? (
            <GlassCard className="text-center py-20">
              <div className="text-6xl mb-6">📝</div>
              <h2 className="font-playfair text-3xl text-white mb-4">
                Blog Coming Soon
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                We're preparing insightful articles on estate planning, trusts, probate,
                and more. Check back soon!
              </p>
              <a href="/" className="btn-primary">
                Return to Home
              </a>
            </GlassCard>
          ) : null}

          {/* Newsletter Signup */}
          {initialPosts.length > 0 && (
            <div className="mt-20 max-w-xl mx-auto">
              <NewsletterSignup />
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-t from-transparent to-primary-blue/20">
        <div className="container-custom">
          <GlassCard className="text-center max-w-3xl mx-auto">
            <h2 className="font-playfair text-4xl text-white mb-6">
              Need Legal Assistance?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Schedule a free consultation to discuss your estate planning needs with Attorney Rozsa Gyene.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="tel:8182916217" className="btn-primary">
                📞 Call (818) 291-6217
              </a>
              <a href="/estate-planning-questionnaire.html" className="btn-secondary">
                Start Online Questionnaire
              </a>
            </div>
            <p className="text-white/70 mt-6 text-sm">
              Over 25 years serving Los Angeles County families
            </p>
          </GlassCard>
        </div>
      </section>
    </div>
  )
}
