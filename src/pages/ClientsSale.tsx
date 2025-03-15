import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import EmployeeBento from "../components/pages/sales/EmployeeBento";
import RedistributionGradeBento from "../components/pages/sales/RedistributionGradeBento";
import DataEntry from "../components/pages/sales/client-sales/DataEntry";
import TotalSales from "../components/pages/sales/client-sales/TotalSales";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

/**
 * Special discounts applied only on "Jus de Cerise" for specific groups/companies.
 */
const specialDiscounts: Record<string, number> = {
  Milice: 20,
  "EMS Cayo": 20,
  Repairico: 20,
};

/**
 * Returns the price per unit for "Jus de Cerise" based on quantity purchased.
 */
const getJusDeCerisePrice = (quantity: number): number => {
  if (quantity > 800) return 50;
  if (quantity > 400) return 55;
  if (quantity > 200) return 60;
  return 65;
};

const ClientsSales: React.FC = () => {
  const { user } = useAuth();
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [selectedDiscount, setSelectedDiscount] = useState<string | null>(null);
  const [productPrices, setProductPrices] = useState<Record<string, number>>({});

  /**
   * Fetch product prices from the database.
   */
  const fetchProductPrices = async () => {
    const { data, error } = await supabase
      .from("data")
      .select("value")
      .eq("key", "product_price")
      .single();

    if (error) {
      console.error("Error fetching product prices:", error);
      return;
    }

    if (data?.value) {
      // Convert JSON keys to match frontend names
      const formattedPrices: Record<string, number> = {
        "Bière": data.value.biere.priceClean,
        "Bière Pils": data.value.biere_pils.priceClean,
        "Bière Red": data.value.biere_red.priceClean,
        "Bière Triple": data.value.biere_triple.priceClean,
      };

      setProductPrices(formattedPrices);
    }
  };

  /**
   * Fetch prices on mount and subscribe to real-time updates.
   */
  useEffect(() => {
    fetchProductPrices();
    const subscription = supabase
      .channel("realtime-product-prices")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "data", filter: "key=eq.product_price" },
        (payload) => {
          fetchProductPrices();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  /**
   * Calculates the total sales amount and generates an order summary.
   */
  let totalSales = 0;
  let orderSummary: { name: string; quantity: number; unitPrice: number; totalPrice: number }[] = [];

  Object.entries(quantities).forEach(([product, quantity]) => {
    if (quantity <= 0) return;

    let unitPrice = productPrices[product] || 0;

    if (product === "Jus de Cerise") {
      if (selectedDiscount && selectedDiscount in specialDiscounts) {
        unitPrice = specialDiscounts[selectedDiscount];
      } else {
        unitPrice = getJusDeCerisePrice(quantity);
      }
    }

    const totalPrice = unitPrice * quantity;
    totalSales += totalPrice;

    orderSummary.push({ name: product, quantity, unitPrice, totalPrice });
  });

  /**
   * Handles the sale submission and stores it in the database.
   */
  const handleSale = async () => {
    const discountValue = selectedDiscount === "Remise ?" ? null : selectedDiscount;

    const saleData = {
      employee_id: user?.employee_id,
      first_name: user?.first_name,
      last_name: user?.last_name,
      type: "client",
      sale_type: "clean",
      discount: discountValue,
      total_employee_money: 0,
      total_company_money: totalSales,
    };

    const { error } = await supabase.from("sales_logs").insert([saleData]);

    if (error) {
      console.error("Error adding sale:", error);
      toast.error("Erreur lors de l'ajout de la vente");
      return;
    }

    toast.success(
      <div>
        <p>Vente ajoutée</p>
        <p>Total: {totalSales} $</p>
      </div>,
      { duration: 4000 }
    );

    setQuantities({});
    setSelectedDiscount(null);
  };

  return (
    <div className="flex flex-col w-full gap-10">
      <div className="flex flex-row gap-10 w-full">
        <EmployeeBento />
        <RedistributionGradeBento />
      </div>

      <div className="flex flex-row gap-10 w-full">
        <div className="w-[70%]">
          <DataEntry
            quantities={quantities}
            setQuantities={setQuantities}
            selectedDiscount={selectedDiscount || "Remise ?"}
            setSelectedDiscount={setSelectedDiscount}
            handleSaleSubmit={handleSale}
          />
        </div>

        <div className="flex w-[30%]">
          <TotalSales totalAmount={totalSales} selectedDiscount={selectedDiscount || "Pas de réduction"} orderSummary={orderSummary} />
        </div>
      </div>
    </div>
  );
};

export default ClientsSales;
