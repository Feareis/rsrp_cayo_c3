import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import CustomInput from "../../components/core/CustomInput";
import { User, KeyRound } from "lucide-react";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  const images = ["TabacCayo.png", "BrasserieCayo.png", "cayo.png"];


  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">

      {/* Section des images en arrière-plan */}
      <div className="absolute inset-0 flex w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`h-full transition-all duration-500 relative ${selected === null ? "w-1/3" : selected === index ? "w-[80%]" : "w-[10%]"}`}
            onClick={() => setSelected(index)}
          >
            <img
              src={`/static/${image}`}
              alt={`Entreprise ${index + 1}`}
              className={`w-full h-full object-cover cursor-pointer transition-opacity duration-300 bg-black ${selected === null ? "opacity-90" : selected === index ? "opacity-100" : "opacity-25"}`}
            />
          </div>
        ))}
      </div>

      <div className="relative z-10 bg-[#263238] p-6 flex flex-col justify-around rounded-xl shadow-lg border border-gray-600 text-center text-gray-400 w-[20%] h-[30%]">
        <h2 className="text-2xl font-bold">Connexion</h2>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Boutons de sélection d'entreprise */}
          <div className="flex justify-around gap-4">
            {["Le Tabarico", "La Pericave", "La Cantina"].map((name, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-lg font-bold transition-all duration-300 hover:scale-105 ${selected === index ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"}`}
                onClick={() => setSelected(index)}
              >
                {name}
              </button>
            ))}
          </div>
          <CustomInput
            type="text"
            icon={User}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nom d'utilisateur"
          />
          <CustomInput
            type="password"
            icon={KeyRound}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
          />
          <button
            type="submit"
            className="w-1/2 py-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold rounded-lg transition-transform duration-200 hover:scale-105"
          >
            SE CONNECTER
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
