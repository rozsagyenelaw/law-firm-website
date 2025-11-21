import { getAllPosts, getFeaturedPosts, getAllCategories } from '@/lib/posts'
import BlogListingClient from './BlogListingClient'

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
