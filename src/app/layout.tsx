// src/app/layout.tsx

import React from 'react';
import Header from '../components/Header'; // Asegúrate de que la ruta sea correcta
import Footer from '../components/Footer'; // Asegúrate de que la ruta sea correcta
import '../styles/globals.css'; // Importa los estilos globales

export const metadata = {
    title: 'Registro de Juntas de Acción Comunal',
    description: 'Formulario para registrar juntas de acción comunal',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="es-CO">
            <head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
            </head>
            <body>
                <Header /> {/* Renderiza el componente Header */}
                <main>{children}</main>
                <Footer /> {/* Renderiza el componente Footer */}
            </body>
        </html>
    );
};

export default RootLayout;
