import { useAuth } from "../../../context/AuthContext";

const EmployeeBento: React.FC = () => {
  const { user } = useAuth();
  const employee = user?.employee;

  // Mapping object for grade colors
  const gradeColors: Record<string, string> = {
    Patron: "text-red-400",
    "Co-Patron": "text-red-400",
    RH: "text-violet-400",
    Responsable: "text-yellow-400",
    CDI: "text-blue-400",
    CDD: "text-cyan-400",
  };

  return (
    <div className="flex flex-col flex-1 p-6 bg-[#263238] justify-center items-center text-center border border-gray-500 rounded-xl shadow-2xl gap-2">
      {/* Employee Name */}
      <p className="text-2xl font-bold text-gray-400">
        Nom Employé :{" "}
        <span className="text-purple-400">
          {employee?.first_name || "Prenom?"} {employee?.last_name || "Nom?"}
        </span>
      </p>

      {/* Employee Grade */}
      <p className="text-xl font-bold text-gray-400">
        Grade :{" "}
        <span className={gradeColors[employee?.grade || ""] || "text-white"}>
          {employee?.grade || "Grade?"}
        </span>
      </p>
    </div>
  );
};

export default EmployeeBento;
