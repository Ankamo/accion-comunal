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
                        <Link href="/registrar-junta-comunal">Registrar Junta de Acción Comunal</Link>
                    </li>
                    <li>
                        <Link href="/registrar-junta-vivienda">Registrar Junta de Vivienda Comunal</Link>
                    </li>
                    <li>
                        <Link href="/registrar-asociacion">Registrar Asociación Comunal</Link>
                    </li>
                    <li>
                        <Link href="/registrar-federacion">Registrar Federación Departamental</Link>
                    </li>
                    <li>
                        <Link href="/registrar-confederacion">Registrar Confederación Nacional</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
