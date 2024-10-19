"use client";

import { useState } from 'react';
import Link from 'next/link';

// Definimos los valores posibles para el menú
type MenuKey = 'afiliados' | 'servicios' | 'quienesSomos' | 'ingresar';

const Nav = () => {
    // Estado para controlar el despliegue de los submenús
    const [openMenu, setOpenMenu] = useState({
        afiliados: false,
        servicios: false,
        quienesSomos: false,
        ingresar: false,
    });

    // Función para alternar el submenú
    const toggleMenu = (menu: MenuKey) => {
        setOpenMenu((prev) => ({
            ...prev,
            [menu]: !prev[menu], // Alternar el valor del submenú especificado
        }));
    };

    return (
        <nav className="bg-[#131212] text-white p-4">
            <ul className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6 text-center">
                <li>
                    <Link href="/cartelera">
                        Cartelera Comunal
                    </Link>
                </li>
                <li>
                    <Link href="/eventos-y-actividades">
                        Eventos y Actividades
                    </Link>
                </li>
                <li>
                    <Link href="/reuniones-y-asambleas">
                        Reuniones y Asambleas
                    </Link>
                </li>

                {/* Submenú Afiliados */}
                <li className="relative">
                    <button
                        onClick={() => toggleMenu('afiliados')}
                        className="hover:underline"
                    >
                        Afiliados
                    </button>
                    {openMenu.afiliados && (
                        <ul className="absolute left-0 mt-2 bg-gray-700 text-white p-2 space-y-2 z-10">
                            <li>
                                <Link href="/afiliados/directivos">Directivos</Link>
                            </li>
                            <li>
                                <Link href="/afiliados/dignatarios">Dignatarios</Link>
                            </li>
                            <li>
                                <Link href="/afiliados/afiliados">Afiliados</Link>
                            </li>
                        </ul>
                    )}
                </li>

                <li>
                    <Link href="/proyectos">
                        Proyectos Comunales
                    </Link>
                </li>

                {/* Submenú Servicios Comunales */}
                <li className="relative">
                    <button
                        onClick={() => toggleMenu('servicios')}
                        className="hover:underline"
                    >
                        Servicios Comunales
                    </button>
                    {openMenu.servicios && (
                        <ul className="absolute left-0 mt-2 bg-gray-700 text-white p-2 space-y-2 z-10">
                            <li>
                                <Link href="/servicios/certificados-afiliacion">
                                    Certificados de Afiliación
                                </Link>
                            </li>
                        </ul>
                    )}
                </li>

                {/* Submenú Quiénes Somos */}
                <li className="relative">
                    <button
                        onClick={() => toggleMenu('quienesSomos')}
                        className="hover:underline"
                    >
                        Quiénes Somos
                    </button>
                    {openMenu.quienesSomos && (
                        <ul className="absolute left-0 mt-2 bg-gray-700 text-white p-2 space-y-2 z-10">
                            <li>
                                <Link href="/quienes-somos/ubicacion">Ubicación</Link>
                            </li>
                            <li>
                                <Link href="/quienes-somos/contactos">Contactos</Link>
                            </li>
                        </ul>
                    )}
                </li>

                {/* Submenú Ingresar */}
                <li className="relative">
                    <button
                        onClick={() => toggleMenu('ingresar')}
                        className="hover:underline"
                    >
                        Ingresar
                    </button>
                    {openMenu.ingresar && (
                        <ul className="absolute left-0 mt-2 bg-gray-700 text-white p-2 space-y-2 z-10">
                            <li>
                                <Link href="/ingresar/afiliarme">Quiero Afiliarme</Link>
                            </li>
                        </ul>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
