import React, { useEffect, useRef } from 'react'
import { Category } from '../data/menuData'

export function CategoryNav({
  categories,
  activeCategory,
  onSelectCategory,
}) {
  const scrollRef = useRef(null)
  // Auto-scroll the nav to keep active item in view
  useEffect(() => {
    if (scrollRef.current) {
      const activeElement = document.getElementById(
        `nav-item-${activeCategory}`,
      )
      if (activeElement) {
        const container = scrollRef.current
        const scrollLeft =
          activeElement.offsetLeft -
          container.offsetWidth / 2 +
          activeElement.offsetWidth / 2
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth',
        })
      }
    }
  }, [activeCategory])
  return (
    <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-stone-100 shadow-sm">
      
      <div
        ref={scrollRef}
        className="flex overflow-x-auto py-3 px-4 gap-3 no-scrollbar snap-x snap-mandatory"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {categories.map((category) => (
          <button
            key={category.id}
            id={`nav-item-${category.id}`}
            onClick={() => onSelectCategory(category.id)}
            className={`
              flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 snap-center
              ${activeCategory === category.id ? 'bg-stone-900 text-white shadow-md transform scale-105' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}
            `}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  )
}
