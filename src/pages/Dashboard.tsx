import React, { useState } from "react";
import DisplayCard from "../components/pages/dashboard/DisplayCard";
import RedistributionTable from "../components/pages/dashboard/RedistributionTable";
import CountdownTimer from "../components/core/CountdownTimer";
import TopSalesTable from "../components/pages/dashboard/TopSalesTable";
import { BrowserWarn } from "../components/core/BrowserWarn";
import { DollarSign, Coffee, CircleCheck, CircleX, AlertCircle } from "lucide-react";


const userExample = {
  grade: "Patron",                   // grade (eg. Patron, Responsable, ... )
  firstName: "John",                 // Prenom
  lastName: "Doe",                   // Nom
  phoneNumber: "1234567890",         // N° de téléphone
  hireDate: "15/03/2022",            // Date d'embauche
  tags: "qte+",                      // Custom tags
  totalCleanMoneyEmployee: 220000,   // Total Argent Propre pour l'employé (Part employé total)
  totalDirtyMoneyEmployee: 100000,   // Total Argent Sale pour l'employé (Part employé total)
  totalCleanMoneyEnterprise: 120000, // Total Argent Propre pour l'entreprise (Part entreprise total)
  cleanExportSales: 120000,          // Vente en propre pour l'employé (Part entreprise)
  cleanClientSales: 300000,          // Vente client propre pour l'employé (Part entreprise)
  dirtyClientSales: 30000,           // Vente client sale pour l'employé (Part entreprise)
  weeklyQuota: true,                 // Quota de la semaine
  weeklyQuotaBonus: false,           // Quota bonus de la semaine
  lastWeeklyBonus: 200000,           // Prime semaine passée
  lastWeeklyTax: 10000,              // Taxe semaine Passée
  holidays: false,                   // Congés
  weeklyWarn1: true,                 // Avertissement 1
  weeklyWarn2: false,                // Avertissement 2
};


