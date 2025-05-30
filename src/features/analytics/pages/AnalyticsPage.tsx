import { DashboardLayout } from "../../../components/layout/DashboardLayout";
import { Card } from "../../../components/ui/card";
import { BarChart3, TrendingUp, Users, DollarSign } from "lucide-react";

export function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <BarChart3 className="h-8 w-8" />
            Analytics
          </h1>
          <p className="text-muted-foreground">
            Métricas y estadísticas del sistema
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Total Usuarios
                </p>
                <p className="text-2xl font-bold">1,234</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Crecimiento
                </p>
                <p className="text-2xl font-bold">+12%</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Ingresos
                </p>
                <p className="text-2xl font-bold">$45,231</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Conversión
                </p>
                <p className="text-2xl font-bold">3.2%</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Gráfico de Rendimiento</h3>
          <div className="h-64 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">
              Aquí iría un gráfico de Chart.js o similar
            </p>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
