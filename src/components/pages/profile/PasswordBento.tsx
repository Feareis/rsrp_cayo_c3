import { useEffect, useState } from "react";
import PasswordInput from "./PasswordInput";
import { Lock, KeyRound, CheckCircle } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { supabase } from "../../../lib/supabaseClient";
import bcrypt from "bcryptjs";
import { toast } from "react-hot-toast";

const PasswordBento: React.FC = () => {
  const { user } = useAuth();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordUpdate = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Tous les champs sont requis.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }
    setLoading(true);

    const { data: userData, error: fetchError } = await supabase
      .from("access")
      .select("password_hash")
      .eq("employee_id", user.employee_id)
      .single();

    if (fetchError) {
      toast.error("Erreur lors de la récupération du mot de passe actuel.");
      setLoading(false);
      return;
    }

    const isMatch = await bcrypt.compare(currentPassword, userData.password_hash);
    if (!isMatch) {
      toast.error("Mot de passe actuel incorrect.");
      setLoading(false);
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const { error: updateError } = await supabase
      .from("access")
      .update({ password_hash: hashedPassword })
      .eq("employee_id", user.employee_id);

    setLoading(false);
    if (updateError) {
      toast.error("Erreur lors de la mise à jour du mot de passe.");
    } else {
      toast.success("Mot de passe mis à jour avec succès !");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="flex flex-col items-center w-full p-8 bg-[#263238] border border-gray-500 rounded-xl shadow-2xl gap-12">
      <h2 className="text-2xl font-bold text-center text-gray-400">Modifier votre mot de passe</h2>
      <div className="flex flex-col w-full justify-center gap-8">
        <PasswordInput
          title="Mot de passe actuel"
          icon={Lock}
          value={currentPassword}
          onChange={setCurrentPassword}
          placeholder="Entrer votre mot de passe actuel"
          required={true}
        />
        <PasswordInput
          title="Nouveau Mot de passe"
          icon={KeyRound}
          value={newPassword}
          onChange={setNewPassword}
          placeholder="Entrer votre nouveau mot de passe"
          required={true}
        />
        <PasswordInput
          title="Confirmer Mot de passe"
          icon={KeyRound}
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder="Confirmer votre nouveau mot de passe"
          required={true}
        />
      </div>
      <div className="flex w-full justify-center gap-8">
        <button
          onClick={handlePasswordUpdate}
          disabled={loading}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-500/80 border border-gray-500 text-gray-700 px-6 py-2 rounded-lg font-bold transition transform scale-100 hover:scale-105 disabled:bg-gray-500"
        >
          <CheckCircle size={20} />
          {loading ? "Mise à jour..." : "Mettre à jour"}
        </button>
      </div>
    </div>
  );
};

export default PasswordBento;
