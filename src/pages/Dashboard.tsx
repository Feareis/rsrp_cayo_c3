import React, { useState, useMemo } from "react";
import RedistributionTable from "../components/pages/dashboard/RedistributionTable";
import TopSalesTable from "../components/pages/dashboard/TopSalesTable";
import EmployeeBento from "../components/pages/dashboard/EmployeeBento";
import DateBento from "../components/pages/dashboard/DateBento";
import QuotaBento from "../components/pages/dashboard/QuotaBento";
import WarningBento from "../components/pages/dashboard/WarningBento";
import { useAuth } from "../context/AuthContext";

// Format currency function (avoiding repetition inside components)
const formatCurrency = (value?: number): string =>
  typeof value === "number" && value >= 0 ? `${value.toLocaleString("en-EN", { minimumFractionDigits: 0 })} $` : "-";

// InfoCard component with explicit props type
interface InfoCardProps {
  label: string;
  value?: number;
  textColor: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ label, value, textColor }) => {
  return (
    <div className="flex flex-col bg-[#263238] border border-gray-500/70 p-4 rounded-xl shadow-xl text-center w-full">
      <p className="text-gray-400/90 text-lg font-bold">{label}</p>
      <p className={`text-xl font-bold ${textColor}`}>{formatCurrency(value)}</p>
    </div>
  );
};

export default function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("Semaine en cours");

  // Memoized employee data to prevent unnecessary re-renders
  const employee = useMemo(() => user?.employee, [user]);

  return (
    <div className="flex flex-col items-center text-[#cfd8dc] w-full gap-8">
      {/* High Container */}
      <div className="flex flex-row w-full">
        {/* Left Section */}
        <div className="flex flex-col w-full gap-10">
          {/* Employee + Date Bento */}
          <div className="flex flex-row gap-10 w-full">
            <EmployeeBento />
            <DateBento />
          </div>

          {/* Info + Display Card Section */}
          <div className="flex flex-row gap-10 w-full">
            <div className="flex flex-col w-[70%] h-200 p-4 bg-[#263238] border border-gray-500 rounded-xl shadow-2xl gap-2">
              {/* Tabs en haut */}
              <div className="flex gap-2 mb-6">
                {["Semaine en cours", "Semaine passée"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-full transition-all duration-300 ${
                      activeTab === tab ? "bg-[#37474f] text-white" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* First Tabs */}
              {activeTab === "Semaine en cours" && (
                <div className="flex flex-col items-center gap-16 p-4">
                  {/* Section des Totaux & Quotas */}
                  <div className="relative flex flex-col w-full gap-4 bg-[#37474f] border border-gray-500/60 p-2 py-4 rounded-xl">
                    <p className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#263238] border border-gray-500 rounded-xl shadow-xl px-3 py-1 text-gray-400 text-xl font-bold">
                      Paye
                    </p>
                    {/* Section Prime & Taxe */}
                    <div className="flex flex-row justify-between gap-8 w-full p-4 py-4">
                      <InfoCard label="Prime" value={50000} textColor="text-green-500/80" />
                      <InfoCard label="Taxe" value={2000} textColor="text-red-400/80" />
                    </div>
                  </div>

                  {/* Section Détails & Totaux */}
                  <div className="relative flex flex-col flex-1 w-full gap-4 bg-[#37474f] border border-gray-500/60 p-2 py-4 rounded-xl">
                    <p className="absolute top-0 left-1/8 -translate-x-1/2 -translate-y-1/2 bg-[#263238] border border-gray-500 rounded-xl shadow-xl px-3 py-1 text-gray-400 text-xl font-bold">
                      Détails & Totaux
                    </p>
                    <div className="flex flex-col gap-16 justify-between w-full p-8">
                      {/* Sales Details */}
                      <div className="flex flex-row justify-between gap-6 w-full">
                        <InfoCard label="Vente Export Propre" value={employee?.clean_export_sales} textColor="text-green-500/80" />
                        <InfoCard label="Vente Client Propre" value={employee?.clean_client_sales} textColor="text-green-500/80" />
                        <InfoCard label="Vente Client Sale" value={employee?.dirty_client_sales} textColor="text-red-400/80" />
                      </div>

                      {/* Totals */}
                      <div className="flex flex-row justify-between gap-6 w-full">
                        <InfoCard label="Total Empoché - Employé(e)" value={employee?.total_clean_money_employee} textColor="text-green-500/80" />
                        <InfoCard label="Total Généré - Entreprise" value={employee?.total_clean_money_enterprise} textColor="text-green-500/80" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Second Tabs */}
              {activeTab === "Semaine passée" && (
                <div className="flex flex-col justify-around items-center gap-16 p-4">
                  <div className="relative flex flex-col w-full gap-4 bg-[#37474f] border border-gray-500/60 p-2 py-4 rounded-xl">
                    <p className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#263238] border border-gray-500 rounded-xl shadow-xl px-3 py-1 text-gray-400 text-xl font-bold">
                      Paye
                    </p>
                    <div className="flex flex-row justify-between gap-8 w-full p-4 py-4">
                      <InfoCard label="Prime" value={employee?.last_weekly_prime} textColor="text-green-500/80" />
                      <InfoCard label="Taxe" value={employee?.last_weekly_tax} textColor="text-red-400/80" />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col justify-between w-[30%] gap-10">
              <QuotaBento />
              <WarningBento />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
