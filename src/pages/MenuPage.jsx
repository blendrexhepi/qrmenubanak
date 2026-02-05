import React, { useEffect, useState } from "react";

import axios from "axios";
import { MenuLoading } from "../components/MenuLoading";
import { decryptPayload } from "../components/decryptPayload";
import LayoutRenderer from "../layouts/LayoutRenderer";

const MenuPage = () => {
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

  return (
      <LayoutRenderer
      layout={"modern"}   // e.g. "modern"
      menu={menuData}
      restaurant={menuData}
      activeCategory={activeCategory}
    />
  )
}
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
export default MenuPage
