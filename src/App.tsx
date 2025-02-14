import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UnderConstruction from "./pages/core/UnderConstruction";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Calculator from "./pages/Calculator";
import ExportSale from "./pages/ExportSale";
import ClientsSale from "./pages/ClientsSale";
import UserManagement from "./pages/admin/UserManagement";
import HelpCenter from "./pages/help-center/HelpCenter";
import Faq from "./pages/help-center/Faq";
import Profile from "./pages/Profile";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Routes principales */}
          <Route index element={<Dashboard />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/sale/export" element={<ExportSale />} />
          <Route path="/sale/client" element={<ClientsSale />} />
          <Route path="/admin/user-management" element={<UserManagement />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/help-center/faq" element={<Faq />} />
          <Route path="/profile" element={<Profile />} />

          {/* Route 404 - Toutes les routes non définies redirigent ici */}
          <Route path="*" element={<UnderConstruction />} />
        </Route>
      </Routes>
    </Router>
  );
}
