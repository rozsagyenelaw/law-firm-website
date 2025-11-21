'use client'

import GlassCard from './GlassCard'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const showPages = 5 // Number of page buttons to show

    if (totalPages <= showPages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      // Calculate start and end of middle section
      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPages - 1, currentPage + 1)

      // Adjust if at beginning or end
      if (currentPage <= 3) {
        end = 4
      }
      if (currentPage >= totalPages - 2) {
        start = totalPages - 3
      }

      // Add ellipsis if needed
      if (start > 2) {
        pages.push('...')
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pages.push('...')
      }

      // Always show last page
      pages.push(totalPages)
    }

    return pages
  }

  return (
    <GlassCard padding="sm" className="flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`
          px-4 py-2 rounded-lg font-medium transition-all
          ${currentPage === 1
            ? 'text-white/30 cursor-not-allowed'
            : 'text-white hover:bg-white/10'
          }
        `}
        aria-label="Previous page"
      >
        ← Previous
      </button>

      <div className="flex items-center gap-2">
        {getPageNumbers().map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-3 text-white/50">
                ...
              </span>
            )
          }

          const pageNum = page as number
          const isActive = pageNum === currentPage

          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`
                w-10 h-10 rounded-lg font-medium transition-all
                ${isActive
                  ? 'bg-accent-gold text-white shadow-lg scale-110'
                  : 'text-white hover:bg-white/10'
                }
              `}
              aria-label={`Go to page ${pageNum}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {pageNum}
            </button>
          )
        })}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`
          px-4 py-2 rounded-lg font-medium transition-all
          ${currentPage === totalPages
            ? 'text-white/30 cursor-not-allowed'
            : 'text-white hover:bg-white/10'
          }
        `}
        aria-label="Next page"
      >
        Next →
      </button>
    </GlassCard>
  )
}
