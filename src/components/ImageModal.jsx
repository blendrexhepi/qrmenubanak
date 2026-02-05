import React, { useEffect, useState } from 'react';
import { 
  X, 
  Thermometer, 
  Clock, 
  Vegan, 
  Star, 
  Zap, 
  Leaf, 
  Wheat, 
  Milk,
  ChevronUp,
  Maximize2
} from 'lucide-react';

export function ImageModal({ isOpen, onClose, item, currencySymbol }) {

  const [imageLoaded, setImageLoaded] = useState(false);
  const [showImageFullscreen, setShowImageFullscreen] = useState(false);

  // Close modal on ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (showImageFullscreen) {
          setShowImageFullscreen(false);
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
      setImageLoaded(false);
      setShowImageFullscreen(false);
    };
  }, [isOpen, onClose, showImageFullscreen]);

  if (!isOpen || !item) return null;

  const baseUrl = process.env.REACT_APP_API_URL;
  const hasImage = item.imagesPath && item.imagesPath.length > 0;
  const imageUrl = hasImage ? `${baseUrl.replace("/api", "")}/${item.imagesPath[0]}` : null;

  // Fullscreen image view - Light Mode
  if (showImageFullscreen && hasImage) {
    return (
      <div className="fixed inset-0 z-[200] bg-white/95 backdrop-blur-xl">
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={imageUrl}
            alt={item.name}
            className="w-full h-full object-contain"
            onLoad={() => setImageLoaded(true)}
          />
          {/* Overlay controls */}
          <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-white/80 via-white/50 to-transparent backdrop-blur-sm">
            <div className="flex justify-between items-center">
              <button
                onClick={() => setShowImageFullscreen(false)}
                className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-lg text-gray-800 hover:bg-white transition-colors border border-gray-200 shadow-sm"
              >
                <ChevronUp className="w-5 h-5 rotate-90" />
                <span>Back to details</span>
              </button>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-white hover:text-gray-900 shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          {/* Bottom info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white/80 via-white/50 to-transparent backdrop-blur-sm">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">{item.name}</h2>
              <div className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-lg shadow-md">
                {item.price?.toFixed(2)} {currencySymbol}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Blurred Backdrop */}
          <div className="absolute top-0 right-0 z-30 p-4">
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-gray-600 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-white transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
      <div 
        className="absolute inset-0 bg-white/80 backdrop-blur-xl transition-all duration-300 animate-fadeIn"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div  className="relative h-screen w-screen flex items-center justify-center p-0 md:p-4 lg:p-6">
        {/* Content Card */}
        <div className="relative w-full h-full md:w-full md:max-w-6xl md:h-auto md:max-h-[90vh] overflow-hidden rounded-none md:rounded-2xl bg-white/95 backdrop-blur-xl shadow-2xl border border-white/20 flex flex-col">
          
          {/* Header with close button ONLY on right side */}

          {/* Main Content - Scrollable */}
          <div className="flex-1 overflow-y-auto flex flex-col lg:flex-row h-full">
            
            {/* Image Section */}
            <div className="relative lg:w-1/2 border-b  bg-gray-50/50 backdrop-blur-sm min-h-[50vh] lg:min-h-0">
              {hasImage ? (
                <div className="relative w-full h-full overflow-hidden group">
                  {/* Loading skeleton */}
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100/50 to-gray-200/50 animate-pulse backdrop-blur-sm" />
                  )}
                  
                  {/* Main Image */}
                  <img
                    src={imageUrl}
                    alt={item.name}
                    className={`w-full h-full object-cover transition-all duration-500 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                    loading="eager"
                    onLoad={() => setImageLoaded(true)}
                  />
                  
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {item.isVegan && (
                      <div className="flex items-center gap-2 px-3 py-2 bg-emerald-100/90 backdrop-blur-md border border-emerald-200 rounded-lg shadow-sm">
                        <Vegan className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs font-bold text-emerald-700">Vegan</span>
                      </div>
                    )}
                    
                    {item.isSpicy && (
                      <div className="flex items-center gap-2 px-3 py-2 bg-red-100/90 backdrop-blur-md border border-red-200 rounded-lg shadow-sm">
                        <Thermometer className="w-4 h-4 text-red-600" />
                        <span className="text-xs font-bold text-red-700">Spicy</span>
                      </div>
                    )}
                    
                    {item.isPopular && (
                      <div className="flex items-center gap-2 px-3 py-2 bg-amber-100/90 backdrop-blur-md border border-amber-200 rounded-lg shadow-sm">
                        <Star className="w-4 h-4 text-amber-600" />
                        <span className="text-xs font-bold text-amber-700">Popular</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50/50 to-gray-100/50 backdrop-blur-sm p-6">
                  <div className="relative mb-6">
                    <div className="w-32 h-32 rounded-full bg-white/90 backdrop-blur-md border border-gray-200 flex items-center justify-center shadow-sm">
                      <span className="text-6xl">🍽️</span>
                    </div>
                  </div>
                  <p className="text-xl font-medium text-gray-600 mb-2">No Image Available</p>
                </div>
              )}
            </div>

            {/* Details Section */}
            <div className="lg:w-1/2 p-3 md:p-6 lg:p-8 overflow-y-auto flex flex-col bg-white/95 backdrop-blur-xl">
              {/* Item Name and Price */}
           {/* Item Name and Price - Minimalist Design */}
<div className="mb-8">
  <div className="flex items-center  justify-between">

    <div className="flex-1 pr-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-1.5 h-8 bg-gradient-to-b from-amber-400 to-orange-400 rounded-full"></div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
          {item.name}
        </h2>
      </div>
      
      {/* Optional subtitle or description snippet */}
      {item.shortDescription && (
        <p className="text-gray-600 text-sm font-medium mt-2 ml-4">
          {item.shortDescription}
        </p>
      )}
    </div>
    
    <div className="flex-shrink-0">
      <div className="relative">
        <div className="px-3 py-1.5 bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-200 shadow-sm">
        
            <div className="flex items-baseline">
              <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">{item.price?.toFixed(2)}</span>
              <span className="text-2xl md:text-3xl lg:text-4xl font-semibold text-amber-600 ml-1">{currencySymbol}</span>
            </div>
        </div>
      </div>
    </div>
  </div>
</div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">
                  Description
                </h3>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg bg-gray-50/50 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50">
                  {item.description || "No description available for this item."}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {/* Calories */}
                <div className="bg-gray-50/50 backdrop-blur-sm rounded-xl p-5 border border-gray-200/50 hover:border-amber-300 transition-all duration-300 hover:shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-amber-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Calories</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
              
                    <span className="text-sm font-normal text-gray-500 ml-2">No Info</span>
                  </p>
                </div>

                {/* Prep Time */}
                <div className="bg-gray-50/50 backdrop-blur-sm rounded-xl p-5 border border-gray-200/50 hover:border-blue-300 transition-all duration-300 hover:shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Prep Time</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    <span className="text-sm font-normal text-gray-500 ml-2">No Info</span>
                  </p>
                </div>
              </div>

              {/* Allergens */}
              {item.allergens && item.allergens.trim() && (
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                      <span className="text-red-600">⚠️</span>
                    </div>
                    Allergens
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {item.allergens.split(',').map((allergen, idx) => (
                      <span 
                        key={idx} 
                        className="px-3 py-2 bg-red-50/80 backdrop-blur-sm text-red-700 rounded-lg text-sm font-medium border border-red-200"
                      >
                        {allergen.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Dietary Info */}
              <div className="mb-8 pt-6 border-t border-gray-200/50">
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Leaf className="w-4 h-4 text-emerald-600" />
                  </div>
                  Dietary Information
                </h3>
                <div className="flex flex-wrap gap-3">
                  {item.isGlutenFree && (
                    <span className="px-4 py-2 bg-emerald-50/80 backdrop-blur-sm text-emerald-700 rounded-lg text-sm font-medium border border-emerald-200 flex items-center gap-2">
                      <Wheat className="w-4 h-4" />
                      Gluten Free
                    </span>
                  )}
                  {item.isVegetarian && (
                    <span className="px-4 py-2 bg-emerald-50/80 backdrop-blur-sm text-emerald-700 rounded-lg text-sm font-medium border border-emerald-200 flex items-center gap-2">
                      <Leaf className="w-4 h-4" />
                      Vegetarian
                    </span>
                  )}
                  {item.containsDairy === false && (
                    <span className="px-4 py-2 bg-emerald-50/80 backdrop-blur-sm text-emerald-700 rounded-lg text-sm font-medium border border-emerald-200 flex items-center gap-2">
                      <Milk className="w-4 h-4" />
                      Dairy Free
                    </span>
                  )}
                  {item.containsNuts && (
                    <span className="px-4 py-2 bg-amber-50/80 backdrop-blur-sm text-amber-700 rounded-lg text-sm font-medium border border-amber-200">
                      🌰 Contains Nuts
                    </span>
                  )}
                </div>
              </div>

              {/* Footer note */}
              <div className="mt-auto pt-6 border-t border-gray-200/50 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
                <div className="bg-gray-50/50 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50">
                  <p className="text-xs text-gray-600 text-center">
                    All items are prepared in a kitchen that handles various allergens. 
                    Please inform our staff of any allergies or dietary restrictions before ordering.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}