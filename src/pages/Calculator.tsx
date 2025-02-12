import React, { useState } from "react";
import CustomCalculatorButton from "../components/pages/calculator/CustomCalculatorButton";
import { CheckCircle, PlusCircle, ShieldCheck, RefreshCw } from "lucide-react";

const Calculator: React.FC = () => {
  const [counts, setCounts] = useState({ quota: 0, quotaPlus: 0, quotaFull: 0 });

  // Actions des boutons
  const applyQuota = () => setCounts({ ...counts, quota: counts.quota + 1 });
  const applyQuotaPlus = () => setCounts({ ...counts, quotaPlus: counts.quotaPlus + 1 });
  const applyQuotaFull = () => setCounts({ ...counts, quotaFull: counts.quotaFull + 1 });
  const resetAll = () => setCounts({ quota: 0, quotaPlus: 0, quotaFull: 0 });

  return (
    <div className="w-full flex items-center gap-4 px-6">
      {/* Boutons visibles avec effet Glow */}
      <CustomCalculatorButton
        label="Quota"
        onClick={applyQuota}
        className="group relative hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]"
        icon={CheckCircle}
      />
      <CustomCalculatorButton
        label="Quota+"
        onClick={applyQuotaPlus}
        className="group relative hover:shadow-[0_0_30px_rgba(234,179,8,0.5)]"
        icon={PlusCircle}
      />
      <CustomCalculatorButton
        label="Quota Full"
        onClick={applyQuotaFull}
        className="group relative hover:shadow-[0_0_30px_rgba(249,115,22,0.5)]"
        icon={ShieldCheck}
      />

      {/* Bouton invisible avec espacement configurable */}
      <CustomCalculatorButton label="" className="" icon={CheckCircle} disabled />

      {/* Bouton Reset avec effet Glow */}
      <CustomCalculatorButton
        label="Reset all"
        onClick={resetAll}
        className="group relative hover:shadow-[0_0_30px_rgba(239,68,68,0.5)]"
        icon={RefreshCw}
      />
    </div>
  );
};

export default Calculator;
