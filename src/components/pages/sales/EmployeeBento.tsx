import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { supabase } from "../../../lib/supabaseClient";

const EmployeeBento: React.FC = () => {
  const { user } = useAuth();
  const [employee, setEmployee] = useState<any>(null);

  useEffect(() => {
    if (!user?.employee_id) return;

    // Fetch data employee from "employees" table
    const fetchEmployeeData = async () => {
      const { data, error } = await supabase
        .from("employees")
        .select("*")
        .eq("id", user.employee_id)
        .single();

      if (error) {
        console.error("Erreur lors de la récupération de l'employé:", error);
        return;
      }

      setEmployee(data);
    };

    fetchEmployeeData();

    // Realtime listener
    const employeeSubscription = supabase
      .channel("realtime-employee")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "employees", filter: `id=eq.${user.employee_id}` },
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

      {/* Date du jour */}
      <p className="text-xl font-bold text-gray-400">
        Date : <span className="text-gray-500">{new Date().toLocaleDateString("fr-FR")}</span>
      </p>
    </div>
  );
};

export default EmployeeBento;
