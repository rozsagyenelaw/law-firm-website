'use client'

import { useState, useEffect } from 'react'
import GlassCard from './GlassCard'

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [toc, setToc] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // Parse headings from HTML content
    const parser = new DOMParser()
    const doc = parser.parseFromString(content, 'text/html')
    const headings = doc.querySelectorAll('h2, h3')

    const tocItems: TocItem[] = Array.from(headings).map((heading, index) => {
      const text = heading.textContent || ''
      const level = parseInt(heading.tagName[1])
      const id = `heading-${index}`
      heading.id = id
      return { id, text, level }
    })

    setToc(tocItems)

    // Intersection Observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-100px 0px -80% 0px' }
    )

    headings.forEach((heading) => observer.observe(heading))

    return () => {
      headings.forEach((heading) => observer.unobserve(heading))
    }
  }, [content])

  if (toc.length === 0) return null

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      })
    }
  }

  return (
    <GlassCard padding="md" className="sticky top-24">
      <h3 className="font-playfair text-xl text-white mb-4 font-bold">
        Table of Contents
      </h3>
      <nav aria-label="Table of contents">
        <ul className="space-y-2">
          {toc.map((item) => (
            <li key={item.id} className={item.level === 3 ? 'ml-4' : ''}>
              <button
                onClick={() => scrollToHeading(item.id)}
                className={`
                  text-left w-full py-2 px-3 rounded-lg transition-all text-sm
                  ${activeId === item.id
                    ? 'bg-accent-gold/20 text-accent-gold font-semibold border-l-2 border-accent-gold'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </GlassCard>
  )
}
