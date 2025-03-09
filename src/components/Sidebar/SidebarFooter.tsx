import { useAuth } from "../../context/AuthContext";
import { LogOut } from "lucide-react";

/**
 * SidebarFooter component containing the logout button and credits.
 */
export default function SidebarFooter() {
  const { logout } = useAuth();

  /**
   * Handles user logout with a confirmation prompt.
   */
  const handleLogout = () => {
    if (window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
      logout();
    }
  };

  return (
    <div className="flex flex-col px-6 py-4 border-t border-gray-700 gap-4 mt-auto">
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
        text-[#cfd8dc] hover:text-white hover:bg-red-500/60 focus:outline-none"
        aria-label="Déconnexion"
      >
        <LogOut size={22} />
        Déconnexion
      </button>

      {/* Footer Credit */}
      <div className="flex justify-center w-full">
        <button className="flex items-center px-1 py-1 transition-all duration-200 ease-in-out hover:scale-105">
          <p className="text-xs text-[#cfd8dc] font-bold">
            Made with ❤️ by Feareis
          </p>
        </button>
      </div>
    </div>
  );
}
