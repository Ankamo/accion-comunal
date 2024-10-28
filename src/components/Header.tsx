// src/components/Header.tsx

import React from 'react';

const Header = () => {
    return (
        <header style={{
            backgroundColor: '#1a1a1a', /* Fondo oscuro */
            padding: '20px', /* Espaciado interno */
            textAlign: 'center', /* Centrar el texto */
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.7)', /* Sombra más pronunciada */
            borderRadius: '10px', /* Bordes redondeados */
            marginBottom: '20px', /* Espacio inferior */
            transition: 'background-color 0.3s', /* Transición suave para el fondo */
        }}>
            <h1 style={{
                color: '#fff', /* Color del título en gris claro */
                margin: '0', /* Sin margen */
                fontSize: '1.7rem', /* Tamaño de fuente del título */
                fontWeight: 'bold', /* Negrita para mayor énfasis */
            }}>
                Acción Comunal Colombia
            </h1>
            <h6 style={{
                color: '#fff', /* Color del subtítulo en gris más claro */
                margin: '5px 0 0', /* Espaciado para el subtítulo */
                fontSize: '1rem', /* Tamaño de fuente del subtítulo */
                opacity: '0.8', /* Opacidad sutil */
                letterSpacing: '1px', /* Espaciado entre letras */
            }}>
                accioncomunal.gov.co
            </h6>
        </header>
    );
};

export default Header;
