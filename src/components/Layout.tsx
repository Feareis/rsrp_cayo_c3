import Sidebar from "./Sidebar/Sidebar";
import Header from "./header/Header";
import MainContent from "./MainContent";
import { Toaster } from "react-hot-toast";

export default function Layout() {
  return (
    <div className="flex h-screen min-h-screen bg-[#37474f]">
      <Sidebar className="h-full" />
      <div className="flex flex-col flex-1 h-full min-h-screen bg-[#37474f] mx-auto relative">
        <Header />

        {/* Toasts centrés en haut du contenu (hors sidebar, dans le header) */}
        <div className="absolute w-full top-0 left-1/2 transform -translate-x-1/2 z-50">
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              success: {
                style: {
                  background: "#2E5930", // Vert assombri mais plus doux
                  color: "#D1D5DB", // Gray-300 pour un contraste plus clair
                  border: "1px solid #6b7280", // Gray-500
                  fontWeight: "bold",
                  fontSize: "1rem", // text-base
                },
                iconTheme: {
                  primary: "#234027", // Vert foncé désaturé
                  secondary: "#81C784", // Vert pastel
                  size: 28, // Taille des icônes augmentée
                },
              },
              error: {
                style: {
                  background: "#6A2C2C", // Rouge assombri mais plus doux
                  color: "#D1D5DB", // Gray-300 pour un contraste plus clair
                  border: "1px solid #6b7280", // Gray-500
                  fontWeight: "bold",
                  fontSize: "1rem", // text-base
                },
                iconTheme: {
                  primary: "#511F1F", // Rouge foncé atténué
                  secondary: "#E57373", // Rouge doux
                  size: 28, // Taille des icônes augmentée
                },
              },
              style: {
                background: "#263238", // Bleu gris foncé
                color: "#D1D5DB", // Gray-300 pour un contraste plus clair
                border: "1px solid #6b7280", // Gray-500
                padding: "10px",
                fontWeight: "bold",
                fontSize: "1rem", // text-base
              },
            }}
          />
        </div>
        <MainContent />
      </div>
    </div>
  );
}
