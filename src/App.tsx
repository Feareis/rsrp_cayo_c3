/*
 * rsrp-ecp, Private Code
 * Copyright (c) 2024-2025 Fea
 * SPDX-License-Identifier: Proprietary
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Import Core Pages
import Layout from "./components/Layout";
import Profile from "./pages/Profile";
import UnderConstruction from "./pages/core/UnderConstruction";

// Import Primary Pages
import Dashboard from "./pages/Dashboard";
import Calculator from "./pages/Calculator";
import ExportSale from "./pages/ExportSale";
import ClientsSale from "./pages/ClientsSale";

// Import Admin Pages
import UserManagement from "./pages/admin/UserManagement";
import AdminStockProduct from "./pages/admin/stock/AdminStockProduct";
import AdminAnalytics from "./pages/admin/AdminAnalytics";

// Import Help Section Pages
import HelpCenter from "./pages/help-center/HelpCenter";
import Faq from "./pages/help-center/Faq";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Primary Pages */}
          <Route index element={<Dashboard />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/sale/export" element={<ExportSale />} />
          <Route path="/sale/client" element={<ClientsSale />} />

          {/* Admin Pages */}
          <Route path="/admin/user-management" element={<UserManagement />} />
          <Route path="/admin/stock/product" element={<AdminStockProduct />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />

          {/* Help Section Pages */}
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/help-center/faq" element={<Faq />} />

          {/* Core Pages */}
          <Route path="/profile" element={<Profile />} />

          {/* Pages 404 - All undefined routes are redirected here */}
          <Route path="*" element={<UnderConstruction />} />
        </Route>
      </Routes>
    </Router>
  );
}
