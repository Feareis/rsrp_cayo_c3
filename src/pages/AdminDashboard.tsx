import React, { useMemo, useEffect, useState } from "react";
import AdminDashboardManagementTable from "../components/pages/dashboard/AdminDashboardManagementTable.tsx";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";


const AdminDashboard = () => {
  const { user } = useAuth(); // Get the authenticated user
  const [users, setUsers] = useState([]); // Stores the list of employees
  const [loading, setLoading] = useState(true); // Controls loading state
  const currentUserId = user?.employee_id || null; // Get the current user's ID
  const [updateKey, setUpdateKey] = useState(0); // Used to force a re-render when necessary

  // Stores statistics related to employees
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalQuotaOK: 0,
    totalQuotaBonusOK: 0
  });

  // Update statistics whenever the employee list changes
  useEffect(() => {
    setStats({
      totalEmployees: users.length,
      totalQuotaOK: users.filter(user => user.weekly_quota).length,
      totalQuotaBonusOK: users.filter(user => user.weekly_quota_bonus).length
    });

    setUpdateKey(prevKey => prevKey + 1); // 🔥 Force re-render when stats update
  }, [users]);

  // Fetch employees from Supabase
  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("employees")
        .select("id, first_name, last_name, grade, clean_export_sales, clean_client_sales, dirty_client_sales, weekly_quota, weekly_quota_bonus");

      if (error) {
        console.error("❌ Error fetching employees:", error.message);
      } else {
        setUsers(data || []);
      }
      setLoading(false);
    };

    fetchEmployees();
  }, []);

  // Listen for real-time updates from Supabase
  useEffect(() => {
    const channel = supabase
      .channel("employees-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "employees" },
        (payload) => {
          setUsers(prevUsers => {
            if (payload.eventType === "INSERT") {
              return [...prevUsers, payload.new];
            } else if (payload.eventType === "UPDATE") {
              return prevUsers.map(user => (user.id === payload.new.id ? payload.new : user));
            } else if (payload.eventType === "DELETE") {
              return prevUsers.filter(user => user.id !== payload.old.id);
            }
            return prevUsers;
          });
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe(); // Cleanup subscription when component unmounts
    };
  }, []);

  // Sort employees by Grade -> First Name -> Hire Date
  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => {
      const gradeOrder = ["Patron", "Co-Patron", "RH", "Responsable", "CDI", "CDD"];
      const gradeComparison = gradeOrder.indexOf(a.grade) - gradeOrder.indexOf(b.grade);
      if (gradeComparison !== 0) return gradeComparison;

      return a.first_name.localeCompare(b.first_name);
    });
  }, [users]);


  return (
    <div key="static-dashboard" className="text-[#cfd8dc]">
      {/* Statistics Section */}
      <div className="flex justify-between mb-6 gap-4">
        {/* Total Employees */}
        <div className="bg-[#37474f] border border-gray-600 p-4 rounded-lg shadow-lg w-full text-center">
          <p className="text-lg font-semibold">Total Employés</p>
          <p className="text-2xl font-bold text-green-400">{stats.totalEmployees}</p>
        </div>

        {/* Total Quota Completed */}
        <div className="bg-[#37474f] border border-gray-600 p-4 rounded-lg shadow-lg w-full text-center">
          <p className="text-lg font-semibold">Total Quota Effectués</p>
          <p className="text-2xl font-bold text-violet-400">{stats.totalQuotaOK}</p>
        </div>

        {/* Total Bonus Quota Completed */}
        <div className="bg-[#37474f] border border-gray-600 p-4 rounded-lg shadow-lg w-full text-center">
          <p className="text-lg font-semibold">Total Quota Bonus Effectués</p>
          <p className="text-2xl font-bold text-yellow-400">{stats.totalQuotaBonusOK}</p>
        </div>
      </div>

      {/* Users Table */}
      {loading ? (
        <p className="text-center text-lg">Chargement...</p>
      ) : (
        <AdminDashboardManagementTable
          users={sortedUsers}
          setUsers={setUsers}
          currentUserId={currentUserId}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
