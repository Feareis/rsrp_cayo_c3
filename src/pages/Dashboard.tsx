import DisplayCard from "../components/pages/dashboard/DisplayCard";
import RedistributionTable from "../components/pages/dashboard/RedistributionTable";
import CountdownTimer from "../components/core/CountdownTimer";
import { DollarSign, Coffee, CircleCheck, CircleX } from "lucide-react";


const userExample = {
  prenom: "John",
  nom: "Doe",
  grade: "Patron",
  telephone: "1234567890",
  dateEmbauche: "15/03/2022",
  vep: 120000, // Vente en propre
  vcp: 300000,  // Vente client propre
  vcs: 50000,  // Vente client sale
  quota: true,
  quota_bonus: false,
  prime_s1: 200000,
  taxe_s1: 10000,
  conge: false,
  warn1: true,
  warn2: false,
};


export default function Dashboard() {
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

  const transitionHover101 = "transition-transform duration-200 hover:scale-101";
  const transitionHover102 = "transition-transform duration-200 hover:scale-102";


  return (
    <div className="flex flex-col items-center text-[#cfd8dc] w-full gap-8">

      {/* High Container */}
      <div className="flex flex-row gap-6 w-full items-stretch">

        {/* Left Section */}
        <div className="flex flex-col w-[75%] gap-6 flex-grow">

          {/* Employee Information + Grade/Rate */}
          <div className="flex flex-row gap-6 w-full">

            {/* Employee Information */}
            <div className={`flex flex-col w-[50%] p-4 bg-[#263238] justify-center text-center border border-gray-600 rounded-xl shadow-lg flex-grow ${transitionHover101}`}>
              <p className="mx-6 text-2xl font-bold">Nom Employé : {userExample.prenom} {userExample.nom}</p>
              <p className="mx-6 text-xl font-semibold text-gray-400">Grade : {userExample.grade}</p>
            </div>

            {/* Grade + Rate */}
            <div className={`flex flex-col w-[50%] p-4 bg-[#263238] items-center border border-gray-600 rounded-xl shadow-lg gap-4 flex-grow ${transitionHover101}`}>
              <p className="text-xl font-bold">
                Semaine en cours : <span className="p-1 bg-[#37474f] border border-gray-600 rounded-md">{getCurrentWeekRange()}</span>
              </p>
              <p className="relative border border-gray-600 rounded-lg p-3 text-center items-center text-md text-gray-400">
                <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#263238] rounded-md px-2">
                  Reboot compta
                </span>
                <CountdownTimer targetDate={getLastOrNextSunday19h()} />
              </p>
            </div>
          </div>

          {/* Info + Display Card Section */}
          <div className="flex flex-row gap-6 w-full flex-grow">
            <div className={`flex flex-col w-[75%] p-4 bg-[#263238] border border-gray-600 rounded-xl shadow-lg flex-grow ${transitionHover101}`}>

              {/* Section principale (80%) */}
              <div className="flex flex-grow rounded-lg p-4">
                <p className="text-center text-gray-400 m-auto">Contenu principal ici...</p>
              </div>

              {/* Section inférieure (20%) */}
              <div className="flex h-[20%] mt-2 gap-2">
                {/* Bloc 1 */}
                <div className={`flex flex-col w-1/3 items-center justify-center border border-gray-700 rounded-xl shadow-lg p-2`}>
                  <p className="text-lg font-semibold text-green-400">Vente Export Propre</p>
                  <p className="text-lg font-bold text-green-400">{formatCurrency(userExample.vep)}</p>
                </div>

                {/* Bloc 2 */}
                <div className={`flex flex-col w-1/3 items-center justify-center border border-gray-700 rounded-xl shadow-lg p-2`}>
                  <p className="text-lg font-semibold text-green-400">Vente Client Propre</p>
                  <p className="text-lg font-bold text-green-400">{formatCurrency(userExample.vcp)}</p>
                </div>

                {/* Bloc 3 */}
                <div className={`flex flex-col w-1/3 items-center justify-center border border-gray-700 rounded-xl shadow-lg p-2`}>
                  <p className="text-lg font-semibold text-red-400">Vente Client Sale</p>
                  <p className="text-lg font-bold text-red-400">{formatCurrency(userExample.vcs)}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-[25%] gap-6 justify-center flex-grow">
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
                  <CircleCheck className="text-green-500/70" size={22} />
                </div>
                <div className="flex flex-col w-[50%] items-center border-l border-gray-700 gap-1">
                  <p className="text-lg font-semibold">Quota</p>
                  <CircleX className="text-red-500/50" size={22} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Redistribution Rates */}
        <div className={`flex flex-col w-[25%] flex-grow ${transitionHover101}`}>
          <RedistributionTable className="h-full"/>
        </div>
      </div>

      {/* Bottom Section */}
      <div className={`flex flex-row w-full p-4 bg-[#263238] border border-gray-600 rounded-xl shadow-lg items-center justify-center ${transitionHover101}`}>
        <div className="flex w-[50%] p-4 border-r border-gray-600 items-center justify-center">
          <p className="text-lg text-center">Recharts</p>
        </div>
        <div className="flex w-[50%] p-4 items-center justify-center">
          <p className="text-lg text-center">Sphère</p>
        </div>
      </div>
    </div>
  );
}
