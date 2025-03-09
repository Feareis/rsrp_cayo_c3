import { CircleCheck, CircleX } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

/**
 * WarningBento component displays employee warnings with status icons.
 */
const WarningBento: React.FC = () => {
  const { user } = useAuth();
  const employee = user?.employee;

  /**
   * List of employee warnings.
   */
  const warnings = [
    { label: "Avertissement 1", value: employee?.warning1 },
    { label: "Avertissement 2", value: employee?.warning2 },
  ];

  return (
    <div
      className="flex flex-col flex-1 items-center w-full h-full p-6 bg-[#263238]
      border border-gray-500 rounded-xl shadow-2xl gap-8"
    >
      <h2 className="text-2xl font-bold text-center text-gray-400">Gestion Avertissements</h2>
      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-row w-full gap-8">
          {warnings.map((warning) => (
            <div
              key={warning.label}
              className="flex flex-col bg-[#263238] gap-2 border border-gray-500/70
              p-4 rounded-lg shadow-2xl text-center items-center w-full"
            >
              <p className="text-gray-400/90 text-lg font-bold">{warning.label}</p>
              {warning.value ? (
                <CircleCheck className="text-green-500/70" size={24} aria-label="Warning cleared" />
              ) : (
                <CircleX className="text-red-400/70" size={24} aria-label="Active warning" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WarningBento;
