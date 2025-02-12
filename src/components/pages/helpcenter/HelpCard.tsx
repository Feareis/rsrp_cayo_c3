import React from "react";
import { Link } from "react-router-dom";

interface HelpCardProps {
  title: string;
  description?: string;
  icon: React.ReactNode;
  link?: string;
  external?: boolean;
  disabled?: boolean;
}

const HelpCard: React.FC<HelpCardProps> = ({ title, description, icon, link, external, disabled }) => {
  const content = (
    <div
      className={`bg-[#263238] p-6 rounded-lg shadow-md flex flex-col items-center text-center transition-transform duration-300
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-102"}`}
    >
      <div className={`p-3 rounded-full ${disabled ? "bg-gray-700" : "bg-[#37474f]"}`}>{icon}</div>
      <h2 className="text-lg font-semibold mt-3">{title}</h2>
      <p className="text-sm text-gray-400 mt-1">{description}</p>
    </div>
  );

  if (disabled) {
    return content;
  }

  if (external && link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return link ? <Link to={link}>{content}</Link> : content;
};

export default HelpCard;
