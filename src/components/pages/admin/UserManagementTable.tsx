import React, { useEffect, useState, useMemo } from "react";
import AddUserModal from "./modal/AddUserModal";
import EditUserModal from "./modal/EditUserModal";
import DeleteUserModal from "./modal/DeleteUserModal";
import DeleteUsersModal from "./modal/DeleteUsersModal";
import { Check, Minus, Plus, X, Pencil, Trash2 } from "lucide-react";
import { supabase } from "../../../lib/supabaseClient";


/**
 * Define user grades.
 */
type Grade = "Patron" | "Co-Patron" | "RH" | "Responsable" | "CDI" | "CDD";

/**
 * Interface for user data.
 */
interface User {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  hire_date: string;
  grade: Grade;
  holidays: boolean;
  warning1: boolean;
  warning2: boolean;
}

/**
 * Props for UserManagementTable.
 */
type UMTProps = {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  selected: string[];
  onSelectedChange: (selected: string[]) => void;
  onDelete: (userIds: string[]) => void;
  onEdit: (user: User) => void;
  processing: boolean;
};

const UMT = ({ users = [], setUsers, selected, onSelectedChange, onDelete, onEdit, processing }: UMTProps) => {
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteMultipleModalOpen, setIsDeleteMultipleModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [clicked, setClicked] = useState(false);
  const [switchStates, setSwitchStates] = useState<{ [key: string]: { holidays: boolean } }>(() => {
    const initialState: { [key: string]: { holidays: boolean } } = {};
    users.forEach(user => {
      initialState[user.id] = {
        holidays: user.holidays,
      };
    });
    return initialState;
  });

  /**
   * Global statistics.
   */
  const totalEmployees = users.length;
  const totalManagers = users.filter(user => user.grade === "Responsable").length;
  const totalCDI = users.filter(user => user.grade === "CDI").length;
  const totalCDD = users.filter(user => user.grade === "CDD").length;

  /**
   * Checks if all users are selected.
   */
  const isAllSelected = selected.length === users.length && users.length > 0;
  const isPartiallySelected = selected.length > 0 && !isAllSelected;

  /**
   * Fetches users' holidays states from Supabase on mount.
   */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase.from("employees").select("*");
        if (error) throw error;

        setSwitchStates(
          Object.fromEntries(data.map(user => [user.id, { holidays: user.holidays }]))
        );
      } catch (error: any) {
        console.error("❌ Error fetching users:", error.message);
      }
    };

    fetchUsers();
  }, []);

  /**
   * Toggles the holidays state of a user and updates Supabase.
   */
  const toggleSwitch = async (userId: string, field: "holidays") => {

    // Ensure the new state is based on the current state
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

    // Update users state without affecting pagination
    setUsers(prevUsers => prevUsers.map(user =>
      user.id === userId ? { ...user, [field]: !user[field] } : user
    ));
  };

  /**
   * Real-time updates from Supabase when users' holidays state changes.
   */
  useEffect(() => {
    const channel = supabase
      .channel("employees-realtime")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "employees" },
        (payload) => {
          setSwitchStates(prev => ({
            ...prev,
            [payload.new.id]: { holidays: payload.new.holidays }
          }));
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  /**
   * Selects all users.
   */
  const handleSelectAll = () => {
    onSelectedChange(isAllSelected ? [] : users.map((u) => u.id));
  };

  /**
   * Selects a single user.
   */
  const handleSelectOne = (id: string) => {
    onSelectedChange(selected.includes(id) ? selected.filter(userId => userId !== id) : [...selected, id]);
  };

  /**
   * Handles pagination.
   */
  const handleChangePage = (newPage: number) => setPage(newPage);

  /**
   * Updates the number of rows per page.
   */
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value === "all" ? filteredUsers.length : parseInt(event.target.value, 10);
    setRowsPerPage(value);
    setPage(0);
  };

  // Click effect handler
  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 300);
  };

  /**
   * Filters users based on the search query.
   */
  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      `${user.first_name} ${user.last_name} ${user.grade} ${user.phone_number}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  /**
   * Format Numbers
   */
  const formatPhoneNumber = (phone: string | number | null): string => {
    if (!phone) return "";
    const cleaned = phone.toString().replace(/\D/g, "");
    return cleaned.length === 10 ? `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}` : phone.toString();
  };

  /**
   * Deletes multiple selected users.
   */
  const handleDeleteMultiple = async () => {
    setUsers(prev => prev.filter(user => !selected.includes(user.id))); // Update users state
    setTimeout(() => {
      onSelectedChange([]);  // Clear selected users
      setSelectedUsers([]);   // Reset selected users array
      setIsDeleteMultipleModalOpen(false); // Close modal
    }, 100);
  };

  /**
   * Returns the corresponding color for each grade.
   */
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "Patron":
      case "Co-Patron":
        return "text-red-400";
      case "RH":
        return "text-violet-400";
      case "Responsable":
        return "text-yellow-400";
      case "CDI":
        return "text-blue-400";
      case "CDD":
        return "text-cyan-400";
      default:
        return "text-white";
    }
  };

  return (
    <div className="overflow-x-auto text-[#cfd8dc] rounded-lg px-2">
      {/* Top Bar with Search and Actions */}
      <div className="flex justify-between items-center">

        {/* Left Section: Search + Selection Reset */}
        <div className="flex items-center w-full space-x-4">
          {/* Button to clear selection */}
          {selected.length > 0 && (
            <button
              className="mr-4 py-2 px-4 flex items-center justify-center rounded-full bg-[#263238] font-semibold hover:bg-gray-800/50"
              onClick={() => {
                setSelectedUsers([]);  // Reset selection state
                onSelectedChange([]);  // Clear selected users
              }}
            >
              <X size={20} />
              <span className="text-white flex items-center">
                {selected.length} sélectionné(s)
              </span>
            </button>
          )}

          {/* Search Input */}
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[20%] p-3 border border-gray-400 rounded-lg bg-transparent text-white focus:outline-none hover:border-gray-300 transition"
          />
        </div>

        {/* Right Section: Add / Delete Buttons */}
        <div className="flex justify-end">
          {selected.length > 0 ? (
            /* Delete Multiple Users */
            <button
              className="bg-red-500 px-4 py-2 rounded-md transition hover:scale-105"
              onClick={() => {
                setSelectedUsers(selected);
                setIsDeleteMultipleModalOpen(true);
                onSelectedChange([...selected]);
              }}
            >
              <Trash2 size={26} />
            </button>
          ) : (
            /* Add New User */
            <button
              className="bg-blue-500 px-4 py-2 rounded-md transition hover:scale-105"
              onClick={() => setIsAddModalOpen(true)}
            >
              <Plus size={26} />
            </button>
          )}
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-[40px_1fr_1fr_1fr_1fr_1fr_100px] gap-4 p-4 rounded-lg items-center text-lg font-semibold">

        {/* Select All Checkbox */}
        <button
          onClick={handleSelectAll}
          className={`w-5 h-5 rounded-full border transition-all flex items-center justify-center
            ${isAllSelected ? "bg-blue-500 border-gray-700 text-white" : "bg-gray-700 border-gray-600"}
          `}
        >
          {isAllSelected ? (
            <Check className="text-white" size={15} />
          ) : isPartiallySelected ? (
            <Minus className="w-5 h-5 bg-blue-500 rounded-full text-white" size={15} />
          ) : null}
        </button>

        {/* Column Headers */}
        <div className="text-center">Grade</div>
        <div>Prénom Nom</div>
        <div className="text-center">Téléphone</div>
        <div className="text-center">Date d'embauche</div>
        <div className="text-center">Congés</div>
        <div className="text-center">Actions</div>
      </div>

      {/* Table Separator */}
      <div className="w-full border border-gray-500"></div>

      {/* User List */}
      <div className="flex flex-col gap-y-2 mt-2">
        {filteredUsers.length === 0 ? (
          <div className="text-center py-4">Aucun utilisateur trouvé.</div>
        ) : (
          filteredUsers
            .slice(page * rowsPerPage, rowsPerPage === filteredUsers.length ? filteredUsers.length : page * rowsPerPage + rowsPerPage)
            .map((user) => (
              <div
                className="grid grid-cols-[40px_1fr_1fr_1fr_1fr_1fr_100px] gap-4 bg-[#263238] text-base border border-gray-600 p-4 rounded-lg items-center"
                key={user.id}
              >
                {/* Selection Checkbox */}
                <button
                  onClick={() => handleSelectOne(user.id)}
                  className={`w-5 h-5 rounded-full border-1 transition-all flex items-center justify-center
                    ${selected.includes(user.id) ? "bg-blue-500 border-gray-700 text-white" : "bg-gray-700 border-gray-600"}
                  `}
                >
                  {selected.includes(user.id) && <Check className="w-4 h-4 text-white" />}
                </button>

                {/* Grade with color */}
                <div className={`w-full text-center font-semibold ${getGradeColor(user.grade)}`}>
                  {user.grade}
                </div>

                {/* Name */}
                <div className="font-semibold">{`${user.first_name} ${user.last_name}`}</div>

                {/* Phone Number */}
                <div className="font-semibold text-center">{formatPhoneNumber(user.phone_number)}</div>

                {/* Hire Date */}
                <div className="font-semibold text-center">{new Date(user.hire_date).toLocaleDateString("fr-FR")}</div>

                {/* Holidays Switch */}
                <div className="text-center">
                  <label className="flex items-center justify-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={switchStates[user.id]?.holidays || false}
                      onChange={() => toggleSwitch(user.id, "holidays")}
                    />
                    <div
                      className={`w-12 h-6 rounded-full p-1 transition ${
                        switchStates[user.id]?.holidays
                          ? "bg-gradient-to-r from-blue-500 to-blue-700"
                          : "bg-[#37474f]"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 bg-[#263238] rounded-full shadow-md transform transition ${
                          switchStates[user.id]?.holidays ? "translate-x-6" : ""
                        }`}
                      />
                    </div>
                  </label>
                </div>

                {/* Actions (Edit / Delete) */}
                <div className="font-semibold text-center flex gap-2 justify-center">
                  {/* Edit Button */}
                  <button
                    className="p-1 rounded-md border border-gray-600 bg-gray-700 hover:bg-gray-600"
                    onClick={() => {
                      setSelectedUser(user);
                      setIsEditModalOpen(true);
                    }}
                  >
                    <Pencil size={22} className="text-blue-400" />
                  </button>

                  {/* Delete Button */}
                  <button
                    className="p-1 rounded-md border border-gray-600 bg-gray-700 hover:bg-gray-600"
                    onClick={() => {
                      setSelectedUser(user);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    <Trash2 size={22} className="text-red-400" />
                  </button>
                </div>
              </div>
            ))
        )}
      </div>

      {/* Separator */}
      <div className="w-full my-6 border border-gray-500"></div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        {/* Previous Page Button */}
        <button
          className="bg-[#263238] px-4 py-2 rounded disabled:opacity-50"
          onClick={() => handleChangePage(page - 1)}
          disabled={page === 0}
        >
          Précédent
        </button>

        {/* Current Page Info */}
        <span>
          Page {page + 1} sur {Math.ceil(filteredUsers.length / rowsPerPage)}
        </span>

        {/* Next Page Button */}
        <button
          className="bg-[#263238] px-4 py-2 rounded disabled:opacity-50"
          onClick={() => handleChangePage(page + 1)}
          disabled={page >= Math.ceil(filteredUsers.length / rowsPerPage) - 1}
        >
          Suivant
        </button>

        {/* Rows per page selection */}
        <select
          className="bg-[#263238] text-white pl-2 pr-4 py-2 rounded"
          value={rowsPerPage === filteredUsers.length ? "all" : rowsPerPage.toString()}
          onChange={handleChangeRowsPerPage}
        >
          <option value="10">10 par page</option>
          <option value="all">Tous</option>
        </select>
      </div>

      {/* Modal: Add Employee */}
      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={() => setIsAddModalOpen(false)} // Close modal after adding
      />

      {/* Modal: Edit Employee */}
      {selectedUser && (
        <EditUserModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onEdit={() => setIsEditModalOpen(false)} // Close modal after editing
          userData={selectedUser}
        />
      )}

      {/* Modal: Delete Single Employee */}
      {selectedUser && (
        <DeleteUserModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => setIsDeleteModalOpen(false)} // Close modal after deletion
          userId={selectedUser.id}
          fullName={`${selectedUser.first_name} ${selectedUser.last_name}`}
          grade={selectedUser.grade}
        />
      )}

      {/* Modal: Delete Multiple Employees */}
      {isDeleteMultipleModalOpen && selectedUsers.length > 0 && (
        <DeleteUsersModal
          isOpen={isDeleteMultipleModalOpen}
          onClose={() => setIsDeleteMultipleModalOpen(false)}
          onConfirm={handleDeleteMultiple} // Function to update users after deletion
          users={selectedUsers
            .map(userId => {
              const user = users.find(u => u.id === userId);
              return user ? { id: user.id, grade: user.grade, name: `${user.first_name} ${user.last_name}` } : null;
            })
            .filter(Boolean)} // Ensure no null values
        />
      )}
    </div>
  );
};

export default UMT;
