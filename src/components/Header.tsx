import React from 'react';
import '../styles/header.css';

const Header = () => {
    return (
        <header>
            <div className="logo-left">
                <img 
                    src="" 
                    id="header-logoOac" 
                    alt="Logo Izquierdo" 
                    className="img-fluid" 
                />
            </div>

            <div>
                <h1 id="header-titulo">Título Comunal</h1>
                <p id="header-nit">NIT: 123456789</p>
                <p id="header-ruc">RUC: 987654321</p>
                <p id="header-pj">PJ: 0001</p>
                <p id="header-expedido">Expedido: Bogotá</p>
                <p id="header-ubicacion">Ubicación: Bogotá, Colombia</p>
            </div>

            <div className="logo-right">
                <img 
                    src="" 
                    id="header-logoComunal" 
                    alt="Logo Derecho" 
                    className="img-fluid" 
                />
            </div>
        </header>
    );
}

export default Header;
