'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import '../styles/navbar.css';

const Navbar: React.FC = () => {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [submenuOpen, setSubmenuOpen] = useState(false);

    // Función para alternar el menú de navegación en móvil
    const toggleMenu = () => {
        setMenuOpen(prevState => !prevState);
    };

    // Función para alternar el submenú
    const toggleSubmenu = () => {
        setSubmenuOpen(prevState => !prevState);
    };

    return (
        <nav className="navbar">
                {/* Menú hamburguesa en dispositivos móviles */}
                <button className="hamburger" onClick={toggleMenu} aria-label="Toggle navigation menu">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>

                {/* Menú de navegación */}
                <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    <li className="nav-item">
                        <Link href="/" className={pathname === '/' ? 'active' : ''}>
                            Inicio
                        </Link>
                    </li>

                    {/* Menú desplegable de Registrar Organización */}
                    <li
                        className={`nav-item dropdown ${submenuOpen ? 'open' : ''}`}
                        onClick={toggleSubmenu} // Toggle al hacer clic en móvil
                        onMouseEnter={() => setSubmenuOpen(true)} // Mostrar submenú al pasar el ratón (escritorio)
                        onMouseLeave={() => setSubmenuOpen(false)} // Ocultar submenú al quitar el ratón (escritorio)
                    >
                        <Link href="" className="dropdown-btn">
                            Registrar Organización
                        </Link>
                        <ul className={`dropdown-menu ${submenuOpen ? 'open' : ''}`}>
                            <li>
                                <Link href="/registrar-organizacion/registrar-confederacion" className={pathname === '/registrar-confederacion' ? 'active' : ''}>
                                    Confederacion
                                </Link>
                            </li>
                            <li>
                                <Link href="/registrar-organizacion/registrar-federacion" className={pathname === '/registrar-federacion' ? 'active' : ''}>
                                    Federacion
                                </Link>
                            </li>
                            <li>
                                <Link href="/registrar-organizacion/registrar-asociacion" className={pathname === '/registrar-asociacion' ? 'active' : ''}>
                                    Asociacion
                                </Link>
                            </li>
                            <li>
                                <Link href="/registrar-organizacion/registrar-jac" className={pathname === '/registrar-jac' ? 'active' : ''}>
                                    Junta de Acción Comunal
                                </Link>
                            </li>
                            <li>
                                <Link href="/registrar-organizacion/registrar-jvc" className={pathname === '/registrar-jvc' ? 'active' : ''}>
                                    Junta de Vivienda Comunal
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li className="nav-item">
                        <Link href="/consultar-organizacion" className={pathname === '/consultar-organizacion' ? 'active' : ''}>
                            Consultar Organización
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/asistente-virtual" className={pathname === '/asistente-virtual' ? 'active' : ''}>
                            Asistente Virtual
                        </Link>
                    </li>
                </ul>
            </nav>
    );
};

export default Navbar;
