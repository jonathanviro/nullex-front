"use client";

import type React from "react";
import { useRef } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { RouteImage } from "../types";

interface ImageUploadProps {
  routeImage: RouteImage;
  onImageChange: (routeImage: RouteImage) => void;
  label: string;
}

export function ImageUpload({
  routeImage,
  onImageChange,
  label,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      onImageChange({
        ...routeImage,
        file,
        preview,
        uploaded: true,
      });
    }
  };

  const handleRemoveImage = () => {
    if (routeImage.preview && routeImage.preview.startsWith("blob:")) {
      URL.revokeObjectURL(routeImage.preview);
    }
    onImageChange({
      ...routeImage,
      file: null,
      preview: null,
      uploaded: false,
    });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Determinar qué imagen mostrar: preview local o URL del servidor
  const imageToShow = routeImage.preview || routeImage.url;

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
        {imageToShow ? (
          <div className="relative">
            <img
              src={imageToShow || "/placeholder.svg"}
              alt={label}
              className="w-full h-32 object-cover rounded"
              onError={(e) => {
                console.error(`Error cargando imagen: ${imageToShow}`);
                // No usamos placeholder.svg aquí para evitar llamadas innecesarias
                // En su lugar, mostramos un div con estilo similar
                e.currentTarget.style.display = "none";
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  const errorDiv = document.createElement("div");
                  errorDiv.className =
                    "w-full h-32 bg-gray-200 rounded flex items-center justify-center";
                  errorDiv.innerHTML =
                    '<span class="text-gray-500">Error al cargar imagen</span>';
                  parent.appendChild(errorDiv);
                }
              }}
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-1 right-1 h-6 w-6"
              onClick={handleRemoveImage}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <div className="py-8">
            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500 mb-2">Subir imagen</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleUploadClick}
            >
              Seleccionar archivo
            </Button>
          </div>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
