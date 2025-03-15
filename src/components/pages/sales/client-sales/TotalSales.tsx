import React from "react";
import TotalCard from "./TotalCard";

interface TotalSalesProps {
  totalAmount: number;
  orderSummary: { name: string; quantity: number; unitPrice: number; totalPrice: number }[];
  selectedDiscount: string;
}

/**
 * Formats a number into a currency string.
 */
const formatCurrency = (value?: number): string => {
  return value && value > 0 ? `${value.toLocaleString("en-EN")} $` : "0 $";
};

const TotalSales: React.FC<TotalSalesProps> = ({ totalAmount, orderSummary, selectedDiscount }) => {
  return (
    <div className="flex flex-col w-full items-center justify-between p-8 bg-[#263238] border border-gray-500 rounded-xl shadow-2xl gap-6">
      {/* Header */}
      <h2 className="text-2xl font-bold text-center text-gray-400">Résumé & Total</h2>

      {/* Discount Info + Order Summary */}
      <div className="flex flex-col w-full h-full bg-[#37474f] p-4 border border-gray-600 text-gray-400 rounded-md shadow-xl gap-8">
        <p className="flex font-semibold text-gray-300/80">{selectedDiscount !== "None" ? `Remise appliquée : ${selectedDiscount}` : "Pas de remise"}</p>
        <div className="gap-2">
          {orderSummary.length > 0 ? (
            orderSummary.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-600 last:border-none">
                {/* Product Name & Quantity */}
                <div className="flex-1">
                  <p className="font-bold">- {item.quantity} {item.name}</p>
                </div>

                {/* Price Info */}
                <div className="flex-1 text-right text-green-400 font-semibold">
                  {formatCurrency(item.totalPrice)} <span className="text-gray-500 text-sm">({formatCurrency(item.unitPrice)}/u)</span>
                </div>
              </div>
            ))
          ) : (
            <p>Merci d'ajouter un produit minimum...</p>
          )}
        </div>
      </div>

      {/* Total Amount */}
      <TotalCard title="Facture (F6)" value={formatCurrency(totalAmount)} commentary="Dans le coffre de l'entreprise" />
    </div>
  );
};

export default TotalSales;
