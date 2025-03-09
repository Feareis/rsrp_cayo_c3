import React from "react";
import { Link } from "react-router-dom";
import DiscordLogo from "../../assets/core_svg/discord-icon-svgrepo-com.svg";
import { User } from "lucide-react";

export default function Profile() {
  return (
    <div className="flex items-center gap-4">
      {/* Lien vers Discord */}
      <a href="https://discord.gg/8hngknuykS" target="_blank" rel="noopener noreferrer">
        <div className="bg-[#263238] border border-gray-500/60 py-2 px-4 text-lg font-bold rounded-lg shadow-lg transition-transform duration-200 hover:scale-105 flex items-center gap-2">
          <img src={DiscordLogo} className="w-8 h-8" alt="Discord Logo" />
        </div>
      </a>

      <Link to="/profile" className="flex items-center gap-4">
        {/* Texte Profil */}
        <div className="bg-[#263238] border border-gray-500/60 py-2 px-4 text-lg font-bold rounded-lg shadow-lg transition-transform duration-200 hover:scale-105">
          <User className="text-[#cfd8dc]" size={32} />
        </div>
      </Link>
    </div>
  );
}
