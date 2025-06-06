import type { User, CreateUserData } from "../types";

// Simulación de API - reemplazar con llamadas reales
export const userService = {
  async getUsers(): Promise<User[]> {
    // Simular delay de API
    await new Promise((resolve) => setTimeout(resolve, 500));

    return [
      {
        id: "1",
        name: "Juan Pérez",
        email: "juan@example.com",
        role: "Admin",
        status: "active",
        createdAt: "2024-01-15",
      },
      {
        id: "2",
        name: "María García",
        email: "maria@example.com",
        role: "User",
        status: "active",
        createdAt: "2024-01-20",
      },
      {
        id: "3",
        name: "Carlos López",
        email: "carlos@example.com",
        role: "User",
        status: "inactive",
        createdAt: "2024-01-25",
      },
    ];
  },

  async createUser(userData: CreateUserData): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      id: Date.now().toString(),
      ...userData,
      status: "active",
      createdAt: new Date().toISOString().split("T")[0],
    };
  },

  async deleteUser(id: string): Promise<void> {
    console.log(id);
    await new Promise((resolve) => setTimeout(resolve, 500));
  },
};
