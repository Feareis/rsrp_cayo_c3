import React, { useEffect, useState } from "react";
import DynamicInput from "../../../../components/core/DynamicInput";
import CustomSelect from "../../../../components/core/CustomSelect";
import { User, Briefcase, Phone, Calendar } from "lucide-react";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: (user: any) => void;
  onAdd: (user: any) => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, onAdd }) => {
  const initialUserState = { grade: "", firstName: "", lastName: "", phone: "", hireDate: "" };
  const [user, setUser] = useState(initialUserState);
  const gradeOptions = ["Patron", "Co-Patron", "RH", "Responsable", "CDI", "CDD"];

  // Réinitialiser les champs quand la modal se ferme
  useEffect(() => {
    if (!isOpen) {
      setUser(initialUserState);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-20 backdrop-blur-xs">
      <div className="bg-[#263238] text-[#cfd8dc] flex flex-col justify-between border border-gray-500 p-6 rounded-xl w-[25%] h-[50%] shadow-xl">
        <h2 className="text-2xl font-bold">Ajouter un employé</h2>

        {/* Inputs avec DynamicInput */}
        <div className="flex flex-col gap-8">
          <CustomSelect
            icon={Briefcase}
            label="Grade"
            options={gradeOptions}
            value={user.grade}
            onChange={(value) => setUser({ ...user, grade: value })}
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
              value={user.firstName}
              onChange={(value) => setUser({ ...user, firstName: value })}
            />
            <DynamicInput
              type="text"
              icon={User}
              label="Nom"
              bgColor="bg-[#263238]"
              textColor="text-[#cfd8dc]"
              value={user.lastName}
              onChange={(value) => setUser({ ...user, lastName: value })}
            />
          </div>

          <DynamicInput
            type="text"
            icon={Phone}
            label="Téléphone"
            placeholder="Téléphone format 0000000000 (eg. 4809765435)"
            bgColor="bg-[#263238]"
            textColor="text-[#cfd8dc]"
            value={user.phone}
            onChange={(value) => setUser({ ...user, phone: value })}
          />
          <DynamicInput
            type="date"
            icon={Calendar}
            label="Date d'embauche"
            bgColor="bg-[#263238]"
            textColor="text-[#cfd8dc]"
            value={user.hireDate}
            onChange={(value) => setUser({ ...user, hireDate: value })}
          />
        </div>

        <div className="flex justify-end gap-4 text-white">
          <button className="px-4 py-2 bg-gray-500 hover:bg-gray-500/60 rounded-xl" onClick={onClose}>Annuler</button>
          <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600/80 rounded-xl" onClick={() => onAdd(user)}>Ajouter</button>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
