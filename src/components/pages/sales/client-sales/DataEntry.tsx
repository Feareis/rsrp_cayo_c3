import React, { useState } from "react";
import ProductCard from "./ProductCard";
import DiscountSelect from "./DiscountSelect";
import { Biere, BierePils, BiereRed, BiereTriple, JusDeCerise } from "../../../../assets/product/indexProducts.ts";
import { Percent, XCircle, CheckCircle } from "lucide-react";


type DataEntryProps = {
  quantities: Record<string, number>;
  setQuantities: (quantities: Record<string, number>) => void;
  selectedDiscount: string;
  setSelectedDiscount: (discount: string) => void;
  handleSaleSubmit: () => void;
};

/**
 * Available products categorized into tabs.
 */
const products = {
  Boisson: [{ id: "Jus de Cerise", name: "Jus de Cerise", image: JusDeCerise }],
  Alcool: [
    { id: "Bière", name: "Bière", image: Biere },
    { id: "Bière Pils", name: "Bière Pils", image: BierePils },
    { id: "Bière Red", name: "Bière Red", image: BiereRed },
    { id: "Bière Triple", name: "Bière Triple", image: BiereTriple },
  ],
};

const DataEntry: React.FC<DataEntryProps> = ({ quantities, setQuantities, selectedDiscount, setSelectedDiscount, handleSaleSubmit }) => {
  const [activeTab, setActiveTab] = useState<"Boisson" | "Alcool">("Boisson");

  /**
   * Default display value for DiscountSelect.
   */
  const defaultDiscountLabel = "Remise ?";

  /**
   * Updates the quantity of a specific product.
   */
  const setProductQuantity = (id: string, value: number) => {
    setQuantities((prev) => ({ ...prev, [id]: value }));
  };

  /**
   * Resets all product quantities to 0 and resets the selected discount.
   */
  const resetAll = () => {
    setQuantities({});
    setSelectedDiscount(defaultDiscountLabel);
  };


  return (
    <div className="flex flex-row gap-8 w-full">
      <div className="flex flex-col w-full p-6 gap-8 bg-[#263238] border border-gray-500 rounded-xl shadow-lg">
        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-gray-400">Saisie des données</h2>

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

          {/* Discount selection */}
          <div className="flex flex-row items-center gap-4 mx-4">
            <DiscountSelect icon={Percent} options={["Milice", "EMS Cayo", "Repairico", "Aucune"]} value={selectedDiscount} onChange={setSelectedDiscount} />
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
              onInputChange={(e) => setProductQuantity(product.id, Number(e.target.value))}
            />
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex flex-1 justify-end gap-4">
          {/* Reset Button */}
          <button
            onClick={resetAll}
            className="flex items-center gap-2 bg-red-400 hover:bg-red-400/80
            border border-gray-500 text-gray-700 px-6 py-2 rounded-lg font-bold
            transition transform scale-100 hover:scale-105 disabled:bg-gray-500"
            aria-label="Reset data"
          >
            <XCircle size={24} />
            <p className="text-lg">Reset</p>
          </button>

          {/* Submit Sale Button */}
          <button
            onClick={handleSaleSubmit}
            disabled={!Object.values(quantities).some((q) => q > 0)}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-500/80
            border border-gray-500 text-gray-700 px-6 py-2 rounded-lg font-bold
            transition transform scale-100 hover:scale-105 disabled:bg-gray-500"
            aria-label="Submit sale"
          >
            <CheckCircle size={24} />
            <p className="text-lg">Ajouter une vente</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataEntry;
