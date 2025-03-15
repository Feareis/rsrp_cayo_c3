import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { supabase } from "../../../lib/supabaseClient";
import { ChevronRight } from "lucide-react";

/**
 * RedistributionGradeBento component displays the employee's grade
 * and corresponding redistribution rate.
 */
const RedistributionGradeBento: React.FC = () => {
  const { user } = useAuth();
  const [employee, setEmployee] = useState<any>(null);
  const [redistributionRates, setRedistributionRates] = useState<Record<string, number> | null>(null);
  const [loadingRates, setLoadingRates] = useState(true);

  useEffect(() => {
    if (!user?.employee_id) return;

    /**
     * Fetch employee data and listen for real-time updates.
     */
    const fetchEmployeeData = async () => {
      const { data, error } = await supabase
        .from("employees")
        .select("*")
        .eq("id", user.employee_id)
        .single();

      if (error) {
        console.error("Error fetching employee data:", error);
        return;
      }

      setEmployee(data);
    };

    fetchEmployeeData();

    const employeeSubscription = supabase
      .channel("realtime-employee")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "employees",
          filter: `id=eq.${user.employee_id}`,
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

  useEffect(() => {
    /**
     * Fetch redistribution rates from "data" table.
     */
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

  const employeeGrade = employee?.grade || "Non défini";
  const redistributionRate = redistributionRates?.[employeeGrade] ? `${(redistributionRates[employeeGrade] * 100).toFixed(0)}%` : "Non défini";

  return (
    <div
      className="flex flex-row flex-1 p-6 bg-[#263238] justify-center items-center
      text-center border border-gray-500 rounded-xl shadow-2xl gap-4"
    >
      {/* Employee Grade */}
      <div
        className="relative flex flex-col w-full gap-4 bg-gray-800/10
        border border-gray-600 p-2 py-2 rounded-lg shadow-xl"
      >
        <p
          className="absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-1/2
          bg-[#263238] px-4 py-0.5 text-gray-400 text-xl font-bold"
        >
          Grade
        </p>
        <div
          className={`flex flex-row text-2xl font-bold justify-center gap-8 w-full py-3
          ${gradeColors[employeeGrade] || "text-gray-400"}`}
        >
          {employeeGrade}
        </div>
      </div>

      <div className="flex justify-center text-gray-400">
        <ChevronRight size={32} />
      </div>

      {/* Redistribution Rate */}
      <div
        className="relative flex flex-col w-full gap-4 bg-gray-800/10
        border border-gray-600 p-2 py-2 rounded-lg shadow-xl"
      >
        <p
          className="absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-1/2
          bg-[#263238] px-3 py-0.5 text-gray-400 text-xl font-bold whitespace-nowrap"
        >
          Taux de redistribution
        </p>
        <div className="flex flex-row text-2xl font-bold justify-center gap-8 w-full py-3 text-green-500">
          {loadingRates ? "..." : redistributionRate}
        </div>
      </div>
    </div>
  );
};

export default RedistributionGradeBento;
