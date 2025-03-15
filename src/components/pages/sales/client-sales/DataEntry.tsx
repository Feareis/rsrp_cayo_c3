import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { Biere, BierePils, BiereRed, BiereTriple, JusDeCerise } from "../../../../assets/product/indexProducts.ts";
import { CheckCircle, XCircle } from "lucide-react";

type DataEntryProps = {
  expertise: number | "";
  setExpertise: (value: number | "") => void;
  nbBiere: number | "";
  setNbBiere: (value: number | "") => void;
  handleSaleSubmit: () => void;
  resetAll: () => void;
};

/**
 * List of available products categorized into tabs.
 */
const products = {
  Boisson: [{ id: 1, name: "Jus de Cerise", image: JusDeCerise }],
  Alcool: [
    { id: 2, name: "Bière", image: Biere },
    { id: 3, name: "Bière Pils", image: BierePils },
    { id: 4, name: "Bière Red", image: BiereRed },
    { id: 5, name: "Bière Triple", image: BiereTriple },
  ],
};

/**
 * DataEntry component handles product quantity input and sales submission.
 */
const DataEntry: React.FC<DataEntryProps> = ({ handleSaleSubmit, resetAll }) => {
  const [activeTab, setActiveTab] = useState<"Boisson" | "Alcool">("Boisson");
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  /**
   * Updates the quantity of a specific product.
   */
  const setProductQuantity = (id: number, value: number) => {
    setQuantities((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="flex flex-row gap-8 w-full">
      <div
        className="flex flex-col w-full p-6 gap-8 bg-[#263238] border
        border-gray-500 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center text-gray-400">Saisie des Données</h2>

        {/* Tabs for product selection */}
        <div className="flex flex-row justify-between gap-4 mb-6">
          <div className="flex flex-row items-center gap-4 mx-4">
            {(["Boisson", "Alcool"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-4 rounded-md transition-all duration-300
                ${activeTab === tab ? "bg-[#37474f] text-white" : "text-gray-400 hover:text-white"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Display products based on active tab */}
        <div className="flex flex-row gap-6 px-4 p-1">
          {products[activeTab].map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              image={product.image}
              quantity={quantities[product.id] || 0}
              setQuantity={(value) => setProductQuantity(product.id, value)}
            />
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex flex-1 justify-end gap-4">
          <button
            onClick={resetAll}
            className="flex items-center gap-2 bg-red-400 hover:bg-red-400/80
            border border-gray-500 text-gray-700 px-6 py-2 rounded-lg font-bold
            transition transform scale-100 hover:scale-105 disabled:bg-gray-500"
            aria-label="Réinitialiser les données"
          >
            <XCircle size={24} />
            <p className="text-lg">Reset</p>
          </button>
          <button
            onClick={handleSaleSubmit}
            disabled={!Object.values(quantities).some((q) => q > 0)}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-500/80
            border border-gray-500 text-gray-700 px-6 py-2 rounded-lg font-bold
            transition transform scale-100 hover:scale-105 disabled:bg-gray-500"
            aria-label="Ajouter la vente"
          >
            <CheckCircle size={24} />
            <p className="text-lg">Ajouter la vente</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataEntry;
