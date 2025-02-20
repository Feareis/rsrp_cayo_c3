import React, { useEffect, useState } from "react";
import DynamicInput from "../../../../components/core/DynamicInput";
import CustomSelect from "../../../../components/core/CustomSelect";
import { User, Briefcase, Phone, Calendar } from "lucide-react";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (updatedUser: any) => void;
  userData: any; // L'utilisateur sélectionné à modifier
}

const EditUserModal: React.FC<EditUserModalProps> = ({ isOpen, onClose, onEdit, userData }) => {
  const gradeOptions = ["Patron", "Co-Patron", "RH", "Responsable", "CDI", "CDD"];
  const [editedUser, setEditedUser] = useState(userData);

  // Charger les données utilisateur au moment de l'ouverture
  useEffect(() => {
    if (isOpen && userData) {
      setEditedUser(userData);
    }
  }, [isOpen, userData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-20 backdrop-blur-xs">
      <div className="bg-[#263238] text-[#cfd8dc] flex flex-col justify-between border border-gray-500 p-6 rounded-xl w-[25%] h-[50%] shadow-xl">
        <h2 className="text-2xl font-bold">Modifier l'employé</h2>

        {/* Inputs avec DynamicInput */}
        <div className="flex flex-col gap-8">
          <CustomSelect
            icon={Briefcase}
            label="Grade"
            options={gradeOptions}
            value={editedUser?.grade || ""}
            onChange={(value) => setEditedUser({ ...editedUser, grade: value })}
            bgColor="bg-[#263238]"
            textColor="text-[#cfd8dc]"
          />

          {/* Ligne avec Prénom et Nom */}
          <div className="flex flex-row gap-8">
            <DynamicInput
              type="text"
              icon={User}
              label="Prénom"
              bgColor="bg-[#263238]"
              textColor="text-[#cfd8dc]"
              value={editedUser?.firstName || ""}
              onChange={(value) => setEditedUser({ ...editedUser, firstName: value })}
            />
            <DynamicInput
              type="text"
              icon={User}
              label="Nom"
              bgColor="bg-[#263238]"
              textColor="text-[#cfd8dc]"
              value={editedUser?.lastName || ""}
              onChange={(value) => setEditedUser({ ...editedUser, lastName: value })}
            />
          </div>

          <DynamicInput
            type="text"
            icon={Phone}
            label="Téléphone"
            placeholder="Téléphone format 0000000000 (eg. 4809765435)"
            bgColor="bg-[#263238]"
            textColor="text-[#cfd8dc]"
            value={editedUser?.phone || ""}
            onChange={(value) => setEditedUser({ ...editedUser, phone: value })}
          />
          <DynamicInput
            type="date"
            icon={Calendar}
            label="Date d'embauche"
            bgColor="bg-[#263238]"
            textColor="text-[#cfd8dc]"
            value={editedUser?.hireDate || ""}
            onChange={(value) => setEditedUser({ ...editedUser, hireDate: value })}
          />
        </div>

        {/* Boutons */}
        <div className="flex justify-end gap-4 text-white">
          <button className="px-4 py-2 bg-gray-500 hover:bg-gray-500/60 rounded-xl" onClick={onClose}>
            Annuler
          </button>
          <button
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600/80 rounded-xl"
            onClick={() => {
              onEdit(editedUser); // Envoi des modifications
              onClose(); // Fermeture de la modal après modification
            }}
          >
            Modifier
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
