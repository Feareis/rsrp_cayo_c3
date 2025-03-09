import React, { useState } from "react";
import { LucideIcon, Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  icon: LucideIcon;
  title: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ icon: Icon, title, value, onChange, placeholder, required = false }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full bg-gray-800/10 border border-gray-600 pt-4 pb-2 rounded-lg shadow-xl text-gray-300/70">
      <div className="absolute top-0 left-6 px-2 -translate-y-1/2 bg-[#263238] px-2 text-lg font-bold">
        {title} {required && <span className="text-red-500 text-sm">*</span>}
      </div>
      <div className="relative flex items-center text-lg text-gray-500 px-8 py-2">
        <Icon size={20} className="font-bold text-gray-500" />
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className="bg-transparent outline-none border-none text-gray-300 w-full px-3"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-gray-500 hover:text-gray-400 transition"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
