import React from "react";

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  grade: string;
  userName: string;
}

// Fonction pour déterminer la couleur du grade
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

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ isOpen, onClose, onConfirm, grade, userName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-20 backdrop-blur-xs">
      <div className="bg-[#263238] text-[#cfd8dc] flex flex-col justify-between text-center border border-gray-500 p-6 rounded-xl w-[20%] shadow-xl gap-6">
        <h2 className="text-xl font-bold">Confirmation</h2>

        {/* Affichage avec la couleur dynamique */}
        <p className="text-lg font-semibold my-2">
          • <span className={`${getGradeColor(grade)}`}>{grade}</span> <span className="text-gray-500">-</span> {userName}
        </p>

        <p>Êtes-vous certain de vouloir supprimer cet utilisateur ?</p>
        <div className="flex justify-end gap-2 mt-4">
          <button className="px-4 py-2 bg-gray-500 rounded" onClick={onClose}>Annuler</button>
          <button className="px-4 py-2 bg-red-500 rounded" onClick={onConfirm}>Confirmer</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
