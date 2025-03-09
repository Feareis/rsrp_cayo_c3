import React, { useState, useEffect, useMemo } from "react";
import RedistributionTable from "../components/pages/dashboard/RedistributionTable";
import TopSalesTable from "../components/pages/dashboard/TopSalesTable";
import EmployeeBento from "../components/pages/dashboard/EmployeeBento";
import DateBento from "../components/pages/dashboard/DateBento";
import QuotaBento from "../components/pages/dashboard/QuotaBento";
import WarningBento from "../components/pages/dashboard/WarningBento";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabaseClient";

// Function to format currency
const formatCurrency = (value?: number): string =>
  typeof value === "number" && value >= 0 ? `${value.toLocaleString("en-EN", { minimumFractionDigits: 0 })} $` : "-";

// InfoCard component
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
  const [employeeData, setEmployeeData] = useState(user?.employee || null);
  const [quotaData, setQuotaData] = useState<{ quota_value: number; quota_bonus_value: number } | null>(null);
  const [activeTab, setActiveTab] = useState("Semaine en cours");
  const [redistributionRates, setRedistributionRates] = useState<Record<string, number> | null>(null);
  const [redistributionTax, setRedistributionTax] = useState<Record<string, number> | null>(null);
  const [loadingRates, setLoadingRates] = useState(true);
  const [loadingTax, setLoadingTax] = useState(true);
  const cleanExportSales = useMemo(() => employeeData?.clean_export_sales || 0, [employeeData]);
  const cleanClientSales = useMemo(() => employeeData?.clean_client_sales || 0, [employeeData]);
  const dirtyClientSales = useMemo(() => employeeData?.dirty_client_sales || 0, [employeeData]);
  const totalCleanMoneyEmployee = useMemo(() => employeeData?.total_clean_money_employee || 0, [employeeData]);
  const totalCleanMoneyEnterprise = useMemo(() => {
    return (employeeData?.clean_export_sales || 0) + (employeeData?.clean_client_sales || 0);
  }, [employeeData]);
  const lastWeeklyPrime = useMemo(() => employeeData?.last_weekly_prime || 0, [employeeData]);
  const lastWeeklyTax = useMemo(() => employeeData?.last_weekly_tax || 0, [employeeData]);

  // Memoized employee data to prevent unnecessary re-renders
  const employee = useMemo(() => user?.employee, [user]);

  useEffect(() => {
    if (!user?.employee_id) return;

    // Fetch data employee from "employees" table
    const fetchEmployeeData = async () => {
      const { data, error } = await supabase
        .from("employees")
        .select("*")
        .eq("id", user.employee_id)
        .single();

      if (error) {
        console.error("Erreur lors de la récupération des données employé:", error);
        return;
      }

      setEmployeeData(data);
    };

    fetchEmployeeData();

    // Realtime listener for employee updates
    const employeeSubscription = supabase
      .channel("realtime-employee")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "employees", filter: `id=eq.${user.employee_id}` },
        (payload) => {
          console.log("Employee updated:", payload.new);
          setEmployeeData(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(employeeSubscription);
    };
  }, [user?.employee_id]);

  // Fetch quotaData from "data" table
  useEffect(() => {
    const fetchQuotaData = async () => {
      try {
        const { data, error } = await supabase
          .from("data")
          .select("value")
          .eq("key", "quota_information")
          .single();

        if (error) throw error;
        if (data?.value) {
          setQuotaData(data.value);
        }
      } catch (err) {
        console.error("Error fetching quotas:", err);
      }
    };

    fetchQuotaData();

    // Realtime subscription for `data` table
    const dataSubscription = supabase
      .channel("realtime-data")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "data", filter: "key=eq.quota_information" },
        (payload) => {
          fetchQuotaData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(dataSubscription);
    };
  }, []);

  // Fetch redistribution rates from "data" table
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const { data, error } = await supabase
          .from("data")
          .select("value")
          .eq("key", "redistribution_rates")
          .single();

        if (error) throw error;
        if (data?.value) setRedistributionRates(data.value);
      } catch (err) {
        console.error("Error fetching redistribution rates:", err);
      } finally {
        setLoadingRates(false);
      }
    };

    fetchRates();
  }, []);

  // Fetch redistribution tax from "data" table
  useEffect(() => {
    const fetchTax = async () => {
      try {
        const { data, error } = await supabase
          .from("data")
          .select("value")
          .eq("key", "redistribution_tax")
          .single();

        if (error) throw error;
        if (data?.value) {
          setRedistributionTax(data.value);
        }
      } catch (err) {
        console.error("Error fetching redistribution tax:", err);
      } finally {
        setLoadingTax(false);
      }
    };

    fetchTax();
  }, []);

  // Compute prime dynamically
  const prime = useMemo(() => {
    if (!employeeData || !redistributionRates || !quotaData) return 0;

    const trpg = parseFloat(redistributionRates[employeeData.grade]) || 0;
    const totalSales = (employeeData.clean_export_sales || 0) + (employeeData.clean_client_sales || 0);

    // Accès aux bonnes valeurs
    const quotaValue = quotaData.quota?.value || 0;
    const quotaBonusValue = quotaData.quota_bonus?.value || 0;

    if (employeeData.weekly_quota) {
      if (employeeData.weekly_quota_bonus) {
        console.log("new prime :", quotaValue + quotaBonusValue + totalSales * trpg);
        return quotaValue + quotaBonusValue + totalSales * trpg;
      }
      console.log("new prime :", quotaValue + totalSales * trpg);
      return quotaValue + totalSales * trpg;
    }

    return 0;
  }, [employeeData, redistributionRates, quotaData]);

  // Compute tax dynamically
  const tax = useMemo(() => {
    if (!employeeData || !redistributionTax) return 0;

    const dirtyClientSales = employeeData.dirty_client_sales || 0;
    const trsg = parseFloat(redistributionTax["dirty_client_sales"]) || 0;

    return dirtyClientSales > 0 ? dirtyClientSales * trsg : 0;
  }, [employeeData, redistributionTax]);


  return (
    <div className="flex flex-col w-full gap-10">
      {/* Employee + Date Bento */}
      <div className="flex flex-row gap-10 w-full">
        <EmployeeBento />
        <DateBento />
      </div>

      {/* Info + Display Card Section */}
      <div className="flex flex-row gap-10 w-full">
        <div className="flex flex-col w-[70%] h-auto p-4 bg-[#263238] border border-gray-500 rounded-xl shadow-2xl gap-2">
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
                  <InfoCard label="Prime" value={prime} textColor="text-green-500/80" />
                  <InfoCard label="Taxe" value={tax} textColor="text-red-400/80" />
                </div>
              </div>

              {/* Section Détails & Totaux */}
              <div className="relative flex flex-col flex-1 w-full gap-4 bg-[#37474f] border border-gray-500/60 p-2 py-4 rounded-xl">
                <p className="absolute top-0 left-1/8 -translate-x-1/2 -translate-y-1/2 bg-[#263238] border border-gray-500 rounded-xl shadow-xl px-3 py-1 text-gray-400 text-xl font-bold">
                  Détails & Totaux
                </p>
                <div className="flex flex-col gap-16 justify-around w-full p-8">
                  {/* Sales Details */}
                  <div className="flex flex-row justify-between gap-6 w-full">
                    <InfoCard label="Vente Export Propre" value={cleanExportSales} textColor="text-green-500/80" />
                    <InfoCard label="Vente Client Propre" value={cleanClientSales} textColor="text-green-500/80" />
                    <InfoCard label="Vente Client Sale" value={dirtyClientSales} textColor="text-red-400/80" />
                  </div>

                  {/* Totals */}
                  <div className="flex flex-row justify-between gap-6 w-full">
                    <InfoCard label="Total Généré - Entreprise" value={totalCleanMoneyEnterprise} textColor="text-green-500/80" />
                    <InfoCard label="Total Empoché - Employé(e)" value={totalCleanMoneyEmployee} textColor="text-teal-500/90" />
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
                  <InfoCard label="Prime" value={lastWeeklyPrime} textColor="text-green-500/80" />
                  <InfoCard label="Taxe" value={lastWeeklyTax} textColor="text-red-400/80" />
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
  );
}
