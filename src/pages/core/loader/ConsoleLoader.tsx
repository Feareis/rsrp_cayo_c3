import React from "react";

export default function Loader() {
  return (
    <div className="mx-auto w-[500px] bg-gray-950 rounded-xl overflow-hidden drop-shadow-xl mt-10">
      <div className="bg-[#333] flex items-center p-[5px] text-white relative">
        <div className="flex absolute left-3">
          <span className="h-3.5 w-3.5 bg-[#ff605c] rounded-xl mr-2"></span>
          <span className="h-3.5 w-3.5 bg-[#ffbd44] rounded-xl mr-2"></span>
          <span className="h-3.5 w-3.5 bg-[#00ca4e] rounded-xl"></span>
        </div>
        <div className="flex-1 text-center text-white">cmd.exe</div>
      </div>
      <div className="p-2.5 text-[#0f0]">
        <div>
          <span className="mr-2">Loading</span>
          <span className="animate-[ping_1.5s_0.5s_ease-in-out_infinite]">.</span>
          <span className="animate-[ping_1.5s_0.7s_ease-in-out_infinite]">.</span>
          <span className="animate-[ping_1.5s_0.9s_ease-in-out_infinite]">.</span>
        </div>
      </div>
    </div>
  );
}
