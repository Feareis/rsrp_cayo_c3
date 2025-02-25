import React, { useState, useMemo } from "react";
import CustomSwitch from "../../../components/core/CustomSwitch";

interface AdminUser {
  id: string;
  first_name: string;
  lastName: string;
  grade: "Patron" | "Co-Patron" | "RH" | "Responsable" | "CDI" | "CDD";
  cleanExportSales: number;
  cleanClientSales: number;
  dirtyClientSales: number;
  quota: boolean;
  quotaBonus: boolean;
  prime: number;
  tax: number;
}

type AdminDashboardProps = {
  users: AdminUser[];
};

const AdminDashboardManagementTable = ({ users = [] }: AdminDashboardProps) => {
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const itemsPerPage = 10;
  const [switchStates, setSwitchStates] = useState<Record<string, { weekly_quota: boolean; weekly_quota_bonus: boolean }>>(
    Object.fromEntries(users.map(user => [user.id, { weekly_quota: user.weekly_quota, weekly_quota_bonus: user.weekly_quota_bonus }]))
  );

  const toggleSwitch = (userId: string, field: "weekly_quota" | "weekly_quota_bonus") => {
    setSwitchStates(prev => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        [field]: !prev[userId][field],
      }
    }));
  };

  const handleChangePage = (newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value === "all" ? users.length : 10;
    setRowsPerPage(value);
    setPage(0);
  };

  const filteredUsers = users.filter(user =>
    `${user.firstName} ${user.lastName} ${user.grade} ${user.phone}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const formatCurrency = (value?: number): string => {
    return `${(value ?? 0).toLocaleString("en-EN", { minimumFractionDigits: 0 })} $`;
  };

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

      {/* Tableau */}
      <div className="overflow-x-auto rounded-lg px-2">
        <div className="flex justify-between p-4 items-center text-lg font-semibold">
          <div className="w-[12%] text-center">Grade</div>
          <div className="w-[15%]">Prénom Nom</div>
          <div className="w-[12%] text-center">Vente Export Propre</div>
          <div className="w-[12%] text-center">Vente Client Propre</div>
          <div className="w-[12%] text-center">Vente Client Sale</div>
          <div className="w-[10%] text-center">Quota</div>
          <div className="w-[10%] text-center">Quota Bonus</div>
          <div className="w-[12%] text-center">Prime</div>
          <div className="w-[12%] text-center">Taxe</div>
        </div>

        <div className="w-full border border-gray-500"></div>

        <div className="flex flex-col gap-y-2 mt-2">
          {filteredUsers.length === 0 ? (
            <div className="text-center py-4">Aucun utilisateur trouvé.</div>
          ) : (
             filteredUsers.slice(page * rowsPerPage, rowsPerPage === users.length ? users.length : page * rowsPerPage + rowsPerPage).map((user) => (
              <div key={user.id} className="flex justify-between bg-[#263238] text-base border border-gray-600 p-4 rounded-lg flex items-center">
                <div className={`w-[12%] text-center font-semibold ${getGradeColor(user.grade)}`}>
                  {user.grade}
                </div>
                <div className="w-[15%]">{`${user.first_name} ${user.last_name}`}</div>
                <div className="w-[12%] text-center font-semibold text-green-400">{formatCurrency(user.CleanExportSales)}</div>
                <div className="w-[12%] text-center font-semibold text-green-400">{formatCurrency(user.CleanClientSales)}</div>
                <div className="w-[12%] text-center font-semibold text-red-400">{formatCurrency(user.DirtyClientSales)}</div>

                {/* Switch Quota */}
                <div className="w-[10%] text-center">
                  <label className="flex items-center justify-center cursor-pointer">
                    <input type="checkbox" className="hidden" checked={switchStates[user.id]?.weekly_quota || false} onChange={() => toggleSwitch(user.id, "weekly_quota")} />
                    <div className={`w-12 h-6 rounded-full p-1 transition ${switchStates[user.id]?.weekly_quota ? "bg-gradient-to-r from-blue-500 to-blue-700" : "bg-[#37474f]"}`}>
                      <div className={`w-4 h-4 bg-[#263238] rounded-full shadow-md transform transition ${switchStates[user.id]?.weekly_quota ? "translate-x-6" : ""}`} />
                    </div>
                  </label>
                </div>

                {/* Switch Quota Bonus */}
                <div className="w-[10%] text-center">
                  <label className="flex items-center justify-center cursor-pointer">
                    <input type="checkbox" className="hidden" checked={switchStates[user.id]?.weekly_quota_bonus || false} onChange={() => toggleSwitch(user.id, "weekly_quota_bonus")} />
                    <div className={`w-12 h-6 rounded-full p-1 transition ${switchStates[user.id]?.weekly_quota_bonus ? "bg-gradient-to-r from-purple-500 to-purple-700" : "bg-[#37474f]"}`}>
                      <div className={`w-4 h-4 bg-[#263238] rounded-full shadow-md transform transition ${switchStates[user.id]?.weekly_quota_bonus ? "translate-x-6" : ""}`} />
                    </div>
                  </label>
                </div>

                <div className="w-[12%] text-center font-semibold text-yellow-400">{formatCurrency(user.prime)}</div>
                <div className="w-[12%] text-center font-semibold text-red-400">{formatCurrency(user.tax)}</div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <button
          className="bg-[#263238] px-4 py-2 rounded disabled:opacity-50"
          onClick={() => handleChangePage(page - 1)}
          disabled={page === 0}
        >
          Précédent
        </button>
        <span>
          Page {page + 1} sur {Math.ceil(users.length / rowsPerPage)}
        </span>
        <button
          className="bg-[#263238] px-4 py-2 rounded disabled:opacity-50"
          onClick={() => handleChangePage(page + 1)}
          disabled={page >= Math.ceil(users.length / rowsPerPage) - 1}
        >
          Suivant
        </button>
        <select
          className="bg-[#263238] text-white pl-2 pr-4 py-2 rounded"
          value={rowsPerPage === users.length ? "all" : "10"}
          onChange={handleChangeRowsPerPage}
        >
          <option value="10">10 par page</option>
          <option value="all">Tous</option>
        </select>
      </div>
    </div>
  );
};

export default AdminDashboardManagementTable;
