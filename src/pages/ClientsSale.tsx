import React, { useState, useEffect } from 'react';
import EmployeeBento from "../components/pages/sales/EmployeeBento";
import RedistributionGradeBento from "../components/pages/sales/RedistributionGradeBento";
import DataEntry from "../components/pages/sales/client-sales/DataEntry";
import TotalSales from "../components/pages/sales/client-sales/TotalSales";
import CustomButton from "../components/core/CustomButton";
import { BadgeDollarSign, RefreshCw, ArrowUpNarrowWide, Salad, AlertCircle, CircleCheck, CircleAlert } from "lucide-react";
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

  const handleSale = async () => {
    if (!expertise || !nbBiere) {
      toast.error("Erreur : vérifier vos entrées !");
      return;
    }

    const cleanSaleData = {
      employee_id: user?.employee_id,
      first_name: user?.first_name,
      last_name: user?.last_name,
      type: "client",
      sale_type: "clean",
      discount: discount,
      total_employee_money: employeesTotal,
      total_company_money: companyTotal,
    };

    const dirtySaleData = {
      employee_id: user?.employee_id,
      first_name: user?.first_name,
      last_name: user?.last_name,
      type: "client",
      sale_type: "dirty",
      discount: discount,
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
    <div className="flex flex-col w-full gap-10">
      {/* Employee + Date Bento */}
      <div className="flex flex-row gap-10 w-full">
        <EmployeeBento />
        <RedistributionGradeBento />
      </div>

      <div className="flex flex-row gap-10 w-full">
        <div className="w-[70%]">
          <DataEntry />
        </div>
        <div className="flex w-[30%]">
          <TotalSales />
        </div>
      </div>
    </div>
  );
};

export default ClientsSales;
