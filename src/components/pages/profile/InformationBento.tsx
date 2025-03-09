import { useEffect, useState } from "react";
import InformationCard from "./InformationCard";
import { ShieldHalf, User, Phone, CalendarFold } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { supabase } from "../../../lib/supabaseClient";

const InformationBento: React.FC = () => {
  const { user } = useAuth();
  const [employee, setEmployee] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
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

  // Seniority calculation
  const calculateSeniority = (hireDate: string) => {
    if (!hireDate) return "Non spécifié";
    const hireDateObj = new Date(hireDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - hireDateObj.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const months = Math.floor(diffDays / 30);
    const weeks = Math.floor((diffDays % 30) / 7);
    const days = (diffDays % 30) % 7;

    return `${months > 0 ? `${months} mois, ` : ""}${weeks > 0 ? `${weeks} semaine${weeks > 1 ? "s" : ""}, ` : ""}${days > 0 ? `${days} jour${days > 1 ? "s" : ""}` : ""}`.replace(/, $/, "");
  };

  return (
    <div className="flex flex-col items-center w-full p-8 bg-[#263238] border border-gray-500 rounded-xl shadow-2xl gap-12">
      <h2 className="text-2xl font-bold text-center text-gray-400">Vos Informations</h2>
      <div className="flex flex-col w-full justify-center gap-8">
        <InformationCard
          title="Prénom Nom"
          icon={User}
          text={loading ? "..." : `${employee?.first_name ?? "Inconnu"} ${employee?.last_name ?? ""}`}
          className="text-purple-400"
        />
        <div className="flex flex-row w-full justify-center gap-8">
          <InformationCard
            title="Grade"
            icon={ShieldHalf}
            text={loading ? "..." : employee.grade}
            className={gradeColors[employee?.grade] ?? "text-white"}
          />
          <InformationCard
            title="Ancienneté"
            icon={CalendarFold}
            text={loading ? "..." : calculateSeniority(employee?.hire_date)}
            className="text-emerald-500"
          />
        </div>
        <InformationCard
          title="Téléphone"
          icon={Phone}
          text={loading ? "..." : employee?.phone_number ?? "Non fourni"}
          className=""
        />
      </div>
    </div>
  );
};

export default InformationBento;
