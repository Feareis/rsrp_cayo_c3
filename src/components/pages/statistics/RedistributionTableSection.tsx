import React from "react";

// Define props interface for better TypeScript safety
interface RedistributionTableSectionProps {
  title: string;
  percentageColor: string;
  data: { name: string; rate: string }[];
}

const RedistributionTableSection: React.FC<RedistributionTableSectionProps> = ({
  title,
  percentageColor,
  data,
}) => {
  // Mapping object for grade colors
  const gradeColors: Record<string, string> = {
    "Patron, Co-Patron": "text-red-400",
    Responsable: "text-yellow-400",
    CDI: "text-blue-400",
    CDD: "text-cyan-400",
  };

  // Function to get grade color with a fallback
  const getGradeColor = (grade: string) => gradeColors[grade] || "text-gray-300/80";

  // Mapping object for rate colors
  const rateColors: Record<string, string> = {
    propre: "text-green-400/80",
    sale: "text-red-400/80",
  };

  // Function to get rate color with a fallback
  const getRateColor = (percentageColor: string) => rateColors[percentageColor] || "text-white";

  return (
    <div className="relative flex flex-col w-full gap-4 bg-[#37474f] border border-gray-500/60 p-2 py-4 rounded-xl">
      {/* Title section */}
      <p className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#263238] border border-gray-500 rounded-xl shadow-xl px-3 py-1 text-gray-400 text-xl font-bold">
        {title}
      </p>

      {/* Main container */}
      <div className="flex flex-col gap-4 w-full p-4 py-4">
        {/* Redistribution rates section */}
        {data.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="flex justify-between items-center bg-[#263238] border border-gray-500/70 p-4 rounded-xl shadow-xl w-full"
          >
            {/* Grade section */}
            <p className={`ml-8 text-lg font-bold ${getGradeColor(item.name)}`}>{item.name}</p>

            {/* Rate section */}
            <p className={`mr-8 text-xl font-bold ${getRateColor(percentageColor)}`}>{item.rate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RedistributionTableSection;
