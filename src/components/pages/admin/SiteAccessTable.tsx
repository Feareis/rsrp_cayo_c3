import React, { useEffect, useState, useMemo, useCallback } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { RefreshCcw } from "lucide-react";

/**
 * Interface defining the structure of an access user.
 */
interface AccessUser {
  id: string;
  first_name: string;
  last_name: string;
  grade: "Patron" | "Co-Patron" | "RH" | "Responsable" | "CDI" | "CDD";
  role: "admin" | "limited_admin" | "user";
  username: string;
  is_active: boolean;
}

/**
 * Props for the SiteAccessTable component.
 */
type SiteAccessProps = {
  users: AccessUser[];
  setUsers: React.Dispatch<React.SetStateAction<AccessUser[]>>;
};

const SiteAccessTable: React.FC<SiteAccessProps> = ({ users, setUsers }) => {
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // State for tracking switch statuses
  const [switchStates, setSwitchStates] = useState<{ [key: string]: { is_active: boolean } }>({});

  /**
   * Fetches user access states from Supabase on component mount.
   */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase.from("access").select("*");
        if (error) throw error;

        setSwitchStates(
          Object.fromEntries(data.map(user => [user.id, { is_active: user.is_active }]))
        );
      } catch (error: any) {
        console.error("❌ Error fetching access:", error.message);
      }
    };

    fetchUsers();
  }, []);

  /**
   * Toggles the is_active state of a user and updates Supabase.
   */
  const toggleSwitch = useCallback(async (userId: string) => {
    try {
      setSwitchStates(prev => {
        const newState = !prev[userId].is_active;

        // Update Supabase
        supabase
          .from("access")
          .update({ is_active: newState })
          .eq("id", userId)
          .then(({ error }) => {
            if (error) console.error("❌ Error updating switch:", error.message);
          });

        return { ...prev, [userId]: { is_active: newState } };
      });

      // Update users state without affecting pagination
      setUsers(prevUsers =>
        prevUsers.map(user => (user.id === userId ? { ...user, is_active: !user.is_active } : user))
      );
    } catch (error: any) {
      console.error("❌ Error toggling switch:", error.message);
    }
  }, [setUsers]);

  /**
   * Fetches the default password from Supabase.
   */
  const fetchDefaultPassword = async () => {
    try {
      const { data, error } = await supabase
        .from("data")
        .select("value")
        .eq("key", "default_password_hash")
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;

      return data.value;
    } catch (error: any) {
      console.error("❌ Error fetching default password:", error.message);
      return null;
    }
  };

  /**
   * Resets a user's password to the default value stored in Supabase.
   */
  const handleResetPassword = useCallback(async (userId: string) => {
    try {
      const defaultPassword = await fetchDefaultPassword();
      if (!defaultPassword) return;

      const { error } = await supabase.from("access").update({ password_hash: defaultPassword }).eq("id", userId);
      if (error) throw error;

    } catch (error: any) {
      console.error("❌ Error resetting password:", error.message);
    }
  }, []);

  /**
   * Filters users based on the search query.
   */
  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      `${user.first_name} ${user.last_name} ${user.grade}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  /**
   * Assigns colors based on user grades.
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
   * Assigns colors based on user roles.
   */
  const getRoleColor = (role: string) => {
    return role === "admin"
      ? "text-red-400"
      : role === "limited_admin"
      ? "text-purple-400"
      : "text-blue-400";
  };

  /**
   * Handles pagination.
   */
  const handleChangePage = (newPage: number) => setPage(newPage);

  /**
   * Updates the number of rows per page.
   */
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value === "all" ? users.length : 10;
    setRowsPerPage(value);
    setPage(0);
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
