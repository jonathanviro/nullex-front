import { useState, useEffect } from "react";
import { LoginForm } from "../components/LoginForm";

const benefits = [
  "Mejora tu rendimiento estratégico",
  "Gestiona prioridades fácilmente",
  "Convierte tu estrategia en resultados",
];

export const LoginPage = () => {
  const [currentBenefit, setCurrentBenefit] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBenefit((prev) => (prev + 1) % benefits.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex">
      {/* Left Column - Benefits Carousel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-500 via-orange-600 to-blue-600 p-12 flex-col justify-center items-center relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-blue-500/20"></div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>

        {/* Content */}
        <div className="relative z-10 text-center space-y-8 max-w-md">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
              <span className="text-white font-bold text-2xl">S</span>
            </div>
          </div>

          {/* Animated Benefits */}
          <div className="h-24 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white leading-tight transition-all duration-500 ease-in-out">
              {benefits[currentBenefit]}
            </h1>
          </div>

          {/* Indicators */}
          <div className="flex justify-center space-x-3">
            {benefits.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBenefit(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentBenefit
                    ? "bg-white scale-110"
                    : "bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          {/* Subtitle */}
          <p className="text-white/90 text-lg leading-relaxed">
            Optimiza tu gestión empresarial con SOE, la plataforma que
            transforma tu manera de trabajar.
          </p>
        </div>
      </div>

      {/* Right Column - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="ml-3 text-2xl font-bold text-gray-900">SOE</span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900">
              Iniciar sesión en SOE
            </h1>
            <p className="text-gray-600">Accede a tu cuenta para continuar</p>
          </div>

          {/* Login Form Card */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <LoginForm />
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-sm text-gray-500">
              © 2024 SOE. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
