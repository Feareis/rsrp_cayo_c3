import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function useFetchEmployees() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      setError(null);

      const { data: employees, error: employeesError } = await supabase
        .from("employees")
        .select("*");

      if (employeesError) {
        setError("Erreur lors de la récupération des employés.");
        setLoading(false);
        return;
      }

      setEmployees(employees);
      setLoading(false);
    };

    fetchEmployees();
  }, []);

  return { employees, loading, error };
}
