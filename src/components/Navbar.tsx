// src/components/Navbar.tsx

'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import '../styles/navbar.css'; // Importa el archivo CSS

const Navbar = () => {
    const pathname = usePathname(); // Captura la ruta actual

    // Captura la OAC actual de la URL
    const segments = pathname.split('/');
    const oacPath = segments[1]; // Esto asume que la OAC es el primer segmento de la URL

    // Define las rutas del navbar según la OAC actual
    const navLinks = [
        { label: 'Inicio', href: `/${oacPath}` }, // Redirige a la página principal de la OAC
        { label: 'Cartelera', href: `/${oacPath}/cartelera` }, // Ruta a Cartelera
        { label: 'Ingresar', href: `/${oacPath}/ingresar` }, // Ruta a Ingresar
        // Agrega más enlaces relevantes según sea necesario
    ];

    return (
        <nav>
            <ul>
                {navLinks.map(({ label, href }) => (
                    <li key={href}>
                        <Link href={href} className={pathname === href ? 'active' : ''}>
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;
