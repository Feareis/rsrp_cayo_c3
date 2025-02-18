import Sidebar from "./Sidebar/Sidebar";
import Header from "./header/Header";
import MainContent from "./MainContent";

export default function Layout() {
  return (
    <div className="flex h-screen min-h-screen bg-[#37474f]">
      <Sidebar className="h-full" />
      <div className="flex flex-col flex-1 h-full min-h-screen bg-[#37474f] mx-auto">
        <Header />
        <MainContent />
      </div>
    </div>
  );
}
