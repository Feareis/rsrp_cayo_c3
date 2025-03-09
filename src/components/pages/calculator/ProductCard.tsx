import React from "react";

interface ProductCardProps {
  name: string;
  image: string;
  quantity: number;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * ProductCard component displays a product with an image, name, and an input field for quantity.
 */
const ProductCard: React.FC<ProductCardProps> = ({
  name,
  image,
  quantity,
  onInputChange,
}) => {
  return (
    <div
      className="bg-[#263238] shadow-lg rounded-2xl p-2 flex flex-col
      border border-gray-500 items-center w-full gap-4 transform
      transition duration-200 hover:scale-102"
    >
      {/* Product name */}
      <div className="flex justify-center w-full p-4 text-gray-400">
        <h3 className="text-2xl font-bold text-center">{name}</h3>
      </div>

      {/* Product image */}
      <div
        className="flex justify-center w-3/4 p-2 bg-[#37474f]
        border border-gray-600 rounded-xl shadow-2xl"
      >
        <img
          src={image}
          alt={name}
          className="w-[70%] h-auto object-contain mb-4"
        />
      </div>

      {/* Quantity input field */}
      <div className="flex justify-center w-full p-4">
        <input
          type="text"
          value={quantity}
          onChange={onInputChange}
          aria-label={`Quantity input for ${name}`}
          className="w-[33%] text-center border border-gray-500 font-bold
          text-xl text-gray-200 bg-[#37474f] rounded-lg p-2
          focus:outline-none focus:ring-0 focus:border-gray-400"
          placeholder="0"
        />
      </div>
    </div>
  );
};

export default ProductCard;
