import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Rechercher...",
  value,
  onChange,
}) => {
  return (
    <div className="relative w-[20%]">
      {/* Icône de recherche */}
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />

      {/* Champ de recherche */}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 pl-10 border border-gray-400 rounded-lg bg-transparent text-white focus:outline-none hover:border-gray-300 transition"
      />
    </div>
  );
};

export default SearchBar;
