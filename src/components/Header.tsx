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
                        <Link href="/convocatorias-proyectos">Convocatorias de Proyectos</Link>
                    </li>
                    <li>
                        <Link href="/normatividad-comunal">Normatividad Comunal</Link>
                    </li>
                    <li>
                        <Link href="/ingresar">Ingresar</Link>
                        <ul className="sub-menu">
                            <li>
                                <Link href="/registrar-confederacion">Registrar Confederación</Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link href="/asistente-virtual">Asistente Virtual</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
