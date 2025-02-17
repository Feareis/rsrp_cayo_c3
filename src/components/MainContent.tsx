import { Outlet } from "react-router-dom";

export default function MainContent() {
  return (
    <main className="py-6 px-24 flex-1 w-full mx-auto bg-[#37474f] text-[#cfd8dc] overflow-auto">
      <Outlet />
    </main>
  );
}
