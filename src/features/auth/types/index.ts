export interface LoginInput {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  ide: string;
  telephone: string | null;
  firstName: string;
  lastName: string;
  fullName: string;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuthData {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
  error?: string;
  path?: string;
}
