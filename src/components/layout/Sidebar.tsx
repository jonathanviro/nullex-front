"use client";

import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Map,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

const dashboardSubItems = [
  {
    title: "Página 1",
    id: "pagina-1",
    path: "/dashboard/pagina-1",
  },
  {
    title: "Página 2",
    id: "pagina-2",
    path: "/dashboard/pagina-2",
  },
];

const featureItems = [
  {
    title: "Usuarios",
    id: "users",
    path: "/users",
    icon: Users,
  },
  {
    title: "Analytics",
    id: "analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Mapa de Rutas",
    id: "route-map",
    path: "/route-map",
    icon: Map,
  },
];

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isMobile = window.innerWidth < 768;

  const currentPath = location.pathname;
  const currentPageId = currentPath.split("/").pop() || "";
  const isDashboardActive = currentPath.startsWith("/dashboard");

  // Auto-expandir dashboard si estamos en una página del dashboard
  useState(() => {
    if (isDashboardActive) {
      setIsDashboardOpen(true);
    }
  });

  const toggleDashboard = () => {
    setIsDashboardOpen(!isDashboardOpen);
  };

  return (
    <div
      ref={sidebarRef}
      className={`fixed left-0 top-0 z-40 h-screen border-r bg-background transition-all duration-300 ${
        isExpanded ? "w-64" : "w-16"
      }`}
      onMouseEnter={() => !isMobile && setIsExpanded(true)}
      onMouseLeave={() => !isMobile && setIsExpanded(false)}
    >
      {/* Header */}
      <div className="h-16 flex items-center px-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <div
            className={`ml-3 transition-all duration-300 ${
              isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"
            } overflow-hidden`}
          >
            <span className="font-bold text-xl text-foreground whitespace-nowrap">
              Modernize
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="px-2">
        {/* MAIN Section */}
        <div className="mb-6 relative">
          <div
            className={`absolute top-0 left-0 px-3 transition-all duration-300 ${
              isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              MAIN
            </h3>
          </div>

          <div className="pt-6">
            {/* Dashboard Principal */}
            <div>
              <button
                onClick={toggleDashboard}
                className={`flex items-center w-full h-10 rounded-md px-3 text-sm transition-colors relative ${
                  isDashboardActive
                    ? "bg-orange-50 text-orange-500 hover:bg-orange-100"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
                title={!isExpanded ? "Dashboard" : undefined}
              >
                <LayoutDashboard className="h-5 w-5 flex-shrink-0" />
                <div
                  className={`ml-3 transition-all duration-300 ${
                    isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"
                  } overflow-hidden`}
                >
                  <span className="whitespace-nowrap">Dashboard</span>
                </div>
                {isExpanded && (
                  <div className="ml-auto">
                    {isDashboardOpen ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </div>
                )}
              </button>

              {/* Subopciones del Dashboard */}
              {isDashboardOpen && isExpanded && (
                <div className="ml-6 mt-1 space-y-1">
                  {dashboardSubItems.map((item) => (
                    <Link
                      key={item.id}
                      to={item.path}
                      className={`flex items-center h-9 rounded-md px-3 text-sm transition-colors ${
                        currentPageId === item.id
                          ? "bg-orange-50 text-orange-500 hover:bg-orange-100"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <span className="text-muted-foreground flex-shrink-0">
                        -
                      </span>
                      <span className="ml-3 whitespace-nowrap">
                        {item.title}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* FEATURES Section */}
        <div className="relative">
          <div
            className={`absolute top-0 left-0 px-3 transition-all duration-300 ${
              isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              FEATURES
            </h3>
          </div>
          <ul className="space-y-1 pt-6">
            {featureItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className={`flex items-center h-10 rounded-md px-3 text-sm transition-colors relative ${
                    currentPath === item.path
                      ? "bg-orange-50 text-orange-500 hover:bg-orange-100"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                  title={!isExpanded ? item.title : undefined}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <div
                    className={`ml-3 transition-all duration-300 ${
                      isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"
                    } overflow-hidden`}
                  >
                    <span className="whitespace-nowrap">{item.title}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
