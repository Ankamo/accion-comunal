// src/components/Footer.tsx

import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            backgroundColor: '#1a1a1a', /* Fondo oscuro */
            padding: '20px', /* Espaciado interno */
            textAlign: 'center', /* Centrar el texto */
            boxShadow: '0 -4px 10px rgba(0, 0, 0, 0.7)', /* Sombra más pronunciada */
            borderRadius: '10px', /* Bordes redondeados */
            marginTop: '20px', /* Espacio superior */
            transition: 'background-color 0.3s', /* Transición suave para el fondo */
        }}>
            <p style={{
                color: '#e0e0e0', /* Color del texto en gris claro */
                margin: '0', /* Sin margen */
                fontSize: '1rem', /* Tamaño de fuente del texto */
                opacity: '0.8', /* Opacidad sutil */
            }}>
                &copy; {new Date().getFullYear()} Acción Comunal. Todos los derechos reservados.
            </p>
        </footer>
    );
};

export default Footer;
