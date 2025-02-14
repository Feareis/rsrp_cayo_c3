import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home, Calculator, Tag, Receipt, Package, Users, Shield, Settings, FileQuestion, ChevronDown, ChevronRight
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
              <Receipt size={22} />
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

        <li className="border-t border-gray-700 mt-2"></li>

        {/* Section Admin */}
        <li>
          <button
            onClick={() => toggleSection("admin")}
            className="flex items-center justify-between w-full px-3 py-3 text-[#cfd8dc] hover:bg-[#3e4d56] rounded-lg transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <Shield size={22} />
              <span>Admin</span>
            </div>
            {openSection === "admin" ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openSection === "admin" ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <ul className="mt-2 ml-5 flex flex-col gap-2">
              <li>
                <Link
                  to="/admin/user-management"
                  className={`flex items-center gap-3 px-2 py-2 rounded-lg transition-all duration-300 ${
                    location.pathname === "/admin/user-management"
                      ? "bg-[#3e4d56] text-[#cfd8dc] font-semibold"
                      : "text-[#cfd8dc] hover:bg-[#3e4d56]"
                  }`}
                >
                  <Users size={20} />
                  Gestion Employés
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/test2"
                  className={`flex items-center gap-3 px-2 py-2 rounded-lg transition-all duration-300 ${
                    location.pathname === "/admin/test2"
                      ? "bg-[#3e4d56] text-[#cfd8dc] font-semibold"
                      : "text-[#cfd8dc] hover:bg-[#3e4d56]"
                  }`}
                >
                  <Settings size={20} />
                  Test2
                </Link>
              </li>
            </ul>
          </div>
        </li>
      </ul>

      {/* Section Aide */}
      <div className="mt-auto">
        <Link
          to="/help-center"
            className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 ${
              location.pathname === "/help-center"
                ? "bg-[#3e4d56] text-[#cfd8dc] font-semibold"
                : "text-[#cfd8dc] hover:bg-[#3e4d56]"
            }`}
        >
          <FileQuestion size={22} />
          Aide
        </Link>
      </div>
    </nav>
  );
}
