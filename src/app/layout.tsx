// src/app/layout.tsx

import React from 'react';
import '../styles/globals.css'; // Importa los estilos globales
import Footer from '../components/Footer';
import Header from '../components/Header';
import Nav from '../components/Nav';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="es">
            <body>
                <Header />
                <Nav />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
};

export default Layout;
