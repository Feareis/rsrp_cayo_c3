import React, { useState, useMemo } from "react";
import UserTable from "../../components/pages/admin/user-management/UserManagementTable.tsx";
import { initialUsers, User } from "../../components/pages/admin/user-management/usersData.ts";


const UserManagement = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // 📌 Tri des utilisateurs par Grade -> Prénom -> Date d'embauche
  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => {

      // Tri par Grade en premier (ordre défini manuellement)
      const gradeOrder = ["Patron", "Co-Patron", "RH", "Responsable", "CDI", "CDD"];
      const gradeComparison = gradeOrder.indexOf(a.grade) - gradeOrder.indexOf(b.grade);
      if (gradeComparison !== 0) return gradeComparison;

      // Tri par Prénom (ordre alphabétique)
      const firstNameComparison = a.firstName.localeCompare(b.firstName);
      if (firstNameComparison !== 0) return firstNameComparison;

      // Tri par Date d'embauche (plus ancien en premier)
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
      <UserTable
        users={sortedUsers} // 📌 On passe les utilisateurs triés !
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

