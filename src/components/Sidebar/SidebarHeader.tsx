import LogoEntreprise from "/rsrp_cayo_perico_flag.ico";

/**
 * SidebarHeader component displaying the company logo and name.
 */
export default function SidebarHeader({ companyName }: { companyName: string }) {
  return (
    <div className="h-24 flex items-center justify-center px-4 py-4 gap-3">
      {/* Company Logo */}
      {LogoEntreprise && (
        <img
          src={LogoEntreprise}
          alt="Company Logo"
          title={companyName} // Tooltip on hover
          className="w-14 h-9 rounded-md"
        />
      )}

      {/* Company Name */}
      <p className="text-xl font-bold">{companyName}</p>
    </div>
  );
}
