import React, { useMemo, useEffect, useState } from "react";
import SiteAccessTable from "../../components/pages/admin/SiteAccessTable.tsx";
import { supabase } from "../../lib/supabaseClient";
import { useAuth } from "../../context/AuthContext";


const SiteAccess = () => {
  const { user } = useAuth(); // Get the authenticated user
  const [users, setUsers] = useState([]); // Stores the list of employees
  const [loading, setLoading] = useState(true); // Controls loading state
  const currentUserId = user?.employee_id || null; // Get the current user's ID
  const [updateKey, setUpdateKey] = useState(0); // Used to force a re-render when necessary

  // Stores statistics related to employees
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAdmins: 0,
    totalActiveUsers: 0,
    totalInactiveUsers: 0
  });

  // Update statistics whenever the employee list changes
  useEffect(() => {
    setStats({
      totalUsers: users.length,
      totalAdmins: users.filter(user => user.role === "admin").length,
      totalActiveUsers: users.filter(user => user.is_active).length,
      totalInactiveUsers: users.filter(user => !user.is_active).length,
    });
  }, [users]);

  // Fetch user acces from Supabase
  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("access")
      .select("id, employee_id, first_name, last_name, grade, role, username, is_active, created_at");

    if (error) {
      console.error("Error fetching site access data:", error.message);
    } else {
      setUsers(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Listen for real-time updates from Supabase
  useEffect(() => {
    const channel = supabase
      .channel("access-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "access" }, (payload) => {
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
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  // Sort employees by Grade -> First Name -> Hire Date
  const sortedUsers = useMemo(() => {
      return [...users].sort((a, b) => {
        const gradeOrder = ["Patron", "Co-Patron", "RH", "Responsable", "CDI", "CDD"];
        const roleOrder = { admin: 1, limited_admin: 2, user: 3 };

        const gradeComparison = gradeOrder.indexOf(a.grade) - gradeOrder.indexOf(b.grade);
        if (gradeComparison !== 0) return gradeComparison;

        const roleComparison = roleOrder[a.role] - roleOrder[b.role];
        if (roleComparison !== 0) return roleComparison;

        const firstNameA = a.first_name || "";
        const firstNameB = b.first_name || "";
        return firstNameA.localeCompare(firstNameB);
      });
    }, [users]);


  return (
    <div key="static-dashboard" className="text-[#cfd8dc]">
      {/* Statistics Section */}
      <div className="flex justify-between mb-6 gap-4">
        {/* Total Employees */}
        <div className="bg-[#37474f] border border-gray-600 p-4 rounded-lg shadow-lg w-full text-center">
          <p className="text-lg font-bold">Total Users</p>
          <p className="text-2xl font-bold text-green-400">{stats.totalUsers}</p>
        </div>

        {/* Total Bonus Quota Completed */}
        <div className="bg-[#37474f] border border-gray-600 p-4 rounded-lg shadow-lg w-full text-center">
          <p className="text-lg font-bold">Total Active users</p>
          <p className="text-2xl font-bold text-yellow-400">{stats.totalActiveUsers}</p>
        </div>

        {/* Total Employees */}
        <div className="bg-[#37474f] border border-gray-600 p-4 rounded-lg shadow-lg w-full text-center">
          <p className="text-lg font-bold">Total Inactive Users</p>
          <p className="text-2xl font-bold text-red-400">{stats.totalInactiveUsers}</p>
        </div>

        {/* Total Quota Completed */}
        <div className="bg-[#37474f] border border-gray-600 p-4 rounded-lg shadow-lg w-full text-center">
          <p className="text-lg font-bold">Mot de passe par default</p>
          <p className="text-2xl font-bold text-violet-400">pass</p>
        </div>
      </div>

      {/* Users Table */}
      {loading ? (
        <p className="text-center text-lg">Chargement...</p>
      ) : (
        <SiteAccessTable users={sortedUsers} setUsers={setUsers} />
      )}
    </div>
  );
};

export default SiteAccess;
