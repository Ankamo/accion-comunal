// src/components/Navbar.tsx

'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import '../styles/navbar.css'; // Importa el archivo CSS

const Navbar = () => {
    const pathname = usePathname(); // Captura la ruta actual

    // Verifica si la ruta actual es la página principal
    if (pathname === '/') return null;

    // Define las rutas del navbar según la OAC actual
    const segments = pathname.split('/');
    const oacPath = segments[1]; // Esto asume que la OAC es el primer segmento de la URL
    const navLinks = [
        { label: 'Inicio', href: `/${oacPath}` },
        { label: 'Cartelera Comunal', href: `/${oacPath}/cartelera` },
        { label: 'Eventos y Actividades', href: `/${oacPath}/eventos-y-actividades` },
        { label: 'Reuniones', href: `/${oacPath}/reuniones` },
        { label: 'Miembros Afiliados', href: `/${oacPath}/miembros-afiliados` },
        { label: 'Proyectos Comunales', href: `/${oacPath}/proyectos-comunales` },
        { label: 'Servicios Comunales', href: `/${oacPath}/servicios-comunales` },
        { label: 'Quiénes Somos', href: `/${oacPath}/quienes-somos` },
        { label: 'Ingresar', href: `/${oacPath}/ingresar` },
        { label: 'Asistente Virtual', href: `/${oacPath}/asistente-virtual` }
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
