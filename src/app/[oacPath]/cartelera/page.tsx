// src/app/asociación-de-junta-de-acción-comunal/cartelera-comunal/page.tsx

'use client'

import React from 'react';
import { usePathname } from 'next/navigation';

const CarteleraComunal = () => {
    const pathname = usePathname(); // Captura la ruta actual
    const segments = pathname.split('/'); // Divide la ruta en segmentos
    const oacName = segments[1]; // Captura el nombre de la OAC desde el primer segmento de la URL

    // Función para formatear el nombre de la OAC
    const formatOACName = (name: string) => {
        const decodedName = decodeURIComponent(name); // Decodifica la OAC
        return decodedName.replace(/-/g, ' '); // Reemplaza guiones con espacios
    };

    const oacFormattedName = formatOACName(oacName); // Formatea el nombre

    return (
        <div>
            <h1>Cartelera Comunal</h1>
            <h2>{oacFormattedName}</h2> {/* Muestra el nombre de la OAC formateado */}
            <p>Aquí se mostrará la información de la cartelera comunal.</p>
        </div>
    );
};

export default CarteleraComunal;
