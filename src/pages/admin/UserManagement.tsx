import React, { useState, useEffect, useMemo } from "react";
import UMT from "../../components/pages/admin/user-management/UserManagementTable.tsx";
import { useFetchEmployees } from "../../hooks/useFetchEmployees";
import { supabase } from "../../lib/supabaseClient";

const UserManagement = () => {
  const { employees, loading } = useFetchEmployees();
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  // Update `users` when `employees` changes
  useEffect(() => {
    if (employees) {
      setUsers(employees);
    }
  }, [employees]);

  // Real-time updates from Supabase
  useEffect(() => {
    const channel = supabase
      .channel("employees-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "employees" },
        (payload) => {
          setUsers((prev) => {
            if (payload.eventType === "INSERT") {
              return [...prev, payload.new];
            } else if (payload.eventType === "UPDATE") {
              return prev.map((user) => (user.id === payload.new.id ? payload.new : user));
            } else if (payload.eventType === "DELETE") {
              return prev.filter((user) => user.id !== payload.old.id);
            }
            return prev;
          });
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  // Sorting users by Grade → First Name → Hire Date
  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => {
      const gradeOrder = ["Patron", "Co-Patron", "RH", "Responsable", "CDI", "CDD"];
      const gradeComparison = gradeOrder.indexOf(a.grade) - gradeOrder.indexOf(b.grade);
      if (gradeComparison !== 0) return gradeComparison;

      const firstNameComparison = a.first_name.localeCompare(b.first_name);
      if (firstNameComparison !== 0) return firstNameComparison;

      return new Date(a.hire_date).getTime() - new Date(b.hire_date).getTime();
    });
  }, [users]);

  // Employee statistics
  const totalEmployees = users.length;
  const totalResponsables = users.filter(user => user.grade === "Responsable").length;
  const totalCDI = users.filter(user => user.grade === "CDI").length;
  const totalCDD = users.filter(user => user.grade === "CDD").length;

  // Handle selection changes
  const handleSelectedChange = (selected: string[]) => {
    setSelectedUsers(selected);
  };

  // Handle deletion of users
  const handleDelete = (userIds: string[]) => {
    setUsers((prev) => prev.filter((user) => !userIds.includes(user.id)));
    setSelectedUsers([]);
  };

  // Handle user edits
  const handleEdit = (updatedUser) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  return (
    <div className="text-[#cfd8dc]">
      
      {/* Employee Stats */}
      <div className="flex justify-between mb-6 gap-4">
        <StatCard title="Total Employés" value={totalEmployees} color="text-green-400" />
        <StatCard title="Total Responsables" value={totalResponsables} color="text-yellow-400" />
        <StatCard title="Total CDI" value={totalCDI} color="text-blue-400" />
        <StatCard title="Total CDD" value={totalCDD} color="text-blue-300" />
      </div>

      {/* User Table */}
      <UMT
        users={sortedUsers}
        setUsers={setUsers}
        selected={selectedUsers}
        onSelectedChange={handleSelectedChange}
        onDelete={handleDelete}
        onEdit={handleEdit}
        processing={loading}
      />
    </div>
  );
};

// Component for individual statistics cards
const StatCard = ({ title, value, color }) => (
  <div className="bg-[#37474f] border border-gray-600 p-4 rounded-lg shadow-lg w-full text-center">
    <p className="text-lg font-semibold">{title}</p>
    <p className={`text-2xl font-bold ${color}`}>{value}</p>
  </div>
);

export default UserManagement;
