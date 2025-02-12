import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import HelpSvg from "../../assets/core_svg/undraw_faq_h01d.svg";

const faqs = [
  {
    question: "Comment Utiliser le site ?",
    answer: [
      "Allez dans Aide (barre latérale).",
      "Section 'Guide'.",
    ],
  },
  {
    question: "Comment modifier mon mot de passe ?",
    answer: [
      "Allez dans les paramètres de votre compte.",
      "Cliquez sur l'onglet 'Mot de passe'.",
    ],
  },
];


export default function FAQ() {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleFAQ = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="flex flex-col items-center text-[#cfd8dc]">
      {/* Illustration SVG */}
      <div className="w-72 h-64 flex justify-center">
        <img src={HelpSvg} alt="Question" className="object-contain" />
      </div>

      {/* FAQ Container */}
      <div className="space-y-4 w-1/2">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-[#263238] p-5 rounded-lg shadow-md">
            {/* Question (Bouton) */}
            <button
              className="flex items-center justify-between w-full text-left text-lg font-semibold transition-all duration-300"
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.question}</span>
              {openIndexes.includes(index) ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </button>

            {/* Réponse (Animation d’ouverture) */}
            <div
              className={`overflow-hidden transition-all duration-400 ${
                openIndexes.includes(index) ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0"
              }`}
            >
              <div className="text-gray-400 flex flex-col gap-1">
                {faq.answer.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
