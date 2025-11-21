# Law Firm Blog - Law Offices of Rozsa Gyene

A professional Next.js 14 blog system built for estate planning and trust law content, featuring glassmorphism design, SEO optimization, and full responsiveness.

## Features

### Design
- **Glassmorphism Cards**: Beautiful glass-effect cards matching the main website design
- **Color Scheme**: Navy blue (#1e3a5f) and gold (#c9a961) matching main site
- **Typography**: Playfair Display (headings) and Inter (body) fonts
- **Responsive**: Mobile-first design, fully responsive on all devices
- **Dark Gradient Backgrounds**: Consistent with main site aesthetic

### Functionality
- **Search**: Client-side search across titles, excerpts, and tags
- **Category Filtering**: Filter posts by Estate Planning, Probate, Conservatorship, Trust Litigation
- **Pagination**: 9 posts per page with elegant pagination controls
- **Featured Posts**: Highlight important articles
- **Related Posts**: Algorithm-based related content suggestions
- **Reading Time**: Automatic calculation based on word count
- **Social Sharing**: Share to LinkedIn, Twitter, Email, and Print
- **Newsletter Signup**: Styled form matching main site questionnaires
- **Table of Contents**: Auto-generated from H2/H3 headings
- **Author Bio**: Attorney Rozsa Gyene biography on every post

### SEO & Performance
- **Static Site Generation**: Fast loading with pre-rendered pages
- **Meta Tags**: Dynamic meta tags for each post
- **JSON-LD Schema**: Article, Attorney, and LocalBusiness structured data
- **OpenGraph Tags**: Rich social media previews
- **Sitemap**: Auto-generated XML sitemap
- **RSS Feed**: Auto-generated RSS feed
- **Image Optimization**: Next.js image optimization
- **Accessibility**: WCAG 2.1 AA compliant
- **Print Styles**: Print-friendly CSS

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- MDX for blog content
- gray-matter for frontmatter parsing
- remark for markdown processing

## Getting Started

### Development

```bash
cd blog
npm install
npm run dev
```

Visit http://localhost:3001/blog

### Building for Production

```bash
npm run build
npm run export
```

The static site will be generated in the `out` directory.

## Project Structure

```
blog/
├── app/
│   ├── layout.tsx           # Root layout with header/footer
│   ├── page.tsx             # Blog listing page
│   ├── [slug]/
│   │   └── page.tsx         # Individual blog post pages
│   └── category/
│       └── [category]/
│           └── page.tsx     # Category archive pages
├── components/
│   ├── AuthorBio.tsx        # Author bio component
│   ├── BlogCard.tsx         # Blog post card with glassmorphism
│   ├── CategoryFilter.tsx   # Category filtering
│   ├── CTABox.tsx           # Consultation CTA sidebar
│   ├── GlassCard.tsx        # Reusable glassmorphism card
│   ├── NewsletterSignup.tsx # Newsletter form
│   ├── Pagination.tsx       # Pagination controls
│   ├── RelatedPosts.tsx     # Related articles
│   ├── SearchBar.tsx        # Search functionality
│   ├── SocialShare.tsx      # Social sharing buttons
│   └── TableOfContents.tsx  # Auto-generated TOC
├── content/
│   └── posts/               # Blog posts in Markdown
│       ├── living-trust-vs-will-california.md
│       ├── avoid-probate-california.md
│       ├── conservatorship-california-guide.md
│       ├── trust-litigation-warning-signs.md
│       └── estate-planning-mistakes.md
├── lib/
│   └── posts.ts             # MDX parsing and utilities
├── styles/
│   └── globals.css          # Global styles and glassmorphism
├── tailwind.config.ts       # TailwindCSS config
├── next.config.js           # Next.js config
└── package.json
```

## Adding New Blog Posts

Create a new `.md` file in `content/posts/` with the following frontmatter:

```markdown
---
title: "Your Post Title"
slug: "url-friendly-slug"
publishDate: "2024-01-15"
updatedDate: "2024-01-20"  # Optional
category: "Estate Planning"  # or Probate, Conservatorship, Trust Litigation
tags: ["living trust", "estate planning", "California law"]
excerpt: "A compelling excerpt for SEO and previews (150-160 characters)"
featured: false  # Set to true for featured post
coverImage: "/images/blog/your-image.jpg"  # Optional
---

## Your Content Here

Write your content in Markdown...
```

### Frontmatter Fields

- **title**: Post title (required)
- **slug**: URL-friendly identifier (required)
- **publishDate**: Publication date in YYYY-MM-DD format (required)
- **updatedDate**: Last update date (optional)
- **category**: One of: Estate Planning, Probate, Conservatorship, Trust Litigation (required)
- **tags**: Array of relevant tags (required)
- **excerpt**: Meta description and preview text (required)
- **featured**: Boolean, true to feature on homepage (optional, default false)
- **coverImage**: Path to cover image (optional)

## Customization

### Colors

Edit `tailwind.config.ts` to change the color scheme:

```typescript
colors: {
  'primary-blue': '#1e3a5f',
  'accent-gold': '#c9a961',
  'text-dark': '#2c3e50',
  'text-light': '#4a4a4a',
}
```

### Fonts

Edit `app/layout.tsx` to change fonts:

```typescript
const inter = Inter({ subsets: ['latin'] })
const playfair = Playfair_Display({ subsets: ['latin'] })
```

### Pagination

Edit `app/page.tsx` to change posts per page:

```typescript
const POSTS_PER_PAGE = 9  // Change this number
```

## Deployment

### Option 1: Export as Static Site

```bash
npm run export
```

Copy the `out` directory contents to your web server at `/blog/`.

### Option 2: Deploy to Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run export`
3. Set publish directory: `out`
4. Deploy

### Option 3: Deploy to Vercel

```bash
vercel deploy
```

## Integration with Main Site

The blog is designed to be accessed at `https://yoursite.com/blog/`. Update the main site navigation to link to the blog:

```html
<a href="/blog">Blog</a>
```

## Newsletter Integration

The newsletter form in `components/NewsletterSignup.tsx` is a placeholder. To connect to your email service:

1. Sign up for Mailchimp, ConvertKit, or similar
2. Get your API key and list ID
3. Update the `handleSubmit` function to call your email service API

Example with Mailchimp:

```typescript
const response = await fetch('/api/subscribe', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, name }),
})
```

## Sample Content

The blog includes 5 sample posts:

1. **Living Trust vs. Will in California** (Featured)
2. **How to Avoid Probate in California: 5 Proven Strategies**
3. **California Conservatorship: A Complete Guide for Families**
4. **10 Warning Signs Your Trustee May Be Stealing from the Trust**
5. **7 Estate Planning Mistakes That Could Cost Your Family Thousands**

Feel free to edit or replace these with your own content.

## Support

For questions or issues, contact the development team or refer to the Next.js documentation:
- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

## License

© 2024 Law Offices of Rozsa Gyene. All rights reserved.
