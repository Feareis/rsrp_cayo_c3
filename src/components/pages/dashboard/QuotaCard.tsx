import { CheckCircle } from "lucide-react";

// Define props interface for better TypeScript safety
interface CardProps {
  title: string;
  quota: string;
  description: string;
  linkText: string;
  linkHref: string;
  option?: string;
  valid?: boolean;
}

const QuotaCard: React.FC<CardProps> = ({
  title,
  quota,
  description,
  linkText,
  linkHref,
  option = "",
  valid = false,
}) => {
  return (
    <div
      className={`relative flex flex-col bg-[#37474f] border border-gray-500/60 rounded-xl shadow-xl px-4 py-12 pb-4 gap-10 w-1/2
        ${option} ${!valid ? "backdrop-blur-lg" : ""}`}
    >
      {/* Floating title */}
      <h3 className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#263238] text-xl rounded-xl shadow-xl border border-gray-500 font-semibold px-4 py-1 inline-block max-w-max whitespace-nowrap">
        {title}
      </h3>

      {/* Status icon (Check for valid, X for invalid) */}
      {valid && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <CheckCircle className="text-green-400/60" size={72} />
        </div>
      )}

      {/* Main content blurred if valid */}
      <div className={`flex flex-col justify-center gap-8 ${valid ? "blur-sm" : ""}`}>
        <div className="flex justify-center mt-3 text-gray-300">
          <div className="bg-green-700/70 rounded-md shadow-xl px-4 py-1">
            <p className="text-center font-bold text-2xl">{quota}</p>
          </div>
        </div>

        <p className="text-center font-bold text-gray-300/60 text-2xl">{description}</p>
      </div>

      {/* Redirection button (disabled if valid) */}
      <a
        href={linkHref}
        className={`mt-4 flex justify-center border border-gray-500/60 rounded-xl shadow-xl ${
          valid ? "blur-sm pointer-events-none" : ""
        }`}
      >
        <button className="bg-[#263238] hover:bg-[#1b252b] text-white font-bold py-1 w-full rounded-xl transition">
          {linkText}
        </button>
      </a>
    </div>
  );
};

export default QuotaCard;
