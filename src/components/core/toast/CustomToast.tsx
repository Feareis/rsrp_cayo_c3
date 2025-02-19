import { toast } from "react-hot-toast";
import { BrowserWarn } from "../BrowserWarn";
import { XCircle, CircleCheck, AlertTriangle } from "lucide-react";

type ToastType = "error" | "success" | "warning";

const toastIcons: Record<ToastType, JSX.Element> = {
  error: <XCircle className="w-6 h-6" />,
  success: <CircleCheck className="w-6 h-6" />,
  warning: <AlertTriangle className="w-6 h-6" />,
};

const toastColors: Record<ToastType, "red" | "green" | "yellow"> = {
  error: "red",
  success: "green",
  warning: "yellow",
};

export const showToast = (type: ToastType, message: string, details?: string[]) => {
  toast.custom((t) => (
    <div
      className={`ml-64 transition-all ${
        t.visible ? "animate-enter" : "animate-leave"
      }`}
    >
      <BrowserWarn color={toastColors[type]} icon={toastIcons[type]} message={message} details={details} />
    </div>
  ), { duration: 1000 });
};
