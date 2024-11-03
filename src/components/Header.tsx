// src/components/HeaderNavbar.tsx

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import '../styles/navbar.css'; // Asegúrate de importar el CSS

const HeaderNavbar: React.FC = () => {
    const pathname = usePathname(); // Captura la ruta actual
    const [menuOpen, setMenuOpen] = useState(false); // Estado para el menú hamburguesa

    // Verifica si la ruta actual es la página principal
    if (pathname === '/') return null;

    // Define las rutas del navbar según la OAC actual
    const segments = pathname.split('/');
    const oacPath = segments[1]; // Esto asume que la OAC es el primer segmento de la URL
    const navLinks = [
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

    const toggleMenu = () => {
        setMenuOpen(prevState => !prevState); // Alternar el estado del menú
    };

    return (
        <header>
            <div className="header-container">
                <div className="hamburger" onClick={toggleMenu}>
                    &#9776; {/* Icono de hamburguesa */}
                </div>
                <h1>Acción Comunal</h1>
            </div>
            <nav>
                <ul className={menuOpen ? 'show' : 'hide'}>
                    {navLinks.map(({ label, href }) => (
                        <li key={href}>
                            <Link href={href} className={pathname === href ? 'active' : ''} onClick={() => setMenuOpen(false)}>
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default HeaderNavbar;

