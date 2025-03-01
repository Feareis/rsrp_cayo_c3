/*
 * rsrp-ecp, Private Code
 * Copyright (c) 2024-2025 Fea
 * SPDX-License-Identifier: Proprietary
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Import Core Pages
import Layout from "./components/Layout";
import Profile from "./pages/Profile";
import NotFound from "./pages/core/NotFound";

// Import Auth Pages
import Login from "./pages/auth/Login";

// Import Primary Pages
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Statistics from "./pages/Statistics";
import Calculator from "./pages/Calculator";
import ExportSale from "./pages/ExportSale";
import ClientsSale from "./pages/ClientsSale";

// Import Admin Pages
import UserManagement from "./pages/admin/UserManagement";
import AdminStockProduct from "./pages/admin/stock/AdminStockProduct";
import AdminAnalytics from "./pages/admin/AdminAnalytics";

// Import Help Section Pages
import HelpCenter from "./pages/help-center/HelpCenter";
import Guide from "./pages/help-center/Guide";
import Faq from "./pages/help-center/Faq";

// Protected Route Component
function ProtectedRoute({ element }: { element: JSX.Element }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" replace />;
}

export default function AppRouter() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<ProtectedRoute element={<Dashboard />} />} />
            <Route path="/admin-dashboard" element={<ProtectedRoute element={<AdminDashboard />} />} />
            <Route path="/statistics" element={<ProtectedRoute element={<Statistics />} />} />
            <Route path="/calculator" element={<ProtectedRoute element={<Calculator />} />} />
            <Route path="/sale/export" element={<ProtectedRoute element={<ExportSale />} />} />
            <Route path="/sale/client" element={<ProtectedRoute element={<ClientsSale />} />} />

            {/* Admin Pages */}
            <Route path="/admin/user-management" element={<ProtectedRoute element={<UserManagement />} />} />
            <Route path="/admin/stock/product" element={<ProtectedRoute element={<AdminStockProduct />} />} />
            <Route path="/admin/analytics" element={<ProtectedRoute element={<AdminAnalytics />} />} />

            {/* Help Section Pages */}
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/help-center/guide" element={<Guide />} />
            <Route path="/help-center/faq" element={<Faq />} />

            {/* Profile Page */}
            <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />

            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}
