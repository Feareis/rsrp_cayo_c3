import { useEffect, useState } from "react";
import QuotaCard from "./QuotaCard";
import { useAuth } from "../../../context/AuthContext";
import { supabase } from "../../../lib/supabaseClient";

/**
 * Type definitions for quota data.
 */
interface Quota {
  value: number;
  description: Record<string, number>;
}

interface QuotaData {
  quota: Quota;
  quota_bonus: Quota;
}

interface Employee {
  weekly_quota?: boolean;
  weekly_quota_bonus?: boolean;
}

/**
 * QuotaBento component displays employee quotas and bonuses.
 */
const QuotaBento: React.FC = () => {
  const { user } = useAuth();
  const [quotaData, setQuotaData] = useState<QuotaData | null>(null);
  const [employee, setEmployee] = useState<Employee | null>(null);

  /**
   * Fetch employee data from the "employees" table.
   */
  const fetchEmployeeData = async () => {
    if (!user?.employee_id) return;

    const { data, error } = await supabase
      .from("employees")
      .select("weekly_quota, weekly_quota_bonus")
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
   * Fetch quota data from the "data" table.
   */
  const fetchQuotaData = async () => {
    try {
      const { data, error } = await supabase
        .from("data")
        .select("value")
        .eq("key", "quota_information")
        .single();

      if (error) throw error;
      if (data?.value) setQuotaData(data.value);
    } catch (err) {
      console.error("Error fetching quotas:", err);
    }
  };

  useEffect(() => {
    fetchQuotaData();

    // Realtime subscription for `data` and `employees` table
    const dataSubscription = supabase
      .channel("realtime-updates")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "data" },
        fetchQuotaData
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "employees" },
        fetchQuotaData
      )
      .subscribe();

    return () => {
      supabase.removeChannel(dataSubscription);
    };
  }, []);

  /**
   * Formats a number as a currency string.
   */
  const formatCurrency = (value?: number): string =>
    value && value > 0
      ? `${value.toLocaleString("en-EN", { minimumFractionDigits: 0 })} $`
      : "-";

  /**
   * Mapping of quota description keys to display names.
   */
  const nameMap: Record<string, string> = {
    biere: "Bières",
    biere_red: "Bières Red",
    biere_pils: "Bières Pils",
    biere_triple: "Bières Triple",
    jus_de_cerise: "Jus de Cerises",
    houblon: "Houblons",
    eau: "Eaux",
    orge: "Orges",
    mout: "Mouts",
  };

  /**
   * Formats quota descriptions into a readable string.
   */
  const formatDescription = (description: Record<string, number>): string =>
    Object.entries(description)
      .filter(([_, value]) => value > 0)
      .map(([key, value]) => `${value} ${nameMap[key] || key.replace(/_/g, " ")}`)
      .join(", ") || "-";

  /**
   * Checks if all values in a quota description are zero.
   */
  const areAllDescriptionsZero = (description: Record<string, number>): boolean =>
    Object.values(description).every((v) => v === 0);

  return (
    <div
      className="flex flex-col items-center w-full p-6 bg-[#263238]
      border border-gray-500 rounded-xl shadow-2xl gap-12"
    >
      <h2 className="text-2xl font-bold text-center text-gray-400">Gestion Quota</h2>
      <div className="flex flex-row w-full justify-center gap-8">
        {quotaData && (
          <>
            {!areAllDescriptionsZero(quotaData.quota.description) && (
              <QuotaCard
                title="Quota"
                quota={formatCurrency(quotaData.quota.value)}
                description={formatDescription(quotaData.quota.description)}
                linkText="Calcul"
                valid={employee?.weekly_quota}
              />
            )}

            {!areAllDescriptionsZero(quotaData.quota_bonus.description) && (
              <QuotaCard
                title="Quota Bonus"
                quota={formatCurrency(quotaData.quota_bonus.value)}
                description={formatDescription(quotaData.quota_bonus.description)}
                linkText="Calcul"
                valid={employee?.weekly_quota_bonus}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default QuotaBento;
