import React, { useState } from "react";
import { RotateCw, Edit, Trash } from "lucide-react";

interface ProductCardProps {
  name: string;
  category: string;
  quantity: number;
  priceClean: number;
  priceDirty: number;
  calories: number;
  imageUrl?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  category,
  quantity,
  priceClean,
  priceDirty,
  calories,
  imageUrl,
  onEdit,
  onDelete,
}) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="relative w-64 h-80 perspective-1000">
      {/* Flip Container */}
      <div
        className={`relative w-full h-full transition-transform duration-500 ${
          flipped ? "rotate-y-180" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Recto */}
        <div
          className="absolute w-full h-full bg-[#263238] border border-gray-600 p-4 rounded-lg shadow-lg flex flex-col items-center justify-between"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Header */}
          <div className="flex justify-between w-full">
            <p className="text-lg font-semibold text-gray-300">{name}</p>
            <button onClick={() => setFlipped(true)} className="text-gray-400 hover:text-gray-200">
              <RotateCw size={20} />
            </button>
          </div>
          {/* Product Image */}
          <div className="w-32 h-32 bg-gray-500 rounded-lg flex items-center justify-center">
            {imageUrl ? (
              <img src={imageUrl} alt={name} className="w-full h-full object-cover rounded-lg" />
            ) : (
              <p className="text-gray-300">Image</p>
            )}
          </div>
          {/* Footer */}
          <div className="flex flex-col items-center">
            <p className="text-gray-400 text-sm">{category}</p>
            <p className="text-xl font-bold text-blue-400">{quantity} en stock</p>
          </div>
        </div>

        {/* Verso */}
        <div
          className="absolute w-full h-full bg-[#1b252b] border border-gray-600 p-4 rounded-lg shadow-lg flex flex-col items-center justify-between transform rotate-y-180"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Header */}
          <div className="flex justify-between items-center w-full">
            <p className="text-lg font-semibold text-gray-300">{name}</p>
            <button onClick={() => setFlipped(false)} className="text-gray-400 hover:text-gray-200">
              <RotateCw size={20} />
            </button>
          </div>

          {/* Prix et Calories */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-green-400 text-lg font-bold">Propre: {priceClean} $</p>
            <p className="text-red-400 text-lg font-bold">Sale: {priceDirty} $</p>
            <p className="text-gray-400 text-sm">{calories} kcal</p>
          </div>

          {/* Actions */}
          <div className="flex flex-row gap-4">
            <button
              onClick={onEdit}
              className="p-2 bg-yellow-500/80 hover:bg-yellow-600 text-white rounded-lg transition"
            >
              <Edit size={20} />
            </button>
            <button
              onClick={onDelete}
              className="p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-lg transition"
            >
              <Trash size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
