import Sidebar from "./Sidebar/Sidebar";
import Header from "./header/Header";
import MainContent from "./MainContent";
import { Toaster } from "react-hot-toast";

/**
 * Layout component defining the main structure of the application.
 */
export default function Layout() {
  return (
    <div className="flex h-screen min-h-screen bg-[#37474f] overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main container */}
      <div className="flex flex-col flex-1 h-full min-h-screen bg-[#37474f] mx-auto relative">
        <Header />

        {/* Toast notifications (centered at the top) */}
        <div className="absolute w-full top-0 left-1/2 transform -translate-x-1/2 z-50">
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
        </div>

        {/* Main content */}
        <MainContent className="w-full" />
      </div>
    </div>
  );
}
