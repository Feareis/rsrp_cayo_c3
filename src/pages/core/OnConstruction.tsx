import React from "react";
import TriplePoints from "../../components/core/loader/TriplePoints";

interface OnConstructionProps {
  children: React.ReactNode;
}

const OnConstruction: React.FC<OnConstructionProps> = ({ children }) => {
  return (
    <div className="relative h-[75%]">
      <div className="blur-md opacity-90">{children}</div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-700/10 rounded-xl text-white text-center gap-8">
        <h1 className="text-3xl text-gray-400 font-bold">Page en construction</h1>
        <TriplePoints />
      </div>
    </div>
  );
};

export default OnConstruction;
