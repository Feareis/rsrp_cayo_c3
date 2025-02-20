import React from "react";

interface DeleteUsersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userNames: string[];
}

const DeleteUsersModal: React.FC<DeleteUsersModalProps> = ({ isOpen, onClose, onConfirm, userNames }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-20 backdrop-blur-xs">
      <div className="bg-[#263238] text-[#cfd8dc] flex flex-col justify-between text-center border border-gray-500 p-6 rounded-xl w-[20%] shadow-xl gap-6">
        <h2 className="text-xl font-bold">Confirmation</h2>
        <p className="text-red-400 font-semibold my-2">{userNames.join(", ")}</p>
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
