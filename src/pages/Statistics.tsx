import React from "react";
import TopSalesTable from "../components/pages/dashboard/TopSalesTable";
import RedistributionTable from "../components/pages/dashboard/RedistributionTable";


export default function Statistics() {
  return (
    <div className="w-full">
      <div className="flex flex-row w-full gap-8">
        <div className="w-[60%] bg-[#263238] border border-gray-600 rounded-xl shadow-lg p-4">
          <div className="flex flex-row w-full">
            <TopSalesTable
              title="Meilleures Ventes Export"
              sales={[
                { name: "Alice Dupont", amount: "$12,500" },
                { name: "Jean Durand", amount: "$9,750" },
                { name: "Sophie Martin", amount: "$8,200" },
              ]}
            />
            <TopSalesTable
              title="Meilleures Ventes Clients"
              sales={[
                { name: "Paul Lemaitre", amount: "$10,300" },
                { name: "Emma Lefevre", amount: "$7,850" },
                { name: "Lucas Morel", amount: "$6,900" },
              ]}
            />
          </div>
        </div>
        <div className={`flex flex-col w-[40%] justify-center`}>
          <RedistributionTable />
        </div>
      </div>
    </div>
  );
}
