import {  Vegan } from 'lucide-react';

export function MenuItem({ item, onClick ,currencySymbol}) {
  const baseUrl = process.env.REACT_APP_API_URL;
  const hasImage = item.imagesPath && item.imagesPath.length > 0;
  const imageUrl = hasImage ? `${baseUrl.replace("/api", "")}/${item.imagesPath[0]}` : null;

  return (
    <div 
      className="group flex flex-col h-full cursor-pointer hover:scale-[1.02] transition-transform duration-300"
      onClick={() => onClick(item)}
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 mb-3 border border-stone-200">
        
        {hasImage ? (
          <img
            src={imageUrl}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-stone-100 to-stone-200 text-stone-400">
            <div className="w-12 h-12 mb-2 rounded-full bg-stone-300/50 flex items-center justify-center">
              <span className="text-2xl ">🍽️</span>
            </div>
            <span className="text-xs font-medium uppercase tracking-wider">No Image</span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {item.isVegan && (
            <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center shadow-md">
              <Vegan className="w-4 h-4 text-white" />
            </div>
          )}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 px-1">
        <div className="flex justify-between items-start gap-2 mb-1">
          <h3 className="font-bold text-stone-900 leading-tight text-sm md:text-base ">
            {item.name}
          </h3>
          <span className="font-bold text-amber-600 text-sm flex-shrink-0">
            {item.price?.toFixed(2)} {currencySymbol}
          </span>
        </div>


        <div className="mt-auto pt-1 flex items-center justify-between">
          <span className="text-xs text-stone-400 font-medium">
            #{item.numberOnMenu}
          </span>
          <span className="text-[10px] text-amber-500 font-medium uppercase">
            View Details →
          </span>
        </div>
      </div>
    </div>
  );
}