import React, { useState } from "react";
import AddUserModal from "../modal/AddUserModal";
import EditUserModal from "../modal/EditUserModal";
import DeleteUserModal from "../modal/DeleteUserModal";
import DeleteUsersModal from "../modal/DeleteUsersModal";
import { Check, Minus, EllipsisVertical, Plus, X, Pencil, Trash2 } from "lucide-react";
import CustomSwitch from "../../../../components/core/CustomSwitch";


interface User {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  hireDate: string;
  grade: "Patron" | "Co-Patron" | "RH" | "Responsable" | "CDI" | "CDD";
  holidays: boolean;
  warning1: boolean;
  warning2: boolean;
}

type UserTableProps = {
  users: User[];
  selected: string[];
  onSelectedChange: (selected: string[]) => void;
  onDelete: (userIds: string[]) => void;
  onEdit: (user: User) => void;
  processing: boolean;
};

const UserTable = ({ users = [], selected, onSelectedChange, onDelete, onEdit, processing }: UserTableProps) => {
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteMultipleModalOpen, setIsDeleteMultipleModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [switchStates, setSwitchStates] = useState<Record<string, { leaves: boolean; warning1: boolean; warning2: boolean }>>(
    Object.fromEntries(users.map(user => [user.id, { leaves: user.leaves, warning1: user.warning1, warning2: user.warning2 }]))
  );

  const totalEmployees = users.length;
  const totalManagers = users.filter(user => user.grade === "Responsable").length;
  const totalCDI = users.filter(user => user.grade === "CDI").length;
  const totalCDD = users.filter(user => user.grade === "CDD").length;

  const isAllSelected = selected.length === users.length && users.length > 0;
  const isPartiallySelected = selected.length > 0 && !isAllSelected;

  const toggleSwitch = (userId: string, field: "leaves" | "warning1" | "warning2") => {
    setSwitchStates(prev => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        [field]: !prev[userId][field],
      }
    }));
  };

  const handleSelectAll = () => {
    if (isAllSelected) {
      onSelectedChange([]);
    } else {
      onSelectedChange(users.map((u) => u.id));
    }
  };

  const handleSelectOne = (id: string) => {
    onSelectedChange(
      selected.includes(id)
        ? selected.filter((userId) => userId !== id)
        : [...selected, id]
    );
  };

  const handleChangePage = (newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value === "all" ? users.length : 10;
    setRowsPerPage(value);
    setPage(0);
  };

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 300);
  };

  const [clicked, setClicked] = useState(false);

  const filteredUsers = users.filter(user =>
    `${user.first_name} ${user.last_name} ${user.grade} ${user.phone_number}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const formatPhoneNumber = (phone: string | number | null): string => {
    if (!phone) return "";

    const cleaned = phone.toString().replace(/\D/g, "");

    if (cleaned.length !== 10) {
      return phone.toString();
    }

    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  };


  return (
    <div className="overflow-x-auto text-[#cfd8dc] rounded-lg px-2">
      <div className="flex justify-between items-center">
        <div className="w-full flex items-center space-x-4">
          {selected.length > 0 && (
            <button className="mr-4 py-2 px-4 flex items-center justify-center rounded-full bg-[#263238] font-semibold hover:bg-gray-800/50" onClick={() => onSelectedChange([])}>
              <X size={20} />
              <span className="text-white flex items-center">
                {selected.length} sélectionné(s)
              </span>
            </button>
          )}
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[20%] p-3 border border-gray-400 rounded-lg bg-transparent text-white focus:outline-none hover:border-gray-300 transition"
          />
        </div>

        <div className="text-[#cfd8dc] rounded-lg flex justify-center items-center text-center">
          <div className="flex w-full justify-end">
            {selected.length > 0 ? (
              <button
                className="bg-red-500 px-4 py-2 rounded-md transition hover:scale-105"
                onClick={() => {
                  setSelectedUsers(selected);
                  setIsDeleteMultipleModalOpen(true);
                }}
              >
                <Trash2 size={26} />
              </button>
            ) : (
              <button
                className="bg-blue-500 px-4 py-2 rounded-md transition hover:scale-105"
                onClick={() => setIsAddModalOpen(true)}
              >
                <Plus size={26} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex p-4 rounded-lg items-center text-lg font-semibold">
        <button
          onClick={handleSelectAll}
          className={`w-5 h-5 rounded-full border-1 transition-all flex items-center justify-center
            ${isAllSelected ? "bg-blue-500 border-gray-700 text-white" : "bg-gray-700 border-gray-600"}
          `}
        >
          {isAllSelected ? <Check className="text-white" size={15} /> : isPartiallySelected ? <Minus className="w-5 h-5 bg-blue-500 rounded-full text-white" size={15} /> : null}
        </button>
        <div className="w-[15%] text-center">Grade</div>
        <div className="w-[15%]">Prénom Nom</div>
        <div className="w-[15%] text-center">Téléphone</div>
        <div className="w-[15%] text-center">Date d'embauche</div>
        <div className="w-[10%] text-center">Congés</div>
        <div className="w-[10%] text-center">1er Avertissement</div>
        <div className="w-[10%] text-center">2ème Avertissement</div>
        <div className="w-[10%] text-center">Actions</div>
      </div>

      <div className="w-full border border-gray-500"></div>

      <div className="flex flex-col gap-y-2 mt-2">
        {filteredUsers.length === 0 ? (
          <div className="text-center py-4">Aucun utilisateur trouvé.</div>
        ) : (
          filteredUsers.slice(page * rowsPerPage, rowsPerPage === users.length ? users.length : page * rowsPerPage + rowsPerPage).map((user) => (
            <div key={user.id} className="bg-[#263238] text-base border border-gray-600 p-4 rounded-lg flex items-center">
              <button
                onClick={() => handleSelectOne(user.id)}
                className={`w-5 h-5 rounded-full border-1 transition-all flex items-center justify-center
                  ${selected.includes(user.id) ? "bg-blue-500 border-gray-700 text-white" : "bg-gray-700 border-gray-600"}
                `}
              >
                {selected.includes(user.id) && <Check className="w-4 h-4 text-white" />}
              </button>

              <div className={`w-[15%] text-center font-semibold ${
                user.grade === "Patron" || user.grade === "Co-Patron"
                  ? "text-red-400"
                  : user.grade === "RH"
                  ? "text-violet-400"
                  : user.grade === "Responsable"
                  ? "text-yellow-400"
                  : user.grade === "CDI"
                  ? "text-blue-400"
                  : user.grade === "CDD"
                  ? "text-cyan-400"
                  : "text-white"
              }`}>
                {user.grade}
              </div>
              <div className="w-[15%]">{`${user.first_name} ${user.last_name}`}</div>
              <div className="w-[15%] text-center">{formatPhoneNumber(user.phone_number)}</div>
              <div className="w-[15%] text-center">{new Date(user.hire_date).toLocaleDateString("fr-FR")}</div>
              <div className="w-[10%] text-center">
                <label className="flex items-center justify-center cursor-pointer">
                  <input type="checkbox" className="hidden" checked={switchStates[user.id]?.holidays || false} onChange={() => toggleSwitch(user.id, "holidays")} />
                  <div className={`w-12 h-6 rounded-full p-1 transition ${switchStates[user.id]?.holidays ? "bg-gradient-to-r from-blue-500 to-blue-700" : "bg-[#37474f]"}`}>
                    <div className={`w-4 h-4 bg-[#263238] rounded-full shadow-md transform transition ${switchStates[user.id]?.holidays ? "translate-x-6" : ""}`} />
                  </div>
                </label>
              </div>

              <div className="w-[10%] text-center">
                <label className="flex items-center justify-center cursor-pointer">
                  <input type="checkbox" className="hidden" checked={switchStates[user.id]?.warning1 || false} onChange={() => toggleSwitch(user.id, "warning1")} />
                  <div className={`w-12 h-6 rounded-full p-1 transition ${switchStates[user.id]?.warning1 ? "bg-gradient-to-r from-yellow-500 to-yellow-700" : "bg-[#37474f]"}`}>
                    <div className={`w-4 h-4 bg-[#263238] rounded-full shadow-md transform transition ${switchStates[user.id]?.warning1 ? "translate-x-6" : ""}`} />
                  </div>
                </label>
              </div>

              <div className="w-[10%] text-center">
                <label className="flex items-center justify-center cursor-pointer">
                  <input type="checkbox" className="hidden" checked={switchStates[user.id]?.warning2 || false} onChange={() => toggleSwitch(user.id, "warning2")} />
                  <div className={`w-12 h-6 rounded-full p-1 transition ${switchStates[user.id]?.warning2 ? "bg-gradient-to-r from-red-500 to-red-700" : "bg-[#37474f]"}`}>
                    <div className={`w-4 h-4 bg-[#263238] rounded-full shadow-md transform transition ${switchStates[user.id]?.warning2 ? "translate-x-6" : ""}`} />
                  </div>
                </label>
              </div>
              <div className="w-[10%] text-center flex gap-2 justify-center">
                {/* Bouton Modifier */}
                <button
                  className="p-1 rounded-md border border-gray-600 bg-gray-700 hover:bg-gray-600"
                  onClick={() => {
                    setSelectedUser(user);
                    setIsEditModalOpen(true);
                  }}
                >
                  <Pencil size={22} className="text-blue-400" />
                </button>

                {/* Bouton Supprimer */}
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

      <div className="w-full my-6 border border-gray-500"></div>

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

      {/* Modal Ajouter un employé */}
      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={(user) => {
          console.log("Ajouté :", user);
          setIsAddModalOpen(false);
        }}
      />

      {/* Modal Modifier un employé */}
      {selectedUser && (
        <EditUserModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onEdit={(updatedUser) => {
            console.log("Modifié :", updatedUser);
            setIsEditModalOpen(false);
          }}
          userData={selectedUser}
        />
      )}

      {/* Modal Supprimer un employé */}
      {selectedUser && (
        <DeleteUserModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => {
            console.log("Supprimé :", selectedUser);
            setIsDeleteModalOpen(false);
          }}
          userName={`${selectedUser.first_name} ${selectedUser.last_name}`}
          grade={selectedUser.grade}
        />
      )}

      {/* Modal Supprimer plusieurs employés */}
      {selectedUsers.length > 0 && (
        <DeleteUsersModal
          isOpen={isDeleteMultipleModalOpen}
          onClose={() => setIsDeleteMultipleModalOpen(false)}
          onConfirm={() => {
            console.log("Supprimés :", selectedUsers);
            setIsDeleteMultipleModalOpen(false);
          }}
          users={selectedUsers
            .map((userId) => {
              const user = users.find((u) => u.id === userId);
              return user ? { grade: user.grade, name: `${user.first_name} ${user.last_name}` } : null;
            })
            .filter(Boolean)} // Filtrer pour éviter les valeurs null
        />
      )}
    </div>
  );
};

export default UserTable;
