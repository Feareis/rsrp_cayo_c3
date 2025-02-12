import React from "react";
import ConsoleLoader from "./loader/ConsoleLoader";

export default function UnderConstruction() {
  return (
    <div className="flex flex-col items-center justify-center bg-[#37474f] text-[#cfd8dc] space-y-4 mt-20">
      <h1 className="text-3xl font-bold">Page en construction</h1>
      <p className="text-lg font-semibold">Nous travaillons activement dessus. Revenez plus tard !</p>

      {/* ConsoleLoader */}
      <ConsoleLoader />
    </div>
  );
}
