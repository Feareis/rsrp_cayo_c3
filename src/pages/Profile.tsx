import React, { useState } from "react";
import patronImage from "../assets/profile_picture/patron.png";
import StaticInput from "../components/pages/profile/StaticInput";
import { ShieldHalf, User, Phone, CalendarFold } from "lucide-react";

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Activité");

  const salesActivities = [
    { sale: "client", saleType: "propre", type: "Client Propre", totalEmploye: "0", totalEntreprise: "1500", time: "Il y a 2 heures" },
    { sale: "client", saleType: "sale", type: "Client Sale", totalEmploye: "3000", totalEntreprise: "500", time: "Hier" },
    { sale: "export", saleType: "propre", type: "Export Propre", totalEmploye: "16000", totalEntreprise: "2500", time: "Il y a 3 jours" },
  ];

  const formatCurrency = (value: number): string => {
      return `${value.toLocaleString("en-EN", { minimumFractionDigits: 0 })} $`;
    };


  return (
    <div className="flex justify-center items-center bg-[#37474f] text-[#cfd8dc] px-4">
      {/* Conteneur Principal */}
      <div className="flex gap-12 w-full">

        {/* Section Gauche */}
        <div className="flex flex-col w-1/3 gap-6">

          {/* Display Section */}
          <div className="p-6 rounded-lg flex flex-col items-center">
            {/* Photo de profil */}
            <img
              src={patronImage}
              alt="Profile"
              className="w-24 h-24 rounded-full mb-4"
            />

            {/* Nom & Prénom */}
            <p className="text-xl font-bold text-white">John Doe</p>

            {/* Grade */}
            <p className="text-gray-400 text-sm">Patron</p>
          </div>

          {/* Stats Section */}
          <div className="relative p-4 rounded-lg border border-gray-500 flex flex-col items-center w-full">

            {/* Titre (h2 dépasse légèrement la bordure) */}
            <div className="flex items-center justify-center gap-2 -mt-10 bg-[#37474f] px-4 py-1 rounded-md">
              <h2 className="text-2xl font-bold">Statistiques</h2>
              <p className="text-gray-400 text-sm font-semibold text-gray-300 mt-1">(Semaine)</p>
            </div>

            {/* Total Généré */}
            <div className="w-full p-6 rounded-lg text-center mb-4">
              <p className="text-lg text-gray-400 font-bold">Total Argent Généré</p>
              <p className="text-2xl font-bold text-green-400">{formatCurrency(15200)}</p>
            </div>

            {/* Cartes secondaires */}
            <div className="grid grid-cols-3 gap-4 w-full">

              {/* Total Employé */}
              <div className="flex flex-col justify-center bg-[#263238] p-4 rounded-lg shadow-md text-center hover:scale-105 transition-all duration-300">
                <p className="text-base text-gray-400 font-semibold">Total Employé</p>
                <p className="text-xl font-bold text-green-400">{formatCurrency(3700)}</p>

                {/* Second total employé (Propre & Sale) */}
                <p className="text-xl text-red-400 font-bold mt-1">{formatCurrency(1200)}</p>
              </div>

              {/* Total Entreprise */}
              <div className="flex flex-col justify-center bg-[#263238] p-4 rounded-lg shadow-md text-center hover:scale-105 transition-all duration-300">
                <p className="text-base text-gray-400 font-semibold">Total Entreprise</p>
                <p className="text-xl font-bold text-blue-400">{formatCurrency(8000)}</p>
              </div>

              {/* Total de la taxe */}
              <div className="flex flex-col justify-center bg-[#263238] p-4 rounded-lg shadow-md text-center hover:scale-105 transition-all duration-300">
                <p className="text-base text-gray-400 font-semibold">Total Taxe (à Payer)</p>
                <p className="text-xl font-bold text-red-400">{formatCurrency(3500)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section Droite */}
        <div className="w-2/3 p-6">

          {/* Tabs en haut */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab("Activité")}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                activeTab === "Activité" ? "bg-[#263238] text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              Activité
            </button>

            <button
              onClick={() => setActiveTab("Informations")}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                activeTab === "Informations" ? "bg-[#263238] text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              Informations
            </button>

            <button
              onClick={() => setActiveTab("Mot de passe")}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                activeTab === "Mot de passe" ? "bg-[#263238] text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              Mot de passe
            </button>
          </div>

          {/* Contenu des pages dynamiques */}
          <div className="rounded-md">

            {/* Activity Tabs */}
            {activeTab === "Activité" && (
              <div className="p-4">
                <ul className="relative border-l-2 border-gray-500">
                  {salesActivities.map((sale, index) => (
                    <li key={index} className="mb-6 ml-4">

                      {/* Render Timeline */}
                      <div className="absolute -left-3 w-6 h-6 bg-gray-400 rounded-full border-6 border-[#37474f]"></div>

                      {/* Sale Drawer */}
                      <div className="bg-[#263238] p-4 rounded-lg shadow-md hover:scale-101 transition-all duration-300">

                        {/* Sale title */}
                        <p className={`text-base font-bold px-2 py-1 rounded-md inline-block ${
                          sale.saleType === "propre" ? "bg-green-700 text-green-200" : "bg-red-700 text-red-200"
                        }`}>
                          {sale.sale === "client" ? "Vente Client" : "Vente Export"} - {sale.saleType === "propre" ? "Propre" : "Sale"}
                        </p>

                        {/* Détails */}
                        <p
                          className={`text-sm ${
                            (sale.sale === "export" || sale.sale === "client") && sale.totalEmploye > 0
                              ? sale.saleType === "propre"
                                ? "font-bold text-green-400"
                                : sale.saleType === "sale"
                                ? "font-bold text-red-400"
                                : ""
                              : "font-bold"
                          } mt-2`}
                        >
                          Total Employé : {formatCurrency(sale.totalEmploye)}
                        </p>

                        <p
                          className={`text-sm ${
                            (sale.sale === "export" || sale.sale === "client") && sale.totalEntreprise > 0
                              ? sale.saleType === "propre"
                                ? "font-bold text-green-400"
                                : sale.saleType === "sale"
                                ? "font-bold text-red-400"
                                : ""
                              : "font-bold"
                          }`}
                        >
                          Total Entreprise : {formatCurrency(sale.totalEntreprise)}
                        </p>

                        {/* Time */}
                        <p className="text-xs text-gray-400 mt-2">{sale.time}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Informations Tabs */}
            {activeTab === "Informations" && (
              <div className="ml-4 p-4 bg-[#263238] rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-center mb-4">Informations</h2>

                <div className="flex flex-col gap-4">
                  <label className="block">
                    <p className="text-base font-bold mb-2">Grade :</p>
                    <StaticInput icon={ShieldHalf} text="Patron" />
                  </label>

                  <label className="block">
                    <p className="text-base font-bold mb-2">Prénom Nom :</p>
                    <StaticInput icon={User} text="John Doe" />
                  </label>

                  <label className="block">
                    <p className="text-base font-bold mb-2">Téléphone :</p>
                    <StaticInput icon={Phone} text="(001) 001-0001" />
                  </label>

                  <label className="block">
                    <p className="text-base font-bold mb-2">Date d'embauche :</p>
                    <StaticInput icon={CalendarFold} text="01/01/25" />
                  </label>
                </div>
              </div>
            )}

            {/* Password Tabs */}
            {activeTab === "Mot de passe" && (
                <div className="p-4 ml-4 bg-[#263238] rounded-md">
                  <div>
                    <p>Contenu de la Page 3</p>
                  </div>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
