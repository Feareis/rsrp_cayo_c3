import React, { useEffect, useState, useMemo } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { RefreshCcw } from "lucide-react";

// Interface pour les utilisateurs ayant un accès
interface AccessUser {
  id: string;
  first_name: string;
  last_name: string;
  grade: "Patron" | "Co-Patron" | "RH" | "Responsable" | "CDI" | "CDD";
  role: "admin" | "limited_admin" | "user";
  username: string;
  is_active: boolean;
}

// Props pour le tableau
type SiteAccessProps = {
  users: AccessUser[];
  setUsers: React.Dispatch<React.SetStateAction<AccessUser[]>>;
};

const SiteAccessTable: React.FC<SiteAccessProps> = ({ users, setUsers }) => {
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const itemsPerPage = 10;

  // Store the state of each user's is_active switches
  const [switchStates, setSwitchStates] = useState<{ [key: string]: { is_active: boolean } }>(() => {
    const initialState: { [key: string]: { is_active: boolean } } = {};
    users.forEach(user => {
      initialState[user.id] = {
        is_active: user.is_active,
      };
    });
    return initialState;
  });

  // Fetch users' switch states from Supabase on mount
  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from("access")
        .select("*");

      if (error) {
        console.error("❌ Error fetching access:", error.message);
        return;
      }

      setSwitchStates(
        Object.fromEntries(data.map(user => [user.id, {
          is_active: user.is_active
        }]))
      );
    };

    fetchUsers();
  }, []);

  // Toggle switch state and update Supabase
  const toggleSwitch = async (userId: string, field: "is_active") => {

    // Ensure the new state is based on the current state
    setSwitchStates(prev => {
      const newState = !prev[userId][field];

      // Update Supabase
      supabase
        .from("access")
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

    // Update users state without affecting pagination
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

  // Assign colors to user grades
  const getRoleColor = (role: string) => {
    return role === "Patron" || role === "Co-Patron"
      ? "text-red-400"
      : role === "admin"
      ? "text-red-400"
      : role === "limited_admin"
      ? "text-purple-400"
      : role === "user"
      ? "text-blue-400"
      : "text-white";
  };

  // Real-time updates from Supabase when users' weekly_quota or bonus changes
  useEffect(() => {
    const channel = supabase
      .channel("access-realtime")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "access" },
        (payload) => {
          setSwitchStates(prev => ({
            ...prev,
            [payload.new.id]: {
              is_active: payload.new.is_active,
            }
          }));
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  // Get default password
  const fetchDefaultPassword = async () => {
    const { data, error } = await supabase
      .from("data")
      .select("value")
      .eq("key", "default_password_hash")
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("❌ Erreur lors de la récupération du mot de passe par défaut :", error.message);
      return null;
    }

    if (!data) {
      console.warn("⚠️ Aucun mot de passe par défaut trouvé.");
      return null;
    }

    return data.value;
  };

  const handleResetPassword = async (userId: string) => {
    const defaultPassword = await fetchDefaultPassword();
    if (!defaultPassword) return;

    const { error } = await supabase
      .from("access")
      .update({ password_hash: defaultPassword }) // Update password_hash
      .eq("id", userId);

    if (error) {
      console.error("❌ Erreur lors de la réinitialisation du mot de passe :", error.message);
      return;
    }

    console.log(`✅ Mot de passe réinitialisé pour l'utilisateur ${userId}`);
  };


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
        <div className="grid grid-cols-6 gap-4 p-4 text-lg font-bold">
          <div className="text-center">Grade</div>
          <div className="text-center">Rôle</div>
          <div>Prénom Nom</div>
          <div>Identifiant</div>
          <div className="text-center">Actif ?</div>
          <div className="text-center">Reset Mot de passe</div>
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
                  className="grid grid-cols-6 gap-4 bg-[#263238] text-base border border-gray-600 p-4 rounded-lg items-center"
                >
                  <div className={`font-semibold text-center ${getGradeColor(user.grade)}`}>
                    {user.grade}
                  </div>
                  <div className={`font-semibold text-center ${getRoleColor(user.role)}`}>
                    {user.role}
                  </div>
                  <div className="font-semibold">{`${user.first_name} ${user.last_name}`}</div>
                  <div className="font-semibold">{user.username}</div>
                  
                  {/* Switch Active */}
                  <div className="text-center">
                    <label className="flex items-center justify-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={switchStates[user.id]?.is_active || false}
                        onChange={() => toggleSwitch(user.id, "is_active")}
                      />
                      <div
                        className={`w-12 h-6 rounded-full p-1 transition ${
                          switchStates[user.id]?.is_active
                            ? "bg-gradient-to-r from-green-500 to-green-700"
                            : "bg-gradient-to-r from-red-400 to-red-600/60"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 bg-[#263238] rounded-full shadow-md transform transition ${
                            switchStates[user.id]?.is_active ? "translate-x-6" : ""
                          }`}
                        />
                      </div>
                    </label>
                  </div>
                  {/* Actions (Reset Password) */}
                  <div className="font-semibold text-center flex gap-2 justify-center">
                    <button
                      className="p-1 rounded-md border border-gray-600 bg-gray-700 hover:bg-gray-600"
                      onClick={() => handleResetPassword(user.id)}
                    >
                      <RefreshCcw size={22} className="text-blue-400" />
                    </button>
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

export default SiteAccessTable;
