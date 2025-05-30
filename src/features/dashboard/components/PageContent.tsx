import { Card } from "@/components/ui/card";
import { LayoutDashboard, FileText } from "lucide-react";

interface PageContentProps {
  pageId: string;
}

const pageData = {
  "pagina-1": {
    title: "Página 1",
    icon: LayoutDashboard,
    content:
      "Esta es la primera página del dashboard. Aquí puedes agregar cualquier contenido relacionado con la página principal del dashboard, como resúmenes, estadísticas generales y accesos rápidos.",
  },
  "pagina-2": {
    title: "Página 2",
    icon: FileText,
    content:
      "Esta es la segunda página del dashboard. Contiene información adicional, configuraciones del sistema y herramientas de administración avanzadas.",
  },
};

export function PageContent({ pageId }: PageContentProps) {
  const currentPage =
    pageData[pageId as keyof typeof pageData] || pageData["pagina-1"];
  const Icon = currentPage.icon;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Icon className="h-8 w-8" />
          {currentPage.title}
        </h1>
        <p className="text-muted-foreground">
          Contenido dinámico del dashboard
        </p>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">
          Contenido de {currentPage.title}
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {currentPage.content}
        </p>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-2">Estadísticas</h3>
          <div className="text-2xl font-bold text-orange-500">1,234</div>
          <p className="text-sm text-muted-foreground">Total de elementos</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium mb-2">Actividad</h3>
          <div className="text-2xl font-bold text-green-500">+12%</div>
          <p className="text-sm text-muted-foreground">Crecimiento este mes</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium mb-2">Estado del Sistema</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm">Funcionando correctamente</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
