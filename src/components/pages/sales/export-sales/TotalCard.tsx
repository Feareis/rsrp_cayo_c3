import React from "react";

type TotalCardProps = {
  title: string; // Card title
  value: string; // Main displayed value
  textColor?: string; // Optional color for the value text
  commentary?: string; // Optional commentary text
};

/**
 * TotalCard component displays a summary value with an optional commentary.
 */
const TotalCard: React.FC<TotalCardProps> = ({
  title,
  value,
  commentary,
  textColor = "text-blue-400",
}) => {
  return (
    <div
      className="flex flex-col w-full bg-[#37474f] p-4 text-center
      border border-gray-600 rounded-md shadow-xl gap-8"
    >
      {/* Title and Value */}
      <div className="flex flex-col w-full">
        <p className="text-gray-300/90 text-lg font-bold">{title}</p>
        <p className={`${textColor} text-2xl font-bold mt-2`} aria-label={value}>
          {value}
        </p>
      </div>

      {/* Commentary (if provided) */}
      {commentary && <p className="text-lg font-semibold text-gray-400/50">{commentary}</p>}
    </div>
  );
};

export default TotalCard;
