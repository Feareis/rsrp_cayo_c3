import React from "react";

type TotalCardProps = {
  title: string;
  value: string;
  textColor?: string;
  commentary?: string;
};

const TotalCard: React.FC<TotalCardProps> = ({ title, value, commentary, textColor = "text-blue-400" }) => {
  return (
    <div className="flex flex-col w-full bg-[#37474f] p-4 text-center border border-gray-600 rounded-md shadow-xl gap-8">
      <div className="flex flex-col w-full">
        <p className="text-gray-300/90 text-lg font-bold">{title}</p>
        <p className={`${textColor} text-2xl font-bold mt-2`}>{value}</p>
      </div>
      <p className="text-lg font-semibold text-gray-400/50">{commentary}</p>
    </div>
  );
};

export default TotalCard;
