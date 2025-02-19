import RedistributionTableSection from "./RedistributionTableSection";

const RedistributionTable = () => {
  const propreData = [
    { grade: "Patron, Co-Patron", rate: "5%" },
    { grade: "Responsable", rate: "40%" },
    { grade: "CDI", rate: "30%" },
    { grade: "CDD", rate: "25%" },
  ];

  const saleData = [
    { grade: "Vente Client", rate: "10%" },
    { grade: "Vente Export", rate: "15%" },
  ];

  return (
    <div className="flex flex-col items-center w-full p-6 bg-[#263238] border border-gray-600 rounded-xl shadow-lg justify-center flex-grow">
      <h2 className="text-2xl font-bold text-center text-[#cfd8dc] mb-6">Taux de redistribution (en %)</h2>
      <RedistributionTableSection title="Propre" comment="Part Entreprise" data={propreData} />
      <RedistributionTableSection title="Taxe Sale" comment="Le reste est pour vous" data={saleData} />
    </div>
  );
};

export default RedistributionTable;
