// src/app/layout.tsx
import React from 'react';
import '../styles/globals.css'; // Importa los estilos globales
import Header from '../components/Header';
import Footer from '../components/Footer';
import Navbar from '@/components/Navbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="es">
            <body>
                <Header />
                <Navbar />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
};

export default Layout;
