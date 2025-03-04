import { useEffect, useState } from "react";
import QuotaCard from "./QuotaCard";
import { useAuth } from "../../../context/AuthContext";
import { supabase } from "../../../lib/supabaseClient";

// Define the type for quota data
interface Quota {
  value: number;
  description: Record<string, number>;
}

interface QuotaData {
  quota: Quota;
  quota_bonus: Quota;
}

const QuotaBento: React.FC = () => {
  const { user } = useAuth();
  const [quotaData, setQuotaData] = useState<QuotaData | null>(null);

  useEffect(() => {
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
        console.error("Erreur lors de la récupération des quotas :", err);
      }
    };

    fetchQuotaData();
  }, []);

  // Format numbers into currency format
  const formatCurrency = (value?: number): string =>
    value && value > 0 ? `${value.toLocaleString("en-EN", { minimumFractionDigits: 0 })} $` : "-";

  // Function to format quota description
  const formatDescription = (description: Record<string, number>): string =>
    Object.entries(description)
      .filter(([_, value]) => value > 0)
      .map(([key, value]) => `${value} ${key.charAt(0).toUpperCase() + key.slice(1)}`)
      .join(", ") || "-";

  // Check if all values in the description are zero
  const areAllDescriptionsZero = (description: Record<string, number>): boolean =>
    Object.values(description).every((v) => v === 0);

  return (
    <div className="flex flex-col items-center w-full p-6 bg-[#263238] border border-gray-500 rounded-xl shadow-2xl gap-12">
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
                valid={user?.employee?.weekly_quota}
              />
            )}

            {!areAllDescriptionsZero(quotaData.quota_bonus.description) && (
              <QuotaCard
                title="Quota Bonus"
                quota={formatCurrency(quotaData.quota_bonus.value)}
                description={formatDescription(quotaData.quota_bonus.description)}
                linkText="Calcul"
                valid={user?.employee?.weekly_quota_bonus}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default QuotaBento;
