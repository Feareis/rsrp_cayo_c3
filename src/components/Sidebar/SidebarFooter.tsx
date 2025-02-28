import { useAuth } from "../../context/AuthContext"; // Importation du contexte
import { LogOut } from "lucide-react";

export default function SidebarFooter() {
  const { logout } = useAuth(); // Récupération de la fonction logout

  return (
    <div className="flex flex-col px-6 py-4 border-t border-gray-700 gap-4 mt-auto">
      {/* Logout Button */}
      <button
        onClick={logout} // Déconnecte l'utilisateur, la redirection est gérée ailleurs
        className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-[#cfd8dc] hover:text-white hover:bg-red-500/60 hover:bg-opacity-20"
      >
        <LogOut size={22} />
        Déconnexion
      </button>

      {/* Bouton centré en bas */}
      <div className="flex justify-center w-full">
        <button className="flex items-center px-1 py-1 transition-all duration-200 ease-in-out hover:scale-105">
          <p className="text-xs text-[#cfd8dc] font-bold">Made with ❤️ by Feareis</p>
        </button>
      </div>
    </div>
  );
}
