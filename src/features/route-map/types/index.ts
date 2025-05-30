export interface RouteImage {
  id: string;
  file: File | null;
  preview: string | null;
  uploaded: boolean;
  url?: string | null;
}

export interface Route {
  id: string;
  description: string;
  route1: RouteImage;
  route2: RouteImage;
  route3: RouteImage;
  route4: RouteImage;
  createdAt: string;
  updatedAt: string;
}

// Tipos para la API (estructura real de tu API)
export interface ApiRoute {
  id: string;
  description: string;
  imgRoute1: string | null;
  imgRoute2: string | null;
  imgRoute3: string | null;
  imgRoute4: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRouteData {
  description: string;
  route1: RouteImage;
  route2: RouteImage;
  route3: RouteImage;
  route4: RouteImage;
}

export interface UpdateRouteData extends CreateRouteData {
  id: string;
}

export interface CreateRouteApiData {
  description: string;
  imgRoute1?: File;
  imgRoute2?: File;
  imgRoute3?: File;
  imgRoute4?: File;
}

export interface UpdateRouteApiData extends CreateRouteApiData {
  id: string;
}
