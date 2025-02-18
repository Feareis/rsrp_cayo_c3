import { FC, ReactNode } from "react";

interface BrowserWarnProps {
  color?: "yellow" | "red" | "green" | "blue" | "gray"; // Couleurs autorisées
  icon?: ReactNode; // Icône personnalisée
  message: string; // Message principal
  details?: string[]; // Liste d'infos sous le message
}

export const BrowserWarn: FC<BrowserWarnProps> = ({
  color = "yellow",
  icon,
  message,
  details = [],
}) => {
  // Mapping des couleurs pour Tailwind
  const colorClasses: Record<string, { bg: string; border: string; text: string; list: string; icon: string }> = {
    yellow: {
      bg: "bg-yellow-500/10",
      border: "border-l-4 border-yellow-500/20",
      text: "text-yellow-200/90",
      list: "text-yellow-200/70",
      icon: "text-yellow-500",
    },
    red: {
      bg: "bg-red-500/10",
      border: "border-l-4 border-red-500/20",
      text: "text-red-200/90",
      list: "text-red-200/70",
      icon: "text-red-500",
    },
    green: {
      bg: "bg-green-500/10",
      border: "border-l-4 border-green-500/20",
      text: "text-green-200/90",
      list: "text-green-200/70",
      icon: "text-green-500",
    },
    blue: {
      bg: "bg-blue-500/10",
      border: "border-l-4 border-blue-500/20",
      text: "text-blue-200/90",
      list: "text-blue-200/70",
      icon: "text-blue-500",
    },
    gray: {
      bg: "bg-gray-500/10",
      border: "border-l-4 border-gray-500/20",
      text: "text-gray-200/90",
      list: "text-gray-200/70",
      icon: "text-gray-500",
    },
  };

  const selectedColor = colorClasses[color];

  return (
    <section
      className={`rounded-lg p-4 mb-4 border w-full ${selectedColor.bg} ${selectedColor.border}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-start gap-3 mx-auto">
        {icon && <div className={`flex-shrink-0 mt-0.5 ${selectedColor.icon}`}>{icon}</div>}
        <div className={`text-base ${selectedColor.text}`}>
          <p className="font-medium mb-1">{message}</p>
          {details.length > 0 && (
            <ul className={`list-disc list-inside space-y-1 ${selectedColor.list}`}>
              {details.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};
