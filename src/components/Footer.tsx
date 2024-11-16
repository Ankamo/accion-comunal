// src/components/Footer.tsx

import React from 'react';
import '../styles/footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="info">
                <p id="footer-direccion">Dirección:</p>
                <p id="footer-barrio">Barrio:</p>
                <p id="footer-correo">Correo Comunal:</p>
                <p id="footer-telefono">Llamadas y Whatsapp:</p>
            </div>

            <div className="logos">
                <img 
                    src="" 
                    id="footer-escudoPais" 
                    alt="Escudo Colombia" 
                    className="img-fluid" 
                    style={{ maxWidth: '70px' }} 
                />
                <img 
                    src="" 
                    id="footer-escudoDepto" 
                    alt="Escudo Departamento" 
                    className="img-fluid" 
                    style={{ maxWidth: '70px' }} 
                />
                <img 
                    src="" 
                    id="footer-escudoMunicipio" 
                    alt="Escudo Municipio" 
                    className="img-fluid" 
                    style={{ maxWidth: '70px' }} 
                />
                
            </div>

            <div className="propiedad">
                <p id="footer-creador">Propiedad de: Accion Comunal</p>
                <p id="footer-periodo">Periodo:</p>
                <p>Creado y Diseñado Por: Next Code Labs</p>
                <p className='derechos'>&copy; {new Date().getFullYear()}. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
