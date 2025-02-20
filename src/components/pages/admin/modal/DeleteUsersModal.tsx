import React from "react";

interface DeleteUsersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  users: { grade: string; name: string }[];
}

const gradeOrder = ["Patron", "Co-Patron", "RH", "Responsable", "CDI", "CDD"];

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

  // Trier les utilisateurs selon l'ordre défini
  const sortedUsers = [...users].sort((a, b) => {
    return gradeOrder.indexOf(a.grade) - gradeOrder.indexOf(b.grade);
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-20 backdrop-blur-xs">
      <div className="bg-[#263238] text-[#cfd8dc] flex flex-col justify-between text-center border border-gray-500 p-6 rounded-xl w-[25%] shadow-xl gap-6">
        <h2 className="text-xl font-bold">Confirmation</h2>

        {/* Liste triée des utilisateurs à supprimer */}
        <div className="flex flex-col gap-2 font-semibold my-2">
          {sortedUsers.map((user, index) => (
            <p key={index}>
              • <span className={`${getGradeColor(user.grade)}`}>{user.grade}</span> <span className="text-gray-500">-</span> {user.name}
            </p>
          ))}
        </div>

        <p>Êtes-vous certain de vouloir supprimer ces utilisateurs ?</p>
        <div className="flex justify-end gap-2 mt-4">
          <button className="px-4 py-2 bg-gray-500 rounded" onClick={onClose}>Annuler</button>
          <button className="px-4 py-2 bg-red-500 rounded" onClick={onConfirm}>Confirmer</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUsersModal;
