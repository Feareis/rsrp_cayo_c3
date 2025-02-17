import { Icon } from "lucide-react";

interface CardProps {
  title: string;
  icon: Icon;
  text1: string;
  text2: string;
}

export default function Card({ title, icon, text1, text2 }: CardProps) {
  return (
    <div
      className="bg-[#263238] text-[#cfd8dc] border border-gray-600 shadow-md rounded-lg px-4 pt-4 pb-2 w-full
                 transition-transform duration-300 ease-in-out hover:scale-101"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">{title}</h3>
        <div className="text-2xl">{icon}</div>
      </div>
      <div className="flex justify-center">
        <div className="bg-green-700 rounded-md m-0.5 px-4 py-1">
          <p className="text-center font-bold text-xl">{text1}</p>
        </div>
      </div>
      <p className="text-center font-semibold text-lg px-8">{text2}</p>
    </div>
  );
}
