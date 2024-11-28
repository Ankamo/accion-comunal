// src/app/layout.tsx

import React from 'react';
import '../styles/navbar.css'; // Importa los estilos globales
import Header from '../components/Header'; // Importa el Header
import Nav from '../components/Nav'; // Importa el Nav
import Footer from '../components/Footer'; // Importa el Footer

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="es">
            <body>
                <Header /> {/* Componente Header */}
                <Nav /> {/* Componente Nav */}
                <main>{children}</main>
                <Footer /> {/* Componente Footer */}
            </body>
        </html>
    );
};

export default Layout;
