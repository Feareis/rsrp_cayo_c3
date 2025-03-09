import React, { useEffect, useState } from "react";
import DynamicInput from "../../../../components/core/DynamicInput";
import CustomSelect from "../../../../components/core/CustomSelect";
import { User, Briefcase, Phone, Calendar } from "lucide-react";
import { supabase } from "../../../../lib/supabaseClient";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: (user: any) => void;
  onAdd: (user: any) => void;
}

/**
 * Modal component for adding a new employee.
 */
const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, onAdd }) => {
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  // Default state for a new employee
  const initialUserState = {
    grade: "CDD",
    first_name: "",
    last_name: "",
    phone_number: "",
    hire_date: today,
  };

  const [user, setUser] = useState(initialUserState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Available grade options
  const gradeOptions = ["Patron", "Co-Patron", "RH", "Responsable", "CDI", "CDD"];

  // Reset form fields when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setUser(initialUserState); // Reset with default values
      setErrors({});
    }
  }, [isOpen]);

  /**
   * Handles the employee addition process.
   */
  const addEmployee = async () => {
    let newErrors: { [key: string]: string } = {};

    // Validate required fields
    if (!user.grade || !user.first_name.trim() || !user.last_name.trim() || !user.hire_date) {
      newErrors.general = "All fields must be filled!";
      setErrors(newErrors);
      return;
    }

    // Insert employee into the database
    const { error } = await supabase.from("employees").insert([
      {
        grade: user.grade,
        first_name: user.first_name.trim(),
        last_name: user.last_name.trim(),
        phone_number: user.phone_number || null,
        hire_date: user.hire_date,
      },
    ]);

    if (error) {
      setErrors({ general: "Error adding employee: " + error.message });
      return;
    }

    // Clear errors and close modal
    setErrors({});
    onAdd(user);
    onClose(user);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-20 backdrop-blur-xs">
      <div className="bg-[#263238] text-[#cfd8dc] flex flex-col justify-between border border-gray-500
                      p-6 rounded-xl w-[25%] h-[50%] shadow-xl">
        <h2 className="text-2xl font-bold">Ajouter un employé</h2>

        {/* Form Inputs */}
        <div className="flex flex-col gap-8">
          <CustomSelect
            icon={Briefcase}
            label="Grade"
            options={gradeOptions}
            bgColor="bg-[#263238]"
            textColor="text-[#cfd8dc]"
            value={user.grade}
            onChange={(value) => setUser({ ...user, grade: value })}
          />

          {/* First Name & Last Name */}
          <div className="flex flex-row gap-8">
            <DynamicInput
              type="text"
              icon={User}
              label="Prénom"
              bgColor="bg-[#263238]"
              textColor="text-[#cfd8dc]"
              value={user.first_name}
              onChange={(value) => setUser({ ...user, first_name: value })}
            />
            <DynamicInput
              type="text"
              icon={User}
              label="Nom"
              bgColor="bg-[#263238]"
              textColor="text-[#cfd8dc]"
              value={user.last_name}
              onChange={(value) => setUser({ ...user, last_name: value })}
            />
          </div>

          {/* Phone Number & Hire Date */}
          <DynamicInput
            type="text"
            icon={Phone}
            label="Téléphone"
            placeholder="Téléphone (ex: 4809765435)"
            bgColor="bg-[#263238]"
            textColor="text-[#cfd8dc]"
            value={user.phone_number}
            onChange={(value) => setUser({ ...user, phone_number: value })}
          />
          <DynamicInput
            type="date"
            icon={Calendar}
            label="Date d'embauche"
            bgColor="bg-[#263238]"
            textColor="text-[#cfd8dc]"
            value={user.hire_date}
            onChange={(value) => setUser({ ...user, hire_date: value })}
          />
        </div>

        {/* Error Messages */}
        {errors.general && <p className="text-red-500 text-sm text-center">{errors.general}</p>}

        {/* Modal Actions */}
        <div className="flex justify-end gap-4 text-white">
          <button className="px-4 py-2 bg-gray-500 hover:bg-gray-500/60 rounded-xl" onClick={() => onClose(user)}>
            Annuler
          </button>
          <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600/80 rounded-xl" onClick={addEmployee}>
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
