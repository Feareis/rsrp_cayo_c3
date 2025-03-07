import React, { useEffect, useState, useMemo } from "react";
import { supabase } from "../../../lib/supabaseClient";


// Defines the structure of an QuotaUser object
interface QuotaUser {
  id: string;
  first_name: string;
  last_name: string;
  grade: "Patron" | "Co-Patron" | "RH" | "Responsable" | "CDI" | "CDD";
  hire_date: string;
  clean_export_sales: number;
  clean_client_sales: number;
  dirty_client_sales: number;
  weekly_quota: boolean;
  weekly_quota_bonus: boolean;
}

// Props for the Admin Dashboard component
type QuotaProps = {
  users: UserType[]; // Make sure UserType is properly imported if used elsewhere
  setUsers: React.Dispatch<React.SetStateAction<UserType[]>>; // Updates the user list in the parent component
  currentUserId: string | null; // Stores the ID of the currently logged-in user
};

const QuotaManagementTable: React.FC<Props> = ({ users, setUsers, currentUserId }) => {
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const itemsPerPage = 10;

  // Store the state of each user's weekly_quota and weekly_quota_bonus switches
  const [switchStates, setSwitchStates] = useState<{ [key: string]: { weekly_quota: boolean; weekly_quota_bonus: boolean } }>(() => {
    const initialState: { [key: string]: { weekly_quota: boolean; weekly_quota_bonus: boolean } } = {};
    users.forEach(user => {
      initialState[user.id] = {
        weekly_quota: user.weekly_quota,
        weekly_quota_bonus: user.weekly_quota_bonus
      };
    });
    return initialState;
  });

  // Fetch users' switch states from Supabase on mount
  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from("employees")
        .select("id, weekly_quota, weekly_quota_bonus, clean_export_sales, clean_client_sales, dirty_client_sales");

      if (error) {
        console.error("❌ Error fetching employees:", error.message);
        return;
      }

      setSwitchStates(
        Object.fromEntries(data.map(user => [user.id, {
          weekly_quota: user.weekly_quota,
          weekly_quota_bonus: user.weekly_quota_bonus
        }]))
      );
    };

    fetchUsers();
  }, []);

  // Toggle switch state and update Supabase
  const toggleSwitch = async (userId: string, field: "weekly_quota" | "weekly_quota_bonus") => {
    if (userId === currentUserId) return;

    // 🔥 Ensure the new state is based on the current state
    setSwitchStates(prev => {
      const newState = !prev[userId][field];

      // Update Supabase
      supabase
        .from("employees")
        .update({ [field]: newState })
        .eq("id", userId)
        .then(({ error }) => {
          if (error) {
            console.error("❌ Error updating switch:", error.message);
          }
        });

      return {
        ...prev,
        [userId]: {
          ...prev[userId],
          [field]: newState
        }
      };
    });

    // 🔥 Update users state without affecting pagination
    setUsers(prevUsers => prevUsers.map(user =>
      user.id === userId ? { ...user, [field]: !user[field] } : user
    ));
  };

  // Handle page change in pagination
  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page selection
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value === "all" ? users.length : 10;
    setRowsPerPage(value);
    setPage(0);
  };

  // Filter users based on search query
  const filteredUsers = users.filter(user =>
    `${user.first_name} ${user.last_name} ${user.grade}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // Format numbers into currency format
  const formatCurrency = (value?: number): string => {
    return `${(value ?? 0).toLocaleString("en-EN", { minimumFractionDigits: 0 })} $`;
  };

  // Assign colors to user grades
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

  // Real-time updates from Supabase when users' weekly_quota or bonus changes
  useEffect(() => {
    const channel = supabase
      .channel("employees-realtime")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "employees" },
        (payload) => {
          setSwitchStates(prev => ({
            ...prev,
            [payload.new.id]: {
              weekly_quota: payload.new.weekly_quota,
              weekly_quota_bonus: payload.new.weekly_quota_bonus,
            }
          }));
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);


  return (
    <div className="text-[#cfd8dc]">
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-[20%] p-3 border border-gray-400 rounded-lg bg-transparent text-white focus:outline-none hover:border-gray-300 transition"
        />
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto rounded-lg px-2">
        {/* Table Header */}
        <div className="grid grid-cols-9 gap-4 p-4 text-lg font-bold">
          <div className="text-center">Grade</div>
          <div>Prénom Nom</div>
          <div className="text-center">Vente Export Propre</div>
          <div className="text-center">Vente Client Propre</div>
          <div className="text-center">Vente Client Sale</div>
          <div className="text-center">Quota</div>
          <div className="text-center">Quota Bonus</div>
          <div className="text-center">Prime</div>
          <div className="text-center">Taxe</div>
        </div>

        <div className="w-full border border-gray-500"></div>

        {/* Table Content */}
        <div className="flex flex-col gap-y-2 mt-2">
          {filteredUsers.length === 0 ? (
            <div className="text-center py-4">Aucun utilisateur trouvé.</div>
          ) : (
            filteredUsers
              .slice(page * rowsPerPage, Math.min((page + 1) * rowsPerPage, users.length)) // Ensure slicing stays within bounds
              .map((user) => (
                <div
                  key={user.id}
                  className="grid grid-cols-9 gap-4 bg-[#263238] text-base border border-gray-600 p-4 rounded-lg items-center"
                >
                  <div className={`font-semibold text-center ${getGradeColor(user.grade)}`}>
                    {user.grade}
                  </div>
                  <div className="font-semibold">{`${user.first_name} ${user.last_name}`}</div>
                  <div className="text-center text-lg font-semibold text-green-400">
                    {formatCurrency(user.clean_export_sales)}
                  </div>
                  <div className="text-center text-lg font-semibold text-green-400">
                    {formatCurrency(user.clean_client_sales)}
                  </div>
                  <div className="text-center text-lg font-semibold text-red-400">
                    {formatCurrency(user.dirty_client_sales)}
                  </div>

                  {/* Switch Quota */}
                  <div className="text-center">
                    <label className="flex items-center justify-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={switchStates[user.id]?.weekly_quota || false}
                        onChange={() => toggleSwitch(user.id, "weekly_quota")}
                        disabled={user.id === currentUserId}
                      />
                      <div
                        className={`w-12 h-6 rounded-full p-1 transition ${
                          switchStates[user.id]?.weekly_quota
                            ? "bg-gradient-to-r from-blue-500 to-blue-700"
                            : "bg-[#37474f]"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 bg-[#263238] rounded-full shadow-md transform transition ${
                            switchStates[user.id]?.weekly_quota ? "translate-x-6" : ""
                          }`}
                        />
                      </div>
                    </label>
                  </div>

                  {/* Switch Quota Bonus */}
                  <div className="text-center">
                    <label className="flex items-center justify-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={switchStates[user.id]?.weekly_quota_bonus || false}
                        onChange={() => toggleSwitch(user.id, "weekly_quota_bonus")}
                        disabled={user.id === currentUserId}
                      />
                      <div
                        className={`w-12 h-6 rounded-full p-1 transition ${
                          switchStates[user.id]?.weekly_quota_bonus
                            ? "bg-gradient-to-r from-purple-500 to-purple-700"
                            : "bg-[#37474f]"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 bg-[#263238] rounded-full shadow-md transform transition ${
                            switchStates[user.id]?.weekly_quota_bonus ? "translate-x-6" : ""
                          }`}
                        />
                      </div>
                    </label>
                  </div>

                  <div className="text-center text-lg font-semibold text-yellow-400">
                    {formatCurrency(user.prime)}
                  </div>
                  <div className="text-center text-lg font-semibold text-red-400">
                    {formatCurrency(user.tax)}
                  </div>
                </div>
              ))
          )}
        </div>
      </div>

      {/* Pagination Controls */}
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

export default QuotaManagementTable;
