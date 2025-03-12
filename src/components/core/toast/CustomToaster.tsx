import { Toaster } from "react-hot-toast";
import { useAuth } from "../../../context/AuthContext";

const CustomToaster = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return null; // No Toaster after connexion

  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        success: {
          style: { background: "#2E5930", color: "#D1D5DB", border: "1px solid #6b7280", fontSize: "1rem" },
          iconTheme: { primary: "#234027", secondary: "#81C784", size: 28 },
        },
        error: {
          style: { background: "#6A2C2C", color: "#D1D5DB", border: "1px solid #6b7280", fontSize: "1rem" },
          iconTheme: { primary: "#511F1F", secondary: "#E57373", size: 28 },
        },
        style: { background: "#263238", color: "#D1D5DB", border: "1px solid #6b7280", padding: "10px", fontSize: "1rem" },
      }}
    />
  );
};

export default CustomToaster;
