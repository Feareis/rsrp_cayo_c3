import DisplayCard from "../components/pages/dashboard/DisplayCard";
import { DollarSign, Coffee } from "lucide-react";


export default function Dashboard() {
  const formatCurrency = (value: number): string => {
    return `${value.toLocaleString("en-EN", { minimumFractionDigits: 0 })} $`;
  };

  return (
    <div className="grid grid-cols-4 gap-4 px-4 justify-center">
      <div></div>
      <DisplayCard
        title="Quota de la Semaine"
        icon={<DollarSign className="w-6 h-6 text-green-500/70" />}
        text1={formatCurrency(43000)}
        text2="250 Plateau"
      />
      <DisplayCard
        title="Quota Bonus"
        icon={<Coffee className="w-6 h-6 text-orange-400/70" />}
        text1={formatCurrency(63000)}
        text2="300 Plateau"
      />
      <div></div>
    </div>
  );
}
