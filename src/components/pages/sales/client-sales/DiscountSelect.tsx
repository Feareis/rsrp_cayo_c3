import React, { useState, useRef, useEffect } from "react";
import { LucideIcon, ChevronDown } from "lucide-react";

interface DiscountSelectProps {
  icon: LucideIcon;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const DiscountSelect: React.FC<DiscountSelectProps> = ({
  icon: Icon,
  options,
  value,
  onChange,
  placeholder = "Remise...",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /**
   * Closes the dropdown when clicking outside.
   */
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
      {/* Main button with dynamic padding */}
      <div
        className="flex items-center gap-4 rounded-lg w-full cursor-pointer p-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon size={22} className="text-gray-500" />
        <span className="text-gray-400 font-semibold flex-grow">{value === placeholder ? placeholder : value}</span>
        <ChevronDown size={22} className={`text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {/* Dropdown list */}
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

export default DiscountSelect;
