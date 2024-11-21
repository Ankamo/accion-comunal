import type { Metadata } from 'next';
import { Outfit } from "next/font/google";
import '../styles/globals.css'; // Importa los estilos globales


const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "App creada",
    description: "Creada por Camilo Vidal",
}
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className={outfit.className}>
                {children}
            </body>
        </html>
    );
}
