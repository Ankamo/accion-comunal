// src/components/Header.tsx

import React from 'react';

const Header = () => {
    return (
        <header>
            <h1>Acción Comunal Colombia</h1>
            <h6>accioncomunal.gov.co</h6>
            <nav>
                <ul>
                    <li><a href="/">Inicio</a></li>
                    <li><a href="/registro">Registro</a></li>
                    {/* Agrega más enlaces si es necesario */}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
