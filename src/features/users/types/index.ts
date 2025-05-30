export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  createdAt: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  role: string;
}
