import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import { UsersPage } from "@/features/users/pages/UsersPage";
import { AnalyticsPage } from "@/features/analytics/pages/AnalyticsPage";
import { RouteMapPage } from "@/features/route-map/pages/RouteMapPage";
import { PrivateRoute } from "./PrivateRoute";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={<Navigate to="/dashboard/pagina-1" replace />}
      />

      {/* Rutas privadas - Dashboard */}
      <Route
        path="/dashboard/:pageId"
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />

      {/* Rutas privadas - Features específicas */}
      <Route
        path="/users"
        element={
          <PrivateRoute>
            <UsersPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/analytics"
        element={
          <PrivateRoute>
            <AnalyticsPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/route-map"
        element={
          <PrivateRoute>
            <RouteMapPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
