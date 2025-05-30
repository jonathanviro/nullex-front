"use client";

import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { User, Trash2, Mail } from "lucide-react";
import type { User as UserType } from "../types";

interface UserCardProps {
  user: UserType;
  onDelete: (id: string) => void;
}

export function UserCard({ user, onDelete }: UserCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-medium text-foreground">{user.name}</h3>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Mail className="h-3 w-3" />
              <span>{user.email}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              user.status === "active"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {user.status}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(user.id)}
            className="h-8 w-8 text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="mt-3 flex justify-between text-sm text-muted-foreground">
        <span>Rol: {user.role}</span>
        <span>Creado: {user.createdAt}</span>
      </div>
    </Card>
  );
}
