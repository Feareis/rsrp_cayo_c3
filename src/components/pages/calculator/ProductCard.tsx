import React from "react";

interface ProductCardProps {
  name: string;
  image: string;
  quantity: number;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, image, quantity, onInputChange }) => {
  return (
    <div className="bg-[#263238] shadow-lg rounded-2xl p-6 flex flex-col items-center transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,183,255,0.5)] w-full max-w-sm">
      {/* Titre du produit */}
      <h3 className="text-2xl font-bold text-center text-white mb-2">{name}</h3>

      {/* Image du produit */}
      <img src={image} alt={name} className="w-3/4 h-auto object-contain rounded-md mb-4" />

      {/* Input pour la quantité */}
      <input
        type="text"
        value={quantity}
        onChange={onInputChange}
        className="w-20 text-center text-xl text-black bg-gray-200 rounded-lg p-1.5"
        placeholder="0"
      />
    </div>
  );
};

export default ProductCard;
