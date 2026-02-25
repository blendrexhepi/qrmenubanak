import React, { useMemo, useState } from "react";

export default function MinimalLayout({ menu }) {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("all");
  const [hoveredId, setHoveredId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const url = process.env.REACT_APP_API_URL;

  const categories = useMemo(
    () =>
      menu?.categories?.map((c) => ({
        id: c.id,
        name: c.category,
      })) || [],
    [menu],
  );

  const allItems = useMemo(
    () => menu?.categories?.flatMap((c) => c.items) || [],
    [menu],
  );

  const currentCategoryName =
    tab === "all"
      ? "All"
      : menu?.categories?.find((c) => c.id === tab)?.category || "";

  const filtered = useMemo(() => {
    const base =
      tab === "all"
        ? allItems
        : menu?.categories?.find((c) => c.id === tab)?.items || [];

    return base.filter((d) =>
      d.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [tab, query, allItems, menu]);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  
  return (
    <div className="min-h-screen relative flex justify-center text-slate-50 overflow-hidden bg-[radial-gradient(1200px_600px_at_10%_-10%,#1f2933_0%,transparent_60%),radial-gradient(800px_400px_at_90%_10%,#312e81_0%,transparent_55%),linear-gradient(180deg,#020617,#020617)]">
      <div className="absolute w-[320px] h-[320px] rounded-full blur-[80px] opacity-35 bg-cyan-400 -top-[100px] -left-[120px]" />
      <div className="absolute w-[320px] h-[320px] rounded-full blur-[80px] opacity-35 bg-violet-400 top-[120px] -right-[140px]" />

      <div className="w-full max-w-[420px] sm:max-w-[640px] md:max-w-[768px] lg:max-w-[900px] px-3 sm:px-4 md:px-6 relative z-10">

        <div className="mb-4">
          <h1 className="text-[22px] font-bold pt-4">{menu?.name || "Menu"}</h1>
        </div>

        <div className="bg-slate-900/70 backdrop-blur-md border border-slate-400/20 rounded-xl px-3 py-2 mb-3">
          <input
            className="w-full bg-transparent outline-none text-slate-50 text-sm"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            <button
              onClick={() => setTab("all")}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap border backdrop-blur-md transition-all ${
                tab === "all"
                  ? "bg-gradient-to-r from-cyan-400 to-violet-400 text-white font-semibold border-transparent shadow-lg shadow-cyan-400/30"
                  : "bg-slate-900/60 text-slate-400 border-slate-400/20"
              }`}
            >
              All
            </button>

            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setTab(c.id)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap border backdrop-blur-md transition-all ${
                  tab === c.id
                    ? "bg-gradient-to-r from-cyan-400 to-violet-400 text-white font-semibold border-transparent shadow-lg shadow-cyan-400/30"
                    : "bg-slate-900/60 text-slate-400 border-slate-400/20"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <h2 className="text-lg font-bold">
            {query.trim() ? "Search Results" : currentCategoryName}
          </h2>
          <p className="text-xs text-slate-400">
            {filtered.length} item{filtered.length !== 1 ? "s" : ""} available
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {filtered.map((d) => {
            const isHover = hoveredId === d.id;
            const isExpanded = expandedId === d.id;

            return (
              <div
                key={d.id}
                className={`rounded-2xl overflow-hidden border border-white/10 backdrop-blur-md cursor-pointer transition-all
                bg-gradient-to-b from-white/10 to-white/5
                shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_10px_30px_rgba(0,0,0,0.45)]
                ${
                  isHover
                    ? "transform -translate-y-1 scale-[1.01] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_40px_rgba(0,0,0,0.6)]"
                    : ""
                }`}
                onMouseEnter={() => setHoveredId(d.id)}
                onMouseLeave={() => setHoveredId(null)}
                onTouchStart={() => setHoveredId(d.id)}
                onTouchEnd={() => setHoveredId(null)}
                onClick={() => toggleExpand(d.id)}
              >
                <div
                  className={`h-[120px] bg-cover bg-center transition-transform ${
                    isHover ? "scale-105" : ""
                  }`}
                  style={{
                    backgroundImage: `url(${
                      url.replace("/api", "/") + d.imagesPath
                    })`,
                  }}
                />

                <div className="p-3">
                  <div className="flex justify-evenly gap-2">
                    <h3 className="text-sm font-semibold">{d.name}</h3>
                    <div className="text-sm font-bold">{d.price} €</div>
                  </div>

                  {isExpanded && (
                    <p className="mt-2 text-xs leading-relaxed text-slate-300">
                      {d.description || "No description available."}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-6 text-slate-400">No items found.</div>
        )}
      </div>
    </div>
  );
}
