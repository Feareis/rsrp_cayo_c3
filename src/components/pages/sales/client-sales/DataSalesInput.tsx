import React from "react";
import { LucideIcon } from "lucide-react";

interface DataSalesInputProps {
  title: string; // Input label
  icon: LucideIcon; // Icon component
  value: string | number; // Input value
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Change handler
  placeholder: string; // Placeholder text
  showMaxButton?: boolean; // Whether to show the "Max" button
  onMaxClick?: () => void; // Callback when "Max" is clicked
}

/**
 * DataSalesInput component with an optional "Max" button.
 */
const DataSalesInput: React.FC<DataSalesInputProps> = ({
  icon: Icon,
  title,
  value,
  onChange,
  placeholder,
  showMaxButton = false,
  onMaxClick,
}) => {
  return (
    <div
      className="relative w-full bg-gray-800/10 border border-gray-600
      pt-4 pb-2 rounded-lg shadow-xl text-gray-300/70"
    >
      {/* Floating label */}
      <div
        className="absolute top-0 left-6 -translate-y-1/2 bg-[#263238]
        px-2 text-lg font-bold"
      >
        {title}
      </div>

      {/* Input field with optional "Max" button */}
      <div className="relative flex items-center text-lg text-gray-500 px-8 py-2">
        <Icon size={24} className="text-gray-500" />
        <input
          type="number"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="bg-transparent outline-none border-none text-gray-300/80
          font-semibold w-full px-3"
        />
        {showMaxButton && (
          <button
            onClick={onMaxClick}
            className="absolute right-4 top-1/2 -translate-y-1/2 h-[90%] px-3
            bg-[#263238] hover:bg-gray-600/40 border border-gray-600
            text-gray-400 font-bold rounded-md shadow-xl text-base
            transform scale-100 hover:scale-105 transition duration-200"
            aria-label="Set maximum value"
          >
            Max
          </button>
        )}
      </div>
    </div>
  );
};

export default DataSalesInput;
