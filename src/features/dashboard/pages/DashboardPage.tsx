"use client";

import { useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageContent } from "@/features/dashboard/components/PageContent";

export function DashboardPage() {
  const { pageId = "pagina-1" } = useParams<{ pageId: string }>();

  return (
    <DashboardLayout>
      <PageContent pageId={pageId} />
    </DashboardLayout>
  );
}
