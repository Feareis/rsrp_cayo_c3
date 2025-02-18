import React, { useState, useMemo } from "react";
import UserTable from "../../components/pages/admin/user-management/UserManagementTable.tsx";
import { initialUsers, User } from "../../components/pages/admin/user-management/usersData.ts";

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // 📌 Calcul des statistiques des employés
  const totalEmployees = useMemo(() => users.length, [users]);
  const totalRh = useMemo(() => users.filter(user => user.grade === "RH").length, [users]);
  const totalManagers = useMemo(() => users.filter(user => user.grade === "Responsable").length, [users]);
  const totalCDI = useMemo(() => users.filter(user => user.grade === "CDI").length, [users]);
  const totalCDD = useMemo(() => users.filter(user => user.grade === "CDD").length, [users]);

  // 📌 Tri des utilisateurs par Grade -> Prénom -> Date d'embauche
  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => {
      const gradeOrder = ["Patron", "Co-Patron", "RH", "Responsable", "CDI", "CDD"];
      const gradeComparison = gradeOrder.indexOf(a.grade) - gradeOrder.indexOf(b.grade);
      if (gradeComparison !== 0) return gradeComparison;
      const firstNameComparison = a.firstName.localeCompare(b.firstName);
      if (firstNameComparison !== 0) return firstNameComparison;
      return new Date(a.hireDate).getTime() - new Date(b.hireDate).getTime();
    });
  }, [users]);

  const handleSelectedChange = (selected: string[]) => {
    setSelectedUsers(selected);
  };

  const handleDelete = (userIds: string[]) => {
    setUsers((prev) => prev.filter((user) => !userIds.includes(user.id)));
    setSelectedUsers([]);
  };

  const handleEdit = (user: User) => {
    const newGrade = prompt(`Modifier le grade de ${user.firstName}:`, user.grade);
    if (newGrade) {
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, grade: newGrade as User["grade"] } : u))
      );
    }
  };

  return (
    <div className="text-[#cfd8dc]">
      {/* 📌 Section des statistiques */}
      <div className="flex justify-between mb-6 gap-4">
        <div className="bg-[#37474f] border border-gray-600 p-4 rounded-lg shadow-lg w-[23%] text-center">
          <p className="text-lg font-semibold">Total Employés</p>
          <p className="text-2xl font-bold text-green-400">{totalEmployees}</p>
        </div>
        <div className="bg-[#37474f] border border-gray-600 p-4 rounded-lg shadow-lg w-[23%] text-center">
          <p className="text-lg font-semibold">Total RH</p>
          <p className="text-2xl font-bold text-violet-400">{totalRh}</p>
        </div>
        <div className="bg-[#37474f] border border-gray-600 p-4 rounded-lg shadow-lg w-[23%] text-center">
          <p className="text-lg font-semibold">Total Responsables</p>
          <p className="text-2xl font-bold text-yellow-400">{totalManagers}</p>
        </div>
        <div className="bg-[#37474f] border border-gray-600 p-4 rounded-lg shadow-lg w-[23%] text-center">
          <p className="text-lg font-semibold">Total CDI</p>
          <p className="text-2xl font-bold text-blue-400">{totalCDI}</p>
        </div>
        <div className="bg-[#37474f] border border-gray-600 p-4 rounded-lg shadow-lg w-[23%] text-center">
          <p className="text-lg font-semibold">Total CDD</p>
          <p className="text-2xl font-bold text-blue-300">{totalCDD}</p>
        </div>
      </div>

      {/* 📌 Table des utilisateurs */}
      <UserTable
        users={sortedUsers}
        selected={selectedUsers}
        onSelectedChange={handleSelectedChange}
        onDelete={handleDelete}
        onEdit={handleEdit}
        processing={loading}
      />
    </div>
  );
};

export default UserManagement;
