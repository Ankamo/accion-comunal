import "../styles/globals.css"; // Archivo de estilos globales
import { ReactNode } from "react";

export const metadata = {
  title: "Plaza de Mercado - Gestión y Tienda Virtual",
  description: "Sistema de Gestión y Tienda Virtual de la Plaza de Mercado",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
        {/* Header */}
        <header className="bg-blue-600 text-white shadow">
          <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold">
              Plaza de Mercado - Gestión y Tienda Virtual
            </h1>
          </div>
        </header>

        {/* Contenido Principal */}
        <main className="flex-1 container mx-auto p-4">{children}</main>

        {/* Footer */}
        <footer className="bg-gray-800 text-gray-200 py-4">
          <div className="container mx-auto text-center">
            <p>
              &copy; {new Date().getFullYear()} Plaza de Mercado. Todos los
              derechos reservados.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
