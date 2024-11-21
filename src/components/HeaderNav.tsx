// src/components/HeaderNavFooter.tsx

'use client';

import React from 'react';
import Header from './TemplateBasic/Header'; // Asegúrate de que la ruta sea correcta
import Nav from './TemplateBasic/Nav'; // Asegúrate de que la ruta sea correcta

const HeaderNavFooter: React.FC = () => {
    return (
        <div>
            <Header />  {/* Importa y usa el componente Header */}
            <Nav />  {/* Importa y usa el componente Navbar */}
        </div>
    );
};

export default HeaderNavFooter;
