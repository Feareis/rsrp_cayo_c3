import React from "react";

interface MaterialCardProps {
  name: string;
  image: string;
  total: number;
  textColor?: string;
}

/**
 * MaterialCard component displays a material with its name, image, and total count.
 */
const MaterialCard: React.FC<MaterialCardProps> = ({
  name,
  image,
  total,
  textColor = "text-gray-400",
}) => {
  /**
   * Formats the total number with commas for better readability.
   */
  const formatNumber = (num: number) => Math.abs(num).toLocaleString("en-US");

  return (
    <div
      className="flex flex-col justify-around items-center rounded-xl shadow-2xl
      bg-[#263238] border border-gray-500 gap-6 py-4 transform transition
      duration-200 hover:scale-102"
    >
      {/* Material name */}
      <div className="flex justify-center w-full p-2">
        <h3 className={`text-2xl text-center font-bold ${textColor}`}>{name}</h3>
      </div>

      {/* Material image */}
      <div
        className="flex justify-center w-[75%] p-4 bg-[#37474f]
        border border-gray-500 rounded-xl shadow-2xl"
      >
        <img src={image} alt={name} className="w-[70%] h-auto object-contain" />
      </div>

      {/* Total count */}
      <div className="flex justify-center w-full p-2">
        <div className={`text-center text-2xl font-bold ${textColor}`}>
          {formatNumber(total)}
        </div>
      </div>
    </div>
  );
};

export default MaterialCard;
