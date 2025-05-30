import { apiClient, handleApiError, type ApiResponse } from "@/lib/api";
import type {
  Route,
  CreateRouteData,
  UpdateRouteData,
  ApiRoute,
} from "../types";

// Función para convertir URL relativa a URL absoluta del servidor
const getFullImageUrl = (relativePath: string | null): string | null => {
  if (!relativePath) return null;

  // URL base fija sin /v1 ni /api
  const serverBaseUrl = "http://localhost:4000";

  // Si la ruta ya es absoluta, devolverla tal como está
  if (relativePath.startsWith("http")) {
    return relativePath;
  }

  // Si la ruta empieza con /, quitarla para evitar doble /
  const cleanPath = relativePath.startsWith("/")
    ? relativePath.slice(1)
    : relativePath;

  return `${serverBaseUrl}/${cleanPath}`;
};

// Función para convertir datos de API a formato local
const mapApiRouteToRoute = (apiRoute: ApiRoute): Route => {
  return {
    id: apiRoute.id,
    description: apiRoute.description,
    route1: {
      id: `${apiRoute.id}-1`,
      file: null,
      preview: getFullImageUrl(apiRoute.imgRoute1),
      uploaded: !!apiRoute.imgRoute1,
      url: getFullImageUrl(apiRoute.imgRoute1),
    },
    route2: {
      id: `${apiRoute.id}-2`,
      file: null,
      preview: getFullImageUrl(apiRoute.imgRoute2),
      uploaded: !!apiRoute.imgRoute2,
      url: getFullImageUrl(apiRoute.imgRoute2),
    },
    route3: {
      id: `${apiRoute.id}-3`,
      file: null,
      preview: getFullImageUrl(apiRoute.imgRoute3),
      uploaded: !!apiRoute.imgRoute3,
      url: getFullImageUrl(apiRoute.imgRoute3),
    },
    route4: {
      id: `${apiRoute.id}-4`,
      file: null,
      preview: getFullImageUrl(apiRoute.imgRoute4),
      uploaded: !!apiRoute.imgRoute4,
      url: getFullImageUrl(apiRoute.imgRoute4),
    },
    createdAt: new Date(apiRoute.createdAt).toISOString().split("T")[0],
    updatedAt: new Date(apiRoute.updatedAt).toISOString().split("T")[0],
  };
};

// Función para convertir datos locales a formato de API (FormData completo)
const mapRouteToApiData = (routeData: CreateRouteData): FormData => {
  const formData = new FormData();

  formData.append("description", routeData.description);

  if (routeData.route1.file) {
    formData.append("imgRoute1", routeData.route1.file);
  }
  if (routeData.route2.file) {
    formData.append("imgRoute2", routeData.route2.file);
  }
  if (routeData.route3.file) {
    formData.append("imgRoute3", routeData.route3.file);
  }
  if (routeData.route4.file) {
    formData.append("imgRoute4", routeData.route4.file);
  }

  return formData;
};

// Función para crear FormData solo con los campos modificados (para PATCH)
const mapRouteToPartialApiData = (
  originalRoute: Route,
  updatedData: UpdateRouteData
): FormData => {
  const formData = new FormData();
  const changes: Record<string, any> = {};
  let hasChanges = false;

  // Verificar si la descripción cambió
  if (originalRoute.description !== updatedData.description) {
    formData.append("description", updatedData.description);
    changes.description = updatedData.description;
    hasChanges = true;
  }

  // Verificar cambios en las imágenes
  if (updatedData.route1.file) {
    formData.append("imgRoute1", updatedData.route1.file);
    changes.imgRoute1 = "new-file";
    hasChanges = true;
  }

  if (updatedData.route2.file) {
    formData.append("imgRoute2", updatedData.route2.file);
    changes.imgRoute2 = "new-file";
    hasChanges = true;
  }

  if (updatedData.route3.file) {
    formData.append("imgRoute3", updatedData.route3.file);
    changes.imgRoute3 = "new-file";
    hasChanges = true;
  }

  if (updatedData.route4.file) {
    formData.append("imgRoute4", updatedData.route4.file);
    changes.imgRoute4 = "new-file";
    hasChanges = true;
  }

  // Para debugging
  console.log("Cambios detectados:", changes, "¿Hay cambios?", hasChanges);

  return formData;
};

export const routeService = {
  // Obtener todas las rutas
  async getRoutes(): Promise<Route[]> {
    try {
      const response = await apiClient.get<ApiResponse<ApiRoute[]>>(
        "/route-maps"
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Error al obtener las rutas");
      }

      const routes = response.data.data.map(mapApiRouteToRoute);
      console.log("Rutas mapeadas con URLs completas:", routes);

      return routes;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Crear una nueva ruta
  async createRoute(routeData: CreateRouteData): Promise<Route> {
    try {
      const formData = mapRouteToApiData(routeData);

      const response = await apiClient.post<ApiResponse<ApiRoute>>(
        "/route-maps",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Error al crear la ruta");
      }

      return mapApiRouteToRoute(response.data.data);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Actualizar una ruta existente (reemplazo completo - PUT)
  async updateRoute(routeData: UpdateRouteData): Promise<Route> {
    try {
      const formData = mapRouteToApiData(routeData);

      const response = await apiClient.put<ApiResponse<ApiRoute>>(
        `/route-maps/${routeData.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Error al actualizar la ruta");
      }

      return mapApiRouteToRoute(response.data.data);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Actualizar parcialmente una ruta (PATCH)
  async patchRoute(
    originalRoute: Route,
    updatedData: UpdateRouteData
  ): Promise<Route> {
    try {
      const formData = mapRouteToPartialApiData(originalRoute, updatedData);

      const response = await apiClient.patch<ApiResponse<ApiRoute>>(
        `/route-maps/${updatedData.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Error al actualizar la ruta");
      }

      return mapApiRouteToRoute(response.data.data);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Eliminar una ruta
  async deleteRoute(id: string): Promise<void> {
    try {
      const response = await apiClient.delete<ApiResponse<null>>(
        `/route-maps/${id}`
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Error al eliminar la ruta");
      }
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Obtener una ruta específica
  async getRoute(id: string): Promise<Route | null> {
    try {
      const response = await apiClient.get<ApiResponse<ApiRoute>>(
        `/route-maps/${id}`
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Error al obtener la ruta");
      }

      return mapApiRouteToRoute(response.data.data);
    } catch (error) {
      console.error("Error getting route:", error);
      return null;
    }
  },
};
