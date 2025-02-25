import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function useFetchEmployees(companyName: string) {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      setError(null);

      const { data: company, error: companyError } = await supabase
        .from("companies")
        .select("id")
        .eq("name", companyName)
        .single();

      if (companyError || !company) {
        setError("Impossible de trouver la compagnie.");
        setLoading(false);
        return;
      }

      const { data: employees, error: employeesError } = await supabase
        .from("employees")
        .select("*")
        .eq("company_id", company.id);

      if (employeesError) {
        setError("Erreur lors de la récupération des employés.");
        setLoading(false);
        return;
      }

      setEmployees(employees);
      setLoading(false);
    };

    fetchEmployees();
  }, [companyName]);

  return { employees, loading, error };
}
