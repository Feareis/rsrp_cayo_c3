import React from "react";
import { LucideIcon } from "lucide-react";

interface StaticInputProps {
  icon: LucideIcon;
  text: string;
  bgColor?: string;
  textColor?: string;
}

const StaticInput: React.FC<StaticInputProps> = ({ icon: Icon, text, bgColor = "bg-gray-900/30", textColor = "text-gray-400" }) => {
  return (
    <div className={`flex items-center gap-3 p-4 rounded-md w-1/2 ${bgColor} border border-gray-700`}>
      <Icon size={20} className="text-gray-500" />
      <span className={`text-sm font-semibold ${textColor}`}>{text || "Non renseigné"}</span>
    </div>
  );
};

export default StaticInput;
