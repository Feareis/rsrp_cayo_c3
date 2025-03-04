import React from "react";
import TopSales from "../components/pages/statistics/TopSales";
import Progress from "../components/pages/statistics/Progress";
import RedistributionTable from "../components/pages/statistics/RedistributionTable";
import TriplePoints from "../components/core/loader/TriplePoints";

const Statistics: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex flex-row w-full gap-10">
        {/* Left Section - Top Sales & Progress */}
        <div className="flex flex-col flex-[7] gap-10">
          <TopSales />
          <Progress />
        </div>

        {/* Right Section - Redistribution Table & Loading Indicator */}
        <div className="flex flex-col flex-[3] gap-10">
          <RedistributionTable />
          <div className="flex flex-col items-center w-full h-full p-6 bg-[#263238] border border-gray-500 rounded-xl shadow-xl justify-center gap-12">
            <TriplePoints />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
