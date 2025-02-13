import React from "react";
import { LucideIcon } from "lucide-react";

interface CustomInputProps {
  label: string;
  icon: LucideIcon;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ label, icon: Icon, value, onChange, placeholder }) => {
  return (
    <div className="w-full">
      <p className="text-base font-semibold mb-2">{label}</p>
      <div className="relative flex items-center">
        <Icon size={22} className="absolute left-3 text-gray-400" />
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#1E2A30] text-white border border-gray-600 focus:border-gray-400 outline-none transition-all duration-200"
        />
      </div>
    </div>
  );
};

export default CustomInput;
