import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import { supabase } from "../../../lib/supabaseClient";

/**
 * Type definition for weekly goals.
 */
type WeeklyGoals = {
  clean_export_sales: number;
  clean_client_sales: number;
};

/**
 * Progress component displays weekly sales goals and real-time progress.
 */
const Progress = () => {
  const [goals, setGoals] = useState<WeeklyGoals | null>(null);
  const [exportSales, setExportSales] = useState(0);
  const [clientSales, setClientSales] = useState(0);
  const [loading, setLoading] = useState(true);

  /**
   * Fetches weekly goal and sales data from Supabase.
   */
  const fetchData = async () => {
    try {
      const [{ data: goalData, error: goalError }, { data: exportData, error: exportError }, { data: clientData, error: clientError }] = await Promise.all([
        supabase.from("data").select("value").eq("key", "weekly_goal").single(),
        supabase.from("employees").select("clean_export_sales"),
        supabase.from("employees").select("clean_client_sales"),
      ]);

      if (goalError) console.error("Error loading weekly goal:", goalError);
      if (exportError) console.error("Error loading export sales:", exportError);
      if (clientError) console.error("Error loading client sales:", clientError);

      if (goalData) setGoals(goalData.value);

      setExportSales(calculateTotal(exportData, "clean_export_sales"));
      setClientSales(calculateTotal(clientData, "clean_client_sales"));
    } catch (error) {
      console.error("Unexpected error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Calculates total sales from fetched data.
   */
  const calculateTotal = (data: any[], field: string): number => {
    return data ? data.reduce((sum, row) => sum + (row[field] || 0), 0) : 0;
  };

  useEffect(() => {
    fetchData();

    // Realtime subscriptions for employees and weekly goals
    const employeeSubscription = supabase
      .channel("realtime-employees")
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "employees" }, fetchData)
      .subscribe();

    const dataSubscription = supabase
      .channel("realtime-data")
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "data" }, fetchData)
      .subscribe();

    return () => {
      supabase.removeChannel(employeeSubscription);
      supabase.removeChannel(dataSubscription);
    };
  }, []);

  return (
    <div
      className="flex flex-col items-center w-full p-6 bg-[#263238]
      border border-gray-500 rounded-xl shadow-xl justify-center gap-12"
    >
      <h2 className="text-2xl font-bold text-center text-gray-400">
        Objectif de la semaine - ($) Entreprise
      </h2>

      <div className="flex flex-col w-full gap-8 pb-4">
        {loading ? (
          <p className="text-gray-400 text-center">Chargement...</p>
        ) : goals ? (
          <>
            <ProgressBar
              title="Vente Export"
              value={exportSales}
              min={0}
              max={goals.clean_export_sales}
              color="bg-green-600/80"
            />
            <ProgressBar
              title="Vente Client"
              value={clientSales}
              min={0}
              max={goals.clean_client_sales}
              color="bg-blue-600/80"
            />
          </>
        ) : (
          <p className="text-gray-400 text-center">Pas d'Objectifs</p>
        )}
      </div>
    </div>
  );
};

export default Progress;
