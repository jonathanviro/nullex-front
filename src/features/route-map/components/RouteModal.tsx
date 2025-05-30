"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { ImageUpload } from "./ImageUpload";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { SuccessModal } from "@/components/ui/success-modal";
import type { Route, CreateRouteData, RouteImage } from "../types";

interface RouteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (routeData: CreateRouteData) => Promise<void>;
  route?: Route | null;
  mode: "create" | "edit";
}

export function RouteModal({
  isOpen,
  onClose,
  onSave,
  route,
  mode,
}: RouteModalProps) {
  const [description, setDescription] = useState("");
  const [route1, setRoute1] = useState<RouteImage>({
    id: "",
    file: null,
    preview: null,
    uploaded: false,
  });
  const [route2, setRoute2] = useState<RouteImage>({
    id: "",
    file: null,
    preview: null,
    uploaded: false,
  });
  const [route3, setRoute3] = useState<RouteImage>({
    id: "",
    file: null,
    preview: null,
    uploaded: false,
  });
  const [route4, setRoute4] = useState<RouteImage>({
    id: "",
    file: null,
    preview: null,
    uploaded: false,
  });
  const [loading, setLoading] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Reset todos los estados del modal al abrir
      setLoading(false);
      setShowSaveConfirm(false);
      setShowCancelConfirm(false);
      setShowSuccess(false);

      if (mode === "edit" && route) {
        setDescription(route.description);
        setRoute1(route.route1);
        setRoute2(route.route2);
        setRoute3(route.route3);
        setRoute4(route.route4);
      } else {
        resetForm();
      }
    }
  }, [isOpen, mode, route]);

  const resetForm = () => {
    setDescription("");
    setRoute1({ id: "1", file: null, preview: null, uploaded: false });
    setRoute2({ id: "2", file: null, preview: null, uploaded: false });
    setRoute3({ id: "3", file: null, preview: null, uploaded: false });
    setRoute4({ id: "4", file: null, preview: null, uploaded: false });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await onSave({
        description,
        route1,
        route2,
        route3,
        route4,
      });
      setShowSaveConfirm(false);
      setShowSuccess(true);
    } catch (error) {
      console.error("Error al guardar:", error);
      setLoading(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setLoading(false);
    onClose();
  };

  const handleCancel = () => {
    let hasChanges = false;

    if (mode === "create") {
      // En modo crear, verificar si hay algún contenido
      hasChanges = !!(
        description ||
        route1.uploaded ||
        route2.uploaded ||
        route3.uploaded ||
        route4.uploaded
      );
    } else if (mode === "edit" && route) {
      // En modo editar, comparar con los valores originales
      hasChanges = !!(
        description !== route.description ||
        route1.uploaded !== route.route1.uploaded ||
        route2.uploaded !== route.route2.uploaded ||
        route3.uploaded !== route.route3.uploaded ||
        route4.uploaded !== route.route4.uploaded ||
        route1.preview !== route.route1.preview ||
        route2.preview !== route.route2.preview ||
        route3.preview !== route.route3.preview ||
        route4.preview !== route.route4.preview
      );
    }

    if (hasChanges) {
      setShowCancelConfirm(true);
    } else {
      onClose();
    }
  };

  const handleCancelConfirm = () => {
    setShowCancelConfirm(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50" />
        <Card className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto p-0">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold">
              {mode === "create" ? "Agregar Nueva Ruta" : "Editar Ruta"}
            </h2>
            <Button variant="ghost" size="icon" onClick={handleCancel}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="p-4 space-y-4">
            {/* Primera fila - Descripción de la ruta */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Descripción de la Ruta
              </label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ingrese la descripción de la ruta"
                className="text-lg"
              />
            </div>

            {/* Segunda fila - Imágenes de rutas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <ImageUpload
                routeImage={route1}
                onImageChange={setRoute1}
                label="Ruta 1"
              />
              <ImageUpload
                routeImage={route2}
                onImageChange={setRoute2}
                label="Ruta 2"
              />
              <ImageUpload
                routeImage={route3}
                onImageChange={setRoute3}
                label="Ruta 3"
              />
              <ImageUpload
                routeImage={route4}
                onImageChange={setRoute4}
                label="Ruta 4"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 p-4 border-t">
            <Button variant="outline" onClick={handleCancel} disabled={loading}>
              Cancelar
            </Button>
            <Button
              onClick={() => setShowSaveConfirm(true)}
              disabled={!description || loading}
            >
              {loading ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </Card>
      </div>

      <ConfirmationModal
        isOpen={showSaveConfirm}
        onClose={() => setShowSaveConfirm(false)}
        onConfirm={handleSave}
        title="Confirmar Guardado"
        message="¿Seguro que desea guardar los cambios?"
        confirmText="Guardar"
      />

      <ConfirmationModal
        isOpen={showCancelConfirm}
        onClose={() => setShowCancelConfirm(false)}
        onConfirm={handleCancelConfirm}
        title="Confirmar Cancelación"
        message="¿Seguro que desea cancelar el registro? Se perderán todos los cambios."
        confirmText="Sí, cancelar"
        variant="destructive"
      />

      <SuccessModal
        isOpen={showSuccess}
        onClose={handleSuccessClose}
        message="Ruta guardada con éxito"
      />
    </>
  );
}
