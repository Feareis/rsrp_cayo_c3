import TotalCard from "./TotalCard";
import TotalER from "./TotalER";
import { CheckCircle } from "lucide-react";

type TotalSalesProps = {
  employeesTotal: number;
  companyTotal: number;
};

const formatCurrency = (value: number): string => {
  return `${value.toLocaleString("en-EN")} $`;
};

const TotalSales: React.FC<TotalSalesProps> = ({ employeesTotal, companyTotal }) => {
  return (
    <div className="flex flex-col flex-1 items-center p-8 bg-[#263238] border border-gray-500 rounded-xl shadow-2xl gap-12">
      <h2 className="text-2xl font-bold text-center text-gray-400">Visualisation & Totaux</h2>
      <div className="flex flex-col w-full gap-4">
        <div className="flex flex-row w-full gap-8">
          <TotalCard title="Part Employé" value={formatCurrency(employeesTotal)} commentary="Dans vos poches (F2)" textColor="text-green-400" />
          <TotalCard title="Part Entreprise" value={formatCurrency(companyTotal)} commentary="Dans le coffre de l'entreprise" />
        </div>
      </div>
    </div>
  );
};

export default TotalSales;
