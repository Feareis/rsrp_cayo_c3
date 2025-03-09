import React from "react";

/**
 * Props type for TopSalesTable component.
 */
interface TopSalesTableProps {
  title: string; // Table title
  sales: { name: string; grade: string; amount: string }[]; // Sales data
  percentageColor: string; // Color type (propre/sale)
}

/**
 * TopSalesTable component displays a ranked list of top sales performers.
 */
const TopSalesTable: React.FC<TopSalesTableProps> = ({ title, percentageColor, sales }) => {
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

  return (
    <div
      className="relative flex flex-col w-full gap-4 bg-[#37474f]
      border border-gray-500/60 p-2 py-4 rounded-xl"
    >
      {/* Title section */}
      <p
        className="absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-1/2
        bg-[#263238] border border-gray-500 rounded-xl shadow-xl px-3 py-1
        text-gray-400 text-xl font-bold"
      >
        {title}
      </p>

      {/* Sales list */}
      <div className="flex flex-col gap-4 w-full p-4">
        {sales.map((item) => (
          <div
            key={item.name} // Use name as key to improve stability
            className="flex justify-between items-center bg-[#263238]
            border border-gray-500/70 p-4 rounded-xl shadow-xl w-full"
          >
            {/* Name & Grade */}
            <p className={`ml-16 text-lg font-bold ${getGradeColor(item.grade)}`}>
              {item.name}
            </p>

            {/* Amount */}
            <p className={`mr-16 text-xl font-bold ${getRateColor(percentageColor)}`}>
              {item.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSalesTable;