export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Semaine en cours");

  const formatCurrency = (value: number): string => {
    return `${value.toLocaleString("en-EN", { minimumFractionDigits: 0 })} $`;
  };

  const currentDate = new Date().toLocaleDateString('fr-FR');

  const getCurrentWeekRange = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Dimanche) à 6 (Samedi)
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Ajuste si dimanche
    const monday = new Date(today);
    monday.setDate(today.getDate() + diffToMonday);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    const formatDate = (date: Date) => date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' });

    return `${formatDate(monday)} - ${formatDate(sunday)}`;
  };

  const getLastOrNextSunday19h = () => {
    const now = new Date();
    let target = new Date(now);

    // Trouver le dernier dimanche
    target.setDate(now.getDate() - ((now.getDay() + 7) % 7));
    target.setHours(19, 0, 0, 0);

    // Si la date cible est déjà passée, prendre le prochain dimanche
    if (target.getTime() < now.getTime()) {
      target.setDate(target.getDate() + 7);
    }

    return target;
  };

  const calculateBonus = () => {
    const gradeRates: Record<string, number> = {
      Patron: 0.5,
      Responsable: 0.4,
      RH: 0.35,
      CDI: 0.3,
      CDD: 0.2,
    };

    const trg = gradeRates[userExample.grade] || 0.1; // Valeur par défaut si grade inconnu
    const taxRate = 0.1; // Supposons une taxe de 10% sur les ventes sales
    const baseBonus = 5000; // Prime de quota
    const bonusQuota = 3000; // Prime de quota bonus

    // Si l'employé n'a pas fait son quota, pas de prime
    if (!userExample.weeklyQuota) return 0;

    // Calcul de la prime de base
    let bonus =
      baseBonus +
      trg * userExample.cleanExportSales +
      trg * userExample.cleanClientSales +
      userExample.dirtyClientSales * taxRate;

    // Ajout de la prime bonus si le quota bonus est atteint
    if (userExample.weeklyQuotaBonus) {
      bonus += bonusQuota;
    }

    return Math.round(bonus); // Retourne la prime arrondie
  };

  const transitionHover101 = "transition-transform duration-200 hover:scale-101";
  const transitionHover102 = "transition-transform duration-200 hover:scale-102";


  return (
    <div className="flex flex-col items-center text-[#cfd8dc] w-full gap-8">

      {/* High Container */}
      <div className="flex flex-row w-full">

        {/* Left Section */}
        <div className="flex flex-col w-full gap-8">

          {/* Employee Information + Grade/Rate */}
          <div className="flex flex-row gap-8 w-full">

            {/* Employee Information */}
            <div className="flex flex-col w-[50%] p-6 bg-[#263238] justify-center items-center text-center border border-gray-600 rounded-xl shadow-lg gap-2">
              <p className="text-2xl font-bold text-white">
                Nom Employé : <span className="text-blue-400">{userExample.firstName} {userExample.lastName}</span>
              </p>
              <p className="text-xl font-semibold text-gray-400">
                Grade : <span className="text-red-400">{userExample.grade}</span>
              </p>
            </div>

            {/* Date */}
            <div className={`flex flex-row w-[50%] p-4 bg-[#263238] justify-around items-center border border-gray-600 rounded-xl shadow-lg gap-16`}>

              {/* Bloc : Semaine en cours */}
              <div className="flex flex-col text-xl font-bold text-center gap-2">
                <p className="text-xl font-bold">Semaine en cours :</p>
                <span className="p-1 bg-[#37474f] border border-gray-600 rounded-md">{getCurrentWeekRange()}</span>
              </div>

              {/* Bloc : Date du jour */}
              <div className="flex flex-col text-xl font-bold text-center gap-2">
                <p className="text-xl font-bold">Date du jour :</p>
                <span className="p-1 bg-[#37474f] border border-gray-600 rounded-md">
                  {new Date().toISOString().split("T")[0].split("-").reverse().join("/")}
                </span>
              </div>

              {/* Bloc : CountdownTimer avec titre flottant */}
              <div className="relative border border-gray-600 rounded-lg p-3 text-center items-center text-md text-gray-400">
                {/* Titre flottant sur la bordure */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#263238] text-white text-sm font-bold px-3 py-1">
                  Reboot Compta
                </div>
                <CountdownTimer targetDate={getLastOrNextSunday19h()} />
              </div>
            </div>
          </div>

          {/* Info + Display Card Section */}
          <div className="flex flex-row gap-8 w-full">
            <div className={`flex flex-col w-[70%] h-200 p-4 bg-[#263238] border border-gray-600 rounded-xl shadow-lg gap-4`}>

              {/* Tabs en haut */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setActiveTab("Semaine en cours")}
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${
                    activeTab === "Semaine en cours" ? "bg-[#37474f] text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  Semaine en cours
                </button>

                <button
                  onClick={() => setActiveTab("Semaine passée")}
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${
                    activeTab === "Semaine passée" ? "bg-[#37474f] text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  Semaine passée
                </button>
              </div>

              {/* First Tabs */}
              {activeTab === "Semaine en cours" && (
                <>
                  {/* Section principale (avec justify-between) */}
                  <div className="flex flex-col h-[90%] items-center p-4">
                    <p className="text-center text-gray-400">Contenu principal 1 ici...</p>
                  </div>

                  {/* Section inférieure (20%) */}
                  <div className="flex h-[10%] justify-center gap-2">
                    <p className="text-center text-gray-400">Bottom 1 (10% height)</p>
                  </div>
                </>
              )}

              {/* Second Tabs */}
              {activeTab === "Semaine passée" && (
                <>
                  {/* Section principale (avec justify-between) */}
                  <div className="flex flex-col h-[90%] justify-between p-4">
                    <p className="text-center text-gray-400">Contenu principal 2 ici...</p>
                  </div>

                  {/* Section inférieure (20%) */}
                  <div className="flex h-[10%] justify-center gap-2">
                    <p className="text-center text-gray-400">Bottom 2 (10% height)</p>
                  </div>
                </>
              )}
            </div>
            <div className="flex flex-col w-[30%] gap-8 justify-center">
              <DisplayCard
                title="Quota de la Semaine"
                icon={<DollarSign className="text-green-500/70" size={24} />}
                text1={formatCurrency(43000)}
                text2="250 Plateau"
                option={transitionHover102}
              />
              <DisplayCard
                title="Quota Bonus"
                icon={<Coffee className="text-orange-400/70" size={24} />}
                text1={formatCurrency(63000)}
                text2="300 Plateau"
                option={transitionHover102}
              />
              <div className={`flex flex-row bg-[#263238] p-4 items-center text-center border border-gray-600 rounded-xl shadow-lg ${transitionHover102}`}>
                <div className="flex flex-col w-[50%] items-center border-r border-gray-700 gap-1">
                  <p className="text-lg font-semibold">Quota</p>
                  {userExample.weeklyQuota ? (
                    <CircleCheck className="text-green-500/70" size={22} />
                  ) : (
                    <CircleX className="text-red-400/70" size={22} />
                  )}
                </div>
                <div className="flex flex-col w-[50%] items-center border-l border-gray-700 gap-1">
                  <p className="text-lg font-semibold">Bonus</p>
                  {userExample.weeklyQuotaBonus ? (
                    <CircleCheck className="text-green-500/70" size={22} />
                  ) : (
                    <CircleX className="text-red-400/70" size={22} />
                  )}
                </div>
              </div>
              <div className="h-[80%]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
