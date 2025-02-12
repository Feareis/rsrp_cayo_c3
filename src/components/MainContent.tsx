import { Outlet } from "react-router-dom";

export default function MainContent() {
  return (
    <main className="py-6 flex-1 w-19/20 mx-auto bg-[#37474f] text-[#cfd8dc]">
      <Outlet />
    </main>
  );
}
