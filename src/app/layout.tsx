// src/app/layout.tsx
import React from 'react';
import '../styles/globals.css'; // Importa los estilos globales
import Header from '../components/Header'; // Cambia a HeaderNavbar
import Footer from '../components/Footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="es">
            <body>
                <Header /> {/* Cambia esto también */}
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
};

export default Layout;
