import { useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";
import ProfileRedirect from "./ProfileRedirect";

export default function Header() {
  const location = useLocation();

  // Définir les noms des pages dynamiques
  const pageNames: Record<string, string> = {
    "/": "Dashboard",
    "/calculator": "Calculateur",
    "/sale/export": "Vente Exportateur",
    "/sale/client": "Vente Client",
    "/price": "Prix",
    "/admin/test1": "Admin / Test1",
    "/admin/test2": "Admin / Test2",
    "/help-center": "Centre d'aide",
    "/help-center/faq": "FAQ",
    "/profile": "Profil",
  };

  const pageTitle = pageNames[location.pathname] || "Page Inconnue";

  return (
    <header className="h-21 flex items-center justify-between bg-[#37474f] text-[#cfd8dc] px-6">

      {/* Nom de la page avec condition pour /profile */}
      {location.pathname === "/profile" ? (
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold">Mon Profil</h2>
        </div>
      ) : (
        <h2 className="text-2xl font-bold">{pageTitle}</h2>
      )}

      {/* Masquer le bouton Profil sur /profile et /help-center/faq */}
      {(location.pathname !== "/profile" && location.pathname !== "/help-center/faq") && (
        <div className="flex items-center gap-3">
          <ProfileRedirect />
        </div>
      )}
    </header>
  );
}
