export interface User {
  id: string;
  firstName: string;
  lastName: string;
  grade: "Patron" | "Co-Patron" | "RH" | "Responsable" | "CDI" | "CDD";
  phone: string;
  hireDate: string;
  weeklyQuota: boolean;
  weeklyQuotaBonus: boolean;
  holidays: boolean;
  warning1: boolean;
  warning2: boolean;
}


export const initialUsers: User[] = [
  { id: "1", firstName: "Alice", lastName: "Dupont", grade: "Patron", phone: "(123) 456-7890", hireDate: "2020-03-15", weeklyQuota: true, weeklyQuotaBonus: false, holidays: false, warning1: false, warning2: false },
  { id: "2", firstName: "Bob", lastName: "Martin", grade: "Co-Patron", phone: "(234) 567-8901", hireDate: "2019-07-22", weeklyQuota: true, weeklyQuotaBonus: true, holidays: true, warning1: false, warning2: false },
  { id: "3", firstName: "Charlie", lastName: "Durand", grade: "RH", phone: "(345) 678-9012", hireDate: "2021-01-10", weeklyQuota: false, weeklyQuotaBonus: true, holidays: false, warning1: true, warning2: false },
  { id: "4", firstName: "David", lastName: "Lemoine", grade: "RH", phone: "(456) 789-0123", hireDate: "2022-05-18", weeklyQuota: true, weeklyQuotaBonus: false, holidays: false, warning1: false, warning2: true },
  { id: "5", firstName: "Emma", lastName: "Moreau", grade: "CDI", phone: "(567) 890-1234", hireDate: "2018-11-25", weeklyQuota: true, weeklyQuotaBonus: true, holidays: true, warning1: false, warning2: false },
  { id: "6", firstName: "Fabrice", lastName: "Bernard", grade: "CDD", phone: "(678) 901-2345", hireDate: "2017-06-30", weeklyQuota: false, weeklyQuotaBonus: false, holidays: false, warning1: false, warning2: false },
  { id: "7", firstName: "Gabrielle", lastName: "Simon", grade: "CDI", phone: "(789) 012-3456", hireDate: "2023-02-12", weeklyQuota: true, weeklyQuotaBonus: false, holidays: false, warning1: false, warning2: false },
  { id: "8", firstName: "Hugo", lastName: "Lefevre", grade: "Responsable", phone: "(890) 123-4567", hireDate: "2020-08-08", weeklyQuota: true, weeklyQuotaBonus: true, holidays: true, warning1: false, warning2: true },
  { id: "9", firstName: "Isabelle", lastName: "Girard", grade: "CDD", phone: "(901) 234-5678", hireDate: "2019-09-14", weeklyQuota: false, weeklyQuotaBonus: false, holidays: false, warning1: false, warning2: false },
  { id: "10", firstName: "Jérôme", lastName: "Robert", grade: "Responsable", phone: "(012) 345-6789", hireDate: "2021-12-05", weeklyQuota: true, weeklyQuotaBonus: false, holidays: true, warning1: false, warning2: false },
  { id: "11", firstName: "Kévin", lastName: "Dumont", grade: "Responsable", phone: "(111) 222-3333", hireDate: "2016-04-20", weeklyQuota: false, weeklyQuotaBonus: true, holidays: false, warning1: true, warning2: false },
  { id: "12", firstName: "Laura", lastName: "Perrot", grade: "CDI", phone: "(222) 333-4444", hireDate: "2015-10-15", weeklyQuota: false, weeklyQuotaBonus: false, holidays: false, warning1: false, warning2: false },
  { id: "13", firstName: "Mathieu", lastName: "Benoît", grade: "CDD", phone: "(333) 444-5555", hireDate: "2023-01-01", weeklyQuota: true, weeklyQuotaBonus: false, holidays: true, warning1: false, warning2: false },
  { id: "14", firstName: "Nathan", lastName: "Lemoine", grade: "CDD", phone: "(444) 555-6666", hireDate: "2018-07-12", weeklyQuota: false, weeklyQuotaBonus: false, holidays: false, warning1: false, warning2: false },
  { id: "15", firstName: "Olivia", lastName: "Renard", grade: "CDI", phone: "(555) 666-7777", hireDate: "2022-06-08", weeklyQuota: true, weeklyQuotaBonus: false, holidays: true, warning1: false, warning2: false },
  { id: "16", firstName: "Pierre", lastName: "Mercier", grade: "CDD", phone: "(666) 777-8888", hireDate: "2020-10-20", weeklyQuota: false, weeklyQuotaBonus: true, holidays: false, warning1: true, warning2: false },
  { id: "17", firstName: "Quentin", lastName: "Lucas", grade: "CDD", phone: "(777) 888-9999", hireDate: "2019-03-25", weeklyQuota: true, weeklyQuotaBonus: true, holidays: false, warning1: false, warning2: false },
  { id: "18", firstName: "Raphaël", lastName: "Chevalier", grade: "CDI", phone: "(888) 999-0000", hireDate: "2021-09-10", weeklyQuota: true, weeklyQuotaBonus: false, holidays: true, warning1: false, warning2: true },
  { id: "19", firstName: "Sophie", lastName: "Garnier", grade: "CDD", phone: "(999) 000-1111", hireDate: "2017-02-18", weeklyQuota: false, weeklyQuotaBonus: false, holidays: false, warning1: false, warning2: false },
  { id: "20", firstName: "Théo", lastName: "Barbier", grade: "CDI", phone: "(000) 111-2222", hireDate: "2023-04-02", weeklyQuota: true, weeklyQuotaBonus: false, holidays: false, warning1: false, warning2: false },
  { id: "21", firstName: "Ugo", lastName: "Adam", grade: "CDI", phone: "(112) 223-3344", hireDate: "2019-05-14", weeklyQuota: false, weeklyQuotaBonus: true, holidays: false, warning1: true, warning2: false },
  { id: "22", firstName: "Valentine", lastName: "Picard", grade: "CDI", phone: "(223) 334-4455", hireDate: "2020-11-09", weeklyQuota: true, weeklyQuotaBonus: false, holidays: true, warning1: false, warning2: false },
  { id: "23", firstName: "William", lastName: "Poiret", grade: "CDI", phone: "(334) 445-5566", hireDate: "2016-08-17", weeklyQuota: false, weeklyQuotaBonus: false, holidays: false, warning1: false, warning2: false },
  { id: "24", firstName: "Xavier", lastName: "Dubois", grade: "CDD", phone: "(445) 556-6677", hireDate: "2021-07-03", weeklyQuota: false, weeklyQuotaBonus: false, holidays: false, warning1: false, warning2: false },
  { id: "25", firstName: "Yasmine", lastName: "Leclerc", grade: "CDD", phone: "(556) 667-7788", hireDate: "2015-09-23", weeklyQuota: true, weeklyQuotaBonus: false, holidays: true, warning1: false, warning2: false },
  { id: "26", firstName: "Zacharie", lastName: "Lemoine", grade: "CDD", phone: "(667) 778-8899", hireDate: "2022-12-29", weeklyQuota: false, weeklyQuotaBonus: false, holidays: false, warning1: false, warning2: true }
];
