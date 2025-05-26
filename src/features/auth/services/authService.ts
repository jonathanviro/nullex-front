import axios from "axios";
import type { LoginInput, AuthData, ApiResponse } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const login = async (credentials: LoginInput): Promise<AuthData> => {
  try {
    const response = await axios.post<ApiResponse<AuthData>>(
      `${API_URL}/auth/login`,
      credentials
    );

    if (!response.data.success) {
      throw new Error(response.data.message || "Error en el inicio de sesión");
    }

    return response.data.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Error inesperado";
    throw new Error(message);
  }
};
