import { useAuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const { user, accessToken, login, logout, loading } = useAuthContext();

  return {
    user,
    accessToken,
    login,
    logout,
    isAuthenticated: !!user,
    loading,
  };
};
