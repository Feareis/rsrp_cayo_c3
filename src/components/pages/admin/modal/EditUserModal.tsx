import React, { useEffect, useState } from "react";
import DynamicInput from "../../../../components/core/DynamicInput";
import CustomSelect from "../../../../components/core/CustomSelect";
import { User, Briefcase, Phone, Calendar } from "lucide-react";
import { supabase } from "../../../../lib/supabaseClient";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (updatedUser: any) => void;
  userData: any; // Selected user data for editing
}

const EditUserModal: React.FC<EditUserModalProps> = ({ isOpen, onClose, onEdit, userData }) => {
  const gradeOptions = ["Patron", "Co-Patron", "RH", "Responsable", "CDI", "CDD"];
  const [editedUser, setEditedUser] = useState(userData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Load user data when the modal opens
  useEffect(() => {
    if (isOpen && userData) {
      setEditedUser(userData);
    }
  }, [isOpen, userData]);

  if (!isOpen) return null;

  // Handle user update
  const handleEdit = async () => {
    let newErrors: { [key: string]: string } = {};

    if (!editedUser.grade || !editedUser.first_name || !editedUser.last_name || !editedUser.hire_date) {
      newErrors.general = "All fields must be filled!";
      setErrors(newErrors);
      return;
    }

    const { error } = await supabase
      .from("employees")
      .update({
        grade: editedUser.grade,
        first_name: editedUser.first_name,
        last_name: editedUser.last_name,
        phone_number: editedUser.phone_number || null,
        hire_date: editedUser.hire_date,
      })
      .eq("id", editedUser.id);

    if (error) {
      setErrors({ general: "Error updating user: " + error.message });
      return;
    }

    setErrors({});
    onEdit(editedUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-20 backdrop-blur-xs">
      <div className="bg-[#263238] text-[#cfd8dc] flex flex-col justify-between border border-gray-500 p-6 rounded-xl w-[25%] h-[50%] shadow-xl">
        <h2 className="text-2xl font-bold">Modifier l'employé</h2>

        {/* Form Inputs */}
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

          {/* First Name & Last Name */}
          <div className="flex flex-row gap-8">
            <DynamicInput
              type="text"
              icon={User}
              label="Prénom"
              bgColor="bg-[#263238]"
              textColor="text-[#cfd8dc]"
              value={editedUser?.first_name || ""}
              onChange={(value) => setEditedUser({ ...editedUser, first_name: value })}
            />
            <DynamicInput
              type="text"
              icon={User}
              label="Nom"
              bgColor="bg-[#263238]"
              textColor="text-[#cfd8dc]"
              value={editedUser?.last_name || ""}
              onChange={(value) => setEditedUser({ ...editedUser, last_name: value })}
            />
          </div>

          {/* Phone Number & Hire Date */}
          <DynamicInput
            type="text"
            icon={Phone}
            label="Téléphone"
            placeholder="Téléphone (eg. 4809765435)"
            bgColor="bg-[#263238]"
            textColor="text-[#cfd8dc]"
            value={editedUser?.phone_number || ""}
            onChange={(value) => setEditedUser({ ...editedUser, phone_number: value })}
          />
          <DynamicInput
            type="date"
            icon={Calendar}
            label="Date d'embauche"
            bgColor="bg-[#263238]"
            textColor="text-[#cfd8dc]"
            value={editedUser?.hire_date || ""}
            onChange={(value) => setEditedUser({ ...editedUser, hire_date: value })}
          />
        </div>

        {/* Error Messages */}
        {errors.general && <p className="text-red-500 text-sm text-center">{errors.general}</p>}

        {/* Modal Actions */}
        <div className="flex justify-end gap-4 text-white">
          <button className="px-4 py-2 bg-gray-500 hover:bg-gray-500/60 rounded-xl" onClick={onClose}>
            Annuler
          </button>
          <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600/80 rounded-xl" onClick={handleEdit}>
            Modifier
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
