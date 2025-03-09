import React from "react";
import { LucideIcon } from "lucide-react";

interface InformationCardProps {
  icon: LucideIcon;
  title: string;
  text: string;
  className?: string;
}

const InformationCard: React.FC<InformationCardProps> = ({ title, text, icon: Icon, className }) => {
  return (
    <div className="relative w-full border border-gray-600 pt-4 pb-2 rounded-lg shadow-xl text-gray-300/70">
      <div className="absolute top-0 left-6 px-2 -translate-y-1/2 bg-[#263238] px-4 text-lg font-bold">
        {title}
      </div>
      {/* Texte avec Icône */}
      <div className="flex mx-4 px-4 font-bold text-xl text-gray-500 gap-4 items-center">
        <Icon size={24} className="text-gray-500" />
        <p className={`py-2 ${className}`}>{text}</p>
      </div>
    </div>
  );
};

export default InformationCard;
