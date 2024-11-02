// src/components/Footer.tsx

import React from 'react';
import '../styles/footer.css'; // Asegúrate de importar el CSS

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

