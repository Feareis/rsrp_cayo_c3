import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { supabase } from "../../../lib/supabaseClient";

const EmployeeBento: React.FC = () => {
  const { user } = useAuth();
  const [employee, setEmployee] = useState<any>(null);
  const [redistributionRates, setRedistributionRates] = useState<any>(null);
  const [loadingRates, setLoadingRates] = useState(true);

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

  // Fetch redistribution rates from "data" table
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const { data, error } = await supabase
          .from("data")
          .select("value")
          .eq("key", "redistribution_rates")
          .single();

        if (error) throw error;
        if (data?.value) setRedistributionRates(data.value);
      } catch (err) {
        console.error("Error fetching redistribution rates:", err);
      } finally {
        setLoadingRates(false);
      }
    };

    fetchRates();
  }, []);

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
    <div className="flex flex-row flex-1 p-6 bg-[#263238] justify-center items-center text-center border border-gray-500 rounded-xl shadow-2xl gap-8">
      {/* Employee Grade */}
      <div className="relative flex flex-col w-full gap-4 border border-gray-600 p-2 py-2 rounded-lg">
        <p className="absolute w-[50%] top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#263238] border-t border-x border-gray-500 rounded-xl px-3 py-0.5 text-gray-400 text-xl font-bold">
          Grade
        </p>
        <div className={`flex flex-row text-2xl font-bold justify-center gap-8 w-full py-3 ${gradeColors[employee?.grade || ""] || "text-white"}`}>
          {employee?.grade || "Grade?"}
        </div>
      </div>

      {/* Taux de Redistribution */}
      <div className="relative flex flex-col w-full gap-4 border border-gray-600 p-2 py-2 rounded-lg">
        <p className="absolute w-[70%] top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#263238] border-t border-x border-gray-500 rounded-xl px-3 py-0.5 text-gray-400 text-xl font-bold">
          Taux de redistribution
        </p>
        <div className="flex flex-row text-2xl font-bold justify-center gap-8 w-full py-3 text-green-500">
          {loadingRates ? "Chargement..." : `${redistributionRates?.[employee?.grade] * 100 || "N/A"}%`}
        </div>
      </div>
    </div>
  );
};

export default EmployeeBento;
