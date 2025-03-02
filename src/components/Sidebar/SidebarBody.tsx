import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home, Calculator, Tag, ShoppingCart, Package, Layers, ScanBarcode, Anvil, Users, Shield, ChartArea, ChartScatter, DatabaseZap, BookHeart, ChevronDown, ChevronRight
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

// Sidebar Link Component
const SidebarLink = ({ to, label, icon: Icon }: { to: string; label: string; icon: any }) => {
  const { user } = useAuth();
  const location = useLocation();
  return (
    <li>
      <Link to={to} className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 ${
        location.pathname === to ? "bg-[#3e4d56] text-[#cfd8dc] font-semibold" : "text-[#cfd8dc] hover:bg-[#3e4d56]"
      }`}>
        <Icon size={22} />
        {label}
      </Link>
    </li>
  );
};

// Expandable Section Component
const ExpandableSection = ({ title, icon: Icon, sectionKey, links, openSection, toggleSection }: any) => {
  return (
    <div>
      <button onClick={() => toggleSection(sectionKey)} className="flex items-center justify-between w-full px-3 py-3 text-[#cfd8dc] hover:bg-[#3e4d56] rounded-lg transition-all duration-300">
        <div className="flex items-center gap-3">
          <Icon size={22} />
          <span>{title}</span>
        </div>
        {openSection === sectionKey ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${openSection === sectionKey ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="mt-2 ml-5 flex flex-col gap-2">
          {links.map(({ to, label, icon: SubIcon }: any) => (
            <SidebarLink key={to} to={to} label={label} icon={SubIcon} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default function SidebarBody() {
  const { user } = useAuth();
  const location = useLocation();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(prev => (prev === section ? null : section)); // Ferme l'ancienne section si une autre est ouverte
  };

  return (
    <nav className="flex flex-col h-full p-4 pt-6">
      <ul className="flex flex-col gap-4 flex-grow">
        <SidebarLink key="dashboard" to="/" label="Home" icon={Home} />
        <SidebarLink key="statistics" to="/statistics" label="Statistiques" icon={ChartArea} />
        <SidebarLink key="calculator" to="/calculator" label="Calculateur" icon={Calculator} />

        {/* Sections expandables avec openSection global */}
        <ExpandableSection
          title="Vente"
          icon={ShoppingCart}
          sectionKey="vente"
          openSection={openSection}
          toggleSection={toggleSection}
          links={[
            { to: "/sale/export", label: "Exportateur", icon: Package },
            { to: "/sale/client", label: "Client", icon: Users }
          ]}
        />

        <SidebarLink key="price" to="/price" label="Prix" icon={Tag} />

        {/* Admin Role Only */}
        {user?.role === "admin" || user?.role === "limited_admin" ? (
          <>
            {/* Admin Switch */}
            <div className="relative flex items-center justify-center my-1">
              <span className="absolute w-[95%] h-[1px] bg-gray-600"></span>
              <span className="relative bg-[#263238] px-3 text-[#90a4ae] font-bold text-sm uppercase">
                Gestion
              </span>
            </div>

            {/* Gestion Quota accessible aux admins et limited_admin */}
            <SidebarLink key="admin-dashboard" to="/admin-dashboard" label="Gestion Quota" icon={Layers} />

            {/* Les autres liens sont accessibles uniquement aux admins */}
            {user?.role === "admin" && (
              <>
                <SidebarLink key="admin-user-management" to="/admin/user-management" label="Gestion Employés" icon={Users} />
                <SidebarLink key="admin-site-access" to="/admin/site-access" label="Accès Site" icon={Shield} />

                <ExpandableSection
                  title="Stock"
                  icon={Layers}
                  sectionKey="stock"
                  openSection={openSection}
                  toggleSection={toggleSection}
                  links={[
                    { to: "/stock/products", label: "Produits", icon: ScanBarcode },
                    { to: "/stock/raw-materials", label: "Matières Premières", icon: Anvil }
                  ]}
                />

                <SidebarLink key="admin-analytics" to="/admin/analytics" label="Analytics" icon={ChartScatter} />
                <SidebarLink key="admin-reboot-accounting" to="/admin/reboot-accounting" label="Reboot Comptabilité" icon={DatabaseZap} />
              </>
            )}
          </>
        ) : null}
      </ul>

      <ul className="mt-auto">
        <SidebarLink key="help-center" to="/help-center" label="Aide" icon={BookHeart} />
      </ul>
    </nav>
  );
}
