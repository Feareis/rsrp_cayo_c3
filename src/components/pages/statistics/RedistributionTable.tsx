import { useEffect, useState } from "react";
import RedistributionTableSection from "./RedistributionTableSection";
import { supabase } from "../../../lib/supabaseClient";

/**
 * Defines the grade order for sorting.
 */
const gradeOrder = ["Patron, Co-Patron", "Responsable", "CDI", "CDD"];

/**
 * Props type for RedistributionTable component.
 */
interface RedistributionTableProps {
  onLoadingComplete?: () => void;
}

/**
 * RedistributionTable component displays redistribution rates and taxes.
 */
const RedistributionTable: React.FC<RedistributionTableProps> = ({ onLoadingComplete }) => {
  const [redistributionRatesData, setRedistributionRatesData] = useState<{ name: string; rate: string }[]>([]);
  const [redistributionTaxData, setRedistributionTaxData] = useState<{ name: string; rate: string }[]>([]);
  const [loading, setLoading] = useState(true);

  /**
   * Sorts the redistribution data by predefined grade order.
   */
  const sortByGradeOrder = (data: { name: string; rate: string }[]) => {
    return data.sort((a, b) => {
      const indexA = gradeOrder.indexOf(a.name);
      const indexB = gradeOrder.indexOf(b.name);

      // If a grade is not in the predefined order, place it at the end
      return (indexA === -1 ? gradeOrder.length : indexA) - (indexB === -1 ? gradeOrder.length : indexB);
    });
  };

  /**
   * Fetches redistribution rates and tax data.
   */
  const fetchData = async () => {
    setLoading(true);
    try {
      const [{ data: redistributionRates, error: ratesError }, { data: redistributionTax, error: taxError }] = await Promise.all([
        supabase.from("data").select("value").eq("key", "redistribution_rates").single(),
        supabase.from("data").select("value").eq("key", "redistribution_tax").single(),
      ]);

      if (ratesError) throw ratesError;
      if (taxError) throw taxError;

      // Format redistribution rates
      if (redistributionRates?.value && typeof redistributionRates.value === "object") {
        const formattedRates = Object.entries(redistributionRates.value).map(([name, rate]) => ({
          name,
          rate: `${(Number(rate) * 100).toFixed(0)}%`,
        }));

        setRedistributionRatesData(sortByGradeOrder(formattedRates));
      }

      // Extract dirty sales tax
      if (redistributionTax?.value?.dirty_client_sales !== undefined) {
        setRedistributionTaxData([
          {
            name: "Vente Client",
            rate: `${(Number(redistributionTax.value.dirty_client_sales) * 100).toFixed(0)}%`,
          },
        ]);
      }
    } catch (err) {
      console.error("Error fetching redistribution data:", err);
    } finally {
      setLoading(false);
      if (onLoadingComplete) onLoadingComplete();
    }
  };

  useEffect(() => {
    fetchData();

    // Realtime subscriptions for data changes
    const dataSubscription = supabase
      .channel("realtime-data")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "data", filter: "key=in.(redistribution_rates,redistribution_tax)" },
        fetchData
      )
      .subscribe();

    return () => {
      supabase.removeChannel(dataSubscription);
    };
  }, [onLoadingComplete]);

  return (
    <div
      className="flex flex-col items-center w-full p-6 bg-[#263238]
      border border-gray-500 rounded-xl shadow-xl gap-12"
    >
      <h2 className="text-2xl font-bold text-center text-gray-400">
        Taux & Taxe de redistribution
      </h2>
      <div className="flex flex-col w-full gap-12">
        <RedistributionTableSection
          title="Propre"
          percentageColor="propre"
          data={redistributionRatesData}
        />
        <RedistributionTableSection
          title="Taxe Sale"
          percentageColor="sale"
          data={redistributionTaxData}
        />
      </div>
    </div>
  );
};

export default RedistributionTable;
