export interface User {
  id: string;
  firstName: string;
  lastName: string;
  grade: "Patron" | "Co-Patron" | "RH" | "Responsable" | "CDI" | "CDD";
  total_clean_money_employee: string;
  total_clean_money_enterprise: string;
  vep: string;
  vcp: string;
  quota: boolean;
  quota_bonus: boolean;
  employee_prime_s1: string;
}


export const initialUsers: User[] = [
  { id: "1", firstName: "Alice", lastName: "Dupont", grade: "Patron", total_clean_money_employee: 733333, total_clean_money_enterprise: 220000, vep: 100000, vcp: 120000, quota: false, quota_bonus: false, employee_prime_s1: 122000 },
  { id: "2", firstName: "Bob", lastName: "Martin", grade: "Co-Patron", total_clean_money_employee: 733333, total_clean_money_enterprise: 220000, vep: 100000, vcp: 120000, quota: true, quota_bonus: true, employee_prime_s1: 122000 },
  { id: "3", firstName: "Charlie", lastName: "Durand", grade: "RH", total_clean_money_employee: 733333, total_clean_money_enterprise: 220000, vep: 100000, vcp: 120000, quota: false, quota_bonus: false, employee_prime_s1: 122000 },
  { id: "4", firstName: "David", lastName: "Lemoine", grade: "RH", total_clean_money_employee: 733333, total_clean_money_enterprise: 220000, vep: 100000, vcp: 120000, quota: false, quota_bonus: false, employee_prime_s1: 122000 },
  { id: "5", firstName: "Emma", lastName: "Moreau", grade: "RH", total_clean_money_employee: 733333, total_clean_money_enterprise: 220000, vep: 100000, vcp: 120000, quota: true, quota_bonus: false, employee_prime_s1: 122000 },
  { id: "6", firstName: "Fabrice", lastName: "Bernard", grade: "Responsable", total_clean_money_employee: 733333, total_clean_money_enterprise: 220000, vep: 100000, vcp: 120000, quota: true, quota_bonus: false, employee_prime_s1: 122000 },
  { id: "7", firstName: "Gabrielle", lastName: "Simon", grade: "Responsable", total_clean_money_employee: 733333, total_clean_money_enterprise: 220000, vep: 100000, vcp: 120000, quota: false, quota_bonus: false, employee_prime_s1: 122000 },
  { id: "8", firstName: "Hugo", lastName: "Lefevre", grade: "Responsable", total_clean_money_employee: 733333, total_clean_money_enterprise: 220000, vep: 100000, vcp: 120000, quota: true, quota_bonus: true, employee_prime_s1: 122000 },
  { id: "9", firstName: "Isabelle", lastName: "Girard", grade: "CDI", total_clean_money_employee: 733333, total_clean_money_enterprise: 220000, vep: 100000, vcp: 120000, quota: false, quota_bonus: false, employee_prime_s1: 122000 },
  { id: "10", firstName: "Jérôme", lastName: "Robert", grade: "CDI", total_clean_money_employee: 733333, total_clean_money_enterprise: 220000, vep: 100000, vcp: 120000, quota: false, quota_bonus: false, employee_prime_s1: 122000 },
  { id: "11", firstName: "Kévin", lastName: "Dumont", grade: "CDI", total_clean_money_employee: 733333, total_clean_money_enterprise: 220000, vep: 100000, vcp: 120000, quota: false, quota_bonus: false, employee_prime_s1: 122000 },
  { id: "12", firstName: "Laura", lastName: "Perrot", grade: "CDI", total_clean_money_employee: 733333, total_clean_money_enterprise: 220000, vep: 100000, vcp: 120000, quota: true, quota_bonus: false, employee_prime_s1: 122000 },
  { id: "13", firstName: "Mathieu", lastName: "Benoît", grade: "CDI", total_clean_money_employee: 733333, total_clean_money_enterprise: 220000, vep: 100000, vcp: 120000, quota: true, quota_bonus: true, employee_prime_s1: 122000 },
  { id: "14", firstName: "Nathan", lastName: "Lemoine", grade: "CDI", total_clean_money_employee: 733333, total_clean_money_enterprise: 220000, vep: 100000, vcp: 120000, quota: true, quota_bonus: true, employee_prime_s1: 122000 },
  { id: "15", firstName: "Olivia", lastName: "Renard", grade: "CDI", total_clean_money_employee: 733333, total_clean_money_enterprise: 220000, vep: 100000, vcp: 120000, quota: false, quota_bonus: false, employee_prime_s1: 122000 },
  { id: "16", firstName: "Pierre", lastName: "Mercier", grade: "CDI", total_clean_money_employee: 733333, total_clean_money_enterprise: 220000, vep: 100000, vcp: 120000, quota: false, quota_bonus: false, employee_prime_s1: 122000 },
  { id: "17", firstName: "Quentin", lastName: "Lucas", grade: "CDI", total_clean_money_employee: 733333, total_clean_money_enterprise: 220000, vep: 100000, vcp: 120000, quota: false, quota_bonus: false, employee_prime_s1: 122000 },
  { id: "18", firstName: "Raphaël", lastName: "Chevalier", grade: "CDD", total_clean_money_employee: 733333, total_clean_money_enterprise: 220000, vep: 100000, vcp: 120000, quota: true, quota_bonus: true, employee_prime_s1: 122000 },
  { id: "19", firstName: "Sophie", lastName: "Garnier", grade: "CDD", total_clean_money_employee: 733333, total_clean_money_enterprise: 220000, vep: 100000, vcp: 120000, quota: true, quota_bonus: false, employee_prime_s1: 122000 },
  { id: "20", firstName: "Théo", lastName: "Barbier", grade: "CDD", total_clean_money_employee: 733333, total_clean_money_enterprise: 220000, vep: 100000, vcp: 120000, quota: false, quota_bonus: false, employee_prime_s1: 122000 },
  { id: "21", firstName: "Ugo", lastName: "Adam", grade: "CDD", total_clean_money_employee: 733333, total_clean_money_enterprise: 220000, vep: 100000, vcp: 120000, quota: true, quota_bonus: false, employee_prime_s1: 122000 },
  { id: "22", firstName: "Valentine", lastName: "Picard", grade: "CDD", total_clean_money_employee: 733333, total_clean_money_enterprise: 220000, vep: 100000, vcp: 120000, quota: false, quota_bonus: false, employee_prime_s1: 122000 },
  { id: "23", firstName: "William", lastName: "Poiret", grade: "CDD", total_clean_money_employee: 733333, total_clean_money_enterprise: 220000, vep: 100000, vcp: 120000, quota: true, quota_bonus: true, employee_prime_s1: 122000 },
  { id: "24", firstName: "Xavier", lastName: "Dubois", grade: "CDD", total_clean_money_employee: 733333, total_clean_money_enterprise: 220000, vep: 100000, vcp: 120000, quota: false, quota_bonus: false, employee_prime_s1: 122000 },
  { id: "25", firstName: "Yasmine", lastName: "Leclerc", grade: "CDD", total_clean_money_employee: 733333, total_clean_money_enterprise: 220000, vep: 100000, vcp: 120000, quota: false, quota_bonus: false, employee_prime_s1: 122000 },
  { id: "26", firstName: "Zacharie", lastName: "Lemoine", grade: "CDD", total_clean_money_employee: 733333, total_clean_money_enterprise: 220000, vep: 100000, vcp: 120000, quota: true, quota_bonus: true, employee_prime_s1: 122000 },
];
