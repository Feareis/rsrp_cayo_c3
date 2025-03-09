import React from "react";
import { LucideIcon } from "lucide-react";

interface CustomInputProps {
  label: string;
  icon: LucideIcon;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  width?: string;
  type?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  icon: Icon,
  value,
  onChange,
  placeholder,
  width = "w-full",
  type = "text"
}) => {
  return (
    <div className="w-full">
      <p className="text-base font-semibold mb-2">{label}</p>
      <div className="relative flex items-center">
        <Icon size={22} className="absolute left-3 text-gray-400" />
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${width} pl-10 pr-4 py-2 rounded-lg bg-[#1e2a30] border border-gray-600 focus:border-gray-400 outline-none transition-all duration-200`}
        />
      </div>
    </div>
  );
};

export default CustomInput;
