import { useLocation } from "react-router-dom";
import { useState } from "react";
import ProfileRedirect from "./ProfileRedirect";

export default function Header() {
  const location = useLocation();
  const [clicked, setClicked] = useState(false);

  const pageNames: Record<string, string> = {
    "/": "Dashboard",
    "/calculator": "Calculateur",
    "/sale/export": "Vente Exportateur",
    "/sale/client": "Vente Client",
    "/price": "Prix",
    "/admin/user-management": "Gestion des employés",
    "/admin/stock/product": "Gestion Produits",
    "/admin/stock/raw-material": "Gestion Matières Premières",
    "/help-center": "Centre d'aide",
    "/help-center/faq": "FAQ",
    "/profile": "Profil",
  };

  const pageTitle = pageNames[location.pathname] || "Page Inconnue";

  // Vérifie si on est dans un chemin commençant par "/admin/"
  const isAdminPage = location.pathname.startsWith("/admin/");
  const isUserManagement = location.pathname === "/admin/user-management";

  // Fonction pour gérer l’animation et la console log
  const handleClick = () => {
    console.log("add");
    setClicked(true);
    setTimeout(() => setClicked(false), 300); // Réinitialisation après 300ms
  };

  return (
    <header className="h-21 flex items-center justify-between bg-[#37474f] text-[#cfd8dc] px-6">
      {/* Titre de la page */}
      <h2 className="text-2xl font-bold">{pageTitle}</h2>

      {/* Si on est sur "admin/user-management", afficher le bouton "Nouvel employé" avec animation */}
      {isUserManagement ? (
        <button
          className={`bg-red-500 text-white px-4 py-2 rounded-md transition-all duration-300 ease-in-out
            ${clicked ? "scale-110 rotate-2 shadow-lg" : "hover:scale-105 hover:shadow-md"}`}
          onClick={handleClick}
        >
          Nouvel employé
        </button>
      ) : (
        /* Afficher le profil SEULEMENT si on n'est PAS dans /admin/, sauf pour /admin/user-management */
        (!isAdminPage || location.pathname === "/admin/user-management") &&
        location.pathname !== "/profile" &&
        location.pathname !== "/help-center/faq" && (
          <div className="flex items-center gap-3">
            <ProfileRedirect />
          </div>
        )
      )}
    </header>
  );
}
