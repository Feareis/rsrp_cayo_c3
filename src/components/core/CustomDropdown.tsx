import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface DropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, value, onChange, placeholder = "Sélectionnez une option" }) => {
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
    <div ref={dropdownRef} className="relative w-full">
      {/* Bouton principal */}
      <div
        className="flex items-center gap-4 p-5 rounded-lg w-full bg-[#263238] text-[#cfd8dc] cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex-grow">{value || placeholder}</span>
        <ChevronDown size={22} className={`text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {/* Liste déroulante */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-full bg-[#263238] border border-gray-700 rounded-lg shadow-lg z-50">
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

export default Dropdown;
