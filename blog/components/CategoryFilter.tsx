'use client'

import GlassCard from './GlassCard'

interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string | null
  onSelectCategory: (category: string | null) => void
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  const allCategories = ['All', ...categories]

  return (
    <GlassCard padding="sm">
      <div className="flex flex-wrap gap-3">
        {allCategories.map((category) => {
          const isSelected = category === 'All' ? !selectedCategory : selectedCategory === category

          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category === 'All' ? null : category)}
              className={`
                px-6 py-2 rounded-full font-medium transition-all duration-300
                ${isSelected
                  ? 'bg-accent-gold text-white shadow-lg scale-105'
                  : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                }
              `}
              aria-label={`Filter by ${category}`}
              aria-pressed={isSelected}
            >
              {category}
            </button>
          )
        })}
      </div>
    </GlassCard>
  )
}
