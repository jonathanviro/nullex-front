"use client";

import type React from "react";

import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import type { LoginInput } from "../types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

const initialState: LoginInput = {
  email: "",
  password: "",
};

export const LoginForm = () => {
  const { login } = useAuth();
  const [form, setForm] = useState<LoginInput>(initialState);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(form);
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message || "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full">
      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
          Correo electrónico
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="tu@ejemplo.com"
            value={form.email}
            onChange={handleChange}
            className="pl-12 h-12 border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-lg"
            required
          />
        </div>
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-gray-700">
          Contraseña
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            className="pl-12 pr-12 h-12 border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-lg"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Remember Me and Forgot Password */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={(value) => setRememberMe(value === true)}
            className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
          />
          <Label
            htmlFor="remember"
            className="text-sm text-gray-600 cursor-pointer"
          >
            Recordarme
          </Label>
        </div>
        <a
          href="#"
          className="text-sm text-orange-600 hover:text-orange-500 transition-colors"
        >
          ¿Olvidaste tu contraseña?
        </a>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
        disabled={loading}
      >
        {loading ? "Iniciando sesión..." : "Iniciar sesión"}
      </Button>

      {/* Create Account Link */}
      <div className="text-center pt-4">
        <p className="text-sm text-gray-600">
          ¿No tienes cuenta?{" "}
          <a
            href="#"
            className="text-orange-600 hover:text-orange-500 font-medium transition-colors"
          >
            Crear una cuenta
          </a>
        </p>
      </div>
    </form>
  );
};
