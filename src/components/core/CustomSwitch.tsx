import React from "react";

interface CustomSwitchProps {
  checked: boolean;
  onChange: () => void;
  size?: "small" | "medium" | "large";
  bgColor?: string;
  checkedBgColor?: string;
  knobColor?: string;
  checkedKnobColor?: string;
}

const sizeClasses = {
  small: { container: "w-10 h-5", knob: "w-4 h-4 left-0.5 top-0.5", translate: "translate-x-5" },
  medium: { container: "w-14 h-7", knob: "w-6 h-6 left-1 top-1", translate: "translate-x-7" },
  large: { container: "w-16 h-8", knob: "w-7 h-7 left-1 top-1", translate: "translate-x-8" },
};

const CustomSwitch: React.FC<CustomSwitchProps> = ({
  checked,
  onChange,
  size = "medium",
  bgColor = "bg-gray-700",
  checkedBgColor = "bg-green-500",
  knobColor = "bg-gray-400",
  checkedKnobColor = "bg-white",
}) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only peer" />
      <div className={`rounded-full transition-all duration-300 ${sizeClasses[size].container} ${checked ? checkedBgColor : bgColor}`}></div>
      <div
        className={`absolute rounded-full transition-all duration-300 transform ${
          checked ? `${sizeClasses[size].translate} ${checkedKnobColor}` : `${knobColor}`
        } ${sizeClasses[size].knob}`}
      ></div>
    </label>
  );
};

export default CustomSwitch;
