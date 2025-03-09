import React from "react";

interface PriceCardProps {
  name: string; // Product name
  image: string; // Product image URL
  priceClean: number; // Clean price (e.g., discounted)
  priceDirty: number; // Dirty price (e.g., regular price)
  calories: number; // Caloric value
}

/**
 * PriceCard component displays a product with its image, prices, and calorie count.
 */
const PriceCard: React.FC<PriceCardProps> = ({
  name,
  image,
  priceClean,
  priceDirty,
  calories,
}) => {
  return (
    <div
      className="bg-[#263238] p-4 rounded-lg border border-gray-600
      shadow-2xl w-full text-center"
    >
      {/* Product name */}
      <h3 className="text-gray-300/80 font-bold text-2xl">{name}</h3>

      {/* Product image */}
      <div className="flex justify-center my-4">
        <img
          src={image}
          alt={name}
          className="w-42 object-cover rounded-md"
          aria-label={`Image of ${name}`}
        />
      </div>

      {/* Pricing information */}
      <div className="flex flex-row justify-center font-bold text-2xl gap-4">
        <p className="text-green-400">{priceClean} $</p>
        <p>-</p>
        <p className="text-red-400">{priceDirty} $</p>
      </div>

      {/* Caloric value */}
      <p className="text-gray-400 font-semibold text-base mt-2">{calories} kcal</p>
    </div>
  );
};

export default PriceCard;
