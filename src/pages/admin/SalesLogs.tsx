import React, { useMemo, useEffect, useState } from "react";
import SalesLogsTable from "../../components/pages/admin/SalesLogsTable";
import { supabase } from "../../lib/supabaseClient";

const SalesLogs = () => {
  const [salesLogs, setSalesLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Récupérer les logs de ventes avec le grade des employés
  useEffect(() => {
    const fetchSalesLogs = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("sales_logs")
        .select("uuid, created_at, first_name, last_name, type, sale_type, discount, total_employee_money, total_company_money, employees(grade)")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("❌ Erreur lors de la récupération des logs de ventes :", error.message);
      } else {
        setSalesLogs(data || []);
      }
      setLoading(false);
    };

    fetchSalesLogs();
  }, []);

  // Écouter les mises à jour en temps réel
  useEffect(() => {
    const channel = supabase
      .channel("sales-logs-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "sales_logs" },
        (payload) => {
          setSalesLogs((prevLogs) => {
            if (payload.eventType === "INSERT") {
              return [payload.new, ...prevLogs];
            } else if (payload.eventType === "UPDATE") {
              return prevLogs.map((log) => (log.uuid === payload.new.uuid ? payload.new : log));
            } else if (payload.eventType === "DELETE") {
              return prevLogs.filter((log) => log.uuid !== payload.old.uuid);
            }
            return prevLogs;
          });
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  // Trier les logs par date (du plus récent au plus ancien)
  const sortedSalesLogs = useMemo(() => {
    return [...salesLogs].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, [salesLogs]);


  return (
    <div className="text-[#cfd8dc]">
      {/* Statistiques */}
      <div className="flex justify-between mb-6 gap-4">
        {/* Total Ventes */}
        <div className="bg-[#37474f] border border-gray-600 p-4 rounded-lg shadow-lg w-full text-center">
          <p className="text-lg font-semibold">Total Ventes</p>
          <p className="text-2xl font-bold text-green-400">{salesLogs.length}</p>
        </div>

        {/* Total Vente Export (Nombre de ventes) */}
        <div className="bg-[#37474f] border border-gray-600 p-4 rounded-lg shadow-lg w-full text-center">
          <p className="text-lg font-semibold">Total Vente Export</p>
          <p className="text-2xl font-bold text-emerald-400">
            {salesLogs.filter((log) => log.type === "export").length}
          </p>
        </div>

        {/* Total Vente Client (Nombre de ventes) */}
        <div className="bg-[#37474f] border border-gray-600 p-4 rounded-lg shadow-lg w-full text-center">
          <p className="text-lg font-semibold">Total Vente Client</p>
          <p className="text-2xl font-bold text-teal-400">
            {salesLogs.filter((log) => log.type === "client").length}
          </p>
        </div>

        {/* Total Argent Employés */}
        <div className="bg-[#37474f] border border-gray-600 p-4 rounded-lg shadow-lg w-full text-center">
          <p className="text-lg font-semibold">Total Argent Employés</p>
          <p className="text-2xl font-bold text-green-400">
            {salesLogs.reduce((acc, log) => acc + log.total_employee_money, 0).toLocaleString()} $
          </p>
        </div>

        {/* Total Argent Entreprise */}
        <div className="bg-[#37474f] border border-gray-600 p-4 rounded-lg shadow-lg w-full text-center">
          <p className="text-lg font-semibold">Total Argent Entreprise</p>
          <p className="text-2xl font-bold text-blue-400">
            {salesLogs.reduce((acc, log) => acc + log.total_company_money, 0).toLocaleString()} $
          </p>
        </div>
      </div>

      {/* Tableau des logs */}
      {loading ? (
        <p className="text-center text-lg">Chargement...</p>
      ) : (
        <SalesLogsTable salesLogs={sortedSalesLogs} setSalesLogs={setSalesLogs} />
      )}
    </div>
  );
};

export default SalesLogs;
