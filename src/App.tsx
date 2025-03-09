/*
 * rsrp-ecp, Private Code
 * Copyright (c) 2024-2025 Fea
 * SPDX-License-Identifier: Proprietary
*/

import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";


// Import Core Pages
import Layout from "./components/Layout";
import Profile from "./pages/Profile";
import OnConstruction from "./pages/core/OnConstruction";
import NotFound from "./pages/core/NotFound";

// Import Auth Pages
import Login from "./pages/auth/Login";

// Import Primary Pages
import Dashboard from "./pages/Dashboard";
import Statistics from "./pages/Statistics";
import Calculator from "./pages/Calculator";
import ExportSale from "./pages/ExportSale";
import ClientsSale from "./pages/ClientsSale";
import Pricing from "./pages/Pricing";

// Import Admin Pages
import SalesLogs from "./pages/admin/SalesLogs";
import QuotaManagement from "./pages/admin/QuotaManagement";
import UserManagement from "./pages/admin/UserManagement";
import SiteAccess from "./pages/admin/SiteAccess";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminRebooting from "./pages/admin/AdminRebooting";

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
  useEffect(() => {
    function applyZoom() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      let zoom = 1; // Zoom par défaut

      if (width === 1920 && height === 1080) zoom = 0.8; // 80%
      if (width === 2560 && height === 1440) zoom = 1;   // 100%
      if (width === 3840 && height === 2160) zoom = 1.2; // 120%

      document.body.style.zoom = zoom;
    }

    applyZoom();
  }, []);


  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<ProtectedRoute element={<Dashboard />} />} />
            <Route path="/statistics" element={<ProtectedRoute element={<Statistics />} />} />
            <Route path="/calculator" element={<ProtectedRoute element={<Calculator />} />} />
            <Route path="/sale/export" element={<ProtectedRoute element={<ExportSale />} />} />
            <Route path="/sale/client" element={<ProtectedRoute element={<ClientsSale />} />} />
            <Route path="/pricing" element={<ProtectedRoute element={<Pricing />} />} />

            {/* Admin Pages */}
            <Route path="/admin/sales-logs" element={<ProtectedRoute element={<SalesLogs />} />} />
            <Route path="/admin/quota-management" element={<ProtectedRoute element={<QuotaManagement />} />} />
            <Route path="/admin/user-management" element={<ProtectedRoute element={<UserManagement />} />} />
            <Route path="/admin/site-access" element={<ProtectedRoute element={<SiteAccess />} />} />
            <Route path="/admin/analytics" element={<ProtectedRoute element={<AdminAnalytics />} />} />
            <Route path="/admin/reboot-accounting" element={<ProtectedRoute element={<AdminRebooting />} />} />

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
