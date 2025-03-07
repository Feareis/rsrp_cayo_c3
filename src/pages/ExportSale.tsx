import React, { useState } from "react";
import EmployeeBento from "../components/pages/sales/EmployeeBento";
import RedistributionGradeBento from "../components/pages/sales/RedistributionGradeBento";
import CustomInput from "../components/core/CustomInput";
import CustomButton from "../components/core/CustomButton";
import { BrowserWarn } from "../components/core/BrowserWarn";
import SaladeCayo from "../assets/raw_material/cantina_cayo/salade_cayo.png";
import { BadgeDollarSign, ArrowUpNarrowWide, Beer, AlertCircle, CircleCheck } from "lucide-react";
import { showToast } from "../components/core/toast/CustomToast";
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from "../context/AuthContext";

const ExportSales: React.FC = () => {
  const { user } = useAuth();
  const [expertise, setExpertise] = useState<number | "">("");
  const [nbBiere, setNbBiere] = useState<number | "">("");

  const calculateEmployeesTotal = (): number => {
    if (!expertise || !nbBiere) return 0;
    const adjustedExpertise = Math.min(Math.max(Number(expertise), 1), 100);
    return (36 + 36 * ((Number(adjustedExpertise) || 0) * 0.003)) * (Number(nbBiere) || 0);
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
    if (!expertise || !nbBiere) {
      showToast("error", "Erreur : vérifier vos entrées !");
      return;
    }
    showToast("success", "Vente ajoutée !");
  };

  const currentDate = new Date().toLocaleDateString('fr-FR');

  return (
    <div className="flex flex-col w-full gap-10">
      {/* Employee + Date Bento */}
      <div className="flex flex-row gap-10 w-full">
        <EmployeeBento />
        <RedistributionGradeBento />
      </div>
      <div className="flex flex-row gap-10 w-full">
        {/* Formulaire */}
        <div className="flex flex-col flex-1 p-6 bg-[#263238] border border-gray-500 rounded-xl shadow-2xl gap-2">
          <h2 className="text-2xl font-bold py-4 text-center text-gray-400">Saisie des données</h2>
          <CustomInput
            label="Niveau d'expertise"
            icon={ArrowUpNarrowWide}
            value={expertise}
            onChange={(e) => setExpertise(Number(e.target.value) || "")}
            placeholder="Entrez votre niveau d'expertise"
            width="w-[60%]"
          />

          <CustomInput
            label="Nombre de bières"
            icon={Beer}
            value={nbBiere}
            onChange={(e) => setNbBiere(Number(e.target.value) || "")}
            placeholder="Entrez le nombre de bières"
            width="w-[60%]"
          />

          <div className="flex justify-center gap-8">
            <div className="w-[70%]"></div>
            <CustomButton
              label="Ajouter la Vente"
              onClick={handleSaleSubmit}
              icon={BadgeDollarSign}
              className="w-[30%] bg-green-700 hover:bg-green-700/80"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1 p-6 bg-[#263238] border border-gray-500 rounded-xl shadow-2xl gap-2">
          <h2 className="text-2xl font-bold py-4 text-center text-gray-400">Visualisation & Totaux</h2>
          <div className="flex flex-row w-full gap-8">
            <div className="w-full bg-[#37474f] p-4 rounded-lg text-center border border-gray-600">
              <p className="text-lg font-semibold">Part Employé</p>
              <p className="text-green-400 text-2xl font-bold mt-2">{formatCurrency(employeesTotal)}</p>
            </div>

            <div className="w-full bg-[#37474f] p-4 rounded-lg text-center border border-gray-600">
              <p className="text-lg font-semibold">Part Entreprise</p>
              <p className="text-blue-400 text-2xl font-bold mt-2">{formatCurrency(companyTotal)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportSales;
