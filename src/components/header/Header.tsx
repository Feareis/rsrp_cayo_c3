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
    "/admin/test2": "Admin / Test2",
    "/help-center": "Centre d'aide",
    "/help-center/faq": "FAQ",
    "/profile": "Profil",
  };

  const pageTitle = pageNames[location.pathname] || "Page Inconnue";

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
      {location.pathname === "/admin/user-management" ? (
        <button
          className={`bg-red-500 text-white px-4 py-2 rounded-md transition-all duration-300 ease-in-out
            ${clicked ? "scale-110 rotate-2 shadow-lg" : "hover:scale-105 hover:shadow-md"}`}
          onClick={handleClick}
        >
          Nouvel employé
        </button>
      ) : (
        /* Afficher le bouton profil sauf sur /profile et /help-center/faq */
        (location.pathname !== "/profile" && location.pathname !== "/help-center/faq") && (
          <div className="flex items-center gap-3">
            <ProfileRedirect />
          </div>
        )
      )}
    </header>
  );
}
