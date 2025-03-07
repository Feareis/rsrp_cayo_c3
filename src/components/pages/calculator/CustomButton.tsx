import React from "react";
import { LucideIcon } from "lucide-react";

interface CustomButtonProps {
  title: string;
  count: number;
  icon: LucideIcon;
  onClick: () => void;
  className?: string;
  setCounter?: boolean; // Option pour afficher ou masquer le compteur
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, count, icon: Icon, onClick, className, setCounter = true }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center ${setCounter ? "justify-around" : "justify-center gap-4"} px-4 ${setCounter ? "py-2" : "py-3"} rounded-lg shadow-2xl border border-gray-500 w-full transition-transform duration-200 ease-in-out hover:scale-102 ${className}`}
    >
      <Icon size={28} />
      <span className="text-xl font-bold">{title}</span>
      {setCounter && (
        <div className="py-1 px-4 bg-[#37474f] rounded-lg border border-gray-400">
          <span className="text-xl font-bold text-gray-400">{count}</span>
        </div>
      )}
    </button>
  );
};

export default CustomButton;
