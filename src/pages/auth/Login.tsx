import { useState } from "react";
import { motion } from "framer-motion";


export default function Login() {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  return (
    <div className="relative h-screen flex flex-col items-center justify-center bg-gray-900 overflow-hidden">

      {/* Formulaire de connexion */}
      <div className="relative z-10 bg-white p-8 rounded-lg shadow-md w-96 text-center mt-8">
        <h2 className="text-2xl font-bold mb-4">Se Connecter</h2>
        <input type="text" placeholder="Utilisateur" className="w-full p-2 mb-2 border rounded" />
        <input type="password" placeholder="Mot de passe" className="w-full p-2 mb-4 border rounded" />
        <button className="w-full p-2 bg-blue-600 text-white rounded">Connexion</button>
      </div>
    </div>
  );
}
