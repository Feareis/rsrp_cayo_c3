import React from "react";
import { CheckCircle } from "lucide-react"; // Importing the icon

// Defining props types for better TypeScript safety
interface ProgressBarProps {
  title: string;
  value: number;
  max: number;
  color?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ title, value, max, color = "bg-blue-500" }) => {
  // Ensure the percentage does not exceed 100%
  const percentage = (value / max) * 100;
  const position = `calc(${percentage}% - 10px)`; // Position for value marker
  const shouldDisplayValue = percentage > 0.01 && percentage < 99.99; // Show only when necessary

  // Function to format numbers with optional decimal places
  const formatNumber = (num: number, decimals: number = 0): string => {
    return num.toLocaleString("en-EN", { minimumFractionDigits: decimals });
  };

  return (
    <div className="flex flex-col text-center w-full">
      {/* Title and check icon when max is exceeded */}
      <div className="flex flex-row items-center gap-2 mb-2">
        <p className="ml-4 text-gray-300/80 text-lg font-bold">{title}</p>

        {/* Divider line appears only if value exceeds max */}
        {value > max && <div className="flex-1 bg-gray-700 h-0.5"></div>}

        {/* CheckCircle icon appears when max is exceeded */}
        {value > max && <CheckCircle className="text-green-500 mr-4 shrink-0" size={22} />}
      </div>

      {/* Progress bar is only shown when value is within the max range */}
      {value <= max && (
        <div className="flex items-center w-full gap-2">
          {/* Minimum value (0) */}
          <p className="text-gray-400 font-bold">0</p>

          {/* Progress bar container */}
          <div className="relative w-full bg-gray-700 rounded-full h-4">
            {/* Filled progress bar */}
            <div className={`${color} h-full rounded-sm transition-all`} style={{ width: position }}></div>

            {/* Value marker displayed conditionally */}
            {shouldDisplayValue && (
              <div className="absolute top-full left-0 transform -translate-x-1/2 flex flex-col items-center" style={{ left: position }}>
                <div className="w-0.5 h-2 bg-gray-400"></div>
                <p className="text-gray-400 mt-0.5 text-sm font-bold">{formatNumber(value)}</p>
              </div>
            )}
          </div>

          {/* Maximum value */}
          <p className="text-gray-400 font-bold">{formatNumber(max)}</p>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
