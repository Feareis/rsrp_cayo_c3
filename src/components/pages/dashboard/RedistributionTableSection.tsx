import React from "react";


const RedistributionTableSection = ({ title, comment, data }: { title: string; comment: string; data: { grade: string; rate: string }[] }) => {
  return (
    <div className="flex flex-col items-center w-full mb-6">
      <h3 className="text-2xl font-bold text-[#cfd8dc]">{title}</h3>
      <p className="text-sm text-gray-400 mb-2">{comment}</p>
      <div className="grid grid-cols-2 w-full bg-[#263238] border border-gray-600 rounded-md shadow-lg p-4">
        {data.map((item, index) => (
          <React.Fragment key={index}>
            <div className="text-lg text-center text-[#cfd8dc] font-bold">{item.grade}</div>
            <div className="text-lg text-center text-green-400 font-bold">{item.rate}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default RedistributionTableSection;
