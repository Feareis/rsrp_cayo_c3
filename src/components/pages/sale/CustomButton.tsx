import React from "react";
import { LucideIcon } from "lucide-react";

interface CustomButtonProps {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, icon: Icon, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-3 px-4 py-3 rounded-lg text-white font-semibold transition-all duration-200 hover:scale-102 active:scale-98 ${className}`}
    >
      <Icon size={22} />
      {label}
    </button>
  );
};

export default CustomButton;
