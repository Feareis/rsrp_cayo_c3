import React, { useState, useEffect } from 'react';
import CustomButton from "../components/core/CustomButton";
import { BadgeDollarSign, RefreshCw, ArrowUpNarrowWide, Salad, AlertCircle, CircleCheck, CircleAlert } from "lucide-react";
import { BrowserWarn } from "../components/core/BrowserWarn";
import { showToast } from "../components/core/toast/CustomToast";
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabaseClient";

const ClientsSales: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("Boisson");
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [selectedCategory, setSelectedCategory] = useState("Food");
  const [redistributionRate, setRedistributionRate] = useState<number | null>(null);

  const resetAll = () => setQuantities({});

  const handleInputChange = (product: string, value: number) => {
    setQuantities((prev) => ({
      ...prev,
      [product]: Math.max(0, value),
    }));
  };

  const total = Object.keys(quantities).reduce((acc, product) => {
    const item = staticProducts.find(p => p.name === product);
    return acc + (item ? item.price * (quantities[product] || 0) : 0);
  }, 0);

  const handleSale = () => {
    if (total > 0) {
      showToast("error", "Une erreur est survenue !");
      resetAll();
    } else {
      showToast("success", "Opération réussie !");
    }
  };

  useEffect(() => {
    const fetchRedistributionRate = async () => {
      if (!user?.employee?.grade) return;

      // Récupère les taux de redistribution depuis la table `data`
      const { data, error } = await supabase
        .from("data")
        .select("value")
        .eq("key", "redistribution_rates")
        .single();

      if (error) {
        console.error("Erreur lors de la récupération des taux :", error);
        return;
      }

      // Récupérer le taux correspondant au grade de l'utilisateur
      const rates = data?.value;
      if (rates && rates[user.employee.grade]) {
        setRedistributionRate(rates[user.employee.grade] * 100); // Convertit 0.40 → 40%
      }
    };

    fetchRedistributionRate();
  }, [user?.employee?.grade]);

  const currentDate = new Date().toLocaleDateString('fr-FR');

  return (
    <div className="flex flex-col items-center text-[#cfd8dc] w-full gap-6">
      <Toaster position="top-center" />

      {/* Employee Information + Stats render */}
      <div className="flex flex-row gap-8 w-full">

        {/* Employee Information */}
        <div className="flex flex-col w-1/2 p-4 bg-[#263238] justify-center border border-gray-600 rounded-xl shadow-lg">
          <p className={`ml-6 text-xl font-bold`}>
            Nom Employé : <span className={`text-purple-400`}>{user?.employee?.first_name} {user?.employee?.last_name}</span>
          </p>
          <p className="ml-6 text-md font-semibold text-gray-400">Date : {currentDate}</p>
        </div>

        {/* Stats render */}
        <div className="flex flex-col w-1/2 p-4 bg-[#263238] items-center border border-gray-600 rounded-xl shadow-lg gap-2">
          <p className="text-xl font-bold text-gray-400">
            Grade :{" "}
            <span
              className={`${
                user?.employee?.grade === "Patron" || user?.employee?.grade === "Co-Patron"
                  ? "text-red-400"
                  : user?.employee?.grade === "RH"
                  ? "text-violet-400"
                  : user?.employee?.grade === "Responsable"
                  ? "text-yellow-400"
                  : user?.employee?.grade === "CDI"
                  ? "text-blue-400"
                  : user?.employee?.grade === "CDD"
                  ? "text-cyan-400"
                  : "text-white"
              }`}
            >
              {user?.employee?.grade}
            </span>
          </p>
          <p className="text-lg font-semibold">
            Taux de redistribution :
            <span className="ml-2 px-1 py-0.5 text-white bg-green-700 rounded-md">
              {redistributionRate !== null ? `${redistributionRate} %` : "..."}
            </span>
          </p>
        </div>
      </div>

      <div className="flex flex-row gap-8 w-full">
        {/* Formulaire */}
        <div className="flex flex-col w-[70%] p-6 gap-6 bg-[#263238] border border-gray-600 rounded-xl shadow-lg">
          <h2 className="text-gray-400 text-xl font-semibold text-center">Saisie des Données</h2>

          {/* Tabs */}
          <div className="flex flex-row items-center gap-8 mb-6">
            {["Boisson", "Alcool"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  activeTab === tab ? "bg-[#37474f] text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center mt-4">
            <p>tet</p>
            <p>tot</p>
          </div>
        </div>

        {/* Totaux */}
        <div className="flex flex-col w-[30%] gap-6 p-6 bg-[#263238] border border-gray-600 rounded-xl shadow-lg">
          <h2 className="text-gray-400 text-xl font-semibold text-center">Visualisation & Totaux</h2>

          <BrowserWarn
            color="green"
            icon={<CircleCheck size={20} />}
            message="Vente en Propre"
            details={["Faites une facture (F6)"]}
          />

          <div className="bg-[#37474f] p-4 rounded-lg text-center border border-gray-600">
            <p className="text-lg font-semibold">Part Entreprise</p>
            <p className="text-blue-400 text-2xl font-bold mt-2">0$</p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <CustomButton label="Ajouter Vente" onClick={handleSale} className="bg-green-500 text-white px-4 py-2 rounded" icon={BadgeDollarSign} />
        <CustomButton label="Reset" onClick={resetAll} className="bg-red-500 text-white px-4 py-2 rounded" icon={RefreshCw} />
      </div>
    </div>
  );
};

export default ClientsSales;
