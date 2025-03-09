import SidebarHeader from "./SidebarHeader";
import SidebarBody from "./SidebarBody";
import SidebarFooter from "./SidebarFooter";

/**
 * Sidebar component displaying the navigation menu.
 */
export default function Sidebar() {
  return (
    <aside
      className="w-64 bg-[#263238] text-[#cfd8dc] h-screen flex flex-col"
    >
      {/* Header with company name */}
      <SidebarHeader companyName="La Péricave" />

      {/* Main navigation body */}
      <SidebarBody />

      {/* Footer (e.g., user profile, settings, logout) */}
      <SidebarFooter />
    </aside>
  );
}
