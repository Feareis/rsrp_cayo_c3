import React from "react";
import { HelpCircle, Book, LifeBuoy } from "lucide-react";
import HelpCard from "../../components/pages/helpcenter/HelpCard";
import HelpSvg from "../../assets/core_svg/undraw_questions_g2px.svg";

const HelpCenter = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full text-[#cfd8dc] pt-30">
      {/* Illustration SVG */}
      <div className="w-72 h-64">
        <img src={HelpSvg} alt="Question" />
      </div>

      {/* Contenu des cartes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-full px-8">
        <HelpCard title="Guide" description="Bientôt disponible" icon={<Book size={32} />} link="/help-center/guide" disabled /> {/* Tips & Astuces */}
        <HelpCard title="FAQ" description="Trouvez des réponses à vos questions" icon={<HelpCircle size={32} />} link="/help-center/faq" />
        <HelpCard title="Support" description="Bientôt disponible" icon={<LifeBuoy size={32} />} disabled />
      </div>
    </div>
  );
};

export default HelpCenter;
