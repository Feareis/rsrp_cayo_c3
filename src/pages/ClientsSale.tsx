import React, { useState } from "react";
import CustomInput from "../components/pages/sale/CustomInput";
import CustomButton from "../components/pages/sale/CustomButton";
import { BadgeDollarSign, Percent, ShoppingCart, RefreshCw } from "lucide-react";

const ClientsSales: React.FC = () => {
  const [totalItems, setTotalItems] = useState<number | "">("");
  const [selectedDiscount, setSelectedDiscount] = useState<number | "">(0);

  // Calcul des totaux
  const calculateTotalClient = (): number => {
    if (!totalItems) return 0;
    return (Number(totalItems) || 0) * 50; // Exemple : chaque item à 50€
  };

  const calculateTotalWithDiscount = (): number => {
    return calculateTotalClient() * (1 - Number(selectedDiscount) / 100);
  };

  const totalClient = calculateTotalClient();
  const totalWithDiscount = calculateTotalWithDiscount();

  const formatCurrency = (value: number): string => {
    return `${value.toLocaleString("fr-FR", { minimumFractionDigits: 0 })} €`;
  };

  return (
    <div className="flex flex-col items-center justify-center text-[#cfd8dc] w-full">
      {/* Conteneur principal */}
      <div className="flex flex-row gap-8 w-3/4 p-2 mt-16">

        {/* Section Gauche */}
        <div className="flex flex-col w-1/2 p-4 gap-8 bg-[#263238] border border-gray-600 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center">Saisie des Données</h2>

          <CustomInput
            label="Nombre d'articles"
            icon={ShoppingCart}
            value={totalItems}
            onChange={(e) => setTotalItems(Number(e.target.value) || "")}
            placeholder="Entrez le nombre d'articles"
          />

          <CustomInput
            label="Remise (%)"
            icon={Percent}
            value={selectedDiscount}
            onChange={(e) => setSelectedDiscount(Number(e.target.value) || "")}
            placeholder="Entrez la remise en %"
          />

          {/* Wrapper pour centrer le bouton */}
          <div className="flex justify-center my-6">
            <CustomButton
              label="Ajouter la Vente"
              onClick={() => console.log("Vente ajoutée")}
              icon={BadgeDollarSign}
              className="w-2/3 bg-blue-500/70 hover:bg-blue-600/90"
            />
          </div>
        </div>

        {/* Section Droite */}
        <div className="flex flex-col w-1/2 gap-6 p-4 bg-[#263238] border border-gray-600 rounded-lg shadow-md">
          {/* Titre en haut */}
          <h2 className="text-2xl font-bold text-center">Total</h2>

          {/* Conteneur flexible pour centrer le contenu dans l'espace restant */}
          <div className="flex-grow flex flex-col items-center justify-center gap-6">
            <div className="bg-[#1E2A30] p-4 rounded-lg w-full text-center border border-gray-600">
              <p className="text-lg font-bold">Total Client</p>
              <p className="text-green-400 text-2xl font-bold mt-2">{formatCurrency(totalClient)}</p>
            </div>

            <div className="bg-[#1E2A30] p-4 rounded-lg w-full text-center border border-gray-600">
              <p className="text-lg font-bold">Total avec Remise</p>
              <p className="text-blue-400 text-2xl font-bold mt-2">{formatCurrency(totalWithDiscount)}</p>
            </div>
          </div>

          {/* Reset Button */}
          <CustomButton
            label="Reset"
            onClick={() => {
              setTotalItems("");
              setSelectedDiscount(0);
            }}
            icon={RefreshCw}
            className="w-full bg-red-500 text-white hover:bg-red-600"
          />
        </div>

      </div>
    </div>
  );
};

export default ClientsSales;
