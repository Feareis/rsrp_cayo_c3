import { useLocation } from "react-router-dom";
import ProfileRedirect from "./ProfileRedirect";

export default function Header() {
  const location = useLocation();

  const pageNames: Record<string, string> = {
    // Root Section
    "/": "Dashboard",
    "/admin-dashboard": "Dashboard",
    "/stats": "Statistiques",
    "/calculator": "Calculateur",
    "/sale/export": "Vente Exportateur",
    "/sale/client": "Vente Client",
    "/price": "Prix",

    // Admin Section
    "/admin/user-management": "Gestion des employés",
    "/admin/stock/product": "Gestion Produits",
    "/admin/stock/raw-material": "Gestion Matières Premières",
    "/admin/analytics": "Analytics",
    "/admin/reboot-accounting": "Reboot Comptabilité",

    // Help Center
    "/help-center": "Centre d'aide",
    "/help-center/guide": "Guide",
    "/help-center/faq": "FAQ",

    // Profile Section
    "/profile": "Profil",
  };

  const pageTitle = pageNames[location.pathname] || "Page Inconnue";
  const isAdminPage = location.pathname.startsWith("/admin/");

  return (
    <header className="h-21 flex items-center justify-between bg-[#37474f] text-[#cfd8dc] px-6">
      <h2 className="text-2xl font-bold">{pageTitle}</h2>
      {!isAdminPage && location.pathname !== "/profile" && <ProfileRedirect />}
    </header>
  );
}
