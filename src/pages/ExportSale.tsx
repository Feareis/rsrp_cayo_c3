import React, { useState } from "react";
import CustomInput from "../components/pages/sale/CustomInput";
import CustomButton from "../components/pages/sale/CustomButton";
import { BadgeDollarSign, ArrowUpNarrowWide, Salad } from "lucide-react";

const ExportSales: React.FC = () => {
  const [expertise, setExpertise] = useState<number | "">("");
  const [nbSalade, setNbSalade] = useState<number | "">("");

  // Calcul des totaux
  const calculateEmployeesTotal = (): number => {
    if (!expertise || !nbSalade) return 0;
    const adjustedExpertise = Math.min(Math.max(Number(expertise), 1), 100);
    return (36 + 36 * ((Number(adjustedExpertise) || 0) * 0.003)) * (Number(nbSalade) || 0);
  };

  const calculateCompanyTotal = (): number => {
    return calculateEmployeesTotal() * 0.3;
  };

  const employeesTotal = calculateEmployeesTotal();
  const companyTotal = calculateCompanyTotal();

  const formatCurrency = (value: number): string => {
    return `${value.toLocaleString("en-EN", { minimumFractionDigits: 0 })} $`;
  };

  return (
    <div className="flex flex-col items-center justify-center text-[#cfd8dc] w-full">



      {/* Conteneur principal */}
      <div className="flex flex-row gap-8 w-3/4 p-2 mt-16">

        {/* Section Gauche */}
        <div className="flex flex-col w-1/2 p-4 gap-8 bg-[#263238] border border-gray-600 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center">Saisie des Données</h2>

          <CustomInput
            label="Niveau d'expertise"
            icon={ArrowUpNarrowWide}
            value={expertise}
            onChange={(e) => setExpertise(Number(e.target.value) || "")}
            placeholder="Entrez le niveau d'expertise"
          />

          <CustomInput
            label="Nombre de salades"
            icon={Salad}
            value={nbSalade}
            onChange={(e) => setNbSalade(Number(e.target.value) || "")}
            placeholder="Entrez le nombre de salades"
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
              <p className="text-lg font-bold">Part Employé</p>
              <p className="text-green-400 text-2xl font-bold mt-2">{formatCurrency(employeesTotal)}</p>
            </div>

            <div className="bg-[#1E2A30] p-4 rounded-lg w-full text-center border border-gray-600">
              <p className="text-lg font-bold">Part Entreprise</p>
              <p className="text-blue-400 text-2xl font-bold mt-2">{formatCurrency(companyTotal)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportSales;
