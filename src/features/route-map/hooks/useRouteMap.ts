"use client";

import { useState, useEffect } from "react";
import { routeService } from "../services/routeService";
import type { Route, CreateRouteData, UpdateRouteData } from "../types";

export function useRouteMap() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRoutes();
  }, []);

  const loadRoutes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await routeService.getRoutes();
      setRoutes(data);
    } catch (err: any) {
      setError(err.message || "Error al cargar las rutas");
      console.error("Error loading routes:", err);
    } finally {
      setLoading(false);
    }
  };

  const createRoute = async (routeData: CreateRouteData) => {
    try {
      setError(null);
      const newRoute = await routeService.createRoute(routeData);
      setRoutes((prev) => [...prev, newRoute]);
      return newRoute;
    } catch (err: any) {
      const errorMessage = err.message || "Error al crear la ruta";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const updateRoute = async (routeData: UpdateRouteData) => {
    try {
      setError(null);

      // Buscar la ruta original para comparar cambios
      const originalRoute = routes.find((r) => r.id === routeData.id);

      if (!originalRoute) {
        throw new Error("Ruta no encontrada");
      }

      console.log("rutaActualizada", routeData);
      // Usar PATCH para actualización parcial (más eficiente)
      const updatedRoute = await routeService.patchRoute(
        originalRoute,
        routeData
      );

      setRoutes((prev) =>
        prev.map((route) =>
          route.id === updatedRoute.id ? updatedRoute : route
        )
      );
      return updatedRoute;
    } catch (err: any) {
      const errorMessage = err.message || "Error al actualizar la ruta";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const deleteRoute = async (id: string) => {
    try {
      setError(null);
      await routeService.deleteRoute(id);
      setRoutes((prev) => prev.filter((route) => route.id !== id));
    } catch (err: any) {
      const errorMessage = err.message || "Error al eliminar la ruta";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  return {
    routes,
    loading,
    error,
    loadRoutes,
    createRoute,
    updateRoute,
    deleteRoute,
  };
}
