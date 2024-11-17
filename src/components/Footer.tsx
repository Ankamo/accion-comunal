// src/components/Footer.tsx

import React from 'react';
import '../styles/footer.css';
import { datosFooter } from '../components/Datos/infoOac';


const Footer = () => {
    return (
        <footer className="footer">
            <div className="info">
                <p id="footer-direccion">Dirección: {datosFooter.direccion}</p>
                <p id="footer-barrio">Barrio: {datosFooter.barrio}</p>
                <p id="footer-correo">Correo Comunal: {datosFooter.correoComunal}</p>
                <p id="footer-telefono">Llamadas y Whatsapp: {datosFooter.telefono}</p>
            </div>

            <div className="logos">
                <img 
                    src="/escudoColombia.png" 
                    id="footer-escudoPais" 
                    alt="Escudo Colombia" 
                    className="img-fluid" 
                    style={{ maxWidth: '70px' }} 
                />
                <img 
                    src="/escudoDepto.png" 
                    id="footer-escudoDepto" 
                    alt="Escudo Departamento" 
                    className="img-fluid" 
                    style={{ maxWidth: '70px' }} 
                />
                <img 
                    src="/escudoMunicipio.png" 
                    id="footer-escudoMunicipio" 
                    alt="Escudo Municipio" 
                    className="img-fluid" 
                    style={{ maxWidth: '70px' }} 
                />
                <img 
                    src="/oac.png" 
                    id="footer-logoOac" 
                    alt="Logo Oac" 
                    className="img-fluid" 
                    style={{ maxWidth: '70px' }} 
                />
            </div>

            <div className="propiedad">
                <p id="footer-creador">Propiedad: {datosFooter.propiedad}</p>
                <p id="footer-periodo">Periodo: {datosFooter.periodoComunal}</p>
                <p>Creado y Diseñado Por: Next Code Labs</p>
                <p className='derechos'>
                    &copy; {new Date().getFullYear()}. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
};


export default Footer;
