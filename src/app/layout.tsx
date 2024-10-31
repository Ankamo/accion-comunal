'use client'

// src/app/layout.tsx

import React from 'react';
import Header from '../components/Header'; // Asegúrate de que la ruta sea correcta
import Footer from '../components/Footer'; // Asegúrate de que la ruta sea correcta
import '../styles/globals.css'; // Importa los estilos globales
import { usePathname } from 'next/navigation'; // Importa el hook usePathname

const metadata = {
    title: 'Registro de Juntas de Acción Comunal',
    description: 'Formulario para registrar juntas de acción comunal',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname(); // Obtiene la ruta actual

    // Verifica si la ruta actual es '/registrar-organizacion'
    const isRegistrarOrganizacion = pathname === '/';

    return (
        <html lang="es-CO">
            <head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
            </head>
            <body>
                {/* Renderiza el Header y Footer solo si no estás en '/registrar-organizacion' */}
                {!isRegistrarOrganizacion && <Header />}
                <main>{children}</main>
                {!isRegistrarOrganizacion && <Footer />}
            </body>
        </html>
    );
};

export default RootLayout;
