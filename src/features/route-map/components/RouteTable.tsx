"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Edit, Trash2, Check, X } from "lucide-react"
import type { Route } from "../types"

interface RouteTableProps {
  routes: Route[]
  onEdit: (route: Route) => void
  onDelete: (id: string) => void
}

export function RouteTable({ routes, onEdit, onDelete }: RouteTableProps) {
  const getRouteIcon = (uploaded: boolean) => {
    return (
      <div className="flex items-center justify-center">
        {uploaded ? (
          <Check className="h-6 w-6 text-green-600 stroke-[3]" />
        ) : (
          <X className="h-6 w-6 text-red-600 stroke-[3]" />
        )}
      </div>
    )
  }

  return (
    <Card className="p-0">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 font-medium">Descripción de Ruta</th>
              <th className="text-center p-4 font-medium">Ruta 1</th>
              <th className="text-center p-4 font-medium">Ruta 2</th>
              <th className="text-center p-4 font-medium">Ruta 3</th>
              <th className="text-center p-4 font-medium">Ruta 4</th>
              <th className="text-center p-4 font-medium">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((route) => (
              <tr key={route.id} className="border-t hover:bg-muted/25">
                <td className="p-4">
                  <div className="font-medium text-foreground">{route.description}</div>
                  <div className="text-sm text-muted-foreground">Actualizado: {route.updatedAt}</div>
                </td>
                <td className="p-4 text-center">{getRouteIcon(route.route1.uploaded)}</td>
                <td className="p-4 text-center">{getRouteIcon(route.route2.uploaded)}</td>
                <td className="p-4 text-center">{getRouteIcon(route.route3.uploaded)}</td>
                <td className="p-4 text-center">{getRouteIcon(route.route4.uploaded)}</td>
                <td className="p-4">
                  <div className="flex justify-center space-x-2">
                    <Button variant="outline" size="icon" onClick={() => onEdit(route)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onDelete(route.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {routes.length === 0 && (
        <div className="text-center py-12 px-4">
          <p className="text-muted-foreground">No hay rutas registradas</p>
        </div>
      )}
    </Card>
  )
}
