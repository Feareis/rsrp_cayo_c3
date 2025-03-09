import { useLocation } from "react-router-dom";
import ProfileRedirect from "./ProfileRedirect";

/**
 * Header component displaying the page title and profile redirect button.
 */
export default function Header() {
  const location = useLocation();

  /**
   * Mapping of route paths to their respective page titles.
   */
  const pageNames: Record<string, string> = {
    // Root Section
    "/": "Dashboard",
    "/statistics": "Statistiques",
    "/calculator": "Calculateur",
    "/sale/export": "Vente Exportateur",
    "/sale/client": "Vente Client",
    "/pricing": "Prix",

    // Admin Section
    "/admin/quota-management": "Gestion des Quotas",
    "/admin/sales-logs": "Gestion des Logs",
    "/admin/user-management": "Gestion des employés",
    "/admin/site-access": "Gestion des accès au site",
    "/admin/stock/product": "Gestion des Produits de l'Entreprise",
    "/admin/stock/raw-material": "Gestion des Matières Premières de l'Entreprise",
    "/admin/analytics": "Analytics",
    "/admin/reboot-accounting": "Reboot Comptabilité",

    // Help Center
    "/help-center": "Centre d'aide",
    "/help-center/guide": "Guide",
    "/help-center/faq": "FAQ",

    // Profile Section
    "/profile": "Profil",
  };

  // Get the current page title based on the route
  const pageTitle = pageNames[location.pathname] || "Page Inconnue";

  // Check if the current page belongs to the admin section
  const isAdminPage = location.pathname.startsWith("/admin/");

  return (
    <header className="h-21 flex items-center justify-between bg-[#37474f] text-[#cfd8dc] px-8">
      <h2 className="text-2xl font-bold">{pageTitle}</h2>
      {/* Hide ProfileRedirect on admin pages and profile page */}
      {!isAdminPage && location.pathname !== "/profile" && <ProfileRedirect />}
    </header>
  );
}
