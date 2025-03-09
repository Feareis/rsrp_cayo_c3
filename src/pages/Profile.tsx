import React, { useState, useEffect } from "react";
import InformationBento from "../components/pages/profile/InformationBento";
import PasswordBento from "../components/pages/profile/PasswordBento";


const Profile = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-[#37474f] text-[#cfd8dc] px-4 gap-12">
      <div className="flex flex-row w-full gap-12">
        <InformationBento />
        <PasswordBento />
      </div>
    </div>
  );
};

export default Profile;
