import DataSalesInput from "./DataSalesInput";
import { ArrowUpNarrowWide, Beer, CheckCircle, XCircle } from "lucide-react";

type DataEntryProps = {
  expertise: number | "";
  setExpertise: (value: number | "") => void;
  nbBiere: number | "";
  setNbBiere: (value: number | "") => void;
  handleSaleSubmit: () => void;
  resetAll: () => void;
};

/**
 * DataEntry component for user input of expertise level and number of beers.
 */
const DataEntry: React.FC<DataEntryProps> = ({
  expertise,
  setExpertise,
  nbBiere,
  setNbBiere,
  handleSaleSubmit,
  resetAll,
}) => {
  /**
   * Handles expertise input change with validation (max 100).
   */
  const handleExpertiseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(e.target.value) || "";
    if (inputValue === "" || inputValue <= 100) {
      setExpertise(inputValue);
    }
  };

  /**
   * Handles beer quantity input change with validation (max 999999).
   */
  const handleNbBiereChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(e.target.value) || "";
    if (inputValue === "" || inputValue <= 999999) {
      setNbBiere(inputValue);
    }
  };

  return (
    <div
      className="flex flex-col flex-1 items-center p-8 bg-[#263238]
      border border-gray-500 rounded-xl shadow-2xl gap-12"
    >
      <h2 className="text-2xl font-bold text-center text-gray-400">Saisie des données</h2>

      <div className="flex flex-col w-full justify-center gap-8">
        <DataSalesInput
          title="Niveau d'expertise"
          icon={ArrowUpNarrowWide}
          value={expertise}
          onChange={handleExpertiseChange}
          placeholder="Entrez votre niveau d'expertise"
          showMaxButton
          onMaxClick={() => setExpertise(100)}
        />
        <DataSalesInput
          title="Nombre de bières"
          icon={Beer}
          value={nbBiere}
          onChange={handleNbBiereChange}
          placeholder="Entrez le nombre de bières"
        />
      </div>

      <div className="flex w-full justify-end gap-4">
        <button
          onClick={resetAll}
          className="flex items-center gap-2 bg-red-400 hover:bg-red-400/80
          border border-gray-500 text-gray-700 px-6 py-2 rounded-lg font-bold
          transition transform scale-100 hover:scale-105 disabled:bg-gray-500"
          aria-label="Réinitialiser les données"
        >
          <XCircle size={24} />
          <p className="text-lg">Reset</p>
        </button>
        <button
          onClick={handleSaleSubmit}
          disabled={!expertise || !nbBiere}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-500/80
          border border-gray-500 text-gray-700 px-6 py-2 rounded-lg font-bold
          transition transform scale-100 hover:scale-105 disabled:bg-gray-500"
          aria-label="Ajouter la vente"
        >
          <CheckCircle size={24} />
          <p className="text-lg">Ajouter la vente</p>
        </button>
      </div>
    </div>
  );
};

export default DataEntry;
