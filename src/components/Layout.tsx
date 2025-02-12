import Sidebar from "./Sidebar/Sidebar";
import Header from "./header/Header";
import MainContent from "./MainContent";

export default function Layout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-[#37474f]">
        <Header />
        <MainContent />
      </div>
    </div>
  );
}
