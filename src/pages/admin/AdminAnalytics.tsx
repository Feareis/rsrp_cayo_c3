import React, { useState } from "react";

const AdminAnalytics = () => {
  const [activeTab, setActiveTab] = useState<"Résumé" | "Simulateur">("Résumé");

  return (
    <div className="text-[#cfd8dc]">
      {/* 📌 Tabs */}
      <div className="flex gap-8 mb-6">
        <button
          onClick={() => setActiveTab("Résumé")}
          className={`px-4 py-2 rounded-xl transition-all duration-300 ${
            activeTab === "Résumé" ? "bg-[#263238] text-white" : "text-gray-400 hover:text-white"
          }`}
        >
          Résumé
        </button>

        <button
          onClick={() => setActiveTab("Simulateur")}
          className={`px-4 py-2 rounded-xl transition-all duration-300 ${
            activeTab === "Simulateur" ? "bg-[#263238] text-white" : "text-gray-400 hover:text-white"
          }`}
        >
          Simulateur
        </button>
      </div>

      {/* 📌 Contenu dynamique */}
      <div className="bg-[#263238] min-h-screen p-6 rounded-lg shadow-lg transition-all duration-500">
        {activeTab === "Résumé" ? <Résumé /> : <Simulateur />}
      </div>
    </div>
  );
};

/* 🔹 Composant Résumé */
const Résumé = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Résumé de l’Activité</h2>
      <p>📊 Ici, tu peux afficher des statistiques en temps réel sur l’activité.</p>
      {/* Ajoute tes graphiques, KPI, et autres ici */}
    </div>
  );
};

/* 🔹 Composant Simulateur */
const Simulateur = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Simulateur</h2>
      <p>🛠️ Ici, tu peux proposer un outil de simulation.</p>
      {/* Ajoute ton simulateur ici */}
    </div>
  );
};

export default AdminAnalytics;
