import { useEffect, useState } from "react";
import TopSalesTable from "./TopSalesTable";
import Reward from "./Reward";
import { supabase } from "../../../lib/supabaseClient";

/**
 * Defines the Employee structure.
 */
interface Employee {
  first_name: string;
  last_name: string;
  grade: string;
  clean_export_sales: number;
  clean_client_sales: number;
}

/**
 * Defines the Rewards structure.
 */
interface Rewards {
  1: string;
  2: string;
  3: string;
}

/**
 * TopSales component displays the ranking of the best sellers.
 */
const TopSales = () => {
  const [exportSales, setExportSales] = useState<Employee[]>([]);
  const [clientSales, setClientSales] = useState<Employee[]>([]);
  const [exportRewards, setExportRewards] = useState<Rewards>({ 1: "..", 2: "..", 3: ".." });
  const [clientRewards, setClientRewards] = useState<Rewards>({ 1: "..", 2: "..", 3: ".." });

  /**
   * Formats numbers into currency.
   */
  const formatCurrency = (value: number): string => {
    return `${value.toLocaleString("en-EN", { minimumFractionDigits: 0 })} $`;
  };

  /**
   * Fetches top sales employees from Supabase.
   */
  const fetchTopSales = async () => {
    try {
      const { data, error } = await supabase
        .from("employees")
        .select("first_name, last_name, grade, clean_export_sales, clean_client_sales");

      if (error) throw error;
      if (!data) return;

      const sortedExportSales = [...data].sort((a, b) => b.clean_export_sales - a.clean_export_sales);
      const sortedClientSales = [...data].sort((a, b) => b.clean_client_sales - a.clean_client_sales);

      /**
       * Formats employee data into a structured list.
       */
      const formatData = (employees: Employee[], key: keyof Employee) =>
        employees
          .filter(emp => Number(emp[key]) > 0)
          .slice(0, 3)
          .map(emp => ({
            name: `${emp.first_name} ${emp.last_name}`,
            grade: emp.grade,
            amount: formatCurrency(emp[key] as number),
          }));

      setExportSales(formatData(sortedExportSales, "clean_export_sales"));
      setClientSales(formatData(sortedClientSales, "clean_client_sales"));
    } catch (err) {
      console.error("SQL Error (Top Sales):", err);
    }
  };

  /**
   * Fetches rewards data from Supabase.
   */
  const fetchRewards = async () => {
    try {
      const { data, error } = await supabase
        .from("data")
        .select("key, value")
        .in("key", ["best_clean_export_sales", "best_clean_client_sales"]);

      if (error) throw error;
      if (!data) return;

      const rewardsMap: Record<string, Rewards> = {
        best_clean_export_sales: { 1: "..", 2: "..", 3: ".." },
        best_clean_client_sales: { 1: "..", 2: "..", 3: ".." },
      };

      data.forEach(({ key, value }) => {
        rewardsMap[key] = {
          1: formatCurrency(value?.["1"] || 0),
          2: formatCurrency(value?.["2"] || 0),
          3: formatCurrency(value?.["3"] || 0),
        };
      });

      setExportRewards(rewardsMap["best_clean_export_sales"]);
      setClientRewards(rewardsMap["best_clean_client_sales"]);
    } catch (err) {
      console.error("SQL Error (Rewards):", err);
    }
  };

  useEffect(() => {
    fetchTopSales();
    fetchRewards();

    // Realtime subscription for employees
    const employeeSubscription = supabase
      .channel("realtime-employees")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "employees" },
        fetchTopSales
      )
      .subscribe();

    // Realtime subscription for data (rewards)
    const dataSubscription = supabase
      .channel("realtime-data")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "data" },
        fetchRewards
      )
      .subscribe();

    return () => {
      supabase.removeChannel(employeeSubscription);
      supabase.removeChannel(dataSubscription);
    };
  }, []);

  return (
    <div
      className="flex flex-col items-center w-full p-6 bg-[#263238]
      border border-gray-500 rounded-xl shadow-xl gap-12"
    >
      <h2 className="text-2xl font-bold text-center text-gray-400">
        Classement meilleurs vendeurs
      </h2>
      <div className="flex flex-row w-full gap-8">
        <Reward amounts={exportRewards} />
        <Reward amounts={clientRewards} />
      </div>
      <div className="flex flex-row w-full gap-8">
        <TopSalesTable title="Ventes Export" sales={exportSales} percentageColor="propre" />
        <TopSalesTable title="Ventes Clients" sales={clientSales} percentageColor="propre" />
      </div>
    </div>
  );
};

export default TopSales;
