import { useLocation } from "react-router-dom";
import { useState } from "react";
import { X, Trash2 } from "lucide-react";
import ProfileRedirect from "./ProfileRedirect";


interface HeaderProps {
  selectedUsers?: string[];
  onDelete?: () => void;
}

export default function Header({ selectedUsers = [], onDelete }: HeaderProps) {
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

  const isUserManagement = location.pathname === "/admin/user-management";
  const pageTitle = isUserManagement && selectedUsers.length > 0
    ? `${selectedUsers.length} sélectionné(s)`
    : pageNames[location.pathname] || "Page Inconnue";

  // Vérifie si on est dans un chemin commençant par "/admin/"
  const isAdminPage = location.pathname.startsWith("/admin/");

  // Fonction pour gérer l’animation et la console log
  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 300);
  };

  return (
    <header className="h-21 flex items-center justify-between bg-[#37474f] text-[#cfd8dc] px-6">
      {/* Titre de la page */}
      <h2 className="text-2xl font-bold">{pageTitle}</h2>

      {/* Afficher le profil SEULEMENT si on n'est PAS dans /admin/, sauf pour /admin/user-management */}
      {!isAdminPage &&
        location.pathname !== "/profile" &&
        location.pathname !== "/help-center/faq" && (
          <div className="flex items-center gap-3">
            <ProfileRedirect />
          </div>
      )}
    </header>
  );
}
