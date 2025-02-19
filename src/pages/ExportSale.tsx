import React, { useState } from "react";
import CustomInput from "../components/core/CustomInput";
import CustomButton from "../components/core/CustomButton";
import { BrowserWarn } from "../components/core/BrowserWarn";
import SaladeCayo from "../assets/raw_material/cantina_cayo/salade_cayo.png";
import { BadgeDollarSign, ArrowUpNarrowWide, Salad, AlertCircle, CircleCheck } from "lucide-react";
import { showToast } from "../components/core/toast/CustomToast";
import toast, { Toaster } from 'react-hot-toast';

const ExportSales: React.FC = () => {
  const [expertise, setExpertise] = useState<number | "">("");
  const [nbSalade, setNbSalade] = useState<number | "">("");

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

  const PETR = calculateCompanyTotal() * 0.4;

  const formatCurrency = (value: number): string => {
    return `${value.toLocaleString("en-EN", { minimumFractionDigits: 0 })} $`;
  };

  const handleSaleSubmit = () => {
    if (!expertise || !nbSalade) {
      showToast("error", "Erreur : vérifier vos entrées !");
      return;
    }
    showToast("success", "Vente ajoutée !");
  };

  const currentDate = new Date().toLocaleDateString('fr-FR');

  return (
    <div className="flex flex-col items-center text-[#cfd8dc] w-full gap-6">

      {/* Toast */}
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

      <div className="flex flex-row gap-8 w-full">
        {/* Formulaire */}
        <div className="flex flex-col w-1/2 p-6 gap-6 bg-[#263238] border border-gray-600 rounded-xl shadow-lg">
          <h2 className="text-gray-400 text-xl font-semibold text-center">Saisie des Données</h2>
          <BrowserWarn
            color="yellow"
            icon={<AlertCircle size={20} />}
            message="Niveau d'expertise :"
            details={["Le niveau d'expertise correspond à votre niveau dans l'entreprise et est calculer comme tel : pourcentage bonus * 2."]}
          />
          <CustomInput
            label="Niveau d'expertise"
            icon={ArrowUpNarrowWide}
            value={expertise}
            onChange={(e) => setExpertise(Number(e.target.value) || "")}
            placeholder="Entrez votre niveau d'expertise"
          />

          <CustomInput
            label="Nombre de salades"
            icon={Salad}
            value={nbSalade}
            onChange={(e) => setNbSalade(Number(e.target.value) || "")}
            placeholder="Entrez le nombre de salades"
          />

          <div className="flex justify-center mt-4">
            <CustomButton
              label="Ajouter la Vente"
              onClick={handleSaleSubmit}
              icon={BadgeDollarSign}
              className="w-2/3 bg-green-700 hover:bg-green-700/80"
            />
          </div>
        </div>

        {/* Totaux */}
        <div className="flex flex-col w-1/2 gap-6 p-6 bg-[#263238] border border-gray-600 rounded-xl shadow-lg">
          <h2 className="text-gray-400 text-xl font-semibold text-center">Visualisation & Totaux</h2>

          <BrowserWarn
            color="blue"
            icon={<CircleCheck size={20} />}
            message="-"
            details={["La Part employé est envoyé directement dans votre inventaire (F2).", "La Part Entreprise est envoyé directement dans le coffre de l'entreprise."]}
          />

          <div className="bg-[#37474f] p-4 rounded-lg text-center border border-gray-600">
            <p className="text-lg font-semibold">Part Employé</p>
            <p className="text-green-400 text-2xl font-bold mt-2">{formatCurrency(employeesTotal)}</p>
          </div>

          <div className="bg-[#37474f] p-4 rounded-lg text-center border border-gray-600">
            <p className="text-lg font-semibold">Part Entreprise</p>
            <p className="text-blue-400 text-2xl font-bold mt-2">{formatCurrency(companyTotal)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportSales;
