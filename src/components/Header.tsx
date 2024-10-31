// src/components/Header.tsx
import React from 'react';
import Link from 'next/link'; // Asegúrate de importar Link si estás usando Next.js

const Header: React.FC = () => {
    return (
        <header>
            <h1>Acción Comunal</h1>
            <nav>
                <ul>
                    <li>
                        <Link href="/cartelera-comunal">Cartelera Comunal</Link>
                    </li>
                    <li>
                        <Link href="/eventos-y-actividades">Eventos y Actividades</Link>
                    </li>
                    <li>
                        <Link href="/reuniones-y-asambleas">Reuniones y Asambleas</Link>
                    </li>
                    <li>
                        <Link href="/afiliados">Afiliados</Link>
                        <ul className="sub-menu">
                            <li>
                                <Link href="/junta-directiva">Junta Directiva</Link>
                            </li>
                            <li>
                                <Link href="/dignatarios">Dignatarios</Link>
                            </li>
                            <li>
                                <Link href="/afiliados">Afiliados</Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link href="/proyectos-comunales">Proyectos Comunales</Link>
                    </li>
                    <li>
                        <Link href="/servicios-comunales">Servicios Comunales</Link>
                    </li>
                    <li>
                        <Link href="/quienes-somos">¿Quiénes Somos?</Link>
                    </li>
                    <li>
                        <Link href="/ingresar">Ingresar</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
