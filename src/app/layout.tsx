// src/app/layout.tsx

import React from 'react';
import '../styles/globals.css'; // Importa los estilos globales

export const metadata = {
    title: 'Registro de Juntas de Acción Comunal',
    description: 'Formulario para registrar juntas de acción comunal',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="es">
            <body>
                <header>
                    <h1>Registro de Juntas de Acción Comunal</h1>
                </header>
                <main>{children}</main>
                <footer>
                    <p>&copy; {new Date().getFullYear()} Acciones Comunales</p>
                </footer>
            </body>
        </html>
    );
};

export default RootLayout;
