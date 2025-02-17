import React, { useState } from 'react';
import CustomButton from "../components/core/CustomButton";
import { BadgeDollarSign, RefreshCw, ArrowUpNarrowWide, Salad, AlertCircle, CircleCheck } from "lucide-react";
import { BrowserWarning } from "../components/core/BrowserWarning";
import { showToast } from "../components/core/toast/CustomToast";
import toast, { Toaster } from 'react-hot-toast';

const staticProducts = [
  { name: "Burger", price: 8, category: "Food" },
  { name: "Pizza", price: 12, category: "Food" },
  { name: "Cola", price: 3, category: "Drink" },
  { name: "Beer", price: 5, category: "Alcohol" },
];

const ClientsSales: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Activité");
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [selectedCategory, setSelectedCategory] = useState("Food");

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

  const currentDate = new Date().toLocaleDateString('fr-FR');

  return (
    <div className="flex flex-col items-center text-[#cfd8dc] w-full gap-6">
      <Toaster position="top-center" />

      {/* Employee Information + Stats render */}
      <div className="flex flex-row gap-8 w-full">

        {/* Employee Information */}
        <div className="flex flex-col w-1/2 p-4 bg-[#263238] justify-center border border-gray-600 rounded-xl shadow-lg">
          <p className="ml-6 text-xl font-bold">Nom Employé : John Doe</p>
          <p className="ml-6 text-md text-gray-400">Date : {currentDate}</p>
        </div>

        {/* Stats render */}
        <div className="flex flex-col w-1/2 p-4 bg-[#263238] items-center border border-gray-600 rounded-xl shadow-lg gap-2">
          <p className="text-xl font-bold">Grade : Patron</p>
          <p className="text-lg font-semibold">
            Taux de redistribution :
            <span className="ml-2 px-1 py-0.5 text-white bg-green-700 rounded-md">
              40 %
            </span>
          </p>
        </div>
      </div>

        {/* Tabs en haut */}
        <div className="flex gap-16 mb-6">
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

      <div className="flex flex-row gap-8 w-full">
        {/* Formulaire */}
        <div className="flex flex-col w-2/3 p-6 gap-6 bg-[#263238] border border-gray-600 rounded-xl shadow-lg">
          <h2 className="text-gray-400 text-xl font-semibold text-center">Saisie des Données</h2>
          <BrowserWarning
            color="yellow"
            icon={<AlertCircle size={20} />}
            message="Niveau d'expertise :"
            details={["Le niveau d'expertise correspond à votre niveau dans l'entreprise et est calculer comme tel : pourcentage bonus * 2."]}
          />
          <p>tet</p>

          <p>tat</p>

          <div className="flex justify-center mt-4">
            <button>test</button>
          </div>
        </div>

        {/* Totaux */}
        <div className="flex flex-col w-1/3 gap-6 p-6 bg-[#263238] border border-gray-600 rounded-xl shadow-lg">
          <h2 className="text-gray-400 text-xl font-semibold text-center">Visualisation & Totaux</h2>

          <BrowserWarning
            color="green"
            icon={<CircleCheck size={20} />}
            message="-"
            details={["La Part employé est envoyé directement dans votre inventaire (F2).", "La Part Entreprise est envoyé directement dans le coffre de l'entreprise."]}
          />

          <div className="bg-[#37474f] p-4 rounded-lg text-center border border-gray-600">
            <p className="text-lg font-semibold">Part Employé</p>
            <p className="text-green-400 text-2xl font-bold mt-2"></p>
          </div>

          <div className="bg-[#37474f] p-4 rounded-lg text-center border border-gray-600">
            <p className="text-lg font-semibold">Part Entreprise</p>
            <p className="text-blue-400 text-2xl font-bold mt-2"></p>
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
