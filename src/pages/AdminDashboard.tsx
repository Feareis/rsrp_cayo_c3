import React, { useMemo, useEffect, useState } from "react";
import AdminDashboardManagementTable from "../components/pages/dashboard/AdminDashboardManagementTable.tsx";
import { useFetchEmployees } from "../hooks/useFetchEmployees";

const AdminDashboard = () => {
  const { employees, loading, error } = useFetchEmployees("La Cantina");
  const [users, setUsers] = useState([]);

  // Met à jour `users` dès que `employees` est chargé
  useEffect(() => {
    if (employees) {
      setUsers(employees);
    }
  }, [employees]);

  // Calcul des statistiques des employés
  const totalEmployees = useMemo(() => users.length, [users]);
  const totalQuotaOK = useMemo(() => users.filter(user => user.weekly_quota === true).length, [users]);
  const totalQuotaBonusOK = useMemo(() => users.filter(user => user.weekly_quota_bonus === true).length, [users]);

  // Tri par Grade -> Prénom -> Date d'embauche
  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => {
      const gradeOrder = ["Patron", "Co-Patron", "RH", "Responsable", "CDI", "CDD"];
      const gradeComparison = gradeOrder.indexOf(a.grade) - gradeOrder.indexOf(b.grade);
      if (gradeComparison !== 0) return gradeComparison;

      const firstNameComparison = a.first_name.localeCompare(b.first_name);
      if (firstNameComparison !== 0) return firstNameComparison;
    });
  }, [users]);


  return (
    <div className="text-[#cfd8dc]">
      {/* Section des statistiques */}
      <div className="flex justify-between mb-6 gap-4">
        <div className="bg-[#37474f] border border-gray-600 p-4 rounded-lg shadow-lg w-full text-center">
          <p className="text-lg font-semibold">Total Employés</p>
          <p className="text-2xl font-bold text-green-400">{totalEmployees}</p>
        </div>
        <div className="bg-[#37474f] border border-gray-600 p-4 rounded-lg shadow-lg w-full text-center">
          <p className="text-lg font-semibold">Total Quota Effectués</p>
          <p className="text-2xl font-bold text-violet-400">{totalQuotaOK}</p>
        </div>
        <div className="bg-[#37474f] border border-gray-600 p-4 rounded-lg shadow-lg w-full text-center">
          <p className="text-lg font-semibold">Total Quota Bonus Effectués</p>
          <p className="text-2xl font-bold text-yellow-400">{totalQuotaBonusOK}</p>
        </div>
      </div>

      {/* Tableau des utilisateurs */}
      <AdminDashboardManagementTable users={sortedUsers} />
    </div>
  );
};

export default AdminDashboard;
