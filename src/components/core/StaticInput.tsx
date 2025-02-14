import React from "react";
import { LucideIcon } from "lucide-react";

interface StaticInputProps {
  icon: LucideIcon;
  label: string;
  text: string;
  bgColor?: string;
  textColor?: string;
}

const StaticInput: React.FC<StaticInputProps> = ({
  icon: Icon,
  label,
  text,
  bgColor = "bg-gray-800/10",
  textColor = "text-gray-400",
}) => {
  return (
    <div className="relative w-1/2">
      {/* Label qui dépasse */}
      <div className={`absolute -top-3 left-4 px-2 bg-gradient-to-b from-[#263238] to-${bgColor} text-base font-bold text-gray-300 rounded-md`}>
        {label}
      </div>

      {/* Conteneur de l'input statique */}
      <div
        className={`flex items-center gap-4 p-5 rounded-lg w-full ${bgColor} border border-gray-600`}
      >
        <Icon size={22} className="text-gray-500" />
        <span className={`text-base font-semibold ${textColor}`}>{text || "Non renseigné"}</span>
      </div>
    </div>
  );
};

export default StaticInput;
