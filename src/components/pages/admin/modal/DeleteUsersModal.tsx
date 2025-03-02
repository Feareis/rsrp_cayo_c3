import React from "react";
import { supabase } from "../../../../lib/supabaseClient";

interface DeleteUsersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  users: { id: string; grade: string; name: string }[];
}

// Grade order for sorting
const gradeOrder = ["Patron", "Co-Patron", "RH", "Responsable", "CDI", "CDD"];

// Function to get grade color
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

const DeleteUsersModal: React.FC<DeleteUsersModalProps> = ({ isOpen, onClose, onConfirm, users }) => {
  if (!isOpen) return null;

  // Handles multiple user deletions
  const handleDelete = async () => {
    const userIds = users.map(user => user.id);

    if (userIds.length === 0) {
      console.error("❌ Error: No user IDs provided!");
      return;
    }

    const { error } = await supabase.from("employees").delete().in("id", userIds);

    if (error) {
      console.error("❌ Error deleting users:", error.message);
      return;
    }

    // Updates the user list after deletion
    onConfirm(); 

    // Slight delay before closing modal to ensure UI updates correctly
    setTimeout(() => {
      onClose();
    }, 100);
  };

  // Sort users by grade order
  const sortedUsers = [...users].sort((a, b) => gradeOrder.indexOf(a.grade) - gradeOrder.indexOf(b.grade));

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-20 backdrop-blur-xs">
      <div className="bg-[#263238] text-[#cfd8dc] flex flex-col justify-between text-center border border-gray-500 p-6 rounded-xl w-[25%] shadow-xl gap-6">
        <h2 className="text-xl font-bold">Confirmation</h2>

        {/* Sorted list of users to delete */}
        <div className="flex flex-col gap-2 font-semibold my-2">
          {sortedUsers.map((user) => (
            <p key={user.id}>
              • <span className={getGradeColor(user.grade)}>{user.grade}</span> <span className="text-gray-500">-</span> {user.name}
            </p>
          ))}
        </div>

        <p>Êtes-vous certain de vouloir supprimer ces utilisateurs ?</p>
        
        {/* Modal actions */}
        <div className="flex justify-end gap-2 mt-4">
          <button className="px-4 py-2 bg-gray-500 rounded" onClick={onClose}>Annuler</button>
          <button className="px-4 py-2 bg-red-500 rounded" onClick={handleDelete}>Confirmer</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUsersModal;
