import React, { useEffect, useState } from "react";
import { ImageModal } from "../../components/ImageModal";
import { MenuHeader } from "../../components/MenuHeader";
import { CategoryNav } from "../../components/CategoryNav";
import { MenuItem } from "../../components/MenuItem";

const ModernLayout = ({ menu,activeCategory:selectedCategory}) => {
console.log("menu",menu)

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currencySymbol, setCurrencySymbol] = useState("€");
  const [unitData, setUnitData] = useState(null);
  const [activeCategory, setActiveCategory] = useState(selectedCategory);
  const allItems = menu?.categories?.flatMap((cat) => cat.items) || [];
  const currentCategoryName = menu?.categories?.find(
    (c) => c.id === activeCategory,
  )?.category;
  const filteredItems = searchQuery.trim()
    ? allItems.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.description &&
            item.description.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    : menu?.categories?.find((c) => c.id === activeCategory)?.items || [];
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };
  console.log("tt", menu, allItems, filteredItems);
  return (
    <div className="min-h-screen bg-white pb-16 font-sans">
      <ImageModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        item={selectedItem}
        currencySymbol={currencySymbol}
      />

      <MenuHeader
        info={unitData}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {!searchQuery.trim() && (
        <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-100 shadow-sm">
          <div className="pl-4 pt-4 font-bold text-lg">Categories</div>
          <p className="w-16 h-1 ml-4 bg-amber-500 mb-2"></p>
          <CategoryNav
            categories={
              menu?.categories?.map((cat) => ({
                id: cat.id,
                name: cat.category,
              })) || []
            }
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        </div>
      )}

      <main className="mx-auto px-4 md:px-10 pt-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-stone-900">
            {searchQuery.trim() ? "Search Results" : currentCategoryName}
          </h2>
          <p className="text-sm text-stone-500 mt-1">
            {filteredItems.length} item{filteredItems.length !== 1 ? "s" : ""}{" "}
            available
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-8">
          {filteredItems.map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              onClick={handleItemClick}
              currencySymbol={currencySymbol}
            />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-stone-400 italic">No items found.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ModernLayout;
