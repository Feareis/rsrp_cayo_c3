import React, { useState } from "react";
import EmployeeBento from "../components/pages/sales/EmployeeBento";
import RedistributionGradeBento from "../components/pages/sales/RedistributionGradeBento";
import DataEntry from "../components/pages/sales/export-sales/DataEntry";
import TotalSales from "../components/pages/sales/export-sales/TotalSales";
import { BadgeDollarSign, ArrowUpNarrowWide, Beer, AlertCircle, CircleCheck } from "lucide-react";
import toast from 'react-hot-toast';
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabaseClient";


const ExportSales: React.FC = () => {
  const { user } = useAuth();
  const [expertise, setExpertise] = useState<number | "">("");
  const [nbBiere, setNbBiere] = useState<number | "">("");

  const calculateEmployeesTotal = (): number => {
    if (!expertise || !nbBiere) return 0;
    const adjustedExpertise = Math.min(Math.max(Number(expertise), 1), 100);
    return Math.floor(36 + 36 * ((Number(adjustedExpertise) || 0) * 0.003)) * (Number(nbBiere) || 0);
  };

  const calculateCompanyTotal = (): number => {
    return Math.floor(calculateEmployeesTotal() * 0.3);
  };

  const employeesTotal = calculateEmployeesTotal();
  const companyTotal = calculateCompanyTotal();

  const formatCurrency = (value: number): string => {
    return `${value.toLocaleString("en-EN")} $`;
  };

  const handleSaleSubmit = async () => {
    if (!expertise || !nbBiere) {
      toast.error("Erreur : vérifier vos entrées !");
      return;
    }

    // Préparer les données de la vente
    const saleData = {
      employee_id: user?.employee_id,
      first_name: user?.first_name,
      last_name: user?.last_name,
      type: "export",
      sale_type: "clean",
      discount: null,
      total_employee_money: employeesTotal,
      total_company_money: companyTotal,
    };

    const { error } = await supabase.from("sales_logs").insert([saleData]);

    if (error) {
      console.error("Erreur lors de l'ajout de la vente:", error);
      toast.error("Erreur lors de l'ajout de la vente.");
      return;
    }

    toast.success(
      <div>
        <p>Vente ajoutée avec succès !</p>
        <p>Part Employé : {formatCurrency(employeesTotal)}</p>
        <p>Part Entreprise : {formatCurrency(companyTotal)}</p>
      </div>,
      { duration: 4000 }
    );
    resetAll();
  };

  const resetAll = () => {
    setExpertise("");
    setNbBiere("");
  };

  return (
    <div className="flex flex-col w-full gap-10">
      <div className="flex flex-row gap-10 w-full">
        <EmployeeBento />
        <RedistributionGradeBento />
      </div>
      <div className="flex flex-row gap-10 w-full">
        <DataEntry
          expertise={expertise}
          setExpertise={setExpertise}
          nbBiere={nbBiere}
          setNbBiere={setNbBiere}
          handleSaleSubmit={handleSaleSubmit}
          resetAll={resetAll}
        />
        <TotalSales
          employeesTotal={employeesTotal}
          companyTotal={companyTotal}
        />
      </div>
    </div>
  );
};

export default ExportSales;
