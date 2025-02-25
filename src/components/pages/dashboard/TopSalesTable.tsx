import React from "react";
import { BrowserWarn } from "../../../components/core/BrowserWarn";
import { AlertCircle } from "lucide-react";

interface TopSalesTableProps {
  title: string;
  sales: { name: string; amount: string }[];
}

const TopSalesTable: React.FC<TopSalesTableProps> = ({ title, sales }) => {
  return (
    <div className="flex flex-col w-[50%] p-4">
      <h3 className="text-lg text-center font-bold mb-2 text-yellow-400">{title}</h3>
      <BrowserWarn
        color="blue"
        icon={<AlertCircle size={20} />}
        message="Récompenses"
        details={["tet / tat / tot"]}
      />
      <div className="grid grid-cols-2 gap-2 text-center">
        {sales.slice(0, 3).map((sale, index) => (
          <React.Fragment key={index}>
            <p className="font-bold">{sale.name}</p>
            <p className="font-semibold text-green-400">{sale.amount}</p>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default TopSalesTable;
