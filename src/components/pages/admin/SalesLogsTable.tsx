import React, { useEffect, useState, useMemo, useCallback } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

/**
 * Interface defining the structure of a sales log.
 */
interface SalesLog {
  uuid: string;
  created_at: string;
  first_name: string;
  last_name: string;
  grade: string;
  type: string;
  sale_type: string;
  discount: number | null;
  total_employee_money: number;
  total_company_money: number;
}

const SalesLogsTable: React.FC = () => {
  const [salesLogs, setSalesLogs] = useState<SalesLog[]>([]);
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  /**
   * Fetches sales logs from Supabase on component mount.
   */
  useEffect(() => {
    const fetchSalesLogs = async () => {
      try {
        const { data, error } = await supabase
          .from("sales_logs")
          .select("uuid, created_at, first_name, last_name, type, sale_type, discount, total_employee_money, total_company_money, employees(grade)")
          .order("created_at", { ascending: false });

        if (error) throw error;

        const formattedData = data.map((log) => ({
          uuid: log.uuid,
          created_at: new Date(log.created_at).toLocaleString("fr-FR"),
          first_name: log.first_name,
          last_name: log.last_name,
          grade: log.employees?.grade || "N/A",
          type: log.type,
          sale_type: log.sale_type,
          discount: log.discount,
          total_employee_money: log.total_employee_money,
          total_company_money: log.total_company_money,
        }));

        setSalesLogs(formattedData);
      } catch (error: any) {
        console.error("❌ Error fetching sales logs:", error.message);
        toast.error("Impossible de charger les logs.");
      }
    };

    fetchSalesLogs();
  }, []);

  /**
   * Deletes a sale log from the database.
   */
  const handleDelete = useCallback(async (uuid: string) => {
    try {
      const { error } = await supabase.from("sales_logs").delete().eq("uuid", uuid);
      if (error) throw error;

      setSalesLogs((prev) => prev.filter((log) => log.uuid !== uuid));
      toast.success("Vente supprimée !");
    } catch (error: any) {
      console.error("❌ Error deleting sale:", error.message);
      toast.error("Échec de la suppression.");
    }
  }, []);

  /**
   * Returns the corresponding color for a given employee grade.
   */
  const getGradeColor = (grade: string) => {
    return grade === "Patron" || grade === "Co-Patron"
      ? "text-red-400"
      : grade === "RH"
      ? "text-violet-400"
      : grade === "Responsable"
      ? "text-yellow-400"
      : grade === "CDI"
      ? "text-blue-400"
      : grade === "CDD"
      ? "text-cyan-400"
      : "text-white";
  };

  /**
   * Filters sales logs based on the search query.
   */
  const filteredSales = useMemo(() => {
    return salesLogs.filter((data) =>
      `${data.first_name} ${data.last_name} ${data.grade}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [salesLogs, searchQuery]);

  /**
   * Handles pagination.
   */
  const totalPages = Math.ceil(filteredSales.length / rowsPerPage);
  const paginatedSales = useMemo(() => {
    return filteredSales.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  }, [filteredSales, page, rowsPerPage]);

  /**
   * Updates the current page.
   */
  const handleChangePage = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  /**
   * Updates the number of rows per page.
   */
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value === "all" ? filteredSales.length : parseInt(event.target.value);
    setRowsPerPage(value);
    setPage(0); // Reset to first page
  };

  /**
   * Returns the corresponding color for a sale type.
   */
  const getSaleColor = (type: string, saleType: string) => {
    if (type === "export" && saleType === "clean") return "text-green-400";
    if (type === "client" && saleType === "clean") return "text-green-400";
    if (type === "client" && saleType === "dirty") return "text-red-400";
    return "text-gray-400"; // Default
  };

  /**
   * Formats a number into a currency string.
   */
  const formatCurrency = (value: number): string => {
    return `${value.toLocaleString("en-EN")} $`;
  };

  return (
    <div className="text-[#cfd8dc]">
      {/* Barre de recherche */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-[20%] p-3 border border-gray-400 rounded-lg bg-transparent text-white focus:outline-none hover:border-gray-300 transition"
        />
      </div>

      <div className="overflow-x-auto rounded-lg">
        {/* En-tête du tableau */}
        <div className="grid grid-cols-7 gap-4 p-4 text-lg font-bold">
          <div className="text-center">Date</div>
          <div>Nom Employé</div>
          <div className="text-center">Type de Vente</div>
          <div className="text-center">Réduction</div>
          <div className="text-center">Total Employé</div>
          <div className="text-center">Total Entreprise</div>
          <div className="text-center">Actions</div>
        </div>

        <div className="w-full border border-gray-500"></div>

        {/* Contenu du tableau */}
        <div className="flex flex-col gap-y-2 mt-2">
          {paginatedSales.map((log) => (
            <div
              key={log.uuid}
              className="grid grid-cols-7 gap-4 bg-[#263238] text-base border border-gray-600 p-4 rounded-lg items-center"
            >
              <div className="text-center font-semibold">{log.created_at}</div>
              <div className={`font-bold text-lg ${getGradeColor(log.grade)}`}>
                {log.first_name} {log.last_name}
              </div>
              <div className={`text-center font-bold ${getSaleColor(log.type, log.sale_type)}`}>{log.type === "export" ? "Export" : "Client"} {log.sale_type === "clean" ? "Propre" : "Sale"}</div>
              <div className="text-center">{log.discount ?? ""}</div>
              <div className="text-center text-lg text-green-400 font-bold">{formatCurrency(log.total_employee_money)}</div>
              <div className="text-center text-lg text-blue-400 font-bold">{formatCurrency(log.total_company_money)}</div>
              <div className="font-semibold text-center flex gap-2 justify-center">
                <button
                  className="p-1 rounded-md border border-gray-600 bg-gray-700 hover:bg-gray-600"
                  onClick={() => handleDelete(log.uuid)}
                >
                  <Trash2 size={22} className="text-red-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contrôles de pagination */}
      <div className="flex items-center justify-between mt-4">
        <button
          className="bg-[#263238] px-4 py-2 rounded disabled:opacity-50"
          onClick={() => handleChangePage(page - 1)}
          disabled={page === 0}
        >
          Précédent
        </button>
        <span>
          Page {page + 1} sur {totalPages}
        </span>
        <button
          className="bg-[#263238] px-4 py-2 rounded disabled:opacity-50"
          onClick={() => handleChangePage(page + 1)}
          disabled={page >= totalPages - 1}
        >
          Suivant
        </button>
        <select
          className="bg-[#263238] text-white pl-2 pr-4 py-2 rounded"
          value={rowsPerPage === filteredSales.length ? "all" : rowsPerPage}
          onChange={handleChangeRowsPerPage}
        >
          <option value="10">10 par page</option>
          <option value="all">Tous</option>
        </select>
      </div>
    </div>
  );
};

export default SalesLogsTable;
