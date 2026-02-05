import React, { useEffect, useState } from "react";
import { MenuHeader } from "../components/MenuHeader";
import { CategoryNav } from "../components/CategoryNav";
import { MenuItem } from "../components/MenuItem";
import { ImageModal } from "../components/ImageModal";
import axios from "axios";
import { MenuLoading } from "../components/MenuLoading";
import { decryptPayload } from "../components/decryptPayload";

export function RestaurantMenu() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  const [isValidToken, setIsValidToken] = useState(null); // null = checking, true = ok, false = invalid
  const [menuId, setMenuId] = useState(null);
  const [orgID, setOrgID] = useState(null);
  const [unitID, setUnitID] = useState(null);

  const [loading, setLoading] = useState(false);
  const [loadingUnit, setLoadingUnit] = useState(false);
  const [menuData, setMenuData] = useState(null);
  const [unitData, setUnitData] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currencySymbol, setCurrencySymbol] = useState("€");

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // ── Token validation ────────────────────────────────────────────────
  useEffect(() => {
    if (!token) {
      setIsValidToken(false);
      return;
    }

    try {
      const data = decryptPayload(token);
      if (!data?.menuId || !data?.orgId || !data?.unitId) {
        throw new Error("Missing required fields");
      }

      setMenuId(data.menuId);
      setOrgID(data.orgId);
      setUnitID(data.unitId);
      setIsValidToken(true);
    } catch (err) {
      console.warn("Token decryption failed:", err);
      setIsValidToken(false);
    }
  }, [token]);

  const url = process.env.REACT_APP_API_URL;

  // Fetch menu
  useEffect(() => {
    if (!isValidToken || !menuId || !orgID) return;

    const fetchMenuData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${url}/service/restaurant/ItemMenu/id?id=${menuId}`, {
          headers: { OrganisationAuthorizeKey: orgID },
        });
        const data = response?.data;
        setMenuData(data);

        if (data?.categories?.length > 0) {
          setActiveCategory(data.categories[0].id);
        }
      } catch (error) {
        console.error("Error fetching menu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, [isValidToken, menuId, orgID]);

  // Fetch unit info
  useEffect(() => {
    if (!isValidToken || !unitID || !orgID) return;

    const fetchUnitData = async () => {
      try {
        setLoadingUnit(true);
        const response = await axios.get(`${url}/core/CoreOrganisationUnit/id?id=${unitID}`, {
          headers: { OrganisationAuthorizeKey: orgID },
        });
        setUnitData(response?.data);
        setCurrencySymbol(response?.data?.country?.currencySymbol || "€");
      } catch (error) {
        console.error("Error fetching unit:", error);
      } finally {
        setLoadingUnit(false);
      }
    };

    fetchUnitData();
  }, [isValidToken, unitID, orgID]);

  // ── Early returns ───────────────────────────────────────────────────
  if (isValidToken === null) {
    return <MenuLoading message="Verifying link..." />;
  }

  if (isValidToken === false) {
    return <InvalidTokenScreen />;
  }

  if (loading || loadingUnit) {
    return <MenuLoading />;
  }

  // ── Normal menu rendering ───────────────────────────────────────────
  const allItems = menuData?.categories?.flatMap((cat) => cat.items) || [];

  const filteredItems = searchQuery.trim()
    ? allItems.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : menuData?.categories?.find((c) => c.id === activeCategory)?.items || [];

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const currentCategoryName = menuData?.categories?.find((c) => c.id === activeCategory)?.category;

  return (
    <div className="min-h-screen bg-white pb-16 font-sans">
      <ImageModal isOpen={modalOpen} onClose={() => setModalOpen(false)} item={selectedItem} currencySymbol={currencySymbol} />

      <MenuHeader info={unitData} searchQuery={searchQuery} onSearchChange={setSearchQuery}  />

      {!searchQuery.trim() && (
        <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-100 shadow-sm">
          <div className="pl-4 pt-4 font-bold text-lg">Categories</div>
          <p className="w-16 h-1 ml-4 bg-amber-500 mb-2"></p>
          <CategoryNav
            categories={menuData?.categories?.map((cat) => ({
              id: cat.id,
              name: cat.category,
            })) || []}
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
            {filteredItems.length} item{filteredItems.length !== 1 ? "s" : ""} available
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-8">
          {filteredItems.map((item) => (
            <MenuItem key={item.id} item={item} onClick={handleItemClick} currencySymbol={currencySymbol} />
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
}

// ── Beautiful modern "not found" screen ────────────────────────────────
function InvalidTokenScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100 flex items-center justify-center px-5">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="mx-auto w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
          <svg
            className="w-10 h-10 text-amber-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-stone-800">Invalid or missing link</h1>

        <p className="text-lg text-stone-600">
          This menu link appears to be incorrect, expired, or incomplete.
        </p>

        <div className="pt-4">
          <a
            href="/"
            className="inline-block px-8 py-3 bg-amber-600 text-white font-medium rounded-full hover:bg-amber-700 transition-colors shadow-md"
          >
            Return to home
          </a>
        </div>

        <p className="text-sm text-stone-500 pt-6">
          If you believe this is a mistake, please contact the restaurant directly.
        </p>
      </div>
    </div>
  );
}