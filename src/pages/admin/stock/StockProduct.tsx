import React, { useState, useEffect, useMemo } from "react";
import { Filter, Plus } from "lucide-react";
import CustomSelect from "../../../components/core/CustomSelect";
import CustomSearchBar from "../../../components/core/CustomSearchBar";
import ProductCard from "../../../components/pages/admin/stock/ProductCard";

// Simulated data (replace with Supabase fetch later)
const fakeProducts = [
  { id: 1, name: "Vin Rouge", category: "Alcool", quantity: 20, priceClean: 100, priceDirty: 150, calories: 25 },
  { id: 2, name: "Whisky", category: "Alcool", quantity: 0, priceClean: 200, priceDirty: 280, calories: 25 },
  { id: 3, name: "Coca-Cola", category: "Boisson", quantity: 15, priceClean: 50, priceDirty: 75, calories: 50 },
  { id: 4, name: "Eau Minérale", category: "Boisson", quantity: 50, priceClean: 20, priceDirty: 35, calories: 15 },
];

const StatCard = ({ title, value, color }: { title: string; value: number; color: string }) => (
  <div className="bg-[#37474f] border border-gray-600 p-4 rounded-lg shadow-lg w-full text-center">
    <p className="text-lg font-semibold">{title}</p>
    <p className={`text-2xl font-bold ${color}`}>{value}</p>
  </div>
);

const categories = ["Tous", "Alcool", "Boisson"];

const StockProduct = () => {
  const [products, setProducts] = useState(fakeProducts);
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");

  // Compute statistics dynamically
  const totalProducts = products.length;
  const availableStock = products.filter((p) => p.quantity > 0).length;
  const outOfStock = products.filter((p) => p.quantity === 0).length;
  
  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "Tous" || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div className="flex flex-col text-[#cfd8dc] gap-12">
      {/* Product Stats */}
      <div className="flex justify-between gap-4">
        <StatCard title="Total Produits" value={totalProducts} color="text-blue-400" />
        <StatCard title="Stock Disponible" value={availableStock} color="text-green-400" />
        <StatCard title="Rupture de Stock" value={outOfStock} color="text-red-400" />
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-row justify-between items-center mb-6">
        <div className="relative w-[10%]">
          <CustomSelect
            icon={Filter}
            label=""
            options={categories}
            value={selectedCategory}
            onChange={setSelectedCategory}
            padding="p-3"
          />
        </div>
        <CustomSearchBar
          placeholder="Rechercher un produit..."
          value={searchQuery}
          onChange={setSearchQuery}
        />
        <button className="flex h-[48px] w-[80px] justify-center items-center p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          <Plus size={22} />
        </button>
      </div>

      {/* Product List */}
      <div className="flex flex-row justify-center gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            category={product.category}
            quantity={product.quantity}
            priceClean={product.priceClean}
            priceDirty={product.priceDirty}
            calories={product.calories}
            imageUrl={null} // Ajoute une vraie URL plus tard
            onEdit={() => console.log("Modifier", product.name)}
            onDelete={() => console.log("Supprimer", product.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default StockProduct;
