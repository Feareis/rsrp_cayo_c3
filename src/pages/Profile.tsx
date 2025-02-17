import React, { useState } from "react";
import patronImage from "../assets/profile_picture/patron.png";
import StaticInput from "../components/core/StaticInput";
import DynamicInput from "../components/core/DynamicInput";
import CustomButton from "../components/core/CustomButton";
import { ShieldHalf, User, Phone, CalendarFold, Lock, KeyRound, CheckCircle } from "lucide-react";

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Activité");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const salesActivities = [
    { sale: "client", saleType: "propre", totalEmploye: 0, totalEntreprise: 1500, time: "Il y a 2 heures" },
    { sale: "client", saleType: "sale", totalEmploye: 3000, totalEntreprise: 500, time: "Hier" },
    { sale: "export", saleType: "propre", totalEmploye: 16000, totalEntreprise: 2500, time: "Il y a 3 jours" },
  ];

  const formatCurrency = (value: number): string => {
      return `${value.toLocaleString("en-EN", { minimumFractionDigits: 0 })} $`;
    };

  const formatCompactCurrency = (value: number): string => {
    if (value >= 1_000_000) {
      return `${(value / 1_000_000).toLocaleString("en-EN", { maximumFractionDigits: 1 })} M$`;
    } else if (value >= 1_000) {
      return `${(value / 1_000).toLocaleString("en-EN", { maximumFractionDigits: 0 })} k$`;
    } else {
      return `${value.toLocaleString("en-EN", { minimumFractionDigits: 0 })} $`;
    }
  };


  return (
    <div className="flex justify-center items-center bg-[#37474f] text-[#cfd8dc] px-4">
      {/* Conteneur Principal */}
      <div className="flex gap-12 w-full">

        {/* Section Gauche */}
        <div className="flex flex-col w-1/2 gap-6">

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
            <div className="w-full p-6 rounded-lg text-center mb-6">
              <p className="text-lg text-gray-400 font-bold">Argent Total Généré</p>
              <p className="text-2xl font-bold text-green-400">{formatCurrency(1500000)}</p>
            </div>

            {/* Cartes secondaires */}
            <div className="grid grid-cols-3 gap-4 w-full">

              {/* Conteneur avec bordure et titre qui dépasse (2/3 de la grille) */}
              <div className="relative p-4 rounded-lg border border-gray-500 col-span-2">

                {/* Titre flottant */}
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-[#37474f] rounded-md">
                  <h2 className="text-xl font-bold text-center">Total généré</h2>
                </div>

                <div className="grid grid-cols-2 gap-6 mt-6">
                  {/* Total Employé */}
                  <div className="flex flex-col justify-center bg-[#263238] p-4 rounded-lg shadow-md text-center hover:scale-103 transition-all duration-300">
                    <p className="text-base text-gray-400/70 font-semibold mb-2">Pour l'employé</p>
                    <div className="flex flex-row justify-center">
                      <p className="text-lg font-bold text-green-400/90">{formatCurrency(1000000)}</p>
                      <p className="text-base ml-1 mt-0.5 mr-1">|</p>
                      <p className="text-lg font-bold text-red-400/90">{formatCurrency(120000)}</p>
                    </div>
                  </div>

                  {/* Total Entreprise */}
                  <div className="flex flex-col justify-center bg-[#263238] p-4 rounded-lg shadow-md text-center hover:scale-103 transition-all duration-300">
                    <p className="text-base text-gray-400/70 font-semibold mb-2">Pour l'entreprise</p>
                    <div className="flex flex-row justify-center">
                      <p className="text-lg font-bold text-green-400/90">{formatCurrency(200000)}</p>
                      <p className="text-base ml-1 mt-0.5 mr-1">|</p>
                      <p className="text-lg font-bold text-red-400/90">{formatCurrency(120000)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Conteneur avec bordure et titre qui dépasse (1/3 de la grille) */}
              <div className="relative p-4 rounded-lg border border-gray-500 col-span-1">

                {/* Titre flottant */}
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-[#37474f] rounded-md">
                  <h2 className="text-xl font-bold text-center">Taxe</h2>
                </div>

                {/* Total de la taxe (1/3 de la grille) */}
                <div className="gap-6 mt-6">
                  <div className="flex flex-col justify-center bg-[#263238] p-4 rounded-lg shadow-md text-center hover:scale-103 transition-all duration-300">
                    <p className="text-base text-gray-400/70 font-semibold mb-2">(à Payer)</p>
                    <p className="text-lg font-bold text-red-400/90">{formatCurrency(3500)}</p>
                  </div>
                </div>
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
              <div className="px-4">
                <ul className="relative border-l-2 border-gray-500">
                  {salesActivities.map((sale, index) => (
                    <li key={index} className="mb-4 ml-4">

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
                                ? "font-bold text-green-400/90"
                                : sale.saleType === "sale"
                                ? "font-bold text-red-400/90"
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
                                ? "font-bold text-green-400/90"
                                : sale.saleType === "sale"
                                ? "font-bold text-red-400/90"
                                : ""
                              : "font-bold"
                          }`}
                        >
                          {sale.saleType === "sale" ? "Taxe Entreprise" : "Total Entreprise"} : {formatCurrency(sale.totalEntreprise)}
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
                <h2 className="ml-2 text-xl font-bold mb-8">Informations du profil</h2>

                <div className="flex flex-col gap-6 p-4">
                  <StaticInput icon={ShieldHalf} label="Grade" text="Patron" />
                  <StaticInput icon={User} label="Prénom Nom" text="John Doe" />
                  <StaticInput icon={Phone} label="Téléphone" text="(001) 001-0001" />
                  <StaticInput icon={CalendarFold} label="Date d'embauche" text="01/01/25" />
                </div>
              </div>
            )}

            {/* Password Tabs */}
            {activeTab === "Mot de passe" && (
              <div className="ml-4 p-4 bg-[#263238] rounded-lg shadow-md">
                <h2 className="ml-2 text-xl font-bold mb-8">Modifier son mot de passe</h2>

                <div className="flex flex-col gap-6 p-4">
                  <DynamicInput
                    type="password"
                    icon={Lock}
                    label="Ancien mot de passe *"
                    value={currentPassword}
                    onChange={setCurrentPassword}
                    placeholder="Entrez votre ancien mot de passe"
                  />

                  <DynamicInput
                    type="password"
                    icon={KeyRound}
                    label="Nouveau mot de passe *"
                    value={newPassword}
                    onChange={setNewPassword}
                    placeholder="Entrez votre nouveau mot de passe"
                  />

                  <DynamicInput
                    type="password"
                    icon={KeyRound}
                    label="Confirmer le mot de passe *"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    placeholder="Confirmez votre nouveau mot de passe"
                  />

                  {/* Conteneur pour aligner le bouton à droite */}
                  <div className="flex justify-end">
                    <CustomButton
                      label="Mettre à jour"
                      onClick={() => console.log("Mot de passe mis à jour")}
                      icon={CheckCircle}
                      className="bg-blue-500 hover:bg-blue-600 text-white mt-4 w-1/4"
                    />
                  </div>
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
