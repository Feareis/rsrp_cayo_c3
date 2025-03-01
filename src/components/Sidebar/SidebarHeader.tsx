import LogoEntreprise from "/rsrp_cayo_perico_flag.ico";

export default function SidebarHeader({ companyName = "EntrepriseName" }) {
  return (
    <div className="h-24 flex items-center justify-center px-4 box-border py-4 gap-2">
      <img
        src={LogoEntreprise}
        alt="logo-entreprise"
        title={companyName} // Display company name on tooltip
        className="w-14 h-9 rounded-md"
      />
      <p className="text-xl font-bold">{companyName}</p>
    </div>
  );
}
