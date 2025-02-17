import { toast } from "react-hot-toast";
import { BrowserWarning } from "../BrowserWarning";
import { XCircle, CheckCircle, AlertTriangle } from "lucide-react";

type ToastType = "error" | "success" | "warning";

const toastIcons: Record<ToastType, JSX.Element> = {
  error: <XCircle className="w-6 h-6" />,
  success: <CheckCircle className="w-6 h-6" />,
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
      className={`w-full max-w-md transition-all ${
        t.visible ? "animate-enter" : "animate-leave"
      }`}
    >
      <BrowserWarning color={toastColors[type]} icon={toastIcons[type]} message={message} details={details} />
    </div>
  ), { duration: 200 });
};
