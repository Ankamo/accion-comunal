import '../styles/globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Junta de Acción Comunal',
  description: 'Portal oficial de la Junta de Acción Comunal',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-[#0a0403] text-white">
        <main className="min-h-screen p-4">{children}</main>
      </body>
    </html>
  );
}
