"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorMessage({
  message,
  onRetry,
  className = "",
}: ErrorMessageProps) {
  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-center justify-center text-center space-y-4 flex-col">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error</h3>
          <p className="text-gray-600 mb-4">{message}</p>
          {onRetry && (
            <Button
              onClick={onRetry}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Reintentar
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
