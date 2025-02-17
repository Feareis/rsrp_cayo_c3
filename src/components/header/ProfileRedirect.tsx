import React from "react";
import { Link } from "react-router-dom";
import patronImage from "../../assets/profile_picture/patron.png";

export default function Profile() {
  return (
    <Link to="/profile" className="flex items-center px-2 py-2 transition-all duration-200 ease-in-out hover:bg-[#3e4d56] rounded-lg">
      {/* Image de profil (Carrée avec bords arrondis) */}
      <img
        src={patronImage}
        alt="Profil"
        className="w-11 h-11 rounded-md"
      />
    </Link>
  );
}
