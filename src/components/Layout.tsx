import Sidebar from "./Sidebar/Sidebar";
import Header from "./header/Header";
import MainContent from "./MainContent";

export default function Layout() {
  return (
    <div className="flex h-screen min-h-screen bg-gray-100">
      {/* Sidebar qui prend toute la hauteur */}
      <Sidebar className="h-full" />

      {/* Conteneur principal en colonne, qui prend toute la hauteur */}
      <div className="flex flex-col flex-1 h-full min-h-screen bg-[#37474f]">
        <Header className="h-[60px] flex-shrink-0" />
        <MainContent className="flex-1 overflow-auto" />
      </div>
    </div>
  );
}