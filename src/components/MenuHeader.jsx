import {  MapPin, Search } from 'lucide-react'
import { restaurantInfo } from '../data/menuData'


export function MenuHeader({
  info,
  searchQuery = null,
  onSearchChange,
}) {
  return (
    <header className="bg-white border-b border-stone-100">
      <div className="px-4 pt-4 pb-2">
        {/* Logo and Name - Primary Focus */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border border-stone-200 shadow-sm flex-shrink-0 bg-white">
            <img
              src={restaurantInfo.logo}
              alt={restaurantInfo.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-stone-900 tracking-tight mb-1">
              {info?.unitName}
            </h1>
            <div className="flex items-center gap-1 text-sm">
              <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-stone-400" />
            <span className="truncate">{info?.address}</span>
          </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-base text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all"
            />
          </div>
        </div>



        
      </div>
    </header>
  )
}
