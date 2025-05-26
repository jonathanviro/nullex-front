import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";

export const PrivateRoute = ({ children }: { children: ReactElement }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null; // Puedes mostrar un spinner aquí

  return isAuthenticated ? children : <Navigate to="/" />;
};
