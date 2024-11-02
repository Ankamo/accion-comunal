// src/components/Footer.tsx

import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <p className="footer-text">
                &copy; {new Date().getFullYear()} Acción Comunal. Todos los derechos reservados.
            </p>
        </footer>
    );
};

export default Footer;

