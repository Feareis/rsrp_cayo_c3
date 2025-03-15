import React from "react";

/**
 * Props type for RedistributionTableSection component.
 */
interface RedistributionTableSectionProps {
  title: string; // Section title
  percentageColor: string; // Determines the color of the percentage
  data: { name: string; rate: string }[]; // Array of redistribution data
}

/**
 * RedistributionTableSection component displays a styled list of redistribution rates.
 */
const RedistributionTableSection: React.FC<RedistributionTableSectionProps> = ({
  title,
  percentageColor,
  data,
}) => {
  /**
   * Mapping of grade names to corresponding text colors.
   */
  const gradeColors: Record<string, string> = {
    Patron: "text-red-400",
    "Co-Patron": "text-red-400",
    Responsable: "text-yellow-400",
    CDI: "text-blue-400",
    CDD: "text-cyan-400",
  };

  /**
   * Returns the appropriate text color for a grade, or a default if not found.
   */
  const getGradeColor = (grade: string) => gradeColors[grade] || "text-gray-300/80";

  /**
   * Mapping of rate types to corresponding text colors.
   */
  const rateColors: Record<string, string> = {
    propre: "text-green-400/80",
    sale: "text-red-400/80",
  };

  /**
   * Returns the appropriate text color for a rate type, or a default if not found.
   */
  const getRateColor = (percentageColor: string) => rateColors[percentageColor] || "text-white";

  /**
   * Groups grades by their rate to avoid duplicate entries.
   */
  const groupedData = data.reduce<Record<string, string[]>>((acc, { name, rate }) => {
    if (!acc[rate]) {
      acc[rate] = [];
    }
    acc[rate].push(name);
    return acc;
  }, {});

  return (
    <div
      className="relative flex flex-col w-full gap-4 bg-[#37474f]
      border border-gray-500/60 p-2 py-4 rounded-xl"
    >
      {/* Section title */}
      <p
        className="absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-1/2
        bg-[#263238] border border-gray-500 rounded-xl shadow-xl px-3 py-1
        text-gray-400 text-xl font-bold"
      >
        {title}
      </p>

      {/* Redistribution list */}
      <div className="flex flex-col gap-4 w-full p-4 py-4">
        {Object.entries(groupedData).map(([rate, names], index) => (
          <div
            key={`${rate}-${index}`}
            className="flex justify-between items-center bg-[#263238]
            border border-gray-500/70 p-4 rounded-xl shadow-xl w-full"
          >
            {/* Grade names grouped together */}
            <p className="ml-8 text-lg font-bold">
              {names.map((name, i) => (
                <span key={i} className={`${getGradeColor(name)}`}>
                  {name}
                  {i !== names.length - 1 && ", "}
                </span>
              ))}
            </p>

            {/* Rate percentage */}
            <p className={`mr-8 text-xl font-bold ${getRateColor(percentageColor)}`}>
              {rate}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RedistributionTableSection;
