import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CustomInput from "../../components/core/CustomInput";
import { User, KeyRound } from "lucide-react";

const Login: React.FC = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(username, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-[#37474f] h-screen w-full flex items-center justify-center">
      <div className="bg-[#263238] p-8 flex flex-col items-center rounded-xl shadow-lg border border-gray-600 text-gray-400 w-[20%] h-[30%]">
        {/* HEADER */}
        <h2 className="text-3xl font-bold mb-6">Connexion</h2>
        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col w-full flex-1 justify-center space-y-4">
          <CustomInput type="text" icon={User} value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nom d'utilisateur" />
          <CustomInput type="password" icon={KeyRound} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" />
        </form>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {/* FOOTER */}
        <button type="submit" onClick={handleSubmit} className="w-full mt-6 py-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold rounded-lg transition-transform duration-200 hover:scale-102">
          SE CONNECTER
        </button>
      </div>
    </div>
  );
};

export default Login;
