import { Metadata } from 'next'
import { getAllPosts, getFeaturedPosts, getAllCategories } from '@/lib/posts'
import BlogListingClient from './BlogListingClient'

export const metadata: Metadata = {
  title: 'Estate Planning & Trust Law Blog | Law Offices of Rozsa Gyene',
  description: 'Expert insights on estate planning, living trusts, probate, conservatorship, and trust litigation from experienced Glendale attorney Rozsa Gyene.',
  alternates: {
    canonical: 'https://livingtrust-attorneys.com/blog',
  },
}

export default async function BlogListingPage() {
  const allPosts = await getAllPosts()
  const featuredPosts = await getFeaturedPosts(1)
  const categories = await getAllCategories()

  return (
    <BlogListingClient
      initialPosts={allPosts}
      initialCategories={categories}
      featuredPost={featuredPosts[0] || null}
    />
  )
}
