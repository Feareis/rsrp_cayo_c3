import React, { useState } from "react";
import { Check, Minus, EllipsisVertical, Plus, X, Trash2 } from "lucide-react";
import CustomSwitch from "../../../../components/core/CustomSwitch";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  hireDate: string;
  grade: "Patron" | "Co-Patron" | "RH" | "Responsable" | "CDI" | "CDD";
  leaves: boolean;
  firstWarning: boolean;
  secondWarning: boolean;
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
  const [switchStates, setSwitchStates] = useState<Record<string, { leaves: boolean; firstWarning: boolean; secondWarning: boolean }>>(
    Object.fromEntries(users.map(user => [user.id, { leaves: user.leaves, firstWarning: user.firstWarning, secondWarning: user.secondWarning }]))
  );

  const totalEmployees = users.length;
  const totalManagers = users.filter(user => user.grade === "Responsable").length;
  const totalCDI = users.filter(user => user.grade === "CDI").length;
  const totalCDD = users.filter(user => user.grade === "CDD").length;

  const isAllSelected = selected.length === users.length && users.length > 0;
  const isPartiallySelected = selected.length > 0 && !isAllSelected;

  const toggleSwitch = (userId: string, field: "leaves" | "firstWarning" | "secondWarning") => {
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
    `${user.firstName} ${user.lastName} ${user.grade} ${user.phone}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

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
                onClick={() => onDelete(selected)}
              >
                <Trash2 size={26} />
              </button>
            ) : (
              <button
                className="bg-blue-500 px-4 py-2 rounded-md transition hover:scale-105"
                onClick={handleClick}
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
            <div key={user.id} className="bg-[#263238] text-base p-4 rounded-lg flex items-center">
              <button
                onClick={() => handleSelectOne(user.id)}
                className={`w-5 h-5 rounded-full border-1 transition-all flex items-center justify-center
                  ${selected.includes(user.id) ? "bg-blue-500 border-gray-700 text-white" : "bg-gray-700 border-gray-600"}
                `}
              >
                {selected.includes(user.id) && <Check className="w-4 h-4 text-white" />}
              </button>

              <div className="w-[15%] text-center">{user.grade}</div>
              <div className="w-[15%]">{`${user.firstName} ${user.lastName}`}</div>
              <div className="w-[15%] text-center">{user.phone}</div>
              <div className="w-[15%] text-center">{new Date(user.hireDate).toLocaleDateString("fr-FR")}</div>
              <div className="w-[10%] text-center">
                <label className="flex items-center justify-center cursor-pointer">
                  <input type="checkbox" className="hidden" checked={switchStates[user.id]?.leaves || false} onChange={() => toggleSwitch(user.id, "leaves")} />
                  <div className={`w-12 h-6 rounded-full p-1 transition ${switchStates[user.id]?.leaves ? "bg-gradient-to-r from-blue-500 to-blue-700" : "bg-[#37474f]"}`}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition ${switchStates[user.id]?.leaves ? "translate-x-6" : ""}`} />
                  </div>
                </label>
              </div>

              <div className="w-[10%] text-center">
                <label className="flex items-center justify-center cursor-pointer">
                  <input type="checkbox" className="hidden" checked={switchStates[user.id]?.firstWarning || false} onChange={() => toggleSwitch(user.id, "firstWarning")} />
                  <div className={`w-12 h-6 rounded-full p-1 transition ${switchStates[user.id]?.firstWarning ? "bg-gradient-to-r from-yellow-500 to-yellow-700" : "bg-[#37474f]"}`}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition ${switchStates[user.id]?.firstWarning ? "translate-x-6" : ""}`} />
                  </div>
                </label>
              </div>

              <div className="w-[10%] text-center">
                <label className="flex items-center justify-center cursor-pointer">
                  <input type="checkbox" className="hidden" checked={switchStates[user.id]?.secondWarning || false} onChange={() => toggleSwitch(user.id, "secondWarning")} />
                  <div className={`w-12 h-6 rounded-full p-1 transition ${switchStates[user.id]?.secondWarning ? "bg-gradient-to-r from-red-500 to-red-700" : "bg-[#37474f]"}`}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition ${switchStates[user.id]?.secondWarning ? "translate-x-6" : ""}`} />
                  </div>
                </label>
              </div>
              <div className="w-[10%] text-center relative">
                <button className="px-2 py-1" onClick={() => setMenuOpen(menuOpen === user.id ? null : user.id)}>
                  <EllipsisVertical size={20} />
                </button>
                {menuOpen === user.id && (
                  <div className="absolute left-0 bg-gray-700 rounded shadow-md z-20">
                    <button className="block px-4 py-2 hover:bg-gray-600 w-full" onClick={() => onEdit(user)}>
                      Modifier
                    </button>
                    <button className="block px-4 py-2 hover:bg-gray-600 w-full" onClick={() => onDelete([user.id])}>
                      Supprimer
                    </button>
                  </div>
                )}
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
          className="bg-gray-700 text-white px-2 py-1 rounded"
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

export default UserTable;
