import React from "react";
import { Link } from "react-router-dom";

interface HelpCardProps {
  title: string; // Card title
  description?: string; // Optional description
  icon: React.ReactNode; // Icon component
  link?: string; // Link (internal or external)
  external?: boolean; // Whether the link is external
  disabled?: boolean; // Whether the card is disabled
}

/**
 * HelpCard component displays a clickable card with an icon, title, and description.
 * It can be an internal or external link, or disabled.
 */
const HelpCard: React.FC<HelpCardProps> = ({
  title,
  description,
  icon,
  link,
  external,
  disabled,
}) => {
  /**
   * Card content, with styles based on disabled state.
   */
  const content = (
    <div
      className={`bg-[#263238] p-6 rounded-lg shadow-md flex flex-col items-center
      text-center transition-transform duration-300
      ${disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-102"}`}
      aria-disabled={disabled}
    >
      <div className={`p-3 rounded-full ${disabled ? "bg-gray-700" : "bg-[#37474f]"}`}>
        {icon}
      </div>
      <h2 className="text-lg font-semibold mt-3">{title}</h2>
      {description && <p className="text-sm text-gray-400 mt-1">{description}</p>}
    </div>
  );

  // If the card is disabled, return only the content
  if (disabled) return content;

  // If it's an external link, return an <a> tag
  if (external && link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  // If it's an internal link, return a <Link> component
  return link ? <Link to={link}>{content}</Link> : content;
};

export default HelpCard;
