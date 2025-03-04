import { useEffect, useState } from "react";
import RedistributionTableSection from "./RedistributionTableSection";
import { supabase } from "../../../lib/supabaseClient";

// Define the grade order for sorting
const gradeOrder = ["Patron, Co-Patron", "Responsable", "CDI", "CDD"];

interface RedistributionTableProps {
  onLoadingComplete?: () => void;
}

const RedistributionTable: React.FC<RedistributionTableProps> = ({ onLoadingComplete }) => {
  const [redistributionData, setRedistributionData] = useState<{ grade: string; rate: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("data")
          .select("value")
          .eq("key", "redistribution_rates")
          .single();

        if (error) throw error;

        if (data?.value && typeof data.value === "object") {
          const formattedData = Object.entries(data.value).map(([grade, rate]) => ({
            grade,
            rate: `${(Number(rate) * 100).toFixed(0)}%`,
          }));

          // Sort data based on predefined grade order
          const sortedData = formattedData.sort((a, b) => {
            const indexA = gradeOrder.indexOf(a.grade);
            const indexB = gradeOrder.indexOf(b.grade);
            return (indexA === -1 ? gradeOrder.length : indexA) -
                   (indexB === -1 ? gradeOrder.length : indexB);
          });

          setRedistributionData(sortedData);
        }
      } catch (err) {
        console.error("Error fetching redistribution rates:", err);
      } finally {
        setLoading(false);
        if (onLoadingComplete) onLoadingComplete();
      }
    };

    fetchData();
  }, [onLoadingComplete]);

  const saleData = [{ grade: "Vente Client", rate: "10%" }];

  return (
    <div className="flex flex-col items-center w-full p-6 bg-[#263238] border border-gray-500 rounded-xl shadow-xl gap-12">
      <h2 className="text-2xl font-bold text-center text-gray-400">
        Taux & Taxe de redistribution
      </h2>
      <div className="flex flex-col w-full gap-12">
        <RedistributionTableSection title="Propre" percentageColor="propre" data={redistributionData} />
        <RedistributionTableSection title="Taxe Sale" percentageColor="sale" data={saleData} />
      </div>
    </div>
  );
};

export default RedistributionTable;
