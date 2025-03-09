import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home, Calculator, Tag, ShoppingCart, Package, Users, Shield, ChartArea,
  ChartScatter, DatabaseZap, BookHeart, ChevronDown, ChevronRight, Logs, Layers
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

/**
 * SidebarLinkProps type for defining the sidebar link component.
 */
interface SidebarLinkProps {
  to: string;
  label: string;
  icon: React.ElementType;
}

/**
 * SidebarLink component renders a single navigation link.
 */
const SidebarLink: React.FC<SidebarLinkProps> = ({ to, label, icon: Icon }) => {
  const location = useLocation();
  return (
    <li>
      <Link
        to={to}
        className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 ${
          location.pathname === to ? "bg-[#3e4d56] text-[#cfd8dc] font-semibold" : "text-[#cfd8dc] hover:bg-[#3e4d56]"
        }`}
      >
        <Icon size={22} />
        {label}
      </Link>
    </li>
  );
};

/**
 * ExpandableSectionProps type for expandable sections.
 */
interface ExpandableSectionProps {
  title: string;
  icon: React.ElementType;
  sectionKey: string;
  links: SidebarLinkProps[];
  openSection: string | null;
  toggleSection: (section: string) => void;
}

/**
 * ExpandableSection component handles collapsible sidebar sections.
 */
const ExpandableSection: React.FC<ExpandableSectionProps> = ({ title, icon: Icon, sectionKey, links, openSection, toggleSection }) => {
  const isOpen = openSection === sectionKey;

  return (
    <div>
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between w-full px-3 py-3 text-[#cfd8dc] hover:bg-[#3e4d56] rounded-lg transition-all duration-300"
      >
        <div className="flex items-center gap-3">
          <Icon size={22} />
          <span>{title}</span>
        </div>
        {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      </button>

      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="mt-2 ml-6 flex flex-col gap-2">
          {links.map((link) => (
            <SidebarLink key={link.to} {...link} />
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * SidebarBody component contains the main navigation.
 */
export default function SidebarBody() {
  const { user } = useAuth();
  const [openSection, setOpenSection] = useState<string | null>(null);

  /**
   * Handles expanding/collapsing sections.
   */
  const toggleSection = (section: string) => {
    setOpenSection(prev => (prev === section ? null : section));
  };

  return (
    <nav className="flex flex-col h-full p-4 pt-6">
      <ul className="flex flex-col gap-4 flex-grow">
        <SidebarLink to="/" label="Home" icon={Home} />
        <SidebarLink to="/statistics" label="Statistiques" icon={ChartArea} />
        <SidebarLink to="/calculator" label="Calculateur" icon={Calculator} />

        {/* Expandable sales section */}
        <ExpandableSection
          title="Vente"
          icon={ShoppingCart}
          sectionKey="vente"
          openSection={openSection}
          toggleSection={toggleSection}
          links={[
            { to: "/sale/export", label: "Exportateur", icon: Package },
            { to: "/sale/client", label: "Client", icon: Users },
          ]}
        />

        {/* Admin Sales Logs */}
        {user?.role === "admin" && <SidebarLink to="/admin/sales-logs" label="Logs" icon={Logs} />}

        <SidebarLink to="/pricing" label="Prix" icon={Tag} />

        {/* Admin Section */}
        {(user?.role === "admin" || user?.role === "limited_admin") && (
          <>
            {/* Divider */}
            <div className="relative flex items-center justify-center my-1">
              <span className="absolute w-[95%] h-[1px] bg-gray-600"></span>
              <span className="relative bg-[#263238] px-3 text-[#90a4ae] font-bold text-sm uppercase">
                Gestion
              </span>
            </div>

            {/* Admin & Limited Admin links */}
            <SidebarLink to="/admin/quota-management" label="Gestion Quota" icon={Layers} />

            {/* Admin-only links */}
            {user?.role === "admin" && (
              <>
                <SidebarLink to="/admin/user-management" label="Gestion Employés" icon={Users} />
                <SidebarLink to="/admin/site-access" label="Accès Site" icon={Shield} />

                {/*
                <ExpandableSection
                  title="Stock"
                  icon={Layers}
                  sectionKey="stock"
                  openSection={openSection}
                  toggleSection={toggleSection}
                  links={[
                    { to: "/admin/stock/product", label: "Produits", icon: ScanBarcode },
                    { to: "/admin/stock/raw-material", label: "Matières Premières", icon: Anvil }
                  ]}
                />
                */}

                <SidebarLink to="/admin/analytics" label="Analytics" icon={ChartScatter} />
                <SidebarLink to="/admin/reboot-accounting" label="Reboot Comptabilité" icon={DatabaseZap} />
              </>
            )}
          </>
        )}
      </ul>

      {/* Help Section */}
      <ul className="mt-auto">
        <SidebarLink to="/help-center" label="Aide" icon={BookHeart} />
      </ul>
    </nav>
  );
}
