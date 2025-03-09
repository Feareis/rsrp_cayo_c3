import React from "react";
import PriceCard from "../components/pages/pricing/PriceCard";
import { Biere, BierePils, BiereRed, BiereTriple, JusDeCerise } from "../assets/product/indexProducts.ts";

const products = [
  { id: 1, name: "Jus de Cerise", image: JusDeCerise, priceClean: 5, priceDirty: 8, calories: 50 },
  { id: 2, name: "Bière", image: Biere, priceClean: 100, priceDirty: 150, calories: 25 },
  { id: 3, name: "Bière Pils", image: BierePils, priceClean: 130, priceDirty: 180, calories: 25 },
  { id: 4, name: "Bière Red", image: BiereRed, priceClean: 230, priceDirty: 350, calories: 25 },
  { id: 5, name: "Bière Triple", image: BiereTriple, priceClean: 330, priceDirty: 480, calories: 25 },
];

const Pricing: React.FC = () => {
  return (
    <div className="flex flex-col justify-center w-full">
      <div className="flex flex-row w-full gap-6 justify-center">
        {products.map((product) => (
          <PriceCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default Pricing;
