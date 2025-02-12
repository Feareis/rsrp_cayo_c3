import SidebarHeader from "./SidebarHeader";
import SidebarBody from "./SidebarBody";
import SidebarFooter from "./SidebarFooter";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#263238] text-[#cfd8dc] h-full flex flex-col">
      <SidebarHeader />
      <SidebarBody />
      <SidebarFooter />
    </aside>
  );
}
