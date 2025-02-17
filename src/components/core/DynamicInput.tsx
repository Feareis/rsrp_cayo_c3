import React from "react";
import { LucideIcon } from "lucide-react";

interface DynamicInputProps {
  type?: string;
  icon: LucideIcon;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  bgColor?: string;
  textColor?: string;
}

const DynamicInput: React.FC<DynamicInputProps> = ({
  type = "text",
  icon: Icon,
  label,
  value,
  onChange,
  bgColor = "bg-gray-800/20",
  textColor = "text-gray-400",
  placeholder = "Saisir une valeur...",
}) => {
  return (
    <div className="relative w-1/2">
      {/* Label flottant */}
      <div className={`absolute -top-3 left-4 px-2 bg-gradient-to-b from-[#263238] to-${bgColor} text-base font-bold text-gray-300 rounded-md`}>
        {label}
      </div>

      {/* Conteneur de l'input */}
      <div className={`flex items-center gap-4 p-5 rounded-lg w-full ${bgColor} border border-gray-600`}>
        <Icon size={22} className="text-gray-500" />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`bg-transparent focus:outline-none w-full ${textColor} text-base font-semibold`}
        />
      </div>
    </div>
  );
};

export default DynamicInput;
