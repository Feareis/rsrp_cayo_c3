import React from "react";
import { LucideIcon } from "lucide-react";

interface CustomCalculatorButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
  icon: LucideIcon;
  disabled?: boolean;
  flexSize?: string;
}

const CustomCalculatorButton: React.FC<CustomCalculatorButtonProps> = ({
  label,
  onClick,
  className,
  icon: Icon,
  disabled = false,
  flexSize = "flex-1",
}) => {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={`
        ${flexSize} flex items-center justify-between px-6 py-3 rounded-lg transition-transform duration-300 ease-in-out w-full relative
        bg-[#263238] text-white
        ${disabled ? "opacity-0 pointer-events-none" : ""}
        ${className}
      `}
      disabled={disabled}
    >
      {!disabled && (
        <>
          {/* Effet Glow au survol */}
          <div className="absolute inset-0 rounded-lg opacity-0 transition-all duration-300 group-hover:opacity-40 blur-md"></div>

          <div className="bg-gray-700 px-4 py-2 rounded-lg flex items-center justify-center">
            <Icon className="h-5 w-5" />
          </div>
          <span className="ml-4">{label}</span>
          <div></div>
        </>
      )}
    </button>
  );
};

export default CustomCalculatorButton;
