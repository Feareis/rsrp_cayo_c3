import React, { useState, useRef, useEffect } from "react";
import { LucideIcon, ChevronDown } from "lucide-react";

interface CustomSelectProps {
  icon: LucideIcon;
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  padding?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  icon: Icon,
  label,
  options,
  value,
  onChange,
  padding = "p-5",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fermer le menu si on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full border border-gray-600 bg-[#263238] rounded-md">
      {/* Label flottant */}
      <div className="absolute -top-3 left-4 px-2 text-base font-bold text-gray-300 rounded-md">
        {label}
      </div>

      {/* Bouton principal avec padding dynamique */}
      <div
        className={`flex items-center gap-4 rounded-lg w-full cursor-pointer ${padding}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon size={22} className="text-gray-500" />
        <span className="text-gray-400 font-semibold flex-grow">{value || "Sélectionnez une option..."}</span>
        <ChevronDown size={22} className={`text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {/* Liste déroulante */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-full bg-gray-600 border border-gray-500 rounded-lg shadow-lg z-50">
          {options.map((option, index) => (
            <div
              key={index}
              className="px-4 py-2 text-[#cfd8dc] hover:bg-gray-700 cursor-pointer transition"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
