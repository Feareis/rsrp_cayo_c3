import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home, Calculator, Tag, ShoppingCart, Package, Layers, ScanBarcode, Anvil, Users, Shield, Settings, FileQuestion, ChevronDown, ChevronRight, BookHeart, ChartArea, ChartScatter, DatabaseZap, TicketCheck
} from "lucide-react";

export default function SidebarBody() {
  const location = useLocation();

  // État pour savoir quelle section est ouverte
  const [openSection, setOpenSection] = useState<string | null>(null);

  // Fonction pour toggler une section et fermer les autres
  const toggleSection = (section: string) => {
    setOpenSection(prev => (prev === section ? null : section));
  };

  return (
    <nav className="flex flex-col h-full p-4 pt-6">
      <ul className="flex flex-col gap-4 flex-grow">
        {/* Dashboard */}
        <li>
          <Link
            to="/"
            className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 ${
              location.pathname === "/"
                ? "bg-[#3e4d56] text-[#cfd8dc] font-semibold"
                : "text-[#cfd8dc] hover:bg-[#3e4d56]"
            }`}
          >
            <Home size={22} />
            Dashboard
          </Link>
        </li>

        {/* Dashboard -> vision Admin */}
        <li>
          <Link
            to="/admin-dashboard"
            className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 ${
              location.pathname === "/admin-dashboard"
                ? "bg-[#3e4d56] text-[#cfd8dc] font-semibold"
                : "text-[#cfd8dc] hover:bg-[#3e4d56]"
            }`}
          >
            <Home size={22} />
              Dashboard Admin
          </Link>
        </li>

        {/* Statistiques */}
        <li>
          <Link
            to="/statistics"
            className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 ${
              location.pathname === "/statistics"
                ? "bg-[#3e4d56] text-[#cfd8dc] font-semibold"
                : "text-[#cfd8dc] hover:bg-[#3e4d56]"
            }`}
          >
            <ChartArea size={22} />
              Statistiques
          </Link>
        </li>

        {/* Calculateur */}
        <li>
          <Link
            to="/calculator"
            className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 ${
              location.pathname === "/calculator"
                ? "bg-[#3e4d56] text-[#cfd8dc] font-semibold"
                : "text-[#cfd8dc] hover:bg-[#3e4d56]"
            }`}
          >
            <Calculator size={22} />
            Calculateur
          </Link>
        </li>

        {/* Section Vente */}
        <li>
          <button
            onClick={() => toggleSection("vente")}
            className="flex items-center justify-between w-full px-3 py-3 text-[#cfd8dc] hover:bg-[#3e4d56] rounded-lg transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <ShoppingCart size={22} />
              <span>Vente</span>
            </div>
            {openSection === "vente" ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openSection === "vente" ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <ul className="mt-2 ml-5 flex flex-col gap-2">
              <li>
                <Link
                  to="/sale/export"
                  className={`flex items-center gap-3 px-2 py-2 rounded-lg transition-all duration-300 ${
                    location.pathname === "/sale/export"
                      ? "bg-[#3e4d56] text-[#cfd8dc] font-semibold"
                      : "text-[#cfd8dc] hover:bg-[#3e4d56]"
                  }`}
                >
                  <Package size={20} />
                  Exportateur
                </Link>
              </li>
              <li>
                <Link
                  to="/sale/client"
                  className={`flex items-center gap-3 px-2 py-2 rounded-lg transition-all duration-300 ${
                    location.pathname === "/sale/client"
                      ? "bg-[#3e4d56] text-[#cfd8dc] font-semibold"
                      : "text-[#cfd8dc] hover:bg-[#3e4d56]"
                  }`}
                >
                  <Users size={20} />
                  Client
                </Link>
              </li>
            </ul>
          </div>
        </li>

        {/* Prix */}
        <li>
          <Link
            to="/price"
            className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 ${
              location.pathname === "/price"
                ? "bg-[#3e4d56] text-[#cfd8dc] font-semibold"
                : "text-[#cfd8dc] hover:bg-[#3e4d56]"
            }`}
          >
            <Tag size={22} />
            Prix
          </Link>
        </li>

        {/* Section Admin */}
        <li className="relative flex items-center justify-center my-1">
          <span className="absolute w-[95%] h-[1px] bg-gray-600"></span>
          <span className="relative bg-[#263238] px-3 text-[#90a4ae] font-bold text-sm uppercase">
            Admin
          </span>
        </li>

        {/* Admin: Gestion Utilisateurs */}
        <li>
          <Link
            to="/admin/user-management"
            className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 ${
              location.pathname === "/admin/user-management"
                ? "bg-[#3e4d56] text-[#cfd8dc] font-semibold"
                : "text-[#cfd8dc] hover:bg-[#3e4d56]"
            }`}
          >
            <Users size={22} />
            Gestion Employés
          </Link>
        </li>

        {/* Admin: Gestion des quota utilisateurs */}
        <li>
          <Link
            to="/admin/quota-management"
            className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 ${
              location.pathname === "/admin/quota-management"
                ? "bg-[#3e4d56] text-[#cfd8dc] font-semibold"
                : "text-[#cfd8dc] hover:bg-[#3e4d56]"
            }`}
          >
            <TicketCheck size={22} />
            Gestion Quota
          </Link>
        </li>

        {/* Admin: Accès Site */}
        <li>
          <Link
            to="/admin/site-access"
            className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 ${
              location.pathname === "/admin/site-access"
                ? "bg-[#3e4d56] text-[#cfd8dc] font-semibold"
                : "text-[#cfd8dc] hover:bg-[#3e4d56]"
            }`}
          >
            <Shield size={22} />
            Accès Site
          </Link>
        </li>

        {/* Admin: Stock */}
        <li>
          <button
            onClick={() => toggleSection("stock")}
            className="flex items-center justify-between w-full px-3 py-3 text-[#cfd8dc] hover:bg-[#3e4d56] rounded-lg transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <Layers size={22} />
              <span>Stock</span>
            </div>
            {openSection === "stock" ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openSection === "stock" ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <ul className="mt-2 ml-5 flex flex-col gap-2">

              {/* Admin: Stock: Produits */}
              <li>
                <Link
                  to="/stock/products"
                  className={`flex items-center gap-3 px-2 py-2 rounded-lg transition-all duration-300 ${
                    location.pathname === "/stock/products"
                      ? "bg-[#3e4d56] text-[#cfd8dc] font-semibold"
                      : "text-[#cfd8dc] hover:bg-[#3e4d56]"
                  }`}
                >
                  <ScanBarcode size={20} />
                    Produits
                </Link>
              </li>

              {/* Admin: Stock: Matières Premières */}
              <li>
                <Link
                  to="/stock/raw-materials"
                  className={`flex items-center gap-3 px-2 py-2 rounded-lg transition-all duration-300 ${
                    location.pathname === "/stock/raw-materials"
                      ? "bg-[#3e4d56] text-[#cfd8dc] font-semibold"
                      : "text-[#cfd8dc] hover:bg-[#3e4d56]"
                  }`}
                >
                  <Anvil size={20} />
                    Matières Premières
                </Link>
              </li>
            </ul>
          </div>
        </li>

        {/* Admin: Analytics */}
        <li>
          <Link
            to="/admin/analytics"
            className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 ${
              location.pathname === "/admin/analytics"
                ? "bg-[#3e4d56] text-[#cfd8dc] font-semibold"
                : "text-[#cfd8dc] hover:bg-[#3e4d56]"
            }`}
          >
            <ChartScatter size={22} />
              Analytics
          </Link>
        </li>

        {/* Admin: Analytics */}
        <li>
          <Link
            to="/admin/reboot-accounting"
            className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 ${
              location.pathname === "/admin/reboot-accounting"
                ? "bg-[#3e4d56] text-[#cfd8dc] font-semibold"
                : "text-[#cfd8dc] hover:bg-[#3e4d56]"
            }`}
          >
            <DatabaseZap size={22} />
              Reboot Comptabilité
          </Link>
        </li>
      </ul>

      {/* Aide */}
      <div className="mt-auto">
        <Link
          to="/help-center"
            className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 ${
              location.pathname === "/help-center"
                ? "bg-[#3e4d56] text-[#cfd8dc] font-semibold"
                : "text-[#cfd8dc] hover:bg-[#3e4d56]"
            }`}
        >
          <BookHeart size={22} />
          Aide
        </Link>
      </div>
    </nav>
  );
}
