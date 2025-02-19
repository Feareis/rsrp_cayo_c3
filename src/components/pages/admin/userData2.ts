export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  hireDate: string;
  grade: "Patron" | "Co-Patron" | "RH" | "Responsable" | "CDI" | "CDD";
  leaves: boolean;
  firstWarning: boolean;
  secondWarning: boolean;
}


export const initialUsers: User[] = [
  { id: "1", firstName: "Alice", lastName: "Dupont", vep: 100000, vcp: 120000, vcs: 10000, quota: true, quota_bonus: false, employee_prime_s1: 122000, employee_taxe_s1: 12000 },
  { id: "2", firstName: "Bob", lastName: "Martin", phone: "(234) 567-8901", hireDate: "2019-07-22", grade: "Co-Patron", leaves: true, firstWarning: false, secondWarning: false },
  { id: "3", firstName: "Charlie", lastName: "Durand", phone: "(345) 678-9012", hireDate: "2021-01-10", grade: "RH", leaves: false, firstWarning: true, secondWarning: false },
  { id: "4", firstName: "David", lastName: "Lemoine", phone: "(456) 789-0123", hireDate: "2022-05-18", grade: "RH", leaves: false, firstWarning: false, secondWarning: true },
  { id: "5", firstName: "Emma", lastName: "Moreau", phone: "(567) 890-1234", hireDate: "2018-11-25", grade: "CDI", leaves: true, firstWarning: false, secondWarning: false },
  { id: "6", firstName: "Fabrice", lastName: "Bernard", phone: "(678) 901-2345", hireDate: "2017-06-30", grade: "CDD", leaves: false, firstWarning: false, secondWarning: false },
  { id: "7", firstName: "Gabrielle", lastName: "Simon", phone: "(789) 012-3456", hireDate: "2023-02-12", grade: "CDI", leaves: false, firstWarning: false, secondWarning: false },
  { id: "8", firstName: "Hugo", lastName: "Lefevre", phone: "(890) 123-4567", hireDate: "2020-08-08", grade: "Responsable", leaves: true, firstWarning: false, secondWarning: true },
  { id: "9", firstName: "Isabelle", lastName: "Girard", phone: "(901) 234-5678", hireDate: "2019-09-14", grade: "CDD", leaves: false, firstWarning: false, secondWarning: false },
  { id: "10", firstName: "Jérôme", lastName: "Robert", phone: "(012) 345-6789", hireDate: "2021-12-05", grade: "Responsable", leaves: true, firstWarning: false, secondWarning: false },
  { id: "11", firstName: "Kévin", lastName: "Dumont", phone: "(111) 222-3333", hireDate: "2016-04-20", grade: "Responsable", leaves: false, firstWarning: true, secondWarning: false },
  { id: "12", firstName: "Laura", lastName: "Perrot", phone: "(222) 333-4444", hireDate: "2015-10-15", grade: "CDI", leaves: false, firstWarning: false, secondWarning: false },
  { id: "13", firstName: "Mathieu", lastName: "Benoît", phone: "(333) 444-5555", hireDate: "2023-01-01", grade: "CDD", leaves: true, firstWarning: false, secondWarning: false },
  { id: "14", firstName: "Nathan", lastName: "Lemoine", phone: "(444) 555-6666", hireDate: "2018-07-12", grade: "CDD", leaves: false, firstWarning: false, secondWarning: false },
  { id: "15", firstName: "Olivia", lastName: "Renard", phone: "(555) 666-7777", hireDate: "2022-06-08", grade: "CDI", leaves: true, firstWarning: false, secondWarning: false },
  { id: "16", firstName: "Pierre", lastName: "Mercier", phone: "(666) 777-8888", hireDate: "2020-10-20", grade: "CDD", leaves: false, firstWarning: true, secondWarning: false },
  { id: "17", firstName: "Quentin", lastName: "Lucas", phone: "(777) 888-9999", hireDate: "2019-03-25", grade: "CDD", leaves: false, firstWarning: false, secondWarning: false },
  { id: "18", firstName: "Raphaël", lastName: "Chevalier", phone: "(888) 999-0000", hireDate: "2021-09-10", grade: "CDI", leaves: true, firstWarning: false, secondWarning: true },
  { id: "19", firstName: "Sophie", lastName: "Garnier", phone: "(999) 000-1111", hireDate: "2017-02-18", grade: "CDD", leaves: false, firstWarning: false, secondWarning: false },
  { id: "20", firstName: "Théo", lastName: "Barbier", phone: "(000) 111-2222", hireDate: "2023-04-02", grade: "CDI", leaves: false, firstWarning: false, secondWarning: false },
  { id: "21", firstName: "Ugo", lastName: "Adam", phone: "(112) 223-3344", hireDate: "2019-05-14", grade: "CDI", leaves: false, firstWarning: true, secondWarning: false },
  { id: "22", firstName: "Valentine", lastName: "Picard", phone: "(223) 334-4455", hireDate: "2020-11-09", grade: "CDI", leaves: true, firstWarning: false, secondWarning: false },
  { id: "23", firstName: "William", lastName: "Poiret", phone: "(334) 445-5566", hireDate: "2016-08-17", grade: "CDI", leaves: false, firstWarning: false, secondWarning: false },
  { id: "24", firstName: "Xavier", lastName: "Dubois", phone: "(445) 556-6677", hireDate: "2021-07-03", grade: "CDD", leaves: false, firstWarning: false, secondWarning: false },
  { id: "25", firstName: "Yasmine", lastName: "Leclerc", phone: "(556) 667-7788", hireDate: "2015-09-23", grade: "CDD", leaves: true, firstWarning: false, secondWarning: false },
  { id: "26", firstName: "Zacharie", lastName: "Lemoine", phone: "(667) 778-8899", hireDate: "2022-12-29", grade: "CDD", leaves: false, firstWarning: false, secondWarning: true },
];