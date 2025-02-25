import { useState } from "react";
import { Filter, Plus } from "lucide-react";
import CustomSelect from "../../components/core/CustomSelect";
import CustomSearchBar from "../../components/core/CustomSearchBar";
import bannerImage from "../../assets/guide_banner.jpg";

const threads = [
  {
    id: 1,
    title: "Lire le dashboard",
    category: "Site",
    description: "Comprendre le fonctionnement du dashboard.",
  },
  {
    id: 2,
    title: "Point de vente",
    category: "RP",
    description: "Tata",
  },
  {
    id: 3,
    title: "Utilisation de la section Admin",
    category: "Site",
    description: "Toto",
  },
  {
    id: 4,
    title: "Travailler à {entreprise.rsrp.cayo.fullName}",
    category: "RP",
    description: "Test",
  },
];

const categories = ["Tous", "Site", "RP"];

export default function ForumPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredThreads = threads.filter(
    (thread) =>
      (selectedCategory === "Tous" || thread.category === selectedCategory) &&
      thread.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8">
      {/* Barre de filtre et de recherche */}
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
          placeholder="Rechercher un thread..."
          value={searchQuery}
          onChange={setSearchQuery}
        />
        <button className="flex h-[48px] w-[80px] justify-center items-center p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          <Plus size={22} />
        </button>
      </div>

      {/* Liste des threads */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {filteredThreads.map((thread) => (
          <div
            key={thread.id}
            className="flex flex-col bg-[#263238] justify-between border border-gray-600 p-4 rounded-xl shadow-lg"
          >
            {/* Titre du thread */}
            <h2 className="text-2xl font-bold mb-2">{thread.title}</h2>

            {/* Bannière */}
            <img
              src={bannerImage}
              alt="Bannière"
              className="w-[95%] h-[30%] mx-auto rounded-xl mb-4"
            />

            {/* Description */}
            <p className="text-gray-300">{thread.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
