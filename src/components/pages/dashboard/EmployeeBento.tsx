import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { supabase } from "../../../lib/supabaseClient";

/**
 * EmployeeBento component displays the logged-in employee's name and grade.
 */
const EmployeeBento: React.FC = () => {
  const { user } = useAuth();
  const [employee, setEmployee] = useState<{
    first_name: string;
    last_name: string;
    grade: string;
  } | null>(null);

  /**
   * Fetch employee data from the "employees" table.
   */
  const fetchEmployeeData = async () => {
    if (!user?.employee_id) return;

    const { data, error } = await supabase
      .from("employees")
      .select("first_name, last_name, grade")
      .eq("id", user.employee_id)
      .single();

    if (error) {
      console.error("Error fetching employee data:", error);
      return;
    }

    setEmployee(data);
  };

  useEffect(() => {
    fetchEmployeeData();

    // Realtime listener for employee updates
    const employeeSubscription = supabase
      .channel("realtime-employee")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "employees",
          filter: `id=eq.${user?.employee_id}`,
        },
        (payload) => {
          console.log("Employee updated:", payload.new);
          setEmployee(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(employeeSubscription);
    };
  }, [user?.employee_id]);

  /**
   * Mapping of grade names to corresponding text colors.
   */
  const gradeColors: Record<string, string> = {
    Patron: "text-red-400",
    "Co-Patron": "text-red-400",
    RH: "text-violet-400",
    Responsable: "text-yellow-400",
    CDI: "text-blue-400",
    CDD: "text-cyan-400",
  };

  return (
    <div
      className="flex flex-col flex-1 p-6 bg-[#263238] justify-center
      items-center text-center border border-gray-500 rounded-xl
      shadow-2xl gap-2"
    >
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
        <span className={gradeColors[employee?.grade] || "text-white"}>
          {employee?.grade || "Grade?"}
        </span>
      </p>
    </div>
  );
};

export default EmployeeBento;
