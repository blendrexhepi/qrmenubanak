export const MenuLoading = () => {
  return (
    <div className="min-h-screen bg-white p-4  mx-auto">
      {/* Creative Animated Icon */}
      <div className="flex flex-col items-center justify-center py-12">
        <div className="relative">
          <div className="text-4xl animate-bounce">🍳</div>
          <div className="absolute -right-4 top-0 text-2xl animate-pulse">✨</div>
        </div>
        <h2 className="mt-4 font-bold text-stone-800 tracking-tight">Preparing the Menu...</h2>
        <p className="text-stone-400 text-sm">Gathering fresh ingredients</p>
      </div>

      {/* Skeleton Categories */}
      <div className="flex gap-4 mb-8 overflow-hidden">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-8 w-24 bg-stone-100 rounded-full animate-pulse flex-shrink-0" />
        ))}
      </div>

      {/* Skeleton Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex flex-col">
            <div className="aspect-[4/3] w-full bg-stone-100 rounded-xl animate-pulse mb-3" />
            <div className="h-4 w-3/4 bg-stone-100 rounded animate-pulse mb-2" />
            <div className="h-3 w-full bg-stone-50 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
};