import React, { useState } from "react";
import StaticInput from "../components/core/StaticInput";
import DynamicInput from "../components/core/DynamicInput";
import CustomButton from "../components/core/CustomButton";
import { ShieldHalf, User, Phone, CalendarFold, Lock, KeyRound, CheckCircle } from "lucide-react";

const Profile: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  return (
    <div className="flex justify-center items-center bg-[#37474f] text-[#cfd8dc] px-4">
      {/* Conteneur Principal */}
      <div className="flex flex-row w-full gap-8">

        {/* Section Gauche */}
        <div className="w-[50%]">
              <div className="p-4 bg-[#263238] rounded-lg shadow-md">
                <h2 className="ml-2 text-xl font-bold mb-8">Informations du profil</h2>

                <div className="flex flex-col gap-6 p-4">
                  <StaticInput icon={ShieldHalf} label="Grade" text="Patron" />
                  <StaticInput icon={User} label="Prénom Nom" text="John Doe" />
                  <StaticInput icon={Phone} label="Téléphone" text="(001) 001-0001" />
                  <StaticInput icon={CalendarFold} label="Date d'embauche" text="01/01/25" />
                </div>
              </div>
        </div>

        {/* Section Droite */}
        <div className="w-[50%]">

              <div className="ml-2 p-4 bg-[#263238] rounded-lg shadow-md">
                <h2 className="ml-2 text-xl font-bold mb-8">Modifier son mot de passe</h2>

                <div className="flex flex-col gap-6 p-4">
                  <DynamicInput
                    type="password"
                    icon={Lock}
                    label="Ancien mot de passe *"
                    value={currentPassword}
                    onChange={setCurrentPassword}
                    placeholder="Entrez votre ancien mot de passe"
                  />

                  <DynamicInput
                    type="password"
                    icon={KeyRound}
                    label="Nouveau mot de passe *"
                    value={newPassword}
                    onChange={setNewPassword}
                    placeholder="Entrez votre nouveau mot de passe"
                  />

                  <DynamicInput
                    type="password"
                    icon={KeyRound}
                    label="Confirmer le mot de passe *"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    placeholder="Confirmez votre nouveau mot de passe"
                  />

                  {/* Conteneur pour aligner le bouton à droite */}
                  <div className="flex justify-end">
                    <CustomButton
                      label="Mettre à jour"
                      onClick={() => console.log("Mot de passe mis à jour")}
                      icon={CheckCircle}
                      className="bg-blue-500 hover:bg-blue-600 text-white mt-4 w-1/4"
                    />
                  </div>
                </div>
              </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
