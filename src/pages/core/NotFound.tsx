import React from "react";
import Animated2DDesktop from "../../components/core/loader/animated-2d-desktop/Animated2DDesktop";

export default function UnderConstruction() {
  return (
    <div className="flex flex-col items-center justify-center bg-[#37474f] text-[#cfd8dc] space-y-4 mt-60">
      <h1 className="text-3xl font-bold">⚠️️ Page en construction ⚠️</h1>
      <Animated2DDesktop />
    </div>
  );
}
