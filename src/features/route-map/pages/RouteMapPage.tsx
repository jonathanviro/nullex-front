"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/components/ui/error-message";
import { Plus, Map } from "lucide-react";
import { RouteTable } from "../components/RouteTable";
import { RouteModal } from "../components/RouteModal";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { useRouteMap } from "../hooks/useRouteMap";
import type { Route, CreateRouteData } from "../types";

export function RouteMapPage() {
  const {
    routes,
    loading,
    error,
    loadRoutes,
    createRoute,
    updateRoute,
    deleteRoute,
  } = useRouteMap();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    routeId: string;
  }>({
    isOpen: false,
    routeId: "",
  });

  const handleAddNew = () => {
    setModalMode("create");
    setSelectedRoute(null);
    setIsModalOpen(true);
  };

  const handleEdit = (route: Route) => {
    setModalMode("edit");
    setSelectedRoute(route);
    setIsModalOpen(true);
  };

  const handleDelete = (routeId: string) => {
    setDeleteConfirm({ isOpen: true, routeId });
  };

  const confirmDelete = async () => {
    try {
      await deleteRoute(deleteConfirm.routeId);
      setDeleteConfirm({ isOpen: false, routeId: "" });
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const handleSave = async (routeData: CreateRouteData) => {
    if (modalMode === "create") {
      await createRoute(routeData);
    } else if (selectedRoute) {
      await updateRoute({ ...routeData, id: selectedRoute.id });
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Cargando rutas...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <Map className="h-8 w-8" />
                Mapa de Rutas
              </h1>
              <p className="text-muted-foreground">
                Gestiona las rutas y sus imágenes asociadas
              </p>
            </div>
          </div>
          <ErrorMessage message={error} onRetry={loadRoutes} />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Map className="h-8 w-8" />
              Mapa de Rutas
            </h1>
            <p className="text-muted-foreground">
              Gestiona las rutas y sus imágenes asociadas
            </p>
          </div>
          <Button
            onClick={handleAddNew}
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            Agregar Nueva Ruta
          </Button>
        </div>

        <RouteTable
          routes={routes}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <RouteModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSave={handleSave}
          route={selectedRoute}
          mode={modalMode}
        />

        <ConfirmationModal
          isOpen={deleteConfirm.isOpen}
          onClose={() => setDeleteConfirm({ isOpen: false, routeId: "" })}
          onConfirm={confirmDelete}
          title="Eliminar Ruta"
          message="¿Está seguro que desea eliminar esta ruta? Esta acción no se puede deshacer."
          confirmText="Eliminar"
          variant="destructive"
        />
      </div>
    </DashboardLayout>
  );
}
